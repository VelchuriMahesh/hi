const BLOG_BASE_PATH = '/bridal-fashion-blog-bangalore';
const DEFAULT_SITE_URL = 'https://www.shrusara.com';
const DEFAULT_API_BASE = 'https://hi-jtc6.onrender.com/api';

const STATIC_PAGES = [
  {
    path: '',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    path: '/customized-bridal-blouse-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    path: '/customized-designer-outfits-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    path: '/customized-occasion-wear-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    path: '/saree-transformation-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    path: '/ready-to-wear-saree-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    path: '/bridal-blouse-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    path: '/designer-outfits-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    path: '/kids-outfits-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    path: '/about-shrusara-boutique',
    lastmod: '2026-09-10',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    path: '/contact-shrusara-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    path: '/bridal-fashion-blog-bangalore',
    lastmod: '2026-09-10',
    changefreq: 'weekly',
    priority: '0.8'
  }
];

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

function getPublicSiteUrl(req) {
  return normalizeSiteUrl(
    process.env.VITE_SITE_URL ||
    process.env.SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    getRequestOrigin(req)
  );
}

function getApiBase() {
  return toStringValue(
    process.env.VITE_API_URL ||
    process.env.API_BASE_URL ||
    process.env.BACKEND_API_URL ||
    DEFAULT_API_BASE
  ).replace(/\/+$/, '');
}

function formatLastmod(dateValue) {
  if (!dateValue) {
    return new Date().toISOString().split('T')[0];
  }

  try {
    if (typeof dateValue === 'object' && dateValue !== null) {
      if (typeof dateValue.toDate === 'function') {
        return dateValue.toDate().toISOString().split('T')[0];
      }
      if (typeof dateValue._seconds === 'number') {
        return new Date(dateValue._seconds * 1000).toISOString().split('T')[0];
      }
    }
    const d = new Date(dateValue);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split('T')[0];
    }
  } catch {
    // fallback
  }

  return new Date().toISOString().split('T')[0];
}

function isPostPublic(post) {
  if (!post) return false;
  if ((post.status || 'published') !== 'published') return false;
  if (!post.publishedAt) return true;
  return new Date(post.publishedAt).getTime() <= Date.now();
}

async function fetchPublishedPosts() {
  const apiBase = getApiBase();
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 9000) : null;

      const response = await fetch(`${apiBase}/posts`, {
        headers: { accept: 'application/json' },
        signal: controller?.signal
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (response.ok) {
        const payload = await response.json();
        if (Array.isArray(payload.items)) return payload.items;
      }
    } catch (error) {
      if (attempt === 2) {
        console.warn('Failed to fetch posts for sitemap:', error.message);
      }
    }
  }
  return [];
}

async function fetchPublishedLandingPages() {
  const apiBase = getApiBase();
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 9000) : null;

      const response = await fetch(`${apiBase}/landing-pages`, {
        headers: { accept: 'application/json' },
        signal: controller?.signal
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (response.ok) {
        const payload = await response.json();
        if (Array.isArray(payload.items)) return payload.items;
      }
    } catch (error) {
      if (attempt === 2) {
        console.warn('Failed to fetch landing pages for sitemap:', error.message);
      }
    }
  }
  return [];
}

export function buildSitemapXml(siteUrl, posts = [], landingPages = []) {
  const publicPosts = posts.filter(isPostPublic);
  const publicLandingPages = landingPages.filter(isPostPublic);

  // Sort posts by updated date descending
  publicPosts.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.publishedAt || a.createdAt || 0).getTime();
    const dateB = new Date(b.updatedAt || b.publishedAt || b.createdAt || 0).getTime();
    return dateB - dateA;
  });

  publicLandingPages.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.publishedAt || a.createdAt || 0).getTime();
    const dateB = new Date(b.updatedAt || b.publishedAt || b.createdAt || 0).getTime();
    return dateB - dateA;
  });

  const staticUrls = STATIC_PAGES.map((page) => ({
    loc: `${siteUrl}${page.path ? page.path : '/'}`,
    lastmod: page.lastmod,
    changefreq: page.changefreq,
    priority: page.priority
  }));

  const blogUrls = publicPosts.map((post) => {
    const rawDate = post.updatedAt || post.publishedAt || post.createdAt;
    return {
      loc: `${siteUrl}${BLOG_BASE_PATH}/${post.slug}`,
      lastmod: formatLastmod(rawDate),
      changefreq: 'weekly',
      priority: '0.8'
    };
  });

  const landingPageUrls = publicLandingPages.map((page) => {
    const rawDate = page.updatedAt || page.publishedAt || page.createdAt;
    return {
      loc: `${siteUrl}/bangalore/${page.slug}`,
      lastmod: formatLastmod(rawDate),
      changefreq: 'weekly',
      priority: '0.8'
    };
  });

  const allUrls = [...staticUrls, ...blogUrls, ...landingPageUrls];

  const xmlEntries = allUrls.map((entry) => {
    return [
      '  <url>',
      `    <loc>${entry.loc}</loc>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      '  </url>'
    ].join('\n');
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries.join('\n')}\n</urlset>\n`;
}

export default async function handler(req, res) {
  try {
    const siteUrl = getPublicSiteUrl(req);
    const [posts, landingPages] = await Promise.all([
      fetchPublishedPosts(),
      fetchPublishedLandingPages()
    ]);
    const xml = buildSitemapXml(siteUrl, posts, landingPages);

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Fallback: Return static pages if an unexpected error occurs
    const siteUrl = getPublicSiteUrl(req);
    const xml = buildSitemapXml(siteUrl, [], []);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(xml);
  }
}
