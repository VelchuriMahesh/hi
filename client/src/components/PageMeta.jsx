import { useEffect } from 'react';
import { contactLinks } from '../data/content';

function upsertMeta(selector, value, attribute = 'name') {
  if (value === undefined || value === null) {
    return;
  }

  const elements = document.head.querySelectorAll(`meta[${attribute}="${selector}"]`);
  if (elements.length > 1) {
    for (let i = 1; i < elements.length; i++) {
      elements[i].remove();
    }
  }
  let element = elements[0];

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, selector);
    document.head.appendChild(element);
  }

  element.setAttribute('content', String(value));
}

function upsertLink(rel, href) {
  const elements = document.head.querySelectorAll(`link[rel="${rel}"]`);
  if (elements.length > 1) {
    for (let i = 1; i < elements.length; i++) {
      elements[i].remove();
    }
  }
  let element = elements[0];

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

export default function PageMeta({
  title,
  description,
  keywords,
  canonicalPath = '/',
  canonicalUrl: explicitCanonicalUrl,
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  image,
  type = 'website',
  schema,
  schemas
}) {
  useEffect(() => {
    let canonicalUrl = '';
    if (explicitCanonicalUrl) {
      try {
        canonicalUrl = new URL(explicitCanonicalUrl, contactLinks.siteUrl).toString();
      } catch {
        canonicalUrl = String(explicitCanonicalUrl);
      }
    } else {
      try {
        canonicalUrl = new URL(canonicalPath, contactLinks.siteUrl).toString();
      } catch {
        canonicalUrl = `${contactLinks.siteUrl}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`;
      }
    }

    const imageUrl = image ? new URL(image, contactLinks.siteUrl).toString() : '';
    const safeTitle = String(title || '');
    const safeDescription = String(description || '');
    const activeSchema = schema || schemas;

    document.title = safeTitle;
    upsertMeta('description', safeDescription);
    upsertMeta('keywords', keywords);
    upsertMeta('robots', robots);
    upsertMeta('googlebot', robots);
    upsertMeta('og:title', safeTitle, 'property');
    upsertMeta('og:description', safeDescription, 'property');
    upsertMeta('og:type', type, 'property');
    upsertMeta('og:url', canonicalUrl, 'property');
    upsertMeta('og:image', imageUrl, 'property');
    upsertMeta('twitter:card', 'summary_large_image', 'name');
    upsertMeta('twitter:title', safeTitle, 'name');
    upsertMeta('twitter:description', safeDescription, 'name');
    upsertMeta('twitter:image', imageUrl, 'name');
    upsertLink('canonical', canonicalUrl);

    const scriptId = 'page-structured-data';
    let script = document.getElementById(scriptId);

    if (activeSchema) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(activeSchema);
    } else if (script) {
      script.remove();
    }
  }, [canonicalPath, description, explicitCanonicalUrl, image, keywords, robots, schema, schemas, title, type]);

  return null;
}

