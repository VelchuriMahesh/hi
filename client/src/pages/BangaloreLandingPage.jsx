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
  generateLandingPageSchemas,
  generatePresetContent,
  slugifyBangalorePage
} from '../utils/bangaloreLandingPage';
import { trackPhoneCall, trackWhatsApp } from '../utils/tracking';

export default function BangaloreLandingPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0); // Open first FAQ by default
  const [selectedLightboxImage, setSelectedLightboxImage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadPage() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchLandingPageBySlug(slug);
        if (isMounted) {
          if (res?.item) {
            // Merge with master template to ensure all 10 V2 sections are always hydrated
            const hydrated = buildLandingPageFromMaster(
              res.item.serviceCategory || 'Ready-to-Wear Saree Customization',
              res.item.locationName || 'Bangalore',
              res.item
            );
            setPage(hydrated);
            if (res.item.id) {
              void trackLandingPageView(res.item.id);
            }
          } else {
            // If not found in backend, parse slug and generate dynamic master template page
            const parts = String(slug || '').split('-stitching-');
            if (parts.length === 2) {
              const serviceName = parts[0].replace(/-/g, ' ');
              const locName = parts[1].replace(/-/g, ' ');
              const fallback = buildLandingPageFromMaster(serviceName, locName);
              setPage(fallback);
            } else {
              setError('Landing page not found');
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          // Dynamic fallback on backend error or offline
          const parts = String(slug || '').split('-stitching-');
          if (parts.length === 2) {
            const serviceName = parts[0].replace(/-/g, ' ');
            const locName = parts[1].replace(/-/g, ' ');
            const fallback = buildLandingPageFromMaster(serviceName, locName);
            setPage(fallback);
          } else {
            // General fallback
            setPage(buildLandingPageFromMaster('Ready-to-Wear Saree Customization', 'Rajajinagar'));
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPage();
    return () => {
      isMounted = false;
    };
  }, [slug]);

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
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF7] text-ink">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cocoa border-t-transparent mx-auto" />
          <p className="mt-4 font-heading text-lg text-cocoa">Loading customized collection...</p>
        </div>
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
    whyChooseUs = {},
    processSteps = [],
    gallery = [],
    proximity = {},
    testimonials = [],
    faqs = [],
    cta = {}
  } = page;

  const currentCanonicalUrl = schemas.canonicalUrl || `${DEFAULT_SITE_URL}${BANGALORE_BASE_PATH}/${page.slug}`;

  // Nearby locations for internal links section
  const nearbyLocations = BANGALORE_LOCATIONS_PRESET.filter(
    (loc) => loc.name.toLowerCase() !== locationName.toLowerCase()
  ).slice(0, 8);

  return (
    <>
      <PageMeta
        title={metaTitle || `${title} | Shrusara Fashion Boutique`}
        description={metaDescription}
        keywords={Array.isArray(metaKeywords) ? metaKeywords.join(', ') : metaKeywords}
        image={featuredImage?.url}
        canonicalUrl={currentCanonicalUrl}
        schemas={[
          schemas.serviceSchema,
          schemas.breadcrumbSchema,
          schemas.faqSchema,
          schemas.localBusinessSchema
        ].filter(Boolean)}
      />

      <div className="min-h-screen bg-[#FCFBF7] text-ink selection:bg-cocoa selection:text-white pb-20 md:pb-0">
        {/* =========================================================================
            SECTION 1 — GLOBAL LANDING PAGE HEADER (NEW V2)
           ========================================================================= */}
        {/* Top Announcement Bar */}
        <div className="bg-[#2A1E17] px-4 py-2 text-center text-xs font-medium text-linen/95">
          <span>100% Customized Bridal & Designer Boutique in Bangalore • Video Consultation Available Across Bangalore</span>
        </div>

        {/* Minimal Clean Header */}
        <header className="sticky top-0 z-40 border-b border-ink/8 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/videos/Revisedlogo.webp"
                alt="Shrusara Fashion Boutique Logo"
                className="h-12 w-auto object-contain sm:h-14"
              />
              <div>
                <span className="font-heading text-lg font-bold tracking-wide text-ink sm:text-xl">
                  Shrusara
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-cocoa font-semibold">
                  Fashion Boutique
                </span>
              </div>
            </Link>

            {/* Header Right CTAs */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsApp('landing_header_whatsapp')}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:bg-emerald-700 transition sm:px-4 sm:py-2"
              >
                <span>💬</span>
                <span className="hidden sm:inline">Chat on</span> WhatsApp
              </a>

              <a
                href={`tel:${phoneNumber}`}
                onClick={() => trackPhoneCall('landing_header_call')}
                className="inline-flex items-center gap-1.5 rounded-full border border-cocoa/30 bg-linen/50 px-3.5 py-1.5 text-xs font-semibold text-cocoa hover:bg-linen transition sm:px-4 sm:py-2"
              >
                <span>📞</span>
                <span className="hidden sm:inline">Call Boutique</span>
                <span className="sm:hidden">Call</span>
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
        <section className="relative overflow-hidden px-4 pt-8 pb-14 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                {/* Hero Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-cocoa/30 bg-cocoa/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cocoa">
                  <span>✦</span>
                  <span>{hero.badge || `100% Customized | ${locationName}, Bangalore`}</span>
                </div>

                {/* Main H1 */}
                <h1 className="mt-4 font-heading text-3xl font-normal leading-tight text-ink sm:text-4xl lg:text-5xl">
                  {hero.heading || `${serviceCategory} in ${locationName}, Bangalore`}
                </h1>

                {/* Subtitle */}
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

              {/* Hero Image */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white p-2.5 shadow-xl">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
                      <img
                        src={featuredImage?.url || '/bridal/bridalblow/hero-bridal.webp'}
                        alt={featuredImage?.alt || `${serviceCategory} in ${locationName}, Bangalore – Shrusara Fashion Boutique`}
                        title={featuredImage?.title || `${serviceCategory} in ${locationName}`}
                        className="h-full w-full object-cover transition duration-700 hover:scale-105"
                      />
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
            SECTION 6 — WHY CHOOSE SHRUSARA (GLOBAL V2)
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
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                {whyChooseUs.intro ||
                  'Shrusara is strictly a customization-only studio in Mahalakshmipuram, easily accessible from across Bangalore. We do not sell mass-produced ready-made stock. Every single piece is individually envisioned, cut, and tailored for your unique body contours.'}
              </p>
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
                  Our 5-Step Customization Journey
                </h2>
                <p className="mt-3 text-sm text-stone-600">
                  From initial style consultation to final fitting, how we craft your bespoke {serviceCategory.toLowerCase()} in Bangalore.
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
                  {serviceCategory} Gallery
                </h2>
                <p className="mt-3 text-sm text-stone-600">
                  Explore bespoke creations handcrafted for celebrations across Bangalore.
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
                  Convenient for Clients in {locationName}, Bangalore
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
                    📍 Get Google Maps Directions
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
                  Loved by Clients Across Bangalore
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  Genuine 5-star experiences from clients who trusted Shrusara with their milestone outfits.
                </p>
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
              <p className="text-linen/70">
                📞 <a href={`tel:${phoneNumber}`} className="hover:text-white">+91 {phoneNumber}</a>
              </p>
              <p className="mt-1 text-linen/70">
                💬 <a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp Consultation</a>
              </p>
              <p className="mt-1 text-linen/70">
                🕒 Mon - Sun: 10:30 AM - 8:30 PM
              </p>
              <p className="mt-3 text-linen/50">
                Direct Green Line Metro to Mahalakshmi Metro Station.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-linen/10 pt-6 text-center text-linen/50 text-[11px]">
            © {new Date().getFullYear()} Shrusara Fashion Boutique. All Rights Reserved. Customization-Only Fashion Studio in Bangalore.
          </div>
        </footer>

        {/* =========================================================================
            SECTION 13 — FLOATING & STICKY CTAS (NEW V2)
           ========================================================================= */}
        {/* Desktop: Floating WhatsApp Button (bottom-right) */}
        <div className="fixed bottom-6 right-6 z-50 hidden md:block">
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWhatsApp('floating_desktop_whatsapp')}
            aria-label="Chat with Our Designer on WhatsApp"
            className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-2xl hover:bg-emerald-700 hover:scale-105 transition duration-300"
          >
            <span className="text-lg">💬</span>
            <span>Chat with Designer</span>
          </a>
        </div>

        {/* Mobile: Sticky Bottom Bar (visible while scrolling) */}
        <div className="fixed bottom-0 inset-x-0 z-50 border-t border-ink/10 bg-white/95 backdrop-blur-md p-2.5 md:hidden shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsApp('sticky_mobile_whatsapp')}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white shadow hover:bg-emerald-700 transition"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${phoneNumber}`}
              onClick={() => trackPhoneCall('sticky_mobile_call')}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-cocoa py-2.5 text-xs font-semibold text-white shadow hover:bg-cocoa-dark transition"
            >
              <span>📞</span>
              <span>Call Boutique</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
