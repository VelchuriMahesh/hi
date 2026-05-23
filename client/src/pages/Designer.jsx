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

// ─── Static Designer outfits data ─────────────────────────────────────────────
const staticDesignerOutfits = [
  { id: 1,  tag: 'gowns',        title: 'Midnight Wine Designer Gown',         alt: 'Midnight Wine Designer Gown',         image: '/designer/designer gown/designer-party-wear-designer-evening-gown-shrusara.webp',                      description: 'An elegant designer gown crafted with flowing silhouettes and premium finishing for statement occasion wear.' },
  { id: 2,  tag: 'gowns',        title: 'Floral Trail Indo-Western Gown',      alt: 'Floral Trail Indo-Western Gown',      image: '/designer/designer gown/modern-gown-bridal-reception-premium-finishing-Shrusara-banaglore.webp',       description: 'A dramatic indo-western gown designed with a flowing trail and modern couture-inspired styling.' },
  { id: 3,  tag: 'gowns',        title: 'Royal Blue Maternity Gown',           alt: 'Royal Blue Maternity Gown',           image: '/designer/designer gown/modern-gown-maternity-photoshoot-premium-finishing-shrusara-banaglore.webp',   description: 'A graceful maternity gown designed with elegant drape, comfort, and premium photoshoot styling.' },
  { id: 4,  tag: 'gowns',        title: 'Mint Luxe Designer Ball Gown',        alt: 'Mint Luxe Designer Ball Gown',        image: '/designer/designer gown/premium-designer-ball-gown-for-engagement-bangalore.webp',                     description: 'A voluminous designer ball gown crafted for engagement, reception, and luxury occasion wear.' },
  { id: 5,  tag: 'gowns',        title: 'Floral Tail Couture Gown',            alt: 'Floral Tail Couture Gown',            image: '/designer/designer gown/reception-gown-for-brides-shrusara-fashion-boutique.webp',                    description: 'A statement couture gown featuring a dramatic tail silhouette and modern designer detailing.' },
  { id: 6,  tag: 'indo-western', title: 'Gold Indo-Western Crop Top Lehenga',  alt: 'Gold Indo-Western Crop Top Lehenga',  image: '/designer/Indowestern/contemporary-modren-bridal-trousseau-outfit-shruthi-ajith.webp',                  description: 'An indo-western crop top lehenga designed with fusion styling and handcrafted premium finishing.' },
  { id: 7,  tag: 'indo-western', title: 'Ivory Indo-Western Crop Top Lehenga', alt: 'Ivory Indo-Western Crop Top Lehenga', image: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp',                      description: 'A contemporary crop top lehenga styled with elegant drape and indo-western bridal fusion.' },
  { id: 8,  tag: 'party-wear',   title: 'Scarlet Evening Designer Gown',       alt: 'Scarlet Evening Designer Gown',       image: '/designer/Partwearset/custom-photoshoot-red-gown-reception-wear-bangalore.webp',                      description: 'A refined evening gown designed with sleek silhouettes and premium occasion wear finishing.' },
  { id: 9,  tag: 'party-wear',   title: 'Contemporary Designer Blouse',        alt: 'Contemporary Designer Blouse',        image: '/designer/Partwearset/designer-blouse-saree-bangalore-shrusara.webp',                                 description: 'A customized designer blouse crafted with modern styling and premium couture detailing.' },
  { id: 10, tag: 'party-wear',   title: 'Crimson Trail Party Gown',            alt: 'Crimson Trail Party Gown',            image: '/designer/Partwearset/elegant-designer-evening-gown-for-shruthi-ajith-bangalore.webp',                description: 'A dramatic party gown featuring a flowing trail and statement fashion-forward silhouette.' },
  { id: 11, tag: 'party-wear',   title: 'Rose Motion Couture Gown',            alt: 'Rose Motion Couture Gown',            image: '/designer/Partwearset/modern-tail-gown-reception-premium-finishing-shrusara-banaglore.webp',          description: 'A couture-inspired designer gown styled with movement, elegance, and premium occasion wear detailing.' },
  { id: 12, tag: 'gowns',        title: 'Noir Evening Couple Couture',         alt: 'Noir Evening Couple Couture',         image: '/designer/designer gown/elegant-evening-gown-brides-featuring-modern-silhouette-premium-fabric.webp', description: 'A coordinated designer couple look crafted for evening occasions with elegant contemporary styling.' },
];

const FILTERS = [
  { key: 'all',          label: 'All'               },
  { key: 'gowns',        label: 'Designer Gowns'    },
  { key: 'indo-western', label: 'Indo-Western Sets' },
  { key: 'party-wear',   label: 'Party Wear'        },
];

const serviceItems = [
  { icon: '✦', title: 'Designer Gowns',            desc: 'Customized designer gowns for receptions, parties and special occasions, crafted with premium fabrics, elegant silhouettes and perfect boutique fitting.' },
  { icon: '◈', title: 'Indo-Western Outfits',      desc: 'Customized Indo-western outfits blending modern styling with traditional elegance, tailored beautifully for contemporary occasions and celebrations.' },
  { icon: '✒', title: 'Designer Blouses',          desc: 'Customized designer blouses with premium embroidery, unique patterns and elegant finishing tailored beautifully for every occasion.' },
  { icon: '★', title: 'Crop Top & Lehenga Sets',   desc: 'Customized crop tops and lehenga sets crafted stylishly for festive events, weddings and modern ethnic celebrations.' },
  { icon: '◷', title: 'Kurtha Sets',               desc: 'Customized kurtha sets designed with contemporary styling, premium tailoring and elegant comfort for casual and festive occasions.' },
  { icon: '✓', title: 'Ready-to-Wear Sarees',      desc: 'Convert your sarees into elegant ready-to-wear concepts with customized pre-draped styling for comfort, convenience and modern occasions.' },
  { icon: '❋', title: 'Mother & Daughter Outfits', desc: 'Customized matching outfits for mothers and daughters, beautifully tailored for birthdays, weddings and memorable family occasions.' },
  { icon: '◆', title: 'Saree Conversion Outfits',  desc: 'Transform your sarees into customized lehengas, gowns, crop tops and designer outfits crafted beautifully with premium boutique finishing.' },
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
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

// ─── Google Icon ──────────────────────────────────────────────────────────────
const GoogleIcon = ({ size = 38 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} aria-label="Google" role="img" style={{ flexShrink: 0 }}>
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.6 35.4 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C36.9 36.8 44 31 44 24c0-1.3-.1-2.6-.4-3.9z"/>
  </svg>
);

// ─── Explore Styles Filter Section ───────────────────────────────────────────
function DesignerOutfits() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredData =
    activeFilter === 'all'
      ? staticDesignerOutfits
      : staticDesignerOutfits.filter(o => o.tag === activeFilter);

  const mappedImages = filteredData.map(o => ({
    id: String(o.id),
    url: o.image,
    thumbUrl: o.image,
    alt: o.alt,
    title: o.title,
    description: o.description,
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

// ─── Gallery Section ──────────────────────────────────────────────────────────
function DesignerGallery({ images, loading }) {
  const adminImages = images || [];

  const staticMapped = staticDesignerOutfits.map(o => ({
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
        .ds-hero-h1 span { display: block; color: var(--c-accent); font-size: clamp(1rem,1.6vw,1.3rem); font-weight: 400; margin-top: 10px; }
        .ds-hero-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: var(--c-muted); max-width: 440px; margin-bottom: 10px;
        }
        .ds-hero-designer {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-primary);
          margin-bottom: 8px;
        }
        .ds-hero-designer::before { content: '✦'; color: var(--c-accent); font-size: 14px; }
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

        /* ── FILTERS ── */
        .ds-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; margin-top: 32px; }
        .ds-filter-pill {
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-primary);
          border: 1.5px solid rgba(62,44,35,.2); border-radius: 50px;
          padding: 9px 22px; background: transparent; cursor: pointer;
          transition: background .18s, color .18s, border-color .18s;
        }
        .ds-filter-pill:hover { background: rgba(62,44,35,.06); }
        .ds-filter-pill.active { background: var(--c-primary); color: #fff; border-color: var(--c-primary); }

        /* ── SERVICES SECTION ── */
        .ds-services-wrap {
          background: var(--c-white);
          padding: 80px 5vw;
        }
        .ds-services-inner {
          max-width: 1280px;
          margin: 0 auto;
        }
        .ds-services-intro {
          font: 400 .95rem/1.8 'Poppins', sans-serif;
          color: var(--c-muted);
          max-width: 720px;
          margin-bottom: 48px;
          margin-top: 12px;
        }
        .ds-services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .ds-service-card {
          background: var(--c-bg);
          border: 1px solid rgba(62,44,35,.1);
          border-top: 3px solid var(--c-accent);
          border-radius: 0 0 var(--r-sm) var(--r-sm);
          padding: 28px 22px;
          transition: transform .25s, box-shadow .25s;
        }
        .ds-service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(62,44,35,.12);
        }
        .ds-service-icon {
          font-size: 1.15rem;
          color: var(--c-accent);
          margin-bottom: 14px;
          display: block;
          line-height: 1;
        }
        .ds-service-title {
          font: 700 1.05rem/1.25 'Playfair Display', serif;
          color: var(--c-primary);
          margin-bottom: 10px;
        }
        .ds-service-desc {
          font: 400 .8rem/1.7 'Poppins', sans-serif;
          color: var(--c-muted);
        }

        /* ── SOCIAL PROOF / GOOGLE RATING ── */
        .ds-social-proof-wrap {
          background: var(--c-bg);
          padding: 80px 5vw;
          text-align: center;
        }
        .ds-social-proof-inner {
          max-width: 1000px;
          margin: 0 auto;
        }
        .ds-social-top-label {
          display: flex; align-items: center; justify-content: center; gap: 14px;
          margin-bottom: 20px;
        }
        .ds-social-top-label span {
          font: 700 11px/1 'Poppins', sans-serif;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--c-accent);
        }
        .ds-social-line { width: 40px; height: 1px; background: var(--c-accent); opacity: .6; }
        .ds-social-main-h {
          font: 700 clamp(1.8rem,3.4vw,3rem)/1.2 'Playfair Display', serif;
          color: var(--c-primary); margin: 0 0 12px;
        }
        .ds-social-main-sub {
          font: 400 1rem/1.65 'Poppins', sans-serif;
          color: var(--c-muted); max-width: 520px;
          margin: 0 auto 44px;
        }
        .ds-google-card {
          background: var(--c-white);
          border-radius: 28px;
          padding: 24px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          box-shadow: 0 8px 36px rgba(62,44,35,.06);
          border: 1px solid rgba(62,44,35,.05);
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .ds-google-divider { width: 1px; height: 46px; background: #e8e3de; flex-shrink: 0; }
        .ds-google-rating-wrap {
          display: flex; align-items: center; gap: 16px; text-align: left;
        }
        .ds-google-big-num {
          font: 700 3.8rem/1 'Poppins', sans-serif;
          color: var(--c-primary);
        }
        .ds-google-stars-group { display: flex; flex-direction: column; gap: 3px; }
        .ds-google-stars-row {
          color: #FFB400; font-size: 1.4rem; letter-spacing: 2px; line-height: 1;
        }
        .ds-google-source-lbl {
          font: 600 .95rem/1 'Poppins', sans-serif; color: var(--c-muted);
        }
        .ds-google-sub-row {
          font: 400 .9rem/1 'Poppins', sans-serif;
          color: var(--c-muted); text-align: left;
        }
        .ds-google-sub-row strong { color: var(--c-primary); font-weight: 700; }
        .ds-google-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #4285F4; color: #fff;
          border: none; border-radius: 100px;
          padding: 11px 22px;
          font: 500 13px/1 'Poppins', sans-serif;
          text-decoration: none; transition: opacity .2s;
          white-space: nowrap; flex-shrink: 0;
        }
        .ds-google-btn:hover { opacity: .88; background: #4285F4; color: #fff; }
        .ds-happy-badge {
          background: var(--c-primary);
          border-radius: 20px;
          padding: 24px 40px;
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 28px;
          text-align: left;
          position: relative;
          overflow: hidden;
        }
        .ds-happy-badge::after {
          content: '';
          position: absolute; bottom: 0; left: 12%; right: 40%;
          height: 4px; background: var(--c-accent);
          border-radius: 10px 10px 0 0;
        }
        .ds-happy-badge-icon { color: var(--c-accent); flex-shrink: 0; }
        .ds-happy-badge-div { width: 1px; height: 56px; background: rgba(200,169,106,.2); }
        .ds-happy-badge-stars {
          color: var(--c-accent); font-size: 1.2rem;
          letter-spacing: 4px; margin-bottom: 10px; line-height: 1;
        }
        .ds-happy-badge-content h3 {
          color: var(--c-accent); font: 700 .95rem/1 'Poppins', sans-serif;
          letter-spacing: .05em; margin: 0 0 6px; text-transform: uppercase;
        }
        .ds-happy-badge-content p {
          color: rgba(255,255,255,.55);
          font: 400 .88rem/1 'Poppins', sans-serif; margin: 0;
        }

        /* ── IMAGE MATCH BANNER ── */
        .ds-image-match-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          background: var(--c-primary);
          border-radius: 40px;
          padding: 60px 80px;
          margin: 60px auto;
          max-width: 1200px;
          width: 90%;
        }
        .ds-image-match-content { flex: 1; }
        .ds-image-match-title {
          font: 600 2.4rem/1.2 'Playfair Display', serif;
          color: #fff; margin-bottom: 12px;
        }
        .ds-image-match-sub {
          font: 400 1.1rem/1.6 'Poppins', sans-serif;
          color: rgba(255,255,255,.7); margin: 0;
        }
        .ds-image-match-btns { display: flex; gap: 20px; align-items: center; }
        .ds-btn-gold-pill {
          background: var(--c-accent); color: #fff;
          text-decoration: none;
          font: 600 15px/1 'Poppins', sans-serif;
          padding: 20px 40px; border-radius: 100px;
          transition: transform .2s; white-space: nowrap;
        }
        .ds-btn-gold-pill:hover { transform: scale(1.02); }
        .ds-btn-outline-pill {
          background: transparent; color: #fff;
          text-decoration: none;
          font: 600 15px/1 'Poppins', sans-serif;
          padding: 20px 40px; border-radius: 100px;
          border: 1.5px solid rgba(255,255,255,.4);
          transition: background .2s; white-space: nowrap;
        }
        .ds-btn-outline-pill:hover { background: rgba(255,255,255,.1); }

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
          .ds-why-grid { grid-template-columns: repeat(3,1fr); }
          .ds-process-grid { grid-template-columns: 1fr 1fr; }
          .ds-services-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media(max-width:992px){
          .ds-image-match-banner { flex-direction:column; text-align:center; padding:40px 30px; align-items:center; }
          .ds-image-match-btns { flex-direction:column; width:100%; }
          .ds-btn-gold-pill, .ds-btn-outline-pill { width:100%; text-align:center; }
        }
        @media(max-width:768px){
          .ds-hero { grid-template-columns:1fr; min-height:auto; }
          .ds-hero-text { padding:50px 5vw 32px; order:2; }
          .ds-hero-img-wrap { order:1; height:55vw; min-height:280px; }
          .ds-hero-fade { background:linear-gradient(to bottom,transparent 60%,var(--c-bg) 100%); }
          .ds-hero-btns { flex-direction:column; }
          .ds-btn-pri,.ds-btn-sec { width:100%; justify-content:center; }
          .ds-shell { padding:50px 5vw; }
          .ds-alt-inner { padding:50px 5vw; }
          .ds-trust-grid { grid-template-columns:1fr; }
          .ds-why-grid { grid-template-columns:repeat(2,1fr); }
          .ds-process-grid { grid-template-columns:1fr; }
          .ds-cta-wrap { padding:40px 24px; }
          .ds-cta-btns { flex-direction:column; align-items:center; }
          .ds-cta-btn-pri,.ds-cta-btn-sec { width:100%; justify-content:center; }
          .ds-services-wrap { padding:50px 5vw; }
          .ds-services-grid { grid-template-columns:repeat(2,1fr); gap:14px; }
          .ds-service-card { padding:20px 16px; }
          .ds-google-card { flex-direction:column; padding:24px 20px; text-align:center; gap:16px; border-radius:20px; }
          .ds-google-divider { display:none; }
          .ds-google-rating-wrap { flex-direction:column; align-items:center; text-align:center; gap:8px; }
          .ds-google-big-num { font-size:3.2rem; }
          .ds-google-sub-row { text-align:center; }
          .ds-google-btn { width:100%; justify-content:center; }
          .ds-happy-badge { flex-direction:column; text-align:center; padding:24px 20px; gap:16px; border-radius:16px; max-width:100%; }
          .ds-happy-badge-div { display:none; }
          .ds-social-proof-wrap { padding:50px 5vw; }
        }
        @media(max-width:480px){
          .ds-services-grid { grid-template-columns:1fr; }
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
          <p className="ds-hero-designer">Styled personally by Chief Designer Shruthi Ajith</p>
          <div className="ds-hero-btns" style={{ marginTop: 24 }}>
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

      {/* ── 2. APPROACH ─────────────────────────────────────────────────────── */}
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

      {/* ── 3. EXPLORE STYLES ───────────────────────────────────────────────── */}
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

      {/* ── 4. CTA BANNER ───────────────────────────────────────────────────── */}
      <div className="ds-image-match-banner">
        <div className="ds-image-match-content">
          <h2 className="ds-image-match-title">
            Join our happy clients — book your consultation today
          </h2>
          <p className="ds-image-match-sub">
            Start your designer outfit consultation with Chief Designer Shruthi Ajith
          </p>
        </div>
        <div className="ds-image-match-btns">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ds-btn-gold-pill" onClick={() => trackWhatsApp('designer_banner')}>
            <WaIcon size={16} /> WhatsApp Enquiry
          </a>
          <a href={TEL_LINK} className="ds-btn-outline-pill" onClick={() => trackPhoneCall('designer_banner')}>
            Call Now
          </a>
        </div>
      </div>

      {/* ── 5. SERVICES ─────────────────────────────────────────────────────── */}
      <section className="ds-services-wrap">
        <div className="ds-services-inner">
          <p className="ds-sec-eyebrow">Our Services</p>
          <h2 className="ds-sec-h2">Customized Designer Outfits &amp; Occasion Wear in Bangalore</h2>
          <p className="ds-services-intro">
            At Shrusara Fashion Boutique, we specialize in customized designer outfits in Bangalore —
            beautifully tailored for modern occasions. From designer gowns and Indo-western wear to
            saree conversion outfits and ready-to-wear saree customization, every outfit is crafted
            with premium detailing, elegant finishing and perfect boutique fitting.
          </p>
          <div className="ds-services-grid">
            {serviceItems.map((s, i) => (
              <div key={i} className="ds-service-card">
                <span className="ds-service-icon">{s.icon}</span>
                <h3 className="ds-service-title">{s.title}</h3>
                <p className="ds-service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SOCIAL PROOF / GOOGLE RATING ────────────────────────────────── */}
      <section className="ds-social-proof-wrap">
        <div className="ds-social-proof-inner">
          <div className="ds-social-top-label">
            <div className="ds-social-line" />
            <span>Top Rated Boutique in Bangalore</span>
            <div className="ds-social-line" />
          </div>
          <h2 className="ds-social-main-h">Trusted by Clients Across Bangalore</h2>
          <p className="ds-social-main-sub">
            From festive wear to bridal outfits, we design looks that clients truly love and feel confident in.
          </p>

          <div className="ds-google-card">
            <GoogleIcon size={42} />
            <div className="ds-google-divider" />
            <div className="ds-google-rating-wrap">
              <span className="ds-google-big-num">4.9</span>
              <div className="ds-google-stars-group">
                <div className="ds-google-stars-row">★★★★★</div>
                <div className="ds-google-source-lbl">Google Reviews</div>
              </div>
            </div>
            <div className="ds-google-divider" />
            <div className="ds-google-sub-row">
              Based on <strong>250+</strong> verified reviews on Google
            </div>
            <div className="ds-google-divider" />
            <a
              href="https://www.google.com/maps/place/Shrusara+Fashion+Boutique"
              target="_blank"
              rel="noopener noreferrer"
              className="ds-google-btn"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              View on Google ↗
            </a>
          </div>

          <div className="ds-happy-badge">
            <div className="ds-happy-badge-icon">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <div className="ds-happy-badge-div" />
            <div className="ds-happy-badge-content">
              <div className="ds-happy-badge-stars">★★★★★</div>
              <h3>250+ Happy Clients in Bangalore</h3>
              <p>Loved by clients. Chosen for perfection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. GALLERY ──────────────────────────────────────────────────────── */}
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

      {/* ── 8. WHY SHRUSARA ─────────────────────────────────────────────────── */}
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

      {/* ── 9. PROCESS ──────────────────────────────────────────────────────── */}
      <div className="ds-alt">
        <div className="ds-alt-inner">
          <p className="ds-sec-eyebrow">Process</p>
          <h2 className="ds-sec-h2">A simple boutique flow from consultation to final fitting</h2>
          <p className="ds-sec-sub">Clear steps so you know exactly what to expect at every stage.</p>
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

      {/* ── 10. REVIEWS ─────────────────────────────────────────────────────── */}
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

      {/* ── 11. FINAL CTA ───────────────────────────────────────────────────── */}
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
          <p className="ds-cta-designer">Personally guided by Chief Designer Shruthi Ajith</p>
          <p className="ds-cta-scarcity">Limited slots available each week</p>
          <div className="ds-cta-btns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ds-cta-btn-pri" onClick={() => trackWhatsApp('designer_cta')}>
              <WaIcon size={18} /> WhatsApp Enquiry
            </a>
            <a href={TEL_LINK} className="ds-cta-btn-sec" onClick={() => trackPhoneCall('designer_cta')}>
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}