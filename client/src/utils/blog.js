import { contactLinks } from '../data/content';

export const BLOG_BASE_PATH = '/bridal-fashion-blog-bangalore';
export const DEFAULT_BLOG_AUTHOR = 'Shrusara Fashion Boutique';
export const DEFAULT_BLOG_IMAGE = '/videos/desingerhero.webp';

export const BLOG_STATUSES = ['draft', 'published', 'scheduled', 'private'];
export const SIMPLE_BLOG_SECTION_COUNT = 5;
export const SIMPLE_BLOG_CONTENT_PREFIX = 'SHRUSARA_SIMPLE_BLOG:';

export const BLOG_CATEGORY_ALIASES = {
  'Bridal Blouse': 'Bridal Blouses',
  'Bridal Blouse Designs': 'Bridal Blouses',
  'Maggam Work': 'Maggam & Aari Work',
  'Aari Work': 'Maggam & Aari Work',
  'Lehenga Styling': 'Bridal Lehengas & Gowns',
  'Bridal Gowns': 'Bridal Lehengas & Gowns',
  'Designer Outfits': 'Luxury Occasion Wear',
  'Styling Tips': 'Fashion & Styling Tips',
  'Bridal Styling': 'Fashion & Styling Tips',
  'Bangalore Boutique': 'Bangalore Boutique Guide'
};

export const DEFAULT_BLOG_SETTINGS = {
  aboutAuthorHeading: 'About the Author',
  aboutAuthor:
    'Shruthi Ajith is the Founder & Chief Designer of Shrusara Fashion Boutique, Bangalore. She specializes in customized bridal blouses, bridal lehengas, bridal gowns, Maggam & Aari Work, Ready to Wear Saree customization and luxury occasion wear. Through this blog, she shares practical fashion tips, bridal styling ideas and customization guidance to help readers make informed decisions.',
  contactHeading: "Have Questions? We're Happy to Help",
  contactText:
    "Every bride has her own style, ideas and wedding plans. If you have questions about customization, embroidery styles, fabrics, measurements or simply need guidance in choosing the right design, feel free to contact us. We're always happy to help - there is absolutely no obligation to place an order.",
  whatsappButtonText: 'Chat with Our Designer',
  whatsappNumber: contactLinks.phoneRaw,
  whatsappMessage:
    'Hello! I was reading your blog on the Shrusara website and would like to know more about your customized bridal and designer wear services.',
  authorSignature:
    'Warm Regards,\n\nShruthi Ajith\nFounder & Chief Designer\nShrusara Fashion Boutique\nCustomized Bridal & Designer Wear | Bangalore',
  homepageUrl: 'https://www.shrusara.com/',
  aboutUrl: 'https://www.shrusara.com/about-shrusara-boutique/',
  contactUrl: 'https://www.shrusara.com/contact-shrusara-bangalore/',
  landingPages: {
    bridal: 'https://www.shrusara.com/customized-bridal-blouse-bangalore/',
    designer: 'https://www.shrusara.com/customized-designer-outfits-bangalore/',
    occasionWear: 'https://www.shrusara.com/customized-occasion-wear-bangalore/',
    readyToWearSaree: 'https://www.shrusara.com/ready-to-wear-saree-bangalore/'
  },
  categories: {
    'Bridal Blouses': {
      purpose: 'Blogs about customized bridal blouses.',
      primaryCta: 'Explore Bridal Blouse Designs',
      primaryCtaLink: 'https://www.shrusara.com/customized-bridal-blouse-bangalore/',
      ctaDescription: 'Explore customized bridal blouse designs, hand embroidery, and premium fitting options at Shrusara.',
      developerNote: 'Auto-load when this category is selected.',
      faqs: [
        { question: 'How early should I start?', answer: 'Start 6-8 weeks before the wedding.' },
        { question: 'Which embroidery is suitable?', answer: 'Maggam, Aari, Zardosi, Thread, Stone and Pearl Work are popular.' },
        { question: 'Can I customize my blouse?', answer: 'Yes, every design can be customized.' },
        { question: 'Can I bring my own reference?', answer: 'Yes, reference images are welcome.' },
        { question: 'Do you accept international orders?', answer: 'Yes. We assist customers worldwide through online consultations.' }
      ]
    },
    'Bridal Lehengas & Gowns': {
      purpose: 'Blogs about customized bridal outfits.',
      primaryCta: 'Explore Bridal Collection',
      primaryCtaLink: 'https://www.shrusara.com/customized-bridal-blouse-bangalore/',
      ctaDescription: 'Explore bridal lehengas, gowns, reception outfits, and complete bridal couture options.',
      developerNote: 'Auto-load when this category is selected.',
      faqs: [
        { question: 'Do you create customized lehengas?', answer: 'Yes.' },
        { question: 'Can I customize fabrics and colours?', answer: 'Yes.' },
        { question: 'Do you provide styling guidance?', answer: 'Yes.' },
        { question: 'How long does it take?', answer: 'Depends on the design.' },
        { question: 'Can international customers order?', answer: 'Yes. Online consultations are available.' }
      ]
    },
    'Maggam & Aari Work': {
      purpose: 'Blogs about bridal hand embroidery.',
      primaryCta: 'Explore Hand Embroidery Designs',
      primaryCtaLink: 'https://www.shrusara.com/customized-bridal-blouse-bangalore/',
      ctaDescription: 'See handcrafted Maggam and Aari work ideas for bridal blouses and occasion wear.',
      developerNote: 'Auto-load when this category is selected.',
      faqs: [
        { question: 'What is Maggam Work?', answer: 'Traditional bridal hand embroidery.' },
        { question: 'What is Aari Work?', answer: 'Fine hand embroidery using a specialized hook.' },
        { question: 'Can embroidery be customized?', answer: 'Yes.' },
        { question: 'Which fabrics are suitable?', answer: 'Silk, Raw Silk and Velvet.' },
        { question: 'Can customers outside India order?', answer: 'Yes. International consultations are available.' }
      ]
    },
    'Luxury Occasion Wear': {
      purpose: 'Designer blouses, gowns and premium occasion wear.',
      primaryCta: 'Explore Luxury Occasion Wear',
      primaryCtaLink: 'https://www.shrusara.com/customized-occasion-wear-bangalore/',
      ctaDescription: 'Explore customized designer blouses, gowns, Indo-western outfits, and premium occasion wear.',
      developerNote: 'Auto-load when this category is selected.',
      faqs: [
        { question: 'Can I customize my outfit?', answer: 'Yes.' },
        { question: 'Do you stitch designer blouses?', answer: 'Yes.' },
        { question: 'Can I bring a reference?', answer: 'Yes.' },
        { question: 'Do you create matching outfits?', answer: 'Yes.' },
        { question: 'Do you accept international enquiries?', answer: 'Yes. Online consultations are available.' }
      ]
    },
    'Ready to Wear Sarees': {
      purpose: 'Transform your own saree into a Ready to Wear Saree.',
      primaryCta: 'Explore Ready to Wear Saree Service',
      primaryCtaLink: 'https://www.shrusara.com/ready-to-wear-saree-bangalore/',
      ctaDescription: 'Learn how Shrusara can convert your own saree into a ready-to-wear saree with permanent pleats.',
      developerNote: 'Auto-load when this category is selected.',
      faqs: [
        { question: 'Do you sell Ready-to-Wear Sarees?', answer: 'No. We customize your saree.' },
        { question: 'Can I courier my saree?', answer: 'Yes.' },
        { question: 'Can I book a video consultation?', answer: 'Yes.' },
        { question: 'Can any saree be converted?', answer: 'Most can.' },
        { question: 'How do I get started?', answer: 'Send us a saree photo on WhatsApp.' }
      ]
    },
    'Fashion & Styling Tips': {
      purpose: 'Educational fashion blogs.',
      primaryCta: 'Explore Customized Designer Outfits',
      primaryCtaLink: 'https://www.shrusara.com/customized-designer-outfits-bangalore/',
      ctaDescription: 'Explore customized designer outfit ideas for bridal, festive, and special occasion styling.',
      developerNote: 'Auto-load when this category is selected.',
      faqs: [
        { question: 'Who are these blogs for?', answer: 'Everyone.' },
        { question: 'Are they promotional?', answer: 'No.' },
        { question: 'Can I ask questions?', answer: 'Yes.' },
        { question: 'Do you share trends?', answer: 'Yes.' },
        { question: 'Can I contact you?', answer: 'Absolutely.' }
      ]
    },
    'Bangalore Boutique Guide': {
      purpose: 'Guides about boutiques in Bangalore.',
      primaryCta: 'Contact Our Designer',
      primaryCtaLink: 'https://www.shrusara.com/contact-shrusara-bangalore/',
      ctaDescription: 'Visit or contact Shrusara Fashion Boutique in Mahalakshmipuram, Bangalore.',
      developerNote: 'Auto-load when this category is selected.',
      faqs: [
        { question: 'Can I visit?', answer: 'Yes.' },
        { question: 'Do you offer consultations?', answer: 'Yes.' },
        { question: 'Outside Bangalore?', answer: 'Online consultations available.' },
        { question: 'Location?', answer: 'Mahalakshmipuram, Bangalore.' },
        { question: 'How to contact?', answer: 'WhatsApp or Contact page.' }
      ]
    },
    'Business Insights': {
      purpose: 'General business articles.',
      primaryCta: 'Explore More Blogs',
      primaryCtaLink: 'https://www.shrusara.com/',
      ctaDescription: 'Read more Shrusara guides and boutique insights.',
      developerNote: 'Auto-load when this category is selected.',
      faqs: [
        { question: 'Who are these for?', answer: 'Business owners.' },
        { question: 'Only fashion?', answer: 'No.' },
        { question: 'Why publish?', answer: 'Share knowledge.' },
        { question: 'Can I share?', answer: 'Yes.' },
        { question: 'More topics?', answer: 'Yes.' }
      ]
    }
  }
};

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
    .normalize('NFKC')
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/-+/g, '-')
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
  const simpleSectionText = (post.simpleSections || [])
    .map((section) => `${section.paragraph || section.text || stripHtml(section.html || '')} ${section.image?.caption || section.caption || ''}`)
    .join(' ')
    .trim();
  const blockText = (post.blocks || []).map(getBlockPlainText).join(' ').trim();
  const bodyText = simpleSectionText || blockText || [post.content, stripHtml(post.contentHtml || '')].filter(Boolean).join(' ');
  const words = [
    bodyText,
    ...(post.faqs || []).map((faq) => `${faq.question || ''} ${faq.answer || ''}`)
  ]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
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

function normalizeCategoryFaqs(faqs = [], fallbackFaqs = []) {
  const source = Array.isArray(faqs) && faqs.length ? faqs : fallbackFaqs;
  const length = Math.max(5, source.length, fallbackFaqs.length);

  return Array.from({ length }, (_, index) => {
    const fallback = fallbackFaqs[index] || {};
    const faq = source[index] || {};

    return {
      id: faq.id || fallback.id || `faq-${index + 1}`,
      question: faq.question ?? fallback.question ?? '',
      answer: faq.answer ?? fallback.answer ?? ''
    };
  });
}

export function getBlogCategoryName(category = '') {
  const value = String(category || '').trim();
  return BLOG_CATEGORY_ALIASES[value] || value || 'Bridal Blouses';
}

export function normalizeBlogSettings(settings = {}) {
  const source = settings && typeof settings === 'object' ? settings : {};
  const sourceCategories = source.categories && typeof source.categories === 'object' ? source.categories : {};
  const normalizedSourceCategories = Object.entries(sourceCategories).reduce((result, [name, config]) => {
    const canonicalName = getBlogCategoryName(name);
    result[canonicalName] = {
      ...(result[canonicalName] || {}),
      ...(config || {})
    };
    return result;
  }, {});
  const categoryNames = Array.from(new Set([
    ...Object.keys(DEFAULT_BLOG_SETTINGS.categories),
    ...Object.keys(normalizedSourceCategories)
  ]));
  const categories = categoryNames.reduce((result, name) => {
    const fallback = DEFAULT_BLOG_SETTINGS.categories[name] || {};
    const incoming = normalizedSourceCategories[name] || {};

    result[name] = {
      purpose: incoming.purpose ?? fallback.purpose ?? '',
      primaryCta: incoming.primaryCta ?? fallback.primaryCta ?? '',
      primaryCtaLink: incoming.primaryCtaLink ?? fallback.primaryCtaLink ?? '',
      ctaDescription: incoming.ctaDescription ?? fallback.ctaDescription ?? '',
      developerNote: incoming.developerNote ?? fallback.developerNote ?? '',
      faqs: normalizeCategoryFaqs(incoming.faqs, fallback.faqs || [])
    };

    return result;
  }, {});

  return {
    ...DEFAULT_BLOG_SETTINGS,
    ...source,
    landingPages: {
      ...DEFAULT_BLOG_SETTINGS.landingPages,
      ...(source.landingPages || {})
    },
    categories
  };
}

export function getBlogCategoryConfig(settings = DEFAULT_BLOG_SETTINGS, category = '') {
  const blogSettings = normalizeBlogSettings(settings);
  const name = getBlogCategoryName(category);

  if (blogSettings.categories[name]) {
    return {
      name,
      ...blogSettings.categories[name]
    };
  }

  const [fallbackName, fallbackConfig] = Object.entries(blogSettings.categories)[0] || [
    'Bridal Blouses',
    DEFAULT_BLOG_SETTINGS.categories['Bridal Blouses']
  ];

  return {
    name: fallbackName,
    ...fallbackConfig
  };
}

function getCategoryCta(categoryConfig = {}) {
  if (!categoryConfig.primaryCta && !categoryConfig.ctaDescription) return null;

  return {
    id: `category-cta-${slugify(categoryConfig.name || categoryConfig.primaryCta || 'blog')}`,
    heading: categoryConfig.primaryCta || 'Explore Shrusara Services',
    description: categoryConfig.ctaDescription || categoryConfig.purpose || '',
    buttonText: categoryConfig.primaryCta || 'Learn More',
    buttonUrl: categoryConfig.primaryCtaLink || '',
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
    category: 'Bridal Blouses',
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

function cleanTitleAlt(alt = '', title = '') {
  const value = String(alt || '').trim();
  const titleValue = String(title || '').trim();
  return value && value !== titleValue ? value : '';
}

function normalizeBlogImage(image, fallbackAlt = '', title = '') {
  const fallback = cleanTitleAlt(fallbackAlt, title);
  const normalized = normalizeImage(image, fallback);

  return {
    ...normalized,
    alt: cleanTitleAlt(normalized.alt, title)
  };
}

export function normalizePost(post = {}) {
  const empty = createEmptyBlogPost();
  const category = getBlogCategoryName(post.category || post.tag || empty.category);
  const title = post.title || '';
  const imageAltFallback = cleanTitleAlt(post.altText, title);
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
  const requestedFeaturedImage = normalizeBlogImage(post.featuredImage || '', '', title);
  const featuredImage = requestedFeaturedImage.url
    ? requestedFeaturedImage
    : normalizeBlogImage(post.coverImage || firstSimpleImage || post.image || post.thumbUrl || DEFAULT_BLOG_IMAGE, '', title);
  const altText = imageAltFallback || featuredImage.alt || '';
  const simpleSections = Array.from({ length: SIMPLE_BLOG_SECTION_COUNT }, (_, index) => {
    const section = rawSimpleSections[index] || {};
    return createEmptySimpleSection(index, {
      ...section,
      paragraph: section.paragraph || section.text || '',
      html: section.html || (section.paragraph ? `<p>${escapeHtml(section.paragraph)}</p>` : ''),
      textType: section.textType || 'paragraph',
      textStyle: section.textStyle || 'classic',
      alignment: section.alignment || 'left',
      image: normalizeBlogImage(section.image || section.imageUrl || '', section.image?.alt || section.alt || '', title),
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
    images: Array.isArray(post.images) ? post.images.map((image) => normalizeBlogImage(image, '', title)) : [],
    altText,
    simpleSections,
    content: normalizedContent,
    contentHtml: normalizedContentHtml,
    openGraph: {
      ...empty.openGraph,
      ...(post.openGraph || {}),
      image: normalizeBlogImage(post.openGraph?.image || post.coverImage || featuredImage.url, '', title)
    },
    twitter: {
      ...empty.twitter,
      ...(post.twitter || {}),
      image: normalizeBlogImage(post.twitter?.image || post.coverImage || featuredImage.url, '', title)
    },
    facebook: {
      ...empty.facebook,
      ...(post.facebook || {}),
      image: normalizeBlogImage(post.facebook?.image || post.coverImage || featuredImage.url, '', title)
    },
    social: {
      ...empty.social,
      ...(post.social || {}),
      pinterestImage: normalizeBlogImage(post.social?.pinterestImage || featuredImage.url, '', title)
    },
    blocks: Array.isArray(post.blocks) && post.blocks.length ? post.blocks : empty.blocks,
    faqs: Array.isArray(post.faqs) && post.faqs.length ? post.faqs : empty.faqs,
    ctas: Array.isArray(post.ctas) && post.ctas.length ? post.ctas : empty.ctas,
    analytics: {
      ...empty.analytics,
      ...(post.analytics || {})
    },
    readingTime: calculateReadingTime({ ...post, content: normalizedContent, contentHtml: normalizedContentHtml, simpleSections })
  };
}

export function applyBlogSettingsToPost(post = {}, settings = DEFAULT_BLOG_SETTINGS) {
  const normalized = normalizePost(post);
  const blogSettings = normalizeBlogSettings(settings);
  const categoryConfig = getBlogCategoryConfig(blogSettings, normalized.category);
  const categoryFaqs = (categoryConfig.faqs || []).filter((faq) => faq.question || faq.answer);
  const categoryCta = getCategoryCta(categoryConfig);
  const nextPost = {
    ...normalized,
    category: categoryConfig.name,
    tag: categoryConfig.name,
    faqs: categoryFaqs.length ? categoryFaqs : normalized.faqs,
    ctas: categoryCta ? [categoryCta] : normalized.ctas,
    blogSettings,
    categoryConfig
  };

  return {
    ...nextPost,
    readingTime: calculateReadingTime(nextPost)
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
  const digits = String(number || '').replace(/\D/g, '');
  const raw = digits.length === 10 ? `91${digits}` : digits;
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
