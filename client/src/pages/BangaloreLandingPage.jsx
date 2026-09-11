import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { fetchLandingPageBySlug, trackLandingPageView } from '../services/api';
import {
  BANGALORE_BASE_PATH,
  BOUTIQUE_ADDRESS,
  BOUTIQUE_PHONE,
  BOUTIQUE_WHATSAPP,
  DEFAULT_SITE_URL,
  generateLandingPageSchemas,
  generatePresetContent
} from '../utils/bangaloreLandingPage';
import { trackPhoneCall, trackWhatsApp } from '../utils/tracking';

export default function BangaloreLandingPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
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
            setPage(res.item);
            if (res.item.id) {
              void trackLandingPageView(res.item.id);
            }
          } else {
            setError('Landing page not found');
          }
        }
      } catch (err) {
        if (isMounted) {
          // If not found in backend or offline, check if we can generate fallback preset
          const parts = String(slug || '').split('-stitching-');
          if (parts.length === 2) {
            const serviceSlug = parts[0];
            const locSlug = parts[1];
            const fallback = generatePresetContent(
              serviceSlug.replace(/-/g, ' '),
              locSlug.replace(/-/g, ' ')
            );
            setPage(fallback);
          } else {
            setError(err.message || 'Page not found');
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
    if (!page) return 'Hi Shrusara, I would like to know more about your customized bridal & designer wear services in Bangalore.';
    return (
      page.hero?.primaryCtaMessage ||
      `Hi Shrusara, I would like to know about ${page.serviceCategory || 'customization'} in ${page.locationName || 'Bangalore'}.`
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
      <div className="flex min-h-[70vh] items-center justify-center bg-sand text-ink">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cocoa border-t-transparent mx-auto" />
          <p className="mt-4 font-heading text-lg text-cocoa">Loading customized collection...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-sand px-4 text-center text-ink">
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
    serviceCategory = 'Bridal Blouse',
    locationName = 'Bangalore',
    areaGroup = 'Bangalore',
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

  return (
    <>
      <PageMeta
        title={metaTitle || `${title} | Shrusara Fashion Boutique`}
        description={metaDescription}
        keywords={Array.isArray(metaKeywords) ? metaKeywords.join(', ') : metaKeywords}
        image={featuredImage?.url}
        canonicalUrl={currentCanonicalUrl}
        schemas={[schemas.serviceSchema, schemas.breadcrumbSchema, schemas.faqSchema].filter(Boolean)}
      />

      <div className="min-h-screen bg-[#FCFBF7] text-ink selection:bg-cocoa selection:text-white">
        {/* TOP NOTICE BAR */}
        <div className="bg-[#2A1E17] px-4 py-2 text-center text-xs font-medium text-linen/90">
          <span>✨ 100% Customized Bridal & Designer Studio in Bangalore. Direct Designer Consultation with Shruthi Ajith.</span>
        </div>

        {/* VISUAL BREADCRUMBS */}
        <nav aria-label="Breadcrumb" className="border-b border-ink/5 bg-white/70 px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs text-stone-500">
            <Link to="/" className="hover:text-cocoa transition">
              Home
            </Link>
            <span>/</span>
            <Link to="/bridal-blouse-bangalore" className="hover:text-cocoa transition">
              Bangalore Boutique
            </Link>
            <span>/</span>
            <span className="truncate font-semibold text-cocoa">{locationName}</span>
          </div>
        </nav>

        {/* SECTION 1: HERO SECTION */}
        <section className="relative overflow-hidden px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-cocoa/30 bg-cocoa/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cocoa">
                  <span>✦</span>
                  <span>{hero.badge || `100% Customized | ${locationName}, Bangalore`}</span>
                </div>

                {/* Main H1 */}
                <h1 className="mt-4 font-heading text-3xl font-normal leading-tight text-ink sm:text-4xl lg:text-5xl">
                  {hero.heading || title}
                </h1>

                {/* Subtitle */}
                <p className="mt-4 text-base leading-relaxed text-stone-700 sm:text-lg">
                  {hero.tagline ||
                    `Bespoke ${serviceCategory.toLowerCase()} tailored to your exact measurements, handcrafted by master maggam artisans for brides and clients in ${locationName}, Bangalore.`}
                </p>

                {/* Highlights checklist */}
                {hero.highlights?.length ? (
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {hero.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
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
                    <span>Call: +91 {phoneNumber}</span>
                  </a>
                </div>

                <p className="mt-3 text-xs text-stone-500">
                  📍 Boutique in Mahalakshmipuram | Porter & courier delivery available across {locationName}
                </p>
              </div>

              {/* Hero Image */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white p-2.5 shadow-2xl">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
                      <img
                        src={featuredImage?.url || '/bridal/bridalblow/hero-bridal.webp'}
                        alt={featuredImage?.alt || `${serviceCategory} in ${locationName}, Bangalore`}
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

        {/* SECTION 2: ABOUT SERVICE & BANGALORE EXPERIENCE */}
        <section className="border-t border-ink/10 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                Custom-Only Craftsmanship
              </p>
              <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                {about.heading || `Customized ${serviceCategory} Tailoring in ${locationName}`}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-700">
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
                    className="luxury-card flex flex-col justify-between border border-ink/8 bg-linen/30 p-6 transition hover:shadow-lg"
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

        {/* SECTION 3: WHY CHOOSE SHRUSARA BOUTIQUE */}
        <section className="bg-sand/60 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                The Shrusara Distinction
              </p>
              <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                {whyChooseUs.heading || `Why Clients in ${locationName} Choose Shrusara Boutique`}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                {whyChooseUs.description ||
                  'Shrusara is strictly a customization-only studio. We do not sell mass-produced ready-made stock. Every single piece is individually envisioned, cut, embroidered, and tailored for you.'}
              </p>
            </div>

            {whyChooseUs.cards?.length ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {whyChooseUs.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition hover:border-cocoa"
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

        {/* SECTION 4: 5-STEP CUSTOMIZATION JOURNEY */}
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
                  From initial sketch to final trial, how we craft your bespoke {serviceCategory.toLowerCase()} in Bangalore.
                </p>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-linen/20 p-5"
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

        {/* SECTION 5: CURATED DESIGN GALLERY */}
        {gallery?.length ? (
          <section className="bg-sand/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                  Visual Masterpieces
                </p>
                <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                  {serviceCategory} Gallery
                </h2>
                <p className="mt-3 text-sm text-stone-600">
                  Handcrafted creations tailored for weddings, receptions, and celebrations across Bangalore.
                </p>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedLightboxImage(img)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card transition duration-300 hover:shadow-xl"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-ink/5">
                      <img
                        src={img.url}
                        alt={img.alt || `${serviceCategory} design in Bangalore`}
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
                alt={selectedLightboxImage.alt || 'Gallery full view'}
                className="max-h-[80vh] w-full rounded-xl object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedLightboxImage(null)}
                className="absolute top-5 right-5 rounded-full bg-black/60 p-2 text-white hover:bg-black"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* SECTION 6: LOCATION & PROXIMITY ADVANTAGE */}
        <section className="border-t border-ink/10 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
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
                    `Our flagship boutique is located in Mahalakshmipuram, easily accessible from ${locationName}. For fabric handover, intermediate trials, and final delivery, we also provide secure Porter courier delivery across Bangalore.`}
                </p>

                <div className="space-y-2 pt-2 text-xs sm:text-sm text-stone-800">
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
                  <p>
                    <span className="font-semibold text-cocoa">🕒 Timings:</span>{' '}
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

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-ink/10 bg-linen/50 p-6 shadow-card space-y-4">
                  <h3 className="font-heading text-xl text-ink">Doorstep Service Across Bangalore</h3>
                  <ul className="space-y-3 text-xs text-stone-700">
                    <li className="flex items-start gap-2">
                      <span className="text-cocoa font-bold">✓</span>
                      <span><strong>Porter Pickup:</strong> We arrange direct pickup of your reference blouses and sarees.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cocoa font-bold">✓</span>
                      <span><strong>Virtual Measurement Guide:</strong> Video call support for measurement assistance if you cannot visit in person.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cocoa font-bold">✓</span>
                      <span><strong>Express Delivery:</strong> Door-to-door delivery right to your address in {locationName}.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CUSTOMER TESTIMONIALS */}
        {testimonials?.length ? (
          <section className="bg-sand/50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cocoa">
                  Client Experiences
                </p>
                <h2 className="mt-2 font-heading text-3xl text-ink sm:text-4xl">
                  Loved by Brides Across Bangalore
                </h2>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {testimonials.map((testi, idx) => (
                  <div key={idx} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
                    <div className="flex items-center gap-1 text-amber-500 text-sm">
                      {Array.from({ length: testi.rating || 5 }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm italic leading-relaxed text-stone-700">
                      &ldquo;{testi.reviewText}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3">
                      <div>
                        <p className="font-heading text-sm font-bold text-ink">{testi.name}</p>
                        <p className="text-xs text-stone-500">{testi.location || locationName}</p>
                      </div>
                      <span className="rounded-full bg-cocoa/10 px-2.5 py-0.5 text-xs font-semibold text-cocoa">
                        {testi.outfitType || serviceCategory}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* SECTION 8: LOCALIZED FAQ ACCORDION */}
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
                  Everything you need to know about our customization process, pricing, and timelines.
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
                        <span className="ml-4 text-lg font-bold text-cocoa">
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

        {/* SECTION 9 & 10: LUXURY BOTTOM CONVERSION BANNER */}
        <section className="bg-gradient-to-br from-[#2A1E17] to-[#1F150F] px-4 py-16 text-linen sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-200">
              Personalized Couture
            </p>
            <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl lg:text-5xl">
              {cta.heading || `Ready for Your Custom ${serviceCategory} in ${locationName}?`}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-linen/80 sm:text-base">
              {cta.subheading ||
                `Book your 1-on-1 consultation with Chief Designer Shruthi Ajith today. Experience handcrafted boutique luxury in Bangalore.`}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={waLink(`Hi Shrusara, I would like to book a consultation for ${serviceCategory} in ${locationName}.`)}
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
      </div>
    </>
  );
}
