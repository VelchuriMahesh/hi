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
import gown1 from "../assets/images/bridal/bridal/gown-1.jpeg";

import gown3 from "../assets/images/bridal/bridal/gown-3.jpeg";
import gown4 from "../assets/images/bridal/bridal/gown-4.jpeg";


/**  /videos/blouse.png
 * SHRUSARA BRIDAL LANDING PAGE
 * Hero updated to match Home page split-layout style.
 * Footer updated with full address, contact, and map link.
 */

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '919741827558';
const PHONE_NUMBER    = '+919741827558';

const WA_PREFILL = `https://wa.me/919741827558?text=Hi%2C%20I%20am%20looking%20for%20a%20customized%20bridal%20outfit.%20My%20wedding%20date%20is%20%5Bdate%5D.%20I%20need%20consultation%20for%20blouse%20%2F%20lehenga%20%2F%20gown.%20I%20would%20like%20to%20consult%20with%20Chief%20Designer%20Shruthi%20Ajith.`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const trustPoints = [
  {
    icon: '✦',
    label: 'Craftsmanship',
    title: 'Premium Maggam & Aari Work',
    desc: ' Intricate handcrafted embroidery designed for bridal elegance and richness',
  },
  {
    icon: '◈',
    label: 'Fit Promise',
    title: 'Perfect Fit – Tailored for You',
    desc: 'Every measurement is customized to your body type for flawless fitting',
  },
  {
    icon: '◷',
    label: 'Reliability',
    title: 'On-Time Delivery Commitment',
    desc: 'Your bridal outfit will be ready well before your special day',
  },
];

const galleryItems = [
   { src: '/videos/11.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
    { src: '/videos/22.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
     { src: '/videos/33.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
      { src: '/videos/44.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
       { src: '/videos/55.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
        { src: '/videos/66.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
         { src: '/videos/77.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
  { src: '/videos/1.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
  { src: '/videos/2.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },
  { src: '/videos/3.jpeg', tag: 'Bridal Blouse', aspect: '3/4' },

  { src: b1, tag: 'Bridal Blouse', aspect: '3/4' },

  { src: b3, tag: 'Bridal Blouse', aspect: '3/4' },
  { src: b4, tag: 'Bridal Blouse', aspect: '3/4' },
  { src: b5, tag: 'Bridal Blouse', aspect: '3/4' },
];

const reviews = [
  { text: 'The fit was like a second skin. Best bridal boutique in Bangalore!', name: 'Priya Rao' },
  { text: 'Highly professional service and timely delivery. Shruthi Ajith is incredibly talented.', name: 'Meghana V.' },
  { text: 'They made my Pinterest dream into reality. Worth every penny!', name: 'Kavya Ramesh' },
];

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    desc: 'Discuss your wedding details, design ideas, and preferences',
  },
  {
    step: '02',
    title: 'Design Finalization',
    desc: 'Finalize blouse and outfit design, fabrics, and embroidery details',
  },
  {
    step: '03',
    title: 'Trial & Perfect Fit',
    desc: 'Ensure perfect fitting with trials and finishing touches',
  },
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

const MapPinIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
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
          <WaIcon size={18} /> WhatsApp Consultation
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

        /* ── LOGO BRAND BLOCK ── */
        .bl-hdr-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
        }
        .bl-hdr-logo {
          height: 52px;
          width: auto;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
        }
        .bl-hdr-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 1;
        }
        .bl-hdr-name {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.85rem;
          font-weight: 700;
          color: #2b2118;
          letter-spacing: 0.01em;
          line-height: 1;
          margin: 0;
        }
        .bl-hdr-sub {
          font-size: 0.52rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--bl-gold);
          font-weight: 600;
          margin-top: 5px;
          line-height: 1;
          word-spacing: 0.2em;
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

        /* ── HERO (Home-page split layout) ── */
        .bl-hero {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          width: 100%;
          min-height: 90vh;
          background: var(--bl-cream);
          position: relative;
          overflow: hidden;
        }
        .bl-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 70% at 30% 50%, rgba(184,147,90,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        .bl-hero-text {
          flex: 1.1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 80px 48px 80px 5vw;
          z-index: 2;
        }
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

        /* Hero image panel */
        .bl-hero-img-wrap {
          flex: 1;
          position: relative;
          min-height: 90vh;
          overflow: hidden;
        }
        .bl-hero-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .bl-hero-img-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, var(--bl-cream) 0%, transparent 18%);
        }

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

        /* ── CRAFTSMANSHIP ── */
        .bl-craft { padding: 80px 5vw; background: var(--bl-white); }
        .bl-craft-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: center;
        }
        .bl-craft-left {}
        .bl-craft-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .62rem; letter-spacing: .22em; text-transform: uppercase;
          color: var(--bl-gold); font-weight: 600; margin-bottom: 14px;
        }
        .bl-craft-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--bl-gold); display: block; }
        .bl-craft-h {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(1.6rem,2.8vw,2.4rem); font-weight: 700;
          color: var(--bl-dark); margin-bottom: 20px; line-height: 1.2;
        }
        .bl-craft-desc {
          font-size: .9rem; line-height: 1.85; color: var(--bl-muted);
          font-weight: 300; margin-bottom: 16px;
        }
        .bl-craft-tags {
          display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px;
        }
        .bl-craft-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--bl-gold-pale); color: var(--bl-dark);
          font-size: .62rem; font-weight: 600; letter-spacing: .12em;
          text-transform: uppercase; padding: 8px 16px;
          border: 1px solid rgba(184,147,90,.25);
        }
        .bl-craft-tag::before { content: '✦'; color: var(--bl-gold); font-size: .55rem; }
        .bl-craft-right {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .bl-craft-img-card {
          overflow: hidden; aspect-ratio: 3/4; background: var(--bl-gold-pale);
        }
        .bl-craft-img-card img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .6s;
        }
        .bl-craft-img-card:hover img { transform: scale(1.06); }
        .bl-craft-img-card:first-child {
          grid-row: span 2; aspect-ratio: auto;
        }

        /* ── DESIGNER TRUST ── */
        .bl-designer { padding: 80px 5vw; background: var(--bl-dark); }
        .bl-designer-inner {
          max-width: 960px; margin: 0 auto;
        }
        .bl-designer-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .62rem; letter-spacing: .22em; text-transform: uppercase;
          color: var(--bl-gold); font-weight: 600; margin-bottom: 14px;
        }
        .bl-designer-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--bl-gold); display: block; }
        .bl-designer-sec-h {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: clamp(1.6rem,2.8vw,2.4rem); font-weight: 700;
          color: var(--bl-white); margin-bottom: 48px; line-height: 1.2;
        }
        .bl-designer-layout {
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
        .bl-designer-right {}
        .bl-designer-text {
          font-size: 1.05rem; line-height: 1.9; color: rgba(255,255,255,.75);
          font-weight: 300;
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-style: italic; margin-bottom: 18px;
        }
        .bl-designer-sub {
          font-size: .87rem; line-height: 1.75; color: rgba(255,255,255,.5);
          font-weight: 300;
        }

        /* ── REVIEWS ── */
        .bl-reviews { padding: 80px 5vw; background: var(--bl-white); }
        .bl-reviews-hdr { margin-bottom: 12px; }
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
          color: var(--bl-dark); margin-bottom: 8px;
        }
        .bl-reviews-sub {
          font-size: .87rem; color: var(--bl-muted); line-height: 1.75;
          max-width: 520px; font-weight: 300; margin-bottom: 36px;
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
          position: relative; overflow: hidden;
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
          font-size: 1.3rem; font-weight: 700; color: var(--bl-dark); margin-bottom: 10px;
        }
        .bl-process-desc {
          font-size: .82rem; color: var(--bl-muted); line-height: 1.7; font-weight: 300;
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
          background: var(--bl-dark);
          border-top: 1px solid rgba(184,147,90,.18);
          padding: 56px 5vw 36px;
          color: rgba(255,255,255,.75);
        }
        .bl-footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .bl-footer-brand-name {
          font-family: 'Cormorant Garamond', 'Playfair Display', serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: var(--bl-white);
          letter-spacing: .03em;
          line-height: 1;
          margin-bottom: 6px;
        }
        .bl-footer-brand-tag {
          font-size: .58rem;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--bl-gold);
          font-weight: 600;
          margin-bottom: 18px;
        }
        .bl-footer-desc {
          font-size: .82rem;
          line-height: 1.8;
          color: rgba(255,255,255,.55);
          font-weight: 300;
          max-width: 380px;
          margin-bottom: 28px;
        }

        /* ── FLOATING CALL ── */
        .bl-float-call {
          position: fixed;
          bottom: 100px;
          right: 24px;
          z-index: 200;
        }
        .bl-float-call a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #000;
          color: #fff;
          box-shadow: 0 6px 28px rgba(0,0,0,.4);
          text-decoration: none;
        }
        .bl-float-call a:hover {
          background: #B8935A;
        }

        .bl-footer-divider {
          width: 40px;
          height: 1px;
          background: var(--bl-gold);
          margin-bottom: 28px;
          opacity: .6;
        }
        .bl-footer-contact-title {
          font-size: .62rem;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--bl-gold);
          font-weight: 600;
          margin-bottom: 18px;
        }
        .bl-footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .bl-footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: .82rem;
          color: rgba(255,255,255,.6);
          line-height: 1.5;
          text-decoration: none;
          transition: color .2s;
        }
        .bl-footer-contact-item:hover { color: var(--bl-gold); }
        .bl-footer-contact-icon {
          color: var(--bl-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .bl-footer-map-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--bl-gold);
          text-decoration: none;
          border: 1px solid rgba(184,147,90,.35);
          padding: 10px 18px;
          transition: background .2s, border-color .2s;
        }
        .bl-footer-map-link:hover {
          background: rgba(184,147,90,.1);
          border-color: var(--bl-gold);
        }
        .bl-footer-bottom {
          max-width: 1100px;
          margin: 40px auto 0;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .bl-footer-copy {
          font-size: .72rem;
          color: rgba(255,255,255,.28);
        }
        .bl-footer-copy-right {
          font-size: .72rem;
          color: rgba(255,255,255,.28);
        }

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
          .bl-footer-inner { grid-template-columns: 1fr; gap: 40px; }
          .bl-craft-inner { grid-template-columns: 1fr; gap: 40px; }
          .bl-designer-layout { grid-template-columns: 1fr; gap: 32px; }
        }
        @media(max-width:768px) {
          .bl-hdr-badge { display: none; }

          /* Hero responsive */
          .bl-hero { flex-direction: column; min-height: auto; }
          .bl-hero-text { padding: 50px 5vw 32px; order: 2; align-items: flex-start; }
          .bl-hero-img-wrap { order: 1; height: 55vw; min-height: 300px; min-width: 100%; }
          .bl-hero-img-wrap img { min-height: 300px; }
          .bl-hero-img-fade {
            background: linear-gradient(to bottom, transparent 60%, var(--bl-cream) 100%);
          }
          .bl-hero-btns { flex-direction: column; }
          .bl-btn-pri, .bl-btn-sec { width: 100%; justify-content: center; }

          .bl-trust-grid { grid-template-columns: 1fr; }
          .bl-gallery-grid { grid-template-columns: repeat(2,1fr); }
          .bl-craft-inner { grid-template-columns: 1fr; gap: 40px; }
          .bl-craft-right { grid-template-columns: repeat(2,1fr); }
          .bl-craft-img-card:first-child { grid-row: auto; aspect-ratio: 3/4; }
          .bl-designer-layout { grid-template-columns: 1fr; gap: 32px; }
          .bl-reviews-grid { grid-template-columns: 1fr; }
          .bl-process-grid { grid-template-columns: 1fr; }
          .bl-cta-box { padding: 48px 24px; }
          .bl-form-fields { grid-template-columns: 1fr; }
          .bl-cta-btns { flex-direction: column; align-items: center; }
          .bl-cta-btn-pri, .bl-cta-btn-sec { width: 100%; justify-content: center; }

          .bl-footer { padding: 48px 5vw 28px; }
          .bl-footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }

          /* Logo responsive on mobile */
          .bl-hdr-logo { height: 40px; }
          .bl-hdr-name { font-size: 1.4rem; }
          .bl-hdr-sub { font-size: 0.45rem; letter-spacing: 0.25em; }
        }
        @media(max-width:480px) {
          .bl-gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="bl-body">

        {/* ── HEADER ──────────────────────────────────────────────────────────── */}
        <header className="bl-hdr">
          <div className="bl-hdr-brand">
            <img
              src="/videos/logo.png"
              alt="Shrusara Logo"
              className="bl-hdr-logo"
            />
            <div className="bl-hdr-text">
              <div className="bl-hdr-name">Shrusara</div>
              <div className="bl-hdr-sub">FASHION&nbsp;&nbsp;BOUTIQUE</div>
            </div>
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
            <img
              src={heroBridal}
              alt="Bridal blouse by Shrusara Fashion Boutique Bangalore"
            />
            <div className="bl-hero-img-fade" />
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
            <br/>
            Real Brides. Real Designs. Designed at Shrusara.
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

        {/* ── CRAFTSMANSHIP ───────────────────────────────────────────────────── */}
        <section className="bl-craft">
          <div className="bl-craft-inner">
            <div className="bl-craft-left">
              <p className="bl-craft-eyebrow">Craftsmanship</p>
              <h2 className="bl-craft-h">
                Intricate Hand Embroidery –<br />Crafted to Perfection
              </h2>
              <p className="bl-craft-desc">
                Every bridal outfit at Shrusara is detailed with precision using maggam work,
                aari work, zari, and handcrafted embroidery techniques to create timeless,
                elegant designs.
              </p>
              <p className="bl-craft-desc">
                From heavy bridal blouses to complete bridal outfits, each piece reflects
                careful craftsmanship and premium finishing.
              </p>
              <div className="bl-craft-tags">
                <span className="bl-craft-tag">Maggam Work</span>
                <span className="bl-craft-tag">Aari Work</span>
                <span className="bl-craft-tag">Zari Embroidery</span>
                <span className="bl-craft-tag">Handcrafted Detailing</span>
                <span className="bl-craft-tag">Premium Finishing</span>
              </div>
            </div>
            <div className="bl-craft-right">
              <div className="bl-craft-img-card">
                <img src={b1} alt="Maggam work bridal blouse" />
              </div>
              <div className="bl-craft-img-card">
                <img src={b3} alt="Aari work bridal blouse" />
              </div>
              <div className="bl-craft-img-card">
                <img src={b4} alt="Zari embroidery bridal blouse" />
              </div>
            </div>
          </div>
        </section>

        {/* ── DESIGNER TRUST ──────────────────────────────────────────────────── */}
        <section className="bl-designer">
          <div className="bl-designer-inner">
            <p className="bl-designer-eyebrow">Designer</p>
            <h2 className="bl-designer-sec-h">Meet Your Bridal Designer</h2>
            <div className="bl-designer-layout">
              <div className="bl-designer-accent">
                <p className="bl-designer-role">Founder &amp; Chief Designer</p>
                <p className="bl-designer-name">Shruthi Ajith</p>
                <p className="bl-designer-stars">★★★★★</p>
              </div>
              <div className="bl-designer-right">
                <p className="bl-designer-text">
                  "Every bridal outfit at Shrusara — from blouse to complete bridal look — is
                  personally guided by our Chief Designer to ensure perfect fit, styling, and finishing."
                </p>
                <p className="bl-designer-sub">
                  We work closely with every bride to understand her vision and bring it to life
                  with precision and care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ─────────────────────────────────────────────────────────── */}
        <section className="bl-reviews">
          <div className="bl-reviews-hdr">
            <div className="bl-reviews-badge">
              <span className="bl-reviews-badge-stars">★★★★★</span> 100+ Happy Brides in Bangalore
            </div>
            <h2 className="bl-reviews-title">Trusted by Brides Across Bangalore</h2>
            <p className="bl-reviews-sub">
              From engagement to wedding day, we design outfits that brides truly love and feel confident in.
            </p>
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
                <p className="bl-process-desc">{step.desc}</p>
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
            <h2 className="bl-cta-h">Book Your Bridal Consultation Today</h2>
            <p className="bl-cta-sub">
              Share your wedding date, outfit details, and design preferences to get started
              with your customized bridal outfit.
            </p>
            <p className="bl-cta-scarcity">Limited bridal consultation slots available for upcoming wedding season</p>
            <BridalCtaForm />
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
        <footer className="bl-footer">
          <div className="bl-footer-inner">

            {/* Left — Brand + Description */}
            <div>
              <p className="bl-footer-brand-name">Shrusara Fashion Boutique</p>
              <p className="bl-footer-brand-tag">Bridal Boutique in Bangalore</p>
              <p className="bl-footer-desc">
                Customized bridal blouses, bridal lehengas, and bridal gowns crafted with
                premium fit, detailed handwork, and elegant finishing.
              </p>
              <div className="bl-footer-divider" />
              <p className="bl-footer-contact-title">Contact Us</p>
              <div className="bl-footer-contact-list">
                <span className="bl-footer-contact-item">
                  <span className="bl-footer-contact-icon">
                    <MapPinIcon size={15} />
                  </span>
                  106, 6th Main Road, Mahalakshmipuram, Bangalore – 560086
                </span>
                <a href="tel:+919741827558" className="bl-footer-contact-item">
                  <span className="bl-footer-contact-icon">
                    <PhoneIcon size={15} />
                  </span>
                  9741827558
                </a>
                <a href="mailto:help@shrusara.com" className="bl-footer-contact-item">
                  <span className="bl-footer-contact-icon">
                    <MailIcon size={15} />
                  </span>
                  help@shrusara.com
                </a>
              </div>
              <a
                href="https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="bl-footer-map-link"
              >
                <MapPinIcon size={13} /> View on Google Maps
              </a>
            </div>

            {/* Right — Quick CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p className="bl-footer-contact-title">Book a Consultation</p>
              <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.75, marginBottom: 24, fontWeight: 300 }}>
                Share your wedding date and design preferences to get started with a personalized bridal consultation.
              </p>
              <a
                href={WA_PREFILL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: '#25D366', color: '#fff',
                  fontSize: '.68rem', fontWeight: 600, letterSpacing: '.14em',
                  textTransform: 'uppercase', padding: '14px 24px',
                  textDecoration: 'none', marginBottom: 12,
                  transition: 'opacity .2s',
                }}
              >
                <WaIcon size={16} /> WhatsApp Us
              </a>
              <a
                href="tel:+919741827558"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: 'transparent', color: 'rgba(255,255,255,.6)',
                  fontSize: '.68rem', fontWeight: 600, letterSpacing: '.14em',
                  textTransform: 'uppercase', padding: '14px 24px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,.15)',
                  transition: 'border-color .2s, color .2s',
                }}
              >
                <PhoneIcon size={14} /> Call Now
              </a>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="bl-footer-bottom">
            <p className="bl-footer-copy">
              Shrusara Fashion Boutique · Mahalakshmipuram, Bangalore – 560086
            </p>
            <p className="bl-footer-copy-right">
              © {new Date().getFullYear()} Shrusara. All rights reserved.
            </p>
          </div>
        </footer>

        {/* ── FLOATING CALL ────────────────────────────────────────────────────── */}
        <div className="bl-float-call">
          <a href={`tel:${PHONE_NUMBER}`} aria-label="Call">
            <PhoneIcon size={26} />
          </a>
        </div>

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