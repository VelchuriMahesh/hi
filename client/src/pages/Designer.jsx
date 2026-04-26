import { useEffect, useState } from 'react';
import ImageGrid from '../components/ImageGrid';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import ReviewsSection from '../components/ReviewsSection';
import { fallbackReviews } from '../data/content';
import useGallery from '../hooks/useGallery';
import useHeroMedia from '../hooks/useHeroMedia';
import { fetchReviews } from '../services/api';
import { trackWhatsApp, trackPhoneCall } from '../utils/tracking';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919741827558';
const PHONE_NUMBER    = import.meta.env.VITE_PHONE_NUMBER    || '9741827558';
const DESIGNER_MSG    = encodeURIComponent(
  'Hi, I am looking for a customized designer outfit consultation. Please share details.'
);
const WA_LINK  = `https://wa.me/${WHATSAPP_NUMBER}?text=${DESIGNER_MSG}`;
const TEL_LINK = `tel:${PHONE_NUMBER}`;

// ─── Static Designer outfits data (Strictly for the Explore Styles Section) ──
const staticDesignerOutfits = [
  { id: 1, tag: 'gowns', title: 'Midnight Wine Designer Gown', alt: 'Midnight Wine Designer Gown', image: "/designer/designer gown/designer-party-wear-designer-evening-gown-shrusara.webp", description: 'An elegant designer gown crafted with flowing silhouettes and premium finishing for statement occasion wear.' },
  { id: 2, tag: 'gowns', title: 'Floral Trail Indo-Western Gown', alt: 'Floral Trail Indo-Western Gown', image: "/designer/designer gown/modern-gown-bridal-reception-premium-finishing-Shrusara-banaglore.webp", description: 'A dramatic indo-western gown designed with a flowing trail and modern couture-inspired styling.' },
  { id: 3, tag: 'gowns', title: 'Royal Blue Maternity Gown', alt: 'Royal Blue Maternity Gown', image: "/designer/designer gown/modern-gown-maternity-photoshoot-premium-finishing-shrusara-banaglore.webp", description: 'A graceful maternity gown designed with elegant drape, comfort, and premium photoshoot styling.' },
  { id: 4, tag: 'gowns', title: 'Mint Luxe Designer Ball Gown', alt: 'Mint Luxe Designer Ball Gown', image: "/designer/designer gown/premium-designer-ball-gown-for-engagement-bangalore.webp", description: 'A voluminous designer ball gown crafted for engagement, reception, and luxury occasion wear.' },
  { id: 5, tag: 'gowns', title: 'Floral Tail Couture Gown', alt: 'Floral Tail Couture Gown', image: "/designer/designer gown/reception-gown-for-brides-shrusara-fashion-boutique.webp", description: 'A statement couture gown featuring a dramatic tail silhouette and modern designer detailing.' },
  { id: 6, tag: 'indo-western', title: 'Gold Indo-Western Crop Top Lehenga', alt: 'Gold Indo-Western Crop Top Lehenga', image: "/designer/Indowestern/contemporary-modren-bridal-trousseau-outfit-shruthi-ajith.webp", description: 'An indo-western crop top lehenga designed with fusion styling and handcrafted premium finishing.' },
  { id: 7, tag: 'indo-western', title: 'Ivory Indo-Western Crop Top Lehenga', alt: 'Ivory Indo-Western Crop Top Lehenga', image: "/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp", description: 'A contemporary crop top lehenga styled with elegant drape and indo-western bridal fusion.' },
  { id: 8, tag: 'party-wear', title: 'Scarlet Evening Designer Gown', alt: 'Scarlet Evening Designer Gown', image: "/designer/Partwearset/custom-photoshoot-red-gown-reception-wear-bangalore.webp", description: 'A refined evening gown designed with sleek silhouettes and premium occasion wear finishing.' },
  { id: 9, tag: 'party-wear', title: 'Contemporary Designer Blouse', alt: 'Contemporary Designer Blouse', image: "/designer/Partwearset/designer-blouse-saree-bangalore-shrusara.webp", description: 'A customized designer blouse crafted with modern styling and premium couture detailing.' },
  { id: 10, tag: 'party-wear', title: 'Crimson Trail Party Gown', alt: 'Crimson Trail Party Gown', image: "/designer/Partwearset/elegant-designer-evening-gown-for-shruthi-ajith-bangalore.webp", description: 'A dramatic party gown featuring a flowing trail and statement fashion-forward silhouette.' },
  { id: 11, tag: 'party-wear', title: 'Rose Motion Couture Gown', alt: 'Rose Motion Couture Gown', image: "/designer/Partwearset/modern-tail-gown-reception-premium-finishing-shrusara-banaglore.webp", description: 'A couture-inspired designer gown styled with movement, elegance, and premium occasion wear detailing.' },
  { id: 12, tag: 'gowns', title: 'Noir Evening Couple Couture', alt: 'Noir Evening Couple Couture', image: "/designer/designer gown/elegant-evening-gown-brides-featuring-modern-silhouette-premium-fabric.webp", description: 'A coordinated designer couple look crafted for evening occasions with elegant contemporary styling.' },
];

// ─── Convert static outfits to ImageGrid-compatible format for Gallery ────────
const staticGalleryImages = staticDesignerOutfits.map(item => ({
  id: `static-${item.id}`,
  url: item.image,
  alt: item.alt,
  title: item.title,
}));

const FILTERS = [
  { key: 'all',          label: 'All'               },
  { key: 'gowns',        label: 'Designer Gowns'    },
  { key: 'indo-western', label: 'Indo-Western Sets' },
  { key: 'party-wear',   label: 'Party Wear'        },
];

const designerServiceItems = [
  'Custom gown design consultation',
  'Indo-western outfit styling',
  'Party wear customization',
  'Fabric and silhouette selection',
  'Fit and finishing trials',
  'Styling guidance based on event',
];

const whyItems = [
  'Customized Fit for Your Body Type',
  'Modern & Trend-Focused Designs',
  'Premium Stitching & Finishing',
  'Personalized Styling Consultation',
  'On-Time Delivery Commitment',
];

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    description:
      'Share your event date, style preferences, and outfit ideas. Chief Designer Shruthi Ajith will guide you personally from the first call.',
  },
  {
    step: '02',
    title: 'Design Direction',
    description:
      'We finalize silhouette, fabric, embellishments, and styling together — ensuring every detail matches your vision and occasion.',
  },
  {
    step: '03',
    title: 'Trial & Finish',
    description:
      'Trials are scheduled around your event timeline. Final fitting and delivery planned so you receive your outfit well before your special day.',
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const WaIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

// ─── 1. Explore Styles Section (STRICTLY STATIC — no API, no hooks) ───────────
function DesignerOutfits() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredData =
    activeFilter === 'all'
      ? staticDesignerOutfits
      : staticDesignerOutfits.filter(o => o.tag === activeFilter);

const mappedImages = filteredData.map((o) => ({
  id: String(o.id),
  url: o.image,
  thumbUrl: o.image,
  alt: o.alt,
  title: o.title,
  description: o.description,  // ✅ use actual description
}));

  return (
    <div className="ds-outfits">
      <div className="ds-filters">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`ds-filter-pill${activeFilter === f.key ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ImageGrid
        images={mappedImages}
        loading={false}
        priority
        columnsClassName="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
      />
    </div>
  );
}
// ─── 2. Gallery Section — static 11 images + admin-uploaded images merged ──────
function DesignerGallery({ images, loading }) {
  const adminImages = images || [];
  
  const staticMapped = staticDesignerOutfits.map((o) => ({
    id: `static-${o.id}`,
    url: o.image,
    thumbUrl: o.image,
    alt: o.alt,
    title: o.title,
    description: o.description,
  }));

  const mergedImages = [...staticMapped, ...adminImages];

  if (loading) {
    return (
      <div className="ds-gallery-loading">
        <p className="ds-gallery-note">Loading gallery…</p>
      </div>
    );
  }

  return (
    <ImageGrid
      images={mergedImages.slice(0, 100)}
      loading={false}
      priority
      columnsClassName="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
    />
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function Designer() {
  const [reviews, setReviews]               = useState(fallbackReviews);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const { media: heroMedia } = useHeroMedia('designer');

  const { images: designerGallery, loading: galleryLoading } = useGallery('designer');

  useEffect(() => {
    let mounted = true;
    fetchReviews()
      .then(res => { if (mounted && res.reviews?.length) setReviews(res); })
      .finally(() => { if (mounted) setReviewsLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <style>{`
        /* ── Variables ── */
        :root {
          --c-primary:   #3E2C23;
          --c-secondary: #EAE3DC;
          --c-bg:        #F8F6F3;
          --c-accent:    #C8A96A;
          --c-text:      #2A1E17;
          --c-muted:     #7A6A60;
          --c-white:     #FFFFFF;
          --r-lg: 24px;
          --r-sm: 14px;
        }
        body { background: var(--c-bg); }

        /* ── HERO ── */
        .ds-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 88vh;
          align-items: center;
          background: var(--c-bg);
          position: relative;
          overflow: hidden;
        }
        .ds-hero::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 55% 65% at 28% 50%, rgba(200,169,106,.09) 0%, transparent 70%);
        }
        .ds-hero-text { padding: 80px 40px 80px 5vw; z-index: 2; }
        .ds-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing:.18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 18px;
        }
        .ds-eyebrow::before { content:''; width:28px; height:1px; background:var(--c-accent); display:block; }
        .ds-hero-h1 {
          font: 700 clamp(1.9rem,3.2vw,3rem)/1.2 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 20px;
        }
        .ds-hero-h1 span { display: block; color: var(--c-accent); }
        .ds-hero-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: var(--c-muted); max-width: 440px; margin-bottom: 10px;
        }
        .ds-hero-designer {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-primary);
          margin-bottom: 8px;
        }
        .ds-hero-designer::before {
          content: '✦';
          color: var(--c-accent);
          font-size: 14px;
        }
        .ds-hero-price {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font: 700 16px/1.4 'Poppins', sans-serif;
          color: var(--c-muted);
          margin-bottom: 16px;
        }
        .ds-hero-price strong {
          color: var(--c-primary);
          font-size: 18px;
        }
        .ds-hero-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Buttons */
        .ds-btn-pri {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-primary); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-primary); transition: box-shadow .25s, transform .2s;
        }
        .ds-btn-pri:hover { box-shadow: 0 0 0 4px rgba(62,44,35,.15),0 6px 24px rgba(62,44,35,.25); transform: translateY(-1px); }
        .ds-btn-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--c-primary);
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-primary); transition: background .2s, color .2s;
        }
        .ds-btn-sec:hover { background: var(--c-primary); color: #fff; }

        /* Hero image */
        .ds-hero-img-wrap { position: relative; height: 88vh; overflow: hidden; }
        .ds-hero-img { width:100%; height:100%; object-fit:cover; object-position:center top; }
        .ds-hero-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to right, var(--c-bg) 0%, transparent 16%);
        }

        /* ── SHELLS ── */
        .ds-shell { max-width: 1280px; margin: 0 auto; padding: 80px 5vw; }
        .ds-alt { background: var(--c-secondary); }
        .ds-alt-inner { max-width: 1280px; margin: 0 auto; padding: 80px 5vw; }

        /* ── SECTION HEADINGS ── */
        .ds-sec-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing:.18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 14px;
        }
        .ds-sec-eyebrow::before { content:''; width:22px; height:1px; background:var(--c-accent); display:block; }
        .ds-sec-h2 {
          font: 700 clamp(1.6rem,2.6vw,2.3rem)/1.25 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 12px;
        }
        .ds-sec-sub {
          font: 400 .95rem/1.75 'Poppins',sans-serif;
          color: var(--c-muted); max-width: 560px;
        }

        /* ── TRUST BAR ── */
        .ds-trust-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .ds-trust-card {
          background: var(--c-white); border-radius: var(--r-lg); padding: 28px 26px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
        }
        .ds-trust-label {
          font: 600 10px/1 'Poppins',sans-serif; letter-spacing:.22em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 14px;
        }
        .ds-trust-title {
          font: 700 1.3rem/1.25 'Playfair Display',serif; color: var(--c-primary); margin-bottom: 10px;
        }
        .ds-trust-desc { font: 400 .85rem/1.7 'Poppins',sans-serif; color: var(--c-muted); }

        /* ── EXPLORE STYLES / FILTER (static only) ── */
        .ds-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; margin-top: 32px; }
        .ds-filter-pill {
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-primary);
          border: 1.5px solid rgba(62,44,35,.2); border-radius: 50px;
          padding: 9px 22px; background: transparent; cursor: pointer;
          transition: background .18s, color .18s, border-color .18s;
        }
        .ds-filter-pill:hover { background: rgba(62,44,35,.06); }
        .ds-filter-pill.active { background: var(--c-primary); color: #fff; border-color: var(--c-primary); }
        .ds-outfit-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
        }
        .ds-outfit-card {
          border-radius: var(--r-lg); overflow: hidden; position: relative;
          aspect-ratio: 3/4; background: var(--c-secondary);
          box-shadow: 0 2px 16px rgba(62,44,35,.08);
          transition: transform .3s, box-shadow .3s;
        }
        .ds-outfit-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(62,44,35,.14); }
        .ds-outfit-img { width:100%; height:100%; object-fit:cover; display:block; }
        /* Label hidden — clean image only */
        .ds-outfit-label { display: none; }

        /* ── LINKED IMAGE BANNER (above Services) ── */
        .ds-img-banner-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 5vw 64px;
        }
        .ds-img-banner-link {
          display: block;
          border-radius: var(--r-lg);
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 28px rgba(62,44,35,.12);
          transition: box-shadow .3s, transform .3s;
          text-decoration: none;
        }
        .ds-img-banner-link:hover {
          box-shadow: 0 12px 40px rgba(62,44,35,.2);
          transform: translateY(-3px);
        }
        .ds-img-banner-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .ds-img-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(62,44,35,.7) 0%,
            rgba(62,44,35,.2) 55%,
            transparent 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 40px 44px;
        }
        .ds-img-banner-content { max-width: 520px; }
        .ds-img-banner-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 10px/1 'Poppins',sans-serif; letter-spacing:.2em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 12px;
        }
        .ds-img-banner-eyebrow::before { content:''; width:18px; height:1px; background:var(--c-accent); display:block; }
        .ds-img-banner-title {
          font: 700 clamp(1.3rem,2.2vw,1.9rem)/1.25 'Playfair Display',serif;
          color: #fff; margin-bottom: 14px;
        }
        .ds-img-banner-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-accent); color: #fff;
          font: 600 12px/1 'Poppins',sans-serif; padding: 12px 24px;
          border-radius: 50px;
          transition: box-shadow .2s;
        }
        .ds-img-banner-link:hover .ds-img-banner-cta {
          box-shadow: 0 0 0 4px rgba(200,169,106,.35);
        }
        .ds-img-banner-arrow {
          font-size: 16px;
          transition: transform .2s;
        }
        .ds-img-banner-link:hover .ds-img-banner-arrow { transform: translateX(4px); }

        /* ── SERVICES HEADLINE ── */
        .ds-services-headline { margin-bottom: 0; }
        .ds-services-headline .ds-sec-eyebrow { margin-bottom: 14px; }
        .ds-services-headline .ds-sec-h2 { margin-bottom: 12px; }
        .ds-services-headline .ds-sec-sub { max-width: 640px; }

        /* ── CONSULT BANNER ── */
        .ds-consult-banner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
          background: var(--c-primary); border-radius: 20px;
          padding: 36px 44px;
          margin-top: 0;
        }
        .ds-consult-title {
          font: 700 clamp(1.2rem,2vw,1.6rem)/1.3 'Playfair Display',serif;
          color: #fff; margin-bottom: 8px;
        }
        .ds-consult-sub {
          font: 400 .88rem/1.6 'Poppins',sans-serif;
          color: rgba(255,255,255,.65);
        }
        .ds-consult-btns { display: flex; gap: 12px; flex-shrink: 0; flex-wrap: wrap; }
        .ds-btn-primary-light {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-accent); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-accent); transition: box-shadow .2s, transform .2s;
        }
        .ds-btn-primary-light:hover { box-shadow: 0 0 0 4px rgba(200,169,106,.3); transform: translateY(-1px); }
        .ds-btn-secondary-light {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid rgba(255,255,255,.4); transition: background .2s;
        }
        .ds-btn-secondary-light:hover { background: rgba(255,255,255,.1); }

        /* ── GALLERY ── */
        .ds-gallery-loading { padding: 40px 0; text-align: center; }
        .ds-gallery-note {
          font: 400 .82rem/1.5 'Poppins',sans-serif; color: var(--c-muted);
          font-style: italic; margin-top: 28px; text-align: center;
        }

        /* ── WHY SHRUSARA ── */
        .ds-why-wrap {
          background: var(--c-white); border-radius: 32px; padding: 40px 36px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 4px 24px rgba(62,44,35,.07);
        }
        .ds-why-designer {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-accent);
          margin-top: 10px; margin-bottom: 32px;
        }
        .ds-why-designer::before { content:'✦'; font-size:10px; }
        .ds-why-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 14px; }
        .ds-why-item {
          background: var(--c-bg); border-radius: var(--r-sm); padding: 20px 16px;
          text-align: center; border: 1px solid rgba(62,44,35,.07);
        }
        .ds-why-icon { color: var(--c-accent); font-size: 18px; margin-bottom: 10px; }
        .ds-why-text { font: 600 .78rem/1.5 'Poppins',sans-serif; color: var(--c-primary); }

        /* ── PROCESS ── */
        .ds-process-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 40px; }
        .ds-process-card {
          background: var(--c-white); border-radius: var(--r-lg); padding: 32px 28px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
          position: relative; overflow: hidden;
        }
        .ds-process-card::before {
          content: attr(data-step);
          position: absolute; top: -10px; right: 16px;
          font: 700 5rem/1 'Playfair Display',serif; color: rgba(200,169,106,.1);
          pointer-events: none;
        }
        .ds-process-step {
          display: inline-block; font: 700 11px/1 'Poppins',sans-serif;
          letter-spacing:.15em; text-transform:uppercase; color: var(--c-accent);
          margin-bottom: 16px;
        }
        .ds-process-title {
          font: 700 1.3rem/1.25 'Playfair Display',serif; color: var(--c-primary); margin-bottom: 12px;
        }
        .ds-process-desc { font: 400 .85rem/1.7 'Poppins',sans-serif; color: var(--c-muted); }

        /* ── REVIEWS BADGE ── */
        .ds-reviews-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--c-primary); color: #fff;
          font: 700 14px/1 'Poppins',sans-serif;
          padding: 12px 24px; border-radius: 50px;
          margin-bottom: 32px;
        }
        .ds-reviews-badge-stars { color: var(--c-accent); letter-spacing: 2px; font-size: 13px; }

        /* ── FINAL CTA ── */
        .ds-cta-wrap {
          background: var(--c-primary); border-radius: 32px; padding: 64px 56px;
          text-align: center; position: relative; overflow: hidden;
        }
        .ds-cta-wrap::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,169,106,.12) 0%, transparent 70%);
        }
        .ds-cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing:.18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 20px;
        }
        .ds-cta-eyebrow::before { content:''; width:22px; height:1px; background:var(--c-accent); display:block; }
        .ds-cta-eyebrow::after  { content:''; width:22px; height:1px; background:var(--c-accent); display:block; }
        .ds-cta-h {
          font: 700 clamp(1.6rem,2.8vw,2.6rem)/1.2 'Playfair Display',serif;
          color: #fff; margin-bottom: 18px;
        }
        .ds-cta-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: rgba(255,255,255,.75); max-width: 520px; margin: 0 auto 12px;
        }
        .ds-cta-designer {
          font: 600 12.5px/1 'Poppins',sans-serif; color: var(--c-accent); margin-bottom: 12px;
        }
        .ds-cta-scarcity {
          display: inline-flex; align-items: center; gap: 6px;
          font: 500 12px/1 'Poppins',sans-serif; color: rgba(255,255,255,.55);
          margin-bottom: 36px;
        }
        .ds-cta-scarcity::before { content:'⚑'; font-size:11px; }
        .ds-cta-btns { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .ds-cta-btn-pri {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-accent); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-accent); transition: box-shadow .2s, transform .2s;
        }
        .ds-cta-btn-pri:hover { box-shadow: 0 0 0 4px rgba(200,169,106,.3); transform: translateY(-1px); }
        .ds-cta-btn-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid rgba(255,255,255,.35); transition: background .2s;
        }
        .ds-cta-btn-sec:hover { background: rgba(255,255,255,.1); }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          .ds-why-grid{grid-template-columns:repeat(3,1fr);}
          .ds-process-grid{grid-template-columns:1fr 1fr;}
        }
        @media(max-width:768px){
          .ds-hero{grid-template-columns:1fr;min-height:auto;}
          .ds-hero-text{padding:50px 5vw 32px;order:2;}
          .ds-hero-img-wrap{order:1;height:55vw;min-height:280px;}
          .ds-hero-fade{background:linear-gradient(to bottom,transparent 60%,var(--c-bg) 100%);}
          .ds-hero-btns{flex-direction:column;}
          .ds-btn-pri,.ds-btn-sec{width:100%;justify-content:center;}
          .ds-shell{padding:50px 5vw;}
          .ds-alt-inner{padding:50px 5vw;}
          .ds-trust-grid{grid-template-columns:1fr;}
          .ds-outfit-grid{grid-template-columns:repeat(2,1fr);}
          .ds-svc-grid{grid-template-columns:1fr;}
          .ds-svc-items{grid-template-columns:1fr;}
          .ds-why-grid{grid-template-columns:repeat(2,1fr);}
          .ds-process-grid{grid-template-columns:1fr;}
          .ds-cta-wrap{padding:40px 24px;}
          .ds-cta-btns{flex-direction:column;align-items:center;}
          .ds-cta-btn-pri,.ds-cta-btn-sec{width:100%;justify-content:center;}
          .ds-consult-banner{flex-direction:column;align-items:flex-start;padding:28px 24px;}
          .ds-consult-btns{width:100%;}
          .ds-btn-primary-light,.ds-btn-secondary-light{width:100%;justify-content:center;}
          .ds-img-banner-img{height:260px;}
          .ds-img-banner-overlay{padding:24px 24px;}
          .ds-img-banner-wrap{padding-bottom:40px;}
        }

        /* ── EXACT IMAGE STYLE BANNER ── */
        .ds-image-match-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          background: #3E2C23;
          border-radius: 40px;
          padding: 60px 80px;
          margin: 60px auto;
          max-width: 1200px;
          width: 90%;
        }
        .ds-image-match-content { flex: 1; }
        .ds-image-match-title {
          font: 600 2.4rem/1.2 'Playfair Display', serif !important;
          color: #FFFFFF !important;
          margin-bottom: 12px;
        }
        .ds-image-match-sub {
          font: 400 1.1rem 'Poppins', sans-serif !important;
          color: rgba(255, 255, 255, 0.7) !important;
          margin: 0;
        }
        .ds-image-match-btns {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .ds-btn-gold-pill {
          background: #C8A96A;
          color: #FFFFFF;
          text-decoration: none;
          font: 600 15px 'Poppins', sans-serif;
          padding: 20px 40px;
          border-radius: 100px;
          transition: transform 0.2s;
          white-space: nowrap;
        }
        .ds-btn-outline-pill {
          background: transparent;
          color: #FFFFFF;
          text-decoration: none;
          font: 600 15px 'Poppins', sans-serif;
          padding: 20px 40px;
          border-radius: 100px;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          transition: background 0.2s;
          white-space: nowrap;
        }
        .ds-btn-gold-pill:hover { transform: scale(1.02); }
        .ds-btn-outline-pill:hover { background: rgba(255,255,255,0.1); }

        @media (max-width: 992px) {
          .ds-image-match-banner {
            flex-direction: column;
            text-align: center;
            padding: 40px 30px;
            align-items: center;
          }
          .ds-image-match-btns {
            flex-direction: column;
            width: 100%;
          }
          .ds-btn-gold-pill, .ds-btn-outline-pill {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <PageMeta
        title="Designer Outfits in Bangalore | Gowns, Indo-Western & Party Wear"
        description="Explore customized designer outfits in Bangalore including gowns, Indo-western sets, and party wear with premium tailoring and personalized styling at Shrusara Fashion Boutique."
        canonicalPath="/designer-outfits-bangalore"
      />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="ds-hero">
        <div className="ds-hero-text">
          <p className="ds-eyebrow">Designer Outfits · Bangalore</p>
          <h1 className="ds-hero-h1">
            Designer Outfits in Bangalore for Modern Occasions
            <span>Customized gowns, Indo-western outfits, and party wear designed with
            perfect fit, premium finishing and modern styling.</span>
          </h1>

          <p className="ds-line">
            <span className="ds-star">✦</span>
            <span>Styled personally by Chief Designer Shruthi Ajith</span>
          </p>

          <p className="ds-line">
            <span className="ds-star">✦</span>
            <span>
              Designer outfits starting at <strong>₹5000</strong> onwards
            </span>
            <br/>
          </p>
          <br/>
          <div className="ds-hero-btns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ds-btn-pri" onClick={() => trackWhatsApp('designer_hero')}>
  <WaIcon size={18} /> WhatsApp Enquiry
</a>
           <a href={TEL_LINK} className="ds-btn-sec" onClick={() => trackPhoneCall('designer_hero')}>
  <PhoneIcon /> Call Now
</a>
          </div>
        </div>
        <div className="ds-hero-img-wrap">
          <img
            src="/videos/desingerhero.webp"
            alt="Designer outfits Bangalore – Shrusara Fashion Boutique"
            className="ds-hero-img"
          />
          <div className="ds-hero-fade" />
        </div>
      </section>

      {/* ── 2. APPROACH SECTION ─────────────────────────────────────────────── */}
      <Reveal className="ds-shell">
        <p className="ds-sec-eyebrow">Occasionwear</p>
        <h2 className="ds-sec-h2">Outfits designed to match your occasion, style, and comfort</h2>
        <p className="ds-sec-sub">
          From receptions to parties and festive events, each outfit is customized to suit
          your body type, styling preference and event requirement.
        </p>
        <div className="ds-trust-grid" style={{ marginTop: 36 }}>
          {[
            { value: 'Made for you',  label: 'Pattern and silhouette adjusted to your body type and occasion.' },
            { value: 'Style first',   label: 'Modern designs balanced with comfort so you feel as good as you look.' },
            { value: 'Timely finish', label: 'Trials and final delivery planned carefully around your event date.' },
          ].map(item => (
            <div key={item.value} className="ds-trust-card">
              <p className="ds-trust-label">Our Approach</p>
              <h3 className="ds-trust-title">{item.value}</h3>
              <p className="ds-trust-desc">{item.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 3. EXPLORE STYLES (STRICTLY STATIC — clean image grid, no labels) ── */}
      <div className="ds-alt">
        <div className="ds-alt-inner">
          <p className="ds-sec-eyebrow">Explore Styles</p>
          <h2 className="ds-sec-h2">Designer Gowns, Indo-Western Sets &amp; Party Wear</h2>
          <p className="ds-sec-sub">
            Browse our customized designer outfits crafted for receptions, parties, and festive occasions.
          </p>
          <DesignerOutfits />
        </div>
      </div>

      {/* ── 3b. CTA BANNER ──────────────────────────────────────────────────── */}
      <div className="ds-image-match-banner">
        <div className="ds-image-match-content">
          <h2 className="ds-image-match-title">
            Join our happy clients — book your consultation today
          </h2>
          <p className="ds-image-match-sub">
            Start your bridal consultation
          </p>
        </div>
        <div className="ds-image-match-btns">
         <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ds-btn-gold-pill" onClick={() => trackWhatsApp('designer_banner')}>
  WhatsApp Enquiry
</a>
          <a href={TEL_LINK} className="ds-btn-outline-pill">
            Call Now
          </a>
        </div>
      </div>

      {/* ── 4. SERVICE SECTION ──────────────────────────────────────────────── */}
      <Reveal className="ds-shell" style={{ paddingTop: 0 }}>
        <div className="ds-services-headline">
          <p className="ds-sec-eyebrow">Services</p>
          <h2 className="ds-sec-h2">Customized Designer Outfits &amp; Occasionwear in Bangalore</h2>
          <p className="ds-sec-sub">
            From gowns to Indo-western sets and party wear, we create perfectly tailored designs with
            premium finishing and personalized styling — designed for perfect fit, elegant finish.
          </p>
        </div>
      </Reveal>

      <div className="ds-shell" style={{ paddingTop: 0 }}>
        <div className="ds-consult-banner">
          <div>
            <h2 className="ds-consult-title">Join our happy clients — book your consultation today</h2>
            <p className="ds-consult-sub">Book Your Designer Outfit Consultation Today</p>
          </div>
          <div className="ds-consult-btns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ds-btn-primary-light" onClick={() => trackWhatsApp('designer_consult_banner')}>
  WhatsApp Enquiry
</a>
            <a href={TEL_LINK} className="ds-btn-secondary-light">
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* ── 5. GALLERY — 11 static images + admin-uploaded images merged ─────── */}
      <div className="ds-alt">
        <div className="ds-alt-inner">
          <p className="ds-sec-eyebrow">Gallery</p>
          <h2 className="ds-sec-h2">Designer Outfit Gallery</h2>
          <p className="ds-sec-sub">
            A collection of customized gowns, Indo-western outfits, and party wear designed
            with premium detailing and modern styling.
          </p>
          <div style={{ marginTop: 36 }}>
            <DesignerGallery images={designerGallery} loading={galleryLoading} />
          </div>
          <p className="ds-gallery-note">
            Showing our latest gallery from the studio · Admin can update these images from the dashboard
          </p>
        </div>
      </div>

      {/* ── 6. WHY SHRUSARA ─────────────────────────────────────────────────── */}
      <Reveal className="ds-shell">
        <div className="ds-why-wrap">
          <p className="ds-sec-eyebrow">Why Shrusara</p>
          <h2 className="ds-sec-h2">A designer process focused on fit, style, and finish</h2>
          <p className="ds-sec-sub">
            We focus on modern designs, premium finishing, and a perfect fit so your outfit
            feels effortless on your occasion.
          </p>
          <p className="ds-why-designer">Handled personally by Chief Designer Shruthi Ajith</p>
          <div className="ds-why-grid">
            {whyItems.map(item => (
              <div key={item} className="ds-why-item">
                <div className="ds-why-icon">✦</div>
                <p className="ds-why-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 7. PROCESS ──────────────────────────────────────────────────────── */}
      <div className="ds-alt">
        <div className="ds-alt-inner">
          <p className="ds-sec-eyebrow">Process</p>
          <h2 className="ds-sec-h2">A simple boutique flow from consultation to final fitting</h2>
          <p className="ds-sec-sub">
            Clear steps so you know exactly what to expect at every stage.
          </p>
          <div className="ds-process-grid">
            {processSteps.map(step => (
              <article key={step.title} className="ds-process-card" data-step={step.step}>
                <span className="ds-process-step">Step {step.step}</span>
                <h3 className="ds-process-title">{step.title}</h3>
                <p className="ds-process-desc">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. REVIEWS ──────────────────────────────────────────────────────── */}
      <Reveal className="ds-shell">
        <div className="ds-reviews-badge">
          <span className="ds-reviews-badge-stars">★★★★★</span>
          100+ Happy Clients in Bangalore
        </div>
        <ReviewsSection
          payload={reviews}
          loading={reviewsLoading}
          description="Real experiences from clients who trusted Shrusara for their special occasions."
        />
      </Reveal>

      {/* ── 9. FINAL CTA ────────────────────────────────────────────────────── */}
      <div className="ds-shell" style={{ paddingTop: 0 }}>
        <div className="ds-cta-wrap">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <p className="ds-cta-eyebrow">Limited Slots Available</p>
          </div>
          <h2 className="ds-cta-h">Book Your Designer Outfit Consultation Today</h2>
          <p className="ds-cta-sub">
            Tell us your event, preferred style, and design ideas.
            Our Chief Designer Shruthi Ajith will guide you with the right outfit for your occasion.
          </p>
          <p className="ds-cta-designer">
            Personally guided by Chief Designer Shruthi Ajith
          </p>
          <p className="ds-cta-scarcity">Limited slots available each week</p>
          <div className="ds-cta-btns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ds-cta-btn-pri" onClick={() => trackWhatsApp('designer_cta')}>
  <WaIcon size={18} /> WhatsApp Enquiry
</a>
            <a href={TEL_LINK} className="ds-cta-btn-sec">
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}