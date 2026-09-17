export const BANGALORE_BASE_PATH = '/bangalore';
export const DEFAULT_SITE_URL = 'https://www.shrusara.com';
export const BOUTIQUE_ADDRESS = '106, 6th Main Road, Mahalakshmipuram, Bangalore - 560086';
export const BOUTIQUE_PHONE = '9741827558';
export const BOUTIQUE_WHATSAPP = '919741827558';

export const BANGALORE_LOCATIONS_PRESET = [
  {
    name: 'Mahalakshmipuram',
    areaGroup: 'Bangalore West',
    displayOrder: 1,
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
    distanceNote: '5-10 minutes from Rajajinagar 1st Block & Rajajinagar Metro Station.',
    landmark: '5 mins via 1st Block / Chord Road',
    travelTime: '5-10 mins',
    nearbyAreas: ['Mahalakshmipuram', 'Basaveshwaranagar', 'Malleshwaram', 'Navrang Circle', 'Prakash Nagar']
  },
  {
    name: 'Malleshwaram',
    areaGroup: 'Bangalore West',
    displayOrder: 3,
    distanceNote: '10-15 minutes from 8th Cross & Margosa Road, Malleshwaram.',
    landmark: '10-12 mins via Link Road / Chord Road',
    travelTime: '10-15 mins',
    nearbyAreas: ['Rajajinagar', 'Sadashivanagar', 'Yeshwanthpur', 'Seshadripuram', 'Vyalikaval']
  },
  {
    name: 'Basaveshwaranagar',
    areaGroup: 'Bangalore West',
    displayOrder: 4,
    distanceNote: '10 minutes from Basaveshwaranagar 80 Feet Road.',
    landmark: '10 mins via Shankar Mutt / 80 Feet Road',
    travelTime: '10 mins',
    nearbyAreas: ['Rajajinagar', 'Vijayanagar', 'Mahalakshmipuram', 'Kamakshipalya', 'West of Chord Road']
  },
  {
    name: 'Vijayanagar',
    areaGroup: 'Bangalore West',
    displayOrder: 5,
    distanceNote: '15 minutes via Chord Road from Vijayanagar.',
    landmark: '15 mins via West of Chord Road',
    travelTime: '15 mins',
    nearbyAreas: ['Basaveshwaranagar', 'Rajajinagar', 'Attiguppe', 'Nagarbhavi', 'Chandra Layout']
  },
  {
    name: 'Yeshwanthpur',
    areaGroup: 'Bangalore North',
    displayOrder: 6,
    distanceNote: '10 minutes from Yeshwanthpur Circle and Railway Station.',
    landmark: '10 mins via Tumkur Road / Chord Road',
    travelTime: '10 mins',
    nearbyAreas: ['Malleshwaram', 'Sadashivanagar', 'Nandini Layout', 'Mathikere', 'Goraguntepalya']
  },
  {
    name: 'Nandini Layout',
    areaGroup: 'Bangalore North',
    displayOrder: 7,
    distanceNote: '5 minutes from Nandini Layout & Mahalakshmi Layout.',
    landmark: '5 mins from Nandini Layout Circle',
    travelTime: '5 mins',
    nearbyAreas: ['Mahalakshmipuram', 'Yeshwanthpur', 'Laggere', 'Kanteerava Studio', 'Peenya']
  },
  {
    name: 'Sadashivanagar',
    areaGroup: 'Bangalore North',
    displayOrder: 8,
    distanceNote: '15-20 minutes from Sadashivanagar & Sankey Tank.',
    landmark: '15 mins via Sankey Road & CV Raman Road',
    travelTime: '15-20 mins',
    nearbyAreas: ['Malleshwaram', 'Yeshwanthpur', 'Sanjay Nagar', 'RMV Extension', 'Vasanth Nagar']
  },
  {
    name: 'Hebbal',
    areaGroup: 'Bangalore North',
    displayOrder: 9,
    distanceNote: '20-25 minutes via Outer Ring Road / Bellary Road from Hebbal.',
    landmark: '20 mins via Outer Ring Road',
    travelTime: '20-25 mins',
    nearbyAreas: ['Sahakara Nagar', 'Sadashivanagar', 'Yelahanka', 'RT Nagar', 'Nagavara']
  },
  {
    name: 'Indiranagar',
    areaGroup: 'Bangalore East',
    displayOrder: 10,
    distanceNote: 'Direct connectivity via Metro or Porter doorstep courier pickup available.',
    landmark: 'Metro connectivity via Green/Purple Line & express courier delivery',
    travelTime: '30-35 mins (Doorstep pickup available)',
    nearbyAreas: ['Domlur', 'Halasuru', 'Old Airport Road', 'Koramangala', 'CV Raman Nagar']
  },
  {
    name: 'Whitefield',
    areaGroup: 'Bangalore East',
    displayOrder: 11,
    distanceNote: 'Online video consultation & express Porter/courier delivery available across Whitefield.',
    landmark: 'Online video consultation & express Bangalore doorstep delivery',
    travelTime: 'Virtual & Courier Delivery',
    nearbyAreas: ['ITPL', 'Kadugodi', 'Marathahalli', 'Brookefield', 'Hoodi']
  },
  {
    name: 'Koramangala',
    areaGroup: 'Bangalore South',
    displayOrder: 12,
    distanceNote: 'Easy video consultation & dedicated courier delivery for Koramangala clients.',
    landmark: 'Virtual styling session & express doorstep courier',
    travelTime: 'Virtual & Courier Delivery',
    nearbyAreas: ['HSR Layout', 'BTM Layout', 'Jayanagar', 'Indiranagar', 'Adugodi']
  },
  {
    name: 'HSR Layout',
    areaGroup: 'Bangalore South',
    displayOrder: 13,
    distanceNote: 'Virtual consultation, measurement support & doorstep pickup available across HSR Layout.',
    landmark: 'Virtual styling session & Porter fabric pickup',
    travelTime: 'Virtual & Courier Delivery',
    nearbyAreas: ['Koramangala', 'BTM Layout', 'Bellandur', 'Sarjapur Road', 'Electronic City']
  },
  {
    name: 'Jayanagar',
    areaGroup: 'Bangalore South',
    displayOrder: 14,
    distanceNote: 'Direct Metro connection from Jayanagar (Green Line to Mahalakshmi Metro Station).',
    landmark: 'Direct Green Line Metro to Mahalakshmi Station',
    travelTime: '25-30 mins via Metro',
    nearbyAreas: ['JP Nagar', 'Basavanagudi', 'Banashankari', 'Koramangala', 'Lalbagh']
  },
  {
    name: 'JP Nagar',
    areaGroup: 'Bangalore South',
    displayOrder: 15,
    distanceNote: 'Metro connectivity via Green Line & secure doorstep fabric pickup available.',
    landmark: 'Metro Green Line / Porter delivery across JP Nagar',
    travelTime: '25-30 mins',
    nearbyAreas: ['Jayanagar', 'Banashankari', 'BTM Layout', 'Bannerghatta Road', 'Kumaraswamy Layout']
  },
  {
    name: 'Electronic City',
    areaGroup: 'Bangalore South',
    displayOrder: 16,
    distanceNote: 'Virtual design sessions & door-to-door courier service across Electronic City.',
    landmark: 'Virtual design session & express courier delivery',
    travelTime: 'Virtual & Courier Delivery',
    nearbyAreas: ['Bommanahalli', 'HSR Layout', 'BTM Layout', 'Hosa Road', 'Begur']
  }
];

export const SERVICE_CATEGORIES = [
  'Ready-to-Wear Saree Customization',
  'Customized Bridal Blouse',
  'Maggam & Aari Work Bridal Blouse',
  'Designer Blouse',
  'Designer Gown',
  'Customized Bridal Lehenga',
  'Luxury Occasion Wear',
  'Kids Boutique'
];

export function normalizeServiceCategory(input = '') {
  const s = String(input || '').trim().toLowerCase();
  if (s.includes('ready-to-wear') || s.includes('ready to wear') || s.includes('saree transformation')) {
    return 'Ready-to-Wear Saree Customization';
  }
  if (s.includes('maggam') || s.includes('aari')) {
    return 'Maggam & Aari Work Bridal Blouse';
  }
  if (s.includes('bridal blouse')) {
    return 'Customized Bridal Blouse';
  }
  if (s.includes('designer blouse')) {
    return 'Designer Blouse';
  }
  if (s.includes('gown')) {
    return 'Designer Gown';
  }
  if (s.includes('lehenga')) {
    return 'Customized Bridal Lehenga';
  }
  if (s.includes('kids')) {
    return 'Kids Boutique';
  }
  if (s.includes('occasion') || s.includes('party') || s.includes('indo-western')) {
    return 'Luxury Occasion Wear';
  }
  return 'Ready-to-Wear Saree Customization';
}

export const MASTER_SERVICE_TEMPLATES = {
  'Ready-to-Wear Saree Customization': {
    serviceName: 'Ready-to-Wear Saree Customization',
    singular: 'Ready-to-Wear Saree',
    plural: 'Ready-to-Wear Sarees',
    heroImage: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/customized-ready-to-wear-saree-front-view-bangalore.webp',
    hero: {
      badgeTemplate: '100% Customized | {Location}, Bangalore',
      headingTemplate: 'Ready-to-Wear Saree Customization in {Location}, Bangalore',
      taglineTemplate: 'Transform your cherished silk, organza, or designer saree into an effortless 1-minute ready-to-wear saree with permanent pleats, custom waist grip, and flawless drape. Personalized consultation with Chief Designer Shruthi Ajith for clients in {Location}, Bangalore.',
      highlights: [
        '1-on-1 Consultation with Chief Designer Shruthi Ajith',
        'Personalized Measurements & Trial Fitting',
        'Try Before You Customize (Boutique Exclusive)',
        'Video Consultation Available Across Bangalore',
        'Pickup & Courier Delivery Across Bangalore',
        'Comfortable Customized Stitching'
      ],
      primaryCtaText: 'Chat on WhatsApp',
      primaryCtaMessageTemplate: "Hi Shrusara! I'd like to know more about Ready-to-Wear Saree Customization in {Location}.",
      secondaryCtaText: 'Call Shrusara Boutique',
      secondaryCtaLink: '#contact'
    },
    about: {
      headingTemplate: 'Customized Ready-to-Wear Saree Pre-Stitching in {Location}',
      introTemplate: 'At Shrusara Fashion Boutique, we specialize exclusively in customized saree transformation and bespoke pre-stitching. We do not sell mass-produced ready-made garments. Every single saree is tailored uniquely to your body contours, waist measurements, and height for a naturally fluid, pin-free drape.',
      descriptionTemplate: 'Say goodbye to messy pleats, uneven pallus, and hundreds of safety pins. Our master tailors preserve your authentic saree fabric while carefully crafting secure waist closures, permanent pleats, and comfortable inner lining. Clients from {Location} and across Bangalore trust Shrusara for stress-free saree wearing that takes under 60 seconds.',
      highlights: [
        {
          title: 'Personalized Saree Fitting',
          description: 'Waistband and pleat depth tailored to your exact height, hip measurements, and footwear height.'
        },
        {
          title: 'Easy-to-Drape Pre-Stitched Saree',
          description: 'Wear your saree like a skirt in under 1 minute with perfectly aligned permanent pleats and zero safety pins.'
        },
        {
          title: 'Try Before You Customize',
          description: 'Visit our Mahalakshmipuram studio to try sample pre-stitched sarees and experience the comfort firsthand.'
        },
        {
          title: 'Trial Fitting for Better Comfort',
          description: 'Intermediate trial session ensuring zero waist pinching, smooth walking stride, and effortless posture.'
        },
        {
          title: 'Video Consultation for Measurements',
          description: 'Live virtual styling and measurement support for busy professionals and brides in {Location}.'
        },
        {
          title: 'Courier Pickup & Delivery Across Bangalore',
          description: 'Secure Porter pickup of your sarees from {Location} and doorstep delivery once customization is completed.'
        }
      ]
    },
    whyChooseUs: {
      headingTemplate: 'Why Clients in {Location} Choose Shrusara Boutique',
      introTemplate: 'Shrusara is an appointment-based, customization-only fashion boutique in Mahalakshmipuram, easily accessible from {Location}. Here is why women across Bangalore trust us for their saree transformation:',
      cards: [
        {
          title: 'Personalized Design Consultation',
          description: 'One-on-one styling guidance with Chief Designer Shruthi Ajith before customization begins.'
        },
        {
          title: 'Customized for Your Body Fit',
          description: 'Zero standard sizing templates. Every saree is tailored to your unique waist circumference and height.'
        },
        {
          title: 'Try Before You Customize (Shrusara Exclusive)',
          description: 'Feel the drape, test the waistband grip, and inspect the finish before handing over your precious sarees.'
        },
        {
          title: 'Trial Fitting Before Final Delivery',
          description: 'Guaranteed satisfaction with dedicated trial fittings to ensure effortless movement and drape.'
        },
        {
          title: 'Video Consultation Available',
          description: 'Personalized video sessions for clients in {Location} who prefer remote consultation and styling guidance.'
        },
        {
          title: 'Pickup & Courier Across Bangalore',
          description: 'Reliable doorstep fabric collection and courier delivery across {Location} and all of Bangalore.'
        }
      ]
    },
    processSteps: [
      {
        stepNumber: 1,
        title: 'Consultation & Style Discussion',
        description: 'Discuss your event, draping preference, pallu style, and footwear height in-person or via video call.',
        duration: 'Day 1'
      },
      {
        stepNumber: 2,
        title: 'Measurements & Pattern Drafting',
        description: 'Record anatomical waist, hip, and heel-to-waist height measurements to ensure optimal pleat placement.',
        duration: 'Day 1-2'
      },
      {
        stepNumber: 3,
        title: 'Handcrafting & Permanent Pleating',
        description: 'Our master artisans hand-pleat the saree, integrate concealed hooks and closures without damaging the silk weave.',
        duration: 'Day 3-5'
      },
      {
        stepNumber: 4,
        title: 'Trial Fitting & Mobility Check',
        description: 'Try on the pre-stitched saree to verify walking comfort, pallu drape elegance, and secure waistband fit.',
        duration: 'Day 5-6'
      },
      {
        stepNumber: 5,
        title: 'Boutique Pickup / Bangalore Courier Delivery',
        description: 'Carefully steam-pressed, quality inspected, and handed over at the boutique or delivered to {Location}.',
        duration: 'Final Delivery'
      }
    ],
    gallery: [
      {
        url: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/customized-ready-to-wear-saree-front-view-bangalore.webp',
        title: 'Pre-Stitched Saree Front View',
        caption: 'Permanent pleats engineered for effortless 60-second draping.'
      },
      {
        url: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/ready-to-wear-saree-bangalore.webp',
        title: 'Ready-to-Wear Silk Saree',
        caption: 'Graceful pleat alignment on traditional Kanjeevaram silk.'
      },
      {
        url: '/videos/ready-to-wear-designer-saree-bangalore-shrusara.webp',
        title: 'Designer Saree Transformation',
        caption: 'Flawless waist contour and zero safety-pin damage.'
      }
    ],
    testimonials: [
      {
        name: 'Sushmitha Rao',
        location: 'Rajajinagar, Bangalore',
        rating: 5,
        outfitType: 'Ready-to-Wear Saree Customization',
        reviewText: "I had two heavy Kanjeevaram sarees that I dreaded draping for weddings. Shruthi ma'am converted them into ready-to-wear sarees. The pleats sit perfectly and I was dressed in 45 seconds! Highly recommended for all Bangalore women."
      },
      {
        name: 'Deepa Hegde',
        location: 'Malleshwaram, Bangalore',
        rating: 5,
        outfitType: 'Ready-to-Wear Saree Customization',
        reviewText: 'The fit is phenomenal. No pins poking me throughout the reception. The Try Before You Customize session gave me so much confidence in their craft. Thank you Shrusara!'
      },
      {
        name: 'Aishwarya K.',
        location: 'Basaveshwaranagar, Bangalore',
        rating: 5,
        outfitType: 'Ready-to-Wear Saree Customization',
        reviewText: 'Their doorstep Porter pickup and video consultation made the entire process so smooth. Beautiful finish with zero damage to the saree border.'
      },
      {
        name: 'Meghana Patil',
        location: 'Indiranagar, Bangalore',
        rating: 5,
        outfitType: 'Ready-to-Wear Saree Customization',
        reviewText: 'I wore my pre-stitched saree for my sister’s sangeet and danced all night without worrying about pleats coming undone. Outstanding craftsmanship.'
      },
      {
        name: 'Priyanka N.',
        location: 'Whitefield, Bangalore',
        rating: 5,
        outfitType: 'Ready-to-Wear Saree Customization',
        reviewText: 'Shrusara Boutique is the only place in Bangalore I trust with my heirloom silk sarees. Everything was delivered on time with impeccable finishing.'
      }
    ],
    faqs: [
      {
        question: 'Can I customize a Ready-to-Wear Saree in {Location}?',
        answer: 'Yes! Whether you are in {Location} or anywhere across Bangalore, you can schedule a personalized consultation at our Mahalakshmipuram studio or book an online video consultation with Chief Designer Shruthi Ajith. We also arrange secure Porter pickup and delivery for your sarees.'
      },
      {
        question: 'Can any type of saree (Silk, Kanjeevaram, Georgette, Organza) be pre-stitched?',
        answer: 'Absolutely. We customize all varieties of sarees including heavy Kanjeevaram bridal silks, soft silks, banarasi silks, organza, georgette, chiffon, and designer embroidered sarees without compromising fabric drape or border aesthetics.'
      },
      {
        question: 'Will my saree fabric be cut or damaged during the customization process?',
        answer: 'No. Our master artisans use non-destructive tailoring techniques. We do not cut your saree fabric. The permanent pleats and waistband closures are carefully secured with gentle inner stitching so the integrity and value of your saree are fully preserved.'
      },
      {
        question: 'How do I provide measurements if I cannot visit the boutique from {Location}?',
        answer: 'You can book a 1-on-1 virtual video consultation where our design team will guide you step-by-step through recording simple measurements (waist, hip, and heel-to-waist height), or you can send a well-fitted skirt or reference saree via Porter.'
      },
      {
        question: 'Do you offer doorstep pickup and courier delivery in {Location}?',
        answer: 'Yes. We provide reliable Porter pickup and express courier delivery across {Location} and all major areas in Bangalore for fabric handover, intermediate fittings, and final delivery.'
      },
      {
        question: 'How much time does Ready-to-Wear Saree customization take at Shrusara?',
        answer: 'Standard ready-to-wear saree customization takes approximately 5 to 7 days. For urgent wedding dates or immediate events in {Location}, we also accommodate express priority customization slots.'
      },
      {
        question: 'Can the waistband be adjusted if my weight changes in the future?',
        answer: 'Yes! We design our waistbands with adjustable concealed hook rows and generous inner margins, allowing you to comfortably adjust the waist fit by up to 2 inches.'
      },
      {
        question: 'Why choose Shrusara instead of ready-made stitched sarees in Bangalore?',
        answer: 'Mass-produced ready-made sarees use generic sizing that rarely flatters individual heights and waist curves. Shrusara is 100% custom-only: each saree is handcrafted to your exact anatomical measurements with personalized design consultation.'
      }
    ],
    cta: {
      headingTemplate: 'Ready-to-Wear Saree Customization Near {Location}, Bangalore',
      subheadingTemplate: 'Transform your favorite sarees into effortless 1-minute drapes. Book your personalized consultation with Chief Designer Shruthi Ajith today.',
      whatsappText: 'Chat on WhatsApp',
      callText: 'Call Shrusara Boutique'
    },
    seo: {
      metaTitleTemplate: 'Ready-to-Wear Saree Customization in {Location}, Bangalore | Shrusara Fashion Boutique',
      metaDescriptionTemplate: 'Convert your saree into an elegant 1-minute ready-to-wear saree in {Location}, Bangalore. Permanent pleats, custom waist fit & 1-on-1 consultation with Shruthi Ajith.',
      metaKeywordsBuilder: (loc) => [
        'ready to wear saree ' + loc.toLowerCase(),
        'pre stitched saree ' + loc.toLowerCase(),
        'saree customization ' + loc.toLowerCase(),
        'saree pre stitching near ' + loc.toLowerCase(),
        'ready to wear saree bangalore',
        'pre stitched saree bangalore',
        'saree transformation bangalore',
        'shrusara fashion boutique'
      ]
    }
  },

  'Customized Bridal Blouse': {
    serviceName: 'Customized Bridal Blouse',
    singular: 'Bridal Blouse',
    plural: 'Bridal Blouses',
    heroImage: '/bridal/bridalblow/hero-bridal.webp',
    hero: {
      badgeTemplate: '100% Customized | {Location}, Bangalore',
      headingTemplate: 'Customized Bridal Blouse in {Location}, Bangalore',
      taglineTemplate: 'Customized bridal blouses tailored to your unique posture, silhouette, and wedding silk saree. Handcrafted embroidery, precision cups, and personalized consultation with Chief Designer Shruthi Ajith for brides in {Location}, Bangalore.',
      highlights: [
        '1-on-1 Consultation with Chief Designer Shruthi Ajith',
        'Personalized Measurements & Trial Fitting',
        'Try Before You Customize (Boutique Exclusive)',
        'Video Consultation Available Across Bangalore',
        'Pickup & Courier Delivery Across Bangalore',
        'Comfortable Customized Stitching'
      ],
      primaryCtaText: 'Chat on WhatsApp',
      primaryCtaMessageTemplate: "Hi Shrusara! I'd like to know more about Customized Bridal Blouses in {Location}.",
      secondaryCtaText: 'Call Shrusara Boutique',
      secondaryCtaLink: '#contact'
    },
    about: {
      headingTemplate: 'Bespoke Bridal Blouse Tailoring for Brides in {Location}',
      introTemplate: 'At Shrusara Fashion Boutique, we believe your bridal blouse is the focal point of your wedding ensemble. We specialize strictly in 100% customized bridal tailoring. Every blouse is individually patterned from scratch to eliminate shoulder drooping, neck gaping, and armhole tightness.',
      descriptionTemplate: 'From traditional South Indian muhurtham silk saree blouses to contemporary reception designs, our master artisans combine bespoke pattern drafting with generational embroidery techniques. Brides in {Location} and across Bangalore trust Shrusara for impeccable bridal fit, breathable cotton linings, and stress-free wedding timelines.',
      highlights: [
        {
          title: 'Custom Body-Pattern Drafting',
          description: 'No standard sizing templates. We draft individual master patterns taking into account shoulder slope, bust shape, and back contour.'
        },
        {
          title: 'High-Grade Skin-Friendly Linings',
          description: 'Pure breathable cotton and silk linings with cushioned piping ensuring hours of itch-free comfort during long wedding rituals.'
        },
        {
          title: 'Try Before You Customize',
          description: 'Experience fit samples at our Mahalakshmipuram studio to finalize necklines, sleeve cuts, and cup shaping.'
        },
        {
          title: 'Dedicated Trial & Precision Fitting',
          description: 'Intermediate trial fitting before final embroidery closure to guarantee zero gaping and complete arm movement ease.'
        },
        {
          title: 'Video Consultation for Measurements',
          description: 'Virtual styling consultation and measurement guidance for brides in {Location} and abroad.'
        },
        {
          title: 'Doorstep Courier Across Bangalore',
          description: 'Porter fabric pickup and safe courier delivery right to your doorstep in {Location}.'
        }
      ]
    },
    whyChooseUs: {
      headingTemplate: 'Why Brides in {Location} Choose Shrusara Boutique',
      introTemplate: 'Located in Mahalakshmipuram, Shrusara Fashion Boutique is easily accessible from {Location}. Here is why over a thousand Bangalore brides have chosen us:',
      cards: [
        {
          title: 'Personalized Design Consultation',
          description: 'One-on-one session with Chief Designer Shruthi Ajith to discuss neck cuts, sleeve styles, and saree pairing.'
        },
        {
          title: 'Customized for Your Body Fit',
          description: 'Custom anatomical measurements for flawless bust support, zero shoulder drop, and perfect back fit.'
        },
        {
          title: 'Try Before You Customize (Shrusara Exclusive)',
          description: 'Test blouse armhole comfort and neckline depths before final crafting.'
        },
        {
          title: 'Trial Fitting Before Final Delivery',
          description: 'Mandatory trial fitting session so any minute fitting preference is perfected before your big day.'
        },
        {
          title: 'Video Consultation Available',
          description: 'Virtual design sessions for NRI brides and clients in {Location} with tight schedules.'
        },
        {
          title: 'Pickup & Courier Across Bangalore',
          description: 'Reliable doorstep collection of your saree fabrics and express delivery across {Location}.'
        }
      ]
    },
    processSteps: [
      {
        stepNumber: 1,
        title: 'Consultation & Style Discussion',
        description: 'Understand your wedding theme, saree colors, neckline preference, and personal comfort priorities.',
        duration: 'Day 1'
      },
      {
        stepNumber: 2,
        title: 'Measurements & Pattern Drafting',
        description: 'Take over 20 anatomical measurements and draft a customized blueprint pattern for your blouse.',
        duration: 'Day 1-2'
      },
      {
        stepNumber: 3,
        title: 'Artisan Crafting & Stitching',
        description: 'Precision cutting, padding integration, and hand-tailoring executed by veteran bridal masters.',
        duration: 'Day 3-10'
      },
      {
        stepNumber: 4,
        title: 'Intermediate Trial & Fit Check',
        description: 'Wear the blouse during a trial session to confirm neckline comfort, armhole ease, and silhouette.',
        duration: 'Day 10-12'
      },
      {
        stepNumber: 5,
        title: 'Boutique Pickup / Bangalore Courier Delivery',
        description: 'Final touches, steam pressing, and handover at our studio or doorstep delivery to {Location}.',
        duration: 'Final Delivery'
      }
    ],
    gallery: [
      {
        url: '/bridal/bridalblow/hero-bridal.webp',
        title: 'Bridal Muhurtham Blouse',
        caption: 'Heirloom bridal blouse with precision princess cut and custom piping.'
      },
      {
        url: '/bridal/bridalblow/custom-fit-muhurtham-silk-saree-blouse-bangalore.webp',
        title: 'Silk Saree Bridal Blouse',
        caption: 'Flawless back neck cut customized for a Bangalore wedding.'
      },
      {
        url: '/bridal/bridalblow/designer-bridal-blouse-back-neck-pattern-bangalore-shrusara.webp',
        title: 'Designer Back Neck Cutwork',
        caption: 'Deep-back silhouette with comfortable padded support.'
      }
    ],
    testimonials: [
      {
        name: 'Kavya Murali',
        location: 'Rajajinagar, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Blouse',
        reviewText: "Shruthi ma'am personally designed my muhurtham blouse. The fitting was so comfortable that I didn't feel any heaviness during the 5-hour ritual. Truly the best bridal boutique in Bangalore!"
      },
      {
        name: 'Sahana Venkatesh',
        location: 'Malleshwaram, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Blouse',
        reviewText: 'Zero shoulder slipping! That was my biggest worry with deep back blouses, but Shrusara tailored it to absolute perfection.'
      },
      {
        name: 'Divya Ramesh',
        location: 'Sadashivanagar, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Blouse',
        reviewText: 'The trial fitting process was so reassuring. They accommodated all my small requests and delivered on the promised date.'
      },
      {
        name: 'Anusha Gowda',
        location: 'Vijayanagar, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Blouse',
        reviewText: 'Super convenient location near Rajajinagar and Mahalakshmipuram. The finish on the sleeves and neckline is boutique luxury at its finest.'
      },
      {
        name: 'Shilpa Reddy',
        location: 'Jayanagar, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Blouse',
        reviewText: 'Even though I live in South Bangalore, their video consultation and courier delivery made getting my bridal blouse completely effortless.'
      }
    ],
    faqs: [
      {
        question: 'How far in advance should I book my bridal blouse consultation in {Location}?',
        answer: 'We recommend booking your consultation 3 to 5 weeks before your wedding or muhurtham date. This provides ample time for detailed pattern drafting, hand crafting, and an intermediate trial fitting. Express slots are also available for urgent dates.'
      },
      {
        question: 'Do you customize blouses for South Indian weddings (Muhurtham, Reception, Sangeet)?',
        answer: 'Yes! We customize blouses for every wedding ceremony including muhurtham Kanjeevaram blouses, reception party blouses with sheer backs, haldi boat necks, and sangeet corset blouses.'
      },
      {
        question: 'Can I bring my own saree and blouse fabric?',
        answer: 'Yes. You can bring your saree and unstitched blouse material. If you need contrast fabrics, dupion silk, raw silk, or designer brocades, our designer will assist you in sourcing matching premium fabrics.'
      },
      {
        question: 'Do you offer trial fittings before final delivery?',
        answer: 'Yes! Every customized bridal blouse undergoes an intermediate trial fitting session. We inspect neckline depth, armhole contour, and cup placement so that your final fit is 100% flawless.'
      },
      {
        question: 'Do you provide doorstep pickup and delivery in {Location}?',
        answer: 'Yes, we provide secure Porter doorstep pickup of your fabrics from {Location} and safe delivery of your finished bridal outfit across Bangalore.'
      },
      {
        question: 'Can you customize modern necklines like corsets, sheer backs, and halter styles?',
        answer: 'Yes. Our chief designer specializes in both heritage traditional cuts and modern high-fashion silhouettes such as corset waistlines, sweetheart necklines, sheer illusion backs, and halter cuts.'
      },
      {
        question: 'What lining fabrics do you use for bridal blouses?',
        answer: 'We use high-count, pre-shrunk, pure breathable cotton linings and soft silk interlinings with cushioned seam piping to protect your skin from irritation during long wedding events.'
      },
      {
        question: 'Why choose Shrusara Fashion Boutique in Bangalore?',
        answer: 'Shrusara is strictly custom-only with direct designer guidance from Founder Shruthi Ajith. You never deal with middlemen, ensuring your bridal vision is executed with couture precision.'
      }
    ],
    cta: {
      headingTemplate: 'Customized Bridal Blouse Tailoring Near {Location}, Bangalore',
      subheadingTemplate: 'Schedule your 1-on-1 bridal consultation with Chief Designer Shruthi Ajith. Experience bespoke luxury and guaranteed perfect fit.',
      whatsappText: 'Chat on WhatsApp',
      callText: 'Call Shrusara Boutique'
    },
    seo: {
      metaTitleTemplate: 'Customized Bridal Blouse in {Location}, Bangalore | Shrusara Fashion Boutique',
      metaDescriptionTemplate: 'Customized bridal blouses in {Location}, Bangalore with perfect fit, handcrafted detailing & 1-on-1 consultation with Chief Designer Shruthi Ajith.',
      metaKeywordsBuilder: (loc) => [
        'bridal blouse ' + loc.toLowerCase(),
        'customized bridal blouse ' + loc.toLowerCase(),
        'bridal blouse designer ' + loc.toLowerCase(),
        'bridal blouse stitching near ' + loc.toLowerCase(),
        'bridal blouse designer bangalore',
        'customized bridal blouse bangalore',
        'wedding blouse tailoring bangalore',
        'shrusara fashion boutique'
      ]
    }
  },

  'Maggam & Aari Work Bridal Blouse': {
    serviceName: 'Maggam & Aari Work Bridal Blouse',
    singular: 'Maggam & Aari Work Bridal Blouse',
    plural: 'Maggam & Aari Work Bridal Blouses',
    heroImage: '/bridal/bridalblow/handcrafted-aari-work-wedding-blouse-shrusara-bangalore-boutique.webp',
    hero: {
      badgeTemplate: '100% Customized | {Location}, Bangalore',
      headingTemplate: 'Maggam & Aari Work Bridal Blouse in {Location}, Bangalore',
      taglineTemplate: 'Bespoke hand-embroidered bridal blouses with authentic Maggam and Aari craftsmanship on wooden adda frames. Intricate zardosi, cutwork, kundan, and pearl embroidery tailored for brides in {Location}, Bangalore.',
      highlights: [
        '1-on-1 Consultation with Chief Designer Shruthi Ajith',
        'Personalized Measurements & Trial Fitting',
        'Try Before You Customize (Boutique Exclusive)',
        'Video Consultation Available Across Bangalore',
        'Pickup & Courier Delivery Across Bangalore',
        'Comfortable Customized Stitching'
      ],
      primaryCtaText: 'Chat on WhatsApp',
      primaryCtaMessageTemplate: "Hi Shrusara! I'd like to know more about Maggam & Aari Work Bridal Blouses in {Location}.",
      secondaryCtaText: 'Call Shrusara Boutique',
      secondaryCtaLink: '#contact'
    },
    about: {
      headingTemplate: 'Artisan Maggam & Aari Work Customization in {Location}',
      introTemplate: 'At Shrusara Fashion Boutique, our Maggam and Aari embroidery is handcrafted stitch-by-stitch by hereditary karigars on traditional wooden adda frames. We do not use machine embroidery or pre-stitched appliques. Every motif is custom designed to match your bridal saree motifs.',
      descriptionTemplate: 'Whether you desire heritage temple antique gold work, delicate floral zardosi, French knots, or contemporary crystal detailing, our team customizes the embroidery density to your style and budget. Brides from {Location} and across Bangalore rely on Shrusara for heirloom-quality craftsmanship with smooth inner linings that never scratch.',
      highlights: [
        {
          title: 'Handcrafted Wooden-Frame Embroidery',
          description: 'Authentic Maggam and Aari needlework performed on stretched wooden frames for razor-sharp motif precision.'
        },
        {
          title: 'Heirloom Zardosi, Kundan & Pearls',
          description: 'High-grade non-tarnishing gold and antique zardozi wires, genuine pearls, and faceted kundan stones.'
        },
        {
          title: 'Try Before You Customize',
          description: 'Inspect embroidery thread swatches, sample zardosi motifs, and trial fit cups at our Mahalakshmipuram studio.'
        },
        {
          title: 'Trial Fitting Before Final Detailing',
          description: 'Intermediate fitting ensures the embroidery lines align symmetrically along your back and sleeve edge.'
        },
        {
          title: 'Video Consultation for Design Tracing',
          description: 'Discuss motif designs, neck curves, and embroidery layout over video call with Chief Designer Shruthi Ajith.'
        },
        {
          title: 'Doorstep Courier Across Bangalore',
          description: 'Secure fabric collection from {Location} and insured doorstep handover of your completed bridal blouse.'
        }
      ]
    },
    whyChooseUs: {
      headingTemplate: 'Why Brides in {Location} Choose Shrusara for Maggam Work',
      introTemplate: 'Conveniently located in Mahalakshmipuram near {Location}, Shrusara Boutique is Bangalore’s premier destination for genuine handcrafted bridal needlework:',
      cards: [
        {
          title: 'Personalized Design Consultation',
          description: 'Direct collaboration with Chief Designer Shruthi Ajith to customize motifs according to your saree borders.'
        },
        {
          title: 'Customized for Your Body Fit',
          description: 'Embroidery traced specifically to your body dimensions so motifs never get cut during tailoring.'
        },
        {
          title: 'Try Before You Customize (Shrusara Exclusive)',
          description: 'Review physical embroidery swatches and fit samples before finalizing your order.'
        },
        {
          title: 'Trial Fitting Before Final Delivery',
          description: 'Structured fitting sessions to verify sleeve length, armhole ease, and neck symmetry.'
        },
        {
          title: 'Video Consultation Available',
          description: 'Virtual design sessions for clients in {Location} and worldwide to finalize embroidery sketches.'
        },
        {
          title: 'Pickup & Courier Across Bangalore',
          description: 'Safe fabric collection and expedited delivery across {Location} and surrounding localities.'
        }
      ]
    },
    processSteps: [
      {
        stepNumber: 1,
        title: 'Design Consultation & Motif Selection',
        description: 'Examine your saree border, pick motif concepts (peacock, floral, temple, geometric), and choose zardosi tones.',
        duration: 'Day 1'
      },
      {
        stepNumber: 2,
        title: 'Measurements & Tracing Drafting',
        description: 'Record body measurements and draft individual 1:1 paper tracing sheets matching your neck cut.',
        duration: 'Day 2-3'
      },
      {
        stepNumber: 3,
        title: 'Handcrafted Adda Frame Embroidery',
        description: 'Master karigars hand-stitch zardosi, stones, and aari threadwork onto stretched silk fabric.',
        duration: 'Day 4-14'
      },
      {
        stepNumber: 4,
        title: 'Structural Stitching & Trial Fitting',
        description: 'Assemble blouse with soft cotton lining and padded cups, followed by an intermediate trial fitting.',
        duration: 'Day 14-16'
      },
      {
        stepNumber: 5,
        title: 'Final Detailing & Handover',
        description: 'Finishing latkans, multi-point inspection, steam pressing, and handover or delivery to {Location}.',
        duration: 'Final Delivery'
      }
    ],
    gallery: [
      {
        url: '/bridal/bridalblow/handcrafted-aari-work-wedding-blouse-shrusara-bangalore-boutique.webp',
        title: 'Handcrafted Aari Work Blouse',
        caption: 'Detailed zardosi and beadwork crafted on traditional wooden frames.'
      },
      {
        url: '/bridal/bridalblow/intricate-hand-embroidery-maggam-aari-bridal-wear-mahalakshmipuram.webp',
        title: 'Maggam Embroidery Back Neck',
        caption: 'Heirloom temple motif with antique gold and pearl embellishments.'
      },
      {
        url: '/bridal/bridalblow/premium-antique-gold-temple-work-bridal-blouse-shrusara-bangalore.webp',
        title: 'Antique Gold Temple Work',
        caption: 'Dense bridal maggam work tailored for a traditional Bangalore muhurtham.'
      }
    ],
    testimonials: [
      {
        name: 'Harini Sridhar',
        location: 'Rajajinagar, Bangalore',
        rating: 5,
        outfitType: 'Maggam & Aari Work Bridal Blouse',
        reviewText: 'The maggam work on my bridal blouse was a work of art. Shruthi ma’am matched the zardosi tone exactly to my Kanjeevaram saree border. Outstanding finishing!'
      },
      {
        name: 'Monika Gowda',
        location: 'Basaveshwaranagar, Bangalore',
        rating: 5,
        outfitType: 'Maggam & Aari Work Bridal Blouse',
        reviewText: 'So many boutiques use cheap plastic beads, but Shrusara uses genuine antique gold zardosi and smooth lining. It did not itch even once throughout the marriage.'
      },
      {
        name: 'Lakshmi Prasad',
        location: 'Malleshwaram, Bangalore',
        rating: 5,
        outfitType: 'Maggam & Aari Work Bridal Blouse',
        reviewText: 'Their hand tracing is completely customized to your neckline. The trial fitting ensured that none of the heavy embroidery cut into my shoulders.'
      },
      {
        name: 'Sangeetha R.',
        location: 'Sadashivanagar, Bangalore',
        rating: 5,
        outfitType: 'Maggam & Aari Work Bridal Blouse',
        reviewText: 'The best aari work boutique in Bangalore. Honest timelines, transparent pricing, and direct attention from the designer herself.'
      },
      {
        name: 'Keerthi N.',
        location: 'Koramangala, Bangalore',
        rating: 5,
        outfitType: 'Maggam & Aari Work Bridal Blouse',
        reviewText: 'Living in Koramangala, I did most of the design discussion over WhatsApp and video call. The blouse arrived ahead of time and fitted like a glove!'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Maggam and Aari work?',
        answer: 'Maggam work is traditional South Indian hand-embroidery worked on a wooden adda frame using a specialized needle with heavier zardosi, stones, and kundan. Aari work uses a hooked needle for delicate chain stitches and fluid floral motifs. At Shrusara, we masterfully blend both techniques.'
      },
      {
        question: 'How long does a Maggam work bridal blouse take to complete in {Location}?',
        answer: 'Hand-embroidered blouses take between 2 to 4 weeks depending on the density and intricacy of the design. For urgent wedding dates in {Location}, express priority slots of 8 to 10 days can be arranged upon consultation.'
      },
      {
        question: 'Will the heavy Maggam embroidery feel itchy on the skin?',
        answer: 'Never at Shrusara. We protect your skin by covering the underside of the embroidery with an extra layer of soft, breathable pure cotton lining and padded seam bindings so the back and sleeves feel gentle.'
      },
      {
        question: 'Can you customize a design from a photo or Pinterest reference?',
        answer: 'Yes! You can share your inspiration images, saree borders, or Pinterest pins. Designer Shruthi Ajith will adapt the motifs to harmonize with your saree and body dimensions.'
      },
      {
        question: 'Do you provide doorstep pickup and delivery in {Location}?',
        answer: 'Yes, we provide secure Porter doorstep pickup of fabrics from {Location} and doorstep delivery of your completed bridal blouse anywhere in Bangalore.'
      },
      {
        question: 'Can I choose my own colors, stone types, and zardosi shades?',
        answer: 'Yes! We offer a full range of antique gold, dull gold, rose gold, silver, and copper zardosi, as well as genuine kundan, pearls, cutwork, and thread color matches.'
      },
      {
        question: 'Do you offer an intermediate trial fitting before completion?',
        answer: 'Yes, after embroidery is completed on the frame and basic stitching is assembled, we conduct an intermediate fitting so any adjustments can be made before final finishing.'
      },
      {
        question: 'Why choose Shrusara for Maggam work blouses in Bangalore?',
        answer: 'Unlike commercial tailors who outsource machine work, Shrusara works exclusively with generational artisans on wooden adda frames, supervised directly by Chief Designer Shruthi Ajith.'
      }
    ],
    cta: {
      headingTemplate: 'Maggam & Aari Work Bridal Blouse Near {Location}, Bangalore',
      subheadingTemplate: 'Craft an heirloom hand-embroidered bridal blouse. Book your consultation with Chief Designer Shruthi Ajith today.',
      whatsappText: 'Chat on WhatsApp',
      callText: 'Call Shrusara Boutique'
    },
    seo: {
      metaTitleTemplate: 'Maggam & Aari Work Bridal Blouse in {Location}, Bangalore | Shrusara Fashion Boutique',
      metaDescriptionTemplate: 'Handcrafted Maggam and Aari work bridal blouses in {Location}, Bangalore with authentic zardosi, custom fit & 1-on-1 consultation with Shruthi Ajith.',
      metaKeywordsBuilder: (loc) => [
        'maggam work blouse ' + loc.toLowerCase(),
        'aari work blouse ' + loc.toLowerCase(),
        'maggam embroidery near ' + loc.toLowerCase(),
        'bridal maggam blouse ' + loc.toLowerCase(),
        'maggam work blouse bangalore',
        'aari work blouse bangalore',
        'hand embroidery bridal blouse bangalore',
        'shrusara fashion boutique'
      ]
    }
  },

  'Designer Blouse': {
    serviceName: 'Designer Blouse',
    singular: 'Designer Blouse',
    plural: 'Designer Blouses',
    heroImage: '/bridal/bridalblow/designer-bridal-blouse-back-neck-pattern-shrusara.webp',
    hero: {
      badgeTemplate: '100% Customized | {Location}, Bangalore',
      headingTemplate: 'Custom Designer Blouse in {Location}, Bangalore',
      taglineTemplate: 'Contemporary designer blouses crafted with structured corset cuts, high-neck designs, sheer back styling, and modern silhouettes. Personalized styling consultation with Chief Designer Shruthi Ajith for clients in {Location}, Bangalore.',
      highlights: [
        '1-on-1 Consultation with Chief Designer Shruthi Ajith',
        'Personalized Measurements & Trial Fitting',
        'Try Before You Customize (Boutique Exclusive)',
        'Video Consultation Available Across Bangalore',
        'Pickup & Courier Delivery Across Bangalore',
        'Comfortable Customized Stitching'
      ],
      primaryCtaText: 'Chat on WhatsApp',
      primaryCtaMessageTemplate: "Hi Shrusara! I'd like to know more about Designer Blouse Customization in {Location}.",
      secondaryCtaText: 'Call Shrusara Boutique',
      secondaryCtaLink: '#contact'
    },
    about: {
      headingTemplate: 'Modern & Fusion Designer Blouse Tailoring in {Location}',
      introTemplate: 'At Shrusara Fashion Boutique, our designer blouses are custom engineered to make a sophisticated fashion statement. We do not sell mass-produced ready-made blouses. Every blouse is tailored uniquely to your aesthetic preferences and event requirements.',
      descriptionTemplate: 'From cocktail saree blouses with sweetheart necklines to halter necks, corset-inspired bodices, cape sleeves, and asymmetrical drapes, we craft blouses that complement both contemporary sarees and festive lehengas. Clients in {Location} and across Bangalore love our precision fit and architectural pattern drafting.',
      highlights: [
        {
          title: 'Architectural Pattern Drafting',
          description: 'Modern silhouettes drafted specifically to accentuate your neckline and waist contours.'
        },
        {
          title: 'Structured Corsetry & Built-in Cups',
          description: 'Feather-light boning and seamless moulded cups for effortless support without bulky undergarments.'
        },
        {
          title: 'Try Before You Customize',
          description: 'Try sample designer blouse silhouettes at our studio to find the neckline that flatters you most.'
        },
        {
          title: 'Trial Fitting for Flawless Fit',
          description: 'Intermediate fitting ensuring complete armhole ease, zero shoulder slipping, and secure closure.'
        },
        {
          title: 'Video Consultation for Styling',
          description: 'Virtual design sessions for clients in {Location} to discuss neckline concepts and fabric combinations.'
        },
        {
          title: 'Doorstep Courier Across Bangalore',
          description: 'Porter fabric pickup and express delivery across {Location} and all Bangalore localities.'
        }
      ]
    },
    whyChooseUs: {
      headingTemplate: 'Why Clients in {Location} Choose Shrusara for Designer Blouses',
      introTemplate: 'Conveniently located in Mahalakshmipuram near {Location}, Shrusara Boutique is the top choice for bespoke modern and fusion blouse tailoring in Bangalore:',
      cards: [
        {
          title: 'Personalized Design Consultation',
          description: 'One-on-one session with Chief Designer Shruthi Ajith to brainstorm cuts, fabrics, and sleeve designs.'
        },
        {
          title: 'Customized for Your Body Fit',
          description: 'Tailored to your exact posture and proportions for effortless elegance and comfort.'
        },
        {
          title: 'Try Before You Customize (Shrusara Exclusive)',
          description: 'Test necklines and cup shapes before cutting into your precious fabrics.'
        },
        {
          title: 'Trial Fitting Before Final Delivery',
          description: 'Rigorous fitting checks to verify back contour, bust curve, and shoulder grip.'
        },
        {
          title: 'Video Consultation Available',
          description: 'Virtual styling sessions for clients in {Location} with busy work schedules.'
        },
        {
          title: 'Pickup & Courier Across Bangalore',
          description: 'Reliable doorstep collection and delivery across {Location} and Bangalore.'
        }
      ]
    },
    processSteps: [
      {
        stepNumber: 1,
        title: 'Consultation & Concept Sketching',
        description: 'Discuss your saree aesthetic, collar/neck preference, sleeve cuts, and back closure style.',
        duration: 'Day 1'
      },
      {
        stepNumber: 2,
        title: 'Measurements & Pattern Drafting',
        description: 'Take precise upper-body measurements to draft an individual architectural pattern.',
        duration: 'Day 1-2'
      },
      {
        stepNumber: 3,
        title: 'Tailoring & Boning/Padding Assembly',
        description: 'Incorporate internal boning, padded cups, and breathable lining for structure and ease.',
        duration: 'Day 3-7'
      },
      {
        stepNumber: 4,
        title: 'Trial Fitting Session',
        description: 'Try the blouse to verify neckline depth, comfort, and seam alignment.',
        duration: 'Day 7-9'
      },
      {
        stepNumber: 5,
        title: 'Final Handover or Delivery',
        description: 'Quality inspection, steam pressing, and studio pickup or courier delivery to {Location}.',
        duration: 'Final Delivery'
      }
    ],
    gallery: [
      {
        url: '/bridal/bridalblow/designer-bridal-blouse-back-neck-pattern-shrusara.webp',
        title: 'Contemporary Cutwork Blouse',
        caption: 'Modern cutwork pattern with sweetheart neckline and custom padding.'
      },
      {
        url: '/designer/Partwearset/designer-blouse-saree-bangalore-shrusara.webp',
        title: 'Cocktail Saree Blouse',
        caption: 'Bespoke party wear blouse with sleek minimalist finishing.'
      },
      {
        url: '/videos/designer-bridal-blouse-back-neck-pattern-bangalore-shrusara.webp',
        title: 'Designer Back Neck Cut',
        caption: 'Sculpted deep back tailored with zero shoulder drop.'
      }
    ],
    testimonials: [
      {
        name: 'Rhea Sen',
        location: 'Indiranagar, Bangalore',
        rating: 5,
        outfitType: 'Designer Blouse',
        reviewText: 'Finding someone in Bangalore who understands modern corset blouses without making them stiff was impossible until I met Shruthi Ajith. It fits like a second skin!'
      },
      {
        name: 'Pooja Nair',
        location: 'Malleshwaram, Bangalore',
        rating: 5,
        outfitType: 'Designer Blouse',
        reviewText: 'I got three designer blouses stitched for reception and cocktail parties. Every single one has unique necklines and clean finishing.'
      },
      {
        name: 'Swathi Bhatt',
        location: 'Rajajinagar, Bangalore',
        rating: 5,
        outfitType: 'Designer Blouse',
        reviewText: 'Super close to Rajajinagar and the quality is on par with top designer labels in Mumbai or Delhi.'
      },
      {
        name: 'Archana V.',
        location: 'Basaveshwaranagar, Bangalore',
        rating: 5,
        outfitType: 'Designer Blouse',
        reviewText: 'The trial fitting ensured there was zero gaping at the back. Loved the boutique experience!'
      },
      {
        name: 'Nisha K.',
        location: 'Koramangala, Bangalore',
        rating: 5,
        outfitType: 'Designer Blouse',
        reviewText: 'Loved the virtual video consultation and Porter pickup. Outstanding service for busy corporate professionals.'
      }
    ],
    faqs: [
      {
        question: 'What styles of designer blouses do you customize in {Location}?',
        answer: 'We customize all modern silhouettes including corset blouses, sweetheart necks, halter cuts, high-collar designs, sheer net backs, cape blouses, peplum cuts, and sleeveless princess-cut blouses.'
      },
      {
        question: 'Can you customize a blouse with built-in padding so I do not need a bra?',
        answer: 'Yes! We use premium, breathable, seamless moulded cups positioned precisely according to your bust apex, providing natural lift and zero bulkiness.'
      },
      {
        question: 'How long does designer blouse stitching take?',
        answer: 'Standard designer blouses take approximately 7 to 12 days. If you have an upcoming event in {Location}, express priority turnaround is also available.'
      },
      {
        question: 'Can I bring my own fabric or designer net?',
        answer: 'Yes, you are welcome to bring your own fabrics. We also assist in sourcing matching sheer nets, organza, raw silks, and designer borders.'
      },
      {
        question: 'Do you offer doorstep pickup and delivery in {Location}?',
        answer: 'Yes, Porter doorstep pickup and express courier delivery are available throughout {Location} and all of Bangalore.'
      },
      {
        question: 'What if I need minor adjustments after delivery?',
        answer: 'We provide complimentary alterations on all custom-stitched garments to ensure your blouse feels absolutely effortless.'
      },
      {
        question: 'Can you match a designer blouse for an existing lehenga skirt or saree?',
        answer: 'Yes, bring your saree or lehenga skirt to the boutique (or share pictures via WhatsApp) and our designer will create a complementary blouse design.'
      },
      {
        question: 'Why choose Shrusara instead of ready-made designer blouses?',
        answer: 'Ready-made blouses rarely fit individual cup sizes, armholes, and torso lengths correctly. Shrusara creates a bespoke pattern drafted strictly to your body contours.'
      }
    ],
    cta: {
      headingTemplate: 'Custom Designer Blouse Tailoring Near {Location}, Bangalore',
      subheadingTemplate: 'Elevate your party and festive style with bespoke designer blouses. Book your consultation with Chief Designer Shruthi Ajith today.',
      whatsappText: 'Chat on WhatsApp',
      callText: 'Call Shrusara Boutique'
    },
    seo: {
      metaTitleTemplate: 'Designer Blouse in {Location}, Bangalore | Shrusara Fashion Boutique',
      metaDescriptionTemplate: 'Custom modern designer blouses in {Location}, Bangalore. Corset cuts, high-necks, sheer backs & 1-on-1 consultation with Chief Designer Shruthi Ajith.',
      metaKeywordsBuilder: (loc) => [
        'designer blouse ' + loc.toLowerCase(),
        'designer blouse stitching ' + loc.toLowerCase(),
        'custom blouse designer near ' + loc.toLowerCase(),
        'designer blouse bangalore',
        'corset blouse bangalore',
        'custom designer blouse stitching bangalore',
        'shrusara fashion boutique'
      ]
    }
  },

  'Designer Gown': {
    serviceName: 'Designer Gown',
    singular: 'Designer Gown',
    plural: 'Designer Gowns',
    heroImage: '/videos/desingerhero.webp',
    hero: {
      badgeTemplate: '100% Customized | {Location}, Bangalore',
      headingTemplate: 'Custom Designer Gown in {Location}, Bangalore',
      taglineTemplate: 'Bespoke evening gowns, engagement ball gowns, reception trails, and indo-western fusion gowns crafted with sculpted corsetry and premium fabrics. Personalized consultation with Chief Designer Shruthi Ajith for clients in {Location}, Bangalore.',
      highlights: [
        '1-on-1 Consultation with Chief Designer Shruthi Ajith',
        'Personalized Measurements & Trial Fitting',
        'Try Before You Customize (Boutique Exclusive)',
        'Video Consultation Available Across Bangalore',
        'Pickup & Courier Delivery Across Bangalore',
        'Comfortable Customized Stitching'
      ],
      primaryCtaText: 'Chat on WhatsApp',
      primaryCtaMessageTemplate: "Hi Shrusara! I'd like to know more about Custom Designer Gowns in {Location}.",
      secondaryCtaText: 'Call Shrusara Boutique',
      secondaryCtaLink: '#contact'
    },
    about: {
      headingTemplate: 'Couture Evening & Reception Gown Designing in {Location}',
      introTemplate: 'At Shrusara Fashion Boutique, our designer gowns are created for your most memorable milestone moments. We do not sell mass-produced ready-made gowns. Every gown is conceived and hand-tailored uniquely to your silhouette, height, and event theme.',
      descriptionTemplate: 'Whether you dream of a dramatic sweeping reception gown with cancan volume, a sleek structured mermaid evening gown, or an Indo-Western fusion draped gown, our master designers engineer internal corsetry for a flattering waist cinch and lightweight walking comfort. Clients in {Location} and across Bangalore choose Shrusara for red-carpet elegance.',
      highlights: [
        {
          title: 'Custom Anatomical Corsetry',
          description: 'Internal lightweight boning and sculpted cups that cinch the waist without restricting breathing or movement.'
        },
        {
          title: 'Dramatic Flare & Cancan Engineering',
          description: 'Multi-tiered lightweight cancan netting and crinoline horsehair braids for majestic volume without heaviness.'
        },
        {
          title: 'Try Before You Customize',
          description: 'Visit our Mahalakshmipuram studio to try silhouette mockups and feel the drape before final tailoring.'
        },
        {
          title: 'Trial Fitting for Silhouette Flattery',
          description: 'Comprehensive trial sessions to adjust floor clearance with your chosen heels and confirm posture comfort.'
        },
        {
          title: 'Video Consultation for Remote Styling',
          description: 'Personalized virtual design sessions for clients in {Location} and overseas.'
        },
        {
          title: 'Doorstep Delivery Across Bangalore',
          description: 'Safe packaging and express courier delivery right to your home in {Location}.'
        }
      ]
    },
    whyChooseUs: {
      headingTemplate: 'Why Clients in {Location} Choose Shrusara for Designer Gowns',
      introTemplate: 'Located in Mahalakshmipuram near {Location}, Shrusara Boutique is Bangalore’s premier couture destination for custom-tailored gowns:',
      cards: [
        {
          title: 'Personalized Design Consultation',
          description: 'Direct styling collaboration with Chief Designer Shruthi Ajith to customize sketches and fabric textures.'
        },
        {
          title: 'Customized for Your Body Fit',
          description: 'Sculpted to your exact height, bust, waist, and hip ratios for a showstopping silhouette.'
        },
        {
          title: 'Try Before You Customize (Shrusara Exclusive)',
          description: 'Experience gown flare, trail lengths, and neckline depths before final stitching.'
        },
        {
          title: 'Trial Fitting Before Final Delivery',
          description: 'Dedicated fitting sessions to ensure you walk, dance, and celebrate with total confidence.'
        },
        {
          title: 'Video Consultation Available',
          description: 'Virtual styling sessions for clients in {Location} who prefer remote consultation.'
        },
        {
          title: 'Pickup & Courier Across Bangalore',
          description: 'Safe transport of your luxury gown right to your doorstep in {Location}.'
        }
      ]
    },
    processSteps: [
      {
        stepNumber: 1,
        title: 'Consultation & Silhouette Sketching',
        description: 'Discuss event theme (engagement, reception, cocktail), gown silhouette, flare, and neckline styling.',
        duration: 'Day 1'
      },
      {
        stepNumber: 2,
        title: 'Measurements & Foundation Drafting',
        description: 'Record over 25 body measurements and draft individual foundation patterns for bodice and skirt flare.',
        duration: 'Day 2-3'
      },
      {
        stepNumber: 3,
        title: 'Crafting, Fabric Layering & Embroidery',
        description: 'Layer premium silks, satin, organza, or velvet with delicate handcrafted handwork and cancan netting.',
        duration: 'Day 4-15'
      },
      {
        stepNumber: 4,
        title: 'Trial Fitting with Footwear',
        description: 'Wear the gown with your event heels to check hem clearance, bodice grip, and movement ease.',
        duration: 'Day 15-18'
      },
      {
        stepNumber: 5,
        title: 'Finishing & Luxury Handover',
        description: 'Steam pressing, final quality check, and studio pickup or doorstep delivery to {Location}.',
        duration: 'Final Delivery'
      }
    ],
    gallery: [
      {
        url: '/designer/designer gown/reception-gown-for-brides-shrusara-fashion-boutique.webp',
        title: 'Bridal Reception Gown',
        caption: 'Sculpted corset bodice with sweeping flare and handcrafted accents.'
      },
      {
        url: '/designer/designer gown/premium-designer-ball-gown-for-engagement-bangalore.webp',
        title: 'Engagement Ball Gown',
        caption: 'Dramatic multi-tiered volume engineered with lightweight cancan.'
      },
      {
        url: '/designer/Partwearset/custom-photoshoot-red-gown-reception-wear-bangalore.webp',
        title: 'Red Photoshoot Trail Gown',
        caption: 'Statement evening gown with majestic trail designed in Bangalore.'
      }
    ],
    testimonials: [
      {
        name: 'Tanya Fernandez',
        location: 'Sadashivanagar, Bangalore',
        rating: 5,
        outfitType: 'Designer Gown',
        reviewText: 'Shrusara designed my engagement ball gown. It had the most flattering corset waistline and a grand flare that looked straight out of a fairy tale! Cannot thank Shruthi ma’am enough.'
      },
      {
        name: 'Preethi Shenoy',
        location: 'Rajajinagar, Bangalore',
        rating: 5,
        outfitType: 'Designer Gown',
        reviewText: 'The quality of fabrics and internal boning is remarkable. The gown was voluminous yet felt surprisingly lightweight to dance in.'
      },
      {
        name: 'Meera Chacko',
        location: 'Indiranagar, Bangalore',
        rating: 5,
        outfitType: 'Designer Gown',
        reviewText: 'Finding a custom gown boutique in Bangalore that does high-end western silhouettes was tough until I discovered Shrusara. Exceptional craftsmanship.'
      },
      {
        name: 'Lavanya Reddy',
        location: 'Malleshwaram, Bangalore',
        rating: 5,
        outfitType: 'Designer Gown',
        reviewText: 'The trial fitting was so detailed. They adjusted the floor clearance perfectly for my 3-inch heels. Truly bespoke luxury.'
      },
      {
        name: 'Ankita Das',
        location: 'Whitefield, Bangalore',
        rating: 5,
        outfitType: 'Designer Gown',
        reviewText: 'We coordinated the entire design over video calls. The delivery to Whitefield was punctual and the fit needed zero alterations.'
      }
    ],
    faqs: [
      {
        question: 'How much time does it take to customize a designer gown in {Location}?',
        answer: 'Custom designer gowns typically require 3 to 4 weeks depending on the intricacy of the bodice corsetry, cancan layers, and surface embellishment. Express slots are available for urgent events.'
      },
      {
        question: 'Can you customize gowns for engagements, receptions, and cocktail parties?',
        answer: 'Yes! We customize ball gowns, A-line reception gowns, mermaid cuts, draped Indo-Western gowns, and maternity photoshoot trail gowns.'
      },
      {
        question: 'Are the gowns heavy to walk or dance in?',
        answer: 'No. We use advanced high-grade, lightweight crinoline horsehair braids and multi-layered soft tulle instead of heavy wire hoops, ensuring you can walk, sit, and dance with complete ease.'
      },
      {
        question: 'Can I bring my own fabric or do you provide luxury fabrics?',
        answer: 'You can bring your own fabric, or explore our curated selection of imported satins, silks, organzas, velvets, and hand-embroidered laces.'
      },
      {
        question: 'Do you offer trial fittings before final delivery in {Location}?',
        answer: 'Yes, trial fittings are an essential step. We check bodice support, waist fit, neckline depth, and hemline length with your event footwear.'
      },
      {
        question: 'Do you provide delivery in {Location}, Bangalore?',
        answer: 'Yes, we provide secure door-to-door delivery in garment bags across {Location} and all Bangalore localities.'
      },
      {
        question: 'Can you customize matching accessories like veils, capes, or gloves?',
        answer: 'Yes! We customize matching floor-length veils, sheer embroidered capes, detachable trails, and matching hairpieces.'
      },
      {
        question: 'Why choose Shrusara Fashion Boutique for designer gowns?',
        answer: 'Shrusara is 100% custom-only. You work directly with Founder & Chief Designer Shruthi Ajith for an individualized haute couture gown engineered to your exact body measurements.'
      }
    ],
    cta: {
      headingTemplate: 'Custom Designer Gown Near {Location}, Bangalore',
      subheadingTemplate: 'Make an unforgettable entrance on your special day. Book your 1-on-1 gown consultation with Chief Designer Shruthi Ajith today.',
      whatsappText: 'Chat on WhatsApp',
      callText: 'Call Shrusara Boutique'
    },
    seo: {
      metaTitleTemplate: 'Designer Gowns in {Location}, Bangalore | Shrusara Fashion Boutique',
      metaDescriptionTemplate: 'Custom designer gowns in {Location}, Bangalore. Engagement ball gowns, reception trails & 1-on-1 consultation with Chief Designer Shruthi Ajith.',
      metaKeywordsBuilder: (loc) => [
        'designer gowns ' + loc.toLowerCase(),
        'custom gowns ' + loc.toLowerCase(),
        'evening gowns near ' + loc.toLowerCase(),
        'reception gown ' + loc.toLowerCase(),
        'designer gowns bangalore',
        'custom reception gowns bangalore',
        'evening gown boutique bangalore',
        'shrusara fashion boutique'
      ]
    }
  },

  'Customized Bridal Lehenga': {
    serviceName: 'Customized Bridal Lehenga',
    singular: 'Bridal Lehenga',
    plural: 'Bridal Lehengas',
    heroImage: '/bridal/Lehenga/custom-made-bridal-muhurtham-lehenga-shrusara.webp',
    hero: {
      badgeTemplate: '100% Customized | {Location}, Bangalore',
      headingTemplate: 'Customized Bridal Lehenga in {Location}, Bangalore',
      taglineTemplate: 'Full-flared bridal lehengas customized with 16-to-24 kalis, double cancan skirts, matching hand-embroidered blouses, and handcrafted dupattas. Personalized design consultation with Chief Designer Shruthi Ajith for brides in {Location}, Bangalore.',
      highlights: [
        '1-on-1 Consultation with Chief Designer Shruthi Ajith',
        'Personalized Measurements & Trial Fitting',
        'Try Before You Customize (Boutique Exclusive)',
        'Video Consultation Available Across Bangalore',
        'Pickup & Courier Delivery Across Bangalore',
        'Comfortable Customized Stitching'
      ],
      primaryCtaText: 'Chat on WhatsApp',
      primaryCtaMessageTemplate: "Hi Shrusara! I'd like to know more about Customized Bridal Lehengas in {Location}.",
      secondaryCtaText: 'Call Shrusara Boutique',
      secondaryCtaLink: '#contact'
    },
    about: {
      headingTemplate: 'Haute Couture Bridal Lehenga Designing in {Location}',
      introTemplate: 'At Shrusara Fashion Boutique, we believe every bride deserves a lehenga that tells her unique love story. We do not sell mass-produced ready-made lehenga sets. Every lehenga is created from scratch with customized kalis, color grading, and bespoke embroidery.',
      descriptionTemplate: 'From regal heritage red and maroon velvet lehengas to pastel organza and raw silk reception ensembles, we engineer the skirt volume with double cancan skirts for majestic flare and effortless walking. Brides in {Location} and across Bangalore choose Shrusara for heirloom luxury tailored to their exact waist and height.',
      highlights: [
        {
          title: 'Custom Kali & Flare Engineering',
          description: '16 to 24 kali panels cut to provide a dramatic 360-degree flare without bunching at the waist.'
        },
        {
          title: 'Detachable Double Cancan Skirts',
          description: 'Lightweight double cancan and horsehair braid structure for grand volume that stays comfortable.'
        },
        {
          title: 'Try Before You Customize',
          description: 'Experience lehenga flare, waist grip, and blouse cuts at our Mahalakshmipuram studio.'
        },
        {
          title: 'Trial Fitting for Hemline & Blouse Fit',
          description: 'Intermediate trial session ensuring skirt hemline matches your heels and blouse provides zero-gap support.'
        },
        {
          title: 'Video Consultation for Color Palette',
          description: 'Virtual styling sessions for brides in {Location} to coordinate fabrics, embroidery swatches, and dupatta borders.'
        },
        {
          title: 'Doorstep Courier Across Bangalore',
          description: 'Insured, safe delivery of your bridal lehenga ensemble right to your address in {Location}.'
        }
      ]
    },
    whyChooseUs: {
      headingTemplate: 'Why Brides in {Location} Choose Shrusara for Lehengas',
      introTemplate: 'Located in Mahalakshmipuram near {Location}, Shrusara Boutique is the destination for customized bridal and reception lehengas:',
      cards: [
        {
          title: 'Personalized Design Consultation',
          description: 'Work directly with Founder & Chief Designer Shruthi Ajith to customize colors, kalis, and embroidery motifs.'
        },
        {
          title: 'Customized for Your Body Fit',
          description: 'Tailored to your exact waist, hip, and height so you move, sit, and dance with graceful ease.'
        },
        {
          title: 'Try Before You Customize (Shrusara Exclusive)',
          description: 'Test lehenga flare and blouse styles before finalizing your custom bridal order.'
        },
        {
          title: 'Trial Fitting Before Final Delivery',
          description: 'Rigorous trial sessions to verify dupatta draping, blouse cups, and floor clearance.'
        },
        {
          title: 'Video Consultation Available',
          description: 'Virtual sessions for brides in {Location} or NRI brides preparing for Bangalore weddings.'
        },
        {
          title: 'Pickup & Courier Across Bangalore',
          description: 'Safe collection of reference fabrics and doorstep delivery across {Location} and all Bangalore.'
        }
      ]
    },
    processSteps: [
      {
        stepNumber: 1,
        title: 'Consultation & Color Palette Selection',
        description: 'Explore color harmonies, fabric options (raw silk, velvet, organza), and discuss ceremony themes.',
        duration: 'Day 1'
      },
      {
        stepNumber: 2,
        title: 'Measurements & Kali Drafting',
        description: 'Record body measurements and draft panel proportions for 360-degree lehenga flare.',
        duration: 'Day 2-3'
      },
      {
        stepNumber: 3,
        title: 'Hand Embroidery & Tailoring',
        description: 'Artisans hand-stitch motifs on adda frames; tailors construct the skirt, cancan layers, and blouse.',
        duration: 'Day 4-18'
      },
      {
        stepNumber: 4,
        title: 'Intermediate Trial Session',
        description: 'Try on the skirt with heels and blouse to inspect hem clearance, waist comfort, and neckline depth.',
        duration: 'Day 18-20'
      },
      {
        stepNumber: 5,
        title: 'Final Detailing & Bridal Handover',
        description: 'Add custom latkans, steam press, and handover in luxury garment bags or deliver to {Location}.',
        duration: 'Final Delivery'
      }
    ],
    gallery: [
      {
        url: '/bridal/Lehenga/custom-made-bridal-muhurtham-lehenga-shrusara.webp',
        title: 'Custom Muhurtham Bridal Lehenga',
        caption: 'Heirloom zardosi embroidery with custom double cancan flare.'
      },
      {
        url: '/bridal/Lehenga/luxury-bridal-lehenga-custom-design-bangalore.webp',
        title: 'Luxury Reception Lehenga',
        caption: 'Contemporary pastel lehenga with intricate bead and pearl craftsmanship.'
      },
      {
        url: '/videos/custom-made-bridal-reception-lehenga-shrusara.webp',
        title: 'Full Flared Bridal Ensemble',
        caption: '360-degree flare engineered for seamless bridal movement.'
      }
    ],
    testimonials: [
      {
        name: 'Varsha Reddy',
        location: 'Basaveshwaranagar, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Lehenga',
        reviewText: 'My reception lehenga was customized exactly to the color shade I envisioned. The double cancan gave it royal volume without feeling heavy. Shrusara is simply the best in Bangalore!'
      },
      {
        name: 'Rachana Gowda',
        location: 'Rajajinagar, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Lehenga',
        reviewText: 'The blouse fitting was incredible and the lehenga skirt did not slip or pinch my waist at all. Highly recommended!'
      },
      {
        name: 'Shreya Iyer',
        location: 'Malleshwaram, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Lehenga',
        reviewText: 'Personal attention from Shruthi Ajith made all the difference. She gave honest advice on fabric and flare that suited my height perfectly.'
      },
      {
        name: 'Sneha Hegde',
        location: 'Jayanagar, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Lehenga',
        reviewText: 'The trial fitting ensured the hemline floated 1 inch above the floor with my wedding stilettos. Perfection in every stitch!'
      },
      {
        name: 'Bhavana M.',
        location: 'Whitefield, Bangalore',
        rating: 5,
        outfitType: 'Customized Bridal Lehenga',
        reviewText: 'Great communication via video calls and prompt delivery to Whitefield. Looked breathtaking in the wedding photographs.'
      }
    ],
    faqs: [
      {
        question: 'How many months in advance should I order my bridal lehenga in {Location}?',
        answer: 'We recommend ordering your bridal lehenga 4 to 8 weeks before your wedding date. This allows sufficient time for hand-embroidery on adda frames, kali tailoring, and detailed trial fittings.'
      },
      {
        question: 'Can you customize lehengas for Sangeet, Mehendi, and Reception?',
        answer: 'Yes! We create lightweight floral and mirror-work lehengas for Mehendi, vibrant metallic and sequin sets for Sangeet, and grand heirloom lehengas for Muhurtham and Reception.'
      },
      {
        question: 'How do you ensure the lehenga skirt has full flare without being heavy?',
        answer: 'We engineer multi-layered lightweight crinoline and structured cancan skirts that provide voluminous 360-degree bounce while remaining comfortable for hours of wearing.'
      },
      {
        question: 'Can I customize matching blouses, dupattas, and veils?',
        answer: 'Yes! The entire ensemble is coordinated: matching hand-embroidered blouse, main dupatta, and an optional lightweight second dupatta or customized bridal head veil.'
      },
      {
        question: 'Do you offer doorstep pickup and delivery in {Location}?',
        answer: 'Yes, Porter doorstep pickup of fabrics and insured home delivery of your completed bridal lehenga are available across {Location} and Bangalore.'
      },
      {
        question: 'Do you provide trial fittings before final delivery?',
        answer: 'Yes, an intermediate trial session is standard for all bridal lehengas to ensure skirt length with your heels and blouse cup fit are exact.'
      },
      {
        question: 'Can the lehenga waist be adjusted if I lose or gain weight before the wedding?',
        answer: 'Yes! We design our lehengas with adjustable drawstring closures, concealed hooks, and generous inner seam margins for effortless last-minute adjustments.'
      },
      {
        question: 'Why choose Shrusara over ready-made lehengas in Commercial Street or Chickpet?',
        answer: 'Ready-made stores offer fixed sizes and synthetic blends. Shrusara is 100% custom couture: authentic pure fabrics, master hand-embroidery, and personalized consultation with Chief Designer Shruthi Ajith.'
      }
    ],
    cta: {
      headingTemplate: 'Customized Bridal Lehenga Near {Location}, Bangalore',
      subheadingTemplate: 'Walk into your wedding with a one-of-a-kind couture bridal lehenga. Book your consultation with Chief Designer Shruthi Ajith today.',
      whatsappText: 'Chat on WhatsApp',
      callText: 'Call Shrusara Boutique'
    },
    seo: {
      metaTitleTemplate: 'Customized Bridal Lehenga in {Location}, Bangalore | Shrusara Fashion Boutique',
      metaDescriptionTemplate: 'Customized bridal lehengas in {Location}, Bangalore. 16-to-24 kali flare, double cancan, bespoke blouse & 1-on-1 consultation with Chief Designer Shruthi Ajith.',
      metaKeywordsBuilder: (loc) => [
        'bridal lehenga ' + loc.toLowerCase(),
        'customized lehenga ' + loc.toLowerCase(),
        'wedding lehenga near ' + loc.toLowerCase(),
        'bridal lehenga designer ' + loc.toLowerCase(),
        'bridal lehenga bangalore',
        'customized bridal lehenga bangalore',
        'designer lehenga boutique bangalore',
        'shrusara fashion boutique'
      ]
    }
  },

  'Luxury Occasion Wear': {
    serviceName: 'Luxury Occasion Wear',
    singular: 'Luxury Occasion Wear Outfit',
    plural: 'Luxury Occasion Wear Outfits',
    heroImage: '/occasion_wear/Designer Gowns & Indo western outfits/Designer Gowns & Indo western outfits/indo-western-fusion-bridal-wear-shrusara.webp',
    hero: {
      badgeTemplate: '100% Customized | {Location}, Bangalore',
      headingTemplate: 'Luxury Occasion Wear in {Location}, Bangalore',
      taglineTemplate: 'Customized Indo-Western fusion sets, crop-top skirt ensembles, pre-draped half sarees, and festive party wear tailored with boutique luxury. Personalized consultation with Chief Designer Shruthi Ajith for clients in {Location}, Bangalore.',
      highlights: [
        '1-on-1 Consultation with Chief Designer Shruthi Ajith',
        'Personalized Measurements & Trial Fitting',
        'Try Before You Customize (Boutique Exclusive)',
        'Video Consultation Available Across Bangalore',
        'Pickup & Courier Delivery Across Bangalore',
        'Comfortable Customized Stitching'
      ],
      primaryCtaText: 'Chat on WhatsApp',
      primaryCtaMessageTemplate: "Hi Shrusara! I'd like to know more about Luxury Occasion Wear in {Location}.",
      secondaryCtaText: 'Call Shrusara Boutique',
      secondaryCtaLink: '#contact'
    },
    about: {
      headingTemplate: 'Bespoke Festive & Indo-Western Couture in {Location}',
      introTemplate: 'At Shrusara Fashion Boutique, our luxury occasion wear celebrates contemporary Indian silhouettes with modern elegance. We do not sell mass-produced ready-made pieces. Every outfit is individually customized to your body type, color preferences, and celebration.',
      descriptionTemplate: 'Whether you are a sister of the bride, a bridesmaid, or attending a high-profile festive celebration, we customize crop-top skirt sets with jackets, modern half sarees, dhoti pant suits, and cocktail drape sets. Clients in {Location} and across Bangalore trust Shrusara for standout festive fashion that feels comfortable all day.',
      highlights: [
        {
          title: 'Custom Indo-Western Silhouettes',
          description: 'Fusion cuts, cape shrugs, asymmetric hemlines, and pre-draped dhotis tailored to your personal aesthetic.'
        },
        {
          title: 'Modern Half Sarees & Crop Top Sets',
          description: 'Contemporary interpretations of traditional half sarees with structured blouses and flowing skirts.'
        },
        {
          title: 'Try Before You Customize',
          description: 'Visit our Mahalakshmipuram studio to try sample silhouettes and explore drape options.'
        },
        {
          title: 'Trial Fitting for Comfort & Movement',
          description: 'Intermediate fitting sessions to ensure you can celebrate, walk, and dance comfortably.'
        },
        {
          title: 'Video Consultation for Styling',
          description: 'Virtual styling sessions for clients in {Location} to coordinate fabrics, colors, and cuts.'
        },
        {
          title: 'Doorstep Courier Across Bangalore',
          description: 'Reliable doorstep collection of fabrics and express delivery across {Location} and all Bangalore.'
        }
      ]
    },
    whyChooseUs: {
      headingTemplate: 'Why Clients in {Location} Choose Shrusara for Occasion Wear',
      introTemplate: 'Located in Mahalakshmipuram near {Location}, Shrusara Boutique is Bangalore’s top destination for festive couture and Indo-Western wear:',
      cards: [
        {
          title: 'Personalized Design Consultation',
          description: 'One-on-one session with Chief Designer Shruthi Ajith to brainstorm event themes and flattering cuts.'
        },
        {
          title: 'Customized for Your Body Fit',
          description: 'Engineered to your exact posture and proportions so you look and feel extraordinary.'
        },
        {
          title: 'Try Before You Customize (Shrusara Exclusive)',
          description: 'Test cuts and sleeve styles before cutting your fabrics.'
        },
        {
          title: 'Trial Fitting Before Final Delivery',
          description: 'Dedicated fitting check to verify waist comfort, skirt length, and neckline depth.'
        },
        {
          title: 'Video Consultation Available',
          description: 'Virtual styling sessions for clients in {Location} with busy lifestyles.'
        },
        {
          title: 'Pickup & Courier Across Bangalore',
          description: 'Prompt doorstep collection and delivery across {Location} and Bangalore.'
        }
      ]
    },
    processSteps: [
      {
        stepNumber: 1,
        title: 'Consultation & Silhouette Selection',
        description: 'Discuss celebration type (sangeet, engagement, diwali, reception), color palette, and preferred silhouette.',
        duration: 'Day 1'
      },
      {
        stepNumber: 2,
        title: 'Measurements & Pattern Drafting',
        description: 'Record body measurements and draft custom patterns for top, skirt/pants, and drape layer.',
        duration: 'Day 2-3'
      },
      {
        stepNumber: 3,
        title: 'Crafting & Embellishment',
        description: 'Tailor premium fabrics with hand embroidery, modern trims, and comfortable inner lining.',
        duration: 'Day 4-12'
      },
      {
        stepNumber: 4,
        title: 'Trial Fitting Session',
        description: 'Test the ensemble with event footwear to ensure movement ease and silhouette perfection.',
        duration: 'Day 12-14'
      },
      {
        stepNumber: 5,
        title: 'Final Detailing & Handover',
        description: 'Steam pressing, final inspection, and boutique pickup or courier delivery to {Location}.',
        duration: 'Final Delivery'
      }
    ],
    gallery: [
      {
        url: '/occasion_wear/Designer Gowns & Indo western outfits/Designer Gowns & Indo western outfits/indo-western-fusion-bridal-wear-shrusara.webp',
        title: 'Indo-Western Fusion Set',
        caption: 'Bespoke contemporary festive ensemble with modern drapes.'
      },
      {
        url: '/designer/Indowestern/contemporary-modren-bridal-trousseau-outfit-shruthi-ajith.webp',
        title: 'Modern Sangeet Ensemble',
        caption: 'Crop top skirt set tailored with handcrafted accents.'
      },
      {
        url: '/videos/designer-croptop-lehenga-bangalore-shruthi-shrusara.webp',
        title: 'Designer Crop Top & Skirt',
        caption: 'Comfortable festive styling for bridesmaids and sisters.'
      }
    ],
    testimonials: [
      {
        name: 'Pratibha Joshi',
        location: 'Rajajinagar, Bangalore',
        rating: 5,
        outfitType: 'Luxury Occasion Wear',
        reviewText: 'I got an Indo-Western jacket and crop top skirt set stitched for my cousin’s sangeet. Everyone complimented the unique color combination and fitting!'
      },
      {
        name: 'Nandita Rao',
        location: 'Malleshwaram, Bangalore',
        rating: 5,
        outfitType: 'Luxury Occasion Wear',
        reviewText: 'Shrusara’s half saree designs are breathtaking. Modern yet rooted in tradition. Shruthi ma’am is extremely creative.'
      },
      {
        name: 'Aishwarya M.',
        location: 'Sadashivanagar, Bangalore',
        rating: 5,
        outfitType: 'Luxury Occasion Wear',
        reviewText: 'The trial fitting was great. They adjusted the skirt length and waist fit so I could dance comfortably all night.'
      },
      {
        name: 'Chandana Gowda',
        location: 'Basaveshwaranagar, Bangalore',
        rating: 5,
        outfitType: 'Luxury Occasion Wear',
        reviewText: 'Extremely polite team and punctual delivery. Best boutique in Bangalore for customized festive wear.'
      },
      {
        name: 'Rakshitha S.',
        location: 'HSR Layout, Bangalore',
        rating: 5,
        outfitType: 'Luxury Occasion Wear',
        reviewText: 'Coordinated the order through WhatsApp and video call. The package arrived in HSR Layout in pristine condition and fitted perfectly.'
      }
    ],
    faqs: [
      {
        question: 'What types of occasion wear do you customize in {Location}?',
        answer: 'We customize Indo-Western gowns, crop top skirt sets with shrugs, contemporary half sarees, dhoti suits, pre-draped party sarees, and cocktail dresses.'
      },
      {
        question: 'Can you customize matching outfits for bridesmaids or family members?',
        answer: 'Yes! We specialize in coordinating color-themed ensembles for bridesmaids, sisters of the bride/groom, and family groups.'
      },
      {
        question: 'How long does occasion wear customization take?',
        answer: 'Custom occasion wear sets take approximately 10 to 18 days. Express slots of 5 to 7 days are also available for urgent party dates in {Location}.'
      },
      {
        question: 'Can I provide my own fabrics for occasion wear?',
        answer: 'Yes, you can bring your own fabrics or we can assist you in sourcing matching silks, organza, georgette, and brocades.'
      },
      {
        question: 'Do you offer doorstep pickup and delivery in {Location}?',
        answer: 'Yes, Porter doorstep pickup and express courier delivery are available throughout {Location} and all of Bangalore.'
      },
      {
        question: 'Do you offer trial fittings before final handover?',
        answer: 'Yes, an intermediate trial session ensures waist comfort, hemline height, and neckline depth are 100% satisfactory.'
      },
      {
        question: 'Can the outfit be altered if needed later?',
        answer: 'Yes! We provide generous seam allowances on all custom garments so they can be easily adjusted in the future.'
      },
      {
        question: 'Why choose Shrusara for luxury occasion wear in Bangalore?',
        answer: 'Shrusara is 100% custom-only with personalized styling by Founder Shruthi Ajith, ensuring you wear an original, tailored creation rather than an off-the-rack duplicate.'
      }
    ],
    cta: {
      headingTemplate: 'Luxury Occasion Wear Near {Location}, Bangalore',
      subheadingTemplate: 'Stand out at your next celebration with bespoke designer ensembles. Book your consultation with Chief Designer Shruthi Ajith today.',
      whatsappText: 'Chat on WhatsApp',
      callText: 'Call Shrusara Boutique'
    },
    seo: {
      metaTitleTemplate: 'Luxury Occasion Wear in {Location}, Bangalore | Shrusara Fashion Boutique',
      metaDescriptionTemplate: 'Custom luxury occasion wear & Indo-Western sets in {Location}, Bangalore. Crop top lehengas, half sarees & 1-on-1 consultation with Shruthi Ajith.',
      metaKeywordsBuilder: (loc) => [
        'occasion wear ' + loc.toLowerCase(),
        'indo western wear ' + loc.toLowerCase(),
        'crop top lehenga ' + loc.toLowerCase(),
        'party wear boutique near ' + loc.toLowerCase(),
        'occasion wear bangalore',
        'indo western wear bangalore',
        'crop top skirt set bangalore',
        'shrusara fashion boutique'
      ]
    }
  },

  'Kids Boutique': {
    serviceName: 'Kids Boutique',
    singular: 'Kids Customized Outfit',
    plural: 'Kids Customized Outfits',
    heroImage: '/videos/kidshero.webp',
    hero: {
      badgeTemplate: '100% Customized | {Location}, Bangalore',
      headingTemplate: 'Kids Outfit Boutique in {Location}, Bangalore',
      taglineTemplate: 'Customized kids party wear, birthday couture frocks, traditional pattu pavadai sets, and mother-daughter matching outfits crafted with ultra-soft, breathable linings and growth margins. Personalized consultation with Chief Designer Shruthi Ajith for clients in {Location}, Bangalore.',
      highlights: [
        '1-on-1 Consultation with Chief Designer Shruthi Ajith',
        'Ultra-Soft Breathable & Scratch-Free Linings',
        'Custom Growth Margins for Extended Wear',
        'Video Consultation Available Across Bangalore',
        'Pickup & Courier Delivery Across Bangalore',
        'Comfortable Customized Stitching'
      ],
      primaryCtaText: 'Chat on WhatsApp',
      primaryCtaMessageTemplate: "Hi Shrusara! I'd like to know more about Kids Boutique Customization in {Location}.",
      secondaryCtaText: 'Call Shrusara Boutique',
      secondaryCtaLink: '#contact'
    },
    about: {
      headingTemplate: 'Comfort-First Kids Couture & Festive Outfits in {Location}',
      introTemplate: 'At Shrusara Fashion Boutique, our kids collection is designed with one paramount principle: pure comfort and effortless movement. We do not sell mass-produced ready-made children’s clothes. Every outfit is individually tailored to your child’s measurements using soft, skin-friendly fabrics.',
      descriptionTemplate: 'From magical first-birthday frocks and festive lehengas to heritage silk pattu pavadai sets and coordinated mother-daughter ensembles, our children’s tailoring uses zero harsh scratchy seams, 100% pre-shrunk cotton inner linings, and concealed closures. Parents in {Location} and across Bangalore trust Shrusara so their little ones look adorable and stay happy throughout the celebration.',
      highlights: [
        {
          title: 'Skin-Friendly Scratch-Free Linings',
          description: '100% pure soft cotton inner lining with covered seam bindings that never irritate sensitive young skin.'
        },
        {
          title: 'Built-in Growth Margins',
          description: 'Generous 2-to-3 inch internal seam allowances and adjustable waistbands so outfits can be easily loosened as your child grows.'
        },
        {
          title: 'Mother & Daughter Coordinated Sets',
          description: 'Cherish picture-perfect moments with harmonious mother-daughter festive frocks and lehenga sets.'
        },
        {
          title: 'Gentle Trial Fitting Session',
          description: 'A relaxed, child-friendly fitting session ensuring complete freedom to run, play, and smile.'
        },
        {
          title: 'Video Consultation for Easy Measurements',
          description: 'Parent-friendly virtual measurement guide over video call for families in {Location}.'
        },
        {
          title: 'Doorstep Delivery Across Bangalore',
          description: 'Convenient Porter fabric pickup and doorstep delivery right to your home in {Location}.'
        }
      ]
    },
    whyChooseUs: {
      headingTemplate: 'Why Parents in {Location} Choose Shrusara Kids Boutique',
      introTemplate: 'Located in Mahalakshmipuram near {Location}, Shrusara Boutique is Bangalore’s trusted destination for customized kids fashion:',
      cards: [
        {
          title: 'Personalized Design Consultation',
          description: 'Direct discussion with Chief Designer Shruthi Ajith to select lightweight fabrics, colors, and comfortable cuts.'
        },
        {
          title: 'Customized for Your Child’s Fit',
          description: 'Zero stiff or ill-fitting garments. Tailored to your child’s height and proportions for total comfort.'
        },
        {
          title: 'Ultra-Soft Scratch-Free Linings',
          description: 'Breathable cotton interlinings protecting delicate skin from beads, zips, and trims.'
        },
        {
          title: 'Child-Friendly Trial Fitting',
          description: 'Quick, cheerful fitting checks to guarantee your little one feels completely comfortable.'
        },
        {
          title: 'Video Consultation Available',
          description: 'Convenient virtual sessions for busy parents in {Location} without having to bring restless kids to the store.'
        },
        {
          title: 'Pickup & Courier Across Bangalore',
          description: 'Reliable doorstep collection and express delivery across {Location} and all of Bangalore.'
        }
      ]
    },
    processSteps: [
      {
        stepNumber: 1,
        title: 'Consultation & Theme Selection',
        description: 'Discuss birthday theme, festival, or wedding occasion, pick soft fabrics, and select kid-friendly styles.',
        duration: 'Day 1'
      },
      {
        stepNumber: 2,
        title: 'Gentle Measurements & Patterning',
        description: 'Take simple measurements with generous growth margins and draft a comfortable child pattern.',
        duration: 'Day 1-2'
      },
      {
        stepNumber: 3,
        title: 'Tailoring with Soft Cotton Linings',
        description: 'Stitch using pre-washed cotton linings, cushioned seam encasings, and soft elasticated waistbands.',
        duration: 'Day 3-8'
      },
      {
        stepNumber: 4,
        title: 'Quick Comfort & Fit Check',
        description: 'Ensure the neckline is easy to slip on and your child can move, sit, and play without restriction.',
        duration: 'Day 8-10'
      },
      {
        stepNumber: 5,
        title: 'Boutique Handover or Doorstep Delivery',
        description: 'Steam pressing, final quality check, and studio pickup or doorstep delivery to {Location}.',
        duration: 'Final Delivery'
      }
    ],
    gallery: [
      {
        url: '/videos/kidshero.webp',
        title: 'Custom Birthday Princess Frock',
        caption: 'Multi-layer pastel tulle frock with soft cotton lining for birthdays.'
      },
      {
        url: '/videos/mother-and-daughter-matching-frock-shrusara-boutique.webp',
        title: 'Mother & Daughter Matching Frocks',
        caption: 'Coordinated festive styling handcrafted for special occasions.'
      },
      {
        url: '/videos/mother-and-daughter-premium-matching-frock-shrusara-boutique.webp',
        title: 'Premium Mother-Daughter Couture',
        caption: 'Bespoke celebratory wear customized in Bangalore.'
      }
    ],
    testimonials: [
      {
        name: 'Anupama Murthy',
        location: 'Malleshwaram, Bangalore',
        rating: 5,
        outfitType: 'Kids Boutique',
        reviewText: 'My 3-year-old daughter usually cries whenever we dress her in heavy party frocks because they itch. Shrusara used pure cotton lining and she wore it happily for 6 hours! Best kids boutique in Bangalore.'
      },
      {
        name: 'Sowmya Suresh',
        location: 'Rajajinagar, Bangalore',
        rating: 5,
        outfitType: 'Kids Boutique',
        reviewText: 'We got mother-daughter matching gowns stitched for my daughter’s first birthday. Everyone was stunned by how beautiful we looked together!'
      },
      {
        name: 'Nandini K.',
        location: 'Basaveshwaranagar, Bangalore',
        rating: 5,
        outfitType: 'Kids Boutique',
        reviewText: 'The growth margins are a lifesaver. We were able to loosen the waist easily six months later for another family function.'
      },
      {
        name: 'Deepika R.',
        location: 'Sadashivanagar, Bangalore',
        rating: 5,
        outfitType: 'Kids Boutique',
        reviewText: 'Loved the video consultation. As a working mother, not having to drag my toddler to the store was such a blessing. Delivered on time!'
      },
      {
        name: 'Geetha Belavadi',
        location: 'Jayanagar, Bangalore',
        rating: 5,
        outfitType: 'Kids Boutique',
        reviewText: 'Traditional pattu pavadai tailored to perfection with soft waistband and pure silk. Excellent boutique.'
      }
    ],
    faqs: [
      {
        question: 'What age groups do you customize kids outfits for in {Location}?',
        answer: 'We customize outfits for newborn babies (naming ceremonies, cradle ceremonies), toddlers, and young girls up to 14 years old.'
      },
      {
        question: 'Will the outfit itch or irritate my child’s sensitive skin?',
        answer: 'Never. Every children’s garment at Shrusara is fully lined with pre-washed, 100% pure soft cotton. All internal seams are enclosed with soft binding tapes so no raw threads, zips, or beads ever touch your child’s skin.'
      },
      {
        question: 'Can you customize mother and daughter matching outfits?',
        answer: 'Yes! Coordinated mother-daughter outfits are one of our signature specialties for birthdays, naming ceremonies, and family weddings.'
      },
      {
        question: 'How long does it take to customize a kids outfit?',
        answer: 'Custom kids frocks and pattu pavadais take approximately 5 to 10 days. Express priority slots of 3 to 5 days are available for urgent birthday dates.'
      },
      {
        question: 'Can the outfit be adjusted as my child grows?',
        answer: 'Yes! We build generous 2-to-3 inch internal seam allowances and expandable waistbands into every outfit, allowing you to easily loosen the dress as your child grows.'
      },
      {
        question: 'Do you offer doorstep pickup and delivery in {Location}?',
        answer: 'Yes, we provide reliable Porter pickup and express courier delivery right to your home in {Location} and across Bangalore.'
      },
      {
        question: 'What types of kids garments do you stitch?',
        answer: 'We create first-birthday ball gowns, floral frocks, South Indian silk pattu pavadais, lehenga cholis, and festive anarkalis.'
      },
      {
        question: 'Why choose Shrusara Kids Boutique in Bangalore?',
        answer: 'Commercial kids stores sell itchy synthetic garments with fixed sizing. Shrusara provides 100% custom-fit children’s couture prioritizing comfort, safety, and heirloom beauty.'
      }
    ],
    cta: {
      headingTemplate: 'Customized Kids Outfit Boutique Near {Location}, Bangalore',
      subheadingTemplate: 'Dress your little princess in comfortable, picture-perfect customized couture. Book your consultation with Chief Designer Shruthi Ajith today.',
      whatsappText: 'Chat on WhatsApp',
      callText: 'Call Shrusara Boutique'
    },
    seo: {
      metaTitleTemplate: 'Kids Outfit Boutique in {Location}, Bangalore | Shrusara Fashion Boutique',
      metaDescriptionTemplate: 'Customized kids frocks, pattu pavadais & mother-daughter outfits in {Location}, Bangalore. Soft cotton linings, growth margins & design consultation with Shruthi Ajith.',
      metaKeywordsBuilder: (loc) => [
        'kids boutique ' + loc.toLowerCase(),
        'kids party wear ' + loc.toLowerCase(),
        'birthday frock near ' + loc.toLowerCase(),
        'mother daughter matching dress ' + loc.toLowerCase(),
        'kids outfit boutique bangalore',
        'customized kids wear bangalore',
        'pattu pavadai stitching bangalore',
        'shrusara fashion boutique'
      ]
    }
  }
};

export function slugifyBangalorePage(serviceCategory = 'Ready-to-Wear Saree Customization', locationName = 'Bangalore') {
  const normService = normalizeServiceCategory(serviceCategory);
  const serviceSlug = normService
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const locSlug = String(locationName || 'Bangalore')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${serviceSlug}-stitching-${locSlug}`.replace(/--+/g, '-');
}

export function buildLandingPageFromMaster(serviceCategory = 'Ready-to-Wear Saree Customization', locationName = 'Rajajinagar', overrides = {}) {
  const normService = normalizeServiceCategory(serviceCategory);
  const master = MASTER_SERVICE_TEMPLATES[normService] || MASTER_SERVICE_TEMPLATES['Ready-to-Wear Saree Customization'];
  const locPreset = BANGALORE_LOCATIONS_PRESET.find((l) => l.name.toLowerCase() === String(locationName || '').toLowerCase()) || {
    name: locationName || 'Bangalore',
    areaGroup: overrides.areaGroup || 'Bangalore West',
    distanceNote: `Easily accessible from ${locationName}. Doorstep Porter & express courier delivery available across Bangalore.`,
    landmark: 'Near Mahalakshmi Metro Station / 1st Block Rajajinagar',
    travelTime: '10-15 mins',
    nearbyAreas: ['Rajajinagar', 'Malleshwaram', 'Basaveshwaranagar', 'Vijayanagar']
  };

  const loc = locPreset.name;
  const replaceLoc = (str = '') => String(str || '').replace(/\{Location\}/g, loc);

  const title = replaceLoc(overrides.title || `${normService} in ${loc}, Bangalore`);
  const slug = overrides.slug || slugifyBangalorePage(normService, loc);
  const metaTitle = replaceLoc(overrides.metaTitle || master.seo.metaTitleTemplate);
  const metaDescription = replaceLoc(overrides.metaDescription || master.seo.metaDescriptionTemplate);
  const metaKeywords = overrides.metaKeywords || master.seo.metaKeywordsBuilder(loc);

  const hero = {
    badge: replaceLoc(overrides.hero?.badge || master.hero.badgeTemplate),
    heading: replaceLoc(overrides.hero?.heading || master.hero.headingTemplate),
    tagline: replaceLoc(overrides.hero?.tagline || master.hero.taglineTemplate),
    highlights: overrides.hero?.highlights?.length ? overrides.hero.highlights : master.hero.highlights,
    primaryCtaText: overrides.hero?.primaryCtaText || master.hero.primaryCtaText,
    primaryCtaMessage: replaceLoc(overrides.hero?.primaryCtaMessage || master.hero.primaryCtaMessageTemplate),
    secondaryCtaText: overrides.hero?.secondaryCtaText || master.hero.secondaryCtaText,
    secondaryCtaLink: overrides.hero?.secondaryCtaLink || master.hero.secondaryCtaLink
  };

  const about = {
    heading: replaceLoc(overrides.about?.heading || master.about.headingTemplate),
    intro: replaceLoc(overrides.about?.intro || master.about.introTemplate),
    description: replaceLoc(overrides.about?.description || master.about.descriptionTemplate),
    highlights: (overrides.about?.highlights?.length ? overrides.about.highlights : master.about.highlights).map((h) => ({
      title: replaceLoc(h.title),
      description: replaceLoc(h.description)
    }))
  };

  const whyChooseUs = {
    heading: replaceLoc(overrides.whyChooseUs?.heading || master.whyChooseUs.headingTemplate),
    intro: replaceLoc(overrides.whyChooseUs?.intro || master.whyChooseUs.introTemplate),
    cards: (overrides.whyChooseUs?.cards?.length ? overrides.whyChooseUs.cards : master.whyChooseUs.cards).map((c) => ({
      title: replaceLoc(c.title),
      description: replaceLoc(c.description)
    }))
  };

  const processSteps = (overrides.processSteps?.length ? overrides.processSteps : master.processSteps).map((s) => ({
    stepNumber: s.stepNumber,
    title: replaceLoc(s.title),
    description: replaceLoc(s.description),
    duration: s.duration
  }));

  const gallery = (overrides.gallery?.length ? overrides.gallery : master.gallery).map((g) => ({
    url: g.url,
    title: replaceLoc(g.title || `${normService} in ${loc}`),
    alt: replaceLoc(g.alt || `${normService} in ${loc}, Bangalore – Shrusara Fashion Boutique`),
    caption: replaceLoc(g.caption || '')
  }));

  const testimonials = (overrides.testimonials?.length ? overrides.testimonials : master.testimonials).map((t) => ({
    name: t.name,
    location: replaceLoc(t.location || `${loc}, Bangalore`),
    rating: t.rating || 5,
    outfitType: t.outfitType || normService,
    reviewText: replaceLoc(t.reviewText)
  }));

  const faqs = (overrides.faqs?.length ? overrides.faqs : master.faqs).map((f) => ({
    question: replaceLoc(f.question),
    answer: replaceLoc(f.answer)
  }));

  const proximity = {
    locationName: loc,
    areaGroup: locPreset.areaGroup || overrides.areaGroup || 'Bangalore West',
    boutiqueAddress: BOUTIQUE_ADDRESS,
    landmark: locPreset.landmark || 'Near Mahalakshmi Metro Station / 1st Block Rajajinagar',
    travelTime: locPreset.travelTime || '10-15 mins',
    distanceNote: locPreset.distanceNote || `Easily accessible from ${loc}. Doorstep Porter & express courier delivery available across Bangalore.`,
    nearbyAreas: locPreset.nearbyAreas || ['Rajajinagar', 'Malleshwaram', 'Basaveshwaranagar', 'Vijayanagar'],
    workingHours: 'Monday - Sunday: 10:30 AM - 8:30 PM (By Appointment & Walk-in)',
    googleMapsUrl: 'https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore',
    boutiqueVisitOptions: [
      { title: 'Walk-ins Welcome', description: 'Feel free to visit our Mahalakshmipuram boutique anytime during boutique hours.' },
      { title: 'Bridal Appointments Recommended', description: 'Schedule a dedicated 1-on-1 slot with Chief Designer Shruthi Ajith.' },
      { title: 'Video Consultation Available', description: 'Virtual design sessions for clients in ' + loc + ' unable to visit in person.' },
      { title: 'Pickup & Courier Available Across Bangalore', description: 'Reliable Porter fabric pickup and doorstep delivery across ' + loc + '.' }
    ]
  };

  const cta = {
    heading: replaceLoc(overrides.cta?.heading || master.cta.headingTemplate),
    subheading: replaceLoc(overrides.cta?.subheading || master.cta.subheadingTemplate),
    whatsappText: overrides.cta?.whatsappText || master.cta.whatsappText,
    callText: overrides.cta?.callText || master.cta.callText
  };

  const featuredImage = overrides.featuredImage?.url ? overrides.featuredImage : {
    url: master.heroImage,
    alt: `${normService} in ${loc}, Bangalore – Shrusara Fashion Boutique`,
    title: `${normService} in ${loc}`,
    caption: `100% Customized ${normService} tailored by Shrusara Fashion Boutique in Bangalore.`
  };

  return {
    title,
    slug,
    serviceCategory: normService,
    locationName: loc,
    areaGroup: locPreset.areaGroup || overrides.areaGroup || 'Bangalore West',
    status: overrides.status || 'draft',
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
    updatedAt: new Date().toISOString()
  };
}

export function generatePresetContent(serviceCategory = 'Ready-to-Wear Saree Customization', locationName = 'Rajajinagar', areaGroup = 'Bangalore West') {
  return buildLandingPageFromMaster(serviceCategory, locationName, { areaGroup });
}

export function generateLandingPageSchemas({ page = {}, siteUrl = DEFAULT_SITE_URL }) {
  const cleanSiteUrl = String(siteUrl || DEFAULT_SITE_URL).replace(/\/+$/, '');
  const pageSlug = String(page.slug || '').trim();
  const pageUrl = `${cleanSiteUrl}${BANGALORE_BASE_PATH}/${pageSlug}`;
  const title = page.metaTitle || page.title || 'Customized Boutique Service in Bangalore | Shrusara Fashion Boutique';
  const description = page.metaDescription || page.hero?.tagline || 'Customized bridal and designer wear in Bangalore by Shrusara Fashion Boutique.';
  const serviceCategory = page.serviceCategory || 'Ready-to-Wear Saree Customization';
  const locationName = page.locationName || 'Bangalore';
  const imageUrl = page.featuredImage?.url
    ? (/^https?:\/\//i.test(page.featuredImage.url) ? page.featuredImage.url : `${cleanSiteUrl}${page.featuredImage.url.startsWith('/') ? '' : '/'}${page.featuredImage.url}`)
    : `${cleanSiteUrl}/videos/logo.png`;

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
    ]
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
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
        item: `${cleanSiteUrl}${BANGALORE_BASE_PATH}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title || `${serviceCategory} in ${locationName}`,
        item: pageUrl
      }
    ]
  };

  // 3. FAQPage Schema
  let faqSchema = null;
  const faqs = Array.isArray(page.faqs) ? page.faqs.filter((f) => f.question && f.answer) : [];
  if (faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
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

  // 4. LocalBusiness Schema for this location
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ClothingStore'],
    '@id': `${pageUrl}#localbusiness`,
    name: `Shrusara Fashion Boutique - ${serviceCategory} in ${locationName}`,
    url: pageUrl,
    telephone: '+919741827558',
    priceRange: '₹₹₹',
    image: imageUrl,
    description: description,
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
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: locationName
    }
  };

  return {
    serviceSchema,
    breadcrumbSchema,
    faqSchema,
    localBusinessSchema,
    canonicalUrl: pageUrl
  };
}
