import { db, mapDocument, serializeFirestore, Timestamp } from '../services/firebase.js';
import slugify from '../utils/slugify.js';
import { DEFAULT_MASTER_TEMPLATES, findDefaultMasterTemplate, SERVICE_CANONICAL_NAMES } from './masterTemplateData.js';

const DEFAULT_LANDING_IMAGE = '/bridal/bridalblow/hero-bridal.webp';
const BANGALORE_BASE_PATH = '/bangalore';
const LANDING_PAGE_COLLECTION = 'landing_pages';
const LOCATION_COLLECTION = 'bangalore_locations';
const MASTER_TEMPLATE_COLLECTION = 'service_master_templates';

export function isNetworkOrDnsError(error) {
  const msg = String(error?.message || error || '').toLowerCase();
  return (
    msg.includes('enotfound') ||
    msg.includes('econnrefused') ||
    msg.includes('etimedout') ||
    msg.includes('network') ||
    msg.includes('internet') ||
    msg.includes('getaddrinfo') ||
    msg.includes('socket hang up') ||
    msg.includes('fetch failed') ||
    msg.includes('batchget') ||
    msg.includes('runquery')
  );
}

export const DEFAULT_BANGALORE_LOCATIONS = [
  {
    name: 'Mahalakshmipuram',
    areaGroup: 'Bangalore West',
    displayOrder: 1,
    status: 'active',
    isMainBoutique: true,
    distanceNote: 'Our flagship boutique studio is located in Mahalakshmipuram.',
    landmark: 'Near Mahalakshmi Metro Station / 1st Block Rajajinagar',
    travelTime: 'Boutique Location',
    nearbyAreas: ['Rajajinagar', 'Basaveshwaranagar', 'Nandini Layout', 'West of Chord Road', 'Kurubarahalli']
  },
  {
    name: 'Rajajinagar',
    areaGroup: 'Bangalore West',
    displayOrder: 2,
    status: 'active',
    distanceNote: '5-10 minutes from Rajajinagar 1st Block & Rajajinagar Metro Station.',
    landmark: '5 mins via 1st Block / Chord Road',
    travelTime: '5-10 mins',
    nearbyAreas: ['Mahalakshmipuram', 'Basaveshwaranagar', 'Malleshwaram', 'Navrang Circle', 'Prakash Nagar']
  },
  {
    name: 'Malleshwaram',
    areaGroup: 'Bangalore West',
    displayOrder: 3,
    status: 'active',
    distanceNote: '10-15 minutes from 8th Cross & Margosa Road, Malleshwaram.',
    landmark: '10-12 mins via Link Road / Chord Road',
    travelTime: '10-15 mins',
    nearbyAreas: ['Rajajinagar', 'Sadashivanagar', 'Yeshwanthpur', 'Seshadripuram', 'Vyalikaval']
  },
  {
    name: 'Basaveshwaranagar',
    areaGroup: 'Bangalore West',
    displayOrder: 4,
    status: 'active',
    distanceNote: '10 minutes from Basaveshwaranagar 80 Feet Road.',
    landmark: '10 mins via Shankar Mutt / 80 Feet Road',
    travelTime: '10 mins',
    nearbyAreas: ['Rajajinagar', 'Vijayanagar', 'Mahalakshmipuram', 'Kamakshipalya', 'West of Chord Road']
  },
  {
    name: 'Vijayanagar',
    areaGroup: 'Bangalore West',
    displayOrder: 5,
    status: 'active',
    distanceNote: '15 minutes via Chord Road from Vijayanagar.',
    landmark: '15 mins via West of Chord Road',
    travelTime: '15 mins',
    nearbyAreas: ['Basaveshwaranagar', 'Rajajinagar', 'Attiguppe', 'Nagarbhavi', 'Chandra Layout']
  },
  {
    name: 'Yeshwanthpur',
    areaGroup: 'Bangalore North',
    displayOrder: 6,
    status: 'active',
    distanceNote: '10 minutes from Yeshwanthpur Circle and Railway Station.',
    landmark: '10 mins via Tumkur Road / Chord Road',
    travelTime: '10 mins',
    nearbyAreas: ['Malleshwaram', 'Sadashivanagar', 'Nandini Layout', 'Mathikere', 'Goraguntepalya']
  },
  {
    name: 'Nandini Layout',
    areaGroup: 'Bangalore North',
    displayOrder: 7,
    status: 'active',
    distanceNote: '5 minutes from Nandini Layout & Mahalakshmi Layout.',
    landmark: '5 mins from Nandini Layout Circle',
    travelTime: '5 mins',
    nearbyAreas: ['Mahalakshmipuram', 'Yeshwanthpur', 'Laggere', 'Kanteerava Studio', 'Peenya']
  },
  {
    name: 'Sadashivanagar',
    areaGroup: 'Bangalore North',
    displayOrder: 8,
    status: 'active',
    distanceNote: '15-20 minutes from Sadashivanagar & Sankey Tank.',
    landmark: '15 mins via Sankey Road & CV Raman Road',
    travelTime: '15-20 mins',
    nearbyAreas: ['Malleshwaram', 'Yeshwanthpur', 'Sanjay Nagar', 'RMV Extension', 'Vasanth Nagar']
  },
  {
    name: 'Hebbal',
    areaGroup: 'Bangalore North',
    displayOrder: 9,
    status: 'active',
    distanceNote: '20-25 minutes via Outer Ring Road / Bellary Road from Hebbal.',
    landmark: '20 mins via Outer Ring Road',
    travelTime: '20-25 mins',
    nearbyAreas: ['Sahakara Nagar', 'Sadashivanagar', 'Yelahanka', 'RT Nagar', 'Nagavara']
  },
  {
    name: 'Indiranagar',
    areaGroup: 'Bangalore East',
    displayOrder: 10,
    status: 'active',
    distanceNote: 'Direct connectivity via Metro or Porter doorstep courier pickup available.',
    landmark: 'Metro connectivity via Green/Purple Line & express courier delivery',
    travelTime: '30-35 mins (Doorstep pickup available)',
    nearbyAreas: ['Domlur', 'Halasuru', 'Old Airport Road', 'Koramangala', 'CV Raman Nagar']
  },
  {
    name: 'Whitefield',
    areaGroup: 'Bangalore East',
    displayOrder: 11,
    status: 'active',
    distanceNote: 'Convenient Purple Line Metro connectivity or door-to-door courier fabric delivery.',
    landmark: 'Direct Purple Line Metro to Majestic / Chord Road & doorstep courier',
    travelTime: '45 mins via Metro / Doorstep courier',
    nearbyAreas: ['ITPL', 'Kadugodi', 'Marathahalli', 'Brookefield', 'Hoodi']
  },
  {
    name: 'Koramangala',
    areaGroup: 'Bangalore South',
    displayOrder: 12,
    status: 'active',
    distanceNote: 'Easily accessible via Inner Ring Road or convenient doorstep sample pickup.',
    landmark: 'Via Inner Ring Road / Hosur Road & door-to-door pickup',
    travelTime: '30-40 mins',
    nearbyAreas: ['HSR Layout', 'BTM Layout', 'Jayanagar', 'Ejipura', 'Domlur']
  },
  {
    name: 'HSR Layout',
    areaGroup: 'Bangalore South',
    displayOrder: 13,
    status: 'active',
    distanceNote: 'Convenient doorstep courier fabric pickup and express delivery across HSR Sectors.',
    landmark: 'Via Outer Ring Road / Hosur Road & door-to-door pickup',
    travelTime: '35-40 mins',
    nearbyAreas: ['Koramangala', 'BTM Layout', 'Bellandur', 'Sarjapur Road', 'Bommanahalli']
  },
  {
    name: 'Jayanagar',
    areaGroup: 'Bangalore South',
    displayOrder: 14,
    status: 'active',
    distanceNote: '20-25 minutes via Green Line Metro direct from Jayanagar to Mahalakshmi.',
    landmark: 'Direct Green Line Metro (Jayanagar 4th Block to Mahalakshmi Station)',
    travelTime: '20-25 mins (Direct Metro)',
    nearbyAreas: ['JP Nagar', 'Basavanagudi', 'Banashankari', 'BTM Layout', 'South End Circle']
  },
  {
    name: 'JP Nagar',
    areaGroup: 'Bangalore South',
    displayOrder: 15,
    status: 'active',
    distanceNote: '25 minutes via Green Line Metro or Outer Ring Road.',
    landmark: 'Direct Green Line Metro (Yelachenahalli/JP Nagar to Mahalakshmi)',
    travelTime: '25-30 mins',
    nearbyAreas: ['Jayanagar', 'Banashankari', 'BTM Layout', 'Bannerghatta Road', 'Kumaraswamy Layout']
  },
  {
    name: 'Electronic City',
    areaGroup: 'Bangalore South',
    displayOrder: 16,
    status: 'active',
    distanceNote: 'Doorstep fabric pickup and delivery via Porter/courier available across E-City.',
    landmark: 'Elevated Expressway & doorstep courier/sample pickup',
    travelTime: '45-50 mins (Doorstep courier available)',
    nearbyAreas: ['Hosa Road', 'Bommasandra', 'Singasandra', 'HSR Layout', 'Kudlu Gate']
  }
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

export function slugifyBangaloreLandingPage(serviceCategory = 'Ready-to-Wear Saree Customization', locationName = 'Bangalore') {
  const serviceSlug = slugify(serviceCategory || 'custom-service')
    .replace(/-customization$/i, '')
    .replace(/^customized-/i, '');
  const locSlug = slugify(locationName || 'bangalore');
  return `${serviceSlug}-stitching-${locSlug}`.replace(/--+/g, '-');
}

export async function getEffectiveMasterTemplate(serviceCategory) {
  const norm = toStringValue(serviceCategory);
  if (!norm) return findDefaultMasterTemplate('Ready-to-Wear Saree Customization');

  try {
    const tplSnapshot = await db.collection(MASTER_TEMPLATE_COLLECTION).get();
    if (!tplSnapshot.empty) {
      const templates = tplSnapshot.docs.map(mapDocument);
      // Sort newest updated first
      templates.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));

      const normSlug = slugify(norm);
      const normSlugWithAnd = norm.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const normLower = norm.trim().toLowerCase();

      // PRIORITY 1: Exact ID or exact slug match (highest precision)
      let matched = templates.find((t) => {
        const tId = String(t.id || '').trim().toLowerCase();
        const tSlug = String(t.serviceSlug || '').trim().toLowerCase();
        return tId === normSlug || tId === normSlugWithAnd || tSlug === normSlug || tSlug === normSlugWithAnd;
      });

      // PRIORITY 2: Exact Name or Category match
      if (!matched) {
        matched = templates.find((t) => {
          const tName = String(t.serviceName || '').trim().toLowerCase();
          const tCat = String(t.serviceCategory || '').trim().toLowerCase();
          return tName === normLower || tCat === normLower;
        });
      }

      // PRIORITY 3: Fallback only if no exact match exists: substring match
      if (!matched) {
        matched = templates.find((t) => {
          const tName = String(t.serviceName || '').trim().toLowerCase();
          const tCat = String(t.serviceCategory || '').trim().toLowerCase();
          return tName.includes(normLower) || normLower.includes(tName) || tCat.includes(normLower);
        });
      }

      if (matched) return matched;
    }
  } catch (err) {
    console.warn('Could not fetch master template from Firestore, using default:', err.message);
  }

  return findDefaultMasterTemplate(norm);
}

export function applyMasterTemplateToLocation(master, locationName = 'Bangalore', locObj = {}, overrides = {}) {
  const loc = toStringValue(locationName || 'Bangalore');
  const locSlug = slugify(loc);
  const serviceName = toStringValue(master?.serviceName || master?.serviceCategory || 'Custom Boutique Service');
  const serviceSlug = toStringValue(master?.serviceSlug || slugify(serviceName));

  const replaceLoc = (str = '') => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/\{Location-slug\}/gi, locSlug)
      .replace(/\{location-slug\}/gi, locSlug)
      .replace(/\{Location\}/g, loc)
      .replace(/\[Location\]/g, loc)
      .replace(/\{location\}/g, loc.toLowerCase())
      .replace(/\{Service-slug\}/gi, serviceSlug)
      .replace(/\{service-slug\}/gi, serviceSlug)
      .replace(/\{Service\}/g, serviceName)
      .replace(/\[Service\]/g, serviceName)
      .replace(/\{service\}/g, serviceName.toLowerCase());
  };

  const deepReplace = (obj) => {
    if (typeof obj === 'string') return replaceLoc(obj);
    if (Array.isArray(obj)) return obj.map(deepReplace);
    if (obj !== null && typeof obj === 'object') {
      const out = {};
      for (const k of Object.keys(obj)) {
        out[k] = deepReplace(obj[k]);
      }
      return out;
    }
    return obj;
  };

  const title = replaceLoc(
    overrides.title ||
    overrides.hero?.heading ||
    master?.hero?.headingTemplate ||
    master?.hero?.heading ||
    master?.seo?.titleTemplate ||
    master?.seo?.metaTitleTemplate ||
    master?.titleTemplate ||
    `${serviceName} in ${loc}, Bangalore`
  );

  const metaTitle = replaceLoc(
    overrides.metaTitle ||
    master?.seo?.metaTitleTemplate ||
    master?.seo?.titleTemplate ||
    `${serviceName} in ${loc}, Bangalore | Shrusara Fashion Boutique`
  );

  const metaDescription = replaceLoc(
    overrides.metaDescription ||
    master?.seo?.metaDescriptionTemplate ||
    master?.seo?.descriptionTemplate ||
    `Customized ${serviceName} in ${loc}, Bangalore with perfect fit and personalized consultation by Shrusara.`
  );

  const rawKeywords = overrides.metaKeywords || master?.seo?.metaKeywords || master?.seo?.metaKeywordsTemplate || '';
  const metaKeywords = Array.isArray(rawKeywords)
    ? rawKeywords.map(replaceLoc)
    : toArray(rawKeywords).map(replaceLoc);

  const heroHeading = replaceLoc(
    overrides.hero?.heading ||
    overrides.title ||
    master?.hero?.headingTemplate ||
    master?.hero?.heading ||
    title
  );

  const heroBadge = replaceLoc(
    overrides.hero?.badge ||
    master?.hero?.badgeTemplate ||
    master?.hero?.badge ||
    `100% Customized | ${loc}, Bangalore`
  );

  const heroTagline = replaceLoc(
    overrides.hero?.tagline ||
    master?.hero?.taglineTemplate ||
    master?.hero?.tagline ||
    `Customized to your exact measurements in ${loc}, Bangalore.`
  );

  const heroPrimaryCtaMessage = replaceLoc(
    overrides.hero?.primaryCtaMessage ||
    master?.hero?.primaryCtaMessageTemplate ||
    master?.hero?.primaryCtaMessage ||
    `Hi Shrusara, I would like to know about ${serviceName} in ${loc}, Bangalore.`
  );

  const heroHighlights = (
    overrides.hero?.highlights?.length
      ? overrides.hero.highlights
      : (master?.hero?.highlights?.length ? master.hero.highlights : [
          '1-on-1 Consultation with Chief Designer Shruthi Ajith',
          'Personalized Measurements & Trial Fitting',
          'Try Before You Customize (Boutique Exclusive)',
          'Video Consultation Available Across Bangalore',
          'Pickup & Courier Delivery Across Bangalore',
          'Comfortable Customized Stitching'
        ])
  ).map(replaceLoc);

  const hero = {
    badge: heroBadge,
    badgeTemplate: heroBadge,
    heading: heroHeading,
    headingTemplate: heroHeading,
    tagline: heroTagline,
    taglineTemplate: heroTagline,
    highlights: heroHighlights,
    primaryCtaText: overrides.hero?.primaryCtaText || master?.hero?.primaryCtaText || 'Chat on WhatsApp',
    primaryCtaMessage: heroPrimaryCtaMessage,
    primaryCtaMessageTemplate: heroPrimaryCtaMessage,
    secondaryCtaText: overrides.hero?.secondaryCtaText || master?.hero?.secondaryCtaText || 'Call Shrusara Boutique',
    secondaryCtaLink: overrides.hero?.secondaryCtaLink || master?.hero?.secondaryCtaLink || '#contact'
  };

  const aboutHeading = replaceLoc(
    overrides.about?.heading ||
    master?.about?.headingTemplate ||
    master?.about?.heading ||
    `Customized ${serviceName} in ${loc}`
  );

  const aboutIntro = replaceLoc(
    overrides.about?.intro ||
    master?.about?.introTemplate ||
    master?.about?.intro ||
    ''
  );

  const aboutDescription = replaceLoc(
    overrides.about?.description ||
    master?.about?.descriptionTemplate ||
    master?.about?.description ||
    master?.about?.introTemplate ||
    aboutIntro ||
    `At Shrusara Fashion Boutique, we specialize exclusively in bespoke ${serviceName}. Every piece is tailored uniquely to your body contours, measurements, and personal style.`
  );

  const rawAboutHighlights = overrides.about?.highlights?.length
    ? overrides.about.highlights
    : (master?.about?.highlights?.length
        ? master.about.highlights
        : (master?.about?.features?.length ? master.about.features : []));

  const aboutHighlights = deepReplace(rawAboutHighlights);

  const about = {
    heading: aboutHeading,
    headingTemplate: aboutHeading,
    intro: aboutIntro,
    introTemplate: aboutIntro,
    description: aboutDescription,
    descriptionTemplate: aboutDescription,
    highlights: aboutHighlights
  };

  const whyHeading = replaceLoc(
    overrides.whyChooseUs?.heading ||
    master?.whyChooseUs?.headingTemplate ||
    master?.whyChooseUs?.heading ||
    `Why Clients in ${loc} Choose Shrusara for ${serviceName}`
  );

  const whyIntro = replaceLoc(
    overrides.whyChooseUs?.intro ||
    master?.whyChooseUs?.introTemplate ||
    master?.whyChooseUs?.intro ||
    master?.whyChooseUs?.descriptionTemplate ||
    ''
  );

  const whyDescription = replaceLoc(
    overrides.whyChooseUs?.description ||
    master?.whyChooseUs?.descriptionTemplate ||
    master?.whyChooseUs?.description ||
    master?.whyChooseUs?.introTemplate ||
    whyIntro ||
    `Located in Mahalakshmipuram, Shrusara Fashion Boutique is easily accessible from ${loc}.`
  );

  const whyCards = deepReplace(
    overrides.whyChooseUs?.cards?.length
      ? overrides.whyChooseUs.cards
      : (master?.whyChooseUs?.cards?.length ? master.whyChooseUs.cards : [])
  );

  const whyChooseUs = {
    heading: whyHeading,
    headingTemplate: whyHeading,
    intro: whyIntro,
    introTemplate: whyIntro,
    description: whyDescription,
    descriptionTemplate: whyDescription,
    cards: whyCards
  };

  const processSteps = deepReplace(
    overrides.processSteps?.length
      ? overrides.processSteps
      : (master?.processSteps?.length ? master.processSteps : [])
  ).map((s, idx) => ({
    stepNumber: s.stepNumber || idx + 1,
    title: replaceLoc(s.title || `Step ${idx + 1}`),
    description: replaceLoc(s.description || ''),
    duration: replaceLoc(s.duration || '')
  }));

  const gallery = deepReplace(
    overrides.gallery?.length
      ? overrides.gallery
      : (master?.gallery?.length ? master.gallery : [])
  ).map((g) => ({
    url: g.url,
    title: replaceLoc(g.title || `${serviceName} in ${loc}`),
    alt: replaceLoc(g.alt || `${serviceName} in ${loc}, Bangalore – Shrusara Fashion Boutique`),
    caption: replaceLoc(g.caption || '')
  }));

  const proximity = {
    locationName: loc,
    areaGroup: locObj.areaGroup || overrides.areaGroup || 'Bangalore West',
    boutiqueAddress: replaceLoc(toStringValue(overrides.proximity?.boutiqueAddress || master?.proximity?.boutiqueAddress || locObj.boutiqueAddress || '106, 6th Main Road, Mahalakshmipuram, Bangalore - 560086')),
    landmark: replaceLoc(toStringValue(overrides.proximity?.landmark || locObj.landmark || master?.proximity?.landmark || master?.proximity?.defaultLandmark || 'Near Mahalakshmi Metro Station / 1st Block Rajajinagar')),
    travelTime: replaceLoc(toStringValue(overrides.proximity?.travelTime || locObj.travelTime || master?.proximity?.travelTime || master?.proximity?.defaultTravelTime || '10-15 mins')),
    distanceNote: replaceLoc(toStringValue(overrides.proximity?.distanceNote || master?.proximity?.distanceNote || master?.proximity?.defaultDistanceNote || locObj.distanceNote || `Easily accessible from ${loc}. Doorstep Porter & express courier delivery available across Bangalore.`)),
    nearbyAreas: (locObj.nearbyAreas?.length ? locObj.nearbyAreas : null) || toArray(overrides.proximity?.nearbyAreas || master?.proximity?.nearbyAreas || ['Rajajinagar', 'Malleshwaram', 'Basaveshwaranagar', 'Vijayanagar']),
    workingHours: replaceLoc(toStringValue(overrides.proximity?.workingHours || master?.proximity?.workingHours || locObj.workingHours || 'Monday – Sunday 10:00 AM – 7:30 PM')),
    googleMapsUrl: replaceLoc(toStringValue(overrides.proximity?.googleMapsUrl || master?.proximity?.googleMapsUrl || locObj.googleMapsUrl || 'https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore')),
    boutiqueVisitOptions: deepReplace(
      overrides.proximity?.boutiqueVisitOptions?.length
        ? overrides.proximity.boutiqueVisitOptions
        : (master?.proximity?.boutiqueVisitOptions?.length
            ? master.proximity.boutiqueVisitOptions
            : [
                { title: 'Walk-ins Welcome', description: 'Feel free to visit our Mahalakshmipuram boutique anytime during boutique hours.' },
                { title: 'Bridal Appointments Recommended', description: 'Schedule a dedicated 1-on-1 slot with Chief Designer Shruthi Ajith.' },
                { title: 'Video Consultation Available', description: `Virtual design sessions for clients in ${loc} unable to visit in person.` },
                { title: 'Pickup & Courier Available Across Bangalore', description: `Reliable Porter fabric pickup and doorstep delivery across ${loc}.` }
              ])
    )
  };

  const testimonials = deepReplace(
    overrides.testimonials?.length
      ? overrides.testimonials
      : (master?.testimonials?.length ? master.testimonials : [])
  ).map((t) => ({
    name: t.name || 'Bangalore Client',
    location: replaceLoc(t.location || `${loc}, Bangalore`),
    rating: Number(t.rating) || 5,
    outfitType: t.outfitType || serviceName,
    reviewText: replaceLoc(t.reviewText || '')
  }));

  const faqs = deepReplace(
    overrides.faqs?.length
      ? overrides.faqs
      : (master?.faqs?.length ? master.faqs : [])
  ).map((f) => ({
    question: replaceLoc(f.question || ''),
    answer: replaceLoc(f.answer || '')
  }));

  const ctaHeading = replaceLoc(
    overrides.cta?.heading ||
    master?.cta?.headingTemplate ||
    master?.cta?.heading ||
    `${serviceName} Near ${loc}, Bangalore`
  );

  const ctaSubheading = replaceLoc(
    overrides.cta?.subheading ||
    master?.cta?.subheadingTemplate ||
    master?.cta?.subheading ||
    `Book your consultation with Chief Designer Shruthi Ajith today. Experience bespoke luxury in Bangalore.`
  );

  const cta = {
    heading: ctaHeading,
    headingTemplate: ctaHeading,
    subheading: ctaSubheading,
    subheadingTemplate: ctaSubheading,
    whatsappText: overrides.cta?.whatsappText || master?.cta?.whatsappText || 'Chat on WhatsApp',
    callText: overrides.cta?.callText || master?.cta?.callText || 'Call Shrusara Boutique'
  };

  const defaultChiefDesigner = {
    sectionHeading: 'Meet Our Chief Designer — Shruthi Ajith',
    sectionIntro: 'Designing bespoke bridal and designer wear with passion, precision, and over a decade of couture expertise in Bangalore.',
    designerImage: {
      url: '/videos/lead-of-shrusara.webp',
      alt: 'Shruthi Ajith, Founder & Chief Designer at Shrusara Fashion Boutique',
      title: 'Shruthi Ajith – Chief Designer'
    },
    designerImageAlt: 'Shruthi Ajith, Founder & Chief Designer at Shrusara Fashion Boutique',
    designerName: 'Shruthi Ajith',
    designation: 'Founder & Chief Designer',
    designerBio: 'With a deep passion for fine craftsmanship and personalized tailoring, Shruthi Ajith has guided over a thousand brides and clients in creating their dream outfits. Every design begins with understanding your unique body shape, saree aesthetics, and event requirements to deliver a perfectly fitted, one-of-a-kind creation.',
    designerCtaHeading: 'Discuss Your Design With Shruthi',
    designerCtaText: 'Have a design idea in mind? Speak with our designer about your customization requirements.',
    designerCtaButtonText: 'Chat With Our Designer',
    designerCtaLink: 'https://wa.me/919741827558?text=Hi%20Shruthi%20ma%27am!%20I%20would%20like%20to%20discuss%20my%20design%20requirements.'
  };

  const rawCD = overrides.chiefDesigner || master?.chiefDesigner || defaultChiefDesigner;
  const chiefDesigner = {
    sectionHeading: replaceLoc(toStringValue(rawCD.sectionHeading || defaultChiefDesigner.sectionHeading)),
    sectionIntro: replaceLoc(toStringValue(rawCD.sectionIntro || defaultChiefDesigner.sectionIntro)),
    designerImage: {
      url: toStringValue(rawCD.designerImage?.url || rawCD.image || defaultChiefDesigner.designerImage.url),
      alt: replaceLoc(toStringValue(rawCD.designerImage?.alt || rawCD.designerImageAlt || defaultChiefDesigner.designerImage.alt)),
      title: replaceLoc(toStringValue(rawCD.designerImage?.title || defaultChiefDesigner.designerImage.title))
    },
    designerImageAlt: replaceLoc(toStringValue(rawCD.designerImageAlt || rawCD.designerImage?.alt || defaultChiefDesigner.designerImageAlt)),
    designerName: replaceLoc(toStringValue(rawCD.designerName || defaultChiefDesigner.designerName)),
    designation: replaceLoc(toStringValue(rawCD.designation || defaultChiefDesigner.designation)),
    designerBio: replaceLoc(toStringValue(rawCD.designerBio || defaultChiefDesigner.designerBio)),
    designerCtaHeading: replaceLoc(toStringValue(rawCD.designerCtaHeading || defaultChiefDesigner.designerCtaHeading)),
    designerCtaText: replaceLoc(toStringValue(rawCD.designerCtaText || defaultChiefDesigner.designerCtaText)),
    designerCtaButtonText: replaceLoc(toStringValue(rawCD.designerCtaButtonText || defaultChiefDesigner.designerCtaButtonText)),
    designerCtaLink: replaceLoc(toStringValue(rawCD.designerCtaLink || defaultChiefDesigner.designerCtaLink))
  };

  const featuredImage = overrides.featuredImage?.url ? overrides.featuredImage : {
    url: master?.featuredImage?.url || master?.heroImage || DEFAULT_LANDING_IMAGE,
    alt: replaceLoc(master?.featuredImage?.alt || `${serviceName} in ${loc}, Bangalore – Shrusara Fashion Boutique`),
    title: replaceLoc(master?.featuredImage?.title || `${serviceName} in ${loc}`),
    caption: replaceLoc(master?.featuredImage?.caption || `Customized ${serviceName} by Shrusara Fashion Boutique.`)
  };

  return {
    title,
    serviceCategory: serviceName,
    locationName: loc,
    areaGroup: locObj.areaGroup || overrides.areaGroup || 'Bangalore West',
    metaTitle,
    metaDescription,
    metaKeywords,
    featuredImage,
    hero,
    about,
    chiefDesigner,
    whyChooseUs,
    processSteps,
    gallery,
    proximity,
    testimonials,
    faqs,
    cta
  };
}

export async function parseServiceAndLocationFromSlug(rawSlug) {
  if (!rawSlug) return null;
  const clean = String(rawSlug).toLowerCase().trim();

  let allLocations = DEFAULT_BANGALORE_LOCATIONS;
  try {
    const locSnap = await db.collection(LOCATION_COLLECTION).get();
    if (!locSnap.empty) {
      allLocations = locSnap.docs.map(mapDocument);
    }
  } catch {}

  let allTemplates = DEFAULT_MASTER_TEMPLATES;
  try {
    const tplSnap = await db.collection(MASTER_TEMPLATE_COLLECTION).get();
    if (!tplSnap.empty) {
      allTemplates = tplSnap.docs.map(mapDocument);
    }
  } catch {}

  let servicePart = '';
  let locationPart = '';
  let matchedLocObj = null;

  if (clean.includes('-stitching-')) {
    const parts = clean.split('-stitching-');
    servicePart = parts[0];
    locationPart = parts.slice(1).join('-stitching-');
  }

  if (locationPart) {
    matchedLocObj = allLocations.find(
      (l) => slugify(l.name) === locationPart || String(l.name).toLowerCase() === locationPart.toLowerCase()
    );
  }

  if (!matchedLocObj) {
    const sortedLocs = [...allLocations].sort((a, b) => b.name.length - a.name.length);
    for (const loc of sortedLocs) {
      const lSlug = slugify(loc.name);
      if (clean.endsWith(`-stitching-${lSlug}`)) {
        servicePart = clean.slice(0, -(`-stitching-${lSlug}`.length));
        matchedLocObj = loc;
        break;
      } else if (clean.endsWith(`-${lSlug}`)) {
        servicePart = clean.slice(0, -(`-${lSlug}`.length)).replace(/-stitching$/, '');
        matchedLocObj = loc;
        break;
      }
    }
  }

  if (!matchedLocObj) {
    const defaultName = locationPart ? locationPart.charAt(0).toUpperCase() + locationPart.slice(1) : 'Bangalore';
    matchedLocObj = {
      name: defaultName,
      areaGroup: 'Bangalore West'
    };
  }

  const cleanServicePart = servicePart.replace(/-/g, ' ');
  let master = allTemplates.find(
    (t) =>
      t.id === servicePart ||
      t.serviceSlug === servicePart ||
      String(t.serviceName || '').toLowerCase() === cleanServicePart ||
      String(t.serviceCategory || '').toLowerCase() === cleanServicePart ||
      slugify(t.serviceName || '') === servicePart
  );

  if (!master) {
    master = findDefaultMasterTemplate(cleanServicePart);
  }

  if (!master) {
    return null;
  }

  return {
    serviceName: master.serviceName || master.serviceCategory || cleanServicePart,
    locationName: matchedLocObj.name,
    locObj: matchedLocObj,
    master
  };
}

async function normalizeLandingPagePayload(body = {}, existing = {}) {
  const serviceCategory = toStringValue(body.serviceCategory || existing.serviceCategory || 'Ready-to-Wear Saree Customization');
  const locationName = toStringValue(body.locationName || body.location || existing.locationName || 'Bangalore');
  const areaGroup = toStringValue(body.areaGroup || existing.areaGroup || 'Bangalore West');

  // Load master template from Firestore (with preset fallback)
  const master = await getEffectiveMasterTemplate(serviceCategory);
  const masterFallback = applyMasterTemplateToLocation(master, locationName, { areaGroup });

  const title = toStringValue(body.title || body.pageTitle || existing.title || masterFallback.title);
  const status = ['draft', 'published', 'scheduled'].includes(body.status)
    ? body.status
    : existing.status || 'draft';

  const metaTitle = toStringValue(body.metaTitle || existing.metaTitle || masterFallback.metaTitle);
  const metaDescription = toStringValue(body.metaDescription || existing.metaDescription || masterFallback.metaDescription);
  const metaKeywords = body.metaKeywords || body.keywords || existing.metaKeywords || masterFallback.metaKeywords;

  const featuredImage = normalizeImage(
    body.featuredImage || body.heroImage || existing.featuredImage || masterFallback.featuredImage,
    `${serviceCategory} in ${locationName}, Bangalore – Shrusara Fashion Boutique`
  );

  // Hero Section
  const hero = {
    badge: toStringValue(body.hero?.badge || body.heroBadge || existing.hero?.badge || masterFallback.hero.badge),
    heading: toStringValue(body.hero?.heading || body.heroHeading || existing.hero?.heading || title),
    tagline: toStringValue(body.hero?.tagline || body.heroTagline || existing.hero?.tagline || masterFallback.hero.tagline),
    highlights: Array.isArray(body.hero?.highlights) && body.hero.highlights.length
      ? body.hero.highlights.map(toStringValue).filter(Boolean)
      : existing.hero?.highlights?.length
        ? existing.hero.highlights
        : masterFallback.hero.highlights,
    primaryCtaText: toStringValue(body.hero?.primaryCtaText || existing.hero?.primaryCtaText || masterFallback.hero.primaryCtaText),
    primaryCtaMessage: toStringValue(body.hero?.primaryCtaMessage || existing.hero?.primaryCtaMessage || masterFallback.hero.primaryCtaMessage),
    secondaryCtaText: toStringValue(body.hero?.secondaryCtaText || existing.hero?.secondaryCtaText || masterFallback.hero.secondaryCtaText),
    secondaryCtaLink: toStringValue(body.hero?.secondaryCtaLink || existing.hero?.secondaryCtaLink || masterFallback.hero.secondaryCtaLink)
  };

  // About Section
  const about = {
    heading: toStringValue(body.about?.heading || existing.about?.heading || masterFallback.about.heading),
    description: toStringValue(body.about?.description || existing.about?.description || masterFallback.about.description),
    highlights: Array.isArray(body.about?.highlights) && body.about.highlights.length
      ? body.about.highlights.map((h, idx) => ({
          title: toStringValue(h.title || `Feature ${idx + 1}`),
          description: toStringValue(h.description || '')
        }))
      : existing.about?.highlights?.length
        ? existing.about.highlights
        : masterFallback.about.highlights
  };

  // Why Choose Us
  const whyChooseUs = {
    heading: toStringValue(body.whyChooseUs?.heading || existing.whyChooseUs?.heading || masterFallback.whyChooseUs.heading),
    description: toStringValue(body.whyChooseUs?.description || existing.whyChooseUs?.description || masterFallback.whyChooseUs.description),
    cards: Array.isArray(body.whyChooseUs?.cards) && body.whyChooseUs.cards.length
      ? body.whyChooseUs.cards.map((c, idx) => ({
          title: toStringValue(c.title || `Advantage ${idx + 1}`),
          description: toStringValue(c.description || '')
        }))
      : existing.whyChooseUs?.cards?.length
        ? existing.whyChooseUs.cards
        : masterFallback.whyChooseUs.cards
  };

  // 5-Step Customization Journey
  const processSteps = Array.isArray(body.processSteps) && body.processSteps.length
    ? body.processSteps.map((step, idx) => ({
        stepNumber: idx + 1,
        title: toStringValue(step.title || `Step ${idx + 1}`),
        description: toStringValue(step.description || ''),
        duration: toStringValue(step.duration || '')
      }))
    : existing.processSteps?.length
      ? existing.processSteps
      : masterFallback.processSteps;

  // Gallery
  const gallery = Array.isArray(body.gallery) && body.gallery.length
    ? body.gallery.map((img) => normalizeImage(img, `${serviceCategory} in ${locationName}, Bangalore – Shrusara Fashion Boutique`)).filter((img) => img.url)
    : existing.gallery?.length
      ? existing.gallery
      : masterFallback.gallery;

  // Proximity & Location details
  const proximity = {
    locationName,
    areaGroup,
    boutiqueAddress: toStringValue(body.proximity?.boutiqueAddress || existing.proximity?.boutiqueAddress || masterFallback.proximity.boutiqueAddress),
    landmark: toStringValue(body.proximity?.landmark || existing.proximity?.landmark || masterFallback.proximity.landmark),
    travelTime: toStringValue(body.proximity?.travelTime || existing.proximity?.travelTime || masterFallback.proximity.travelTime),
    distanceNote: toStringValue(body.proximity?.distanceNote || existing.proximity?.distanceNote || masterFallback.proximity.distanceNote),
    nearbyAreas: toArray(body.proximity?.nearbyAreas || existing.proximity?.nearbyAreas || masterFallback.proximity.nearbyAreas),
    workingHours: toStringValue(body.proximity?.workingHours || existing.proximity?.workingHours || masterFallback.proximity.workingHours),
    googleMapsUrl: toStringValue(body.proximity?.googleMapsUrl || existing.proximity?.googleMapsUrl || masterFallback.proximity.googleMapsUrl),
    boutiqueVisitOptions: Array.isArray(body.proximity?.boutiqueVisitOptions) && body.proximity.boutiqueVisitOptions.length
      ? body.proximity.boutiqueVisitOptions.map((opt) => ({
          title: toStringValue(opt.title),
          description: toStringValue(opt.description)
        }))
      : existing.proximity?.boutiqueVisitOptions?.length
        ? existing.proximity.boutiqueVisitOptions
        : masterFallback.proximity.boutiqueVisitOptions
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
    : existing.testimonials?.length
      ? existing.testimonials
      : masterFallback.testimonials;

  // FAQs
  const faqs = Array.isArray(body.faqs) && body.faqs.length
    ? body.faqs.map((faq) => ({
        question: toStringValue(faq.question),
        answer: toStringValue(faq.answer)
      })).filter((faq) => faq.question && faq.answer)
    : existing.faqs?.length
      ? existing.faqs
      : masterFallback.faqs;

  // CTA Section
  const cta = {
    heading: toStringValue(body.cta?.heading || existing.cta?.heading || masterFallback.cta.heading),
    subheading: toStringValue(body.cta?.subheading || existing.cta?.subheading || masterFallback.cta.subheading),
    whatsappText: toStringValue(body.cta?.whatsappText || existing.cta?.whatsappText || masterFallback.cta.whatsappText),
    callText: toStringValue(body.cta?.callText || existing.cta?.callText || masterFallback.cta.callText)
  };

  // Meet Our Chief Designer (NEW Section 4)
  const rawCDPayload = body.chiefDesigner || existing.chiefDesigner || masterFallback.chiefDesigner;
  const chiefDesigner = {
    sectionHeading: toStringValue(rawCDPayload?.sectionHeading || masterFallback.chiefDesigner?.sectionHeading),
    sectionIntro: toStringValue(rawCDPayload?.sectionIntro || masterFallback.chiefDesigner?.sectionIntro),
    designerImage: normalizeImage(rawCDPayload?.designerImage || rawCDPayload?.image || masterFallback.chiefDesigner?.designerImage, 'Shruthi Ajith, Founder & Chief Designer'),
    designerImageAlt: toStringValue(rawCDPayload?.designerImageAlt || rawCDPayload?.designerImage?.alt || masterFallback.chiefDesigner?.designerImageAlt),
    designerName: toStringValue(rawCDPayload?.designerName || masterFallback.chiefDesigner?.designerName),
    designation: toStringValue(rawCDPayload?.designation || masterFallback.chiefDesigner?.designation),
    designerBio: toStringValue(rawCDPayload?.designerBio || masterFallback.chiefDesigner?.designerBio),
    designerCtaHeading: toStringValue(rawCDPayload?.designerCtaHeading || masterFallback.chiefDesigner?.designerCtaHeading),
    designerCtaText: toStringValue(rawCDPayload?.designerCtaText || masterFallback.chiefDesigner?.designerCtaText),
    designerCtaButtonText: toStringValue(rawCDPayload?.designerCtaButtonText || masterFallback.chiefDesigner?.designerCtaButtonText),
    designerCtaLink: toStringValue(rawCDPayload?.designerCtaLink || masterFallback.chiefDesigner?.designerCtaLink)
  };

  return {
    title,
    serviceCategory,
    locationName,
    areaGroup,
    status,
    metaTitle,
    metaDescription,
    metaKeywords: Array.isArray(metaKeywords) ? metaKeywords : toArray(metaKeywords),
    featuredImage,
    hero,
    about,
    chiefDesigner,
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
    if (isNetworkOrDnsError(error)) {
      return res.json({
        items: DEFAULT_EXISTING_LANDING_PAGES,
        count: DEFAULT_EXISTING_LANDING_PAGES.length,
        offline: true
      });
    }
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
    if (isNetworkOrDnsError(error)) {
      return res.json({
        items: DEFAULT_EXISTING_LANDING_PAGES,
        count: DEFAULT_EXISTING_LANDING_PAGES.length,
        offline: true
      });
    }
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

      // Dynamic generation from Master Template!
      const parsed = await parseServiceAndLocationFromSlug(rawSlug);
      if (parsed) {
        const { serviceName, locationName, locObj, master } = parsed;
        const dynamicPage = applyMasterTemplateToLocation(master, locationName, locObj);
        return res.json({
          item: {
            ...dynamicPage,
            id: rawSlug,
            slug: rawSlug,
            url: `${BANGALORE_BASE_PATH}/${rawSlug}`,
            canonicalUrl: `${getPublicSiteUrl()}${BANGALORE_BASE_PATH}/${rawSlug}`,
            status: 'published',
            isDynamic: true
          }
        });
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
    if (isNetworkOrDnsError(error)) {
      return res.status(503).json({
        message: 'Network Offline: Unable to reach Firestore database. Please check your internet connection.',
        isOffline: true
      });
    }
    next(error);
  }
}

/**
 * POST /api/landing-pages
 */
export async function createLandingPage(req, res, next) {
  try {
    const normalized = await normalizeLandingPagePayload(req.body);
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
    if (isNetworkOrDnsError(error)) {
      return res.status(503).json({
        message: 'Network Offline: Unable to connect to Firestore database to create page. Please check your internet connection.',
        isOffline: true
      });
    }
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
    const normalized = await normalizeLandingPagePayload(req.body, existing);

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
    if (isNetworkOrDnsError(error)) {
      return res.status(503).json({
        message: 'Network Offline: Unable to connect to Firestore to save changes. Please check your internet connection.',
        isOffline: true
      });
    }
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
    if (isNetworkOrDnsError(error)) {
      return res.json({
        items: DEFAULT_BANGALORE_LOCATIONS,
        count: DEFAULT_BANGALORE_LOCATIONS.length,
        offline: true
      });
    }
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
    const areaGroup = toStringValue(req.body.areaGroup || 'Bangalore West');
    const displayOrder = Number(req.body.displayOrder) || 10;
    const status = req.body.status === 'inactive' ? 'inactive' : 'active';
    const distanceNote = toStringValue(req.body.distanceNote || '');
    const landmark = toStringValue(req.body.landmark || '');
    const travelTime = toStringValue(req.body.travelTime || '');
    const nearbyAreas = toArray(req.body.nearbyAreas || []);
    const isMainBoutique = Boolean(req.body.isMainBoutique);
    const googleMapsUrl = toStringValue(req.body.googleMapsUrl || '');

    const docRef = db.collection(LOCATION_COLLECTION).doc(id);
    const existing = await docRef.get();

    const payload = {
      name,
      areaGroup,
      displayOrder,
      status,
      distanceNote,
      landmark,
      travelTime,
      nearbyAreas,
      isMainBoutique,
      googleMapsUrl,
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

    const locationData = snapshot.data();
    const locName = locationData.name || req.params.id;

    // Safety rule: A location can only be deleted if NOT used by any landing page
    const inUseSnapshot = await db
      .collection(LANDING_PAGE_COLLECTION)
      .where('locationName', '==', locName)
      .limit(1)
      .get();

    if (!inUseSnapshot.empty) {
      return res.status(400).json({
        message: `Cannot delete location "${locName}" because it is currently used by one or more landing pages. Please reassign or delete those landing pages first.`
      });
    }

    await docRef.delete();
    res.json({ message: `Location "${locName}" deleted successfully.` });
  } catch (error) {
    console.error('🔥 Firestore Error in deleteLocation:', error.message);
    next(error);
  }
}

// ----------------------------------------------------
// MASTER TEMPLATE CONTROLLER (8 Core Services)
// ----------------------------------------------------

/**
 * GET /api/landing-pages/master-templates
 */
export async function listMasterTemplates(req, res, next) {
  try {
    let snapshot = await db.collection(MASTER_TEMPLATE_COLLECTION).get();

    if (snapshot.empty) {
      // Seed default master templates for all 8 services
      const batch = db.batch();
      for (const tpl of DEFAULT_MASTER_TEMPLATES) {
        const docRef = db.collection(MASTER_TEMPLATE_COLLECTION).doc(tpl.id);
        batch.set(docRef, {
          ...tpl,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      await batch.commit();
      snapshot = await db.collection(MASTER_TEMPLATE_COLLECTION).get();
    }

    let items = snapshot.docs.map(mapDocument);
    items.sort((a, b) => (a.categoryOrder || 99) - (b.categoryOrder || 99));

    res.json({
      items,
      count: items.length
    });
  } catch (error) {
    console.error('🔥 Firestore Error in listMasterTemplates:', error.message);
    if (isNetworkOrDnsError(error)) {
      return res.json({
        items: DEFAULT_MASTER_TEMPLATES,
        count: DEFAULT_MASTER_TEMPLATES.length,
        offline: true
      });
    }
    next(error);
  }
}

/**
 * GET /api/landing-pages/master-templates/:id
 */
export async function getMasterTemplateById(req, res, next) {
  try {
    const rawId = toStringValue(req.params.id).toLowerCase();
    const doc = await db.collection(MASTER_TEMPLATE_COLLECTION).doc(rawId).get();

    if (doc.exists) {
      return res.json({ item: mapDocument(doc) });
    }

    // Try finding by serviceSlug or serviceName in collection
    const snapshot = await db.collection(MASTER_TEMPLATE_COLLECTION).get();
    const matched = snapshot.docs.map(mapDocument).find(
      (t) =>
        t.id === rawId ||
        t.serviceSlug === rawId ||
        slugify(t.serviceName) === rawId ||
        String(t.serviceName || '').toLowerCase() === rawId
    );

    if (matched) {
      return res.json({ item: matched });
    }

    // Fallback to static seed
    const fallback = findDefaultMasterTemplate(rawId);
    if (fallback) {
      return res.json({ item: fallback });
    }

    res.status(404).json({ message: 'Master template not found.' });
  } catch (error) {
    console.error('🔥 Firestore Error in getMasterTemplateById:', error.message);
    if (isNetworkOrDnsError(error)) {
      const fallback = findDefaultMasterTemplate(req.params.id);
      if (fallback) {
        return res.json({ item: fallback, offline: true });
      }
    }
    next(error);
  }
}

/**
 * POST /api/landing-pages/master-templates
 * PUT /api/landing-pages/master-templates/:id
 */
export async function saveMasterTemplate(req, res, next) {
  try {
    const serviceName = toStringValue(req.body.serviceName || req.body.serviceCategory);
    if (!serviceName) {
      return res.status(400).json({ message: 'Service name is required.' });
    }

    const id = req.params.id || req.body.id || slugify(serviceName);
    const docRef = db.collection(MASTER_TEMPLATE_COLLECTION).doc(id);
    const existing = await docRef.get();

    const payload = {
      ...req.body,
      id,
      serviceName,
      serviceCategory: serviceName,
      serviceSlug: req.body.serviceSlug || slugify(serviceName),
      updatedAt: Timestamp.now(),
      createdAt: existing.exists ? existing.data().createdAt || Timestamp.now() : Timestamp.now()
    };

    await docRef.set(payload, { merge: true });

    // If Maggam work, keep both hyphen-and and hyphen versions in sync
    if (id === 'maggam-and-aari-work-bridal-blouse') {
      try {
        await db.collection(MASTER_TEMPLATE_COLLECTION).doc('maggam-aari-work-bridal-blouse').set(payload, { merge: true });
      } catch {}
    } else if (id === 'maggam-aari-work-bridal-blouse') {
      try {
        await db.collection(MASTER_TEMPLATE_COLLECTION).doc('maggam-and-aari-work-bridal-blouse').set(payload, { merge: true });
      } catch {}
    }

    const saved = await docRef.get();

    res.json({
      item: mapDocument(saved),
      message: `Master template for "${serviceName}" saved successfully.`
    });
  } catch (error) {
    console.error('🔥 Firestore Error in saveMasterTemplate:', error.message);
    next(error);
  }
}

/**
 * POST /api/landing-pages/master-templates/generate
 * Generates preview/content for a service in a target location
 */
export async function generatePageFromMaster(req, res, next) {
  try {
    const { serviceCategory, locationName, overrides = {} } = req.body;
    if (!serviceCategory || !locationName) {
      return res.status(400).json({ message: 'serviceCategory and locationName are required.' });
    }

    // 1. Fetch Master Template from Firestore
    const master = await getEffectiveMasterTemplate(serviceCategory);

    // 2. Fetch Location
    let locObj = null;
    const locDoc = await db.collection(LOCATION_COLLECTION).doc(slugify(locationName)).get();
    if (locDoc.exists) {
      locObj = locDoc.data();
    } else {
      locObj = DEFAULT_BANGALORE_LOCATIONS.find((l) => l.name.toLowerCase() === locationName.toLowerCase()) || {
        name: locationName,
        areaGroup: 'Bangalore West'
      };
    }

    // 3. Generate merged content
    const generated = applyMasterTemplateToLocation(master, locationName, locObj, overrides);
    const slug = slugifyBangaloreLandingPage(master.serviceName, locationName);
    const url = `${BANGALORE_BASE_PATH}/${slug}`;

    const fullPage = {
      ...generated,
      slug,
      url,
      canonicalUrl: `${getPublicSiteUrl()}${url}`,
      status: overrides.status || 'draft'
    };

    res.json({ item: fullPage });
  } catch (error) {
    console.error('🔥 Firestore Error in generatePageFromMaster:', error.message);
    if (isNetworkOrDnsError(error)) {
      const defaultMaster = findDefaultMasterTemplate(req.body?.serviceCategory || 'Ready-to-Wear Saree Customization');
      const locObj = DEFAULT_BANGALORE_LOCATIONS.find((l) => l.name.toLowerCase() === String(req.body?.locationName || '').toLowerCase()) || {
        name: req.body?.locationName || 'Bangalore',
        areaGroup: 'Bangalore West'
      };
      const generated = applyMasterTemplateToLocation(defaultMaster, req.body?.locationName || 'Bangalore', locObj, req.body?.overrides || {});
      const slug = slugifyBangaloreLandingPage(defaultMaster.serviceName, req.body?.locationName || 'Bangalore');
      const url = `${BANGALORE_BASE_PATH}/${slug}`;
      return res.json({
        item: {
          ...generated,
          slug,
          url,
          canonicalUrl: `${getPublicSiteUrl()}${url}`,
          status: req.body?.overrides?.status || 'draft',
          offline: true
        }
      });
    }
    next(error);
  }
}

/**
 * POST /api/landing-pages/master-templates/batch-generate
 * Bulk generates landing pages across multiple Bangalore locations
 */
export async function batchGenerateLandingPages(req, res, next) {
  try {
    const status = req.body.status || 'draft';
    const rawServices = req.body.serviceCategories || req.body.serviceCategory || [];
    const serviceCategories = Array.isArray(rawServices) ? rawServices : [rawServices].filter(Boolean);
    const rawLocations = req.body.locationNames || req.body.locations || req.body.locationName || [];
    const locationNames = Array.isArray(rawLocations) ? rawLocations : [rawLocations].filter(Boolean);
    const overwriteExisting = req.body.overwriteExisting !== undefined ? Boolean(req.body.overwriteExisting) : true;

    if (serviceCategories.length === 0 || locationNames.length === 0) {
      return res.status(400).json({ message: 'At least one service category and at least one location are required.' });
    }

    // Fetch all locations from database
    const locSnapshot = await db.collection(LOCATION_COLLECTION).get();
    const allLocations = locSnapshot.docs.map(mapDocument);

    const createdPages = [];
    const skippedPages = [];

    for (const srvCategory of serviceCategories) {
      const master = await getEffectiveMasterTemplate(srvCategory);

      for (const locName of locationNames) {
        const cleanLocName = toStringValue(locName);
        if (!cleanLocName) continue;

        const locObj =
          allLocations.find((l) => l.name.toLowerCase() === cleanLocName.toLowerCase()) ||
          DEFAULT_BANGALORE_LOCATIONS.find((l) => l.name.toLowerCase() === cleanLocName.toLowerCase()) || {
            name: cleanLocName,
            areaGroup: 'Bangalore West'
          };

        const targetSlug = slugifyBangaloreLandingPage(master.serviceName, cleanLocName);

        // Check if page already exists
        let existingDoc = null;
        const existingSnapshot = await db
          .collection(LANDING_PAGE_COLLECTION)
          .where('serviceCategory', '==', master.serviceName)
          .where('locationName', '==', cleanLocName)
          .limit(1)
          .get();

        if (!existingSnapshot.empty) {
          existingDoc = existingSnapshot.docs[0];
        } else {
          const slugSnapshot = await db
            .collection(LANDING_PAGE_COLLECTION)
            .where('slug', '==', targetSlug)
            .limit(1)
            .get();
          if (!slugSnapshot.empty) {
            existingDoc = slugSnapshot.docs[0];
          }
        }

        if (existingDoc && !overwriteExisting) {
          skippedPages.push({ serviceCategory: master.serviceName, locationName: cleanLocName, reason: 'Already exists' });
          continue;
        }

        const merged = applyMasterTemplateToLocation(master, cleanLocName, locObj);
        const url = `${BANGALORE_BASE_PATH}/${targetSlug}`;

        const payload = {
          ...merged,
          slug: targetSlug,
          url,
          canonicalUrl: `${getPublicSiteUrl()}${url}`,
          status: ['draft', 'published', 'scheduled'].includes(status) ? status : 'draft',
          publishedAt: status === 'published' ? new Date().toISOString() : '',
          analytics: existingDoc ? existingDoc.data()?.analytics || { views: 0, conversions: 0 } : { views: 0, conversions: 0 },
          createdAt: existingDoc ? existingDoc.data()?.createdAt || Timestamp.now() : Timestamp.now(),
          updatedAt: Timestamp.now()
        };

        let docRef;
        if (existingDoc) {
          docRef = existingDoc.ref;
          await docRef.set(payload, { merge: true });
        } else {
          docRef = await db.collection(LANDING_PAGE_COLLECTION).add(payload);
        }

        const saved = await docRef.get();
        createdPages.push(mapDocument(saved));
      }
    }

    res.json({
      message: `Batch generation completed. Created/updated ${createdPages.length} pages, skipped ${skippedPages.length} pages.`,
      total: serviceCategories.length * locationNames.length,
      created: createdPages.length,
      createdCount: createdPages.length,
      updated: createdPages.length,
      skipped: skippedPages.length,
      skippedCount: skippedPages.length,
      createdPages,
      skippedPages
    });
  } catch (error) {
    console.error('🔥 Firestore Error in batchGenerateLandingPages:', error.message);
    next(error);
  }
}

/**
 * POST /api/landing-pages/:id/sync-master
 * Refreshes an existing landing page from its service master template
 */
export async function syncLandingPageFromMaster(req, res, next) {
  try {
    const { id } = req.params;
    const docRef = db.collection(LANDING_PAGE_COLLECTION).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Landing page not found.' });
    }
    const existing = doc.data();
    const serviceCategory = existing.serviceCategory || 'Bridal Blouse';
    const locationName = existing.locationName || 'Bangalore';

    // 1. Fetch Master Template from Firestore
    const master = await getEffectiveMasterTemplate(serviceCategory);

    // 2. Fetch Location info
    let locObj = null;
    const locDoc = await db.collection(LOCATION_COLLECTION).doc(slugify(locationName)).get();
    if (locDoc.exists) {
      locObj = locDoc.data();
    } else {
      locObj = DEFAULT_BANGALORE_LOCATIONS.find((l) => l.name.toLowerCase() === locationName.toLowerCase()) || {
        name: locationName,
        areaGroup: existing.areaGroup || 'Bangalore West'
      };
    }

    // 3. Re-apply Master Template to Location
    const merged = applyMasterTemplateToLocation(master, locationName, locObj);
    const targetSlug = existing.slug || slugifyBangaloreLandingPage(master.serviceName, locationName);
    const url = `${BANGALORE_BASE_PATH}/${targetSlug}`;

    const payload = {
      ...merged,
      slug: targetSlug,
      url,
      canonicalUrl: `${getPublicSiteUrl()}${url}`,
      status: existing.status || 'draft',
      publishedAt: existing.publishedAt || (existing.status === 'published' ? new Date().toISOString() : ''),
      analytics: existing.analytics || { views: 0, conversions: 0 },
      createdAt: existing.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    await docRef.set(payload, { merge: true });
    const fresh = await docRef.get();

    res.json({
      success: true,
      message: `"${locationName} - ${serviceCategory}" successfully refreshed from Master Template!`,
      item: mapDocument(fresh)
    });
  } catch (error) {
    console.error('🔥 Firestore Error in syncLandingPageFromMaster:', error.message);
    next(error);
  }
}

