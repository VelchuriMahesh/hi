export const BANGALORE_BASE_PATH = '/bangalore';
export const DEFAULT_SITE_URL = 'https://www.shrusara.com';
export const BOUTIQUE_ADDRESS = '106, 6th Main Road, Mahalakshmipuram, Bangalore - 560086';
export const BOUTIQUE_PHONE = '9741827558';
export const BOUTIQUE_WHATSAPP = '919741827558';

export const BANGALORE_LOCATIONS_PRESET = [
  { name: 'Mahalakshmipuram', areaGroup: 'Bangalore West', displayOrder: 1, isMainBoutique: true, distanceNote: 'Our flagship boutique location in Mahalakshmipuram.' },
  { name: 'Rajajinagar', areaGroup: 'Bangalore West', displayOrder: 2, distanceNote: '5-10 minutes from Rajajinagar 1st Block and Metro Station.' },
  { name: 'Malleshwaram', areaGroup: 'Bangalore West', displayOrder: 3, distanceNote: '10-15 minutes from 8th Cross & Margosa Road, Malleshwaram.' },
  { name: 'Basaveshwaranagar', areaGroup: 'Bangalore West', displayOrder: 4, distanceNote: '10 minutes from Basaveshwaranagar 80 Feet Road.' },
  { name: 'Vijayanagar', areaGroup: 'Bangalore West', displayOrder: 5, distanceNote: '15 minutes via Chord Road from Vijayanagar.' },
  { name: 'Yeshwanthpur', areaGroup: 'Bangalore North', displayOrder: 6, distanceNote: '10 minutes from Yeshwanthpur Circle and Railway Station.' },
  { name: 'Nandini Layout', areaGroup: 'Bangalore North', displayOrder: 7, distanceNote: '5 minutes from Nandini Layout & Mahalakshmi Layout.' },
  { name: 'Sadashivanagar', areaGroup: 'Bangalore North', displayOrder: 8, distanceNote: '15-20 minutes from Sadashivanagar & Sankey Tank.' },
  { name: 'Hebbal', areaGroup: 'Bangalore North', displayOrder: 9, distanceNote: '20-25 minutes via Outer Ring Road / Bellary Road from Hebbal.' },
  { name: 'Indiranagar', areaGroup: 'Bangalore East', displayOrder: 10, distanceNote: 'Direct connectivity via Metro or Porter doorstep courier pickup available.' },
  { name: 'Whitefield', areaGroup: 'Bangalore East', displayOrder: 11, distanceNote: 'Online video consultation & express Porter/courier delivery available across Whitefield.' },
  { name: 'Koramangala', areaGroup: 'Bangalore South', displayOrder: 12, distanceNote: 'Easy video consultation & dedicated courier delivery for Koramangala clients.' },
  { name: 'HSR Layout', areaGroup: 'Bangalore South', displayOrder: 13, distanceNote: 'Virtual consultation, measurement support & doorstep pickup available across HSR Layout.' },
  { name: 'Jayanagar', areaGroup: 'Bangalore South', displayOrder: 14, distanceNote: 'Direct Metro connection from Jayanagar (Green Line to Mahalakshmi Metro Station).' },
  { name: 'JP Nagar', areaGroup: 'Bangalore South', displayOrder: 15, distanceNote: 'Metro connectivity via Green Line & secure doorstep fabric pickup available.' },
  { name: 'Electronic City', areaGroup: 'Bangalore South', displayOrder: 16, distanceNote: 'Virtual design sessions & door-to-door courier service across Electronic City.' }
];

export const SERVICE_CATEGORIES = [
  'Bridal Blouse',
  'Maggam & Aari Work Bridal Blouse',
  'Designer Blouse',
  'Designer Gowns',
  'Ready-to-Wear Saree Customization',
  'Bridal Lehenga',
  'Luxury Occasion Wear'
];

export const SERVICE_CONFIG = {
  'Bridal Blouse': {
    singular: 'Bridal Blouse',
    plural: 'Bridal Blouses',
    action: 'Stitching & Designing',
    heroImage: '/bridal/bridalblow/hero-bridal.webp',
    defaultTagline: 'Customized to your exact bridal silhouette with handcrafted maggam embroidery.',
    shortDesc: 'Bespoke bridal blouse tailoring with deep-back cuts, princess cuts, padded cups, and heirloom hand embroidery.'
  },
  'Maggam & Aari Work Bridal Blouse': {
    singular: 'Maggam & Aari Work Bridal Blouse',
    plural: 'Maggam & Aari Work Bridal Blouses',
    action: 'Handcrafted Embroidery & Tailoring',
    heroImage: '/bridal/bridalblow/hero-bridal.webp',
    defaultTagline: 'Exquisite zardosi, cutwork, kundan, and pearl embroidery crafted on traditional wooden frames.',
    shortDesc: 'Master artisan handcrafted Maggam and Aari embroidery tailored to complement your Kanjeevaram and silk sarees.'
  },
  'Designer Blouse': {
    singular: 'Designer Blouse',
    plural: 'Designer Blouses',
    action: 'Custom Designing & Tailoring',
    heroImage: '/bridal/bridalblow/hero-bridal.webp',
    defaultTagline: 'Contemporary cuts, corset fits, high-neck designs, and personalized boutique craftsmanship.',
    shortDesc: 'Modern and fusion designer blouse stitching customized to your unique aesthetic.'
  },
  'Designer Gowns': {
    singular: 'Designer Gown',
    plural: 'Designer Gowns',
    action: 'Bespoke Designing & Tailoring',
    heroImage: '/videos/desingerhero.webp',
    defaultTagline: 'Sculpted evening gowns, reception trails, and indo-western gowns with perfect flare and structure.',
    shortDesc: 'Custom evening, engagement, and reception gowns tailored with structured corsetry and premium fabrics.'
  },
  'Ready-to-Wear Saree Customization': {
    singular: 'Ready-to-Wear Saree',
    plural: 'Ready-to-Wear Sarees',
    action: 'Custom Saree Pre-Stitching',
    heroImage: '/landingpage/customized-ready-to-wear-saree-front-view-bangalore.webp',
    defaultTagline: 'Convert your favorite saree into a 1-minute ready-to-wear saree with permanent pleats and flawless drape.',
    shortDesc: 'Custom pre-stitched saree transformation with permanent pleats, premium lining, and secure waist closures.'
  },
  'Bridal Lehenga': {
    singular: 'Bridal Lehenga',
    plural: 'Bridal Lehengas',
    action: 'Couture Custom Designing',
    heroImage: '/videos/desingerhero.webp',
    defaultTagline: 'High-flare bridal lehengas, customized cancan skirts, and handcrafted matching blouses.',
    shortDesc: 'Full-flared bridal and reception lehengas designed from scratch with personalized embroidery and color grading.'
  },
  'Luxury Occasion Wear': {
    singular: 'Luxury Occasion Wear Outfit',
    plural: 'Luxury Occasion Wear Outfits',
    action: 'Custom Outfits & Fusion Designing',
    heroImage: '/occasion_wear/Designer%20Gowns%20&%20Indo%20western%20outfits/Designer%20Gowns%20&%20Indo%20western%20outfits/indo-western-fusion-bridal-wear-shrusara.webp',
    defaultTagline: 'Indo-western fusion ensembles, crop-top skirt sets, half sarees, and sangeet outfits.',
    shortDesc: 'Handcrafted luxury party wear and occasion ensembles customized for bridesmaids and festive celebrations.'
  }
};

export function slugifyBangalorePage(serviceCategory = 'Bridal Blouse', locationName = 'Bangalore') {
  const serviceSlug = String(serviceCategory)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const locSlug = String(locationName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${serviceSlug}-stitching-${locSlug}`.replace(/--+/g, '-');
}

export function generatePresetContent(serviceCategory = 'Bridal Blouse', locationName = 'Rajajinagar', areaGroup = 'Bangalore West') {
  const cfg = SERVICE_CONFIG[serviceCategory] || SERVICE_CONFIG['Bridal Blouse'];
  const locPreset = BANGALORE_LOCATIONS_PRESET.find((l) => l.name.toLowerCase() === locationName.toLowerCase()) || {
    name: locationName,
    areaGroup,
    distanceNote: `Easily accessible from ${locationName}. Doorstep Porter & courier pickup available.`
  };

  const title = `${serviceCategory} Stitching in ${locationName}, Bangalore`;
  const slug = slugifyBangalorePage(serviceCategory, locationName);
  const metaTitle = `${serviceCategory} in ${locationName}, Bangalore | Shrusara Fashion Boutique`;
  const metaDescription = `Customized ${serviceCategory.toLowerCase()} in ${locationName}, Bangalore with perfect fit, handcrafted maggam embroidery, and 1-on-1 designer consultation with Shruthi Ajith.`;
  const metaKeywords = [
    `${serviceCategory.toLowerCase()} ${locationName.toLowerCase()}`,
    `${serviceCategory.toLowerCase()} bangalore`,
    `customized ${serviceCategory.toLowerCase()} ${locationName.toLowerCase()}`,
    `best ${serviceCategory.toLowerCase()} designer ${locationName.toLowerCase()}`,
    `boutique near ${locationName.toLowerCase()}`,
    'bridal boutique bangalore',
    'shrusara fashion boutique'
  ];

  const hero = {
    badge: `100% Customized | ${locationName}, Bangalore`,
    heading: `${serviceCategory} in ${locationName}, Bangalore`,
    tagline: `Experience handcrafted couture, 1-on-1 designer consultation, and guaranteed perfect fit tailored for brides and fashion lovers in ${locationName}, Bangalore.`,
    highlights: [
      '1-on-1 Consultation with Chief Designer Shruthi Ajith',
      'Guaranteed Flawless Fit with Intermediate Trial Fittings',
      'Artisan Maggam & Hand Embroidery on Wooden Frames',
      `Convenient for ${locationName} Clients + Doorstep Delivery`
    ],
    primaryCtaText: 'Chat on WhatsApp',
    primaryCtaMessage: `Hi Shrusara, I would like to know about ${serviceCategory} customization for my event in ${locationName}, Bangalore.`,
    secondaryCtaText: 'Book Consultation',
    secondaryCtaLink: '#contact'
  };

  const about = {
    heading: `Bespoke ${serviceCategory} Tailoring for ${locationName} Clients`,
    description: `At Shrusara Fashion Boutique, we believe that luxury lies in perfect personalization. We do not sell mass-produced ready-made pieces. Every ${cfg.singular.toLowerCase()} is drafted uniquely to your body contours and crafted by experienced master artisans. Clients from ${locationName} and across Bangalore trust Shrusara for timeless elegance, exquisite embroidery, and reliable delivery.`,
    highlights: [
      {
        title: 'Custom Body-Pattern Drafting',
        description: 'No generic sizing templates. Each outfit is drafted from scratch to flatter your posture, shoulder slope, and bust shape.'
      },
      {
        title: 'Handcrafted Heritage Embroidery',
        description: 'Authentic Zardosi, cutwork, pearl, and silk thread work executed by generational karigars in our dedicated artisan studio.'
      },
      {
        title: 'Fabric Sourcing & Color Guidance',
        description: 'Expert styling assistance to match your saree border, contrast blouses, dupattas, and bridal color themes.'
      },
      {
        title: 'Dedicated Trial & Precision Fitting',
        description: 'Comprehensive trial fittings ensuring complete armhole comfort, zero neckline gaping, and effortless mobility.'
      },
      {
        title: 'Express Wedding Timelines',
        description: 'Guaranteed completion with expedited delivery slots for urgent weddings, receptions, and pre-wedding celebrations.'
      },
      {
        title: 'Post-Delivery Styling & Alterations',
        description: 'Complimentary minor adjustments and lifetime styling support for your bespoke Shrusara creations.'
      }
    ]
  };

  const whyChooseUs = {
    heading: `Why Brides in ${locationName} Choose Shrusara Boutique`,
    description: `Shrusara is strictly a customization-only studio located in Mahalakshmipuram, easily accessible from ${locationName}. Here is why our clients love working with us:`,
    cards: [
      {
        title: 'Direct Access to Chief Designer',
        description: 'Consult directly with Founder & Chief Designer Shruthi Ajith to transform your vision into wearable couture.'
      },
      {
        title: '100% Customization, Zero Stock',
        description: 'We do not sell pre-made stock garments. Every single creation is 100% customized and uniquely yours.'
      },
      {
        title: 'In-House Master Artisans & Tailors',
        description: 'Our skilled craftsmen have decades of bridal embroidery experience, ensuring impeccable stitch density and finish.'
      },
      {
        title: 'High-Grade Skin-Friendly Linings',
        description: 'We use breathable, high-grade cotton and silk linings with cushioned piping for hours of itch-free comfort.'
      },
      {
        title: 'Transparent Pricing & Clear Timelines',
        description: 'Honest pricing based on embroidery intricacy and committed delivery dates with zero last-minute surprises.'
      },
      {
        title: 'Trusted by 1000+ Bangalore Brides',
        description: 'Rated 5 stars by brides across Mahalakshmipuram, Rajajinagar, Malleshwaram, and all of Bangalore.'
      }
    ]
  };

  const processSteps = [
    {
      stepNumber: 1,
      title: '1-on-1 Design & Styling Consultation',
      description: `Visit our Mahalakshmipuram boutique (near ${locationName}) or connect via video call. Discuss your neckline, sleeve cut, embroidery concepts, and saree pairing.`,
      duration: 'Day 1'
    },
    {
      stepNumber: 2,
      title: 'Precision Measurements & Patterning',
      description: 'Over 20 anatomical measurements are recorded to draft your customized master pattern.',
      duration: 'Day 1-2'
    },
    {
      stepNumber: 3,
      title: 'Handcrafted Maggam & Embroidery Crafting',
      description: 'Your chosen motif is traced and hand-embroidered stitch-by-stitch by master karigars on traditional adda wooden frames.',
      duration: 'Day 3-10'
    },
    {
      stepNumber: 4,
      title: 'Structural Tailoring & Intermediate Trial',
      description: 'Precision stitching with inner padding and linings, followed by a trial session to confirm zero gaping and perfect silhouette.',
      duration: 'Day 11-14'
    },
    {
      stepNumber: 5,
      title: 'Final Handover or Bangalore Doorstep Delivery',
      description: `Steam pressing, multi-point quality inspection, and boutique handover or Porter courier delivery to your address in ${locationName}.`,
      duration: 'Final Delivery'
    }
  ];

  const proximity = {
    locationName,
    areaGroup: locPreset.areaGroup || areaGroup,
    boutiqueAddress: BOUTIQUE_ADDRESS,
    landmark: 'Near Mahalakshmi Metro Station / 1st Block Rajajinagar',
    distanceNote: locPreset.distanceNote || `Easily accessible from ${locationName}. Doorstep Porter & express courier delivery available across Bangalore.`,
    workingHours: 'Monday - Sunday: 10:30 AM - 8:30 PM (By Appointment & Walk-in)',
    googleMapsUrl: 'https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore'
  };

  const testimonials = [
    {
      name: 'Ananya M.',
      location: locationName,
      rating: 5,
      outfitType: serviceCategory,
      reviewText: `Shrusara crafted my ${serviceCategory.toLowerCase()} for my wedding reception. Shruthi ma'am understood exactly what I wanted. The maggam embroidery was stunning and the fitting needed zero alterations!`
    },
    {
      name: 'Pooja K.',
      location: 'Bangalore',
      rating: 5,
      outfitType: serviceCategory,
      reviewText: `Best boutique in Bangalore for customized bridal wear. Visiting from ${locationName} was very easy and their Porter delivery for trials made the entire process completely stress-free.`
    }
  ];

  const faqs = [
    {
      question: `How does the customized ${serviceCategory.toLowerCase()} stitching process work for clients in ${locationName}?`,
      answer: `You can either visit our boutique in Mahalakshmipuram (conveniently located near ${locationName}) or book an online video consultation. We discuss your design, take precision measurements, create a bespoke pattern, conduct a trial fitting, and deliver your finished outfit.`
    },
    {
      question: `How much time is required to stitch a ${serviceCategory.toLowerCase()} at Shrusara?`,
      answer: `Standard bridal and hand-embroidered orders take approximately 2 to 4 weeks depending on the intricacy of the maggam work. For urgent events in ${locationName}, we also offer express priority slots.`
    },
    {
      question: `Can I provide my own saree or fabric for customization?`,
      answer: `Yes! You can bring your own saree, silk material, or fabric. If you need assistance sourcing matching silks or linings, our designer will guide you on the best textures and shades.`
    },
    {
      question: `Do you provide doorstep pickup or delivery in ${locationName}, Bangalore?`,
      answer: `Yes! We offer secure Porter courier pickup and delivery across ${locationName} and all major areas in Bangalore for fabric handover, intermediate trials, and final delivery.`
    },
    {
      question: `What makes Shrusara's custom tailoring unique in Bangalore?`,
      answer: `Shrusara is 100% custom-only. We do not sell mass-produced ready-made stock. You work directly with Founder & Chief Designer Shruthi Ajith and master artisans for a personalized, heirloom-quality creation.`
    }
  ];

  const cta = {
    heading: `Craft Your Dream ${serviceCategory} in ${locationName}`,
    subheading: `Book your 1-on-1 designer consultation with Shruthi Ajith. Experience personalized luxury, master craftsmanship, and guaranteed perfect fit.`,
    whatsappText: 'Chat on WhatsApp',
    callText: 'Call Shrusara Boutique'
  };

  return {
    title,
    slug,
    serviceCategory,
    locationName,
    areaGroup: locPreset.areaGroup || areaGroup,
    status: 'draft',
    metaTitle,
    metaDescription,
    metaKeywords,
    featuredImage: {
      url: cfg.heroImage,
      alt: `${serviceCategory} in ${locationName}, Bangalore`,
      caption: `Customized ${serviceCategory} designed by Shrusara Fashion Boutique in Bangalore.`
    },
    hero,
    about,
    whyChooseUs,
    processSteps,
    gallery: [
      {
        url: cfg.heroImage,
        alt: `${serviceCategory} front view - Shrusara Bangalore`,
        title: `${serviceCategory} Front View`,
        caption: 'Bespoke tailoring with handcrafted embroidery.'
      }
    ],
    proximity,
    testimonials,
    faqs,
    cta
  };
}

export function generateLandingPageSchemas({ page = {}, siteUrl = DEFAULT_SITE_URL }) {
  const cleanSiteUrl = String(siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, '');
  const pageSlug = String(page.slug || '').trim();
  const pageUrl = `${cleanSiteUrl}${BANGALORE_BASE_PATH}/${pageSlug}`;
  const title = page.metaTitle || page.title || 'Customized Boutique Service in Bangalore';
  const description = page.metaDescription || page.hero?.tagline || 'Customized bridal and designer wear in Bangalore by Shrusara Fashion Boutique.';
  const serviceCategory = page.serviceCategory || 'Bridal Blouse Designing';
  const locationName = page.locationName || 'Bangalore';
  const imageUrl = page.featuredImage?.url
    ? (/^https?:\/\//i.test(page.featuredImage.url) ? page.featuredImage.url : `${cleanSiteUrl}${page.featuredImage.url.startsWith('/') ? '' : '/'}${page.featuredImage.url}`)
    : `${cleanSiteUrl}/bridal/bridalblow/hero-bridal.webp`;

  // 1. Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: title,
    serviceType: serviceCategory,
    description,
    url: pageUrl,
    image: imageUrl,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${cleanSiteUrl}/#boutique`,
      name: 'Shrusara Fashion Boutique',
      url: cleanSiteUrl,
      telephone: '+919741827558',
      priceRange: '₹₹₹',
      image: `${cleanSiteUrl}/videos/logo.png`,
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
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceCategory} Customization Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `1-on-1 Designer Consultation for ${serviceCategory}`
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Handcrafted Maggam & Aari Embroidery for ${serviceCategory}`
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Custom Pattern Drafting & Precision Fitting`
          }
        }
      ]
    }
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: cleanSiteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bangalore Boutique Services',
        item: `${cleanSiteUrl}/bridal-blouse-bangalore`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title || `${serviceCategory} in ${locationName}`,
        item: pageUrl
      }
    ]
  };

  // 3. FAQPage Schema (if FAQs present)
  let faqSchema = null;
  const faqs = Array.isArray(page.faqs) ? page.faqs.filter((f) => f.question && f.answer) : [];
  if (faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    };
  }

  return {
    serviceSchema,
    breadcrumbSchema,
    faqSchema,
    canonicalUrl: pageUrl
  };
}
