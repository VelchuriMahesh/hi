import { db, mapDocument, serializeFirestore, Timestamp } from '../services/firebase.js';
import slugify from '../utils/slugify.js';

const DEFAULT_POST_IMAGE = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80';
const BLOG_BASE_PATH = '/bridal-fashion-blog-bangalore';
const DEFAULT_AUTHOR = 'Shrusara Fashion Boutique';
const SIMPLE_BLOG_SECTION_COUNT = 5;

function getPublicSiteUrl() {
  return String(process.env.SITE_URL || process.env.CLIENT_URL || 'https://www.shrusara.com').replace(/\/+$/, '');
}

function toStringValue(value, fallback = '') {
  return String(value ?? fallback).trim();
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toPlainText(html = '') {
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function getBlockText(blocks = []) {
  return blocks
    .map((block) =>
      [
        block?.title,
        block?.heading,
        block?.text,
        block?.body,
        block?.caption,
        block?.quote,
        block?.question,
        block?.answer,
        block?.description,
        block?.buttonText
      ]
        .filter(Boolean)
        .join(' ')
    )
    .join(' ');
}

function getSimpleSectionsText(simpleSections = []) {
  return simpleSections
    .map((section) =>
      [
        section?.paragraph,
        section?.text,
        toPlainText(section?.html || ''),
        section?.caption,
        section?.image?.alt,
        section?.image?.caption
      ]
        .filter(Boolean)
        .join(' ')
    )
    .join(' ');
}

function calculateReadingTime({ content = '', contentHtml = '', blocks = [], simpleSections = [] }) {
  const text = [content, toPlainText(contentHtml), getBlockText(blocks), getSimpleSectionsText(simpleSections)].join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function normalizeImage(value, fallbackAlt = '') {
  if (typeof value === 'string') {
    return {
      url: value.trim(),
      alt: fallbackAlt,
      caption: '',
      fileName: '',
      width: '',
      height: '',
      loading: 'lazy',
      format: value.includes('.webp') ? 'webp' : ''
    };
  }

  return {
    url: toStringValue(value?.url),
    alt: toStringValue(value?.alt, fallbackAlt),
    caption: toStringValue(value?.caption),
    fileName: toStringValue(value?.fileName),
    width: value?.width || '',
    height: value?.height || '',
    loading: value?.loading || 'lazy',
    format: value?.format || (String(value?.url || '').includes('.webp') ? 'webp' : ''),
    crop: value?.crop || null
  };
}

function normalizeSimpleSections(sections = [], fallbackAlt = '') {
  const source = Array.isArray(sections) ? sections : [];

  return Array.from({ length: SIMPLE_BLOG_SECTION_COUNT }, (_, index) => {
    const section = source[index] || {};
    const html = toStringValue(section.html);
    const image = normalizeImage(section.image || section.imageUrl || '', section.image?.alt || section.alt || fallbackAlt);

    return {
      id: section.id || `section-${index + 1}`,
      paragraph: toStringValue(section.paragraph || section.text || toPlainText(html)),
      html,
      textType: section.textType || 'paragraph',
      textStyle: section.textStyle || 'classic',
      alignment: section.alignment || 'left',
      image: {
        ...image,
        alt: image.alt || fallbackAlt,
        caption: toStringValue(section.caption, image.caption)
      },
      caption: toStringValue(section.caption, image.caption)
    };
  });
}

function normalizeBlocks(blocks = []) {
  if (!Array.isArray(blocks)) return [];

  return blocks
    .map((block, index) => ({
      id: block?.id || `block-${Date.now()}-${index}`,
      type: block?.type || 'paragraph',
      title: toStringValue(block?.title),
      heading: toStringValue(block?.heading),
      level: block?.level || 'h2',
      text: toStringValue(block?.text),
      html: toStringValue(block?.html),
      url: toStringValue(block?.url),
      label: toStringValue(block?.label),
      image: block?.image ? normalizeImage(block.image, block?.title || block?.heading || '') : null,
      images: Array.isArray(block?.images)
        ? block.images.map((image) => normalizeImage(image, block?.title || block?.heading || ''))
        : [],
      question: toStringValue(block?.question),
      answer: toStringValue(block?.answer),
      quote: toStringValue(block?.quote),
      citation: toStringValue(block?.citation),
      code: toStringValue(block?.code),
      rows: Array.isArray(block?.rows) ? block.rows : [],
      description: toStringValue(block?.description),
      buttonText: toStringValue(block?.buttonText),
      buttonUrl: toStringValue(block?.buttonUrl),
      whatsappNumber: toStringValue(block?.whatsappNumber),
      whatsappMessage: toStringValue(block?.whatsappMessage)
    }))
    .filter((block) => block.type);
}

function normalizeFaqs(faqs = []) {
  if (!Array.isArray(faqs)) return [];

  return faqs
    .map((faq) => ({
      id: faq?.id || `faq-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      question: toStringValue(faq?.question),
      answer: toStringValue(faq?.answer)
    }))
    .filter((faq) => faq.question || faq.answer);
}

function normalizeCtas(ctas = []) {
  if (!Array.isArray(ctas)) return [];

  return ctas
    .map((cta) => ({
      id: cta?.id || `cta-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      heading: toStringValue(cta?.heading),
      description: toStringValue(cta?.description),
      buttonText: toStringValue(cta?.buttonText),
      buttonUrl: toStringValue(cta?.buttonUrl),
      whatsappNumber: toStringValue(cta?.whatsappNumber),
      whatsappMessage: toStringValue(cta?.whatsappMessage)
    }))
    .filter((cta) => cta.heading || cta.description || cta.buttonText);
}

function normalizePostPayload(body, currentData = {}) {
  const title = toStringValue(body.title, currentData.title);
  const seoTitle = toStringValue(body.seoTitle, currentData.seoTitle || title);
  const metaTitle = toStringValue(body.metaTitle, currentData.metaTitle || seoTitle || title);
  const metaDescription = toStringValue(body.metaDescription, currentData.metaDescription || body.excerpt || currentData.excerpt);
  const excerpt = toStringValue(body.excerpt, currentData.excerpt || metaDescription);
  const blocks = normalizeBlocks(body.blocks ?? currentData.blocks ?? []);
  const faqs = normalizeFaqs(body.faqs ?? currentData.faqs ?? []);
  const ctas = normalizeCtas(body.ctas ?? currentData.ctas ?? []);
  const content = toStringValue(body.content, currentData.content);
  const contentHtml = toStringValue(body.contentHtml, currentData.contentHtml);
  const altText = toStringValue(body.altText, currentData.altText || title);
  const status = ['draft', 'published', 'scheduled', 'private'].includes(body.status)
    ? body.status
    : currentData.status || 'draft';
  const category = toStringValue(body.category, currentData.category || body.tag || 'Bridal Blouse');
  const simpleSections = normalizeSimpleSections(body.simpleSections ?? currentData.simpleSections ?? [], altText || title);
  const firstSimpleImage = simpleSections.find((section) => section.image.url)?.image;
  const requestedFeaturedImage = normalizeImage(body.featuredImage ?? currentData.featuredImage ?? '', altText || title);
  const featuredImage = requestedFeaturedImage.url
    ? requestedFeaturedImage
    : normalizeImage(body.coverImage ?? currentData.coverImage ?? firstSimpleImage ?? DEFAULT_POST_IMAGE, altText || title);
  const coverImage = featuredImage.url || DEFAULT_POST_IMAGE;
  const imageLibrary = Array.isArray(body.images)
    ? body.images.map((image) => normalizeImage(image, title))
    : Array.isArray(currentData.images)
      ? currentData.images.map((image) => normalizeImage(image, title))
      : [];

  return {
    title,
    seoTitle,
    metaTitle,
    metaDescription,
    excerpt,
    content,
    contentHtml,
    category,
    tag: category,
    tags: toArray(body.tags ?? currentData.tags ?? []),
    author: toStringValue(body.author, currentData.author || DEFAULT_AUTHOR),
    status,
    featuredImage,
    coverImage,
    images: imageLibrary,
    altText,
    simpleSections,
    focusKeyword: toStringValue(body.focusKeyword, currentData.focusKeyword),
    canonicalUrl: toStringValue(body.canonicalUrl, currentData.canonicalUrl),
    robots: body.robots
      ? (body.robots === 'noindex,nofollow' ? 'noindex,nofollow' : 'index,follow')
      : currentData.robots || 'index,follow',
    openGraph: {
      title: toStringValue(body.openGraph?.title, currentData.openGraph?.title || seoTitle || title),
      description: toStringValue(body.openGraph?.description, currentData.openGraph?.description || metaDescription || excerpt),
      image: normalizeImage(body.openGraph?.image ?? currentData.openGraph?.image ?? coverImage, title)
    },
    twitter: {
      title: toStringValue(body.twitter?.title, currentData.twitter?.title || seoTitle || title),
      description: toStringValue(body.twitter?.description, currentData.twitter?.description || metaDescription || excerpt),
      image: normalizeImage(body.twitter?.image ?? currentData.twitter?.image ?? coverImage, title)
    },
    facebook: {
      title: toStringValue(body.facebook?.title, currentData.facebook?.title || seoTitle || title),
      description: toStringValue(body.facebook?.description, currentData.facebook?.description || metaDescription || excerpt),
      image: normalizeImage(body.facebook?.image ?? currentData.facebook?.image ?? coverImage, title)
    },
    social: {
      pinterestImage: normalizeImage(body.social?.pinterestImage ?? currentData.social?.pinterestImage ?? coverImage, title)
    },
    blocks,
    faqs,
    ctas,
    relatedMode: body.relatedMode || currentData.relatedMode || 'auto',
    relatedPostIds: toArray(body.relatedPostIds ?? currentData.relatedPostIds ?? []),
    publishedAt: body.publishedAt || currentData.publishedAt || (status === 'published' ? new Date().toISOString() : ''),
    scheduledAt: body.scheduledAt || currentData.scheduledAt || '',
    privateNote: toStringValue(body.privateNote, currentData.privateNote),
    basePath: BLOG_BASE_PATH,
    readingTime: calculateReadingTime({ content, contentHtml, blocks, simpleSections }),
    analytics: {
      views: Number(body.analytics?.views ?? currentData.analytics?.views ?? 0),
      visitors: Number(body.analytics?.visitors ?? currentData.analytics?.visitors ?? 0),
      shares: Number(body.analytics?.shares ?? currentData.analytics?.shares ?? 0),
      bounceRate: body.analytics?.bounceRate ?? currentData.analytics?.bounceRate ?? ''
    }
  };
}

function isPostPublic(post) {
  if ((post.status || 'published') !== 'published') return false;
  if (!post.publishedAt) return true;
  return new Date(post.publishedAt).getTime() <= Date.now();
}

async function pingGoogleSitemap() {
  if (process.env.PING_GOOGLE_ON_PUBLISH !== 'true') return;

  try {
    const sitemapUrl = process.env.SITEMAP_URL || `${getPublicSiteUrl()}/sitemap.xml`;
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
  } catch (error) {
    console.warn('Google sitemap ping failed:', error.message);
  }
}

/**
 * Helper to ensure slugs are unique by checking the database
 */
async function buildUniqueSlug(title, currentId = null, requestedSlug = '') {
  const baseSlug = slugify(requestedSlug || title) || `post-${Date.now()}`;
  let candidate = baseSlug;
  let counter = 1;

  while (true) {
    // Admin SDK check for existing slug
    const snapshot = await db.collection('posts').where('slug', '==', candidate).get();
    const collision = snapshot.docs.find((item) => item.id !== currentId);

    if (!collision) return candidate;
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

/**
 * GET /api/posts
 */
export async function listPosts(req, res, next) {
  try {
    const snapshot = await db.collection('posts').get();
    const includeAll = req.query.all === 'true' && req.user?.role === 'admin';
    
    const items = snapshot.docs
      .map(mapDocument)
      .filter((item) => includeAll || isPostPublic(item))
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    res.json({ items });
  } catch (error) {
    console.error("🔥 Firestore Error in listPosts:", error.message);
    next(error);
  }
}

/**
 * POST /api/posts
 */
export async function createPost(req, res, next) {
  try {
    const payload = normalizePostPayload(req.body);

    if (!payload.title) {
      return res.status(400).json({ message: 'Blog title is required.' });
    }

    payload.slug = await buildUniqueSlug(payload.title, null, req.body.slug);
    payload.url = `${BLOG_BASE_PATH}/${payload.slug}`;
    Object.assign(payload, {
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    // Admin SDK bypasses security rules
    const reference = await db.collection('posts').add(payload);

    if (payload.status === 'published') {
      void pingGoogleSitemap();
    }

    res.status(201).json({
      item: {
        id: reference.id,
        ...serializeFirestore(payload)
      }
    });
  } catch (error) {
    console.error("🔥 Firestore Error in createPost:", error.message);
    next(error);
  }
}

/**
 * PUT /api/posts/:id
 */
export async function updatePostById(req, res, next) {
  try {
    const postRef = db.collection('posts').doc(req.params.id);
    const snapshot = await postRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const currentData = snapshot.data();
    const payload = normalizePostPayload(req.body, currentData);

    if (!payload.title) {
      return res.status(400).json({ message: 'Blog title is required.' });
    }

    payload.slug = await buildUniqueSlug(payload.title, req.params.id, req.body.slug ?? currentData.slug);
    payload.url = `${BLOG_BASE_PATH}/${payload.slug}`;
    payload.updatedAt = Timestamp.now();

    await postRef.update(payload);

    if (payload.status === 'published') {
      void pingGoogleSitemap();
    }

    res.json({
      item: {
        id: req.params.id,
        ...serializeFirestore({ ...currentData, ...payload })
      }
    });
  } catch (error) {
    console.error("🔥 Firestore Error in updatePost:", error.message);
    next(error);
  }
}

/**
 * GET /api/posts/admin
 */
export async function listAdminPosts(req, res, next) {
  req.query.all = 'true';
  return listPosts(req, res, next);
}

/**
 * GET /api/posts/sitemap.xml
 */
export async function getPostsSitemap(req, res, next) {
  try {
    const siteUrl = getPublicSiteUrl();
    const snapshot = await db.collection('posts').get();
    const items = snapshot.docs
      .map(mapDocument)
      .filter(isPostPublic)
      .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));

    const urls = [
      {
        loc: `${siteUrl}${BLOG_BASE_PATH}`,
        lastmod: new Date().toISOString()
      },
      ...items.map((item) => ({
        loc: `${siteUrl}${BLOG_BASE_PATH}/${item.slug}`,
        lastmod: item.updatedAt || item.publishedAt || item.createdAt || new Date().toISOString()
      }))
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((item) => `  <url>\n    <loc>${item.loc}</loc>\n    <lastmod>${new Date(item.lastmod).toISOString()}</lastmod>\n  </url>`)
      .join('\n')}\n</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error("ðŸ”¥ Firestore Error in getPostsSitemap:", error.message);
    next(error);
  }
}

/**
 * GET /api/posts/slug/:slug
 */
export async function getPostBySlug(req, res, next) {
  try {
    const slug = slugify(req.params.slug);
    const snapshot = await db.collection('posts').where('slug', '==', slug).limit(1).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    const item = mapDocument(snapshot.docs[0]);

    if (!isPostPublic(item) && req.user?.role !== 'admin') {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.json({ item });
  } catch (error) {
    console.error("ðŸ”¥ Firestore Error in getPostBySlug:", error.message);
    next(error);
  }
}

/**
 * POST /api/posts/:id/duplicate
 */
export async function duplicatePostById(req, res, next) {
  try {
    const postRef = db.collection('posts').doc(req.params.id);
    const snapshot = await postRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    const source = snapshot.data();
    const title = `${source.title || 'Untitled blog'} Copy`;
    const payload = {
      ...source,
      title,
      status: 'draft',
      slug: await buildUniqueSlug(title),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      publishedAt: '',
      analytics: {
        views: 0,
        visitors: 0,
        shares: 0,
        bounceRate: ''
      }
    };

    payload.url = `${BLOG_BASE_PATH}/${payload.slug}`;

    const reference = await db.collection('posts').add(payload);

    res.status(201).json({
      item: {
        id: reference.id,
        ...serializeFirestore(payload)
      }
    });
  } catch (error) {
    console.error("ðŸ”¥ Firestore Error in duplicatePost:", error.message);
    next(error);
  }
}

/**
 * POST /api/posts/:id/view
 */
export async function trackPostView(req, res, next) {
  try {
    const postRef = db.collection('posts').doc(req.params.id);
    const snapshot = await postRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    const data = snapshot.data();
    const analytics = {
      views: Number(data.analytics?.views || 0) + 1,
      visitors: Number(data.analytics?.visitors || 0) + 1,
      shares: Number(data.analytics?.shares || 0),
      bounceRate: data.analytics?.bounceRate || ''
    };

    await postRef.update({
      analytics,
      analyticsUpdatedAt: Timestamp.now()
    });

    res.json({ analytics });
  } catch (error) {
    console.error("ðŸ”¥ Firestore Error in trackPostView:", error.message);
    next(error);
  }
}

/**
 * DELETE /api/posts/:id
 */
export async function deletePostById(req, res, next) {
  try {
    const postRef = db.collection('posts').doc(req.params.id);
    const snapshot = await postRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    await postRef.delete();
    res.json({ message: 'Blog post deleted successfully.' });
  } catch (error) {
    console.error("🔥 Firestore Error in deletePost:", error.message);
    next(error);
  }
}
