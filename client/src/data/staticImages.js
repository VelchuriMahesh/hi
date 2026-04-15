const modulesByCategory = {
  bridal: import.meta.glob('../assets/images/bridal/*.{svg,png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default'
  }),
  designer: import.meta.glob('../assets/images/designer/*.{svg,png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default'
  }),
  kids: import.meta.glob('../assets/images/kids/*.{svg,png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default'
  })
};

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
      ['Mini Celebration Look', 'A polished children’s outfit with light detailing and soft finishing.'],
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

function sortModules(modules) {
  return Object.entries(modules).sort(([left], [right]) => left.localeCompare(right));
}

function buildStaticCategoryImages(category) {
  const entries = sortModules(modulesByCategory[category] || {});
  const metadata = categoryDetails[category]?.titles || [];

  return entries.map(([path, url], index) => {
    const [title, description] = metadata[index] || [];
    const label = categoryDetails[category]?.label || category;

    return {
      id: `static-${category}-${index + 1}`,
      category,
      source: 'static',
      filePath: path,
      url,
      thumbUrl: url,
      title: title || `${label} ${index + 1}`,
      alt: title || `${label} design ${index + 1}`,
      description:
        description ||
        `A premium ${label.toLowerCase()} concept from the Shrusara static design collection.`
    };
  });
}

export const staticCategoryImages = {
  bridal: buildStaticCategoryImages('bridal'),
  designer: buildStaticCategoryImages('designer'),
  kids: buildStaticCategoryImages('kids')
};

export const categoryPreviewCards = Object.entries(categoryDetails).map(([category, detail]) => ({
  category,
  title: detail.label,
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
