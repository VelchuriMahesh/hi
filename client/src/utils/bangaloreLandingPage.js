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
  'Bridal Blouse',
  'Maggam & Aari Work Bridal Blouse',
  'Designer Blouse',
  'Designer Gown',
  'Bridal Lehenga',
  'Luxury Occasion Wear',
  'Ready-to-Wear Saree Customization',
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
  if (s.includes('bridal blouse') || s.includes('customized bridal blouse')) {
    return 'Bridal Blouse';
  }
  if (s.includes('designer blouse')) {
    return 'Designer Blouse';
  }
  if (s.includes('gown')) {
    return 'Designer Gown';
  }
  if (s.includes('lehenga')) {
    return 'Bridal Lehenga';
  }
  if (s.includes('kids')) {
    return 'Kids Boutique';
  }
  if (s.includes('occasion') || s.includes('party') || s.includes('indo-western')) {
    return 'Luxury Occasion Wear';
  }
  return 'Bridal Blouse';
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
    seo: {
      titleTemplate: 'Customized Bridal Blouse in {Location}, Bangalore | Shrusara',
      metaTitleTemplate: 'Customized Bridal Blouse in {Location}, Bangalore | Shrusara Fashion Boutique',
      metaDescriptionTemplate: 'Customized bridal blouse stitching in {Location}, Bangalore with perfect fit, personalized measurements, trial fitting and one-on-one consultation with Chief Designer Shruthi Ajith.',
      metaKeywordsTemplate: 'bridal blouse {Location}, customized bridal blouse {Location}, bridal blouse designer {Location}, bridal blouse stitching near {Location}, bridal blouse designer bangalore, customized bridal blouse bangalore, wedding blouse tailoring bangalore, shrusara fashion boutique',
      metaKeywords: [
        'bridal blouse {location}',
        'bridal blouse stitching {location}',
        'customized bridal blouse {location}',
        'bridal blouse boutique {location}',
        'bridal blouse stitching Bangalore',
        'customized bridal blouse Bangalore',
        'wedding blouse stitching Bangalore',
        'silk saree bridal blouse Bangalore',
        'bridal boutique Bangalore',
        'Shrusara Fashion Boutique Bangalore'
      ],
      canonicalUrlPattern: '/bangalore/bridal-blouse-stitching-{location-slug}'
    },
    hero: {
      badgeTemplate: '100% Customized Bridal Blouse in {Location}, Bangalore',
      headingTemplate: 'Customized Bridal Blouse in {Location}, Bangalore',
      taglineTemplate: 'Every bridal blouse at Shrusara Fashion Boutique is designed exclusively for you. From personalized measurements and neckline styling to trial fitting and handcrafted finishing, Chief Designer Shruthi Ajith helps create a bridal blouse that matches your wedding saree, body shape and personal style.',
      highlights: [
        '1-on-1 Consultation with Chief Designer Shruthi Ajith',
        'Personalized Measurements & Trial Fitting',
        'Customized Bridal Blouse for Every Wedding Occasion',
        'Video Consultation Available for the measurement guidance Across Bangalore',
        'Pickup & Courier Delivery Across Bangalore',
        'Comfortable Customized Stitching with Premium Finish'
      ],
      primaryCtaText: 'Chat on WhatsApp',
      primaryCtaMessageTemplate: "Hi Shrusara! I'd like to know more about Customized Bridal Blouses in {Location}.",
      secondaryCtaText: 'Call Shrusara Boutique',
      secondaryCtaLink: '#contact'
    },
    about: {
      headingTemplate: 'Bespoke Bridal Blouse Tailoring for Brides in {Location}',
      introTemplate: 'Every bride has a different saree, body shape, and blouse design preference. At Shrusara Fashion Boutique, every bridal blouse is customized to suit your measurements, wedding saree, and personal style. We focus on perfect fitting, comfort, and beautiful finishing for your special day.',
      descriptionTemplate: 'Shrusara Fashion Boutique specializes in customized bridal blouse stitching in Bangalore. Every bridal blouse is stitched according to your body measurements, saree design, neckline, sleeve style, and wedding occasion. Whether you are looking for a Muhurtham blouse, Reception blouse, Engagement blouse, Haldi blouse, Mehendi blouse, or Sangeet blouse, we design each blouse to match your complete bridal look.\n\nOur focus is on accurate measurements, comfortable fitting, neat finishing, and a bridal blouse that looks elegant throughout your wedding celebrations.',
      highlights: [
        {
          title: 'Custom Body-Pattern Drafting',
          description: 'Every bridal blouse is drafted from scratch using your individual body measurements for a flattering fit, balanced shoulders and comfortable arm movement.'
        },
        {
          title: 'Premium Bridal Lining & Finishing',
          description: 'We use soft cotton and silk linings with neat finishing, piping, and padding options for comfort, support, and a premium bridal look.'
        },
        {
          title: 'Neckline, Sleeve & Cup Customization',
          description: 'Choose from a wide range of neckline styles, sleeve designs, blouse cups, back patterns, tassels and bridal finishing details to match your saree.'
        },
        {
          title: 'Bridal Blouses for Every Wedding Function',
          description: 'We customize bridal blouses for Muhurtham, Reception, Engagement, Haldi, Mehendi, Sangeet, and Wedding ceremonies, with styling that matches each occasion.'
        },
        {
          title: 'Comfortable All-Day Bridal Wear',
          description: 'Every blouse is stitched for long hours of comfort, allowing easy movement while maintaining a structured and elegant bridal silhouette.'
        },
        {
          title: 'Handcrafted Bridal Blouse Stitching',
          description: 'Every bridal blouse is carefully stitched by experienced artisans with attention to fitting, finishing, durability, and bridal detailing.'
        }
      ]
    },
    whyChooseUs: {
      headingTemplate: 'Why Brides in {Location} Choose Shrusara Fashion Boutique',
      introTemplate: 'Choosing a bridal blouse is about more than stitching. At Shrusara Fashion Boutique, we guide every bride through personalized design consultation, accurate measurements, trial fitting, and careful finishing to create a bridal blouse that is comfortable, elegant, and made especially for her wedding day.',
      descriptionTemplate: 'Located in Mahalakshmipuram, Shrusara Fashion Boutique is easily accessible from {Location}. Here is why over a thousand Bangalore brides have chosen us:',
      cards: [
        {
          title: '1-on-1 Bridal Design Consultation',
          description: 'Meet Chief Designer Shruthi Ajith to discuss your bridal blouse design, neckline, sleeves, blouse pattern, and styling based on your wedding saree.'
        },
        {
          title: 'Personalized Measurements for Every Bride',
          description: 'Every bridal blouse is stitched using your individual body measurements for a comfortable fit, balanced silhouette, and confident bridal look.'
        },
        {
          title: 'Sample Blouse Preview Before Final Stitching',
          description: 'Visit our boutique to check the blouse fitting, neckline, sleeves, and overall design before the final stitching and finishing are completed.'
        },
        {
          title: 'Trial Fitting Before Final Delivery',
          description: 'We do a trial fitting before final delivery to make sure your bridal blouse fits comfortably and is ready for your wedding day.'
        },
        {
          title: 'Video Consultation Available Across Bangalore',
          description: 'If visiting the boutique is not convenient, we provide a video consultation to discuss your bridal blouse design and guide you with measurements before your boutique visit or stitching process.'
        },
        {
          title: 'Porter Pickup & Courier Assistance Across Bangalore',
          description: 'If you are unable to visit our Mahalakshmipuram boutique, we help coordinate Porter pickup and courier delivery across Bangalore. Our team will receive your fabric, complete the customization, carefully pack it, and hand it over for delivery.'
        }
      ]
    },
    processSteps: [
      {
        stepNumber: 1,
        title: 'Design Consultation with Chief Designer',
        description: 'Meet Chief Designer Shruthi Ajith for a one-on-one consultation. Discuss your wedding saree, blouse design, neckline, sleeve style, embroidery and fitting preferences.',
        duration: 'Day 1'
      },
      {
        stepNumber: 2,
        title: 'Measurements & Pattern Making',
        description: 'We take detailed body measurements and create a custom blouse pattern based on your posture, bust shape, shoulder fit, armhole, sleeve length, and blouse length.',
        duration: 'Day 1-2'
      },
      {
        stepNumber: 3,
        title: 'Handcrafted Stitching & Embroidery',
        description: 'Your bridal blouse is stitched with precision and finished with handcrafted embroidery or detailing based on your selected design, fabric, and wedding occasion.',
        duration: 'Day 3-10'
      },
      {
        stepNumber: 4,
        title: 'Trial Fitting & Final Adjustments',
        description: 'Visit our boutique for a trial fitting. We make final adjustments for neckline, sleeve fit, bust fitting, waist shape and overall comfort before delivery.',
        duration: 'Day 10-15'
      },
      {
        stepNumber: 5,
        title: 'Final Delivery or Bangalore Courier',
        description: "After quality checking and final finishing, collect your customized bridal blouse from our Mahalakshmipuram boutique. If you're unable to visit, our team can help coordinate Porter pickup or courier delivery within Bangalore.",
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
    proximity: {
      defaultDistanceNote: 'Shrusara Fashion Boutique is located in Mahalakshmipuram, just a short drive from {Location}, Bangalore. We welcome bridal clients from {Location} for one-on-one design consultations, measurements, trial fitting, and customized bridal blouse stitching.',
      googleMapsUrl: 'https://goo.gl/maps/CaxMWN7JQXwCXAjE6',
      boutiqueAddress: 'Shrusara Fashion Boutique 106, 6th Main Road, Mahalakshmipuram, Bangalore – 560086',
      workingHours: 'Monday – Saturday 10:00 AM – 7:30 PM'
    },
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
        question: 'How early should I book my bridal blouse consultation  ?',
        answer: 'We recommend booking your bridal blouse consultation 3 to 5 weeks before your wedding or muhurtham date. This gives enough time for consultation, measurements, stitching, trial fitting, and final finishing. If your wedding is approaching soon, we also accept urgent orders based on availability.'
      },
      {
        question: 'Do you customize bridal blouses for South Indian weddings?',
        answer: 'Yes. We customize bridal blouses for Muhurtham, Reception, Engagement, Haldi, Sangeet, and other wedding functions. Every blouse is designed based on your saree, occasion, and personal style.'
      },
      {
        question: 'Can I bring my own saree and blouse fabric?',
        answer: 'Yes. You can bring your wedding saree and blouse material. If you need matching blouse fabric, lining, piping, cups, or contrast fabrics, our designer will help you choose suitable options during your consultation.'
      },
      {
        question: 'Do you offer trial fittings before final delivery?',
        answer: 'Yes. Every customized bridal blouse includes a trial fitting before final delivery. We check neckline, armhole comfort, bust fitting, sleeve fitting, and overall comfort before completing the blouse.'
      },
      {
        question: 'Do you provide pickup and courier delivery across Bangalore?',
        answer: "Yes. If you're unable to visit our Mahalakshmipuram boutique, our team can help coordinate Porter pickup and courier delivery across Bangalore. We receive your fabric, complete the customization, carefully pack it, and hand it over for delivery."
      },
      {
        question: 'Can you customize modern and traditional bridal blouse designs?',
        answer: 'Yes. We customize both traditional South Indian bridal blouses and modern bridal blouse designs, including sweetheart necklines, deep backs, boat necks, elbow sleeves, puff sleeves, corset-inspired blouses, and contemporary reception styles.'
      },
      {
        question: 'What fabrics and linings do you use for bridal blouses?',
        answer: 'We use comfortable, skin-friendly cotton and soft silk linings based on your blouse design and fabric. We also recommend suitable lining, cups, piping, and finishing options for better comfort, support, and shape.'
      },
      {
        question: 'Why choose Shrusara Fashion Boutique for bridal blouse stitching in Bangalore?',
        answer: 'Shrusara Fashion Boutique specializes in 100% customized bridal blouse stitching in Bangalore. Every blouse is created after a personal consultation with Chief Designer Shruthi Ajith, with custom measurements, trial fitting, and handcrafted finishing for a comfortable and elegant fit.'
      },
      {
        question: 'Do you sell ready-made bridal blouses or bridal outfits?',
        answer: 'No. Shrusara Fashion Boutique is a 100% customization-only boutique. We do not sell ready-made bridal blouses, bridal lehengas, gowns, or other bridal outfits. Every outfit is customized after a personal consultation, body measurements, design selection, and stitching based on your requirements.'
      }
    ],
    cta: {
      headingTemplate: 'Customized Bridal Blouse Tailoring Near {Location}, Bangalore',
      subheadingTemplate: 'Looking for a customized bridal blouse in {Location}? Chat with Chief Designer Shruthi Ajith for a one-on-one consultation, measurements, and personalized bridal blouse stitching at Shrusara Fashion Boutique.',
      whatsappText: 'Chat on WhatsApp',
      callText: 'Call Shrusara Fashion Boutique'
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

// Aliases for 8 canonical services
MASTER_SERVICE_TEMPLATES['Bridal Blouse'] = MASTER_SERVICE_TEMPLATES['Customized Bridal Blouse'];
MASTER_SERVICE_TEMPLATES['Bridal Lehenga'] = MASTER_SERVICE_TEMPLATES['Customized Bridal Lehenga'];

export function slugifyService(serviceName = '') {
  return String(serviceName || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractMasterTemplateFromPage(page = {}) {
  const service = normalizeServiceCategory(page.serviceCategory || 'Ready-to-Wear Saree Customization');
  const loc = String(page.locationName || '').trim();
  const sId = slugifyService(service);

  // Helper to reverse location into {Location}
  const toTemplate = (str = '') => {
    if (!str || typeof str !== 'string') return str || '';
    if (!loc) return str;
    const escapedLoc = loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedLoc}\\b`, 'gi');
    return str.replace(regex, '{Location}');
  };

  const heroHeading = toTemplate(page.hero?.heading || page.title || `${service} in {Location}, Bangalore`);
  const metaTitleTpl = toTemplate(page.metaTitle || `${service} in {Location}, Bangalore | Shrusara Fashion Boutique`);
  const metaDescTpl = toTemplate(page.metaDescription || `Customized ${service} in {Location}, Bangalore.`);

  let keywordsTpl = [];
  if (Array.isArray(page.metaKeywords)) {
    keywordsTpl = page.metaKeywords.map(toTemplate);
  } else if (typeof page.metaKeywords === 'string' && page.metaKeywords) {
    keywordsTpl = page.metaKeywords.split(',').map((k) => toTemplate(k.trim())).filter(Boolean);
  } else {
    keywordsTpl = [
      `${service.toLowerCase()} in {Location}`,
      `${service.toLowerCase()} bangalore`,
      `customized ${service.toLowerCase()}`,
      `best ${service.toLowerCase()} near {Location}`,
      'shrusara fashion boutique'
    ];
  }

  return {
    id: sId,
    serviceCategory: service,
    serviceName: service,
    serviceSlug: sId,
    heroImage: page.featuredImage?.url || page.heroImage || '',
    featuredImage: {
      url: page.featuredImage?.url || '',
      alt: toTemplate(page.featuredImage?.alt || `${service} in {Location}, Bangalore – Shrusara Fashion Boutique`),
      title: toTemplate(page.featuredImage?.title || `${service} in {Location}`),
      caption: toTemplate(page.featuredImage?.caption || `100% Customized ${service} tailored by Shrusara Fashion Boutique in Bangalore.`)
    },
    titleTemplate: heroHeading,
    seo: {
      titleTemplate: heroHeading,
      metaTitleTemplate: metaTitleTpl,
      metaDescriptionTemplate: metaDescTpl,
      metaKeywords: keywordsTpl,
      canonicalUrlPattern: `/bangalore/${sId}-stitching-{location}`
    },
    hero: {
      badgeTemplate: toTemplate(page.hero?.badge || `100% Customized | {Location}, Bangalore`),
      headingTemplate: heroHeading,
      taglineTemplate: toTemplate(page.hero?.tagline || `Bespoke ${service.toLowerCase()} tailored for clients in {Location}, Bangalore.`),
      highlights: (page.hero?.highlights || []).map(toTemplate),
      primaryCtaText: page.hero?.primaryCtaText || 'Chat on WhatsApp',
      primaryCtaMessageTemplate: toTemplate(page.hero?.primaryCtaMessage || `Hi Shrusara! I'd like to know more about ${service} in {Location}.`),
      secondaryCtaText: page.hero?.secondaryCtaText || 'Call Shrusara Boutique',
      secondaryCtaLink: page.hero?.secondaryCtaLink || '#contact'
    },
    about: {
      headingTemplate: toTemplate(page.about?.heading || `Customized ${service} in {Location}`),
      introTemplate: toTemplate(page.about?.intro || ''),
      descriptionTemplate: toTemplate(page.about?.description || ''),
      highlights: (page.about?.highlights || []).map((h) => ({
        title: toTemplate(h.title),
        description: toTemplate(h.description)
      }))
    },
    whyChooseUs: {
      headingTemplate: toTemplate(page.whyChooseUs?.heading || `Why Clients in {Location} Choose Shrusara for ${service}`),
      introTemplate: toTemplate(page.whyChooseUs?.intro || ''),
      descriptionTemplate: toTemplate(page.whyChooseUs?.description || ''),
      cards: (page.whyChooseUs?.cards || []).map((c) => ({
        title: toTemplate(c.title),
        description: toTemplate(c.description)
      }))
    },
    processSteps: (page.processSteps || []).map((s) => ({
      stepNumber: s.stepNumber,
      title: toTemplate(s.title),
      description: toTemplate(s.description),
      duration: toTemplate(s.duration)
    })),
    gallery: (page.gallery || []).map((g) => ({
      url: g.url,
      title: toTemplate(g.title || `${service} in {Location}`),
      alt: toTemplate(g.alt || `${service} in {Location}, Bangalore – Shrusara Fashion Boutique`),
      caption: toTemplate(g.caption || '')
    })),
    testimonials: (page.testimonials || []).map((t) => ({
      name: t.name,
      location: toTemplate(t.location || `{Location}, Bangalore`),
      rating: t.rating || 5,
      outfitType: t.outfitType || service,
      reviewText: toTemplate(t.reviewText)
    })),
    faqs: (page.faqs || []).map((f) => ({
      question: toTemplate(f.question),
      answer: toTemplate(f.answer)
    })),
    cta: {
      headingTemplate: toTemplate(page.cta?.heading || `Customized ${service} Near {Location}, Bangalore`),
      subheadingTemplate: toTemplate(page.cta?.subheading || `Book your consultation with Chief Designer Shruthi Ajith today.`),
      whatsappText: page.cta?.whatsappText || 'Chat on WhatsApp',
      callText: page.cta?.callText || 'Call Shrusara Boutique'
    },
    updatedAt: new Date().toISOString()
  };
}

export function slugifyBangalorePage(serviceCategory = 'Bridal Blouse', locationName = 'Bangalore') {
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

export function deepReplacePlaceholders(obj, replacements) {
  if (typeof obj === 'string') {
    let result = obj;
    for (const [pattern, value] of replacements) {
      result = result.replace(pattern, value);
    }
    return result;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepReplacePlaceholders(item, replacements));
  }
  if (obj !== null && typeof obj === 'object') {
    const out = {};
    for (const key of Object.keys(obj)) {
      out[key] = deepReplacePlaceholders(obj[key], replacements);
    }
    return out;
  }
  return obj;
}

export function hydrateLandingPageFromMasterTemplate(rawMaster = {}, locationName = 'Bangalore', options = {}) {
  const normService = normalizeServiceCategory(
    options.serviceCategory || rawMaster?.serviceCategory || rawMaster?.serviceName || 'Bridal Blouse'
  );
  const loc = String(locationName || 'Bangalore').trim() || 'Bangalore';
  const locSlug = loc.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const serviceSlug = normService.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const replacements = [
    [/\{Location-slug\}/gi, locSlug],
    [/\{location-slug\}/gi, locSlug],
    [/\{Location\}/g, loc],
    [/\[Location\]/g, loc],
    [/\{location\}/g, loc.toLowerCase()],
    [/\{Service-slug\}/gi, serviceSlug],
    [/\{service-slug\}/gi, serviceSlug],
    [/\{Service\}/g, normService],
    [/\[Service\]/g, normService],
    [/\{service\}/g, normService.toLowerCase()]
  ];

  // Deep clone master and replace all placeholders in every string/array/object
  const master = deepReplacePlaceholders(JSON.parse(JSON.stringify(rawMaster || {})), replacements);
  const locObj = options.locationObj || options.locationData || {};
  const foundPreset = BANGALORE_LOCATIONS_PRESET.find((l) => l.name.toLowerCase() === loc.toLowerCase());

  const locPreset = {
    name: loc,
    areaGroup: locObj.areaGroup || options.areaGroup || foundPreset?.areaGroup || 'Bangalore West',
    distanceNote: locObj.distanceNote || foundPreset?.distanceNote || `Easily accessible from ${loc}. Doorstep Porter & express courier delivery available across Bangalore.`,
    landmark: locObj.landmark || foundPreset?.landmark || 'Near Mahalakshmi Metro Station / 1st Block Rajajinagar',
    travelTime: locObj.travelTime || foundPreset?.travelTime || '10-15 mins',
    nearbyAreas: (locObj.nearbyAreas?.length ? locObj.nearbyAreas : null) || foundPreset?.nearbyAreas || ['Rajajinagar', 'Malleshwaram', 'Basaveshwaranagar', 'Vijayanagar']
  };

  const overrides = options.overrides || {};
  const targetSlug = overrides.slug || options.slug || slugifyBangalorePage(normService, loc);
  const url = `${BANGALORE_BASE_PATH}/${targetSlug}`;

  // 1. Technical SEO & Metadata
  const mainTitle = overrides.title || overrides.hero?.heading || master.hero?.headingTemplate || master.seo?.metaTitleTemplate || master.seo?.titleTemplate || master.titleTemplate || master.hero?.heading || `${normService} in ${loc}, Bangalore`;
  const metaTitle = overrides.metaTitle || master.seo?.metaTitleTemplate || master.seo?.titleTemplate || `${normService} in ${loc}, Bangalore | Shrusara Fashion Boutique`;
  const metaDescription = overrides.metaDescription || master.seo?.metaDescriptionTemplate || `Customized ${normService} in ${loc}, Bangalore with perfect fit and personalized consultation by Shrusara.`;

  let metaKeywords = [];
  if (Array.isArray(overrides.metaKeywords) && overrides.metaKeywords.length) {
    metaKeywords = overrides.metaKeywords;
  } else if (typeof overrides.metaKeywords === 'string' && overrides.metaKeywords) {
    metaKeywords = overrides.metaKeywords.split(',').map((k) => k.trim()).filter(Boolean);
  } else if (Array.isArray(master.seo?.metaKeywords) && master.seo.metaKeywords.length) {
    metaKeywords = master.seo.metaKeywords;
  } else if (typeof master.seo?.metaKeywords === 'string' && master.seo.metaKeywords) {
    metaKeywords = master.seo.metaKeywords.split(',').map((k) => k.trim()).filter(Boolean);
  } else if (typeof master.seo?.metaKeywordsTemplate === 'string' && master.seo.metaKeywordsTemplate) {
    metaKeywords = master.seo.metaKeywordsTemplate.split(',').map((k) => k.trim()).filter(Boolean);
  } else {
    metaKeywords = [
      `${normService.toLowerCase()} in ${loc.toLowerCase()}`,
      `${normService.toLowerCase()} bangalore`,
      `customized ${normService.toLowerCase()}`,
      `best ${normService.toLowerCase()} near ${loc.toLowerCase()}`,
      'shrusara fashion boutique'
    ];
  }

  // 2. Hero Section
  const heroBadge = overrides.hero?.badge || master.hero?.badgeTemplate || master.hero?.badge || `100% Customized | ${loc}, Bangalore`;
  const heroHeading = overrides.hero?.heading || overrides.title || master.hero?.headingTemplate || master.hero?.heading || mainTitle;
  const heroTagline = overrides.hero?.tagline || master.hero?.taglineTemplate || master.hero?.tagline || `Bespoke ${normService} tailored for clients in ${loc}, Bangalore.`;
  const heroHighlights = overrides.hero?.highlights?.length ? overrides.hero.highlights : (master.hero?.highlights?.length ? master.hero.highlights : [
    '1-on-1 Consultation with Chief Designer Shruthi Ajith',
    'Personalized Measurements & Trial Fitting',
    'Try Before You Customize (Boutique Exclusive)',
    'Video Consultation Available Across Bangalore',
    'Pickup & Courier Delivery Across Bangalore',
    'Comfortable Customized Stitching'
  ]);
  const heroPrimaryCtaText = overrides.hero?.primaryCtaText || master.hero?.primaryCtaText || 'Chat on WhatsApp';
  const heroPrimaryCtaMessage = overrides.hero?.primaryCtaMessage || master.hero?.primaryCtaMessageTemplate || master.hero?.primaryCtaMessage || `Hi Shrusara! I'd like to know more about ${normService} in ${loc}.`;
  const heroSecondaryCtaText = overrides.hero?.secondaryCtaText || master.hero?.secondaryCtaText || 'Call Shrusara Boutique';
  const heroSecondaryCtaLink = overrides.hero?.secondaryCtaLink || master.hero?.secondaryCtaLink || '#contact';

  const featuredImage = overrides.featuredImage?.url ? overrides.featuredImage : {
    url: master.featuredImage?.url || master.heroImage || '/bridal/bridalblow/hero-bridal.webp',
    alt: master.featuredImage?.alt || `${normService} in ${loc}, Bangalore – Shrusara Fashion Boutique`,
    title: master.featuredImage?.title || `${normService} in ${loc}`,
    caption: master.featuredImage?.caption || `100% Customized ${normService} tailored by Shrusara Fashion Boutique in Bangalore.`
  };

  // 3. About & Features
  const aboutHeading = overrides.about?.heading || master.about?.headingTemplate || master.about?.heading || `Customized ${normService} in ${loc}`;
  const aboutIntro = overrides.about?.intro || master.about?.introTemplate || master.about?.intro || '';
  const aboutDescription = overrides.about?.description || master.about?.descriptionTemplate || master.about?.description || aboutIntro || `At Shrusara Fashion Boutique, we specialize exclusively in bespoke ${normService}. Every single piece is tailored uniquely to your body contours, measurements, and personal style.`;
  const aboutHighlights = overrides.about?.highlights?.length ? overrides.about.highlights : (master.about?.highlights?.length ? master.about.highlights : [
    { title: 'Personalized Fitting', description: `Tailored precisely to your exact measurements for clients in ${loc}.` },
    { title: 'Premium Craftsmanship', description: 'Handcrafted by master artisans with high-grade interlinings and finished seams.' },
    { title: 'Try Before You Customize', description: 'Visit our Mahalakshmipuram studio to inspect samples firsthand.' }
  ]);

  // 4. Why Choose Us
  const whyHeading = overrides.whyChooseUs?.heading || master.whyChooseUs?.headingTemplate || master.whyChooseUs?.heading || `Why Clients in ${loc} Choose Shrusara for ${normService}`;
  const whyIntro = overrides.whyChooseUs?.intro || master.whyChooseUs?.introTemplate || master.whyChooseUs?.intro || master.whyChooseUs?.descriptionTemplate || master.whyChooseUs?.description || '';
  const whyDescription = overrides.whyChooseUs?.description || master.whyChooseUs?.descriptionTemplate || master.whyChooseUs?.description || whyIntro || `Located in Mahalakshmipuram, Shrusara Fashion Boutique is easily accessible from ${loc}.`;
  const whyCards = overrides.whyChooseUs?.cards?.length ? overrides.whyChooseUs.cards : (master.whyChooseUs?.cards?.length ? master.whyChooseUs.cards : [
    { title: '1-on-1 Design Consultation', description: 'Work directly with Chief Designer Shruthi Ajith throughout your consultation and trial.' },
    { title: 'Stress-Free Timelines', description: 'Guaranteed delivery dates planned well ahead of your special occasions.' },
    { title: 'Doorstep Courier & Porter', description: `Reliable pickup and drop-off available directly to your home in ${loc}.` }
  ]);

  // 5. 5-Step Process
  const processSteps = overrides.processSteps?.length ? overrides.processSteps : (master.processSteps?.length ? master.processSteps : [
    { stepNumber: 1, title: 'Design Consultation & Fabric Selection', description: 'Discuss your outfit style, necklines, sleeves, and fabric requirements.', duration: 'Day 1' },
    { stepNumber: 2, title: 'Measurements & Silhouette Planning', description: 'Precision measurements taken with posture evaluation and trial fit checks.', duration: 'Day 1-2' },
    { stepNumber: 3, title: 'Master Cutting & Artisan Crafting', description: 'Hand-cut by master cutters and crafted with premium reinforcements.', duration: 'Day 3-5' },
    { stepNumber: 4, title: 'Trial Fitting & Comfort Check', description: 'Try on the outfit to verify posture, seam comfort, and armhole fit.', duration: 'Day 5-6' },
    { stepNumber: 5, title: `Steam Finishing & Handover to ${loc}`, description: 'Final quality inspection, steam press, and boutique pickup or courier delivery.', duration: 'Final Delivery' }
  ]);

  // 6. Curated Gallery
  const gallery = overrides.gallery?.length ? overrides.gallery : (master.gallery?.length ? master.gallery : [
    { url: '/bridal/bridalblow/hero-bridal.webp', title: `${normService} Showcase`, alt: `${normService} in ${loc}, Bangalore – Shrusara Fashion Boutique`, caption: 'Mastercrafted finishing' },
    { url: '/bridal/bridalblow/IMG-20220609-WA0069.webp', title: `${normService} Silhouette`, alt: `${normService} design in ${loc}, Bangalore`, caption: 'Exquisite attention to detail' }
  ]);

  // 7. Location & Maps (Proximity)
  const proximity = {
    locationName: loc,
    areaGroup: locPreset.areaGroup,
    boutiqueAddress: overrides.proximity?.boutiqueAddress || master.proximity?.boutiqueAddress || BOUTIQUE_ADDRESS,
    landmark: overrides.proximity?.landmark || master.proximity?.landmark || master.proximity?.defaultLandmark || locPreset.landmark,
    travelTime: overrides.proximity?.travelTime || master.proximity?.travelTime || master.proximity?.defaultTravelTime || locPreset.travelTime,
    distanceNote: overrides.proximity?.distanceNote || master.proximity?.distanceNote || master.proximity?.defaultDistanceNote || locPreset.distanceNote,
    nearbyAreas: overrides.proximity?.nearbyAreas?.length ? overrides.proximity.nearbyAreas : (master.proximity?.nearbyAreas?.length ? master.proximity.nearbyAreas : locPreset.nearbyAreas),
    workingHours: overrides.proximity?.workingHours || master.proximity?.workingHours || 'Monday - Sunday: 10:30 AM - 8:30 PM (By Appointment & Walk-in)',
    googleMapsUrl: overrides.proximity?.googleMapsUrl || master.proximity?.googleMapsUrl || 'https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore',
    boutiqueVisitOptions: overrides.proximity?.boutiqueVisitOptions?.length ? overrides.proximity.boutiqueVisitOptions : (master.proximity?.boutiqueVisitOptions?.length ? master.proximity.boutiqueVisitOptions : [
      { title: 'Walk-ins Welcome', description: 'Feel free to visit our Mahalakshmipuram boutique anytime during boutique hours.' },
      { title: 'Bridal Appointments Recommended', description: 'Schedule a dedicated 1-on-1 slot with Chief Designer Shruthi Ajith.' },
      { title: 'Video Consultation Available', description: `Virtual design sessions for clients in ${loc} unable to visit in person.` },
      { title: 'Pickup & Courier Available Across Bangalore', description: `Reliable Porter fabric pickup and doorstep delivery across ${loc}.` }
    ])
  };

  // 8. Testimonials
  const testimonials = overrides.testimonials?.length ? overrides.testimonials : (master.testimonials?.length ? master.testimonials : [
    { name: 'Pooja K.', location: `${loc}, Bangalore`, rating: 5, outfitType: normService, reviewText: `Shrusara exceeded all my expectations for ${normService}. The fit was absolutely flawless and Shruthi ma'am understood my style instantly. Highly recommended for everyone in ${loc}!` },
    { name: 'Divya M.', location: `${loc}, Bangalore`, rating: 5, outfitType: normService, reviewText: `The attention to detail and trial session made all the difference. Delivered right on schedule to my home in ${loc}.` }
  ]);

  // 9. Localized FAQs
  const faqs = overrides.faqs?.length ? overrides.faqs : (master.faqs?.length ? master.faqs : [
    { question: `Can I get customized ${normService} in ${loc}?`, answer: `Yes! Shrusara Fashion Boutique caters to clients across ${loc}, Bangalore. You can visit our Mahalakshmipuram studio (conveniently connected) or book a virtual video consultation with doorstep courier pickup and delivery.` },
    { question: `How long does customized ${normService} take?`, answer: `Standard crafting takes approximately 5 to 7 days, including design consultation and trial fitting. For emergency wedding dates or immediate events in ${loc}, priority express slots are also accommodated.` },
    { question: `Do you provide home pickup and delivery in ${loc}?`, answer: `Yes, we arrange reliable door-to-door Porter fabric pickup and courier delivery across all localities in ${loc}, Bangalore.` }
  ]);

  // 10. Bottom CTA
  const cta = {
    heading: overrides.cta?.heading || master.cta?.headingTemplate || master.cta?.heading || `Customized ${normService} Near ${loc}, Bangalore`,
    subheading: overrides.cta?.subheading || master.cta?.subheadingTemplate || master.cta?.subheading || `Book your consultation with Chief Designer Shruthi Ajith today. Experience bespoke luxury in Bangalore.`,
    whatsappText: overrides.cta?.whatsappText || master.cta?.whatsappText || 'Chat on WhatsApp',
    callText: overrides.cta?.callText || master.cta?.callText || 'Call Shrusara Boutique'
  };

  return {
    ...overrides,
    title: mainTitle,
    slug: targetSlug,
    url,
    canonicalUrl: `${DEFAULT_SITE_URL}${url}`,
    serviceCategory: normService,
    locationName: loc,
    areaGroup: locPreset.areaGroup,
    status: overrides.status || options.status || 'draft',
    metaTitle,
    metaDescription,
    metaKeywords,
    featuredImage,
    hero: {
      badge: heroBadge,
      heading: heroHeading,
      tagline: heroTagline,
      highlights: heroHighlights,
      primaryCtaText: heroPrimaryCtaText,
      primaryCtaMessage: heroPrimaryCtaMessage,
      secondaryCtaText: heroSecondaryCtaText,
      secondaryCtaLink: heroSecondaryCtaLink,
      badgeTemplate: heroBadge,
      headingTemplate: heroHeading,
      taglineTemplate: heroTagline,
      primaryCtaMessageTemplate: heroPrimaryCtaMessage
    },
    about: {
      heading: aboutHeading,
      intro: aboutIntro,
      description: aboutDescription,
      highlights: aboutHighlights,
      headingTemplate: aboutHeading,
      introTemplate: aboutIntro,
      descriptionTemplate: aboutDescription
    },
    whyChooseUs: {
      heading: whyHeading,
      intro: whyIntro,
      description: whyDescription,
      cards: whyCards,
      headingTemplate: whyHeading,
      introTemplate: whyIntro,
      descriptionTemplate: whyDescription
    },
    processSteps,
    gallery,
    proximity,
    testimonials,
    faqs,
    cta: {
      heading: cta.heading,
      subheading: cta.subheading,
      whatsappText: cta.whatsappText,
      callText: cta.callText,
      headingTemplate: cta.heading,
      subheadingTemplate: cta.subheading
    },
    updatedAt: new Date().toISOString()
  };
}

export function buildLandingPageFromMaster(serviceCategory = 'Bridal Blouse', locationName = 'Rajajinagar', overrides = {}) {
  const normService = normalizeServiceCategory(serviceCategory);

  let cachedMaster = null;
  if (!overrides.masterTemplate && typeof window !== 'undefined' && window.localStorage) {
    const sSlug = String(normService || serviceCategory).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const raw = window.localStorage.getItem(`shrusara_master_tpl_${sSlug}`) || window.localStorage.getItem(`shrusara_master_tpl_${normService}`);
    if (raw) {
      try { cachedMaster = JSON.parse(raw); } catch {}
    }
  }

  const master = overrides.masterTemplate || cachedMaster || MASTER_SERVICE_TEMPLATES[normService] || MASTER_SERVICE_TEMPLATES[serviceCategory] || MASTER_SERVICE_TEMPLATES['Bridal Blouse'] || MASTER_SERVICE_TEMPLATES['Ready-to-Wear Saree Customization'];
  return hydrateLandingPageFromMasterTemplate(master, locationName, {
    serviceCategory: normService,
    locationObj: overrides.locationObj || overrides.locationData,
    overrides
  });
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
