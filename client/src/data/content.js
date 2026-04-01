const phoneRaw = (import.meta.env.VITE_PHONE_NUMBER || '919876543210').replace(/\D/g, '');
const whatsappRaw = (import.meta.env.VITE_WHATSAPP_NUMBER || phoneRaw).replace(/\D/g, '');
const phoneDisplay = import.meta.env.VITE_PHONE_DISPLAY || '+91 98765 43210';
const email = import.meta.env.VITE_CONTACT_EMAIL || 'hello@shrusarafashion.com';
const address =
  import.meta.env.VITE_BOUTIQUE_ADDRESS ||
  'Shrusara Fashion Boutique, Mahalakshmipuram, Bengaluru, Karnataka 560086';
const siteUrl = import.meta.env.VITE_SITE_URL || 'https://shrusarafashion.com';

export function buildDesignWhatsAppLink(designName = 'this design') {
  return `https://wa.me/${whatsappRaw}?text=${encodeURIComponent(`I want ${designName}`)}`;
}

export const contactLinks = {
  phoneRaw,
  phoneDisplay,
  email,
  address,
  siteUrl,
  whatsapp:
    `https://wa.me/${whatsappRaw}?text=` +
    encodeURIComponent('Hello I want to book a consultation'),
  call: `tel:+${phoneRaw}`,
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
};

export const heroContent = {
  home: {
    eyebrow: 'Bangalore Boutique',
    title: 'Bridal Blouse Designer & Designer Boutique in Bangalore',
    description:
      'Customized bridal blouses, lehengas, gowns and designer outfits tailored to your style, body type and occasion',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=80',
    videoUrl: '/videos/home-hero.mp4'
  },
  bridal: {
    eyebrow: 'Bridal Couture',
    title: 'Bridal Blouse Designer in Bangalore',
    description: 'Customized blouses with Maggam & Aari work',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80',
    videoUrl: '/videos/bridal-hero.mp4'
  },
  designer: {
    eyebrow: 'Designer Outfits',
    title: 'Designer gowns, Indo-western looks, and party wear',
    description:
      'Modern occasion wear with premium tailoring, boutique finishing, and silhouettes selected around your event.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=80',
    videoUrl: '/videos/designer-hero.mp4'
  },
  kids: {
    eyebrow: 'Kids Boutique',
    title: 'Kids outfits with comfort-first tailoring and festive charm',
    description:
      'Custom and ready boutique looks for celebrations, family functions, and coordinated event styling.',
    image:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1800&q=80',
    videoUrl: '/videos/kids-hero.mp4'
  },
  about: {
    eyebrow: 'About Us',
    title: 'A premium Bangalore boutique built around thoughtful customization',
    description: 'A boutique experience shaped around fit, detail, and occasion.',
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1800&q=80',
    videoUrl: '/videos/about-hero.mp4'
  }
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Bridal Blouse', to: '/bridal-blouse-designer-bangalore' },
  { label: 'Designer Outfits', to: '/designer-outfits-bangalore' },
  { label: 'Kids Outfits', to: '/kids-outfits-bangalore' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog', to: '/blog' }
];

export const homeServices = [
  {
    title: 'Bridal Blouse Designing',
    description: 'Made-to-measure silhouettes with neckline, sleeve, and back-neck concepts tailored to your bridal look.'
  },
  {
    title: 'Maggam & Aari Work',
    description: 'Intricate handcrafted embellishment, zardosi, and texture-led detailing for statement bridal pieces.'
  },
  {
    title: 'Lehenga & Gowns',
    description: 'Elegant occasion wear with balanced structure, movement, and a couture-inspired finish.'
  },
  {
    title: 'Designer Dresses',
    description: 'Contemporary dresses for engagements, receptions, cocktail evenings, and festive celebrations.'
  },
  {
    title: 'Indo-Western',
    description: 'Refined fusion outfits that pair Indian craft with modern cuts and effortless styling.'
  },
  {
    title: 'Kids Outfits',
    description: 'Coordinated outfits for little ones with comfort-first finishing and celebration-ready styling.'
  }
];

export const whyChooseUs = [
  'Customized fitting',
  'Maggam expertise',
  'Premium stitching',
  'Consultation',
  'On-time delivery'
];

export const bridalServices = [
  'Bridal blouse design consultation',
  'Maggam work and Aari embroidery',
  'Custom sleeve, neck, and back-neck concepts',
  'Reception, muhurtham, and engagement blouses',
  'Padded blouse finishing and lining support',
  'Lehenga blouse and saree styling guidance'
];

export const bridalProcess = [
  {
    title: '1. Consultation',
    description: 'We understand the function, saree, jewellery, and silhouette you want to highlight.'
  },
  {
    title: '2. Design Direction',
    description: 'Our team aligns embroidery placement, neckline details, and fit references before stitching starts.'
  },
  {
    title: '3. Trial & Finish',
    description: 'A focused fitting round helps us refine comfort, fall, and final detailing for the event day.'
  }
];

export const designerHighlights = [
  {
    title: 'Designer Gowns',
    description: 'Clean drapes, occasion-led colors, and elegant fit for reception and evening celebrations.'
  },
  {
    title: 'Indo-Western Sets',
    description: 'Modern styling with handcrafted detail for brunches, haldi, mehendi, and festive events.'
  },
  {
    title: 'Party Wear',
    description: 'Statement silhouettes designed to feel elevated, flattering, and easy to wear.'
  }
];

export const kidsHighlights = [
  {
    title: 'Custom Kids Outfits',
    description: 'Designed around comfort, movement, and occasion styling.'
  },
  {
    title: 'Ready-to-Pick Styles',
    description: 'Fast festive options with premium finishing and practical fits.'
  },
  {
    title: 'Family Coordination',
    description: 'Colors and details can be matched to bridal or family outfits.'
  }
];

export const aboutStory = {
  intro: 'A boutique experience shaped around fit, detail, and occasion.',
  short:
    'Shrusara Fashion Boutique is a trusted bridal & designer boutique in Mahalakshmipuram, Bangalore, focused on personalized fits, premium finishing, and occasion-ready designs.'
};

export const aboutServices = [
  'Bridal Blouse Designing',
  'Maggam & Aari Work',
  'Lehenga & Gowns',
  'Designer Dresses',
  'Indo-Western',
  'Kids Outfits'
];

export const aboutHighlights = [
  {
    title: 'Premium bridal finishing',
    description: 'Necklines, fall, and detailing designed to feel polished in person and in photos.'
  },
  {
    title: 'Made-to-measure silhouettes',
    description: 'Each fit is shaped around body type, comfort, and event styling.'
  },
  {
    title: 'Elegant consultation',
    description: 'Clear design direction without clutter, confusion, or overdesign.'
  },
  {
    title: 'Designs for every celebration',
    description: 'Bridal, designer, kids, and festive looks planned as a cohesive boutique wardrobe.'
  }
];

export const aboutStats = [
  { value: '500+', label: 'Custom fittings delivered' },
  { value: '4.9/5', label: 'Client-rated boutique experience' },
  { value: '48 hrs', label: 'Design consultation turnaround' }
];

export const fallbackReviews = {
  rating: 4.9,
  total: 127,
  source: 'fallback',
  reviews: [
    {
      authorName: 'Anusha R.',
      rating: 5,
      relativeTime: '2 weeks ago',
      text: 'The blouse fitting was perfect and the maggam work looked premium in person. The consultation made the whole bridal styling process easier.'
    },
    {
      authorName: 'Keerthana M.',
      rating: 5,
      relativeTime: '1 month ago',
      text: 'Loved the finishing, delivery commitment, and how well they understood the reference I showed. The outfit felt custom in the best way.'
    },
    {
      authorName: 'Pallavi S.',
      rating: 5,
      relativeTime: '1 month ago',
      text: 'The boutique helped with blouse and kids outfit coordination for our family event. Everything looked polished and fit beautifully.'
    },
    {
      authorName: 'Deepa N.',
      rating: 4,
      relativeTime: '2 months ago',
      text: 'Great stitching quality and patient consultation. I appreciated how they suggested practical design changes that improved the final look.'
    }
  ]
};

export const fallbackBlogPosts = [
  {
    id: 'bridal-blouse-neck-designs',
    title: 'How to Choose a Bridal Blouse Design That Photographs Beautifully',
    excerpt:
      'A quick guide to neckline balance, sleeve detail, embroidery placement, and fit choices that elevate bridal photos.',
    content:
      'Start with the saree border, jewellery scale, and the function timing. Rich borders and temple jewellery pair well with structured necklines and controlled embroidery. If the blouse is heavily embellished, keep sleeve and back detail focused instead of adding too many competing elements. The best bridal blouse looks luxurious because every detail feels intentional.',
    coverImage:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-03-18T08:00:00.000Z'
  },
  {
    id: 'designer-outfit-trials',
    title: 'What to Bring for Your Boutique Trial Appointment',
    excerpt:
      'The small things you bring to a trial can make fitting, styling, and finishing decisions much easier.',
    content:
      'Carry the footwear height you expect to use, blouse innerwear if relevant, and any key jewellery references. This helps decide garment length, sleeve fall, and embellishment density more accurately. A good trial is not only about pinning the garment, it is about seeing the full occasion look come together.',
    coverImage:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-03-12T08:00:00.000Z'
  }
];

export const fallbackGallery = {
  home: [
    {
      id: 'home-1',
      url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Elegant boutique bridal blouse design'
    },
    {
      id: 'home-2',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Designer outfit detail in a luxury boutique'
    },
    {
      id: 'home-3',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      alt: 'Premium bridal styling session'
    },
    {
      id: 'home-4',
      url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Boutique gown fitting'
    },
    {
      id: 'home-5',
      url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      alt: 'Designer lehenga and festive styling'
    },
    {
      id: 'home-6',
      url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80',
      alt: 'Boutique consultation for custom fitting'
    },
    {
      id: 'home-7',
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      alt: 'Fashion boutique evening wear'
    },
    {
      id: 'home-8',
      url: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=1200&q=80',
      alt: 'Luxury boutique dress detail'
    }
  ],
  bridal: [
    {
      id: 'bridal-1',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      alt: 'Bridal blouse designer Bangalore portfolio'
    },
    {
      id: 'bridal-2',
      url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Customized bridal blouse with rich detailing'
    },
    {
      id: 'bridal-3',
      url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=80',
      alt: 'Luxury bridal blouse silhouette'
    },
    {
      id: 'bridal-4',
      url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      alt: 'Bridal outfit with handcrafted finishing'
    },
    {
      id: 'bridal-5',
      url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Reception blouse styling inspiration'
    },
    {
      id: 'bridal-6',
      url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Bespoke bridal wear fitting'
    },
    {
      id: 'bridal-7',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Maggam work blouse design inspiration'
    },
    {
      id: 'bridal-8',
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      alt: 'Aari work bridal blouse finishing'
    }
  ],
  designer: [
    {
      id: 'designer-1',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Designer gown boutique Bangalore'
    },
    {
      id: 'designer-2',
      url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Premium evening gown design'
    },
    {
      id: 'designer-3',
      url: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern designer boutique silhouette'
    },
    {
      id: 'designer-4',
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      alt: 'Indo-western party outfit'
    },
    {
      id: 'designer-5',
      url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80',
      alt: 'Luxury designer dress in Bangalore boutique'
    },
    {
      id: 'designer-6',
      url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Party wear look with custom fitting'
    }
  ],
  kids: [
    {
      id: 'kids-1',
      url: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1200&q=80',
      alt: 'Kids boutique festive outfit'
    },
    {
      id: 'kids-2',
      url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=80',
      alt: 'Custom kids celebration wear'
    },
    {
      id: 'kids-3',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Boutique festive styling for children'
    },
    {
      id: 'kids-4',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      alt: 'Kids designer outfit with soft tailoring'
    },
    {
      id: 'kids-5',
      url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
      alt: 'Ready-to-wear boutique kids look'
    },
    {
      id: 'kids-6',
      url: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Premium boutique kids partywear'
    }
  ]
};

export const assistantReplies = {
  pricing:
    'Pricing depends on the design complexity, embroidery work, fabric, and timeline. Share your reference on WhatsApp for a faster estimate.',
  booking:
    'You can book by sending your occasion date, design idea, and preferred consultation slot on WhatsApp.',
  location:
    'Shrusara Fashion Boutique is in Mahalakshmipuram, Bengaluru. Use the map link or tap WhatsApp and we can share directions instantly.'
};
