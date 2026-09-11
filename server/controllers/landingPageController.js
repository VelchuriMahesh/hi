import { db, mapDocument, serializeFirestore, Timestamp } from '../services/firebase.js';
import slugify from '../utils/slugify.js';

const DEFAULT_LANDING_IMAGE = '/bridal/bridalblow/hero-bridal.webp';
const BANGALORE_BASE_PATH = '/bangalore';
const LANDING_PAGE_COLLECTION = 'landing_pages';
const LOCATION_COLLECTION = 'bangalore_locations';

export const DEFAULT_BANGALORE_LOCATIONS = [
  { name: 'Mahalakshmipuram', areaGroup: 'Bangalore West', displayOrder: 1, status: 'active', isMainBoutique: true },
  { name: 'Rajajinagar', areaGroup: 'Bangalore West', displayOrder: 2, status: 'active' },
  { name: 'Malleshwaram', areaGroup: 'Bangalore West', displayOrder: 3, status: 'active' },
  { name: 'Basaveshwaranagar', areaGroup: 'Bangalore West', displayOrder: 4, status: 'active' },
  { name: 'Vijayanagar', areaGroup: 'Bangalore West', displayOrder: 5, status: 'active' },
  { name: 'Yeshwanthpur', areaGroup: 'Bangalore North', displayOrder: 6, status: 'active' },
  { name: 'Nandini Layout', areaGroup: 'Bangalore North', displayOrder: 7, status: 'active' },
  { name: 'Sadashivanagar', areaGroup: 'Bangalore North', displayOrder: 8, status: 'active' },
  { name: 'Hebbal', areaGroup: 'Bangalore North', displayOrder: 9, status: 'active' },
  { name: 'Indiranagar', areaGroup: 'Bangalore East', displayOrder: 10, status: 'active' },
  { name: 'Whitefield', areaGroup: 'Bangalore East', displayOrder: 11, status: 'active' },
  { name: 'Koramangala', areaGroup: 'Bangalore South', displayOrder: 12, status: 'active' },
  { name: 'HSR Layout', areaGroup: 'Bangalore South', displayOrder: 13, status: 'active' },
  { name: 'Jayanagar', areaGroup: 'Bangalore South', displayOrder: 14, status: 'active' },
  { name: 'JP Nagar', areaGroup: 'Bangalore South', displayOrder: 15, status: 'active' },
  { name: 'Electronic City', areaGroup: 'Bangalore South', displayOrder: 16, status: 'active' }
];

export const DEFAULT_EXISTING_LANDING_PAGES = [
  {
    title: 'Customized Bridal Blouse in Bangalore | Maggam & Aari Work | Shrusara',
    serviceCategory: 'Bridal Blouse',
    locationName: 'Bangalore',
    areaGroup: 'Bangalore West',
    status: 'published',
    slug: 'customized-bridal-blouse-bangalore',
    url: '/customized-bridal-blouse-bangalore',
    canonicalUrl: 'https://www.shrusara.com/customized-bridal-blouse-bangalore',
    metaTitle: 'Customized Bridal Blouse in Bangalore | Maggam & Aari Work | Shrusara',
    metaDescription: 'Customized bridal blouses in Bangalore with premium maggam and aari work, perfect fit, and 1-on-1 design consultation with Chief Designer Shruthi Ajith.',
    metaKeywords: [
      'bridal blouse bangalore',
      'customized bridal blouse',
      'maggam work blouse bangalore',
      'aari work blouse',
      'wedding blouse designer bangalore',
      'bridal boutique bangalore'
    ],
    featuredImage: {
      url: '/bridal/bridalblow/hero-bridal.webp',
      alt: 'Customized Bridal Blouse in Bangalore'
    }
  },
  {
    title: 'Customized Designer Outfits & Gowns in Bangalore | Shrusara',
    serviceCategory: 'Designer Outfits',
    locationName: 'Bangalore',
    areaGroup: 'Bangalore',
    status: 'published',
    slug: 'customized-designer-outfits-bangalore',
    url: '/customized-designer-outfits-bangalore',
    canonicalUrl: 'https://www.shrusara.com/customized-designer-outfits-bangalore',
    metaTitle: 'Customized Designer Outfits & Gowns in Bangalore | Shrusara',
    metaDescription: 'Customized designer gowns, indo-western outfits, and lehengas in Bangalore with personalized design, perfect fit, and boutique finishing by Shrusara.',
    metaKeywords: [
      'designer outfits bangalore',
      'customized gowns bangalore',
      'indo western wear bangalore',
      'designer lehenga bangalore',
      'evening gowns bangalore',
      'designer boutique bangalore'
    ],
    featuredImage: {
      url: '/videos/desingerhero.webp',
      alt: 'Customized Designer Outfits & Gowns in Bangalore'
    }
  },
  {
    title: 'Customized Occasion Wear & Designer Outfits Bangalore | Shrusara',
    serviceCategory: 'Occasion Wear',
    locationName: 'Bangalore',
    areaGroup: 'Bangalore',
    status: 'published',
    slug: 'customized-occasion-wear-bangalore',
    url: '/customized-occasion-wear-bangalore',
    canonicalUrl: 'https://www.shrusara.com/customized-occasion-wear-bangalore',
    metaTitle: 'Customized Occasion Wear & Designer Outfits Bangalore | Shrusara',
    metaDescription: 'Customized occasion wear in Bangalore including designer gowns, crop top lehengas, half sarees, and designer blouses crafted with perfect fit by Shrusara.',
    metaKeywords: [
      'occasion wear bangalore',
      'designer gowns bangalore',
      'crop top lehenga bangalore',
      'half saree bangalore',
      'boutique bangalore',
      'party wear bangalore'
    ],
    featuredImage: {
      url: '/occasion_wear/Designer%20Gowns%20&%20Indo%20western%20outfits/Designer%20Gowns%20&%20Indo%20western%20outfits/indo-western-fusion-bridal-wear-shrusara.webp',
      alt: 'Customized Occasion Wear & Designer Outfits in Bangalore'
    }
  },
  {
    title: 'Ready-to-Wear Saree Customization in Bangalore | Shrusara',
    serviceCategory: 'Ready-to-Wear Saree',
    locationName: 'Bangalore',
    areaGroup: 'Bangalore',
    status: 'published',
    slug: 'ready-to-wear-saree-bangalore',
    url: '/ready-to-wear-saree-bangalore',
    canonicalUrl: 'https://www.shrusara.com/ready-to-wear-saree-bangalore',
    metaTitle: 'Ready-to-Wear Saree Customization in Bangalore | Shrusara',
    metaDescription: 'Convert your own saree into a ready-to-wear saree in Bangalore with permanent pleats, premium lining, secure fit, and boutique finishing by Shrusara.',
    metaKeywords: [
      'ready to wear saree Bangalore',
      'pre stitched saree Bangalore',
      'one minute saree Bangalore',
      'saree customization Bangalore'
    ],
    featuredImage: {
      url: '/occasion_wear/sareetransformation_landing/Ready%20to%20wear%20Saree/Ready%20to%20wear%20Saree/customized-ready-to-wear-saree-front-view-bangalore.webp',
      alt: 'Ready-to-Wear Saree Customization in Bangalore'
    }
  },
  {
    title: 'Ready-to-Wear Saree & Saree Transformation in Bangalore | Shrusara',
    serviceCategory: 'Saree Transformation',
    locationName: 'Bangalore',
    areaGroup: 'Bangalore',
    status: 'published',
    slug: 'saree-transformation-bangalore',
    url: '/saree-transformation-bangalore',
    canonicalUrl: 'https://www.shrusara.com/saree-transformation-bangalore',
    metaTitle: 'Ready-to-Wear Saree & Saree Transformation in Bangalore | Shrusara',
    metaDescription: 'Transform your traditional sarees into ready-to-wear pre-stitched sarees, lehengas, gowns, and indo-western outfits in Bangalore at Shrusara.',
    metaKeywords: [
      'ready to wear saree bangalore',
      'saree transformation bangalore',
      'pre stitched saree bangalore',
      'saree to lehenga bangalore',
      'convert old saree bangalore'
    ],
    featuredImage: {
      url: '/occasion_wear/sareetransformation_landing/Ready%20to%20wear%20Saree/Ready%20to%20wear%20Saree/ready-to-wear-saree-bangalore.webp',
      alt: 'Ready-to-Wear Saree & Saree Transformation in Bangalore'
    }
  }
];

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

function normalizeImage(value, fallbackAlt = '') {
  if (typeof value === 'string') {
    return {
      url: value.trim(),
      alt: fallbackAlt,
      caption: '',
      fileName: '',
      uploadedAt: new Date().toISOString()
    };
  }

  if (typeof value === 'object' && value !== null) {
    return {
      url: toStringValue(value.url || value.src),
      alt: toStringValue(value.alt || fallbackAlt),
      caption: toStringValue(value.caption),
      fileName: toStringValue(value.fileName),
      uploadedAt: toStringValue(value.uploadedAt || new Date().toISOString())
    };
  }

  return {
    url: '',
    alt: fallbackAlt,
    caption: '',
    fileName: '',
    uploadedAt: new Date().toISOString()
  };
}

function isPagePublic(page) {
  if (!page) return false;
  if ((page.status || 'published') !== 'published') return false;
  if (!page.publishedAt) return true;
  return new Date(page.publishedAt).getTime() <= Date.now();
}

async function buildUniqueSlug(titleOrSlug, excludeId = null) {
  const base = slugify(titleOrSlug) || 'bangalore-custom-service';
  let candidate = base;
  let count = 1;

  while (true) {
    const snapshot = await db
      .collection(LANDING_PAGE_COLLECTION)
      .where('slug', '==', candidate)
      .get();

    const matches = snapshot.docs.filter((doc) => doc.id !== excludeId);

    if (!matches.length) {
      return candidate;
    }

    count += 1;
    candidate = `${base}-${count}`;
  }
}

function normalizeLandingPagePayload(body = {}, existing = {}) {
  const title = toStringValue(body.title || body.pageTitle || existing.title || 'Untitled Landing Page');
  const serviceCategory = toStringValue(body.serviceCategory || existing.serviceCategory || 'Bridal Blouse');
  const locationName = toStringValue(body.locationName || body.location || existing.locationName || 'Bangalore');
  const areaGroup = toStringValue(body.areaGroup || existing.areaGroup || 'Bangalore');

  const status = ['draft', 'published', 'scheduled'].includes(body.status)
    ? body.status
    : existing.status || 'draft';

  const metaTitle = toStringValue(
    body.metaTitle || `${serviceCategory} in ${locationName}, Bangalore | Shrusara Fashion Boutique`
  );
  const metaDescription = toStringValue(
    body.metaDescription ||
      `Customized ${serviceCategory.toLowerCase()} in ${locationName}, Bangalore with perfect fit, handcrafted embroidery and personalized designer consultation by Shrusara.`
  );
  const metaKeywords = toArray(body.metaKeywords || body.keywords || [
    `${serviceCategory.toLowerCase()} ${locationName.toLowerCase()}`,
    `${serviceCategory.toLowerCase()} bangalore`,
    `customized ${serviceCategory.toLowerCase()} ${locationName.toLowerCase()}`,
    'designer boutique bangalore',
    'shrusara fashion boutique'
  ]);

  const featuredImage = normalizeImage(
    body.featuredImage || body.heroImage || existing.featuredImage || DEFAULT_LANDING_IMAGE,
    `${serviceCategory} in ${locationName}, Bangalore`
  );

  // Hero Section
  const hero = {
    badge: toStringValue(body.hero?.badge || body.heroBadge || '100% Customized | Bangalore Boutique'),
    heading: toStringValue(body.hero?.heading || body.heroHeading || title),
    tagline: toStringValue(
      body.hero?.tagline ||
        body.heroTagline ||
        `Customized to your exact measurements with handcrafted perfection in ${locationName}, Bangalore.`
    ),
    highlights: Array.isArray(body.hero?.highlights)
      ? body.hero.highlights.map(toStringValue).filter(Boolean)
      : [
          'Personalized 1-on-1 Designer Consultation',
          'Perfect Fit Guarantee with Multiple Trials',
          'Handcrafted Maggam & Aari Work by Master Artisans',
          'Doorstep Porter & Courier Service Across Bangalore'
        ],
    primaryCtaText: toStringValue(body.hero?.primaryCtaText || 'Chat on WhatsApp'),
    primaryCtaMessage: toStringValue(
      body.hero?.primaryCtaMessage ||
        `Hi Shrusara, I would like to know about ${serviceCategory} customization in ${locationName}, Bangalore.`
    ),
    secondaryCtaText: toStringValue(body.hero?.secondaryCtaText || 'Book Consultation'),
    secondaryCtaLink: toStringValue(body.hero?.secondaryCtaLink || '#contact')
  };

  // About Section
  const about = {
    heading: toStringValue(
      body.about?.heading || `Customized ${serviceCategory} Tailoring in ${locationName}, Bangalore`
    ),
    description: toStringValue(
      body.about?.description ||
        `At Shrusara Fashion Boutique, we specialize exclusively in customized ${serviceCategory.toLowerCase()} tailored to your unique body shape, style, and occasion. Whether you are in ${locationName} or anywhere across Bangalore, experience master artisan craftsmanship, premium fabrics, and personalized attention.`
    ),
    highlights: Array.isArray(body.about?.highlights) && body.about.highlights.length
      ? body.about.highlights.map((h, idx) => ({
          title: toStringValue(h.title || `Feature ${idx + 1}`),
          description: toStringValue(h.description || '')
        }))
      : [
          { title: '100% Bespoke Pattern Drafting', description: 'Every pattern is uniquely drafted to your specific measurements for a flawless silhouette.' },
          { title: 'Artisan Maggam & Hand Embroidery', description: 'Handcrafted zardosi, cutwork, thread, and stone embroidery by generational master artisans.' },
          { title: 'Fabric & Color Guidance', description: '1-on-1 designer assistance to select complementary silks, linings, and contrast palettes.' },
          { title: 'Multiple Trial Fittings', description: 'Comprehensive intermediate trials to ensure complete comfort, zero gaping, and total confidence.' },
          { title: 'Express Delivery Option', description: 'Need it urgently for an upcoming event? Priority timeline slots available for Bangalore clients.' },
          { title: 'Post-Fit Adjustments', description: 'Complimentary minor tweaks and lifetime styling advice for every Shrusara creation.' }
        ]
  };

  // Why Choose Us
  const whyChooseUs = {
    heading: toStringValue(
      body.whyChooseUs?.heading || `Why Brides & Fashion Enthusiasts in ${locationName} Choose Shrusara`
    ),
    description: toStringValue(
      body.whyChooseUs?.description ||
        'Shrusara is strictly a customization-only boutique. We do not sell mass-produced ready-made stock. Every single piece is individually envisioned, cut, embroidered, and tailored for you.'
    ),
    cards: Array.isArray(body.whyChooseUs?.cards) && body.whyChooseUs.cards.length
      ? body.whyChooseUs.cards.map((c, idx) => ({
          title: toStringValue(c.title || `Advantage ${idx + 1}`),
          description: toStringValue(c.description || '')
        }))
      : [
          { title: 'Direct Access to Chief Designer', description: 'Work directly with Founder & Chief Designer Shruthi Ajith for bespoke styling ideas.' },
          { title: 'Master Tailoring Specialists', description: 'Over a decade of boutique tailoring mastery delivering precision finishing.' },
          { title: 'Zero Stock, 100% Customized', description: 'Pure custom creation. No pre-stitched compromises or recycled designs.' },
          { title: 'High-Grade Linings & Comfort', description: 'Breathable, skin-friendly inner linings ensuring hours of irritation-free wear.' },
          { title: 'Transparent Pricing & Timelines', description: 'Clear design breakdown with no hidden charges and committed delivery dates.' },
          { title: 'Trusted by 1000+ Bangalore Clients', description: 'Celebrated for flawless bridal finishes across Mahalakshmipuram, Rajajinagar, and Bangalore.' }
        ]
  };

  // 5-Step Customization Journey
  const processSteps = Array.isArray(body.processSteps) && body.processSteps.length
    ? body.processSteps.map((step, idx) => ({
        stepNumber: idx + 1,
        title: toStringValue(step.title || `Step ${idx + 1}`),
        description: toStringValue(step.description || ''),
        duration: toStringValue(step.duration || '')
      }))
    : [
        { stepNumber: 1, title: '1-on-1 Design Consultation', description: 'Discuss your vision, occasion, fabric choices, and silhouette preferences at our Mahalakshmipuram boutique or virtually.', duration: 'Day 1' },
        { stepNumber: 2, title: 'Precision Measurements & Patterning', description: 'Detailed anatomical measurements taken to draft your customized master pattern.', duration: 'Day 1-2' },
        { stepNumber: 3, title: 'Artisan Embroidery & Maggam Crafting', description: 'Hand embroidery traced and executed stitch-by-stitch by master craftsmen on traditional wooden frames.', duration: 'Day 3-10' },
        { stepNumber: 4, title: 'Structure Stitching & Trial Fitting', description: 'Precision stitching with comfort inner linings followed by an intermediate trial fitting.', duration: 'Day 11-14' },
        { stepNumber: 5, title: 'Final Handover / Express Delivery', description: 'Final finishing, steam press, quality check, and boutique handover or doorstep delivery in Bangalore.', duration: 'Final Day' }
      ];

  // Gallery
  const gallery = Array.isArray(body.gallery)
    ? body.gallery.map((img) => normalizeImage(img, `${serviceCategory} design Bangalore`)).filter((img) => img.url)
    : [];

  // Proximity & Location details
  const proximity = {
    locationName,
    areaGroup,
    boutiqueAddress: '106, 6th Main Road, Mahalakshmipuram, Bangalore - 560086',
    landmark: toStringValue(body.proximity?.landmark || 'Near Mahalakshmi Metro Station / Rajajinagar 1st Block'),
    distanceNote: toStringValue(
      body.proximity?.distanceNote ||
        `Easily accessible from ${locationName}. We also offer Porter courier pick-up & delivery for fabric handover and trials across Bangalore.`
    ),
    workingHours: toStringValue(body.proximity?.workingHours || 'Mon - Sun: 10:30 AM to 8:30 PM (By Appointment & Walk-in)'),
    googleMapsUrl: toStringValue(
      body.proximity?.googleMapsUrl || 'https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore'
    )
  };

  // Testimonials
  const testimonials = Array.isArray(body.testimonials) && body.testimonials.length
    ? body.testimonials.map((t) => ({
        name: toStringValue(t.name || 'Bangalore Client'),
        location: toStringValue(t.location || locationName),
        rating: Number(t.rating) || 5,
        outfitType: toStringValue(t.outfitType || serviceCategory),
        reviewText: toStringValue(t.reviewText || '')
      }))
    : [
        {
          name: 'Pooja R.',
          location: locationName,
          rating: 5,
          outfitType: serviceCategory,
          reviewText: `Shrusara made the most exquisite ${serviceCategory.toLowerCase()} for my wedding. The fitting was 100% spot-on on the very first trial! Highly recommended for anyone in Bangalore looking for true custom perfection.`
        },
        {
          name: 'Meghana S.',
          location: 'Bangalore',
          rating: 5,
          outfitType: serviceCategory,
          reviewText: `The attention to detail and embroidery finishing is unmatched. Shruthi ma'am understood exactly what I wanted and delivered ahead of schedule.`
        }
      ];

  // FAQs
  const faqs = Array.isArray(body.faqs) && body.faqs.length
    ? body.faqs.map((faq) => ({
        question: toStringValue(faq.question),
        answer: toStringValue(faq.answer)
      })).filter((faq) => faq.question && faq.answer)
    : [
        {
          question: `How does customized ${serviceCategory.toLowerCase()} stitching work at Shrusara?`,
          answer: `We start with a 1-on-1 design consultation to understand your preferences, take precision measurements, draft an individual pattern, execute handcrafted embroidery, conduct a trial fitting, and deliver your perfectly fitted outfit.`
        },
        {
          question: `How far in advance should I book my ${serviceCategory.toLowerCase()} customization?`,
          answer: `For bridal and intricate maggam work, we recommend booking 3 to 6 weeks in advance. For urgent wedding dates or express requirements in ${locationName}, please contact us directly to check expedited slot availability.`
        },
        {
          question: `Can I provide my own fabric or saree for customization?`,
          answer: `Yes, absolutely! You can bring your own fabric, saree, or blouse material. We also provide complete fabric sourcing guidance to help you choose the best matching textures and colors.`
        },
        {
          question: `Do you offer doorstep pickup or delivery in ${locationName}, Bangalore?`,
          answer: `Yes! While we recommend visiting our Mahalakshmipuram boutique for initial measurements and trials, we regularly arrange secure Porter and express courier delivery across all areas of Bangalore including ${locationName}.`
        },
        {
          question: `What makes Shrusara different from other boutiques in Bangalore?`,
          answer: `Shrusara is 100% custom-only. We do not sell mass-produced ready-made garments. Every single garment is crafted under the direct supervision of Founder & Chief Designer Shruthi Ajith with master artisans.`
        }
      ];

  // CTA Section
  const cta = {
    heading: toStringValue(
      body.cta?.heading || `Ready for Your Custom ${serviceCategory} in ${locationName}?`
    ),
    subheading: toStringValue(
      body.cta?.subheading ||
        `Book your 1-on-1 consultation with Chief Designer Shruthi Ajith today. Experience handcrafted boutique luxury in Bangalore.`
    ),
    whatsappText: toStringValue(body.cta?.whatsappText || 'Chat with Designer on WhatsApp'),
    callText: toStringValue(body.cta?.callText || 'Call Shrusara Boutique')
  };

  return {
    title,
    serviceCategory,
    locationName,
    areaGroup,
    status,
    metaTitle,
    metaDescription,
    metaKeywords,
    featuredImage,
    hero,
    about,
    whyChooseUs,
    processSteps,
    gallery,
    proximity,
    testimonials,
    faqs,
    cta,
    publishedAt: status === 'published' ? body.publishedAt || existing.publishedAt || new Date().toISOString() : ''
  };
}

/**
 * GET /api/landing-pages
 * Public: returns published landing pages
 */
export async function listLandingPages(req, res, next) {
  try {
    let snapshot = await db.collection(LANDING_PAGE_COLLECTION).get();

    if (snapshot.empty) {
      // Seed default existing landing pages if collection is empty
      const batch = db.batch();
      for (const page of DEFAULT_EXISTING_LANDING_PAGES) {
        const docRef = db.collection(LANDING_PAGE_COLLECTION).doc(page.slug);
        batch.set(docRef, {
          ...page,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      await batch.commit();
      snapshot = await db.collection(LANDING_PAGE_COLLECTION).get();
    }

    let items = snapshot.docs.map(mapDocument).filter(isPagePublic);

    // Optional query filters
    const { service, location, area } = req.query;
    if (service) {
      items = items.filter((item) => String(item.serviceCategory || '').toLowerCase() === String(service).toLowerCase());
    }
    if (location) {
      items = items.filter((item) => String(item.locationName || '').toLowerCase() === String(location).toLowerCase());
    }
    if (area) {
      items = items.filter((item) => String(item.areaGroup || '').toLowerCase() === String(area).toLowerCase());
    }

    items.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));

    res.json({
      items,
      count: items.length
    });
  } catch (error) {
    console.error('🔥 Firestore Error in listLandingPages:', error.message);
    next(error);
  }
}

/**
 * GET /api/landing-pages/admin
 * Admin: returns all landing pages (drafts + published)
 */
export async function listAdminLandingPages(req, res, next) {
  try {
    let snapshot = await db.collection(LANDING_PAGE_COLLECTION).get();

    if (snapshot.empty) {
      const batch = db.batch();
      for (const page of DEFAULT_EXISTING_LANDING_PAGES) {
        const docRef = db.collection(LANDING_PAGE_COLLECTION).doc(page.slug);
        batch.set(docRef, {
          ...page,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      await batch.commit();
      snapshot = await db.collection(LANDING_PAGE_COLLECTION).get();
    }

    const items = snapshot.docs.map(mapDocument);

    items.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));

    res.json({
      items,
      count: items.length
    });
  } catch (error) {
    console.error('🔥 Firestore Error in listAdminLandingPages:', error.message);
    next(error);
  }
}

/**
 * GET /api/landing-pages/slug/:slug
 */
export async function getLandingPageBySlug(req, res, next) {
  try {
    const rawSlug = toStringValue(req.params.slug).toLowerCase();
    const snapshot = await db
      .collection(LANDING_PAGE_COLLECTION)
      .where('slug', '==', rawSlug)
      .limit(1)
      .get();

    let doc = snapshot.docs[0];

    // Fallback: search by document ID if not found by slug
    if (!doc) {
      const docSnapshot = await db.collection(LANDING_PAGE_COLLECTION).doc(rawSlug).get();
      if (docSnapshot.exists) {
        doc = docSnapshot;
      }
    }

    if (!doc) {
      const matchedPreset = DEFAULT_EXISTING_LANDING_PAGES.find((p) => p.slug === rawSlug);
      if (matchedPreset) {
        return res.json({ item: { id: matchedPreset.slug, ...matchedPreset } });
      }
      return res.status(404).json({ message: 'Landing page not found.' });
    }

    const item = mapDocument(doc);

    // Track view asynchronously
    try {
      const pageRef = db.collection(LANDING_PAGE_COLLECTION).doc(doc.id);
      const analytics = {
        views: Number(item.analytics?.views || 0) + 1,
        lastViewedAt: new Date().toISOString()
      };
      await pageRef.update({ analytics });
    } catch {
      // view tracking error shouldn't block response
    }

    res.json({ item });
  } catch (error) {
    console.error('🔥 Firestore Error in getLandingPageBySlug:', error.message);
    next(error);
  }
}

/**
 * GET /api/landing-pages/:id
 */
export async function getLandingPageById(req, res, next) {
  try {
    const doc = await db.collection(LANDING_PAGE_COLLECTION).doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Landing page not found.' });
    }

    res.json({ item: mapDocument(doc) });
  } catch (error) {
    console.error('🔥 Firestore Error in getLandingPageById:', error.message);
    next(error);
  }
}

/**
 * POST /api/landing-pages
 */
export async function createLandingPage(req, res, next) {
  try {
    const normalized = normalizeLandingPagePayload(req.body);
    const slug = await buildUniqueSlug(req.body.slug || normalized.title);
    const url = `${BANGALORE_BASE_PATH}/${slug}`;

    const payload = {
      ...normalized,
      slug,
      url,
      canonicalUrl: `${getPublicSiteUrl()}${url}`,
      analytics: {
        views: 0,
        conversions: 0
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await db.collection(LANDING_PAGE_COLLECTION).add(payload);
    const created = await docRef.get();

    res.status(201).json({
      item: mapDocument(created)
    });
  } catch (error) {
    console.error('🔥 Firestore Error in createLandingPage:', error.message);
    next(error);
  }
}

/**
 * PUT /api/landing-pages/:id
 */
export async function updateLandingPageById(req, res, next) {
  try {
    const docRef = db.collection(LANDING_PAGE_COLLECTION).doc(req.params.id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Landing page not found.' });
    }

    const existing = snapshot.data();
    const normalized = normalizeLandingPagePayload(req.body, existing);

    let slug = existing.slug;
    if (req.body.slug && req.body.slug !== existing.slug) {
      slug = await buildUniqueSlug(req.body.slug, req.params.id);
    }

    const url = `${BANGALORE_BASE_PATH}/${slug}`;

    const payload = {
      ...existing,
      ...normalized,
      slug,
      url,
      canonicalUrl: `${getPublicSiteUrl()}${url}`,
      updatedAt: Timestamp.now()
    };

    await docRef.set(payload, { merge: true });
    const updated = await docRef.get();

    res.json({
      item: mapDocument(updated)
    });
  } catch (error) {
    console.error('🔥 Firestore Error in updateLandingPageById:', error.message);
    next(error);
  }
}

/**
 * DELETE /api/landing-pages/:id
 */
export async function deleteLandingPageById(req, res, next) {
  try {
    const docRef = db.collection(LANDING_PAGE_COLLECTION).doc(req.params.id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Landing page not found.' });
    }

    await docRef.delete();
    res.json({ message: 'Landing page deleted successfully.' });
  } catch (error) {
    console.error('🔥 Firestore Error in deleteLandingPageById:', error.message);
    next(error);
  }
}

/**
 * POST /api/landing-pages/:id/duplicate
 */
export async function duplicateLandingPageById(req, res, next) {
  try {
    const docRef = db.collection(LANDING_PAGE_COLLECTION).doc(req.params.id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Landing page not found.' });
    }

    const source = snapshot.data();
    const title = `${source.title || 'Untitled'} (Copy)`;
    const slug = await buildUniqueSlug(title);
    const url = `${BANGALORE_BASE_PATH}/${slug}`;

    const payload = {
      ...source,
      title,
      slug,
      url,
      canonicalUrl: `${getPublicSiteUrl()}${url}`,
      status: 'draft',
      analytics: {
        views: 0,
        conversions: 0
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const createdRef = await db.collection(LANDING_PAGE_COLLECTION).add(payload);
    const created = await createdRef.get();

    res.status(201).json({
      item: mapDocument(created)
    });
  } catch (error) {
    console.error('🔥 Firestore Error in duplicateLandingPageById:', error.message);
    next(error);
  }
}

/**
 * POST /api/landing-pages/:id/view
 */
export async function trackLandingPageView(req, res, next) {
  try {
    const docRef = db.collection(LANDING_PAGE_COLLECTION).doc(req.params.id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Landing page not found.' });
    }

    const data = snapshot.data();
    const analytics = {
      views: Number(data.analytics?.views || 0) + 1,
      lastViewedAt: new Date().toISOString()
    };

    await docRef.update({
      analytics,
      analyticsUpdatedAt: Timestamp.now()
    });

    res.json({ analytics });
  } catch (error) {
    console.error('🔥 Firestore Error in trackLandingPageView:', error.message);
    next(error);
  }
}

// ----------------------------------------------------
// LOCATION CONTROLLER (Bangalore Localities)
// ----------------------------------------------------

/**
 * GET /api/landing-pages/locations
 */
export async function listLocations(req, res, next) {
  try {
    const snapshot = await db.collection(LOCATION_COLLECTION).get();

    if (snapshot.empty) {
      // Seed default locations if collection is empty
      const batch = db.batch();
      for (const loc of DEFAULT_BANGALORE_LOCATIONS) {
        const docRef = db.collection(LOCATION_COLLECTION).doc(slugify(loc.name));
        batch.set(docRef, {
          ...loc,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      await batch.commit();

      const refreshed = await db.collection(LOCATION_COLLECTION).get();
      const items = refreshed.docs.map(mapDocument);
      items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      return res.json({ items, count: items.length });
    }

    const items = snapshot.docs.map(mapDocument);
    items.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));

    res.json({
      items,
      count: items.length
    });
  } catch (error) {
    console.error('🔥 Firestore Error in listLocations:', error.message);
    next(error);
  }
}

/**
 * POST /api/landing-pages/locations
 */
export async function saveLocation(req, res, next) {
  try {
    const name = toStringValue(req.body.name);
    if (!name) {
      return res.status(400).json({ message: 'Location name is required.' });
    }

    const id = req.body.id || slugify(name);
    const areaGroup = toStringValue(req.body.areaGroup || 'Bangalore');
    const displayOrder = Number(req.body.displayOrder) || 10;
    const status = req.body.status === 'inactive' ? 'inactive' : 'active';
    const distanceNote = toStringValue(req.body.distanceNote || '');

    const docRef = db.collection(LOCATION_COLLECTION).doc(id);
    const existing = await docRef.get();

    const payload = {
      name,
      areaGroup,
      displayOrder,
      status,
      distanceNote,
      updatedAt: Timestamp.now(),
      createdAt: existing.exists ? existing.data().createdAt || Timestamp.now() : Timestamp.now()
    };

    await docRef.set(payload, { merge: true });
    const saved = await docRef.get();

    res.json({
      item: mapDocument(saved)
    });
  } catch (error) {
    console.error('🔥 Firestore Error in saveLocation:', error.message);
    next(error);
  }
}

/**
 * DELETE /api/landing-pages/locations/:id
 */
export async function deleteLocation(req, res, next) {
  try {
    const docRef = db.collection(LOCATION_COLLECTION).doc(req.params.id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Location not found.' });
    }

    await docRef.delete();
    res.json({ message: 'Location deleted successfully.' });
  } catch (error) {
    console.error('🔥 Firestore Error in deleteLocation:', error.message);
    next(error);
  }
}
