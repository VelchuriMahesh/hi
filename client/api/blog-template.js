const BLOG_BASE_PATH = '/bridal-fashion-blog-bangalore';
const DEFAULT_SITE_URL = 'https://www.shrusara.com';
const DEFAULT_API_BASE = 'https://hi-jtc6.onrender.com/api';

function toStringValue(value = '') {
  return String(value || '').trim();
}

function normalizeSiteUrl(value = '') {
  return toStringValue(value || DEFAULT_SITE_URL)
    .replace(/^https?:\/\/(www\.)?shrusarafashion\.com\/?$/i, DEFAULT_SITE_URL)
    .replace(/\/+$/, '');
}

function getRequestOrigin(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${protocol}://${host}`;
}

function getApiBase() {
  return toStringValue(
    process.env.VITE_API_URL ||
    process.env.API_BASE_URL ||
    process.env.BACKEND_API_URL ||
    DEFAULT_API_BASE
  ).replace(/\/+$/, '');
}

function getPublicSiteUrl(req) {
  return normalizeSiteUrl(
    process.env.VITE_SITE_URL ||
    process.env.SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    getRequestOrigin(req)
  );
}

function getImageUrl(image) {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return image.url || '';
}

function toAbsoluteUrl(value = '', siteUrl = DEFAULT_SITE_URL) {
  if (!value) return '';

  try {
    return new URL(value, `${siteUrl}/`).toString();
  } catch {
    return '';
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeRegExp(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function upsertHeadTag(html, pattern, tag) {
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

function upsertMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, 'i');
  return upsertHeadTag(html, pattern, `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`);
}

function upsertCanonical(html, canonicalUrl) {
  return upsertHeadTag(
    html,
    /<link\s+[^>]*rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );
}

function buildBlogSeo(post = {}, slug = '', siteUrl = DEFAULT_SITE_URL) {
  const postSlug = toStringValue(post.slug || slug);
  const canonicalUrl = toAbsoluteUrl(`${BLOG_BASE_PATH}/${postSlug}`, siteUrl);
  const title = toStringValue(post.seoTitle || post.metaTitle || post.title || 'Shrusara Blog');
  const description = toStringValue(post.metaDescription || '');
  const image = toAbsoluteUrl(
    getImageUrl(post.openGraph?.image) ||
    getImageUrl(post.featuredImage) ||
    post.coverImage ||
    '',
    siteUrl
  );

  return {
    title,
    description,
    canonicalUrl,
    image,
    robots: 'index,follow'
  };
}

function injectBlogSeo(html, seo) {
  let output = upsertHeadTag(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(seo.title)}</title>`
  );

  output = upsertMeta(output, 'name', 'description', seo.description);
  output = upsertMeta(output, 'name', 'robots', seo.robots);
  output = upsertCanonical(output, seo.canonicalUrl);
  output = upsertMeta(output, 'property', 'og:title', seo.title);
  output = upsertMeta(output, 'property', 'og:description', seo.description);
  output = upsertMeta(output, 'property', 'og:url', seo.canonicalUrl);
  output = upsertMeta(output, 'property', 'og:type', 'article');
  output = upsertMeta(output, 'name', 'twitter:title', seo.title);
  output = upsertMeta(output, 'name', 'twitter:description', seo.description);

  if (seo.image) {
    output = upsertMeta(output, 'property', 'og:image', seo.image);
    output = upsertMeta(output, 'name', 'twitter:image', seo.image);
  }

  return output;
}

async function fetchHomeTemplate(req) {
  const response = await fetch(`${getRequestOrigin(req)}/`, {
    headers: {
      accept: 'text/html',
      'user-agent': 'ShrusaraBlogSeoTemplate/1.0'
    }
  });

  if (!response.ok) {
    throw new Error('Unable to load site template.');
  }

  return response.text();
}

async function fetchPost(slug) {
  const response = await fetch(`${getApiBase()}/posts/slug/${encodeURIComponent(slug)}`, {
    headers: { accept: 'application/json' }
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return payload.item || null;
}

export default async function handler(req, res) {
  const slug = toStringValue(req.query.slug);

  if (!slug) {
    res.status(404).send('Blog post not found.');
    return;
  }

  try {
    const [html, post] = await Promise.all([
      fetchHomeTemplate(req),
      fetchPost(slug)
    ]);

    if (!post) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      res.status(404).send(html);
      return;
    }

    const seo = buildBlogSeo(post, slug, getPublicSiteUrl(req));
    const output = injectBlogSeo(html, seo);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
    res.status(200).send(output);
  } catch (error) {
    res.status(500).send(`Unable to render blog SEO template: ${escapeHtml(error.message)}`);
  }
}
