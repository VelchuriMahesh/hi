import { useEffect } from 'react';
import { contactLinks } from '../data/content';

function upsertMeta(selector, value, attribute = 'name') {
  if (!value) {
    return;
  }

  let element = document.head.querySelector(`meta[${attribute}="${selector}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, selector);
    document.head.appendChild(element);
  }

  element.setAttribute('content', value);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

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
  robots = 'index,follow',
  schema
}) {
  useEffect(() => {
    const canonicalUrl = new URL(canonicalPath, contactLinks.siteUrl).toString();

    document.title = title;
    upsertMeta('description', description);
    upsertMeta('keywords', keywords);
    upsertMeta('robots', robots);
    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:type', 'website', 'property');
    upsertMeta('og:url', canonicalUrl, 'property');
    upsertMeta('twitter:card', 'summary_large_image', 'name');
    upsertMeta('twitter:title', title, 'name');
    upsertMeta('twitter:description', description, 'name');
    upsertLink('canonical', canonicalUrl);

    const scriptId = 'page-structured-data';
    let script = document.getElementById(scriptId);

    if (schema) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(schema);
    } else if (script) {
      script.remove();
    }
  }, [canonicalPath, description, keywords, robots, schema, title]);

  return null;
}

