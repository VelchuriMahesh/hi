import { db, mapDocument, serializeFirestore, Timestamp } from '../services/firebase.js';
import slugify from '../utils/slugify.js';

const DEFAULT_POST_IMAGE = 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80';
const BLOG_BASE_PATH = '/bridal-fashion-blog-bangalore';
const DEFAULT_AUTHOR = 'Shrusara Fashion Boutique';
const SIMPLE_BLOG_SECTION_COUNT = 5;
const BLOG_SETTINGS_COLLECTION = 'blogSettings';
const BLOG_SETTINGS_DOC_ID = 'global';

function getPublicSiteUrl() {
  return String(process.env.SITE_URL || 'https://www.shrusara.com')
    .replace(/^https?:\/\/(www\.)?shrusarafashion\.com\/?$/i, 'https://www.shrusara.com')
    .replace(/^https?:\/\/shrusara\.com\/?$/i, 'https://www.shrusara.com')
    .replace(/\/+$/, '');
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
  const simpleSectionText = getSimpleSectionsText(simpleSections).trim();
  const blockText = getBlockText(blocks).trim();
  const text = simpleSectionText || blockText || [content, toPlainText(contentHtml)].join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
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

function cleanTitleAlt(alt = '', title = '') {
  const value = String(alt || '').trim();
  const titleValue = String(title || '').trim();
  return value && value !== titleValue ? value : '';
}

function normalizePostImage(value, fallbackAlt = '', title = '') {
  const fallback = cleanTitleAlt(fallbackAlt, title);
  const image = normalizeImage(value, fallback);

  return {
    ...image,
    alt: cleanTitleAlt(image.alt, title)
  };
}

function normalizeSimpleSections(sections = [], title = '') {
  const source = Array.isArray(sections) ? sections : [];

  return Array.from({ length: SIMPLE_BLOG_SECTION_COUNT }, (_, index) => {
    const section = source[index] || {};
    const html = toStringValue(section.html);
    const image = normalizePostImage(section.image || section.imageUrl || '', section.image?.alt || section.alt || '', title);

    return {
      id: section.id || `section-${index + 1}`,
      paragraph: toStringValue(section.paragraph || section.text || toPlainText(html)),
      html,
      textType: section.textType || 'paragraph',
      textStyle: section.textStyle || 'classic',
      alignment: section.alignment || 'left',
      image: {
        ...image,
        alt: image.alt || '',
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
  const altText = cleanTitleAlt(toStringValue(body.altText, currentData.altText), title);
  const status = ['draft', 'published', 'scheduled', 'private'].includes(body.status)
    ? body.status
    : currentData.status || 'draft';
  const category = toStringValue(body.category, currentData.category || body.tag || 'Bridal Blouses');
  const simpleSections = normalizeSimpleSections(body.simpleSections ?? currentData.simpleSections ?? [], title);
  const firstSimpleImage = simpleSections.find((section) => section.image.url)?.image;
  const requestedFeaturedImage = normalizePostImage(body.featuredImage ?? currentData.featuredImage ?? '', '', title);
  const featuredImage = requestedFeaturedImage.url
    ? requestedFeaturedImage
    : normalizePostImage(body.coverImage ?? currentData.coverImage ?? firstSimpleImage ?? DEFAULT_POST_IMAGE, '', title);
  const coverImage = featuredImage.url || DEFAULT_POST_IMAGE;
  const imageLibrary = Array.isArray(body.images)
    ? body.images.map((image) => normalizePostImage(image, '', title))
    : Array.isArray(currentData.images)
      ? currentData.images.map((image) => normalizePostImage(image, '', title))
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
      image: normalizePostImage(body.openGraph?.image ?? currentData.openGraph?.image ?? coverImage, '', title)
    },
    twitter: {
      title: toStringValue(body.twitter?.title, currentData.twitter?.title || seoTitle || title),
      description: toStringValue(body.twitter?.description, currentData.twitter?.description || metaDescription || excerpt),
      image: normalizePostImage(body.twitter?.image ?? currentData.twitter?.image ?? coverImage, '', title)
    },
    facebook: {
      title: toStringValue(body.facebook?.title, currentData.facebook?.title || seoTitle || title),
      description: toStringValue(body.facebook?.description, currentData.facebook?.description || metaDescription || excerpt),
      image: normalizePostImage(body.facebook?.image ?? currentData.facebook?.image ?? coverImage, '', title)
    },
    social: {
      pinterestImage: normalizePostImage(body.social?.pinterestImage ?? currentData.social?.pinterestImage ?? coverImage, '', title)
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
  const currentDocumentId = currentId == null ? null : String(currentId);
  let candidate = baseSlug;
  let counter = 1;

  while (true) {
    // Admin SDK check for existing slug
    const snapshot = await db.collection('posts').where('slug', '==', candidate).get();
    const collision = snapshot.docs.find((item) => String(item.id) !== currentDocumentId);

    if (!collision) return candidate;
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

async function hasSlugCollision(slug, currentId = null) {
  if (!slug) return false;

  const currentDocumentId = currentId == null ? null : String(currentId);
  const snapshot = await db.collection('posts').where('slug', '==', slug).get();

  return snapshot.docs.some((item) => String(item.id) !== currentDocumentId);
}

async function buildUpdatePayload(body, currentData, postId) {
  const payload = normalizePostPayload(body, currentData);
  const requestedSlug = slugify(body.slug ?? currentData.slug ?? payload.title);
  const currentSlug = slugify(currentData.slug || '');
  const isSlugUnchanged = currentSlug && requestedSlug === currentSlug;

  payload.slug = isSlugUnchanged && !(await hasSlugCollision(currentSlug, postId))
    ? currentSlug
    : await buildUniqueSlug(payload.title, postId, requestedSlug);
  payload.url = `${BLOG_BASE_PATH}/${payload.slug}`;
  payload.updatedAt = Timestamp.now();

  return payload;
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
 * GET /api/posts/settings
 */
export async function getBlogSettings(req, res, next) {
  try {
    const snapshot = await db.collection(BLOG_SETTINGS_COLLECTION).doc(BLOG_SETTINGS_DOC_ID).get();

    res.json({
      item: snapshot.exists
        ? {
            id: snapshot.id,
            ...serializeFirestore(snapshot.data())
          }
        : null
    });
  } catch (error) {
    console.error('Firestore Error in getBlogSettings:', error.message);
    next(error);
  }
}

/**
 * PUT /api/posts/settings
 */
export async function updateBlogSettings(req, res, next) {
  try {
    const reference = db.collection(BLOG_SETTINGS_COLLECTION).doc(BLOG_SETTINGS_DOC_ID);
    const settings = { ...(req.body || {}) };
    delete settings.id;
    delete settings.createdAt;
    delete settings.updatedAt;

    const payload = {
      ...settings,
      updatedAt: Timestamp.now()
    };

    await reference.set(payload, { merge: true });

    const snapshot = await reference.get();
    res.json({
      item: {
        id: snapshot.id,
        ...serializeFirestore(snapshot.data())
      }
    });
  } catch (error) {
    console.error('Firestore Error in updateBlogSettings:', error.message);
    next(error);
  }
}

/**
 * POST /api/posts
 */
export async function createPost(req, res, next) {
  try {
    const requestedId = toStringValue(req.body.id);

    if (requestedId) {
      const existingRef = db.collection('posts').doc(requestedId);
      const existingSnapshot = await existingRef.get();

      if (existingSnapshot.exists) {
        const currentData = existingSnapshot.data();
        const payload = await buildUpdatePayload(req.body, currentData, requestedId);

        if (!payload.title) {
          return res.status(400).json({ message: 'Blog title is required.' });
        }

        await existingRef.update(payload);

        if (payload.status === 'published') {
          void pingGoogleSitemap();
        }

        return res.json({
          item: {
            id: requestedId,
            ...serializeFirestore({ ...currentData, ...payload })
          },
          updatedExisting: true
        });
      }
    }

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
    const payload = await buildUpdatePayload(req.body, currentData, req.params.id);

    if (!payload.title) {
      return res.status(400).json({ message: 'Blog title is required.' });
    }

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

const STATIC_SITEMAP_PAGES = [
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

function formatSitemapDate(dateValue) {
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

/**
 * GET /api/posts/sitemap.xml
 * GET /sitemap.xml
 */
export async function getPostsSitemap(req, res, next) {
  try {
    const siteUrl = getPublicSiteUrl();
    const [postsSnapshot, landingPagesSnapshot] = await Promise.all([
      db.collection('posts').get(),
      db.collection('landing_pages').get().catch(() => ({ docs: [] }))
    ]);

    const items = postsSnapshot.docs
      .map(mapDocument)
      .filter(isPostPublic)
      .sort((a, b) => new Date(b.updatedAt || b.publishedAt || b.createdAt || 0) - new Date(a.updatedAt || a.publishedAt || a.createdAt || 0));

    const landingPages = landingPagesSnapshot.docs
      .map(mapDocument)
      .filter(isPostPublic)
      .sort((a, b) => new Date(b.updatedAt || b.publishedAt || b.createdAt || 0) - new Date(a.updatedAt || a.publishedAt || a.createdAt || 0));

    const staticUrls = STATIC_SITEMAP_PAGES.map((page) => ({
      loc: `${siteUrl}${page.path ? page.path : '/'}`,
      lastmod: page.lastmod,
      changefreq: page.changefreq,
      priority: page.priority
    }));

    const blogUrls = items.map((item) => {
      const rawDate = item.updatedAt || item.publishedAt || item.createdAt;
      return {
        loc: `${siteUrl}${BLOG_BASE_PATH}/${item.slug}`,
        lastmod: formatSitemapDate(rawDate),
        changefreq: 'weekly',
        priority: '0.8'
      };
    });

    const landingPageUrls = landingPages.map((item) => {
      const rawDate = item.updatedAt || item.publishedAt || item.createdAt;
      return {
        loc: `${siteUrl}/bangalore/${item.slug}`,
        lastmod: formatSitemapDate(rawDate),
        changefreq: 'weekly',
        priority: '0.8'
      };
    });

    const allUrls = [...staticUrls, ...blogUrls, ...landingPageUrls];

    const xmlEntries = allUrls.map((item) => {
      return [
        '  <url>',
        `    <loc>${item.loc}</loc>`,
        `    <lastmod>${item.lastmod}</lastmod>`,
        `    <changefreq>${item.changefreq}</changefreq>`,
        `    <priority>${item.priority}</priority>`,
        '  </url>'
      ].join('\n');
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries.join('\n')}\n</urlset>\n`;

    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  } catch (error) {
    console.error("🔥 Firestore Error in getPostsSitemap:", error.message);
    next(error);
  }
}

/**
 * GET /api/posts/slug/:slug
 */
export async function getPostBySlug(req, res, next) {
  try {
    const rawSlug = String(req.params.slug || '').trim();
    const slug = slugify(rawSlug);
    let snapshot = await db.collection('posts').where('slug', '==', slug).limit(1).get();

    if (snapshot.empty && rawSlug !== slug) {
      snapshot = await db.collection('posts').where('slug', '==', rawSlug).limit(1).get();
    }

    if (snapshot.empty) {
      const allSnapshot = await db.collection('posts').get();
      const matchedDoc = allSnapshot.docs.find((doc) => {
        const data = doc.data();
        return (
          slugify(data.slug || '') === slug ||
          slugify(data.title || '') === slug ||
          doc.id === rawSlug
        );
      });

      if (!matchedDoc) {
        return res.status(404).json({ message: 'Blog post not found.' });
      }

      const item = mapDocument(matchedDoc);
      if (!isPostPublic(item) && req.user?.role !== 'admin') {
        return res.status(404).json({ message: 'Blog post not found.' });
      }

      return res.json({ item });
    }

    const item = mapDocument(snapshot.docs[0]);

    if (!isPostPublic(item) && req.user?.role !== 'admin') {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.json({ item });
  } catch (error) {
    console.error("🔥 Firestore Error in getPostBySlug:", error.message);
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
