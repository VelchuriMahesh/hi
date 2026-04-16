import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '../components/ImageGrid';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import ReviewsSection from '../components/ReviewsSection';

import {
  fallbackReviews,
} from '../data/content';

const heroBridal = '/bridal/bridalblow/hero-bridal.webp';
import useMergedGallery from '../hooks/useMergedGallery';
import useHeroMedia from '../hooks/useHeroMedia';
import { fetchReviews } from '../services/api';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919741827558';
const PHONE_NUMBER    = import.meta.env.VITE_PHONE_NUMBER    || '9741827558';
const BRIDAL_MSG      = encodeURIComponent(
  'Hi, I am looking for a customized bridal blouse consultation. Please share details.'
);
const WA_LINK  = `https://wa.me/${WHATSAPP_NUMBER}?text=${BRIDAL_MSG}`;
const TEL_LINK = `tel:${PHONE_NUMBER}`;

// ─── Bridal outfits data — ALL IDs must be unique ────────────────────────────
const bridalOutfits = [
  {
    id: 1,
    tag: 'bridal-blouse',
    title: 'Custom Fit Muhurtham Silk Saree Blouse Bangalore',
    alt: 'Custom fit muhurtham silk saree blouse Bangalore',
    image: '/bridal/bridalblow/custom-fit-muhurtham-silk-saree-blouse-bangalore.webp',
  },
  {
    id: 2,
    tag: 'bridal-blouse',
    title: 'Designer Bridal Blouse Back Neck Pattern',
    alt: 'Designer bridal blouse back neck pattern Shrusara',
    image: '/bridal/bridalblow/designer-bridal-blouse-back-neck-pattern-shrusara.webp',
  },
  {
    id: 3,
    tag: 'bridal-blouse',
    title: 'Handcrafted Aari Work Wedding Blouse',
    alt: 'Handcrafted Aari work wedding blouse Shrusara boutique',
    image: '/bridal/bridalblow/handcrafted-aari-work-wedding-blouse-shrusara-bangalore-boutique.webp',
  },
  {
    id: 4,
    tag: 'bridal-blouse',
    title: 'Intricate Maggam Embroidery Bridal Blouse',
    alt: 'Intricate maggam embroidery bridal blouse Mahalakshmipuram',
    image: '/bridal/bridalblow/intricate-hand-embroidery-maggam-aari-bridal-wear-mahalakshmipuram.webp',
  },
  {
    id: 5,
    tag: 'bridal-blouse',
    title: 'Premium Antique Gold Temple Work Blouse',
    alt: 'Premium antique gold temple work bridal blouse Bangalore',
    image: '/bridal/bridalblow/premium-antique-gold-temple-work-bridal-blouse-shrusara-bangalore.webp',
  },
  {
    id: 6,
    tag: 'bridal-blouse',
    title: 'Premium Maggam Work Bridal Blouse',
    alt: 'Premium maggam work bridal blouse Mahalakshmipuram Shrusara',
    image: '/bridal/bridalblow/premium-maggam-work-bridal-blouse-mahalakshmipuram-shrusara.webp',
  },
  {
    id: 7,
    tag: 'bridal-blouse',
    title: 'Royal Heritage Bridal Maggam Blouse',
    alt: 'Royal heritage style bridal maggam blouse Bangalore',
    image: '/bridal/bridalblow/royal-heritage-style-bridal-maggam-blouse-bangalore.webp',
  },
  {
    id: 8,
    tag: 'bridal-blouse',
    title: 'Traditional South Indian Wedding Blouse',
    alt: 'Traditional South Indian wedding blouse gold zari work Shrusara boutique',
    image: '/bridal/bridalblow/traditional-south-indian-wedding-blouse-gold-zari-work-designed-shrusara-boutique.webp',
  },
  {
    id: 9,
    tag: 'bridal-blouse',
    title: 'Custom Made Bridal Reception Lehenga Shrusara',
    alt: 'Custom made bridal reception lehenga Shrusara',
    image: '/bridal/bridalblow/custom-made-bridal-reception-lehenga-shrusara.webp',
  },
  {
    id: 10,
    tag: 'lehenga',
    title: 'Luxury Bridal Lehenga',
    alt: 'Luxury bridal lehenga custom design Bangalore',
    image: '/bridal/Lehenga/luxury-bridal-lehenga-custom-design-bangalore.webp',
  },
  {
    id: 11,
    tag: 'lehenga',
    title: 'Custom Muhurtham Bridal Lehenga',
    alt: 'Custom made bridal muhurtham lehenga Shrusara',
    image: '/bridal/Lehenga/custom-made-bridal-muhurtham-lehenga-shrusara.webp',
  },
  {
    id: 12,
    tag: 'gowns',
    title: 'Elegant Reception Gown',
    alt: 'Elegant modern reception gown brides silhouette premium fabric',
    image: '/bridal/Gown/elegant-modern-reception-gown-brides-featuring-silhouette-premium-fabric.webp',
  },


];

const FILTERS = [
  { key: 'all',           label: 'All' },
  { key: 'bridal-blouse', label: 'Bridal Blouse' },
  { key: 'lehenga',       label: 'Lehenga' },
  { key: 'gowns',         label: 'Gowns' },
];

const bridalServiceItems = [
  'Bridal blouse consultation',
  'Maggam & Aari work',
  'Custom neck & sleeve designs',
  'Muhurtham & reception blouses',
  'Padded finishing',
  'Saree & blouse styling guidance',
];

const whyItems = [
  'Customized Fit for Your Body Type',
  'Expert Maggam & Aari Work',
  'Premium Stitching & Finishing',
  'Personalized Design Consultation',
  'On-Time Delivery Commitment',
];

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    description:
      'Share your wedding date, saree palette, and design preferences. Chief Designer Shruthi Ajith will guide you personally from the first call.',
  },
  {
    step: '02',
    title: 'Design Direction',
    description:
      'We finalize neckline, embroidery style, sleeve design, and fabric together — ensuring every detail matches your vision and bridal look.',
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

// ─── Bridal Outfits Filter Section — styled to match ImageGrid ───────────────
function BridalOutfits() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData =
    activeFilter === 'all'
      ? bridalOutfits
      : bridalOutfits.filter((o) => o.tag === activeFilter);

  return (
    <div className="br-outfits">
      {/* Filter pills */}
      <div className="br-filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`br-filter-pill${activeFilter === f.key ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid — styled exactly like ImageGrid cards */}
      <div className="br-outfit-grid">
        {filteredData.map((item, index) => (
          <motion.button
            key={`${item.id}-${item.tag}`}
            type="button"
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedItem(item)}
            className="br-outfit-card-btn"
          >
            <div className="br-outfit-card-inner">
              <div className="br-outfit-img-wrap">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading={index < 6 ? 'eager' : 'lazy'}
                  className="br-outfit-img"
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox modal */}
      {selectedItem && (
        <div className="br-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="br-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="br-modal-close" onClick={() => setSelectedItem(null)} aria-label="Close">✕</button>
            <img src={selectedItem.image} alt={selectedItem.alt} className="br-modal-img" />
            <p className="br-modal-title">{selectedItem.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function Bridal() {
  const [reviews, setReviews]               = useState(fallbackReviews);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const { media: heroMedia }                = useHeroMedia('bridal');
  const { images: bridalGallery, loading: galleryLoading } = useMergedGallery('bridal');

  useEffect(() => {
    let mounted = true;
    fetchReviews()
      .then((res) => {
        if (mounted && res.reviews?.length) setReviews(res);
      })
      .finally(() => {
        if (mounted) setReviewsLoading(false);
      });
    return () => {
      mounted = false;
    };
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
        .br-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 88vh;
          align-items: center;
          background: var(--c-bg);
          position: relative;
          overflow: hidden;
        }
        .br-hero::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 55% 65% at 28% 50%, rgba(200,169,106,.09) 0%, transparent 70%);
        }
        .br-hero-text { padding: 80px 40px 80px 5vw; z-index: 2; }
        .br-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing:.18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 18px;
        }
        .br-eyebrow::before { content:''; width:28px; height:1px; background:var(--c-accent); display:block; }
        .br-hero-h1 {
          font: 700 clamp(1.9rem,3.2vw,3rem)/1.2 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 20px;
        }
        .br-hero-h1 span { display: block; color: var(--c-accent); }
        .br-hero-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: var(--c-muted); max-width: 440px; margin-bottom: 10px;
        }
        .br-sub-flex { display: flex; align-items: flex-start; gap: 8px; }
        .br-star { color: #C8A96A; font-size: 14px; line-height: 1.6; flex-shrink: 0; margin-top: 2px; }
        .br-text { line-height: 1.7; }
        .br-hero-designer {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-primary);
          margin-bottom: 8px;
        }
        .br-hero-price {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-muted);
          margin-bottom: 32px;
        }
        .br-hero-price strong { color: var(--c-primary); }
        .br-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }

        /* Buttons */
        .br-btn-pri {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-primary); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-primary); transition: box-shadow .25s, transform .2s;
        }
        .br-btn-pri:hover { box-shadow: 0 0 0 4px rgba(62,44,35,.15),0 6px 24px rgba(62,44,35,.25); transform: translateY(-1px); }
        .br-btn-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--c-primary);
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-primary); transition: background .2s, color .2s;
        }
        .br-btn-sec:hover { background: var(--c-primary); color: #fff; }

        /* Hero image */
        .br-hero-img-wrap { position: relative; height: 88vh; overflow: hidden; }
        .br-hero-img { width:100%; height:100%; object-fit:cover; object-position:center top; }
        .br-hero-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to right, var(--c-bg) 0%, transparent 16%);
        }

        /* ── SHELLS ── */
        .br-shell { max-width: 1280px; margin: 0 auto; padding: 80px 5vw; }
        .br-alt { background: var(--c-secondary); }
        .br-alt-inner { max-width: 1280px; margin: 0 auto; padding: 80px 5vw; }

        /* ── SECTION HEADINGS ── */
        .br-sec-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing:.18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 14px;
        }
        .br-sec-eyebrow::before { content:''; width:22px; height:1px; background:var(--c-accent); display:block; }
        .br-sec-h2 {
          font: 700 clamp(1.6rem,2.6vw,2.3rem)/1.25 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 12px;
        }
        .br-sec-sub {
          font: 400 .95rem/1.75 'Poppins',sans-serif;
          color: var(--c-muted); max-width: 560px;
        }

        /* ── TRUST BAR ── */
        .br-trust-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .br-trust-card {
          background: var(--c-white); border-radius: var(--r-lg); padding: 28px 26px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
        }
        .br-trust-label {
          font: 600 10px/1 'Poppins',sans-serif; letter-spacing:.22em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 14px;
        }
        .br-trust-title {
          font: 700 1.3rem/1.25 'Playfair Display',serif; color: var(--c-primary); margin-bottom: 10px;
        }
        .br-trust-desc { font: 400 .85rem/1.7 'Poppins',sans-serif; color: var(--c-muted); }

        /* ── BRIDAL OUTFITS / FILTER ── */
        .br-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; margin-top: 32px; }
        .br-filter-pill {
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-primary);
          border: 1.5px solid rgba(62,44,35,.2); border-radius: 50px;
          padding: 9px 22px; background: transparent; cursor: pointer;
          transition: background .18s, color .18s, border-color .18s;
        }
        .br-filter-pill:hover { background: rgba(62,44,35,.06); }
        .br-filter-pill.active { background: var(--c-primary); color: #fff; border-color: var(--c-primary); }

        /* Outfit grid — matches ImageGrid exactly */
        .br-outfit-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        /* Button reset — same as ImageGrid motion.button */
        .br-outfit-card-btn {
          background: none; border: none; padding: 0; cursor: pointer;
          overflow: hidden; border-radius: 28px;
          border: 1px solid rgba(255,255,255,.6);
          background: rgba(255,255,255,.8);
          padding: 12px;
          text-align: left;
          box-shadow: 0 4px 24px rgba(62,44,35,.10);
          transition: box-shadow .3s;
          display: block; width: 100%;
        }
        .br-outfit-card-btn:hover {
          box-shadow: 0 12px 36px rgba(62,44,35,.16);
        }
        .br-outfit-card-inner { border-radius: 22px; overflow: hidden; }
        .br-outfit-img-wrap {
          aspect-ratio: 4 / 5;
          border-radius: 22px;
          overflow: hidden;
          background: var(--c-secondary);
        }
        .br-outfit-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform .35s ease;
        }
        .br-outfit-card-btn:hover .br-outfit-img { transform: scale(1.03); }

        /* ── LIGHTBOX MODAL ── */
        .br-modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,.75); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .br-modal-box {
          position: relative; max-width: 640px; width: 100%;
          background: var(--c-white); border-radius: 24px; overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,.3);
        }
        .br-modal-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          background: rgba(0,0,0,.5); color: #fff; border: none;
          border-radius: 50%; width: 36px; height: 36px; font-size: 16px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background .2s;
        }
        .br-modal-close:hover { background: rgba(0,0,0,.8); }
        .br-modal-img { width: 100%; max-height: 70vh; object-fit: contain; display: block; }
        .br-modal-title {
          padding: 16px 20px;
          font: 600 .9rem/1.4 'Poppins',sans-serif; color: var(--c-primary);
          text-align: center;
        }

        /* ── IMAGE BANNER ── */
        .br-image-match-banner {
          display: flex; justify-content: space-between; align-items: center;
          gap: 40px; background: #3E2C23; border-radius: 40px;
          padding: 60px 80px; margin: 60px auto; max-width: 1280px;
          width: 100%; box-sizing: border-box;
        }
        .br-image-match-content { flex: 1; }
        .br-image-match-title {
          font: 600 2.4rem/1.2 'Playfair Display', serif !important;
          color: #FFFFFF !important; margin-bottom: 12px;
        }
        .br-image-match-sub {
          font: 400 1.1rem 'Poppins', sans-serif !important;
          color: rgba(255,255,255,.7) !important; margin: 0;
        }
        .br-image-match-btns { display: flex; gap: 20px; align-items: center; }
        .br-btn-gold-pill {
          background: #C8A96A; color: #FFFFFF !important; text-decoration: none;
          font: 600 15px 'Poppins', sans-serif; padding: 20px 40px;
          border-radius: 100px; transition: transform .2s, box-shadow .2s;
          white-space: nowrap; display: inline-flex; align-items: center; gap: 8px;
        }
        .br-btn-outline-pill {
          background: transparent; color: #FFFFFF !important; text-decoration: none;
          font: 600 15px 'Poppins', sans-serif; padding: 20px 40px;
          border-radius: 100px; border: 1.5px solid rgba(255,255,255,.4);
          transition: background .2s; white-space: nowrap;
        }
        .br-btn-gold-pill:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,.2); }
        .br-btn-outline-pill:hover { background: rgba(255,255,255,.1); }

        /* ── SERVICES ── */
        .br-svc-grid {
          display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 24px; margin-top: 0;
        }
        .br-svc-intro {
          background: var(--c-white); border-radius: var(--r-lg); padding: 32px 28px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
          display: flex; flex-direction: column; justify-content: center;
        }
        .br-svc-items { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .br-svc-item {
          background: var(--c-white); border-radius: var(--r-sm); padding: 20px 20px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 12px rgba(62,44,35,.06);
          display: flex; align-items: flex-start; gap: 12px;
        }
        .br-svc-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--c-accent);
          flex-shrink: 0; margin-top: 5px;
        }
        .br-svc-text { font: 500 .88rem/1.5 'Poppins',sans-serif; color: var(--c-primary); }

        /* ── GALLERY ── */
        .br-gallery-note {
          font: 400 .82rem/1.5 'Poppins',sans-serif; color: var(--c-muted);
          font-style: italic; margin-top: 28px; text-align: center;
        }

        /* ── WHY SHRUSARA ── */
        .br-why-wrap {
          background: var(--c-white); border-radius: 32px; padding: 40px 36px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 4px 24px rgba(62,44,35,.07);
        }
        .br-why-designer {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-accent);
          margin-top: 10px; margin-bottom: 32px;
        }
        .br-why-designer::before { content:'✦'; font-size:10px; }
        .br-why-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 14px; }
        .br-why-item {
          background: var(--c-bg); border-radius: var(--r-sm); padding: 20px 16px;
          text-align: center; border: 1px solid rgba(62,44,35,.07);
        }
        .br-why-icon { color: var(--c-accent); font-size: 18px; margin-bottom: 10px; }
        .br-why-text { font: 600 .78rem/1.5 'Poppins',sans-serif; color: var(--c-primary); }

        /* ── PROCESS ── */
        .br-process-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 40px; }
        .br-process-card {
          background: var(--c-white); border-radius: var(--r-lg); padding: 32px 28px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
          position: relative; overflow: hidden;
        }
        .br-process-card::before {
          content: attr(data-step);
          position: absolute; top: -10px; right: 16px;
          font: 700 5rem/1 'Playfair Display',serif; color: rgba(200,169,106,.1);
          pointer-events: none;
        }
        .br-process-step {
          display: inline-block; font: 700 11px/1 'Poppins',sans-serif;
          letter-spacing:.15em; text-transform:uppercase; color: var(--c-accent);
          margin-bottom: 16px;
        }
        .br-process-title {
          font: 700 1.3rem/1.25 'Playfair Display',serif; color: var(--c-primary); margin-bottom: 12px;
        }
        .br-process-desc { font: 400 .85rem/1.7 'Poppins',sans-serif; color: var(--c-muted); }

        /* ── REVIEWS BADGE ── */
        .br-reviews-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--c-primary); color: #fff;
          font: 700 14px/1 'Poppins',sans-serif;
          padding: 12px 24px; border-radius: 50px; margin-bottom: 32px;
        }
        .br-reviews-badge-stars { color: var(--c-accent); letter-spacing: 2px; font-size: 13px; }

        /* ── FINAL CTA ── */
        .br-cta-wrap {
          background: var(--c-primary); border-radius: 32px; padding: 64px 56px;
          text-align: center; position: relative; overflow: hidden;
        }
        .br-cta-wrap::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,169,106,.12) 0%, transparent 70%);
        }
        .br-cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing:.18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 20px;
        }
        .br-cta-eyebrow::before { content:''; width:22px; height:1px; background:var(--c-accent); display:block; }
        .br-cta-eyebrow::after  { content:''; width:22px; height:1px; background:var(--c-accent); display:block; }
        .br-cta-h {
          font: 700 clamp(1.6rem,2.8vw,2.6rem)/1.2 'Playfair Display',serif;
          color: #fff; margin-bottom: 18px;
        }
        .br-cta-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: rgba(255,255,255,.75); max-width: 520px; margin: 0 auto 12px;
        }
        .br-cta-designer {
          font: 600 12.5px/1 'Poppins',sans-serif; color: var(--c-accent); margin-bottom: 12px;
        }
        .br-cta-scarcity {
          display: inline-flex; align-items: center; gap: 6px;
          font: 500 12px/1 'Poppins',sans-serif; color: rgba(255,255,255,.55);
          margin-bottom: 36px;
        }
        .br-cta-scarcity::before { content:'⚑'; font-size:11px; }
        .br-cta-btns { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .br-cta-btn-pri {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-accent); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-accent); transition: box-shadow .2s, transform .2s;
        }
        .br-cta-btn-pri:hover { box-shadow: 0 0 0 4px rgba(200,169,106,.3); transform: translateY(-1px); }
        .br-cta-btn-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid rgba(255,255,255,.35); transition: background .2s;
        }
        .br-cta-btn-sec:hover { background: rgba(255,255,255,.1); }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          .br-why-grid { grid-template-columns: repeat(3,1fr); }
          .br-process-grid { grid-template-columns: 1fr 1fr; }
          .br-image-match-banner { padding: 40px 40px; }
        }
        @media(max-width:768px){
          .br-hero { grid-template-columns:1fr; min-height:auto; }
          .br-hero-text { padding:50px 5vw 32px; order:2; }
          .br-hero-img-wrap { order:1; height:55vw; min-height:280px; }
          .br-hero-fade { background:linear-gradient(to bottom,transparent 60%,var(--c-bg) 100%); }
          .br-hero-btns { flex-direction:column; }
          .br-btn-pri, .br-btn-sec { width:100%; justify-content:center; }
          .br-shell { padding:50px 5vw; }
          .br-alt-inner { padding:50px 5vw; }
          .br-trust-grid { grid-template-columns:1fr; }
          .br-outfit-grid { grid-template-columns:repeat(2,1fr); }
          .br-svc-grid { grid-template-columns:1fr; }
          .br-svc-items { grid-template-columns:1fr; }
          .br-why-grid { grid-template-columns:repeat(2,1fr); }
          .br-process-grid { grid-template-columns:1fr; }
          .br-cta-wrap { padding:40px 24px; }
          .br-cta-btns { flex-direction:column; align-items:center; }
          .br-cta-btn-pri, .br-cta-btn-sec { width:100%; justify-content:center; }
          .br-image-match-banner { flex-direction:column; text-align:center; padding:40px 30px; margin:40px auto; width:95%; }
          .br-image-match-btns { flex-direction:column; width:100%; }
          .br-btn-gold-pill, .br-btn-outline-pill { width:100%; justify-content:center; }
          .br-image-match-title { font-size:1.8rem !important; }
        }
        @media(max-width:480px){
          .br-outfit-grid { grid-template-columns:1fr; }
          .br-why-grid { grid-template-columns:1fr; }
        }
      `}</style>

      <PageMeta
        title="Bridal Blouse Designer in Bangalore | Maggam & Aari Work Boutique"
        description="Customized bridal blouses in Bangalore with premium maggam and aari work, perfect fit, and expert design guidance by Chief Designer Shruthi Ajith at Shrusara Fashion Boutique."
        canonicalPath="/bridal-blouse-bangalore"
      />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="br-hero">
        <div className="br-hero-text">
          <p className="br-eyebrow">Bridal Specialist · Bangalore</p>

          <h1 className="br-hero-h1">
            Customized Bridal Blouses &amp; Outfits in Bangalore
            <span>with Perfect Fit &amp; Premium Aari Work</span>
          </h1>

          <p className="br-hero-sub br-sub-flex">
            <span className="br-star">✦</span>
            <span className="br-text">
              Custom bridal blouses, lehengas, and gowns designed with perfect fit,
              premium finishing, and personalized styling.
            </span>
          </p>

          <p className="br-hero-designer br-sub-flex">
            <span className="br-star">✦</span>
            <span className="br-text">Designed personally by Chief Designer Shruthi Ajith</span>
          </p>

          <p className="br-hero-price br-sub-flex">
            <span className="br-star">✦</span>
            <span className="br-text">
              Bridal designs starting at <strong>₹6000</strong>
            </span>
          </p>

          <div className="br-hero-btns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="br-btn-pri">
              <WaIcon size={18} /> Book Bridal Consultation
            </a>
            <a href={TEL_LINK} className="br-btn-sec">
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>

        <div className="br-hero-img-wrap">
          <img src={heroBridal} alt="Bridal Blouse Bangalore" className="br-hero-img" />
          <div className="br-hero-fade" />
        </div>
      </section>

      {/* ── 2. TRUST BAR ────────────────────────────────────────────────────── */}
      <Reveal className="br-shell">
        <div className="br-trust-grid">
          {[
            { value: 'Made for you',  label: 'Pattern and fit adjusted to body type and occasion' },
            { value: 'Detail first',  label: 'Embroidery placement designed for saree and jewellery balance' },
            { value: 'Timely finish', label: 'Trials and final delivery planned around event timelines' },
          ].map((item) => (
            <div key={item.value} className="br-trust-card">
              <p className="br-trust-label">Trust Bar</p>
              <h2 className="br-trust-title">{item.value}</h2>
              <p className="br-trust-desc">{item.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 3. BRIDAL OUTFITS WITH FILTER ───────────────────────────────────── */}
      <div className="br-alt">
        <div className="br-alt-inner">
          <p className="br-sec-eyebrow">Bridal Outfits</p>
          <h2 className="br-sec-h2">Our Bridal Collection</h2>
          <p className="br-sec-sub">
            Explore customized bridal blouses, lehengas, and gowns designed for your wedding and special occasions.
          </p>
          <BridalOutfits />
        </div>
      </div>

      {/* ── 3b. CTA BANNER ──────────────────────────────────────────────────── */}
      <div className="br-shell" style={{ paddingBottom: 0 }}>
        <div className="br-image-match-banner">
          <div className="br-image-match-content">
            <h2 className="br-image-match-title">
              Join our happy brides — book your consultation today
            </h2>
            <p className="br-image-match-sub">
              Start your bridal consultation with Shruthi Ajith
            </p>
          </div>
          <div className="br-image-match-btns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="br-btn-gold-pill">
              <WaIcon size={18} /> WhatsApp Enquiry
            </a>
            <a href={TEL_LINK} className="br-btn-outline-pill">
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* ── 4. SERVICE SECTION ──────────────────────────────────────────────── */}
      <Reveal className="br-shell" style={{ paddingTop: 0 }}>
        <div className="br-svc-grid">
          <div className="br-svc-intro">
            <p className="br-sec-eyebrow">Services</p>
            <h2 className="br-sec-h2">What We Design for Brides</h2>
            <p className="br-sec-sub">
              From concept to final fitting, we handle every detail of your bridal outfit.
            </p>
          </div>
          <div className="br-svc-items">
            {bridalServiceItems.map((item) => (
              <div key={item} className="br-svc-item">
                <span className="br-svc-dot" />
                <p className="br-svc-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 5. GALLERY ──────────────────────────────────────────────────────── */}
      <div className="br-alt">
        <div className="br-alt-inner">
          <p className="br-sec-eyebrow">Gallery</p>
          <h2 className="br-sec-h2">Bridal Design Gallery</h2>
          <p className="br-sec-sub">
            A collection of bridal blouse, lehenga, and gown designs crafted with premium detailing and perfect fit.
          </p>
          <div style={{ marginTop: 36 }}>
            <ImageGrid
              images={bridalGallery.slice(0, 100)}
              loading={galleryLoading}
              priority
              columnsClassName="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
            />
          </div>
          <p className="br-gallery-note">
            Showing our latest bridal designs · Updated regularly with new work
          </p>
        </div>
      </div>

      {/* ── 6. WHY SHRUSARA ─────────────────────────────────────────────────── */}
      <Reveal className="br-shell">
        <div className="br-why-wrap">
          <p className="br-sec-eyebrow">Why Shrusara</p>
          <h2 className="br-sec-h2">A bridal process that feels personal, not rushed</h2>
          <p className="br-sec-sub">
            We focus on fit, detailing, and finishing to make your bridal outfit look perfect on your special day.
          </p>
          <p className="br-why-designer">Handled personally by Chief Designer Shruthi Ajith</p>
          <div className="br-why-grid">
            {whyItems.map((item) => (
              <div key={item} className="br-why-item">
                <div className="br-why-icon">✦</div>
                <p className="br-why-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 7. PROCESS ──────────────────────────────────────────────────────── */}
      <div className="br-alt">
        <div className="br-alt-inner">
          <p className="br-sec-eyebrow">Process</p>
          <h2 className="br-sec-h2">A simple boutique flow from consultation to final fitting</h2>
          <p className="br-sec-sub">
            Clear steps so you know exactly what to expect at every stage.
          </p>
          <div className="br-process-grid">
            {processSteps.map((step) => (
              <article key={step.title} className="br-process-card" data-step={step.step}>
                <span className="br-process-step">Step {step.step}</span>
                <h3 className="br-process-title">{step.title}</h3>
                <p className="br-process-desc">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. REVIEWS ──────────────────────────────────────────────────────── */}
      <Reveal className="br-shell">
        <div className="br-reviews-badge">
          <span className="br-reviews-badge-stars">★★★★★</span>
          100+ Happy Brides in Bangalore
        </div>
        <ReviewsSection
          payload={reviews}
          loading={reviewsLoading}
          description="Real experiences from brides who trusted Shrusara for their special day."
        />
      </Reveal>

      {/* ── 9. FINAL CTA ────────────────────────────────────────────────────── */}
      <div className="br-shell" style={{ paddingTop: 0 }}>
        <div className="br-cta-wrap">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <p className="br-cta-eyebrow">Book Your Bridal Blouse Consultation Today</p>
          </div>
          <h2 className="br-cta-h">Book Your Bridal Blouse Consultation Today</h2>
          <p className="br-cta-sub">
            Share your wedding date, saree details, and design preferences.
          </p>
          <p className="br-cta-designer">
            Our Chief Designer Shruthi Ajith will guide you personally.
          </p>
          <p className="br-cta-scarcity">Limited bridal slots available each month</p>
          <div className="br-cta-btns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="br-cta-btn-pri">
              <WaIcon size={18} /> Book Bridal Consultation
            </a>
            <a href={TEL_LINK} className="br-cta-btn-sec">
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}