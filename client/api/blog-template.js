const BLOG_BASE_PATH = '/bridal-fashion-blog-bangalore';
const DEFAULT_SITE_URL = 'https://www.shrusara.com';
const DEFAULT_API_BASE = 'https://hi-jtc6.onrender.com/api';
const SIMPLE_BLOG_CONTENT_PREFIX = 'SHRUSARA_SIMPLE_BLOG:';

function toStringValue(value = '') {
  return String(value || '').trim();
}

function normalizeSiteUrl(value = '') {
  return toStringValue(value || DEFAULT_SITE_URL)
    .replace(/^https?:\/\/(www\.)?shrusarafashion\.com\/?$/i, DEFAULT_SITE_URL)
    .replace(/^https?:\/\/shrusara\.com\/?$/i, DEFAULT_SITE_URL)
    .replace(/\/+$/, '');
}

function getRequestOrigin(req) {
  if (!req || !req.headers) return DEFAULT_SITE_URL;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  if (!host) return DEFAULT_SITE_URL;
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

function toIsoDate(value) {
  if (!value) return new Date().toISOString();
  try {
    if (typeof value === 'object' && value !== null) {
      if (typeof value.toDate === 'function') {
        return value.toDate().toISOString();
      }
      if (typeof value._seconds === 'number') {
        return new Date(value._seconds * 1000).toISOString();
      }
    }
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      return d.toISOString();
    }
  } catch {
    // fallback
  }
  return new Date().toISOString();
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

function slugToTitle(slug = '') {
  return String(slug || '')
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function decodeSimpleBlogContent(content = '') {
  const value = String(content || '').trim();

  if (!value.startsWith(SIMPLE_BLOG_CONTENT_PREFIX)) {
    return null;
  }

  try {
    const parsed = JSON.parse(value.slice(SIMPLE_BLOG_CONTENT_PREFIX.length));
    return {
      metaDescription: parsed.metaDescription || '',
      altText: parsed.altText || '',
      simpleSections: Array.isArray(parsed.simpleSections) ? parsed.simpleSections : []
    };
  } catch {
    return null;
  }
}

function upsertHeadTag(html, pattern, tag) {
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

function upsertMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, 'gi');
  const cleanHtml = html.replace(pattern, '');
  return upsertHeadTag(cleanHtml, new RegExp(`__NO_MATCH__`), `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`);
}

function upsertCanonical(html, canonicalUrl) {
  const cleanHtml = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi, '');
  return upsertHeadTag(
    cleanHtml,
    new RegExp(`__NO_MATCH__`),
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );
}

function buildBlogSchemas(post = {}, slug = '', siteUrl = DEFAULT_SITE_URL) {
  const postSlug = toStringValue(post.slug || slug);
  const canonicalUrl = toAbsoluteUrl(`${BLOG_BASE_PATH}/${postSlug}`, siteUrl);
  const title = toStringValue(post.seoTitle || post.metaTitle || post.title || slugToTitle(postSlug) || 'Shrusara Blog');
  const decodedContent = decodeSimpleBlogContent(post.content);
  const description = toStringValue(post.metaDescription || decodedContent?.metaDescription || post.excerpt || `${title} - Shrusara Fashion Boutique Bangalore.`);
  const imageUrl = toAbsoluteUrl(
    getImageUrl(post.openGraph?.image) ||
    getImageUrl(post.featuredImage) ||
    post.coverImage ||
    '/videos/logo.png',
    siteUrl
  );
  const publishedDate = toIsoDate(post.publishedAt || post.createdAt);
  const modifiedDate = toIsoDate(post.updatedAt || post.publishedAt || post.createdAt);
  const faqs = (Array.isArray(post.faqs) ? post.faqs : []).filter((faq) => faq?.question && faq?.answer);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#blogposting`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      headline: title,
      name: toStringValue(post.title || title),
      description,
      url: canonicalUrl,
      image: [imageUrl].filter(Boolean),
      datePublished: publishedDate,
      dateModified: modifiedDate,
      author: {
        '@type': 'Person',
        name: toStringValue(post.author || 'Shrusara Fashion Boutique'),
        url: toAbsoluteUrl('/about-shrusara-boutique', siteUrl)
      },
      publisher: {
        '@type': 'Organization',
        name: 'Shrusara Fashion Boutique',
        url: toAbsoluteUrl('/', siteUrl),
        logo: {
          '@type': 'ImageObject',
          url: toAbsoluteUrl('/videos/Revisedlogo.webp', siteUrl)
        }
      },
      articleSection: toStringValue(post.category || 'Bridal Blouses'),
      inLanguage: 'en-IN'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: toAbsoluteUrl('/', siteUrl)
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: toAbsoluteUrl(BLOG_BASE_PATH, siteUrl)
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: toStringValue(post.title || title),
          item: canonicalUrl
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Shrusara Fashion Boutique',
      url: toAbsoluteUrl('/', siteUrl),
      telephone: '+919741827558',
      email: 'help@shrusara.com',
      address: 'Shrusara Fashion Boutique, 106, 6th Main Road, Mahalakshmipuram, Bangalore - 560086'
    }
  ];

  if (faqs.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return schemas;
}

function buildBlogSeo(post = {}, slug = '', siteUrl = DEFAULT_SITE_URL) {
  const postSlug = toStringValue(post.slug || slug);
  const canonicalUrl = toAbsoluteUrl(`${BLOG_BASE_PATH}/${postSlug}`, siteUrl);
  const rawTitle = toStringValue(post.seoTitle || post.metaTitle || post.title || slugToTitle(postSlug));
  const title = rawTitle.includes('Shrusara') ? rawTitle : `${rawTitle} | Shrusara`;
  const decodedContent = decodeSimpleBlogContent(post.content);
  const description = toStringValue(post.metaDescription || decodedContent?.metaDescription || post.excerpt || `${rawTitle} - Designer insights and bridal fashion tips from Shrusara Boutique Bangalore.`);
  const image = toAbsoluteUrl(
    getImageUrl(post.openGraph?.image) ||
    getImageUrl(post.featuredImage) ||
    post.coverImage ||
    '/videos/logo.png',
    siteUrl
  );

  return {
    title,
    description,
    canonicalUrl,
    image,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  };
}

function renderServerBody(post, seo, slug, siteUrl) {
  const postSlug = toStringValue(post.slug || slug);
  const title = toStringValue(post.title || post.seoTitle || slugToTitle(postSlug));
  const decodedContent = decodeSimpleBlogContent(post.content);
  const sections = Array.isArray(post.simpleSections) && post.simpleSections.length
    ? post.simpleSections
    : decodedContent?.simpleSections || [];

  let sectionsHtml = '';
  if (sections.length > 0) {
    sectionsHtml = sections
      .filter((sec) => sec.paragraph || sec.html || sec.image?.url)
      .map((sec, idx) => {
        const pText = sec.paragraph || '';
        const img = sec.image?.url ? `<figure><img src="${escapeHtml(sec.image.url)}" alt="${escapeHtml(sec.image.alt || title)}" /><figcaption>${escapeHtml(sec.caption || '')}</figcaption></figure>` : '';
        return `<section class="bp-server-section"><h3>Chapter ${idx + 1}</h3>${pText ? `<p>${escapeHtml(pText)}</p>` : ''}${img}</section>`;
      })
      .join('\n');
  } else if (post.contentHtml) {
    sectionsHtml = `<div class="bp-server-content">${post.contentHtml}</div>`;
  } else if (post.content) {
    sectionsHtml = `<div class="bp-server-content"><p>${escapeHtml(post.content)}</p></div>`;
  }

  return `
    <main class="bp-page" id="server-rendered-blog">
      <article class="bp-shell">
        <header>
          <p class="bp-eyebrow">${escapeHtml(post.category || 'Bridal & Designer Wear')}</p>
          <h1 class="bp-h1">${escapeHtml(title)}</h1>
          ${seo.description ? `<p class="bp-excerpt">${escapeHtml(seo.description)}</p>` : ''}
        </header>
        <div class="bp-body">
          ${sectionsHtml}
        </div>
      </article>
    </main>
  `;
}

function injectBlogSeo(html, seo, schemas, post, slug, siteUrl) {
  let output = html;

  // Replace or inject title
  output = output.replace(/<title>[\s\S]*?<\/title>/gi, '');
  output = upsertHeadTag(output, new RegExp(`__NO_MATCH__`), `<title>${escapeHtml(seo.title)}</title>`);

  // Inject meta tags
  output = upsertMeta(output, 'name', 'description', seo.description);
  output = upsertMeta(output, 'name', 'robots', seo.robots);
  output = upsertMeta(output, 'name', 'googlebot', seo.robots);
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

  // Remove existing static structured data scripts from home template
  output = output.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

  // Inject blog structured data JSON-LD (BlogPosting, BreadcrumbList, Organization, FAQPage)
  const jsonLdTag = `<script type="application/ld+json" id="page-structured-data">\n${JSON.stringify(schemas, null, 2)}\n    </script>`;
  output = upsertHeadTag(output, /<script\s+id=["']page-structured-data["'][^>]*>[\s\S]*?<\/script>/i, jsonLdTag);

  // Pre-render content inside <div id="root"> for crawlers
  const serverBody = renderServerBody(post, seo, slug, siteUrl);
  output = output.replace(/<div id="root"><\/div>/i, `<div id="root">${serverBody}</div>`);

  return output;
}

async function fetchHomeTemplate(req) {
  try {
    const response = await fetch(`${getRequestOrigin(req)}/`, {
      headers: {
        accept: 'text/html',
        'user-agent': 'ShrusaraBlogSeoTemplate/1.0'
      }
    });

    if (response.ok) {
      return await response.text();
    }
  } catch {
    // fallback minimal shell
  }

  return `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body><div id="root"></div></body></html>`;
}

function slugifyValue(value = '') {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 7000) {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller?.signal
    });
    if (timeoutId) clearTimeout(timeoutId);
    return res;
  } catch (err) {
    if (timeoutId) clearTimeout(timeoutId);
    return null;
  }
}

async function fetchPost(slug) {
  const apiBase = getApiBase();
  const targetSlug = slugifyValue(slug);

  // 1. Direct slug endpoint lookup
  const directResponse = await fetchWithTimeout(
    `${apiBase}/posts/slug/${encodeURIComponent(slug)}`,
    { headers: { accept: 'application/json' } },
    6000
  );

  if (directResponse && directResponse.ok) {
    try {
      const payload = await directResponse.json();
      if (payload?.item) return payload.item;
    } catch {
      // continue to fallback
    }
  }

  // 2. Fallback: list all posts and find match
  const listResponse = await fetchWithTimeout(
    `${apiBase}/posts`,
    { headers: { accept: 'application/json' } },
    7000
  );

  if (listResponse && listResponse.ok) {
    try {
      const payload = await listResponse.json();
      const items = Array.isArray(payload?.items) ? payload.items : [];
      const match = items.find((post) => {
        const candidates = [
          post.slug,
          post.title,
          post.id,
          String(post.url || '').split('/').filter(Boolean).pop()
        ];
        return candidates.some((c) => slugifyValue(c) === targetSlug);
      });

      if (match) return match;
    } catch {
      // continue to synthetic fallback
    }
  }

  // 3. Synthetic fallback for cold starts/temporary API outages
  return {
    slug: slug,
    title: slugToTitle(slug),
    category: 'Bridal & Designer Wear',
    excerpt: `Discover customized bridal and designer wear insights on ${slugToTitle(slug)} by Shrusara Fashion Boutique Bangalore.`,
    author: 'Shrusara Fashion Boutique',
    status: 'published',
    publishedAt: new Date().toISOString()
  };
}

export default async function handler(req, res) {
  const rawSlug = toStringValue(req.query.slug);
  const slug = rawSlug || 'bridal-fashion-blog-bangalore';

  try {
    const siteUrl = getPublicSiteUrl(req);
    const [html, post] = await Promise.all([
      fetchHomeTemplate(req),
      fetchPost(slug)
    ]);

    const postData = post || {
      slug: slug,
      title: slugToTitle(slug),
      category: 'Bridal & Designer Wear'
    };

    const seo = buildBlogSeo(postData, slug, siteUrl);
    const schemas = buildBlogSchemas(postData, slug, siteUrl);
    const output = injectBlogSeo(html, seo, schemas, postData, slug, siteUrl);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
    res.status(200).send(output);
  } catch (error) {
    // Never fail with 500 or noindex — return a resilient indexable page
    const siteUrl = getPublicSiteUrl(req);
    const fallbackPost = {
      slug: slug,
      title: slugToTitle(slug),
      category: 'Bridal & Designer Wear'
    };
    const seo = buildBlogSeo(fallbackPost, slug, siteUrl);
    const schemas = buildBlogSchemas(fallbackPost, slug, siteUrl);
    const fallbackHtml = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body><div id="root"></div></body></html>`;
    const output = injectBlogSeo(fallbackHtml, seo, schemas, fallbackPost, slug, siteUrl);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    res.status(200).send(output);
  }
}
