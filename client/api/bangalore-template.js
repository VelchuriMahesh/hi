const BANGALORE_BASE_PATH = '/bangalore';
const DEFAULT_SITE_URL = 'https://www.shrusara.com';
const DEFAULT_API_BASE = 'https://hi-jtc6.onrender.com/api';

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
  return image.url || image.src || '';
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

function upsertHeadTag(html, regex, tag) {
  if (regex.test(html)) {
    return html.replace(regex, tag);
  }
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
  }
  return `${tag}\n${html}`;
}

function upsertMeta(html, attributeName, attributeValue, content) {
  if (!content) return html;
  const regex = new RegExp(
    `<meta\\s+[^>]*${escapeRegExp(attributeName)}=["']${escapeRegExp(attributeValue)}["'][^>]*>`,
    'i'
  );
  const tag = `<meta ${attributeName}="${attributeValue}" content="${escapeHtml(content)}" />`;
  return upsertHeadTag(html, regex, tag);
}

function upsertCanonical(html, canonicalUrl) {
  const regex = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`;
  return upsertHeadTag(html, regex, tag);
}

function buildSeo(page, slug, siteUrl) {
  const canonicalUrl = `${siteUrl}${BANGALORE_BASE_PATH}/${slug}`;
  const title = toStringValue(
    page.metaTitle || page.title || `${page.serviceCategory || 'Custom Service'} in ${page.locationName || 'Bangalore'} | Shrusara Fashion Boutique`
  );
  const description = toStringValue(
    page.metaDescription ||
      page.hero?.tagline ||
      `Customized ${page.serviceCategory || 'bridal and designer wear'} in ${page.locationName || 'Bangalore'} with handcrafted embroidery and perfect fit by Shrusara.`
  );
  const rawImage = getImageUrl(page.featuredImage) || getImageUrl(page.heroImage) || '/bridal/bridalblow/hero-bridal.webp';
  const image = toAbsoluteUrl(rawImage, siteUrl);

  const keywords = Array.isArray(page.metaKeywords)
    ? page.metaKeywords.join(', ')
    : toStringValue(page.metaKeywords || `${page.serviceCategory} Bangalore, customized ${page.serviceCategory} ${page.locationName}`);

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    image,
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  };
}

function buildSchemas(page, seo, siteUrl) {
  const serviceCategory = page.serviceCategory || 'Bridal Blouse Designing';
  const locationName = page.locationName || 'Bangalore';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${seo.canonicalUrl}#service`,
    name: seo.title,
    serviceType: serviceCategory,
    description: seo.description,
    url: seo.canonicalUrl,
    image: seo.image,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#boutique`,
      name: 'Shrusara Fashion Boutique',
      url: siteUrl,
      telephone: '+919741827558',
      priceRange: '₹₹₹',
      image: `${siteUrl}/videos/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '106, 6th Main Road, Mahalakshmipuram',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560086',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '13.0135',
        longitude: '77.5385'
      }
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: locationName
      },
      {
        '@type': 'City',
        name: 'Bangalore'
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${seo.canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bangalore Boutique Services',
        item: `${siteUrl}${BANGALORE_BASE_PATH}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title || `${serviceCategory} in ${locationName}`,
        item: seo.canonicalUrl
      }
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ClothingStore'],
    '@id': `${seo.canonicalUrl}#localbusiness`,
    name: `Shrusara Fashion Boutique - ${serviceCategory} in ${locationName}`,
    url: seo.canonicalUrl,
    telephone: '+919741827558',
    priceRange: '₹₹₹',
    image: seo.image,
    description: seo.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '106, 6th Main Road, Mahalakshmipuram',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560086',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '13.0135',
      longitude: '77.5385'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: locationName
    }
  };

  const schemas = [serviceSchema, breadcrumbSchema, localBusinessSchema];

  const faqs = (Array.isArray(page.faqs) ? page.faqs : []).filter((f) => f?.question && f?.answer);
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${seo.canonicalUrl}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    });
  }

  return schemas;
}

function renderServerBody(page, seo, slug) {
  const serviceCategory = page.serviceCategory || 'Bridal Blouse';
  const locationName = page.locationName || 'Bangalore';
  const faqs = Array.isArray(page.faqs) ? page.faqs : [];
  const processSteps = Array.isArray(page.processSteps) ? page.processSteps : [];

  const faqsHtml = faqs.map(
    (f) => `
      <div style="margin-bottom: 1rem;">
        <h3 style="font-weight: bold; margin-bottom: 0.25rem;">${escapeHtml(f.question)}</h3>
        <p style="color: #444;">${escapeHtml(f.answer)}</p>
      </div>`
  ).join('');

  const stepsHtml = processSteps.map(
    (s, idx) => `
      <div style="margin-bottom: 1rem;">
        <h4 style="font-weight: 600;">Step ${idx + 1}: ${escapeHtml(s.title)}</h4>
        <p style="color: #555;">${escapeHtml(s.description)}</p>
      </div>`
  ).join('');

  return `
    <main style="max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: sans-serif; color: #2D231E;">
      <nav aria-label="Breadcrumb" style="font-size: 0.85rem; color: #777; margin-bottom: 1.5rem;">
        <a href="/" style="color: #6E2D33; text-decoration: none;">Home</a> /
        <a href="/bangalore" style="color: #6E2D33; text-decoration: none;">Bangalore Services</a> /
        <span>${escapeHtml(locationName)}</span>
      </nav>

      <header style="margin-bottom: 2rem;">
        <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; color: #6E2D33; font-weight: bold;">
          ${escapeHtml(page.hero?.badge || `100% Customized | ${locationName}, Bangalore`)}
        </p>
        <h1 style="font-size: 2.25rem; font-family: serif; margin-top: 0.5rem; line-height: 1.2;">
          ${escapeHtml(page.hero?.heading || page.title)}
        </h1>
        <p style="font-size: 1.1rem; color: #555; margin-top: 1rem; line-height: 1.6;">
          ${escapeHtml(page.hero?.tagline || seo.description)}
        </p>
      </header>

      ${
        seo.image
          ? `<div style="margin-bottom: 2rem; text-align: center;">
              <img src="${escapeHtml(seo.image)}" alt="${escapeHtml(page.featuredImage?.alt || seo.title)}" style="max-width: 100%; height: auto; border-radius: 1rem;" />
            </div>`
          : ''
      }

      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.5rem; font-family: serif; margin-bottom: 1rem;">
          ${escapeHtml(page.about?.heading || `Customized ${serviceCategory} Tailoring in ${locationName}`)}
        </h2>
        <p style="line-height: 1.7; color: #333;">
          ${escapeHtml(page.about?.description || seo.description)}
        </p>
      </section>

      ${
        processSteps.length
          ? `<section style="margin-bottom: 2.5rem;">
              <h2 style="font-size: 1.5rem; font-family: serif; margin-bottom: 1rem;">Our 5-Step Customization Process</h2>
              ${stepsHtml}
            </section>`
          : ''
      }

      ${
        faqs.length
          ? `<section style="margin-bottom: 2.5rem;">
              <h2 style="font-size: 1.5rem; font-family: serif; margin-bottom: 1rem;">Frequently Asked Questions</h2>
              ${faqsHtml}
            </section>`
          : ''
      }

      <footer style="margin-top: 3rem; padding: 2rem; background: #2A1E17; color: #F5EFEB; border-radius: 1rem; text-align: center;">
        <h2 style="font-size: 1.5rem; font-family: serif; margin-bottom: 0.5rem;">Ready for Your Custom ${escapeHtml(serviceCategory)} in ${escapeHtml(locationName)}?</h2>
        <p style="margin-bottom: 1.5rem; color: #d4c8be;">Book your 1-on-1 consultation with Chief Designer Shruthi Ajith today.</p>
        <a href="https://wa.me/919741827558" style="display: inline-block; background: #6E2D33; color: #fff; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold;">
          Chat on WhatsApp
        </a>
      </footer>
    </main>
  `;
}

function injectBangaloreSeo(html, seo, schemas, page, slug, siteUrl) {
  let output = html;

  // Replace title
  output = output.replace(/<title>[\s\S]*?<\/title>/gi, '');
  output = upsertHeadTag(output, new RegExp(`__NO_MATCH__`), `<title>${escapeHtml(seo.title)}</title>`);

  // Inject meta tags
  output = upsertMeta(output, 'name', 'description', seo.description);
  output = upsertMeta(output, 'name', 'keywords', seo.keywords);
  output = upsertMeta(output, 'name', 'robots', seo.robots);
  output = upsertMeta(output, 'name', 'googlebot', seo.robots);
  output = upsertCanonical(output, seo.canonicalUrl);
  output = upsertMeta(output, 'property', 'og:title', seo.title);
  output = upsertMeta(output, 'property', 'og:description', seo.description);
  output = upsertMeta(output, 'property', 'og:url', seo.canonicalUrl);
  output = upsertMeta(output, 'property', 'og:type', 'website');
  output = upsertMeta(output, 'name', 'twitter:title', seo.title);
  output = upsertMeta(output, 'name', 'twitter:description', seo.description);

  if (seo.image) {
    output = upsertMeta(output, 'property', 'og:image', seo.image);
    output = upsertMeta(output, 'name', 'twitter:image', seo.image);
  }

  // Remove existing static structured data
  output = output.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

  // Inject JSON-LD
  const jsonLdTag = `<script type="application/ld+json" id="bangalore-page-structured-data">\n${JSON.stringify(schemas, null, 2)}\n    </script>`;
  output = upsertHeadTag(output, /<script\s+id=["']bangalore-page-structured-data["'][^>]*>[\s\S]*?<\/script>/i, jsonLdTag);

  // Pre-render content inside <div id="root"> for crawlers
  const serverBody = renderServerBody(page, seo, slug, siteUrl);
  if (/<div id="root"[^>]*>/i.test(output)) {
    output = output.replace(/<div id="root"[^>]*>[\s\S]*?<\/div>/i, `<div id="root">\n${serverBody}\n</div>`);
  } else {
    output = output.replace(/<body[^>]*>/i, `$&<div id="root">\n${serverBody}\n</div>`);
  }

  return output;
}

async function fetchHomeTemplate(req) {
  try {
    const response = await fetch(`${getRequestOrigin(req)}/`, {
      headers: {
        accept: 'text/html',
        'user-agent': 'ShrusaraBangaloreSeoTemplate/1.0'
      }
    });

    if (response.ok) {
      return await response.text();
    }
  } catch {
    // fallback
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

async function fetchLandingPage(slug) {
  const apiBase = getApiBase();
  const targetSlug = slugifyValue(slug);

  // 1. Direct slug endpoint
  try {
    const directRes = await fetch(`${apiBase}/landing-pages/slug/${encodeURIComponent(targetSlug)}`, {
      headers: { accept: 'application/json' }
    });
    if (directRes.ok) {
      const data = await directRes.json();
      if (data?.item) return data.item;
    }
  } catch {
    // try fallback
  }

  // 2. Fetch list fallback
  try {
    const listRes = await fetch(`${apiBase}/landing-pages`, {
      headers: { accept: 'application/json' }
    });
    if (listRes.ok) {
      const listData = await listRes.json();
      const items = Array.isArray(listData.items) ? listData.items : [];
      const match = items.find((p) => {
        const candidates = [p.slug, p.id, String(p.url || '').split('/').pop()];
        return candidates.some((c) => slugifyValue(c) === targetSlug);
      });
      if (match) return match;
    }
  } catch {
    // fallback
  }

  return null;
}

export default async function handler(req, res) {
  try {
    const slug = slugifyValue(req.query?.slug || req.params?.slug || '');
    if (!slug) {
      return res.status(404).send('Landing page not found');
    }

    const siteUrl = getPublicSiteUrl(req);
    const [page, homeHtml] = await Promise.all([
      fetchLandingPage(slug),
      fetchHomeTemplate(req)
    ]);

    const fallbackTitle = slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const activePage = page || {
      title: `${fallbackTitle} | Shrusara Fashion Boutique`,
      serviceCategory: 'Bridal & Designer Wear',
      locationName: 'Bangalore',
      slug,
      metaTitle: `${fallbackTitle} | Shrusara Fashion Boutique`,
      metaDescription: `Customized ${fallbackTitle.toLowerCase()} in Bangalore with perfect fit, handcrafted embroidery and 1-on-1 designer consultation with Shruthi Ajith.`,
      featuredImage: {
        url: '/bridal/bridalblow/hero-bridal.webp',
        alt: `${fallbackTitle} Bangalore`
      }
    };

    const seo = buildSeo(activePage, slug, siteUrl);
    const schemas = buildSchemas(activePage, seo, siteUrl);
    const outputHtml = injectBangaloreSeo(homeHtml, seo, schemas, activePage, slug, siteUrl);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).send(outputHtml);
  } catch (error) {
    console.error('Error in bangalore-template SSR handler:', error);
    return res.status(500).send('Internal Server Error');
  }
}
