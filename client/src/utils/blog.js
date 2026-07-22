import { contactLinks } from '../data/content';

export const BLOG_BASE_PATH = '/bridal-fashion-blog-bangalore';
export const DEFAULT_BLOG_AUTHOR = 'Shrusara Fashion Boutique';
export const DEFAULT_BLOG_IMAGE = '/videos/desingerhero.webp';

export const BLOG_STATUSES = ['draft', 'published', 'scheduled', 'private'];
export const SIMPLE_BLOG_SECTION_COUNT = 5;
export const SIMPLE_BLOG_CONTENT_PREFIX = 'SHRUSARA_SIMPLE_BLOG:';

export const BLOG_BLOCK_TYPES = [
  'hero',
  'paragraph',
  'heading',
  'image',
  'gallery',
  'faq',
  'cta',
  'internalLink',
  'externalLink',
  'quote',
  'table',
  'video',
  'code',
  'horizontalLine'
];

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function newId(prefix = 'item') {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function toArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toDate(value) {
  if (!value) return null;

  if (value.seconds) {
    return new Date(value.seconds * 1000);
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(value) {
  const date = toDate(value);
  if (!date) return '';

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

export function stripHtml(html = '') {
  if (typeof document !== 'undefined') {
    const element = document.createElement('div');
    element.innerHTML = html;
    return element.textContent || element.innerText || '';
  }

  return String(html).replace(/<[^>]+>/g, ' ');
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function encodeSimpleBlogContent(payload = {}) {
  return `${SIMPLE_BLOG_CONTENT_PREFIX}${JSON.stringify({
    version: 1,
    metaDescription: payload.metaDescription || '',
    altText: payload.altText || '',
    simpleSections: payload.simpleSections || []
  })}`;
}

export function decodeSimpleBlogContent(content = '') {
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

export function getBlockPlainText(block = {}) {
  return [
    block.title,
    block.heading,
    block.text,
    stripHtml(block.html || ''),
    block.question,
    block.answer,
    block.quote,
    block.citation,
    block.code,
    block.description,
    block.buttonText,
    block.label,
    block.url,
    ...(block.rows || []).flat(),
    ...(block.images || []).flatMap((image) => [image.alt, image.caption, image.fileName])
  ]
    .filter(Boolean)
    .join(' ');
}

export function calculateReadingTime(post = {}) {
  const words = [
    post.title,
    post.excerpt,
    post.content,
    stripHtml(post.contentHtml || ''),
    ...(post.simpleSections || []).map((section) => `${section.paragraph || section.text || ''} ${stripHtml(section.html || '')} ${section.image?.alt || ''} ${section.image?.caption || section.caption || ''}`),
    ...(post.blocks || []).map(getBlockPlainText),
    ...(post.faqs || []).map((faq) => `${faq.question || ''} ${faq.answer || ''}`)
  ]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export function createEmptyImage(overrides = {}) {
  return {
    id: newId('image'),
    url: '',
    alt: '',
    caption: '',
    fileName: '',
    width: '',
    height: '',
    format: 'webp',
    loading: 'lazy',
    crop: {
      x: 50,
      y: 50,
      zoom: 1
    },
    ...overrides
  };
}

export function createEmptySimpleSection(index = 0, overrides = {}) {
  return {
    id: `section-${index + 1}`,
    paragraph: '',
    html: '',
    textType: 'paragraph',
    textStyle: 'classic',
    alignment: 'left',
    image: createEmptyImage(),
    caption: '',
    ...overrides
  };
}

export function createEmptyFaq() {
  return {
    id: newId('faq'),
    question: '',
    answer: ''
  };
}

export function createEmptyCta() {
  return {
    id: newId('cta'),
    heading: '',
    description: '',
    buttonText: 'WhatsApp Consultation',
    buttonUrl: '',
    whatsappNumber: '',
    whatsappMessage: ''
  };
}

export function createBlock(type = 'paragraph') {
  const base = {
    id: newId('block'),
    type,
    title: '',
    heading: '',
    level: 'h2',
    text: '',
    html: '',
    url: '',
    label: ''
  };

  switch (type) {
    case 'hero':
      return {
        ...base,
        heading: 'Blog hero section',
        text: '',
        image: createEmptyImage()
      };
    case 'heading':
      return {
        ...base,
        heading: 'New section heading',
        level: 'h2'
      };
    case 'image':
      return {
        ...base,
        image: createEmptyImage()
      };
    case 'gallery':
      return {
        ...base,
        heading: 'Gallery',
        images: [createEmptyImage()]
      };
    case 'faq':
      return {
        ...base,
        question: '',
        answer: ''
      };
    case 'cta':
      return {
        ...base,
        ...createEmptyCta()
      };
    case 'internalLink':
    case 'externalLink':
      return {
        ...base,
        label: '',
        url: ''
      };
    case 'quote':
      return {
        ...base,
        quote: '',
        citation: ''
      };
    case 'table':
      return {
        ...base,
        rows: [
          ['Feature', 'Details'],
          ['', '']
        ]
      };
    case 'video':
      return {
        ...base,
        url: '',
        caption: ''
      };
    case 'code':
      return {
        ...base,
        code: ''
      };
    case 'horizontalLine':
      return base;
    default:
      return {
        ...base,
        text: ''
      };
  }
}

export function createEmptyBlogPost() {
  return {
    title: '',
    seoTitle: '',
    metaTitle: '',
    metaDescription: '',
    slug: '',
    category: 'Bridal Blouse',
    tags: [],
    author: DEFAULT_BLOG_AUTHOR,
    status: 'draft',
    featuredImage: createEmptyImage(),
    coverImage: '',
    images: [],
    altText: '',
    simpleSections: Array.from({ length: SIMPLE_BLOG_SECTION_COUNT }, (_, index) => createEmptySimpleSection(index)),
    excerpt: '',
    content: '',
    contentHtml: '<p>Start writing your blog article here...</p>',
    focusKeyword: '',
    canonicalUrl: '',
    robots: 'index,follow',
    openGraph: {
      title: '',
      description: '',
      image: createEmptyImage()
    },
    twitter: {
      title: '',
      description: '',
      image: createEmptyImage()
    },
    facebook: {
      title: '',
      description: '',
      image: createEmptyImage()
    },
    social: {
      pinterestImage: createEmptyImage()
    },
    blocks: [createBlock('paragraph')],
    faqs: [createEmptyFaq()],
    ctas: [createEmptyCta()],
    relatedMode: 'auto',
    relatedPostIds: [],
    publishedAt: '',
    scheduledAt: '',
    privateNote: '',
    analytics: {
      views: 0,
      visitors: 0,
      shares: 0,
      bounceRate: ''
    }
  };
}

export function normalizeImage(image, fallbackAlt = '') {
  if (typeof image === 'string') {
    return createEmptyImage({
      url: image,
      alt: fallbackAlt,
      format: image.includes('.webp') ? 'webp' : ''
    });
  }

  return createEmptyImage({
    ...(image || {}),
    alt: image?.alt || fallbackAlt
  });
}

export function normalizePost(post = {}) {
  const empty = createEmptyBlogPost();
  const category = post.category || post.tag || empty.category;
  const title = post.title || '';
  const decodedContent = decodeSimpleBlogContent(post.content);
  const rawSimpleSections = Array.isArray(post.simpleSections) && post.simpleSections.length
    ? post.simpleSections
    : decodedContent?.simpleSections || [];
  const firstSimpleImageSection = rawSimpleSections.find((section) => {
    const image = section?.image;
    return (typeof image === 'string' ? image : image?.url) || section?.imageUrl;
  });
  const firstSimpleImage = typeof firstSimpleImageSection?.image === 'string'
    ? firstSimpleImageSection.image
    : firstSimpleImageSection?.image?.url || firstSimpleImageSection?.imageUrl;
  const requestedFeaturedImage = normalizeImage(post.featuredImage || '', title);
  const featuredImage = requestedFeaturedImage.url
    ? requestedFeaturedImage
    : normalizeImage(post.coverImage || firstSimpleImage || post.image || post.thumbUrl || DEFAULT_BLOG_IMAGE, title);
  const altText = post.altText || featuredImage.alt || title;
  const simpleSections = Array.from({ length: SIMPLE_BLOG_SECTION_COUNT }, (_, index) => {
    const section = rawSimpleSections[index] || {};
    return createEmptySimpleSection(index, {
      ...section,
      paragraph: section.paragraph || section.text || '',
      html: section.html || (section.paragraph ? `<p>${escapeHtml(section.paragraph)}</p>` : ''),
      textType: section.textType || 'paragraph',
      textStyle: section.textStyle || 'classic',
      alignment: section.alignment || 'left',
      image: normalizeImage(section.image || section.imageUrl || '', section.image?.alt || section.alt || altText),
      caption: section.caption || section.image?.caption || ''
    });
  });
  const simpleParagraphs = simpleSections.map((section) => section.paragraph || stripHtml(section.html || '')).filter(Boolean);
  const simpleSectionHtml = simpleSections
    .map((section) => section.html || (section.paragraph ? `<p>${escapeHtml(section.paragraph)}</p>` : ''))
    .filter(Boolean);
  const normalizedContent = decodedContent ? simpleParagraphs.join('\n\n') : post.content;
  const normalizedContentHtml = decodedContent
    ? simpleSectionHtml.join('')
    : post.contentHtml || (post.content ? `<p>${post.content}</p>` : empty.contentHtml);

  return {
    ...empty,
    ...post,
    title,
    seoTitle: post.seoTitle || post.metaTitle || title,
    metaTitle: post.metaTitle || post.seoTitle || title,
    metaDescription: post.metaDescription || decodedContent?.metaDescription || post.excerpt || '',
    slug: post.slug || slugify(title || post.id),
    category,
    tag: category,
    tags: toArray(post.tags),
    author: post.author || DEFAULT_BLOG_AUTHOR,
    status: post.status || 'published',
    featuredImage,
    coverImage: featuredImage.url,
    images: Array.isArray(post.images) ? post.images.map((image) => normalizeImage(image, title)) : [],
    altText,
    simpleSections,
    content: normalizedContent,
    contentHtml: normalizedContentHtml,
    openGraph: {
      ...empty.openGraph,
      ...(post.openGraph || {}),
      image: normalizeImage(post.openGraph?.image || post.coverImage || featuredImage.url, title)
    },
    twitter: {
      ...empty.twitter,
      ...(post.twitter || {}),
      image: normalizeImage(post.twitter?.image || post.coverImage || featuredImage.url, title)
    },
    facebook: {
      ...empty.facebook,
      ...(post.facebook || {}),
      image: normalizeImage(post.facebook?.image || post.coverImage || featuredImage.url, title)
    },
    social: {
      ...empty.social,
      ...(post.social || {}),
      pinterestImage: normalizeImage(post.social?.pinterestImage || featuredImage.url, title)
    },
    blocks: Array.isArray(post.blocks) && post.blocks.length ? post.blocks : empty.blocks,
    faqs: Array.isArray(post.faqs) && post.faqs.length ? post.faqs : empty.faqs,
    ctas: Array.isArray(post.ctas) && post.ctas.length ? post.ctas : empty.ctas,
    analytics: {
      ...empty.analytics,
      ...(post.analytics || {})
    },
    readingTime: post.readingTime || calculateReadingTime({ ...post, content: normalizedContent, contentHtml: normalizedContentHtml, simpleSections })
  };
}

export function getPostUrl(post = {}) {
  return `${BLOG_BASE_PATH}/${post.slug || slugify(post.title || post.id)}`;
}

export function getAbsoluteUrl(pathOrUrl = '') {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl || '/', contactLinks.siteUrl).toString();
}

export function buildWhatsAppUrl(number, message) {
  const raw = String(number || '').replace(/\D/g, '');
  if (!raw) return '';
  return `https://wa.me/${raw}?text=${encodeURIComponent(message || '')}`;
}

export function getTableOfContents(post = {}) {
  const fromBlocks = (post.blocks || [])
    .filter((block) => block.type === 'heading' && ['h2', 'h3'].includes(block.level || 'h2'))
    .map((block) => ({
      id: slugify(block.heading || block.title || block.id),
      text: block.heading || block.title,
      level: block.level || 'h2'
    }))
    .filter((item) => item.text);

  if (fromBlocks.length) return fromBlocks;

  return Array.from(String(post.contentHtml || '').matchAll(/<h([23])[^>]*>(.*?)<\/h\1>/gi))
    .map((match) => ({
      id: slugify(stripHtml(match[2])),
      text: stripHtml(match[2]),
      level: `h${match[1]}`
    }))
    .filter((item) => item.text);
}

export function buildBlogSchema(post = {}, relatedPosts = []) {
  const normalized = normalizePost(post);
  const canonicalUrl = normalized.canonicalUrl || getAbsoluteUrl(getPostUrl(normalized));
  const imageUrl = getAbsoluteUrl(normalized.featuredImage.url || normalized.coverImage || DEFAULT_BLOG_IMAGE);
  const publishedDate = toDate(normalized.publishedAt || normalized.createdAt)?.toISOString();
  const modifiedDate = toDate(normalized.updatedAt || normalized.publishedAt || normalized.createdAt)?.toISOString();
  const faqs = (normalized.faqs || []).filter((faq) => faq.question && faq.answer);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: normalized.seoTitle || normalized.title,
      description: normalized.metaDescription || normalized.excerpt,
      image: [imageUrl],
      author: {
        '@type': 'Person',
        name: normalized.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Shrusara Fashion Boutique',
        logo: {
          '@type': 'ImageObject',
          url: getAbsoluteUrl('/videos/Revisedlogo.webp')
        }
      },
      datePublished: publishedDate,
      dateModified: modifiedDate,
      mainEntityOfPage: canonicalUrl
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getAbsoluteUrl('/')
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: getAbsoluteUrl(BLOG_BASE_PATH)
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: normalized.title,
          item: canonicalUrl
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Shrusara Fashion Boutique',
      url: contactLinks.siteUrl,
      telephone: contactLinks.phoneDisplay,
      email: contactLinks.email,
      address: contactLinks.address
    }
  ];

  if (faqs.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
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

  if (relatedPosts.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: relatedPosts.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: getAbsoluteUrl(getPostUrl(item)),
        name: item.title
      }))
    });
  }

  return schemas;
}
