import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { fetchLandingPageBySlug, trackLandingPageView } from '../services/api';
import {
  BANGALORE_BASE_PATH,
  BANGALORE_LOCATIONS_PRESET,
  BOUTIQUE_ADDRESS,
  BOUTIQUE_PHONE,
  BOUTIQUE_WHATSAPP,
  DEFAULT_SITE_URL,
  SERVICE_CATEGORIES,
  buildLandingPageFromMaster,
  parseAndBuildLandingPageFromSlug,
  generateLandingPageSchemas,
  generatePresetContent,
  slugifyBangalorePage
} from '../utils/bangaloreLandingPage';
import { trackPhoneCall, trackWhatsApp } from '../utils/tracking';

export default function BangaloreLandingPage() {
  const { slug } = useParams();

  // 1. Instantly parse local master page for target slug synchronously on EVERY render frame
  const localPage = useMemo(() => parseAndBuildLandingPageFromSlug(slug), [slug]);

  // 2. Track remote overrides & fetched status per slug
  const [remoteOverrides, setRemoteOverrides] = useState({});
  const [fetchedSlugs, setFetchedSlugs] = useState({});
  const [heroImageState, setHeroImageState] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // Open first FAQ by default
  const [selectedLightboxImage, setSelectedLightboxImage] = useState(null);

  const isRemoteLoading = Boolean(slug && !fetchedSlugs[slug]);

  useEffect(() => {
    let isMounted = true;

    if (slug && !fetchedSlugs[slug]) {
      async function loadRemotePage() {
        try {
          const res = await fetchLandingPageBySlug(slug, {
            onRevalidate: (freshItem) => {
              if (isMounted && freshItem) {
                setRemoteOverrides((prev) => ({
                  ...prev,
                  [slug]: freshItem
                }));
              }
            }
          });
          if (isMounted) {
            if (res?.item) {
              setRemoteOverrides((prev) => ({
                ...prev,
                [slug]: res.item
              }));
              if (res.item.id) {
                void trackLandingPageView(res.item.id);
              }
            }
            setFetchedSlugs((prev) => ({ ...prev, [slug]: true }));
          }
        } catch (err) {
          if (isMounted) {
            setFetchedSlugs((prev) => ({ ...prev, [slug]: true }));
          }
        }
      }

      loadRemotePage();
    }

    return () => {
      isMounted = false;
    };
  }, [slug, fetchedSlugs]);

  // Deep merge helper so admin overrides preserve all nested fields (hero, about, why, etc.)
  const page = useMemo(() => {
    if (!localPage) return null;
    const remote = remoteOverrides[slug];
    if (remote && (remote.slug === slug || remote.slug === localPage.slug)) {
      let activeFeaturedImage = localPage.featuredImage;

      const remoteUrl = remote.featuredImage?.url || remote.heroImage;
      if (remoteUrl) {
        activeFeaturedImage = typeof remote.featuredImage === 'object' && remote.featuredImage?.url
          ? remote.featuredImage
          : { ...localPage.featuredImage, url: remoteUrl };
      }

      return {
        ...localPage,
        ...remote,
        featuredImage: activeFeaturedImage || localPage.featuredImage,
        hero: {
          ...localPage.hero,
          ...remote.hero
        },
        about: {
          ...localPage.about,
          ...remote.about,
          highlights: (Array.isArray(remote.about?.highlights) && remote.about.highlights.length > 0)
            ? remote.about.highlights
            : localPage.about?.highlights
        },
        whyChooseUs: {
          ...localPage.whyChooseUs,
          ...remote.whyChooseUs,
          cards: (Array.isArray(remote.whyChooseUs?.cards) && remote.whyChooseUs.cards.length > 0)
            ? remote.whyChooseUs.cards
            : localPage.whyChooseUs?.cards
        },
        processSteps: (Array.isArray(remote.processSteps) && remote.processSteps.length > 0)
          ? remote.processSteps
          : localPage.processSteps,
        gallery: (Array.isArray(remote.gallery) && remote.gallery.length > 0)
          ? remote.gallery
          : localPage.gallery,
        testimonials: (Array.isArray(remote.testimonials) && remote.testimonials.length > 0)
          ? remote.testimonials
          : localPage.testimonials,
        faqs: (Array.isArray(remote.faqs) && remote.faqs.length > 0)
          ? remote.faqs
          : localPage.faqs,
        proximity: {
          ...localPage.proximity,
          ...remote.proximity
        },
        cta: {
          ...localPage.cta,
          ...remote.cta
        }
      };
    }
    return localPage;
  }, [localPage, remoteOverrides, slug]);

  const loading = !page;
  const error = null;

  const waNumber = BOUTIQUE_WHATSAPP;
  const phoneNumber = BOUTIQUE_PHONE;

  const defaultWaMessage = useMemo(() => {
    if (!page) return 'Hi Shrusara! I would like to know more about your customized bridal & designer wear services in Bangalore.';
    return (
      page.hero?.primaryCtaMessage ||
      `Hi Shrusara! I'd like to know more about ${page.serviceCategory || 'customization'} in ${page.locationName || 'Bangalore'}.`
    );
  }, [page]);

  const waLink = (message) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(message || defaultWaMessage)}`;

  const schemas = useMemo(() => {
    if (!page) return {};
    return generateLandingPageSchemas({ page, siteUrl: DEFAULT_SITE_URL });
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] text-ink pb-24 md:pb-0">
        {/* Top Announcement Bar Skeleton */}
        <div className="bg-[#2A1E17] px-4 py-2 text-center text-xs font-medium text-linen/95">
          <span>100% Customized Bridal & Designer Boutique in Bangalore • Video Consultation Available Across Bangalore</span>
        </div>

        {/* Header Skeleton */}
        <header className="sticky top-0 z-40 border-b border-ink/8 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-3 lg:px-8">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <img
                src="/videos/Revisedlogo.webp"
                alt="Shrusara Fashion Boutique Logo"
                className="h-10 w-auto object-contain sm:h-14"
              />
              <div>
                <span className="font-heading text-base font-bold tracking-wide text-ink sm:text-xl">
                  Shrusara
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-cocoa font-semibold sm:text-[10px] sm:tracking-[0.25em]">
                  Fashion Boutique
                </span>
              </div>
            </div>
            <div>
              <div className="h-9 w-36 animate-pulse rounded bg-stone-200" />
            </div>
          </div>
        </header>

        {/* Hero Section Skeleton */}
        <section className="relative overflow-hidden px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
              {/* Hero Image Skeleton */}
              <div className="lg:col-start-8 lg:col-span-5 lg:row-start-1">
                <div className="mx-auto max-w-md lg:max-w-none">
                  <div className="aspect-[4/5] w-full animate-pulse rounded-3xl bg-stone-200 border border-ink/10 shadow-xl" />
                </div>
              </div>
              {/* Hero Content Skeleton */}
              <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1 space-y-4">
                <div className="h-6 w-48 animate-pulse rounded bg-stone-200" />
                <div className="h-10 w-3/4 animate-pulse rounded bg-stone-200" />
                <div className="h-16 w-full animate-pulse rounded bg-stone-200" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-5/6 animate-pulse rounded bg-stone-200" />
                  <div className="h-4 w-4/6 animate-pulse rounded bg-stone-200" />
                  <div className="h-4 w-3/6 animate-pulse rounded bg-stone-200" />
                </div>
                <div className="flex gap-3 pt-4">
                  <div className="h-12 w-40 animate-pulse rounded bg-stone-200" />
                  <div className="h-12 w-40 animate-pulse rounded bg-stone-200" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FCFBF7] px-4 text-center text-ink">
        <h1 className="font-heading text-3xl text-ink">Customized Service in Bangalore</h1>
        <p className="mt-2 max-w-md text-stone-600">
          The requested Bangalore landing page could not be located. Explore our signature bridal & designer collections below.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="button-primary text-sm font-semibold">
            Visit Homepage
          </Link>
          <Link to="/bridal-blouse-bangalore" className="button-secondary text-sm">
            Bridal Blouse Collection
          </Link>
          <Link to="/contact-shrusara-bangalore" className="button-secondary text-sm">
            Contact Boutique
          </Link>
        </div>
      </div>
    );
  }

  const {
    title,
    serviceCategory = 'Ready-to-Wear Saree Customization',
    locationName = 'Bangalore',
    areaGroup = 'Bangalore West',
    metaTitle,
    metaDescription,
    metaKeywords,
    featuredImage,
    hero = {},
    about = {},
    chiefDesigner = {},
    whyChooseUs = {},
    processHeading,
    processIntro,
    processSteps = [],
    galleryHeading,
    galleryIntro,
    gallery = [],
    proximityHeading,
    proximity = {},
    testimonials = [],
    testimonialsHeading,
    testimonialsIntro,
    googleReviewsUrl,
    googleReviewButtonText,
    faqsHeading,
    faqsIntro,
    faqs = [],
    cta = {}
  } = page;

  const currentCanonicalUrl = schemas.canonicalUrl || `${DEFAULT_SITE_URL}${BANGALORE_BASE_PATH}/${page.slug}`;

  // Nearby locations for internal links section
  const nearbyLocations = BANGALORE_LOCATIONS_PRESET.filter(
    (loc) => loc.name.toLowerCase() !== locationName.toLowerCase()
  ).slice(0, 8);

  const targetHeroImageUrl = useMemo(() => {
    const remote = remoteOverrides[slug];
    const remoteUrl = remote?.featuredImage?.url || remote?.heroImage;
    if (remoteUrl) {
      return remoteUrl;
    }
    return page?.featuredImage?.url || localPage?.featuredImage?.url || '/videos/Revisedlogo.webp';
  }, [remoteOverrides, slug, page?.featuredImage?.url, localPage?.featuredImage?.url]);

  const targetDesignerImageUrl = useMemo(() => {
    const remote = remoteOverrides[slug];
    const remoteDesignerUrl = typeof remote?.chiefDesigner?.designerImage === 'string'
      ? remote.chiefDesigner.designerImage
      : remote?.chiefDesigner?.designerImage?.url;

    if (remoteDesignerUrl) {
      return remoteDesignerUrl;
    }

    const localImg = typeof chiefDesigner?.designerImage === 'string'
      ? chiefDesigner.designerImage
      : chiefDesigner?.designerImage?.url;

    return localImg || '/videos/lead-of-shrusara.webp';
  }, [remoteOverrides, slug, chiefDesigner]);

  const [designerImageState, setDesignerImageState] = useState('loading');

  useEffect(() => {
    setHeroImageState('loading');
    if (targetHeroImageUrl) {
      const img = new Image();
      img.onload = () => setHeroImageState('loaded');
      img.onerror = () => setHeroImageState('error');
      img.src = targetHeroImageUrl;
    }
  }, [slug, targetHeroImageUrl]);

  useEffect(() => {
    setDesignerImageState('loading');
    if (targetDesignerImageUrl) {
      const img = new Image();
      img.onload = () => setDesignerImageState('loaded');
      img.onerror = () => setDesignerImageState('error');
      img.src = targetDesignerImageUrl;
    }
  }, [slug, targetDesignerImageUrl]);

  let metaImageUrl = featuredImage?.url;
  if (metaImageUrl && (metaImageUrl.includes('i.ibb.co') || metaImageUrl.includes('ibb.co'))) {
    metaImageUrl = '/videos/hii.webp';
  }
  if (page?.slug === 'customized-occasion-wear-bangalore') {
    metaImageUrl = 'https://www.shrusara.com/videos/hii.webp';
  }

  return (
    <>
      <PageMeta
        title={metaTitle || `${title} | Shrusara Fashion Boutique`}
        description={metaDescription}
        keywords={Array.isArray(metaKeywords) ? metaKeywords.join(', ') : metaKeywords}
        image={metaImageUrl}
        canonicalUrl={currentCanonicalUrl}
        schemas={[
          schemas.serviceSchema,
          schemas.breadcrumbSchema,
          schemas.faqSchema,
          schemas.localBusinessSchema
        ].filter(Boolean)}
      />

      <div className="min-h-screen bg-[#FCFBF7] text-ink selection:bg-cocoa selection:text-white pb-24 md:pb-0">
        {/* =========================================================================
            SECTION 1 — GLOBAL LANDING PAGE HEADER (NEW V2)
           ========================================================================= */}
        {/* Top Announcement Bar */}
        <div className="bg-[#2A1E17] px-4 py-2 text-center text-xs font-medium text-linen/95">
          <span>100% Customized Bridal & Designer Boutique in Bangalore • Video Consultation Available Across Bangalore</span>
        </div>

        {/* Minimal Clean Header */}
        <header className="sticky top-0 z-40 border-b border-ink/8 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-3 lg:px-8">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <img
                src="/videos/Revisedlogo.webp"
                alt="Shrusara Fashion Boutique Logo"
                className="h-10 w-auto object-contain sm:h-14"
              />
              <div>
                <span className="font-heading text-base font-bold tracking-wide text-ink sm:text-xl">
                  Shrusara
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-cocoa font-semibold sm:text-[10px] sm:tracking-[0.25em]">
                  Fashion Boutique
                </span>
              </div>
            </Link>

            {/* Header Right CTA — Single Black Button */}
            <div>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsApp('landing_header_whatsapp')}
                className="inline-flex items-center gap-2 bg-[#1C1410] px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow hover:bg-[#B8935A] transition sm:px-4 sm:py-2.5 sm:text-xs"
              >
                <span>💬</span>
                <span>CHAT WITH OUR DESIGNER</span>
              </a>
            </div>
          </div>
        </header>

        {/* VISUAL BREADCRUMBS */}
        <nav aria-label="Breadcrumb" className="border-b border-ink/5 bg-linen/20 px-4 py-2 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs text-stone-500 overflow-x-auto">
            <Link to="/" className="hover:text-cocoa transition whitespace-nowrap">
              Home
            </Link>
            <span>/</span>
            <Link to="/bridal-blouse-bangalore" className="hover:text-cocoa transition whitespace-nowrap">
              Bangalore
            </Link>
            <span>/</span>
            <span className="text-stone-700 font-medium whitespace-nowrap">{locationName}</span>
            <span>/</span>
            <span className="truncate font-semibold text-cocoa">{serviceCategory}</span>
          </div>
        </nav>

        {/* =========================================================================
            SECTION 4 — HERO SECTION (GLOBAL V2)
           ========================================================================= */}
        <section className="relative overflow-hidden px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
              
              {/* Hero Image — Natural DOM position 1st (renders at top on mobile immediately on Frame 0). Placed in Cols 8-12 on Desktop */}
              <div className="lg:col-start-8 lg:col-span-5 lg:row-start-1">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white p-2.5 shadow-xl">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100">
                      {/* 1. LOADING STATE: Shimmer Skeleton Overlay */}
                      {heroImageState === 'loading' && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 via-stone-200/70 to-stone-100 animate-pulse p-6 text-center">
                          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-md">
                            <img
                              src="/videos/Revisedlogo.webp"
                              alt="Loading Shrusara..."
                              className="h-9 w-auto object-contain animate-bounce opacity-85"
                            />
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="h-3 w-32 mx-auto rounded-full bg-stone-300 animate-pulse" />
                            <div className="h-2 w-24 mx-auto rounded-full bg-stone-200 animate-pulse" />
                          </div>
                          <span className="mt-3 font-heading text-[11px] font-semibold tracking-wider text-cocoa uppercase">
                            Loading Bespoke Preview...
                          </span>
                        </div>
                      )}

                      {/* 2. ERROR STATE: Clean error placeholder instead of showing old template image */}
                      {heroImageState === 'error' && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-100 p-6 text-center border border-dashed border-stone-300 rounded-2xl">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cocoa/10 text-cocoa text-xl">
                            ✦
                          </div>
                          <span className="mt-3 font-heading text-sm font-semibold text-ink">
                            Custom Image Unavailable
                          </span>
                          <p className="mt-1 text-xs text-stone-500 max-w-[200px]">
                            Shrusara Fashion Boutique Bespoke Design
                          </p>
                        </div>
                      )}

                      {/* 3. LOADED IMAGE: Smooth fade in when fully loaded */}
                      {targetHeroImageUrl ? (
                        <img
                          key={targetHeroImageUrl}
                          src={targetHeroImageUrl}
                          alt={featuredImage?.alt || `${serviceCategory} in ${locationName}, Bangalore – Shrusara Fashion Boutique`}
                          title={featuredImage?.title || `${serviceCategory} in ${locationName}`}
                          fetchPriority="high"
                          loading="eager"
                          decoding="async"
                          onLoad={() => setHeroImageState('loaded')}
                          onError={() => setHeroImageState('error')}
                          className={`h-full w-full object-cover transition-opacity duration-700 hover:scale-105 ${
                            heroImageState === 'loaded' ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ) : null}
                    </div>
                    {featuredImage?.caption ? (
                      <p className="p-2 text-center text-xs text-stone-600">
                        {featuredImage.caption}
                      </p>
                    ) : (
                      <div className="flex items-center justify-between p-2 text-xs text-stone-600">
                        <span className="font-semibold text-cocoa">✦ Bespoke Craftsmanship</span>
                        <span>Shrusara Boutique</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hero Content — Natural DOM position 2nd (renders below image on mobile). Placed in Cols 1-7 on Desktop */}
              <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1">
                {/* Hero Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-cocoa/30 bg-cocoa/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cocoa">
                  <span>✦</span>
                  <span>{hero.badge || `100% Customized | ${locationName}, Bangalore`}</span>
                </div>

                {/* Main H1 */}
                <h1 className="mt-4 font-heading text-3xl font-normal leading-tight text-ink sm:text-4xl lg:text-5xl">
                  {hero.heading || title || `${serviceCategory} in ${locationName}, Bangalore`}
                </h1>

                {/* Subtitle / Tagline */}
                <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                  {hero.tagline ||
                    `Bespoke ${serviceCategory.toLowerCase()} tailored to your exact measurements, handcrafted by master artisans for clients in ${locationName}, Bangalore.`}
                </p>

                {/* 6 Hero Highlights Checklist */}
                {hero.highlights?.length ? (
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {hero.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          ✓
                        </span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Primary CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a
                    href={waLink(hero.primaryCtaMessage)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackWhatsApp('bangalore_hero_primary')}
                    className="button-primary inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold shadow-lg hover:shadow-xl transition"
                  >
                    <span>💬</span>
                    <span>{hero.primaryCtaText || 'Chat on WhatsApp'}</span>
                  </a>

                  <a
                    href={`tel:${phoneNumber}`}
                    onClick={() => trackPhoneCall('bangalore_hero_call')}
                    className="button-secondary inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition"
                  >
                    <span>📞</span>
                    <span>{hero.secondaryCtaText || 'Call Shrusara Boutique'}</span>
                  </a>
                </div>

                {/* Trust Note */}
                <p className="mt-3.5 text-xs text-stone-500">
                  📍 Boutique in Mahalakshmipuram | Porter & courier delivery available across {locationName}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5 — ABOUT SERVICE & FEATURES (GLOBAL V2)
           ========================================================================= */}
        <section className="border-t border-ink/10 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                Custom-Only Craftsmanship
              </p>
              <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                {about.heading || `Customized ${serviceCategory} in ${locationName}`}
              </h2>
              {about.intro && (
                <p className="mt-4 text-base font-medium leading-relaxed text-stone-800">
                  {about.intro}
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {about.description ||
                  `At Shrusara Fashion Boutique, we specialize exclusively in customized ${serviceCategory.toLowerCase()} tailored to your unique body shape, style, and occasion. Experience master artisan craftsmanship, premium fabrics, and personalized attention.`}
              </p>
            </div>

            {/* 6 Feature Cards */}
            {about.highlights?.length ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {about.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-2xl border border-ink/8 bg-linen/25 p-6 transition hover:shadow-md hover:border-cocoa/30"
                  >
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cocoa/10 text-cocoa font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-medium text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-stone-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* =========================================================================
            SECTION 4 — MEET OUR CHIEF DESIGNER (NEW V2)
           ========================================================================= */}
        {chiefDesigner ? (
          <section className="border-t border-ink/10 bg-linen/30 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <div className="relative mx-auto max-w-sm lg:max-w-none">
                    <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white p-3 shadow-xl">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cocoa/5">
                        {/* Loading Shimmer Skeleton overlay */}
                        {designerImageState === 'loading' && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 via-stone-200/70 to-stone-100 animate-pulse p-4 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-sm">
                              <img
                                src="/videos/Revisedlogo.webp"
                                alt="Loading Shrusara..."
                                className="h-8 w-auto object-contain animate-bounce opacity-80"
                              />
                            </div>
                            <span className="mt-2 text-[10px] font-semibold text-cocoa uppercase tracking-wider">
                              Loading Designer Profile...
                            </span>
                          </div>
                        )}

                        {/* Error State */}
                        {designerImageState === 'error' && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-100 p-4 text-center">
                            <span className="text-xs font-semibold text-ink">Designer Photo Unavailable</span>
                          </div>
                        )}

                        {/* Image Element */}
                        {targetDesignerImageUrl ? (
                          <img
                            key={targetDesignerImageUrl}
                            src={targetDesignerImageUrl}
                            alt={chiefDesigner.designerImageAlt || chiefDesigner.designerImage?.alt || 'Shruthi Ajith, Founder & Chief Designer'}
                            title={chiefDesigner.designerImage?.title || chiefDesigner.designerName || 'Shruthi Ajith'}
                            fetchPriority="high"
                            loading="eager"
                            decoding="async"
                            onLoad={() => setDesignerImageState('loaded')}
                            onError={() => setDesignerImageState('error')}
                            className={`h-full w-full object-cover transition-opacity duration-700 ${
                              designerImageState === 'loaded' ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        ) : null}
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-heading text-lg font-bold text-ink">
                          {chiefDesigner.designerName || 'Shruthi Ajith'}
                        </h3>
                        <p className="text-xs font-medium text-cocoa">
                          {chiefDesigner.designation || 'Founder & Chief Designer'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                    Personalized Designer Attention
                  </p>
                  <h2 className="font-heading text-3xl text-ink sm:text-4xl">
                    {chiefDesigner.sectionHeading || 'Meet Our Chief Designer — Shruthi Ajith'}
                  </h2>
                  {chiefDesigner.sectionIntro && (
                    <p className="text-base font-medium text-stone-800 leading-relaxed">
                      {chiefDesigner.sectionIntro}
                    </p>
                  )}
                  {chiefDesigner.designerBio && (
                    <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                      {chiefDesigner.designerBio}
                    </p>
                  )}

                  <div className="pt-4 rounded-2xl border border-cocoa/20 bg-white p-6 shadow-sm space-y-3">
                    <h3 className="font-heading text-lg font-bold text-ink">
                      {chiefDesigner.designerCtaHeading || 'Discuss Your Design With Shruthi'}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {chiefDesigner.designerCtaText || 'Have a design idea in mind? Speak with our designer about your customization requirements.'}
                    </p>
                    <div className="pt-1">
                      <a
                        href={chiefDesigner.designerCtaLink || waLink(`Hi Shruthi ma'am! I am from ${locationName} and would like to discuss my ${serviceCategory} customization.`)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackWhatsApp('chief_designer_cta')}
                        className="button-primary inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold"
                      >
                        <span>💬</span>
                        <span>{chiefDesigner.designerCtaButtonText || 'Chat With Our Designer'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* =========================================================================
            SECTION 5 — WHY CHOOSE SHRUSARA (GLOBAL V2)
           ========================================================================= */}
        <section className="bg-sand/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                The Shrusara Distinction
              </p>
              <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                {whyChooseUs.heading || `Why Clients in ${locationName} Choose Shrusara Boutique`}
              </h2>
              {whyChooseUs.intro && (
                <p className="mt-4 text-base font-medium leading-relaxed text-stone-800">
                  {whyChooseUs.intro}
                </p>
              )}
              {whyChooseUs.description && whyChooseUs.description !== whyChooseUs.intro ? (
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {whyChooseUs.description}
                </p>
              ) : !whyChooseUs.intro ? (
                <p className="mt-4 text-sm leading-relaxed text-stone-700">
                  Shrusara is strictly a customization-only studio in Mahalakshmipuram, easily accessible from across Bangalore. We do not sell mass-produced ready-made stock. Every single piece is individually envisioned, cut, and tailored for your unique body contours.
                </p>
              ) : null}
            </div>

            {whyChooseUs.cards?.length ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {whyChooseUs.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition hover:border-cocoa hover:shadow-md"
                  >
                    <div className="text-cocoa text-xl">✦</div>
                    <h3 className="mt-3 font-heading text-lg font-medium text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* =========================================================================
            SECTION 7 — 5-STEP CUSTOMIZATION JOURNEY (GLOBAL V2)
           ========================================================================= */}
        {processSteps?.length ? (
          <section className="border-t border-ink/10 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                  Step-by-Step Perfection
                </p>
                <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                  {processHeading || page.processHeading || 'Our 5-Step Customization Journey'}
                </h2>
                <p className="mt-3 text-sm text-stone-600">
                  {processIntro || page.processIntro || `From initial style consultation to final fitting, how we craft your bespoke ${serviceCategory.toLowerCase()} in Bangalore.`}
                </p>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-linen/20 p-5 transition hover:border-cocoa"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cocoa text-xs font-bold text-white">
                          {idx + 1}
                        </span>
                        {step.duration ? (
                          <span className="rounded-md bg-ink/5 px-2 py-0.5 text-[10px] font-semibold text-stone-600">
                            {step.duration}
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-4 font-heading text-base font-semibold text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-stone-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* =========================================================================
            SECTION 8 — CURATED DESIGN GALLERY (GLOBAL V2)
           ========================================================================= */}
        {gallery?.length ? (
          <section className="bg-sand/30 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                  Visual Masterpieces
                </p>
                <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                  {galleryHeading || page.galleryHeading || `${serviceCategory} Gallery`}
                </h2>
                <p className="mt-3 text-sm text-stone-600">
                  {galleryIntro || page.galleryIntro || 'Explore bespoke creations handcrafted for celebrations across Bangalore.'}
                </p>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedLightboxImage(img)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition duration-300 hover:shadow-xl"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-ink/5">
                      <img
                        src={img.url}
                        alt={img.alt || `${serviceCategory} in ${locationName}, Bangalore – Shrusara Fashion Boutique`}
                        title={img.title || `${serviceCategory} in ${locationName}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    {img.title || img.caption ? (
                      <div className="p-3 text-center">
                        {img.title && <p className="font-heading text-sm font-medium text-ink">{img.title}</p>}
                        {img.caption && <p className="text-xs text-stone-500">{img.caption}</p>}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* LIGHTBOX MODAL */}
        {selectedLightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedLightboxImage(null)}
          >
            <div className="relative max-w-2xl overflow-hidden rounded-2xl bg-white p-3" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedLightboxImage.url}
                alt={selectedLightboxImage.alt || 'Gallery view'}
                className="max-h-[80vh] w-full rounded-xl object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedLightboxImage(null)}
                className="absolute top-5 right-5 rounded-full bg-black/60 p-2 text-white hover:bg-black transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 9 — LOCATION, MAPS & BOUTIQUE VISIT OPTIONS (GLOBAL V2)
           ========================================================================= */}
        <section className="border-t border-ink/10 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20" id="contact">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                  Boutique Proximity & Delivery
                </p>
                <h2 className="font-heading text-3xl text-ink sm:text-4xl">
                  {proximityHeading || page.proximityHeading || proximity.heading || `Convenient for Clients in ${locationName}, Bangalore`}
                </h2>
                <p className="text-sm leading-relaxed text-stone-700">
                  {proximity.distanceNote ||
                    `Our flagship boutique studio is located in Mahalakshmipuram, conveniently accessible from ${locationName}. For fabric collection, intermediate trial fittings, and final delivery, we also provide reliable Porter doorstep courier delivery across Bangalore.`}
                </p>

                <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-stone-800">
                  <p>
                    <span className="font-semibold text-cocoa">📍 Boutique Address:</span>{' '}
                    {proximity.boutiqueAddress || BOUTIQUE_ADDRESS}
                  </p>
                  {proximity.landmark && (
                    <p>
                      <span className="font-semibold text-cocoa">🏛 Landmark:</span>{' '}
                      {proximity.landmark}
                    </p>
                  )}
                  {proximity.travelTime && (
                    <p>
                      <span className="font-semibold text-cocoa">⏱ Travel Time from {locationName}:</span>{' '}
                      {proximity.travelTime}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold text-cocoa">🕒 Boutique Hours:</span>{' '}
                    {proximity.workingHours || 'Monday - Sunday: 10:30 AM to 8:30 PM (By Appointment & Walk-in)'}
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href={proximity.googleMapsUrl || 'https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore'}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary text-xs font-semibold"
                  >
                    📍 {proximity.mapsButtonText || 'Get Google Maps Directions'}
                  </a>
                  <a
                    href={waLink(`Hi Shrusara, I am from ${locationName} and would like to book a consultation.`)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackWhatsApp('bangalore_location_cta')}
                    className="button-primary text-xs font-semibold"
                  >
                    Book Appointment on WhatsApp
                  </a>
                </div>
              </div>

              {/* Boutique Visit Options Card (NEW V2) */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-ink/10 bg-linen/50 p-6 shadow-md space-y-4">
                  <h3 className="font-heading text-xl text-ink flex items-center gap-2">
                    <span>✨</span>
                    <span>Boutique Visit Options</span>
                  </h3>

                  <div className="space-y-3">
                    {(proximity.boutiqueVisitOptions || [
                      { title: 'Walk-ins Welcome', description: 'Feel free to visit our Mahalakshmipuram boutique anytime during boutique hours.' },
                      { title: 'Bridal Appointments Recommended', description: 'Schedule a dedicated 1-on-1 slot with Chief Designer Shruthi Ajith.' },
                      { title: 'Video Consultation Available', description: 'Virtual design sessions for clients in ' + locationName + ' unable to visit in person.' },
                      { title: 'Pickup & Courier Available Across Bangalore', description: 'Reliable Porter fabric pickup and doorstep delivery across ' + locationName + '.' }
                    ]).map((opt, i) => (
                      <div key={i} className="rounded-xl border border-ink/5 bg-white p-3.5">
                        <p className="text-xs font-bold text-cocoa">✦ {opt.title}</p>
                        <p className="mt-1 text-xs text-stone-600 leading-relaxed">{opt.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10 — CUSTOMER TESTIMONIALS (GLOBAL V2)
           ========================================================================= */}
        {testimonials?.length ? (
          <section className="bg-sand/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                  Client Experiences
                </p>
                <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                  {testimonialsHeading || page.testimonialsHeading || 'Loved by Clients Across Bangalore'}
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  {testimonialsIntro || page.testimonialsIntro || 'Genuine 5-star experiences from clients who trusted Shrusara with their milestone outfits.'}
                </p>
                {(googleReviewsUrl || page.googleReviewsUrl) ? (
                  <div className="mt-4">
                    <a
                      href={googleReviewsUrl || page.googleReviewsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button-secondary inline-flex items-center gap-2 py-2 px-4 text-xs font-semibold shadow-sm hover:shadow transition"
                    >
                      <span>⭐</span>
                      <span>{googleReviewButtonText || page.googleReviewButtonText || 'Read Our Google Reviews ↗'}</span>
                    </a>
                  </div>
                ) : null}
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testi, idx) => (
                  <div key={idx} className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 text-sm">
                        {Array.from({ length: testi.rating || 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="mt-3 text-xs sm:text-sm italic leading-relaxed text-stone-700">
                        &ldquo;{testi.reviewText}&rdquo;
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-ink/5 pt-3">
                      <div>
                        <p className="font-heading text-sm font-bold text-ink">{testi.name}</p>
                        <p className="text-xs text-stone-500">{testi.location || `${locationName}, Bangalore`}</p>
                      </div>
                      <span className="rounded-full bg-cocoa/10 px-2.5 py-0.5 text-[10px] font-semibold text-cocoa">
                        {testi.outfitType || serviceCategory}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* =========================================================================
            SECTION 11 — LOCALIZED FAQ ACCORDION (GLOBAL V2 - 8 FAQS)
           ========================================================================= */}
        {faqs?.length ? (
          <section className="border-t border-ink/10 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                  {serviceCategory} in {locationName} FAQs
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  Everything you need to know about our customization process, fittings, and delivery.
                </p>
              </div>

              <div className="mt-10 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-linen/20">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="p-4 sm:p-5">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between text-left font-heading text-base font-medium text-ink transition hover:text-cocoa"
                      >
                        <span>{faq.question}</span>
                        <span className="ml-4 text-lg font-bold text-cocoa shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="mt-3 text-xs leading-relaxed text-stone-700 sm:text-sm">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* =========================================================================
            SECTION 12 — BOTTOM CONVERSION BANNER (GLOBAL V2)
           ========================================================================= */}
        <section className="bg-gradient-to-br from-[#2A1E17] to-[#1F150F] px-4 py-16 text-linen sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-200">
              Personalized Couture
            </p>
            <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl lg:text-5xl">
              {cta.heading || `${serviceCategory} Near ${locationName}, Bangalore`}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-linen/80 sm:text-base">
              {cta.subheading ||
                `Book your 1-on-1 consultation with Chief Designer Shruthi Ajith today. Experience bespoke luxury and guaranteed perfect fit in Bangalore.`}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={waLink(`Hi Shrusara! I would like to book a consultation for ${serviceCategory} in ${locationName}.`)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsApp('bangalore_bottom_cta')}
                className="button-primary inline-flex items-center gap-2.5 px-7 py-4 text-sm font-semibold shadow-2xl"
              >
                <span>💬</span>
                <span>{cta.whatsappText || 'Chat on WhatsApp'}</span>
              </a>

              <a
                href={`tel:${phoneNumber}`}
                onClick={() => trackPhoneCall('bangalore_bottom_call')}
                className="rounded-2xl border border-linen/30 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition"
              >
                <span>📞</span>
                <span>{cta.callText || 'Call Shrusara Boutique'}</span>
              </a>
            </div>

            <p className="mt-6 text-xs text-linen/60">
              📍 106, 6th Main Road, Mahalakshmipuram, Bangalore - 560086
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 14 — INTERNAL LINKS (NEW V2 - SEO CRAWLING)
           ========================================================================= */}
        <section className="border-t border-ink/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h3 className="font-heading text-lg font-bold text-ink text-center mb-8">
              Explore Shrusara Boutique Services Across Bangalore
            </h3>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Related Services */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa mb-3">
                  All Customized Services
                </h4>
                <ul className="space-y-2 text-xs text-stone-600">
                  {SERVICE_CATEGORIES.map((srv, i) => (
                    <li key={i}>
                      <Link
                        to={`${BANGALORE_BASE_PATH}/${slugifyBangalorePage(srv, locationName)}`}
                        className="hover:text-cocoa hover:underline transition"
                      >
                        ✦ {srv} in {locationName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Localities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa mb-3">
                  Nearby Bangalore Localities
                </h4>
                <ul className="space-y-2 text-xs text-stone-600">
                  {nearbyLocations.map((locItem, i) => (
                    <li key={i}>
                      <Link
                        to={`${BANGALORE_BASE_PATH}/${slugifyBangalorePage(serviceCategory, locItem.name)}`}
                        className="hover:text-cocoa hover:underline transition"
                      >
                        ✦ {serviceCategory} in {locItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Guides / Blogs */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cocoa mb-3">
                  Boutique Guides & Resources
                </h4>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li>
                    <Link to="/about-shrusara-boutique" className="hover:text-cocoa hover:underline transition">
                      ✦ About Chief Designer Shruthi Ajith
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-shrusara-bangalore" className="hover:text-cocoa hover:underline transition">
                      ✦ Book Studio Bridal Consultation
                    </Link>
                  </li>
                  <li>
                    <Link to="/bridal-fashion-blog-bangalore" className="hover:text-cocoa hover:underline transition">
                      ✦ Bridal Blouse & Saree Styling Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/bridal-blouse-bangalore" className="hover:text-cocoa hover:underline transition">
                      ✦ Signature Bridal Blouse Showcase
                    </Link>
                  </li>
                  <li>
                    <Link to="/customized-occasion-wear-bangalore" className="hover:text-cocoa hover:underline transition">
                      ✦ Luxury Occasion Wear Bangalore
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2 — GLOBAL LANDING PAGE FOOTER (NEW V2)
           ========================================================================= */}
        <footer className="border-t border-ink/10 bg-[#1F150F] text-linen/80 px-4 py-12 sm:px-6 lg:px-8 text-xs">
          <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src="/videos/Revisedlogo.webp" alt="Shrusara Logo" className="h-10 w-auto object-contain" />
                <span className="font-heading text-base font-bold text-white">Shrusara Boutique</span>
              </div>
              <p className="text-linen/70 leading-relaxed">
                Bangalore’s premier 100% custom-only bridal and designer boutique led by Chief Designer Shruthi Ajith.
              </p>
              <p className="mt-3 text-linen/50">
                106, 6th Main Road, Mahalakshmipuram, Bangalore - 560086
              </p>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-3">Our Services</h4>
              <ul className="space-y-1.5 text-linen/70">
                {SERVICE_CATEGORIES.map((srv, i) => (
                  <li key={i}>
                    <Link to={`${BANGALORE_BASE_PATH}/${slugifyBangalorePage(srv, locationName)}`} className="hover:text-white transition">
                      {srv}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-3">Bangalore Locations</h4>
              <div className="grid grid-cols-2 gap-1 text-linen/70">
                {BANGALORE_LOCATIONS_PRESET.slice(0, 10).map((locItem, i) => (
                  <Link
                    key={i}
                    to={`${BANGALORE_BASE_PATH}/${slugifyBangalorePage(serviceCategory, locItem.name)}`}
                    className="hover:text-white transition"
                  >
                    {locItem.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-3">Contact & Consultation</h4>
              <p className="text-linen/70 text-xs">
                📞 <a href={`tel:${phoneNumber}`} onClick={() => trackPhoneCall('footer_phone')} className="hover:text-white transition">+91 {phoneNumber}</a>
              </p>
              <p className="mt-1 text-linen/70 text-xs">
                💬 <a href={waLink()} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp('footer_whatsapp')} className="hover:text-white transition">WhatsApp Consultation</a>
              </p>
              <p className="mt-1 text-linen/70 text-xs">
                🕒 Mon - Sun: 10:30 AM - 8:30 PM
              </p>
              <p className="mt-1.5 text-linen/50 text-[11px]">
                Direct Green Line Metro to Mahalakshmi Metro Station.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-linen/10 pt-6 text-center text-linen/50 text-[11px]">
            © {new Date().getFullYear()} Shrusara Fashion Boutique. All Rights Reserved. Customization-Only Fashion Studio in Bangalore.
          </div>
        </footer>

        {/* =========================================================================
            SECTION 13 — FLOATING CIRCULAR CONTACT BUTTONS (BOTTOM-RIGHT)
           ========================================================================= */}
        {/* Floating Call Button — Black Circle */}
        <div className="fixed bottom-24 right-5 z-50">
          <a
            href={`tel:${phoneNumber}`}
            onClick={() => trackPhoneCall('floating_call')}
            aria-label="Call Shrusara Boutique"
            className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black text-white shadow-[0_6px_24px_rgba(0,0,0,0.4)] transition hover:bg-[#B8935A] hover:scale-105 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
        </div>

        {/* Floating WhatsApp Button — Green Circle */}
        <div className="fixed bottom-6 right-5 z-50">
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWhatsApp('floating_whatsapp')}
            aria-label="Chat with Our Designer on WhatsApp"
            className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.45)] transition hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-55 animate-ping" />
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
