import { useEffect, useState } from 'react';
import ImageGrid from '../components/ImageGrid';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import ReviewsSection from '../components/ReviewsSection';
import { fallbackReviews } from '../data/content';
import useMergedGallery from '../hooks/useMergedGallery';
import useHeroMedia from '../hooks/useHeroMedia';
import { fetchReviews } from '../services/api';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919741827558';
const PHONE_NUMBER    = import.meta.env.VITE_PHONE_NUMBER    || '9741827558';
const DESIGNER_MSG    = encodeURIComponent(
  'Hi, I am looking for a customized designer outfit consultation. Please share details.'
);
const WA_LINK  = `https://wa.me/${WHATSAPP_NUMBER}?text=${DESIGNER_MSG}`;
const TEL_LINK = `tel:${PHONE_NUMBER}`;

// ─── Designer outfits data with filter tags ───────────────────────────────────
const designerOutfits = [
  { id: 1, tag: 'gowns',         title: 'Designer Gown',          image: '/images/designer/gown-1.jpg' },
  { id: 2, tag: 'indo-western',  title: 'Indo-Western Set',        image: '/images/designer/indo-1.jpg' },
  { id: 3, tag: 'party-wear',    title: 'Party Wear',              image: '/images/designer/party-1.jpg' },
  { id: 4, tag: 'gowns',         title: 'Flared Gown',             image: '/images/designer/gown-2.jpg' },
  { id: 5, tag: 'indo-western',  title: 'Fusion Kurta Set',        image: '/images/designer/indo-2.jpg' },
  { id: 6, tag: 'party-wear',    title: 'Embellished Party Wear',  image: '/images/designer/party-2.jpg' },
];

const FILTERS = [
  { key: 'all',          label: 'All' },
  { key: 'gowns',        label: 'Designer Gowns' },
  { key: 'indo-western', label: 'Indo-Western Sets' },
  { key: 'party-wear',   label: 'Party Wear' },
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
    description: 'Share your event date, style preferences, and outfit ideas. Chief Designer Shruthi Ajith will guide you personally from the first call.',
  },
  {
    step: '02',
    title: 'Design Direction',
    description: 'We finalize silhouette, fabric, embellishments, and styling together — ensuring every detail matches your vision and occasion.',
  },
  {
    step: '03',
    title: 'Trial & Finish',
    description: 'Trials are scheduled around your event timeline. Final fitting and delivery planned so you receive your outfit well before your special day.',
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const WaIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

// ─── Designer Outfits Filter Section ─────────────────────────────────────────
function DesignerOutfits({ galleryImages, galleryLoading }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? designerOutfits
    : designerOutfits.filter(o => o.tag === activeFilter);

  return (
    <div className="ds-outfits">
      {/* Filter pills */}
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

      {/* Grid — uses dynamic gallery images from admin if available, else static */}
      {galleryImages && galleryImages.length > 0 ? (
        <div className="ds-outfit-grid">
          {(activeFilter === 'all' ? galleryImages : galleryImages.slice(0, 4)).map((img, i) => (
            <div key={i} className="ds-outfit-card">
              <img src={img.src || img.url || img} alt={img.alt || `Designer outfit ${i + 1}`} loading="lazy" className="ds-outfit-img" />
            </div>
          ))}
        </div>
      ) : (
        <div className="ds-outfit-grid">
          {filtered.map(item => (
            <div key={item.id} className="ds-outfit-card">
              <img src={item.image} alt={item.title} loading="lazy" className="ds-outfit-img" />
              <div className="ds-outfit-label">{item.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function Designer() {
  const [reviews, setReviews]               = useState(fallbackReviews);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const { media: heroMedia }                = useHeroMedia('designer');
  const { images: designerGallery, loading: galleryLoading } = useMergedGallery('designer');

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
        /* ── Variables (same palette as Bridal) ── */
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
        .ds-hero-designer::before { content:'✦'; color:var(--c-accent); font-size:10px; }
        .ds-hero-price {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-muted);
          margin-bottom: 32px;
        }
        .ds-hero-price strong { color: var(--c-primary); }
        .ds-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }

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

        /* ── DESIGNER OUTFITS / FILTER ── */
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
        .ds-outfit-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 18px 16px 16px;
          background: linear-gradient(to top, rgba(62,44,35,.75) 0%, transparent 100%);
          font: 600 13px/1.3 'Poppins',sans-serif; color: #fff;
        }

        /* ── SERVICES ── */
        .ds-svc-grid {
          display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 24px; margin-top: 0;
        }
        .ds-svc-intro {
          background: var(--c-white); border-radius: var(--r-lg); padding: 32px 28px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
          display: flex; flex-direction: column; justify-content: center;
        }
        .ds-svc-items { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ds-svc-item {
          background: var(--c-white); border-radius: var(--r-sm); padding: 20px 20px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 12px rgba(62,44,35,.06);
          display: flex; align-items: flex-start; gap: 12px;
        }
        .ds-svc-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--c-accent);
          flex-shrink: 0; margin-top: 5px;
        }
        .ds-svc-text { font: 500 .88rem/1.5 'Poppins',sans-serif; color: var(--c-primary); }

        /* ── GALLERY ── */
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
        }
        @media(max-width:480px){
          .ds-outfit-grid{grid-template-columns:1fr;}
          .ds-why-grid{grid-template-columns:1fr;}
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
            <span>Gowns, Indo-Western &amp; Party Wear with Premium Finish</span>
          </h1>
          <p className="ds-hero-sub">
            Customized gowns, Indo-western outfits, and party wear designed with
            perfect fit, premium finishing and modern styling.
          </p>
          <p className="ds-hero-designer">Styled personally by Chief Designer Shruthi Ajith</p>
          <p className="ds-hero-price">Designer outfits starting from <strong>₹5000</strong> onwards</p>
          <div className="ds-hero-btns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ds-btn-pri">
              <WaIcon size={18} /> WhatsApp Enquiry
            </a>
            <a href={TEL_LINK} className="ds-btn-sec">
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>
        <div className="ds-hero-img-wrap">
          <img
            src={heroMedia?.imageUrl || '/videos/designer.png'}
            alt="Designer outfits Bangalore – Shrusara Fashion Boutique"
            className="ds-hero-img"
          />
          <div className="ds-hero-fade" />
        </div>
      </section>

      {/* ── 2. OCCASION SECTION (replaces Occasionwear) ─────────────────────── */}
      <Reveal className="ds-shell">
        <p className="ds-sec-eyebrow">Occasionwear</p>
        <h2 className="ds-sec-h2">Outfits designed to match your occasion, style, and comfort</h2>
        <p className="ds-sec-sub">
          From receptions to parties and festive events, each outfit is customized to suit
          your body type, styling preference and event requirement.
        </p>
        <div className="ds-trust-grid" style={{ marginTop: 36 }}>
          {[
            { value: 'Made for you',    label: 'Pattern and silhouette adjusted to your body type and occasion.' },
            { value: 'Style first',     label: 'Modern designs balanced with comfort so you feel as good as you look.' },
            { value: 'Timely finish',   label: 'Trials and final delivery planned carefully around your event date.' },
          ].map(item => (
            <div key={item.value} className="ds-trust-card">
              <p className="ds-trust-label">Our Approach</p>
              <h3 className="ds-trust-title">{item.value}</h3>
              <p className="ds-trust-desc">{item.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 3. EXPLORE STYLES WITH FILTER ───────────────────────────────────── */}
      <div className="ds-alt">
        <div className="ds-alt-inner">
          <p className="ds-sec-eyebrow">Explore Styles</p>
          <h2 className="ds-sec-h2">Designer Gowns, Indo-Western Sets &amp; Party Wear</h2>
          <p className="ds-sec-sub">
            Browse our customized designer outfits crafted for receptions, parties, and festive occasions.
          </p>
          <DesignerOutfits galleryImages={designerGallery} galleryLoading={galleryLoading} />
        </div>
      </div>

      {/* ── 4. SERVICE SECTION ──────────────────────────────────────────────── */}
      <Reveal className="ds-shell">
        <div className="ds-svc-grid">
          <div className="ds-svc-intro">
            <p className="ds-sec-eyebrow">Services</p>
            <h2 className="ds-sec-h2">What We Design for Your Occasion</h2>
            <p className="ds-sec-sub">
              From concept to final fitting, we ensure every outfit is styled to suit your event perfectly.
            </p>
          </div>
          <div className="ds-svc-items">
            {designerServiceItems.map(item => (
              <div key={item} className="ds-svc-item">
                <span className="ds-svc-dot" />
                <p className="ds-svc-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 5. GALLERY ──────────────────────────────────────────────────────── */}
      <div className="ds-alt">
        <div className="ds-alt-inner">
          <p className="ds-sec-eyebrow">Gallery</p>
          <h2 className="ds-sec-h2">Designer Outfit Gallery</h2>
          <p className="ds-sec-sub">
            A collection of customized gowns, Indo-western outfits, and party wear designed
            with premium detailing and modern styling.
          </p>
          <div style={{ marginTop: 36 }}>
            <ImageGrid
              images={designerGallery.slice(0, 9)}
              loading={galleryLoading}
              priority
              columnsClassName="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
            />
          </div>
          <p className="ds-gallery-note">
            Showing our latest designer outfits · Updated regularly with new work
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

      {/* ── 8. REVIEWS with badge ───────────────────────────────────────────── */}
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
          <div style={{ display:'flex', justifyContent:'center', marginBottom:20 }}>
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
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ds-cta-btn-pri">
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