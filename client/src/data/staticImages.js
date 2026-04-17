const categoryDetails = {
  bridal: {
    label: 'Bridal Blouse',
    route: '/bridal-blouse-designer-bangalore',
    titles: [
      ['Maggam Signature Blouse', 'Hand-finished bridal blouse with rich neckline detailing and tailored structure.'],
      ['Temple Gold Bridal Blouse', 'A bridal blouse direction that balances ornate work with clean blouse shaping.'],
      ['Reception Silk Blouse', 'A softer bridal silhouette designed for elegant evening styling and comfort.'],
      ['Classic Muhurtham Edit', 'Premium bridal finishing planned to complement saree borders and jewellery.'],
      ['Heritage Zardosi Detail', 'Traditional embroidery inspiration translated into a modern boutique finish.'],
      ['Aari Sleeve Accent', 'Fine sleeve work with measured detail for close-up bridal photography.'],
      ['Statement Back Neck', 'A bridal blouse concept created to stand out in ceremony and portrait moments.'],
      ['Gold Thread Finish', 'A celebratory bridal option with balanced embellishment and polished tailoring.'],
      ['Wedding Day Fit Study', 'A made-to-measure bridal silhouette shaped around comfort and event movement.'],
      ['Shrusara Bridal Signature', 'A couture-inspired bridal direction focused on finishing, fit, and elegance.']
    ]
  },
  designer: {
    label: 'Designer Outfits',
    route: '/designer-outfits-bangalore',
    titles: [
      ['Evening Gown Edit', 'A clean occasionwear silhouette with premium structure and fluid fall.'],
      ['Indo-Western Drape', 'A boutique fusion look that feels polished, festive, and modern.'],
      ['Reception Statement Dress', 'A premium designer outfit with elevated tailoring for celebration dressing.'],
      ['Partywear Profile', 'A contemporary partywear direction designed for easy movement and strong presence.'],
      ['Minimal Couture Line', 'A modern designer look with refined volume, drape, and finish.'],
      ['Event Ready Structure', 'A tailored occasionwear style with boutique detail and confident fit.'],
      ['Fusion Festive Mood', 'A dressed-up Indo-western concept for sangeet, mehendi, and festive evenings.'],
      ['Cocktail Elegance', 'A sleek designer silhouette that feels understated, premium, and current.'],
      ['Black-Tie Boutique Look', 'A dressy celebration outfit with clean lines and premium finishing.'],
      ['Shrusara Premium Edit', 'A designer outfit concept curated for upscale parties and receptions.']
    ]
  },
  kids: {
    label: 'Kids Outfits',
    route: '/kids-outfits-bangalore',
    titles: [
      ['Festive Comfort Set', 'A kids outfit designed for celebration days with movement-first tailoring.'],
      ['Ready Festive Favorite', 'A practical boutique style that still feels premium and occasion-ready.'],
      ['Mini Celebration Look', 'A polished children\u2019s outfit with light detailing and soft finishing.'],
      ['Soft Tailoring Studio', 'A comfortable festive kids design with boutique-level stitching quality.'],
      ['Family Coordination Pick', 'A kids look that can be color-matched to bridal and family outfits.'],
      ['Festive Twirl Edit', 'A playful silhouette created for memorable photos and all-day comfort.'],
      ['Premium Playwear Occasion Set', 'A child-friendly festive outfit with balanced structure and softness.'],
      ['Custom Occasion Outfit', 'A boutique-made kids style planned around age, comfort, and occasion.'],
      ['Mini Festive Classic', 'A refined boutique option for family functions and celebration moments.'],
      ['Shrusara Kids Favorite', 'A premium-ready kids outfit with a clean boutique finish.']
    ]
  }
};

const bridalImages = [
  {
    id: 'static-bridal-1',
    category: 'bridal',
    url: '/bridal/bridalblow/custom-fit-muhurtham-silk-saree-blouse-bangalore.webp',
    thumbUrl: '/bridal/bridalblow/custom-fit-muhurtham-silk-saree-blouse-bangalore.webp',
    title: 'Custom Fit Muhurtham Silk Saree Blouse',
    alt: 'Custom fit muhurtham silk saree blouse Bangalore',
    description: 'A bridal blouse designed with perfect fit and premium finishing for wedding wear.'
  },
  {
    id: 'static-bridal-2',
    category: 'bridal',
    url: '/bridal/bridalblow/designer-bridal-blouse-back-neck-pattern-shrusara.webp',
    thumbUrl: '/bridal/bridalblow/designer-bridal-blouse-back-neck-pattern-shrusara.webp',
    title: 'Designer Bridal Blouse Back Neck Pattern',
    alt: 'Designer bridal blouse back neck pattern Shrusara',
    description: 'A statement back-neck bridal blouse with handcrafted detailing and premium fit.'
  },
  {
    id: 'static-bridal-3',
    category: 'bridal',
    url: '/bridal/bridalblow/handcrafted-aari-work-wedding-blouse-shrusara-bangalore-boutique.webp',
    thumbUrl: '/bridal/bridalblow/handcrafted-aari-work-wedding-blouse-shrusara-bangalore-boutique.webp',
    title: 'Handcrafted Aari Work Wedding Blouse',
    alt: 'Handcrafted Aari work wedding blouse Shrusara boutique',
    description: 'Intricate aari embroidery for a luxurious bridal blouse finish.'
  },
  {
    id: 'static-bridal-4',
    category: 'bridal',
    url: '/bridal/bridalblow/intricate-hand-embroidery-maggam-aari-bridal-wear-mahalakshmipuram.webp',
    thumbUrl: '/bridal/bridalblow/intricate-hand-embroidery-maggam-aari-bridal-wear-mahalakshmipuram.webp',
    title: 'Intricate Maggam Aari Bridal Wear',
    alt: 'Intricate hand embroidery maggam aari bridal wear Mahalakshmipuram',
    description: 'A premium bridal piece combining maggam and aari work for ceremony wear.'
  },
  {
    id: 'static-bridal-5',
    category: 'bridal',
    url: '/bridal/bridalblow/premium-antique-gold-temple-work-bridal-blouse-shrusara-bangalore.webp',
    thumbUrl: '/bridal/bridalblow/premium-antique-gold-temple-work-bridal-blouse-shrusara-bangalore.webp',
    title: 'Premium Antique Gold Temple Work Blouse',
    alt: 'Premium antique gold temple work bridal blouse Bangalore',
    description: 'A refined bridal blouse with rich temple motif maggam work.'
  },
  {
    id: 'static-bridal-6',
    category: 'bridal',
    url: '/bridal/bridalblow/premium-maggam-work-bridal-blouse-mahalakshmipuram-shrusara.webp',
    thumbUrl: '/bridal/bridalblow/premium-maggam-work-bridal-blouse-mahalakshmipuram-shrusara.webp',
    title: 'Premium Maggam Work Bridal Blouse',
    alt: 'Premium maggam work bridal blouse Mahalakshmipuram Shrusara',
    description: 'A rich maggam-work bridal blouse for beautifully detailed wedding wear.'
  },
  {
    id: 'static-bridal-7',
    category: 'bridal',
    url: '/bridal/bridalblow/royal-heritage-style-bridal-maggam-blouse-bangalore.webp',
    thumbUrl: '/bridal/bridalblow/royal-heritage-style-bridal-maggam-blouse-bangalore.webp',
    title: 'Royal Heritage Style Bridal Maggam Blouse',
    alt: 'Royal heritage style bridal maggam blouse Bangalore',
    description: 'A heritage-inspired bridal blouse with royal maggam embroidery.'
  },
  {
    id: 'static-bridal-8',
    category: 'bridal',
    url: '/bridal/bridalblow/traditional-south-indian-wedding-blouse-gold-zari-work-designed-shrusara-boutique.webp',
    thumbUrl: '/bridal/bridalblow/traditional-south-indian-wedding-blouse-gold-zari-work-designed-shrusara-boutique.webp',
    title: 'Traditional South Indian Wedding Blouse',
    alt: 'Traditional south Indian wedding blouse gold zari work Shrusara boutique',
    description: 'A classic South Indian bridal blouse with gold zari work and rich finish.'
  },
  {
    id: 'static-bridal-9',
    category: 'bridal',
    url: '/bridal/Lehenga/luxury-bridal-lehenga-custom-design-bangalore.webp',
    thumbUrl: '/bridal/Lehenga/luxury-bridal-lehenga-custom-design-bangalore.webp',
    title: 'Luxury Bridal Lehenga Custom Design',
    alt: 'Luxury bridal lehenga custom design Bangalore',
    description: 'A premium bridal lehenga with custom finishing and luxurious embroidery.'
  },
  {
    id: 'static-bridal-10',
    category: 'bridal',
    url: '/bridal/Lehenga/custom-made-bridal-muhurtham-lehenga-shrusara.webp',
    thumbUrl: '/bridal/Lehenga/custom-made-bridal-muhurtham-lehenga-shrusara.webp',
    title: 'Custom Muhurtham Bridal Lehenga',
    alt: 'Custom made bridal muhurtham lehenga Shrusara',
    description: 'A custom bridal lehenga tailored for muhurtham and wedding celebration.'
  },
  {
    id: 'static-bridal-11',
    category: 'bridal',
    url: '/bridal/Gown/elegant-modern-reception-gown-brides-featuring-silhouette-premium-fabric.webp',
    thumbUrl: '/bridal/Gown/elegant-modern-reception-gown-brides-featuring-silhouette-premium-fabric.webp',
    title: 'Elegant Reception Gown',
    alt: 'Elegant modern reception gown brides silhouette premium fabric',
    description: 'A reception gown crafted with premium fabric and refined silhouette detail.'
  }
];

const designerImages = [
  {
    id: 'static-designer-1',
    category: 'designer',
    url: '/designer/designer gown/elegant-designer-evening-gown-for-shruthi-ajith-bangalore.webp',
    thumbUrl: '/designer/designer gown/elegant-designer-evening-gown-for-shruthi-ajith-bangalore.webp',
    title: 'Elegant Designer Evening Gown',
    alt: 'Elegant designer evening gown for Shruthi Ajith Bangalore',
    description: 'A premium designer evening gown with refined tailoring and a luxe finish.'
  },
  {
    id: 'static-designer-2',
    category: 'designer',
    url: '/designer/designer gown/modern-gown-bridal-reception-premium-finishing-Shrusara-banaglore.webp',
    thumbUrl: '/designer/designer gown/modern-gown-bridal-reception-premium-finishing-Shrusara-banaglore.webp',
    title: 'Modern Bridal Reception Gown',
    alt: 'Modern bridal reception gown with premium finishing Shrusara Bangalore',
    description: 'A reception gown designed for modern bridal celebrations with premium finish.'
  },
  {
    id: 'static-designer-3',
    category: 'designer',
    url: '/designer/designer gown/modern-gown-maternity-photoshoot-premium-finishing-shrusara-banaglore.webp',
    thumbUrl: '/designer/designer gown/modern-gown-maternity-photoshoot-premium-finishing-shrusara-banaglore.webp',
    title: 'Maternity Photoshoot Gown',
    alt: 'Modern maternity photoshoot gown with premium finishing Shrusara Bangalore',
    description: 'A premium maternity gown designed for elegant photoshoot styling and comfort.'
  },
  {
    id: 'static-designer-4',
    category: 'designer',
    url: '/designer/designer gown/premium-designer-ball-gown-for-engagement-bangalore.webp',
    thumbUrl: '/designer/designer gown/premium-designer-ball-gown-for-engagement-bangalore.webp',
    title: 'Premium Designer Ball Gown',
    alt: 'Premium designer ball gown for engagement in Bangalore',
    description: 'A gala-ready ball gown tailored for engagement celebrations and premium styling.'
  },
  {
    id: 'static-designer-5',
    category: 'designer',
    url: '/designer/designer gown/reception-gown-for-brides-shrusara-fashion-boutique.webp',
    thumbUrl: '/designer/designer gown/reception-gown-for-brides-shrusara-fashion-boutique.webp',
    title: 'Reception Gown for Brides',
    alt: 'Reception gown for brides by Shrusara fashion boutique',
    description: 'A bridal reception gown with premium structure and seamless finishing touches.'
  },
  {
    id: 'static-designer-6',
    category: 'designer',
    url: '/designer/Indowestern/contemporary-modren-bridal-trousseau-outfit-shruthi-ajith.webp',
    thumbUrl: '/designer/Indowestern/contemporary-modren-bridal-trousseau-outfit-shruthi-ajith.webp',
    title: 'Contemporary Bridal Trousseau Outfit',
    alt: 'Contemporary modern bridal trousseau outfit by Shruthi Ajith',
    description: 'A contemporary indo-western look crafted for bridal trousseau styling.'
  },
  {
    id: 'static-designer-7',
    category: 'designer',
    url: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp',
    thumbUrl: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp',
    title: 'Indo Western Fusion Wear',
    alt: 'Indo western fusion bridal wear Bangalore Shrusara',
    description: 'A fusion outfit combining bridal elegance with modern design lines.'
  },
  {
    id: 'static-designer-8',
    category: 'designer',
    url: '/designer/Partwearset/custom-photoshoot-red-gown-reception-wear-bangalore.webp',
    thumbUrl: '/designer/Partwearset/custom-photoshoot-red-gown-reception-wear-bangalore.webp',
    title: 'Custom Photoshoot Red Gown',
    alt: 'Custom photoshoot red gown reception wear Bangalore',
    description: 'A statement red gown built for photoshoots and reception styling.'
  },
  {
    id: 'static-designer-9',
    category: 'designer',
    url: '/designer/Partwearset/designer-blouse-saree-bangalore-shrusara.webp',
    thumbUrl: '/designer/Partwearset/designer-blouse-saree-bangalore-shrusara.webp',
    title: 'Designer Blouse Saree',
    alt: 'Designer blouse saree Bangalore by Shrusara',
    description: 'A ready-to-style designer blouse saree with premium craftsmanship.'
  },
  {
    id: 'static-designer-10',
    category: 'designer',
    url: '/designer/Partwearset/elegant-designer-evening-gown-for-shruthi-ajith-bangalore.webp',
    thumbUrl: '/designer/Partwearset/elegant-designer-evening-gown-for-shruthi-ajith-bangalore.webp',
    title: 'Elegant Evening Designer Gown',
    alt: 'Elegant evening designer gown for Shruthi Ajith Bangalore',
    description: 'An elegant party wear gown with minimal yet impactful embroidery.'
  },
  {
    id: 'static-designer-11',
    category: 'designer',
    url: '/designer/Partwearset/modern-tail-gown-reception-premium-finishing-shrusara-banaglore.webp',
    thumbUrl: '/designer/Partwearset/modern-tail-gown-reception-premium-finishing-shrusara-banaglore.webp',
    title: 'Modern Tail Gown',
    alt: 'Modern tail gown reception premium finishing Shrusara Bangalore',
    description: 'A modern tail gown perfect for party wear with polished finishing.'
  }
];

// ── Kids: intentionally empty until real photos are uploaded via admin panel ──
const kidsImages = [];

export const staticCategoryImages = {
  bridal: bridalImages,
  designer: designerImages,
  kids: kidsImages
};

export const categoryPreviewCards = Object.entries(categoryDetails).map(([category, detail]) => ({
  category,
  title: detail.title,
  description: `Explore ${detail.label.toLowerCase()} with a premium boutique presentation.`,
  to: detail.route,
  image: staticCategoryImages[category][0]?.url || ''
}));

export function getStaticGallery(category) {
  if (category === 'home') {
    return [
      ...staticCategoryImages.bridal.slice(0, 4).map((item) => ({
        ...item,
        id: `home-${item.id}`,
        section: 'home'
      })),
      ...staticCategoryImages.designer.slice(0, 3).map((item) => ({
        ...item,
        id: `home-${item.id}`,
        section: 'home'
      })),
      ...staticCategoryImages.kids.slice(0, 3).map((item) => ({
        ...item,
        id: `home-${item.id}`,
        section: 'home'
      }))
    ];
  }

  if (category === 'all') {
    return [
      ...staticCategoryImages.bridal,
      ...staticCategoryImages.designer,
      ...staticCategoryImages.kids
    ];
  }

  return staticCategoryImages[category] || [];
}

export function mergeGalleryImages(staticImages = [], firebaseImages = []) {
  const seen = new Set();

  // Show dynamic admin uploads first so they are visible in tight grid limits,
  // then fall back to static portfolio images.
  return [...firebaseImages, ...staticImages]
    .filter((item) => {
      const key = item.id?.startsWith('static-')
        ? item.id
        : item.url || item.thumbUrl || item.id || JSON.stringify(item);

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .map((item, index) => ({
      id: item.id || `image-${index + 1}`,
      title: item.title || item.alt || 'Boutique design',
      alt: item.alt || item.title || 'Boutique design',
      description:
        item.description ||
        item.alt ||
        'A premium boutique design with tailored fit and celebration-ready finishing.',
      thumbUrl: item.thumbUrl || item.url,
      ...item
    }));
}