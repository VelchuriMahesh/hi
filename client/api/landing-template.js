import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_SITE_URL = 'https://www.shrusara.com';

const LANDING_PAGES = {
  'customized-bridal-blouse-bangalore': {
    title: 'Customized Bridal Blouse in Bangalore | Maggam & Aari Work | Shrusara',
    description: 'Customized bridal blouses in Bangalore with premium maggam and aari work, perfect fit, and 1-on-1 design consultation with Chief Designer Shruthi Ajith.',
    keywords: 'bridal blouse bangalore, customized bridal blouse, maggam work blouse bangalore, aari work blouse, wedding blouse designer bangalore, bridal boutique bangalore',
    image: '/bridal/bridalblow/hero-bridal.webp',
    path: '/customized-bridal-blouse-bangalore',
    serviceType: 'Bridal Blouse Designing & Custom Tailoring',
    serviceName: 'Customized Bridal Blouse in Bangalore'
  },
  'customized-designer-outfits-bangalore': {
    title: 'Customized Designer Outfits & Gowns in Bangalore | Shrusara',
    description: 'Customized designer gowns, indo-western outfits, and lehengas in Bangalore with personalized design, perfect fit, and boutique finishing by Shrusara.',
    keywords: 'designer outfits bangalore, customized gowns bangalore, indo western wear bangalore, designer lehenga bangalore, evening gowns bangalore, designer boutique bangalore',
    image: '/videos/desingerhero.webp',
    path: '/customized-designer-outfits-bangalore',
    serviceType: 'Designer Outfits, Gowns & Indo-Western Custom Tailoring',
    serviceName: 'Customized Designer Outfits & Gowns in Bangalore'
  },
  'customized-occasion-wear-bangalore': {
    title: 'Customized Occasion Wear & Designer Outfits Bangalore | Shrusara',
    description: 'Customized occasion wear in Bangalore including designer gowns, crop top lehengas, half sarees, and designer blouses crafted with perfect fit by Shrusara.',
    keywords: 'occasion wear bangalore, designer gowns bangalore, crop top lehenga bangalore, half saree bangalore, boutique bangalore, party wear bangalore',
    image: '/occasion_wear/Designer%20Gowns%20&%20Indo%20western%20outfits/Designer%20Gowns%20&%20Indo%20western%20outfits/indo-western-fusion-bridal-wear-shrusara.webp',
    path: '/customized-occasion-wear-bangalore',
    serviceType: 'Occasion Wear, Designer Gowns & Custom Party Wear Designing',
    serviceName: 'Customized Occasion Wear & Designer Outfits in Bangalore'
  },
  'saree-transformation-bangalore': {
    title: 'Ready-to-Wear Saree & Saree Transformation in Bangalore | Shrusara',
    description: 'Transform your traditional sarees into ready-to-wear pre-stitched sarees, lehengas, gowns, and indo-western outfits in Bangalore at Shrusara.',
    keywords: 'ready to wear saree bangalore, saree transformation bangalore, pre stitched saree bangalore, saree to lehenga bangalore, convert old saree bangalore',
    image: '/occasion_wear/sareetransformation_landing/Ready%20to%20wear%20Saree/Ready%20to%20wear%20Saree/ready-to-wear-saree-bangalore.webp',
    path: '/saree-transformation-bangalore',
    serviceType: 'Saree Transformation, Pre-Stitched Saree & Custom Outfit Conversion',
    serviceName: 'Ready-to-Wear Saree & Saree Transformation in Bangalore'
  },
  'ready-to-wear-saree-bangalore': {
    title: 'Ready-to-Wear Saree Customization in Bangalore | Shrusara',
    description: 'Convert your own saree into a ready-to-wear saree in Bangalore with permanent pleats, premium lining, secure fit, and boutique finishing by Shrusara.',
    keywords: 'ready to wear saree Bangalore, pre stitched saree Bangalore, one minute saree Bangalore, saree customization Bangalore',
    image: '/landingpage/customized-ready-to-wear-saree-front-view-bangalore.webp',
    path: '/ready-to-wear-saree-bangalore',
    serviceType: 'Ready-to-Wear Saree Customization',
    serviceName: 'Ready-to-Wear Saree Customization in Bangalore'
  },
  'bridal-blouse-bangalore': {
    title: 'Bridal Blouse Designer in Bangalore | Maggam & Aari Work Boutique',
    description: 'Customized bridal blouses in Bangalore with premium maggam and aari work, perfect fit, and expert design guidance by Chief Designer Shruthi Ajith at Shrusara Fashion Boutique.',
    keywords: 'bridal blouse designer bangalore, maggam work blouse bangalore, aari work blouse bangalore, bridal boutique bangalore, wedding blouse bangalore',
    image: '/bridal/bridalblow/hero-bridal.webp',
    path: '/bridal-blouse-bangalore',
    serviceType: 'Bridal Blouse Designing',
    serviceName: 'Bridal Blouse Designing & Boutique Tailoring'
  },
  'designer-outfits-bangalore': {
    title: 'Designer Outfits in Bangalore | Gowns, Indo-Western & Party Wear',
    description: 'Explore customized designer outfits in Bangalore including gowns, Indo-western sets, and party wear with premium tailoring and personalized styling at Shrusara Fashion Boutique.',
    keywords: 'designer outfits bangalore, designer gowns bangalore, indo western wear bangalore, party wear boutique bangalore, custom designer dress bangalore',
    image: '/videos/desingerhero.webp',
    path: '/designer-outfits-bangalore',
    serviceType: 'Designer Outfits & Gowns',
    serviceName: 'Designer Outfits, Gowns & Indo-Western Wear'
  },
  'kids-outfits-bangalore': {
    title: 'Kids Outfit Boutique in Bangalore | Customized Kids Wear',
    description: 'Customized kids outfits in Bangalore designed for comfort, movement, and special occasions with premium fabrics and boutique finishing at Shrusara Fashion Boutique.',
    keywords: 'kids outfits bangalore, customized kids wear bangalore, kids boutique bangalore, children designer wear bangalore',
    image: '/videos/logo.png',
    path: '/kids-outfits-bangalore',
    serviceType: 'Kids Custom Wear',
    serviceName: 'Customized Kids Outfits in Bangalore'
  },
  'about-shrusara-boutique': {
    title: 'About Shrusara Fashion Boutique | Bridal Designer in Bangalore',
    description: 'Learn about Shrusara Fashion Boutique, a Bangalore-based bridal and designer boutique led by Chief Designer Shruthi Ajith, specializing in customized outfits with perfect fit and premium finishing.',
    keywords: 'about shrusara boutique, bridal designer bangalore, shruthi ajith designer, boutique mahalakshmipuram bangalore',
    image: '/videos/logo.png',
    path: '/about-shrusara-boutique'
  },
  'contact-shrusara-bangalore': {
    title: 'Contact Bridal Boutique in Bangalore | Shrusara Fashion Boutique',
    description: 'Visit Shrusara Fashion Boutique in Mahalakshmipuram, Bangalore or connect via WhatsApp or call to book your bridal and designer outfit consultation.',
    keywords: 'contact shrusara boutique, bridal boutique contact bangalore, boutique appointment bangalore, mahalakshmipuram boutique phone',
    image: '/videos/logo.png',
    path: '/contact-shrusara-bangalore'
  },
  'bridal-fashion-blog-bangalore': {
    title: 'Bridal & Fashion Blog Bangalore | Shrusara Fashion Boutique',
    description: 'Read the latest guides on bridal blouses, maggam work, designer gowns, ready-to-wear sarees, and occasion wear styling in Bangalore by Shrusara.',
    keywords: 'bridal fashion blog bangalore, bridal blouse guide, wedding fashion tips bangalore, maggam work guide',
    image: '/videos/logo.png',
    path: '/bridal-fashion-blog-bangalore'
  }
};

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

function upsertHeadTag(html, tagRegex, nextTag) {
  if (tagRegex.test(html)) {
    return html.replace(tagRegex, nextTag);
  }
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, `  ${nextTag}\n</head>`);
  }
  return `${nextTag}\n${html}`;
}

function upsertMeta(html, attribute, name, content) {
  const safeContent = escapeHtml(content || '');
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapeRegExp(name)}["'][^>]*>`, 'gi');
  const nextTag = `<meta ${attribute}="${escapeHtml(name)}" content="${safeContent}" />`;
  return upsertHeadTag(html, pattern, nextTag);
}

function upsertCanonical(html, canonicalUrl) {
  const safeUrl = escapeHtml(canonicalUrl);
  const pattern = /<link\s+[^>]*rel=["']canonical["'][^>]*>/gi;
  const nextTag = `<link rel="canonical" href="${safeUrl}" />`;
  return upsertHeadTag(html, pattern, nextTag);
}

function getHtmlTemplate() {
  const candidatePaths = [
    path.join(process.cwd(), 'dist', 'index.html'),
    path.join(process.cwd(), 'client', 'dist', 'index.html'),
    path.join(process.cwd(), 'index.html'),
    path.join(process.cwd(), 'client', 'index.html'),
    path.join(__dirname, '..', 'dist', 'index.html'),
    path.join(__dirname, '..', 'index.html')
  ];

  for (const candidate of candidatePaths) {
    try {
      if (fs.existsSync(candidate)) {
        return fs.readFileSync(candidate, 'utf8');
      }
    } catch {
      // try next
    }
  }

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shrusara Fashion Boutique</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
}

function buildPageSchemas(pageConfig, canonicalUrl, imageUrl, siteUrl) {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${toAbsoluteUrl('/', siteUrl)}#organization`,
      name: 'Shrusara Fashion Boutique',
      url: toAbsoluteUrl('/', siteUrl),
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/videos/Revisedlogo.webp', siteUrl)
      },
      telephone: '+919741827558',
      email: 'help@shrusara.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '106, 6th Main Road, Mahalakshmipuram',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560086',
        addressCountry: 'IN'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ClothingStore'],
      '@id': `${toAbsoluteUrl('/', siteUrl)}#localbusiness`,
      name: 'Shrusara Fashion Boutique',
      url: toAbsoluteUrl('/', siteUrl),
      logo: toAbsoluteUrl('/videos/Revisedlogo.webp', siteUrl),
      image: toAbsoluteUrl('/videos/logo.png', siteUrl),
      telephone: '+919741827558',
      email: 'help@shrusara.com',
      priceRange: '₹₹',
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
        latitude: 13.0077,
        longitude: 77.5487
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${toAbsoluteUrl('/', siteUrl)}#website`,
      name: 'Shrusara Fashion Boutique',
      url: toAbsoluteUrl('/', siteUrl),
      publisher: {
        '@id': `${toAbsoluteUrl('/', siteUrl)}#organization`
      },
      inLanguage: 'en-IN'
    }
  ];

  if (pageConfig.serviceType && pageConfig.serviceName) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: pageConfig.serviceName,
      serviceType: pageConfig.serviceType,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Shrusara Fashion Boutique',
        url: toAbsoluteUrl('/', siteUrl),
        telephone: '+919741827558',
        image: imageUrl || toAbsoluteUrl('/videos/logo.png', siteUrl),
        address: {
          '@type': 'PostalAddress',
          streetAddress: '106, 6th Main Road, Mahalakshmipuram',
          addressLocality: 'Bangalore',
          addressRegion: 'Karnataka',
          postalCode: '560086',
          addressCountry: 'IN'
        }
      },
      areaServed: {
        '@type': 'City',
        name: 'Bangalore'
      },
      description: pageConfig.description
    });
  }

  return schemas;
}

function injectLandingSeo(html, pageConfig, siteUrl) {
  let output = html;
  const canonicalUrl = toAbsoluteUrl(pageConfig.path, siteUrl);
  const imageUrl = toAbsoluteUrl(pageConfig.image, siteUrl);
  const robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  // Title
  output = output.replace(/<title>[\s\S]*?<\/title>/gi, '');
  output = upsertHeadTag(output, new RegExp(`__NO_MATCH__`), `<title>${escapeHtml(pageConfig.title)}</title>`);

  // Meta Tags
  output = upsertMeta(output, 'name', 'description', pageConfig.description);
  if (pageConfig.keywords) {
    output = upsertMeta(output, 'name', 'keywords', pageConfig.keywords);
  }
  output = upsertMeta(output, 'name', 'robots', robots);
  output = upsertMeta(output, 'name', 'googlebot', robots);
  output = upsertCanonical(output, canonicalUrl);

  // Open Graph
  output = upsertMeta(output, 'property', 'og:title', pageConfig.title);
  output = upsertMeta(output, 'property', 'og:description', pageConfig.description);
  output = upsertMeta(output, 'property', 'og:url', canonicalUrl);
  output = upsertMeta(output, 'property', 'og:type', 'website');
  if (imageUrl) {
    output = upsertMeta(output, 'property', 'og:image', imageUrl);
  }

  // Twitter
  output = upsertMeta(output, 'name', 'twitter:card', 'summary_large_image');
  output = upsertMeta(output, 'name', 'twitter:title', pageConfig.title);
  output = upsertMeta(output, 'name', 'twitter:description', pageConfig.description);
  if (imageUrl) {
    output = upsertMeta(output, 'name', 'twitter:image', imageUrl);
  }

  // Structured Data
  const schemas = buildPageSchemas(pageConfig, canonicalUrl, imageUrl, siteUrl);
  output = output.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  const jsonLdTag = `<script type="application/ld+json" id="page-structured-data">\n${JSON.stringify(schemas, null, 2)}\n    </script>`;
  output = upsertHeadTag(output, /<script\s+id=["']page-structured-data["'][^>]*>[\s\S]*?<\/script>/i, jsonLdTag);

  return output;
}

export default async function handler(req, res) {
  try {
    const rawPage = toStringValue(req.query?.page || req.query?.slug || '').replace(/^\/+|\/+$/g, '');
    const siteUrl = getPublicSiteUrl(req);
    const pageConfig = LANDING_PAGES[rawPage] || LANDING_PAGES['customized-bridal-blouse-bangalore'];

    const baseHtml = getHtmlTemplate();
    const renderedHtml = injectLandingSeo(baseHtml, pageConfig, siteUrl);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
    return res.status(200).send(renderedHtml);
  } catch (error) {
    console.error('Error rendering landing page SSR:', error);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    return res.status(200).send(getHtmlTemplate());
  }
}
