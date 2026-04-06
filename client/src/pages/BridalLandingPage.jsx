import { useState } from 'react';
import heroBridal from '../assets/images/bridal/hero-bridal.jpeg';
import b1 from '../assets/images/bridal/bridal-02.jpeg';
import b2 from '../assets/images/bridal/bridal-03.jpeg';
import b3 from '../assets/images/bridal/bridal-04.jpeg';
import b4 from '../assets/images/bridal/bridal-08.jpeg';
import b5 from '../assets/images/bridal/bridal-10.jpeg';
import designer01 from '../assets/images/designer/designer-01.jpeg';
import designer03 from '../assets/images/designer/designer-03.jpeg';
import designer06 from '../assets/images/designer/designer-06.jpeg';
/**
 * SHRUSARA BRIDAL LANDING PAGE
 * Fully rewritten — clean, premium, no exit points
 */

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '919741827558';
const PHONE_NUMBER    = '+919741827558';

const WA_PREFILL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi, I am looking for a customized bridal outfit.\nMy wedding date is [date].\nI need consultation for blouse / lehenga / gown.\nI would like to consult with Chief Designer Shruthi Ajith.'
)}`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const trustPoints = [
  {
    icon: '✦',
    label: 'Craftsmanship',
    title: 'Premium Maggam & Aari Work',
    desc: 'Intricate handcrafted embroidery on every bridal outfit.',
  },
  {
    icon: '◈',
    label: 'Fit Promise',
    title: 'Perfect Fit — Zero Alterations',
    desc: 'Pattern and measurements tailored precisely to your body type.',
  },
  {
    icon: '◷',
    label: 'Reliability',
    title: 'On-Time Delivery Commitment',
    desc: 'Delivery planned well before your special day, every time.',
  },
];

const galleryItems = [
 { src: '/videos/1.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
  { src: '/videos/2.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
   { src: '/videos/3.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
    { src: '/videos/4.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
     { src: '/videos/5.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
      { src: '/videos/6.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
      { src: b1, tag: 'Bridal Blouse', aspect: '3/4' },
{ src: b2, tag: 'Bridal Blouse', aspect: '3/4' },
{ src: b3, tag: 'Bridal Blouse', aspect: '3/4' },
{ src: b4, tag: 'Bridal Blouse', aspect: '3/4' },
{ src: b5, tag: 'Bridal Blouse', aspect: '3/4' },
{ src: designer01, tag: 'Designer Outfit', aspect: '3/4' },
{ src: designer03, tag: 'Designer Outfit', aspect: '3/4' },
{ src: designer06, tag: 'Designer Outfit', aspect: '3/4' },
];

const reviews = [
  { text: 'The fit was like a second skin. Best bridal boutique in Bangalore!', name: 'Priya Rao' },
  { text: 'Highly professional service and timely delivery. Shruthi Ajith is incredibly talented.', name: 'Meghana V.' },
  { text: 'They made my Pinterest dream into reality. Worth every penny!', name: 'Kavya Ramesh' },
];

const processSteps = [
  { step: '01', title: 'Consultation' },
  { step: '02', title: 'Design Finalization' },
  { step: '03', title: 'Trial & Perfect Fit' },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const WaIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PhoneIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

// ─── CTA Form Component ───────────────────────────────────────────────────────
function BridalCtaForm() {
  const [weddingDate, setWeddingDate] = useState('');
  const [sareeDetails, setSareeDetails] = useState('');
  const [designPref, setDesignPref]   = useState('');

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I am looking for a customized bridal outfit.\nMy wedding date is ${weddingDate || '[date]'}.\nSaree details: ${sareeDetails || '—'}.\nDesign preferences: ${designPref || '—'}.\nI would like to consult with Chief Designer Shruthi Ajith.`
  )}`;

  return (
    <div className="bl-cta-form">
      <div className="bl-form-fields">
        <div className="bl-form-group">
          <label className="bl-form-label" htmlFor="bl-date">Wedding Date</label>
          <input
            id="bl-date"
            className="bl-form-input"
            type="text"
            placeholder="e.g. 15 Feb 2026"
            value={weddingDate}
            onChange={e => setWeddingDate(e.target.value)}
          />
        </div>
        <div className="bl-form-group">
          <label className="bl-form-label" htmlFor="bl-saree">Saree / Outfit Details</label>
          <input
            id="bl-saree"
            className="bl-form-input"
            type="text"
            placeholder="e.g. Kanjivaram silk, deep red"
            value={sareeDetails}
            onChange={e => setSareeDetails(e.target.value)}
          />
        </div>
        <div className="bl-form-group">
          <label className="bl-form-label" htmlFor="bl-design">Design Preferences</label>
          <input
            id="bl-design"
            className="bl-form-input"
            type="text"
            placeholder="e.g. Maggam work, heavy neck"
            value={designPref}
            onChange={e => setDesignPref(e.target.value)}
          />
        </div>
      </div>
      <div className="bl-cta-btns">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="bl-cta-btn-pri">
          <WaIcon size={18} /> WhatsApp Enquiry
        </a>
        <a href={`tel:${PHONE_NUMBER}`} className="bl-cta-btn-sec">
          <PhoneIcon size={16} /> Call Now
        </a>
      </div>
      <p className="bl-form-hint">
        Your details will be pre-filled in WhatsApp — just hit send.
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const BridalLandingPage = () => {
  return (
    <>
      <style>{`
        /* ── Variables ── */
        :root {
          --bl-gold:      #B8935A;
          --bl-gold-lt:   #D4B483;
          --bl-gold-pale: #F5EDD9;
          --bl-dark:      #1C1410;
          --bl-warm:      #2E2016;
          --bl-cream:     #FBF8F3;
          --bl-text:      #3A2E25;
          --bl-muted:     #7A6A5A;
          --bl-white:     #FFFFFF;
          --bl-r-lg:      24px;
        }

        .bl-body {
          font-family: 'Jost', 'Poppins', sans-serif;
          background: var(--bl-cream);
          color: var(--bl-text);
          overflow-x: hidden;
        }

        /* ── HEADER ── */
        .bl-hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(251,248,243,0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(184,147,90,.15);
          padding: 0 5vw;
          display: flex; align-items: center; justify-content: space-between;
          height: 72px;
        }
        .bl-hdr-brand { display: flex; flex-direction: column; gap: 2px; }
        .bl-hdr-name {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 700; color: var(--bl-dark);
          letter-spacing: .03em; line-height: 1;
        }
        .bl-hdr-sub {
          font-size: .58rem; letter-spacing: .22em; text-transform: uppercase;
          color: var(--bl-gold); font-weight: 600;
        }
        .bl-hdr-badge {
          display: flex; align-items: center; gap: 6px;
          font-size: .58rem; letter-spacing: .18em; text-transform: uppercase;
          color: var(--bl-muted); font-weight: 500;
        }
        .bl-hdr-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #4CAF50;
          animation: bl-pulse 2s infinite;
        }
        @keyframes bl-pulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }
        .bl-hdr-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--bl-dark); color: var(--bl-white);
          font-size: .62rem; font-weight: 600; letter-spacing: .18em;
          text-transform: uppercase; padding: 11px 22px;
          text-decoration: none; border: none; cursor: pointer;
          transition: background .2s;
        }
        .bl-hdr-cta:hover { background: var(--bl-gold); }

        /* ── HERO ── */
        .bl-hero {
          min-height: 90vh; display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; padding: 60px 5vw; gap: 60px;
          position: relative; overflow: hidden; background: var(--bl-cream);
        }
        .bl-hero::before {
          content: ''; position: absolute; top: -20%; right: -10%;
          width: 50vw; height: 130%;
          background: radial-gradient(ellipse, rgba(184,147,90,.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .bl-hero-text { z-index: 2; }
        .bl-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: .62rem; letter-spacing: .25em; text-transform: uppercase;
          color: var(--bl-gold); font-weight: 600; margin-bottom: 22px;
        }
        .bl-hero-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--bl-gold); display: block; }
        .bl-hero-h1 {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(2.4rem,4vw,3.6rem); font-weight: 700; line-height: 1.1;
          color: var(--bl-dark); margin-bottom: 8px;
        }
        .bl-hero-h1 em { font-style: italic; color: var(--bl-gold); }
        .bl-hero-h2 {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(1.3rem,2vw,1.8rem); font-weight: 400; font-style: italic;
          color: var(--bl-muted); margin-bottom: 22px; line-height: 1.3;
        }
        .bl-hero-sub {
          font-size: .9rem; line-height: 1.85; color: var(--bl-muted);
          max-width: 440px; margin-bottom: 6px; font-weight: 300;
        }
        .bl-hero-designer {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: .72rem; font-weight: 600; letter-spacing: .06em;
          color: var(--bl-dark); margin-bottom: 10px;
        }
        .bl-hero-designer::before { content: '✦'; color: var(--bl-gold); font-size: .7rem; }
        .bl-hero-price { font-size: .76rem; color: var(--bl-muted); margin-bottom: 36px; }
        .bl-hero-price strong { color: var(--bl-dark); font-weight: 700; }
        .bl-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }

        /* Buttons */
        .bl-btn-pri {
          display: inline-flex; align-items: center; gap: 9px;
          background: var(--bl-dark); color: var(--bl-white);
          font-size: .7rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
          padding: 15px 28px; text-decoration: none;
          border: 2px solid var(--bl-dark); transition: transform .2s, box-shadow .2s;
        }
        .bl-btn-pri:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,20,16,.2); }
        .bl-btn-sec {
          display: inline-flex; align-items: center; gap: 9px;
          background: transparent; color: var(--bl-dark);
          font-size: .7rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
          padding: 15px 28px; text-decoration: none;
          border: 2px solid var(--bl-dark); transition: background .2s, color .2s;
        }
        .bl-btn-sec:hover { background: var(--bl-dark); color: var(--bl-white); }

        /* Hero image */
        .bl-hero-img-wrap { position: relative; }
        .bl-hero-img-frame {
          position: relative; border-radius: 50% 50% 0 0; overflow: hidden;
          aspect-ratio: 4/5; border: 12px solid var(--bl-white);
          box-shadow: 0 20px 60px rgba(28,20,16,.18);
        }
        .bl-hero-img-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        .bl-hero-badge {
          position: absolute; bottom: 40px; left: -20px;
          background: var(--bl-dark); color: var(--bl-white);
          padding: 16px 20px; box-shadow: 0 8px 32px rgba(28,20,16,.3);
          text-align: center; min-width: 130px;
        }
        .bl-hero-badge-num {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700; color: var(--bl-gold); line-height: 1;
        }
        .bl-hero-badge-txt {
          font-size: .55rem; letter-spacing: .18em; text-transform: uppercase;
          opacity: .8; margin-top: 4px;
        }

        /* ── TRUST BAR ── */
        .bl-trust { padding: 0 5vw 64px; background: var(--bl-white); }
        .bl-trust-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 1px; background: rgba(184,147,90,.12);
        }
        .bl-trust-item {
          background: var(--bl-white); padding: 32px 28px;
          display: flex; align-items: flex-start; gap: 16px;
        }
        .bl-trust-icon {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--bl-gold-pale); display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
          font-size: 1rem; color: var(--bl-gold);
        }
        .bl-trust-label {
          font-size: .58rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--bl-gold); font-weight: 600; margin-bottom: 6px;
        }
        .bl-trust-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: var(--bl-dark); margin-bottom: 4px;
        }
        .bl-trust-desc { font-size: .8rem; color: var(--bl-muted); line-height: 1.65; font-weight: 300; }

        /* ── GALLERY ── */
        .bl-gallery { padding: 80px 5vw; background: var(--bl-cream); }
        .bl-sec-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .62rem; letter-spacing: .22em; text-transform: uppercase;
          color: var(--bl-gold); font-weight: 600; margin-bottom: 14px;
        }
        .bl-sec-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--bl-gold); display: block; }
        .bl-sec-h {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(1.6rem,2.8vw,2.4rem); font-weight: 700;
          color: var(--bl-dark); margin-bottom: 10px; line-height: 1.2;
        }
        .bl-sec-sub { font-size: .87rem; color: var(--bl-muted); line-height: 1.75; max-width: 500px; font-weight: 300; }
        .bl-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          grid-template-rows: auto auto;
          gap: 14px; margin-top: 40px;
        }
        .bl-gallery-card {
          overflow: hidden; background: var(--bl-gold-pale);
          position: relative; aspect-ratio: 3/4;
        }
        .bl-gallery-card img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .6s;
        }
        .bl-gallery-card:hover img { transform: scale(1.06); }
        .bl-gallery-tag {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 14px 12px 12px;
          background: linear-gradient(to top, rgba(28,20,16,.65), transparent);
          font-size: .58rem; letter-spacing: .18em; text-transform: uppercase;
          color: rgba(255,255,255,.92); font-weight: 600;
        }

        /* ── DESIGNER TRUST ── */
        .bl-designer { padding: 80px 5vw; background: var(--bl-dark); }
        .bl-designer-inner {
          max-width: 900px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 2fr;
          gap: 60px; align-items: center;
        }
        .bl-designer-accent {
          position: relative; padding: 36px 32px;
          border: 1px solid rgba(184,147,90,.3);
        }
        .bl-designer-accent::before {
          content: ''; position: absolute; top: -1px; left: 36px; right: 36px;
          height: 2px; background: var(--bl-gold);
        }
        .bl-designer-name {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 700; color: var(--bl-white); margin-bottom: 6px;
        }
        .bl-designer-role {
          font-size: .58rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--bl-gold); font-weight: 600; margin-bottom: 14px;
        }
        .bl-designer-stars { color: var(--bl-gold); letter-spacing: 3px; font-size: .9rem; }
        .bl-designer-text {
          font-size: 1.05rem; line-height: 1.9; color: rgba(255,255,255,.75);
          font-weight: 300;
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-style: italic;
        }

        /* ── REVIEWS ── */
        .bl-reviews { padding: 80px 5vw; background: var(--bl-white); }
        .bl-reviews-hdr { margin-bottom: 40px; }
        .bl-reviews-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--bl-dark); color: var(--bl-white);
          font-size: .62rem; font-weight: 600; letter-spacing: .15em;
          text-transform: uppercase; padding: 10px 22px; margin-bottom: 16px;
        }
        .bl-reviews-badge-stars { color: var(--bl-gold); letter-spacing: 2px; }
        .bl-reviews-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(1.4rem,2.2vw,2rem); font-weight: 700;
          color: var(--bl-dark); margin-bottom: 0;
        }
        .bl-reviews-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .bl-review-card {
          background: var(--bl-cream); padding: 32px 28px;
          border: 1px solid rgba(184,147,90,.12);
          position: relative;
        }
        .bl-review-card::before {
          content: '"'; position: absolute; top: 16px; right: 20px;
          font-family: 'Cormorant Garamond', serif; font-size: 4rem;
          color: rgba(184,147,90,.15); line-height: 1;
        }
        .bl-review-text {
          font-size: .87rem; line-height: 1.75; color: var(--bl-text);
          font-style: italic; margin-bottom: 16px; font-weight: 300;
        }
        .bl-review-name { font-size: .72rem; font-weight: 700; color: var(--bl-dark); letter-spacing: .06em; }
        .bl-review-stars { color: var(--bl-gold); font-size: .75rem; margin-bottom: 12px; }

        /* ── PROCESS ── */
        .bl-process { padding: 80px 5vw; background: var(--bl-cream); }
        .bl-process-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 40px; }
        .bl-process-card {
          background: var(--bl-white); padding: 36px 28px;
          border: 1px solid rgba(184,147,90,.12);
          position: relative; overflow: hidden; text-align: center;
        }
        .bl-process-card::before {
          content: attr(data-step); position: absolute; top: -12px; right: 14px;
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 5rem; font-weight: 700; color: rgba(184,147,90,.1);
          pointer-events: none; line-height: 1;
        }
        .bl-process-step {
          display: inline-block; font-size: .62rem; font-weight: 700;
          letter-spacing: .2em; text-transform: uppercase; color: var(--bl-gold); margin-bottom: 14px;
        }
        .bl-process-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 700; color: var(--bl-dark);
        }

        /* ── FINAL CTA ── */
        .bl-cta-wrap { padding: 80px 5vw; background: var(--bl-cream); }
        .bl-cta-box {
          background: var(--bl-dark); padding: 72px 60px;
          text-align: center; position: relative; overflow: hidden;
          max-width: 960px; margin: 0 auto;
        }
        .bl-cta-box::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 55% at 50% 100%, rgba(184,147,90,.12) 0%, transparent 70%);
        }
        .bl-cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .62rem; letter-spacing: .22em; text-transform: uppercase;
          color: var(--bl-gold); font-weight: 600; margin-bottom: 20px;
        }
        .bl-cta-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--bl-gold); display: block; }
        .bl-cta-eyebrow::after  { content: ''; width: 20px; height: 1px; background: var(--bl-gold); display: block; }
        .bl-cta-h {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(1.8rem,3vw,2.6rem); font-weight: 700;
          color: var(--bl-white); margin-bottom: 14px; line-height: 1.2;
        }
        .bl-cta-sub {
          font-size: .9rem; line-height: 1.75; color: rgba(255,255,255,.7);
          max-width: 480px; margin: 0 auto 12px; font-weight: 300;
        }
        .bl-cta-scarcity {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: .72rem; color: rgba(255,255,255,.45); margin-bottom: 36px;
        }
        .bl-cta-scarcity::before { content: '⚑'; font-size: .7rem; }

        /* CTA FORM */
        .bl-cta-form { margin-top: 32px; position: relative; z-index: 1; }
        .bl-form-fields { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 28px; }
        .bl-form-group { display: flex; flex-direction: column; gap: 8px; text-align: left; }
        .bl-form-label {
          font-size: .62rem; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(255,255,255,.5);
        }
        .bl-form-input {
          background: rgba(255,255,255,.09); border: 1.5px solid rgba(255,255,255,.18);
          padding: 12px 16px; font-size: .87rem; color: var(--bl-white);
          outline: none; transition: border-color .2s, background .2s; width: 100%;
          font-family: 'Jost', 'Poppins', sans-serif;
        }
        .bl-form-input::placeholder { color: rgba(255,255,255,.32); }
        .bl-form-input:focus { border-color: var(--bl-gold); background: rgba(255,255,255,.13); }
        .bl-cta-btns { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .bl-cta-btn-pri {
          display: inline-flex; align-items: center; gap: 9px;
          background: var(--bl-gold); color: var(--bl-white);
          font-size: .7rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
          padding: 16px 32px; text-decoration: none;
          border: 2px solid var(--bl-gold); transition: transform .2s, box-shadow .2s;
        }
        .bl-cta-btn-pri:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,147,90,.35); }
        .bl-cta-btn-sec {
          display: inline-flex; align-items: center; gap: 9px;
          background: transparent; color: var(--bl-white);
          font-size: .7rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
          padding: 16px 32px; text-decoration: none;
          border: 2px solid rgba(255,255,255,.3); transition: background .2s;
        }
        .bl-cta-btn-sec:hover { background: rgba(255,255,255,.08); }
        .bl-form-hint {
          font-size: .72rem; color: rgba(255,255,255,.38); margin-top: 16px;
          font-style: italic;
        }

        /* ── FOOTER ── */
        .bl-footer {
          padding: 36px 5vw; text-align: center;
          background: var(--bl-white); border-top: 1px solid rgba(184,147,90,.12);
        }
        .bl-footer-name {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: var(--bl-dark);
        }
        .bl-footer-copy { font-size: .75rem; color: var(--bl-muted); margin-top: 8px; }

        /* ── FLOATING WA ── */
        .bl-float-wa {
          position: fixed; bottom: 28px; right: 24px; z-index: 200;
        }
        .bl-float-wa a {
          display: flex; align-items: center; justify-content: center;
          width: 60px; height: 60px; border-radius: 50%;
          background: #25D366; color: var(--bl-white);
          box-shadow: 0 6px 28px rgba(37,211,102,.45); position: relative;
          text-decoration: none;
        }
        .bl-float-wa a::before {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: #25D366; opacity: .55;
          animation: bl-ring 2s infinite;
        }
        @keyframes bl-ring {
          0%   { transform: scale(1); opacity: .55; }
          100% { transform: scale(1.75); opacity: 0; }
        }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px) {
          .bl-gallery-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media(max-width:768px) {
          .bl-hdr-badge { display: none; }
          .bl-hero { grid-template-columns: 1fr; gap: 36px; padding: 40px 5vw; min-height: auto; }
          .bl-hero-img-frame { border-radius: 28px; }
          .bl-hero-badge { left: 0; bottom: 20px; }
          .bl-hero-btns { flex-direction: column; }
          .bl-btn-pri, .bl-btn-sec { width: 100%; justify-content: center; }
          .bl-trust-grid { grid-template-columns: 1fr; }
          .bl-gallery-grid { grid-template-columns: repeat(2,1fr); }
          .bl-designer-inner { grid-template-columns: 1fr; gap: 32px; }
          .bl-reviews-grid { grid-template-columns: 1fr; }
          .bl-process-grid { grid-template-columns: 1fr; }
          .bl-cta-box { padding: 48px 24px; }
          .bl-form-fields { grid-template-columns: 1fr; }
          .bl-cta-btns { flex-direction: column; align-items: center; }
          .bl-cta-btn-pri, .bl-cta-btn-sec { width: 100%; justify-content: center; }
        }
        @media(max-width:480px) {
          .bl-gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="bl-body">

        {/* ── HEADER ──────────────────────────────────────────────────────────── */}
        <header className="bl-hdr">
          <div className="bl-hdr-brand">
            <div className="bl-hdr-name">Shrusara</div>
            <div className="bl-hdr-sub">Fashion Boutique, Bangalore</div>
          </div>
          <div className="bl-hdr-badge">
            <span className="bl-hdr-badge-dot" />
            Bangalore's Bridal Studio
          </div>
          <a href={WA_PREFILL} target="_blank" rel="noopener noreferrer" className="bl-hdr-cta">
            <WaIcon size={14} /> Book Consultation
          </a>
        </header>

        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <section className="bl-hero">
          <div className="bl-hero-text">
            <p className="bl-hero-eyebrow">Bridal Specialist · Bangalore</p>
            <h1 className="bl-hero-h1">
              Exquisite Bridal Blouses<br />in <em>Bangalore</em>
            </h1>
            <h2 className="bl-hero-h2">Designed for Your Big Day</h2>
            <p className="bl-hero-sub">
              Customized bridal blouses with perfect fit, premium maggam &amp; aari work, and
              complete bridal outfit guidance including lehengas and gowns.
            </p>
            <p className="bl-hero-designer">Designed personally by Chief Designer Shruthi Ajith</p>
            <p className="bl-hero-price">Bridal blouses starting from <strong>₹6,000</strong></p>
            <div className="bl-hero-btns">
              <a href={WA_PREFILL} target="_blank" rel="noopener noreferrer" className="bl-btn-pri">
                <WaIcon size={17} /> WhatsApp Design Enquiry
              </a>
              <a href={`tel:${PHONE_NUMBER}`} className="bl-btn-sec">
                <PhoneIcon size={15} /> Call Now
              </a>
            </div>
          </div>
          <div className="bl-hero-img-wrap">
            <div className="bl-hero-img-frame">
              <img
  src={heroBridal}
  alt="Bridal blouse by Shrusara Fashion Boutique Bangalore"
/>
            </div>
            <div className="bl-hero-badge">
              <div className="bl-hero-badge-num">100+</div>
              <div className="bl-hero-badge-txt">Happy Brides</div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ───────────────────────────────────────────────────────── */}
        <section className="bl-trust">
          <div className="bl-trust-grid">
            {trustPoints.map(item => (
              <div key={item.title} className="bl-trust-item">
                <div className="bl-trust-icon">{item.icon}</div>
                <div>
                  <p className="bl-trust-label">{item.label}</p>
                  <p className="bl-trust-title">{item.title}</p>
                  <p className="bl-trust-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY ─────────────────────────────────────────────────────────── */}
        <section className="bl-gallery">
          <p className="bl-sec-eyebrow">Gallery</p>
          <h2 className="bl-sec-h">Bridal Blouse Designs Crafted for Real Brides</h2>
          <p className="bl-sec-sub">
            A curated collection of customized bridal blouses, lehengas, and gowns with premium handwork.
          </p>
          <div className="bl-gallery-grid">
            {galleryItems.map((item, i) => (
              <div key={i} className="bl-gallery-card">
                <img src={item.src} alt={item.tag} loading={i < 4 ? 'eager' : 'lazy'} />
                <div className="bl-gallery-tag">{item.tag}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DESIGNER TRUST ──────────────────────────────────────────────────── */}
        <section className="bl-designer">
          <div className="bl-designer-inner">
            <div className="bl-designer-accent">
              <p className="bl-designer-role">Chief Designer</p>
              <p className="bl-designer-name">Shruthi Ajith</p>
              <p className="bl-designer-stars">★★★★★</p>
            </div>
            <p className="bl-designer-text">
              "Every bridal outfit at Shrusara — from blouses to lehengas and gowns — is
              personally guided by our Chief Designer to ensure perfect fit, styling, and finishing."
            </p>
          </div>
        </section>

        {/* ── REVIEWS ─────────────────────────────────────────────────────────── */}
        <section className="bl-reviews">
          <div className="bl-reviews-hdr">
            <div className="bl-reviews-badge">
              <span className="bl-reviews-badge-stars">★★★★★</span> 100+ Happy Brides in Bangalore
            </div>
            <h2 className="bl-reviews-title">Trusted by Brides Across Bangalore</h2>
          </div>
          <div className="bl-reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="bl-review-card">
                <p className="bl-review-stars">★★★★★</p>
                <p className="bl-review-text">{r.text}</p>
                <p className="bl-review-name">{r.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROCESS ─────────────────────────────────────────────────────────── */}
        <section className="bl-process">
          <p className="bl-sec-eyebrow">How It Works</p>
          <h2 className="bl-sec-h">Simple Bridal Outfit Design Process</h2>
          <div className="bl-process-grid">
            {processSteps.map(step => (
              <div key={step.step} className="bl-process-card" data-step={step.step}>
                <span className="bl-process-step">Step {step.step}</span>
                <h3 className="bl-process-title">{step.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
        <section className="bl-cta-wrap">
          <div className="bl-cta-box">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <p className="bl-cta-eyebrow">Bridal Consultation</p>
            </div>
            <h2 className="bl-cta-h">Send Your Bridal Design Enquiry on WhatsApp</h2>
            <p className="bl-cta-sub">
              Share your wedding date, saree details, and design preferences to get started.
            </p>
            <p className="bl-cta-scarcity">Limited bridal consultation slots available this month</p>
            <BridalCtaForm />
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
        <footer className="bl-footer">
          <p className="bl-footer-name">Shrusara Fashion Boutique</p>
          <p className="bl-footer-copy">© 2025 Shrusara. All rights reserved. Mahalakshmipuram, Bangalore.</p>
        </footer>

        {/* ── FLOATING WHATSAPP ────────────────────────────────────────────────── */}
        <div className="bl-float-wa">
          <a href={WA_PREFILL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WaIcon size={28} />
          </a>
        </div>

      </div>
    </>
  );
};

export default BridalLandingPage;