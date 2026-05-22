import { useState } from 'react';
import { trackWhatsApp, trackPhoneCall } from '../utils/tracking';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919741827558';
const PHONE_NUMBER    = import.meta.env.VITE_PHONE_NUMBER    || '9741827558';

const WA_PREFILL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi, I am looking for a customized designer outfit. I would like to consult with Chief Designer Shruthi Ajith.'
)}`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const galleryItems = [
  {
    category: 'Western & Indo-Western',
    src: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp',
    title: 'Gold Indo-Western Crop Top Lehenga',
    alt: 'Gold Indo-Western Crop Top Lehenga',
    desc: 'An indo-western crop top lehenga designed with fusion styling and handcrafted premium finishing.',
  },
  {
    category: 'Western & Indo-Western',
    src: '/designer/Indowestern/contemporary-modren-bridal-trousseau-outfit-shruthi-ajith.webp',
    title: 'Ivory Indo-Western Crop Top Lehenga',
    alt: 'Ivory Indo-Western Crop Top Lehenga',
    desc: 'A contemporary crop top lehenga styled with elegant drape and indo-western bridal fusion.',
  },
  {
    category: 'Western & Indo-Western',
    src: '/designer/designer gown/designer-party-wear-designer-evening-gown-shrusara.webp',
    title: 'Midnight Wine Designer Gown',
    alt: 'Midnight Wine Designer Gown',
    desc: 'An elegant designer gown crafted with flowing silhouettes and premium finishing for statement occasion wear.',
  },
  {
    category: 'Western & Indo-Western',
    src: '/videos/designer-party-wear-designer-frock-shrusara.webp',
    title: 'Midnight Wine Couture Gown',
    alt: 'Midnight Wine Couture Gown',
    desc: 'A statement designer gown created with flowing silhouette, couture detailing, and elegant evening appeal.',
  },
  {
    category: 'Designer Gowns',
    src: '/videos/desingerhero.webp',
    title: 'Ruby One-Shoulder Designer Gown',
    alt: 'Ruby One-Shoulder Designer Gown',
    desc: 'A modern one-shoulder gown designed with bold styling and premium designer finishing.',
  },
  {
    category: 'Designer Gowns',
    src: '/designer/Partwearset/elegant-designer-evening-gown-for-shruthi-ajith-bangalore.webp',
    title: 'Crimson Trail Party Gown',
    alt: 'Crimson Trail Party Gown',
    desc: 'A dramatic party gown featuring a flowing trail and statement fashion-forward silhouette.',
  },
  {
    category: 'Designer Gowns',
    src: '/bridal/Gown/elegant-modern-reception-gown-brides-featuring-silhouette-premium-fabric.webp',
    title: 'Elegant Reception Gown',
    alt: 'Elegant Reception Gown',
    desc: 'A graceful white reception gown designed with elegant silhouettes and premium bridal finishing.',
  },
  {
    category: 'Designer Gowns',
    src: '/designer/designer gown/premium-designer-ball-gown-for-engagement-bangalore.webp',
    title: 'Mint Luxe Designer Ball Gown',
    alt: 'Mint Luxe Designer Ball Gown',
    desc: 'A voluminous designer ball gown crafted for engagement, reception, and luxury occasion wear.',
  },
  {
    category: 'Designer Gowns',
    src: '/designer/designer gown/modern-gown-maternity-photoshoot-premium-finishing-shrusara-banaglore.webp',
    title: 'Royal Blue Maternity Gown',
    alt: 'Royal Blue Maternity Gown',
    desc: 'A graceful maternity gown designed with elegant drape, comfort, and premium photoshoot styling.',
  },
  {
    category: 'Party Wear',
    src: '/designer/Partwearset/custom-photoshoot-red-gown-reception-wear-bangalore.webp',
    title: 'Scarlet Evening Designer Gown',
    alt: 'Scarlet Evening Designer Gown',
    desc: 'A refined evening gown designed with sleek silhouettes and premium occasion wear finishing.',
  },
  {
    category: 'Party Wear',
    src: '/designer/designer gown/elegant-evening-gown-brides-featuring-modern-silhouette-premium-fabric.webp',
    title: 'Noir Evening Couple Couture',
    alt: 'Noir Evening Couple Couture',
    desc: 'A coordinated designer couple look crafted for evening occasions with elegant contemporary styling.',
  },
  {
    category: 'Party Wear',
    src: '/designer/designer gown/modern-gown-bridal-reception-premium-finishing-Shrusara-banaglore.webp',
    title: 'Floral Trail Indo-Western Gown',
    alt: 'Floral Trail Indo-Western Gown',
    desc: 'A dramatic indo-western gown designed with a flowing trail and modern couture-inspired styling.',
  },
  {
    category: 'Party Wear',
    src: '/designer/Partwearset/designer-blouse-saree-bangalore-shrusara.webp',
    title: 'Contemporary Designer Blouse',
    alt: 'Contemporary Designer Blouse',
    desc: 'A customized designer blouse crafted with modern styling and premium couture detailing.',
  },
  {
    category: 'Party Wear',
    src: '/videos/ready-to-wear-designer-saree-bangalore-shrusara.webp',
    title: 'Ready-to-Wear Designer Saree',
    alt: 'Ready-to-Wear Designer Saree',
    desc: 'A ready-to-wear designer saree crafted for elegant drape, comfort, and effortless occasion styling.',
  },
  {
    category: 'Party Wear',
    src: '/designer/designer gown/reception-gown-for-brides-shrusara-fashion-boutique.webp',
    title: 'Floral Tail Couture Gown',
    alt: 'Floral Tail Couture Gown',
    desc: 'A statement couture gown featuring a dramatic tail silhouette and modern designer detailing.',
  },
  {
    category: 'Party Wear',
    src: '/designer/Partwearset/modern-tail-gown-reception-premium-finishing-shrusara-banaglore.webp',
    title: 'Rose Motion Couture Gown',
    alt: 'Rose Motion Couture Gown',
    desc: 'A couture-inspired designer gown styled with movement, elegance, and premium occasion wear detailing.',
  },
  {
    category: 'Crop Top & Lehenga Sets',
    src: '/videos/designer-croptop-lehenga-bangalore-shruthi-shrusara.webp',
    title: 'Designer Crop Top Lehenga',
    alt: 'Designer Crop Top Lehenga',
    desc: 'A stylish designer crop top lehenga set crafted with modern detailing and festive elegance.',
  },
  {
    category: 'Crop Top & Lehenga Sets',
    src: '/bridal/Lehenga/luxury-bridal-lehenga-custom-design-bangalore.webp',
    title: 'Luxury Bridal Lehenga',
    alt: 'Luxury Bridal Lehenga',
    desc: 'A reception bridal ensemble crafted for modern elegance with premium finishing and refined styling.',
  },
  {
    category: 'Crop Top & Lehenga Sets',
    src: '/bridal/bridalblow/custom-made-bridal-reception-lehenga-shrusara.webp',
    title: 'Custom Made Bridal Reception Lehenga Shrusara',
    alt: 'Custom Made Bridal Reception Lehenga Shrusara',
    desc: 'A custom made bridal reception lehenga designed with elegant detailing and premium finishing.',
  },
  {
    category: 'Mother & Daughter Outfits',
    src: '/videos/mother-and-daughter-premium-matching-frock-shrusara-boutique.webp',
    title: 'Mother Daughter Heritage Set',
    alt: 'Mother Daughter Heritage Set',
    desc: 'A couture-inspired designer gown styled with movement, elegance, and premium occasion wear detailing.',
  },
  {
    category: 'Mother & Daughter Outfits',
    src: '/videos/mother-and-daughter-matching-frock-shrusara-boutique.webp',
    title: 'Mommy & Me Princess Set',
    alt: 'Mommy & Me Princess Set',
    desc: 'Traditional matching outfits designed for beautiful family festive moments.',
  },
];

const CATEGORIES = [
  'All',
  'Western & Indo-Western',
  'Party Wear',
  'Designer Gowns',
  'Crop Top & Lehenga Sets',
  'Mother & Daughter Outfits',
];

const trustPoints = [
  { icon: '◈', label: 'Made for You',   title: 'Designed for Your Body',     desc: 'Each outfit is designed based on your body type, event, and personal style' },
  { icon: '✦', label: 'Style First',    title: 'Modern Meets Elegant',       desc: 'Contemporary designs that balance comfort and fashion effortlessly' },
  { icon: '◷', label: 'Perfect Fit',    title: 'Precision-Fit Guarantee',    desc: 'Precise measurements ensure a flawless, second-skin fit for every outfit' },
  { icon: '★', label: 'Premium Finish', title: 'Luxury Quality Throughout',  desc: 'High-quality stitching, fabrics, and detailing for a truly luxurious look' },
];

const services = [
   { icon: '◈', title: 'Designer Gowns',             desc: 'Customized designer gowns for receptions, parties and special occasions, crafted with premium fabrics, elegant silhouettes and perfect boutique fitting.' },
   { icon: '✦', title: 'Indo-Western Outfits',        desc: 'Customized Indo-western outfits blending modern styling with traditional elegance, tailored beautifully for contemporary occasions and celebrations.' },
   { icon: '◷', title: 'Designer Blouses',            desc: 'Customized designer blouses with premium embroidery, unique patterns and elegant finishing tailored beautifully for every occasion.' },
   { icon: '★', title: 'Crop Top & Lehenga Sets',     desc: 'Customized crop tops and lehenga sets crafted stylishly for festive events, weddings and modern ethnic celebrations.' },
   { icon: '✒', title: 'Kurtha Sets',                 desc: 'Customized kurtha sets designed with contemporary styling, premium tailoring and elegant comfort for casual and festive occasions.' },
   { icon: '◉', title: 'Ready-to-Wear Sarees',        desc: 'Convert your sarees into elegant ready-to-wear concepts with customized pre-draped styling for comfort, convenience and modern occasions.' },
   { icon: '✿', title: 'Mother & Daughter Outfits',   desc: 'Customized matching outfits for mothers and daughters, beautifully tailored for birthdays, weddings and memorable family occasions.' },
   { icon: '◆', title: 'Saree Conversion Outfits',    desc: 'Transform your sarees into customized lehengas, gowns, crop tops and designer outfits crafted beautifully with premium boutique finishing.' },
 ];

const reviews = [
  { name: 'Kavitha M.',  text: 'I ordered a custom designer gown from Shrusara for my sister\'s reception. The fitting was absolutely perfect and Shruthi Ajith personally helped me choose the right design. An outstanding boutique in Bangalore!' },
  { name: 'Pooja D.',    text: 'My Indo-western outfit for the Diwali party was absolutely stunning. The tailoring was precise and it was delivered on time. Shrusara truly understands what modern women want from their designer outfits.' },
  { name: 'Smitha R.',   text: 'I got a mother-daughter matching set made at Shrusara for a family function. The quality and attention to detail were exceptional. We received so many compliments! Highly recommended boutique in Bangalore.' },
  { name: 'Nandini K.',  text: 'The crop top and lehenga set I ordered was beyond my expectations. Shruthi Ajith guided me through the entire design process and the outcome was simply gorgeous. Perfect fit and premium finishing.' },
  { name: 'Haritha S.',  text: 'Shrusara delivered my designer blouse exactly the way I imagined. The craftsmanship is superb and the consultation was so helpful. They really listen to what you want and bring it to life beautifully.' },
  { name: 'Anjali T.',   text: 'I was pleasantly surprised by the quality of the kurtha set I ordered. The fabric was premium and the stitching was flawless. Shrusara is now my go-to designer boutique in Bangalore for all occasions.' },
];

const processSteps = [
  { step: '01', title: 'Consultation',           desc: 'Share your occasion, style preferences, and design ideas. Our Chief Designer will guide you personally.' },
  { step: '02', title: 'Design Selection',       desc: 'We finalize the outfit design, fabric, pattern, and styling based on your requirement.' },
  { step: '03', title: 'Trial & Final Delivery', desc: 'Trial and fitting adjustments ensure your outfit is delivered perfectly before your event.' },
];

const whyPoints = [
  { icon: '✦', text: 'Personalized consultation by Chief Designer Shruthi Ajith' },
  { icon: '◈', text: 'Expertise in both modern and ethnic designer outfits' },
  { icon: '◷', text: 'Focus on perfect fitting and premium finishing' },
  { icon: '★', text: 'High-quality fabrics and detailed craftsmanship' },
  { icon: '✒', text: 'On-time delivery with proper trial support' },
];

// ─── Tracking Helper ──────────────────────────────────────────────────────────
function trackFormSubmit(formData = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'consultation_form_submit', {
    event_category: 'Lead',
    event_label: 'designer_landing_page',
    occasion: formData.occasion || 'not_filled',
    style_pref: formData.stylePref ? 'filled' : 'not_filled',
    design_idea: formData.designIdea ? 'filled' : 'not_filled',
    value: 1,
  });
}

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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

const GoogleIcon = ({ size = 38 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} aria-label="Google" role="img" style={{ flexShrink: 0 }}>
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.6 35.4 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C36.9 36.8 44 31 44 24c0-1.3-.1-2.6-.4-3.9z"/>
  </svg>
);

// ─── Image Modal ──────────────────────────────────────────────────────────────
function ImageModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="dlm-overlay" onClick={onClose}>
      <div className="dlm-box" onClick={e => e.stopPropagation()}>
        <button className="dlm-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="dlm-img-wrap">
          <img src={item.src} alt={item.alt} />
        </div>
        <div className="dlm-body">
          <p className="dlm-eyebrow">Design Preview</p>
          <h3 className="dlm-title">{item.title}</h3>
          <p className="dlm-desc">{item.desc}</p>
          <button className="dlm-btn-cont" onClick={onClose}>Close Preview</button>
        </div>
      </div>
    </div>
  );
}

// ─── CTA Form ─────────────────────────────────────────────────────────────────
function DesignerCtaForm() {
  const [occasion, setOccasion]     = useState('');
  const [stylePref, setStylePref]   = useState('');
  const [designIdea, setDesignIdea] = useState('');

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I am looking for a customized designer outfit.\nOccasion: ${occasion || '[occasion]'}.\nStyle preference: ${stylePref || '—'}.\nDesign idea: ${designIdea || '—'}.\nI would like to consult with Chief Designer Shruthi Ajith.`
  )}`;

  const handleWhatsAppClick = () => {
    trackFormSubmit({ occasion, stylePref, designIdea });
    trackWhatsApp('cta_form_designer');
  };

  return (
    <div className="dl-cta-form">
      <div className="dl-form-fields">
        <div className="dl-form-group">
          <label className="dl-form-label" htmlFor="dl-occasion">Your Occasion</label>
          <input id="dl-occasion" className="dl-form-input" type="text" placeholder="e.g. Reception, Party, Festival" value={occasion} onChange={e => setOccasion(e.target.value)} />
        </div>
        <div className="dl-form-group">
          <label className="dl-form-label" htmlFor="dl-style">Preferred Style</label>
          <input id="dl-style" className="dl-form-input" type="text" placeholder="e.g. Gown, Indo-Western, Kurtha" value={stylePref} onChange={e => setStylePref(e.target.value)} />
        </div>
        <div className="dl-form-group">
          <label className="dl-form-label" htmlFor="dl-design">Design Ideas</label>
          <input id="dl-design" className="dl-form-input" type="text" placeholder="e.g. Flowy, Embroidered, Pastel" value={designIdea} onChange={e => setDesignIdea(e.target.value)} />
        </div>
      </div>
      <div className="dl-cta-btns">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="dl-cta-btn-pri"
          onClick={handleWhatsAppClick}
        >
          <WaIcon size={18} /> WhatsApp Enquiry
        </a>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="dl-cta-btn-sec"
          onClick={() => trackPhoneCall('cta_form_designer')}
        >
          <PhoneIcon size={16} /> Call Now
        </a>
      </div>
      <p className="dl-form-hint">Your details will be pre-filled in WhatsApp — just hit send.</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const DesignerLandingPage = () => {
  const [modalItem, setModalItem]           = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGallery = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --dl-gold:      #B8935A;
          --dl-gold-pale: #F5EDD9;
          --dl-dark:      #1C1410;
          --dl-cream:     #FBF8F3;
          --dl-text:      #3A2E25;
          --dl-muted:     #7A6A5A;
          --dl-white:     #FFFFFF;
        }
        .dl-body {
          font-family: 'Jost', 'Poppins', sans-serif;
          background: var(--dl-cream);
          color: var(--dl-text);
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
        }
        .dl-hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(251,248,243,.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(184,147,90,.15);
          padding: 0 4vw;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px; gap: 8px;
        }
        .dl-hdr-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .dl-hdr-logo  { height: 44px; width: auto; object-fit: contain; display: block; }
        .dl-hdr-name  { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: 1.5rem; font-weight: 700; color: #2b2118; line-height: 1; white-space: nowrap; }
        .dl-hdr-sub   { font-size: .48rem; letter-spacing: .28em; text-transform: uppercase; color: var(--dl-gold); font-weight: 600; margin-top: 4px; line-height: 1; }
        .dl-hdr-badge { display: flex; align-items: center; gap: 6px; font-size: .56rem; letter-spacing: .15em; text-transform: uppercase; color: var(--dl-muted); font-weight: 500; white-space: nowrap; }
        .dl-hdr-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #4CAF50; animation: dl-pulse 2s infinite; flex-shrink: 0; }
        @keyframes dl-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .dl-hdr-cta {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--dl-dark); color: var(--dl-white);
          font-size: .58rem; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; padding: 10px 16px;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: background .2s;
        }
        .dl-hdr-cta:hover { background: var(--dl-gold); }
        .dl-hero {
          display: flex; flex-direction: row; align-items: stretch;
          width: 100%; min-height: 88vh;
          background: var(--dl-cream); position: relative; overflow: hidden;
        }
        .dl-hero::before {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse 60% 70% at 30% 50%, rgba(184,147,90,.08) 0%, transparent 70%);
        }
        .dl-hero-text {
          flex: 1.1; display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          padding: 72px 40px 72px 5vw; z-index: 2;
        }
        .dl-hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: .6rem; letter-spacing: .24em; text-transform: uppercase; color: var(--dl-gold); font-weight: 600; margin-bottom: 18px; }
        .dl-hero-eyebrow::before { content: ''; width: 24px; height: 1px; background: var(--dl-gold); display: block; }
        .dl-hero-h1 { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: clamp(1.75rem,3vw,3.2rem); font-weight: 700; line-height: 1.12; color: var(--dl-dark); margin-bottom: 10px; }
        .dl-hero-h1 em { font-style: italic; color: var(--dl-gold); }
        .dl-hero-h2 { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: clamp(1rem,1.5vw,1.5rem); font-weight: 400; font-style: italic; color: var(--dl-muted); margin-bottom: 18px; line-height: 1.35; }
        .dl-hero-sub { font-size: .86rem; line-height: 1.8; color: var(--dl-muted); max-width: 440px; margin-bottom: 6px; font-weight: 300; }
        .dl-hero-designer { display: inline-flex; align-items: center; gap: 7px; font-size: .7rem; font-weight: 600; letter-spacing: .06em; color: var(--dl-dark); margin-bottom: 6px; }
        .dl-hero-designer::before { content: '✦'; color: var(--dl-gold); font-size: .68rem; }
        .dl-hero-price { font-size: .74rem; color: var(--dl-muted); margin-bottom: 10px; }
        .dl-hero-price strong { color: var(--dl-dark); font-weight: 700; }
        .dl-hero-scarcity { display: inline-flex; align-items: center; gap: 6px; font-size: .66rem; color: rgba(184,147,90,.85); font-weight: 500; letter-spacing: .04em; margin-bottom: 24px; }
        .dl-hero-scarcity::before { content: '⚑'; font-size: .63rem; }
        .dl-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .dl-hero-img-wrap { flex: 1; position: relative; min-height: 88vh; overflow: hidden; }
        .dl-hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        .dl-hero-img-fade { position: absolute; inset: 0; background: linear-gradient(to right, var(--dl-cream) 0%, transparent 18%); }
        .dl-btn-pri { display: inline-flex; align-items: center; gap: 9px; background: var(--dl-dark); color: var(--dl-white); font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 14px 24px; text-decoration: none; border: 2px solid var(--dl-dark); transition: transform .2s, box-shadow .2s; }
        .dl-btn-pri:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,20,16,.2); }
        .dl-btn-sec { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--dl-dark); font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 14px 24px; text-decoration: none; border: 2px solid var(--dl-dark); transition: background .2s, color .2s; }
        .dl-btn-sec:hover { background: var(--dl-dark); color: var(--dl-white); }
        .dl-trust { padding: 0 4vw 56px; background: var(--dl-white); }
        .dl-trust-heading { padding: 48px 0 28px; text-align: center; }
        .dl-trust-heading h2 { font-family: 'Cormorant Garamond',serif; font-size: clamp(1.45rem,2.2vw,2.1rem); font-weight: 700; color: var(--dl-dark); margin-bottom: 8px; }
        .dl-trust-heading p { font-size: .85rem; color: var(--dl-muted); font-weight: 300; max-width: 520px; margin: 0 auto; }
        .dl-trust-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: rgba(184,147,90,.12); }
        .dl-trust-item { background: var(--dl-white); padding: 26px 20px; display: flex; align-items: flex-start; gap: 13px; }
        .dl-trust-icon { width: 36px; height: 36px; border-radius: 50%; background: var(--dl-gold-pale); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: .9rem; color: var(--dl-gold); }
        .dl-trust-label { font-size: .56rem; letter-spacing: .18em; text-transform: uppercase; color: var(--dl-gold); font-weight: 600; margin-bottom: 5px; }
        .dl-trust-title { font-family: 'Cormorant Garamond',serif; font-size: 1rem; font-weight: 700; color: var(--dl-dark); margin-bottom: 4px; }
        .dl-trust-desc  { font-size: .78rem; color: var(--dl-muted); line-height: 1.6; font-weight: 300; }
        .dl-sec-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; color: var(--dl-gold); font-weight: 600; margin-bottom: 12px; }
        .dl-sec-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--dl-gold); display: block; }
        .dl-sec-h   { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: clamp(1.45rem,2.6vw,2.4rem); font-weight: 700; color: var(--dl-dark); margin-bottom: 10px; line-height: 1.2; }
        .dl-sec-sub { font-size: .85rem; color: var(--dl-muted); line-height: 1.72; max-width: 520px; font-weight: 300; }
        .dl-services { padding: 64px 4vw; background: var(--dl-cream); }
        .dl-services-desc { font-size: .88rem; line-height: 1.82; color: var(--dl-muted); max-width: 760px; margin-bottom: 36px; font-weight: 300; }
        .dl-services-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .dl-service-card { background: var(--dl-white); border: 1px solid rgba(184,147,90,.12); padding: 24px 18px; transition: transform .2s, box-shadow .2s; }
        .dl-service-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(28,20,16,.10); }
        .dl-service-icon  { width: 36px; height: 36px; border-radius: 50%; background: var(--dl-gold-pale); display: flex; align-items: center; justify-content: center; font-size: .9rem; color: var(--dl-gold); margin-bottom: 12px; }
        .dl-service-title { font-family: 'Cormorant Garamond',serif; font-size: 1rem; font-weight: 700; color: var(--dl-dark); margin-bottom: 7px; }
        .dl-service-desc  { font-size: .76rem; color: var(--dl-muted); line-height: 1.62; font-weight: 300; }
        .dl-gallery { padding: 64px 4vw; background: var(--dl-white); }
        .dl-gallery-filters { display: flex; gap: 8px; flex-wrap: wrap; margin: 24px 0 28px; }
        .dl-filter-btn { display: inline-flex; align-items: center; font-size: .6rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; padding: 9px 18px; border: 1.5px solid rgba(184,147,90,.35); background: transparent; color: var(--dl-muted); cursor: pointer; transition: all .2s; white-space: nowrap; }
        .dl-filter-btn:hover { border-color: var(--dl-gold); color: var(--dl-gold); }
        .dl-filter-btn.active { background: var(--dl-dark); border-color: var(--dl-dark); color: var(--dl-white); }
        .dl-gallery-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .dl-gallery-card { overflow: hidden; border-radius: 22px; border: 1px solid rgba(255,255,255,.6); background: rgba(255,255,255,.82); padding: 10px; box-shadow: 0 4px 20px rgba(28,20,16,.10); transition: transform .3s, box-shadow .3s; cursor: pointer; width: 100%; text-align: left; appearance: none; -webkit-appearance: none; display: block; }
        .dl-gallery-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(28,20,16,.16); }
        .dl-gallery-card-inner { border-radius: 16px; overflow: hidden; background: var(--dl-gold-pale); aspect-ratio: 4/5; }
        .dl-gallery-card-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .dl-gallery-card:hover .dl-gallery-card-inner img { transform: scale(1.05); }
        .dl-why { padding: 64px 4vw; background: var(--dl-cream); }
        .dl-why-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .dl-why-list { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; }
        .dl-why-item { display: flex; align-items: flex-start; gap: 13px; padding: 18px 20px; background: var(--dl-white); border: 1px solid rgba(184,147,90,.12); transition: border-color .2s; }
        .dl-why-item:hover { border-color: rgba(184,147,90,.4); }
        .dl-why-item-icon { width: 32px; height: 32px; border-radius: 50%; background: var(--dl-gold-pale); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: .82rem; color: var(--dl-gold); }
        .dl-why-item-text { font-size: .83rem; color: var(--dl-text); line-height: 1.58; font-weight: 400; }
        .dl-why-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .dl-why-img-card  { overflow: hidden; border-radius: 18px; border: 1px solid rgba(255,255,255,.6); background: rgba(255,255,255,.82); padding: 8px; box-shadow: 0 4px 18px rgba(28,20,16,.09); transition: transform .3s, box-shadow .3s; }
        .dl-why-img-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(28,20,16,.14); }
        .dl-why-img-inner { border-radius: 14px; overflow: hidden; background: var(--dl-gold-pale); aspect-ratio: 3/4; }
        .dl-why-img-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .dl-why-img-card:hover .dl-why-img-inner img { transform: scale(1.05); }
        .dl-trust-sec { padding: 80px 4vw; background: var(--dl-white); text-align: center; }
        .dl-img-top-label { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 22px; }
        .dl-img-top-label span { font-size: .62rem; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; color: var(--dl-gold); }
        .dl-img-line { width: 40px; height: 1px; background: var(--dl-gold); opacity: .6; }
        .dl-img-main-h   { font-family: 'Cormorant Garamond',serif; font-size: clamp(1.9rem,3.8vw,3.6rem); color: #2b2118; margin: 0 0 14px; font-weight: 700; }
        .dl-img-main-sub { font-size: 1rem; color: var(--dl-muted); line-height: 1.6; max-width: 560px; margin: 0 auto 44px; font-weight: 300; }
        .dl-img-google-card { background: white; border-radius: 30px; padding: 22px 40px; max-width: 860px; margin: 0 auto 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; box-shadow: 0 12px 40px rgba(0,0,0,.03); border: 1px solid rgba(0,0,0,.03); }
        .dl-img-card-div  { width: 1px; height: 46px; background: #eee; flex-shrink: 0; }
        .dl-img-rating-wrap { display: flex; align-items: center; gap: 16px; text-align: left; }
        .dl-img-big-num   { font-size: 3.8rem; font-weight: 700; color: #2b2118; line-height: 1; font-family: 'Jost',sans-serif; }
        .dl-img-stars-group { display: flex; flex-direction: column; gap: 2px; }
        .dl-img-stars-row { color: #FFB400; font-size: 1.5rem; letter-spacing: 2px; line-height: 1; }
        .dl-img-source-lbl{ font-size: 1rem; font-weight: 600; color: #444; }
        .dl-img-sub-row   { font-size: .92rem; color: var(--dl-muted); text-align: left; }
        .dl-img-sub-row strong { color: #2b2118; font-weight: 700; }
        .dl-img-pill-btn  { border: 1px solid var(--dl-gold); border-radius: 100px; padding: 13px 28px; color: var(--dl-gold); font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; text-decoration: none; display: flex; align-items: center; gap: 10px; transition: all .2s; }
        .dl-img-pill-btn:hover { background: var(--dl-gold); color: white; }
        .dl-img-black-badge { background: #251D18; border-radius: 18px; padding: 22px 40px; max-width: 620px; margin: 0 auto; display: flex; align-items: center; gap: 28px; text-align: left; position: relative; }
        .dl-img-black-badge::after { content: ""; position: absolute; bottom: 0; left: 12%; right: 45%; height: 4px; background: #A88A64; border-radius: 10px 10px 0 0; }
        .dl-img-people-icon { color: #A88A64; flex-shrink: 0; }
        .dl-img-badge-div { width: 1px; height: 56px; background: rgba(168,138,100,.2); }
        .dl-img-badge-stars { color: #A88A64; font-size: 1.3rem; letter-spacing: 4px; margin-bottom: 10px; line-height: 1; }
        .dl-img-badge-content h3 { color: #A88A64; font-size: 1rem; font-weight: 700; letter-spacing: .05em; margin: 0 0 5px; text-transform: uppercase; }
        .dl-img-badge-content p  { color: #9C9C9C; font-size: .95rem; margin: 0; font-weight: 300; }
        .dl-process { padding: 64px 4vw; background: var(--dl-cream); }
        .dl-process-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 32px; }
        .dl-process-card { background: var(--dl-white); padding: 28px 22px; border: 1px solid rgba(184,147,90,.12); position: relative; overflow: hidden; }
        .dl-process-card::before { content: attr(data-step); position: absolute; top: -12px; right: 12px; font-family: 'Cormorant Garamond',serif; font-size: 4.5rem; font-weight: 700; color: rgba(184,147,90,.1); pointer-events: none; line-height: 1; }
        .dl-process-step  { display: inline-block; font-size: .6rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--dl-gold); margin-bottom: 10px; }
        .dl-process-title { font-family: 'Cormorant Garamond',serif; font-size: 1.2rem; font-weight: 700; color: var(--dl-dark); margin-bottom: 8px; }
        .dl-process-desc  { font-size: .8rem; color: var(--dl-muted); line-height: 1.66; font-weight: 300; }
        .dl-reviews { padding: 64px 4vw; background: var(--dl-white); }
        .dl-reviews-hdr { text-align: center; max-width: 680px; margin: 0 auto 40px; }
        .dl-reviews-title { font-family: 'Cormorant Garamond',serif; font-size: clamp(1.45rem,2.6vw,2.4rem); font-weight: 700; color: var(--dl-dark); margin-bottom: 8px; line-height: 1.2; }
        .dl-reviews-sub   { font-size: .85rem; color: var(--dl-muted); line-height: 1.7; font-weight: 300; }
        .dl-reviews-grid  { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; max-width: 1100px; margin: 0 auto; }
        .dl-review-card   { background: var(--dl-cream); border: 1px solid rgba(184,147,90,.14); border-radius: 14px; padding: 22px 18px; box-shadow: 0 2px 12px rgba(28,20,16,.05); }
        .dl-review-stars  { color: #FFC107; letter-spacing: 3px; font-size: .88rem; margin-bottom: 10px; }
        .dl-review-text   { font-size: .82rem; line-height: 1.72; color: var(--dl-text); font-weight: 300; margin-bottom: 14px; font-style: italic; }
        .dl-review-name   { font-size: .7rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--dl-dark); }
        .dl-cta-wrap { padding: 64px 4vw; background: var(--dl-cream); }
        .dl-cta-box  { background: var(--dl-dark); padding: 60px 48px; text-align: center; position: relative; overflow: hidden; max-width: 960px; margin: 0 auto; }
        .dl-cta-box::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 70% 55% at 50% 100%, rgba(184,147,90,.12) 0%, transparent 70%); }
        .dl-cta-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; color: var(--dl-gold); font-weight: 600; margin-bottom: 18px; }
        .dl-cta-eyebrow::before, .dl-cta-eyebrow::after { content: ''; width: 18px; height: 1px; background: var(--dl-gold); display: block; }
        .dl-cta-h   { font-family: 'Cormorant Garamond',serif; font-size: clamp(1.6rem,2.8vw,2.6rem); font-weight: 700; color: var(--dl-white); margin-bottom: 12px; line-height: 1.2; }
        .dl-cta-sub { font-size: .88rem; line-height: 1.72; color: rgba(255,255,255,.7); max-width: 500px; margin: 0 auto 10px; font-weight: 300; }
        .dl-cta-highlights { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; margin-bottom: 24px; }
        .dl-cta-highlight { display: inline-flex; align-items: center; gap: 6px; font-size: .66rem; color: rgba(255,255,255,.55); font-weight: 500; }
        .dl-cta-highlight::before { content: '✦'; color: var(--dl-gold); font-size: .58rem; }
        .dl-cta-scarcity { display: inline-flex; align-items: center; gap: 6px; font-size: .68rem; color: rgba(255,255,255,.42); margin-bottom: 32px; }
        .dl-cta-scarcity::before { content: '⚑'; font-size: .66rem; }
        .dl-cta-form { margin-top: 28px; position: relative; z-index: 1; }
        .dl-form-fields { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 22px; }
        .dl-form-group  { display: flex; flex-direction: column; gap: 7px; text-align: left; }
        .dl-form-label  { font-size: .6rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.5); }
        .dl-form-input  { background: rgba(255,255,255,.09); border: 1.5px solid rgba(255,255,255,.18); padding: 11px 14px; font-size: .85rem; color: var(--dl-white); outline: none; transition: border-color .2s, background .2s; width: 100%; font-family: 'Jost','Poppins',sans-serif; }
        .dl-form-input::placeholder { color: rgba(255,255,255,.32); }
        .dl-form-input:focus { border-color: var(--dl-gold); background: rgba(255,255,255,.13); }
        .dl-cta-btns    { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .dl-cta-btn-pri { display: inline-flex; align-items: center; gap: 9px; background: var(--dl-gold); color: var(--dl-white); font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 14px 28px; text-decoration: none; border: 2px solid var(--dl-gold); transition: transform .2s, box-shadow .2s; }
        .dl-cta-btn-pri:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,147,90,.35); }
        .dl-cta-btn-sec { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--dl-white); font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 14px 28px; text-decoration: none; border: 2px solid rgba(255,255,255,.3); transition: background .2s; }
        .dl-cta-btn-sec:hover { background: rgba(255,255,255,.08); }
        .dl-form-hint   { font-size: .7rem; color: rgba(255,255,255,.36); margin-top: 14px; font-style: italic; }
        .dl-footer { background: var(--dl-dark); border-top: 1px solid rgba(184,147,90,.18); padding: 32px 4vw 20px; }
        .dl-footer-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: flex-start; gap: 28px 48px; }
        .dl-footer-brand { display: flex; flex-direction: column; gap: 4px; min-width: 180px; flex: 1.2; }
        .dl-footer-brand-name { font-family: 'Cormorant Garamond',serif; font-size: 1.2rem; font-weight: 700; color: var(--dl-white); margin: 0; }
        .dl-footer-brand-tag  { font-size: .5rem; letter-spacing: .18em; text-transform: uppercase; color: var(--dl-gold); font-weight: 600; margin-bottom: 8px; }
        .dl-footer-desc { font-size: .74rem; line-height: 1.68; color: rgba(255,255,255,.42); font-weight: 300; max-width: 280px; margin: 0; }
        .dl-footer-seo  { font-size: .7rem; line-height: 1.68; color: rgba(255,255,255,.24); font-weight: 300; max-width: 320px; margin: 8px 0 0; }
        .dl-footer-divider-v { width: 1px; align-self: stretch; background: rgba(184,147,90,.15); flex-shrink: 0; }
        .dl-footer-contact { flex: 1; min-width: 180px; }
        .dl-footer-contact-title { font-size: .54rem; letter-spacing: .18em; text-transform: uppercase; color: var(--dl-gold); font-weight: 600; margin-bottom: 12px; }
        .dl-footer-contact-list  { display: flex; flex-direction: column; gap: 9px; }
        .dl-footer-contact-item  { display: flex; align-items: flex-start; gap: 8px; font-size: .74rem; color: rgba(255,255,255,.52); line-height: 1.44; text-decoration: none; transition: color .2s; }
        .dl-footer-contact-item:hover { color: var(--dl-gold); }
        .dl-footer-contact-icon { color: var(--dl-gold); flex-shrink: 0; margin-top: 2px; }
        .dl-footer-map-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; font-size: .58rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--dl-gold); text-decoration: none; border: 1px solid rgba(184,147,90,.3); padding: 6px 12px; transition: background .2s; }
        .dl-footer-map-link:hover { background: rgba(184,147,90,.1); }
        .dl-footer-bottom { max-width: 1100px; margin: 18px auto 0; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.06); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .dl-footer-copy     { font-size: .62rem; color: rgba(255,255,255,.22); }
        .dl-footer-seo-bottom { font-size: .6rem; color: rgba(255,255,255,.16); text-align: right; }
        .dl-float-call { position: fixed; bottom: 96px; right: 20px; z-index: 200; }
        .dl-float-call a { display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; background: #000; color: #fff; box-shadow: 0 6px 24px rgba(0,0,0,.4); text-decoration: none; }
        .dl-float-call a:hover { background: #B8935A; }
        .dl-float-wa { position: fixed; bottom: 24px; right: 20px; z-index: 200; }
        .dl-float-wa a { display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; background: #25D366; color: var(--dl-white); box-shadow: 0 6px 24px rgba(37,211,102,.45); position: relative; text-decoration: none; }
        .dl-float-wa a::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #25D366; opacity: .55; animation: dl-ring 2s infinite; }
        @keyframes dl-ring { 0%{transform:scale(1);opacity:.55} 100%{transform:scale(1.75);opacity:0} }
        .dlm-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,.86); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 16px; }
        .dlm-box     { background: #FAF8F5; border-radius: 18px; max-width: 860px; width: 100%; max-height: 92vh; overflow-y: auto; position: relative; }
        .dlm-close   { position: absolute; top: 12px; right: 12px; width: 38px; height: 38px; border-radius: 50%; background: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: #1C1410; z-index: 10; }
        .dlm-img-wrap{ width: 100%; background: #000; display: flex; justify-content: center; }
        .dlm-img-wrap img { width: 100%; height: auto; max-height: 65vh; object-fit: contain; display: block; }
        .dlm-body    { padding: 20px 24px; text-align: center; }
        .dlm-eyebrow { font-size: .56rem; letter-spacing: .18em; text-transform: uppercase; color: var(--dl-gold); font-weight: 600; margin-bottom: 5px; }
        .dlm-title   { font-family: 'Cormorant Garamond',serif; font-size: 1.55rem; font-weight: 700; color: #1C1410; margin-bottom: 8px; }
        .dlm-desc    { font-size: .86rem; line-height: 1.56; color: #7A6A5A; margin: 0 auto 20px; max-width: 560px; }
        .dlm-btn-cont{ padding: 12px 34px; background: #1C1410; color: #fff; border: none; border-radius: 100px; font-size: .72rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; cursor: pointer; }
        @media (max-width: 1200px) { .dl-services-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 1024px) {
          .dl-gallery-grid  { grid-template-columns: repeat(2,1fr); }
          .dl-why-inner     { grid-template-columns: 1fr; gap: 36px; }
          .dl-trust-grid    { grid-template-columns: repeat(2,1fr); }
          .dl-footer-divider-v { display: none; }
          .dl-reviews-grid  { grid-template-columns: repeat(2,1fr); }
          .dl-services-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .dl-hdr { height: 60px; padding: 0 16px; gap: 6px; }
          .dl-hdr-logo { height: 38px; }
          .dl-hdr-name { font-size: 1.2rem; }
          .dl-hdr-sub  { font-size: .42rem; letter-spacing: .2em; }
          .dl-hdr-badge { display: none; }
          .dl-hdr-cta  { font-size: .52rem; padding: 9px 11px; letter-spacing: .09em; gap: 5px; }
          .dl-hero { flex-direction: column; min-height: auto; }
          .dl-hero-img-wrap { order: 1; height: 56vw; min-height: 220px; width: 100%; }
          .dl-hero-img-fade { background: linear-gradient(to bottom, transparent 55%, var(--dl-cream) 100%); }
          .dl-hero-text { order: 2; padding: 28px 16px 40px; }
          .dl-hero-btns { flex-direction: column; gap: 10px; }
          .dl-btn-pri, .dl-btn-sec { width: 100%; justify-content: center; padding: 13px 18px; font-size: .65rem; }
          .dl-trust { padding: 0 16px 40px; }
          .dl-trust-grid { grid-template-columns: 1fr; }
          .dl-services { padding: 48px 16px; }
          .dl-services-grid { grid-template-columns: 1fr; gap: 12px; }
          .dl-gallery { padding: 48px 16px; }
          .dl-gallery-grid { grid-template-columns: repeat(2,1fr); gap: 10px; }
          .dl-why { padding: 48px 16px; }
          .dl-why-right { grid-template-columns: repeat(2,1fr); gap: 10px; }
          .dl-trust-sec { padding: 60px 16px; }
          .dl-img-google-card { flex-direction: column; padding: 22px 18px; text-align: center; gap: 14px; border-radius: 20px; }
          .dl-img-card-div { display: none; }
          .dl-img-rating-wrap { flex-direction: column; align-items: center; text-align: center; gap: 8px; }
          .dl-img-pill-btn { width: 100%; justify-content: center; }
          .dl-img-black-badge { flex-direction: column; text-align: center; padding: 22px 18px; gap: 14px; border-radius: 16px; max-width: 100%; }
          .dl-img-badge-div { display: none; }
          .dl-process { padding: 48px 16px; }
          .dl-process-grid { grid-template-columns: 1fr; }
          .dl-reviews { padding: 48px 16px; }
          .dl-reviews-grid { grid-template-columns: 1fr; gap: 12px; }
          .dl-cta-wrap { padding: 48px 16px; }
          .dl-cta-box  { padding: 36px 18px; }
          .dl-form-fields { grid-template-columns: 1fr; gap: 11px; margin-bottom: 18px; }
          .dl-cta-btns { flex-direction: column; gap: 10px; }
          .dl-cta-btn-pri, .dl-cta-btn-sec { width: 100%; justify-content: center; padding: 13px 18px; }
          .dl-footer { padding: 28px 16px 18px; }
          .dl-footer-inner { flex-direction: column; gap: 20px; }
          .dl-footer-bottom { flex-direction: column; align-items: flex-start; gap: 6px; }
          .dl-float-call { bottom: 90px; right: 16px; }
          .dl-float-call a { width: 50px; height: 50px; }
          .dl-float-wa { bottom: 20px; right: 16px; }
          .dl-float-wa a { width: 50px; height: 50px; }
        }
        @media (max-width: 480px) {
          .dl-gallery-grid { grid-template-columns: repeat(2,1fr); gap: 8px; }
        }
      `}</style>

      <div className="dl-body">

        {/* ── HEADER ── */}
        <header className="dl-hdr">
          <a className="dl-hdr-brand" href="/">
            <img src="/videos/Revisedlogo.webp" alt="Shrusara Logo" className="dl-hdr-logo" />
            <div>
              <div className="dl-hdr-name">Shrusara</div>
              <div className="dl-hdr-sub">FASHION&nbsp;&nbsp;BOUTIQUE</div>
            </div>
          </a>
          <div className="dl-hdr-badge">
            <span className="dl-hdr-badge-dot" />
            Bangalore's Designer Boutique
          </div>
          {/* ✅ HEADER WHATSAPP — tracked */}
          <a
            href={WA_PREFILL}
            target="_blank"
            rel="noopener noreferrer"
            className="dl-hdr-cta"
            onClick={() => trackWhatsApp('header_designer')}
          >
            <WaIcon size={13} /> Book Consultation
          </a>
        </header>

        {/* ── HERO ── */}
        <section className="dl-hero">
          <div className="dl-hero-text">
            <p className="dl-hero-eyebrow">Designer Specialist · Bangalore</p>
            <h1 className="dl-hero-h1">Designer Outfits in <em>Bangalore</em> for Modern Occasions</h1>
            <h2 className="dl-hero-h2">Customized Gowns, Indo-Western, Designer Blouses &amp; Occasion Wear</h2>
            <p className="dl-hero-sub">Designed for perfect fit, premium finishing, and modern styling for every occasion — crafted personally by Chief Designer Shruthi Ajith.</p>
            <p className="dl-hero-designer">Styled personally by Chief Designer Shruthi Ajith</p>
            <p className="dl-hero-price">Customized to your body type and occasion · <strong>Starting from ₹5000 onwards</strong></p>
            <p className="dl-hero-scarcity">Limited designer consultation slots available this week</p>
            <div className="dl-hero-btns">
              {/* ✅ HERO WHATSAPP — tracked */}
              <a
                href={WA_PREFILL}
                target="_blank"
                rel="noopener noreferrer"
                className="dl-btn-pri"
                onClick={() => trackWhatsApp('hero_designer')}
              >
                <WaIcon size={16} /> Book Your Designer Consultation
              </a>
              {/* ✅ HERO CALL — tracked */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="dl-btn-sec"
                onClick={() => trackPhoneCall('hero_designer')}
              >
                <PhoneIcon size={14} /> Call Now
              </a>
            </div>
          </div>
          <div className="dl-hero-img-wrap">
            <img src="/videos/desingerhero.webp" alt="Designer outfit by Shrusara Fashion Boutique Bangalore" />
            <div className="dl-hero-img-fade" />
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="dl-trust">
          <div className="dl-trust-heading">
            <h2>Outfits Designed to Match Your Style, Occasion, and Comfort</h2>
            <p>Every outfit we create is tailored to who you are — your body type, your event, and your personal aesthetic.</p>
          </div>
          <div className="dl-trust-grid">
            {trustPoints.map(item => (
              <div key={item.title} className="dl-trust-item">
                <div className="dl-trust-icon">{item.icon}</div>
                <div>
                  <p className="dl-trust-label">{item.label}</p>
                  <p className="dl-trust-title">{item.title}</p>
                  <p className="dl-trust-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="dl-services">
          <p className="dl-sec-eyebrow">Our Services</p>
          <h2 className="dl-sec-h">Customized Designer Outfits &amp; Occasion Wear in Bangalore</h2>
<p className="dl-services-desc">
  At Shrusara Fashion Boutique, we specialize in creating customized designer outfits in Bangalore beautifully tailored for modern occasions. From designer gowns and Indo-western wear to saree conversion outfits and ready-to-wear saree customization, every outfit is crafted with premium detailing, elegant finishing and perfect boutique fitting.
</p>
          <div className="dl-services-grid">
            {services.map(s => (
              <div key={s.title} className="dl-service-card">
                <div className="dl-service-icon">{s.icon}</div>
                <h3 className="dl-service-title">{s.title}</h3>
                <p className="dl-service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="dl-gallery">
          <p className="dl-sec-eyebrow">Gallery</p>
          <h2 className="dl-sec-h">Designer Outfit Gallery</h2>
          <p className="dl-sec-sub">Explore our collection of customized designer gowns, Indo-western outfits, blouses, and ethnic wear designed with premium detailing and modern styling.</p>
          <div className="dl-gallery-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`dl-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="dl-gallery-grid">
            {filteredGallery.map((item, i) => (
              <button
                key={`${item.category}-${i}`}
                className="dl-gallery-card"
                onClick={() => setModalItem(item)}
                aria-label={`View ${item.title}`}
              >
                <div className="dl-gallery-card-inner">
                  <img src={item.src} alt={item.alt} loading={i < 4 ? 'eager' : 'lazy'} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="dl-why">
          <div className="dl-why-inner">
            <div>
              <p className="dl-sec-eyebrow">Why Us</p>
              <h2 className="dl-sec-h">Why Choose Shrusara Designer Boutique in Bangalore</h2>
              <p className="dl-sec-sub">We don't just stitch clothes — we craft looks that make you feel confident, stylish, and perfectly dressed for every occasion.</p>
              <div className="dl-why-list">
                {whyPoints.map((pt, i) => (
                  <div key={i} className="dl-why-item">
                    <div className="dl-why-item-icon">{pt.icon}</div>
                    <p className="dl-why-item-text">{pt.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="dl-why-right">
              {[
                { src: '/designer/designer gown/designer-party-wear-designer-evening-gown-shrusara.webp', alt: 'Designer gown Bangalore' },
                { src: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp',   alt: 'Indo-western designer outfit' },
                { src: '/videos/designer-croptop-lehenga-bangalore-shruthi-shrusara.webp',               alt: 'Crop top lehenga set' },
                { src: '/designer/designer gown/premium-designer-ball-gown-for-engagement-bangalore.webp', alt: 'Custom reception gown' },
              ].map((img, i) => (
                <div key={i} className="dl-why-img-card">
                  <div className="dl-why-img-inner">
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="dl-trust-sec">
          <div className="dl-img-top-label">
            <div className="dl-img-line" />
            <span>Top Rated Designer Boutique in Bangalore</span>
            <div className="dl-img-line" />
          </div>
          <h2 className="dl-img-main-h">Trusted by Clients Across Bangalore</h2>
          <p className="dl-img-main-sub">Real experiences from clients who trusted Shrusara Fashion Boutique for their designer outfits and special occasions.</p>
          <div className="dl-img-google-card">
            <GoogleIcon size={42} />
            <div className="dl-img-card-div" />
            <div className="dl-img-rating-wrap">
              <span className="dl-img-big-num">4.9</span>
              <div className="dl-img-stars-group">
                <div className="dl-img-stars-row">★★★★★</div>
                <div className="dl-img-source-lbl">Google Reviews</div>
              </div>
            </div>
            <div className="dl-img-card-div" />
            <div className="dl-img-sub-row">Based on <strong>250+</strong> verified reviews on Google</div>
            <div className="dl-img-card-div" />
            <a
              href="https://www.google.com/search?q=Shrusara+Fashion+Boutique+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="dl-img-pill-btn"
            >
              VIEW ON GOOGLE <span style={{ fontSize: '1.1rem' }}>→</span>
            </a>
          </div>
          <div className="dl-img-black-badge">
            <div className="dl-img-people-icon">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <div className="dl-img-badge-div" />
            <div className="dl-img-badge-content">
              <div className="dl-img-badge-stars">★★★★★</div>
              <h3>250+ HAPPY CLIENTS IN BANGALORE</h3>
              <p>Loved by clients. Chosen for style.</p>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="dl-process">
          <p className="dl-sec-eyebrow">How It Works</p>
          <h2 className="dl-sec-h">A Simple Boutique Process from Consultation to Final Fitting</h2>
          <div className="dl-process-grid">
            {processSteps.map(step => (
              <div key={step.step} className="dl-process-card" data-step={step.step}>
                <span className="dl-process-step">Step {step.step}</span>
                <h3 className="dl-process-title">{step.title}</h3>
                <p className="dl-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="dl-reviews">
          <div className="dl-reviews-hdr">
            <h2 className="dl-reviews-title">What Our Clients Say</h2>
            <p className="dl-reviews-sub">Personal stories and styling experiences from clients who chose Shrusara for their designer outfits and special occasions.</p>
          </div>
          <div className="dl-reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="dl-review-card">
                <p className="dl-review-stars">★★★★★</p>
                <p className="dl-review-text">{r.text}</p>
                <p className="dl-review-name">{r.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="dl-cta-wrap">
          <div className="dl-cta-box">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <p className="dl-cta-eyebrow">Designer Consultation</p>
            </div>
            <h2 className="dl-cta-h">Book Your Designer Outfit Consultation Today</h2>
            <p className="dl-cta-sub">Tell us your occasion, preferred style and design ideas. Our Chief Designer Shruthi Ajith will personally guide you to create the perfect outfit for your event.</p>
            <div className="dl-cta-highlights">
              <span className="dl-cta-highlight">Personalized styling support</span>
              <span className="dl-cta-highlight">Limited slots available each week</span>
            </div>
            <p className="dl-cta-scarcity">Limited designer consultation slots available for upcoming season</p>
            <DesignerCtaForm />
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="dl-footer">
          <div className="dl-footer-inner">
            <div className="dl-footer-brand">
              <p className="dl-footer-brand-name">Shrusara Fashion Boutique</p>
              <p className="dl-footer-brand-tag">Designer Boutique · Bangalore</p>
              <p className="dl-footer-desc">Customized designer outfits, gowns, blouses, and ethnic wear tailored for premium fit and modern styling.</p>
              <p className="dl-footer-seo">Shrusara Fashion Boutique is a leading designer boutique in Bangalore specializing in customized designer gowns, Indo-western outfits, occasion wear, and blouses with premium finishing.</p>
            </div>
            <div className="dl-footer-divider-v" />
            <div className="dl-footer-contact">
              <p className="dl-footer-contact-title">Contact Us</p>
              <div className="dl-footer-contact-list">
                <span className="dl-footer-contact-item">
                  <span className="dl-footer-contact-icon"><MapPinIcon size={13} /></span>
                  106, 6th Main Road, Mahalakshmipuram, Bangalore – 560086
                </span>
                {/* ✅ FOOTER CALL — tracked */}
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="dl-footer-contact-item"
                  onClick={() => trackPhoneCall('footer_designer')}
                >
                  <span className="dl-footer-contact-icon"><PhoneIcon size={13} /></span>
                  {PHONE_NUMBER}
                </a>
                <a href="mailto:help@shrusara.com" className="dl-footer-contact-item">
                  <span className="dl-footer-contact-icon"><MailIcon size={13} /></span>
                  help@shrusara.com
                </a>
                {/* ✅ FOOTER WHATSAPP — tracked */}
                <a
                  href={WA_PREFILL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dl-footer-contact-item"
                  onClick={() => trackWhatsApp('footer_designer')}
                >
                  <span className="dl-footer-contact-icon"><WaIcon size={13} /></span>
                  WhatsApp Us
                </a>
              </div>
              <a
                href="https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="dl-footer-map-link"
              >
                <MapPinIcon size={11} /> View on Google Maps
              </a>
            </div>
          </div>
          <div className="dl-footer-bottom">
            <p className="dl-footer-copy">© {new Date().getFullYear()} Shrusara Fashion Boutique. All rights reserved.</p>
            <p className="dl-footer-seo-bottom">Designer Boutique in Bangalore for Customized Gowns, Blouses &amp; Occasion Wear</p>
          </div>
        </footer>

        {/* ✅ FLOATING CALL BUTTON — tracked */}
        <div className="dl-float-call">
          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label="Call Now"
            onClick={() => trackPhoneCall('floating_button_designer')}
          >
            <PhoneIcon size={24} />
          </a>
        </div>

        {/* ✅ FLOATING WHATSAPP BUTTON — tracked */}
        <div className="dl-float-wa">
          <a
            href={WA_PREFILL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            onClick={() => trackWhatsApp('floating_button_designer')}
          >
            <WaIcon size={26} />
          </a>
        </div>

      </div>

      <ImageModal item={modalItem} onClose={() => setModalItem(null)} />
    </>
  );
};

export default DesignerLandingPage;