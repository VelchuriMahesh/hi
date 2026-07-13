import { useState } from 'react';
import { trackPhoneCall, trackWhatsApp } from '../utils/tracking';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919741827558';
const PHONE_NUMBER    = import.meta.env.VITE_PHONE_NUMBER    || '9741827558';

// ─── WhatsApp Pre-filled Messages ────────────────────────────────────────────
const WA_MESSAGES = {
  hero: `Hello Shrusara Team,\nI would like to enquire about your Ready-to-Wear Saree and Saree Transformation services. Please share more details.\nThank you.`,
  readyToWear: `Hello Shrusara Team,\nI would like to convert my saree into a Ready-to-Wear (Pre-Stitched) Saree.\nPlease share the customization process, timeline and consultation details.\nThank you.`,
  transform: `Hello Shrusara Team,\nI would like to transform my saree into a new outfit.\nI am interested in:\n□ Lehenga\n□ Designer Gown\n□ Indo-Western Outfit\n□ Crop Top & Skirt\n□ Long Dress\n□ Designer Blouse\n□ Other\nPlease share the customization process and consultation details.\nThank you.`,
  finalCta: `Hello,\nI would like to enquire about your Ready-to-Wear Saree and Saree Transformation services. Please share more details.\nThank you.`,
};

const waLink = (key) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGES[key] || WA_MESSAGES.hero)}`;

// ─── Gallery Data ─────────────────────────────────────────────────────────────
// Paths updated to match /public/occasion_wear/sareetransformation_landing/ folder structure

const readyToWearImages = [
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/ready-to-wear-saree-bangalore.webp', alt: 'Ready to wear saree in Bangalore customized for quick wearing with elegant saree draping and perfect fit', title: 'Ready-to-Wear Saree' },
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/pre-stitched-saree-bangalore.webp', alt: 'Pre stitched saree in Bangalore permanently customized for comfort convenience and elegant styling', title: 'Pre-Stitched Saree' },
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/one-minute-saree-bangalore.webp', alt: 'One minute saree in Bangalore customized for quick wear without traditional saree draping', title: 'One-Minute Saree' },
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/customized-ready-to-wear-saree-bangalore.webp', alt: 'Customized ready to wear saree in Bangalore tailored to individual measurements and preferences', title: 'Customized Ready-to-Wear Saree' },
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/ready-to-wear-saree-customization-bangalore.webp', alt: 'Ready to wear saree customization in Bangalore designed for weddings functions and special occasions', title: 'Ready-to-Wear Saree Customization' },
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/customized-pre-stitched-saree-bangalore.webp', alt: 'Customized pre stitched saree in Bangalore with secure fit reusable design and premium finishing', title: 'Customized Pre-Stitched Saree' },
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/easy-to-wear-saree-bangalore.webp', alt: 'Easy to wear saree in Bangalore customized for modern women seeking comfort and convenience', title: 'Easy-to-Wear Saree' },
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/permanent-saree-stitching-bangalore.webp', alt: 'Permanent saree stitching in Bangalore transforming traditional sarees into ready to wear sarees', title: 'Permanent Saree Stitching' },
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/designer-blouse-stitching-bangalore.webp', alt: 'Designer blouse stitching in Bangalore with premium fit and elegant finishing', title: 'Designer Blouse Stitching' },
  { src: '/occasion_wear/sareetransformation_landing/Ready to wear Saree/Ready to wear Saree/IMG-20220609-WA0069.webp', alt: 'Ready to wear saree styled in Bangalore showcasing elegant draping and a perfect comfortable fit', title: 'Ready-to-Wear Saree Look' },
];

const transformImages = [
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/Saree to Lehenga Bangalore.webp', alt: 'Saree to lehenga conversion in Bangalore customized from treasured sarees into elegant designer lehengas', title: 'Saree to Lehenga Transformation' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/Saree to Gown Bangalore.webp', alt: 'Saree to designer gown conversion in Bangalore transforming sarees into elegant occasion wear gowns', title: 'Saree to Gown Transformation' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/Saree Transformation Bangalore.webp', alt: 'Saree transformation service in Bangalore creating beautiful new outfits from existing sarees', title: 'Saree Transformation' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/Customized Saree Outfits Bangalore.webp', alt: 'Saree redesign service in Bangalore transforming old and unused sarees into fashionable outfits', title: 'Customized Saree Outfit' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/Saree Conversion Bangalore.webp', alt: 'Customized saree conversion in Bangalore tailored to personal style measurements and occasion needs', title: 'Saree Conversion' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/luxury-bridal-lehenga-custom-design-bangalore.webp', alt: 'Saree makeover service in Bangalore creating designer outfits from wedding silk and traditional sarees', title: 'Luxury Bridal Lehenga' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/saree-converted-lehenga-banaglore.webp', alt: 'Old saree converted into a new designer outfit in Bangalore with premium craftsmanship and styling', title: 'Saree Converted to Lehenga' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/custom-bridal-reception-lehenga-shrusara.webp', alt: 'Custom bridal reception lehenga in Bangalore created through saree transformation with premium finishing', title: 'Bridal Reception Lehenga Transformation' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/IMG-20220827-WA0010.webp', alt: 'Saree transformed into a custom designer outfit in Bangalore with elegant styling and boutique finishing', title: 'Saree to Designer Outfit' },
];

const transformationGallery = [
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/Saree to Lehenga Bangalore.webp', alt: 'Saree to lehenga conversion in Bangalore customized from treasured sarees into elegant designer lehengas', title: 'Saree to Lehenga' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/Saree to Gown Bangalore.webp', alt: 'Saree to designer gown conversion in Bangalore transforming sarees into elegant occasion wear gowns', title: 'Saree to Gown' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/luxury-bridal-lehenga-custom-design-bangalore.webp', alt: 'Saree makeover service in Bangalore creating designer outfits from wedding silk and traditional sarees', title: 'Luxury Bridal Lehenga' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/saree-converted-lehenga-banaglore.webp', alt: 'Old saree converted into a new designer outfit in Bangalore with premium craftsmanship and styling', title: 'Saree Converted to Lehenga' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/Saree Conversion Bangalore.webp', alt: 'Customized saree conversion in Bangalore tailored to personal style measurements and occasion needs', title: 'Saree Conversion' },
  { src: '/occasion_wear/sareetransformation_landing/Saree Transformation/Saree Transformation/Customized Saree Outfits Bangalore.webp', alt: 'Saree redesign service in Bangalore transforming old and unused sarees into fashionable outfits', title: 'Customized Saree Outfit' },
];

const reviews = [
  { name: 'Meena R.',    text: 'I gave my mother\'s old silk saree to Shrusara for a ready-to-wear conversion. The result was absolutely beautiful. The fitting was perfect and I can now wear it within minutes. So happy with the work!' },
  { name: 'Priya S.',    text: 'I transformed my wedding saree into a stunning lehenga at Shrusara. Shruthi Ajith personally guided me through the process and the outcome exceeded my expectations. Truly exceptional boutique!' },
  { name: 'Lakshmi D.',  text: 'Got my Kanjivaram saree converted into a pre-stitched saree. The craftsmanship is superb and the saree still looks as elegant as ever. Highly recommend Shrusara for saree customization in Bangalore.' },
  { name: 'Anitha K.',   text: 'Shrusara transformed my grandmother\'s old saree into a beautiful Indo-Western outfit. The attention to detail and the quality of finishing were outstanding. I will definitely come back for more!' },
  { name: 'Deepa M.',    text: 'I was hesitant about converting my bridal saree but Shruthi Ajith\'s consultation gave me so much confidence. The transformation into a gown was breathtaking. Absolutely loved the final result!' },
  { name: 'Suma T.',     text: 'The ready-to-wear saree service at Shrusara is fantastic. My saree now takes just two minutes to wear and looks just as graceful. Perfect for busy mornings and functions alike. Highly recommended!' },
];

const faqs = [
  { q: 'Do you sell ready-made ready-to-wear sarees?',                        a: 'No. We customize your saree into a ready-to-wear or pre-stitched saree according to your measurements and preferences.' },
  { q: 'What is the difference between a ready-to-wear saree and saree draping?', a: 'A ready-to-wear saree is permanently stitched according to your measurements and can be worn quickly without traditional draping. This is different from temporary saree draping services typically provided for events.' },
  { q: 'Can I bring my own saree?',                                            a: 'Yes. Most clients provide their own sarees for customization and transformation.' },
  { q: 'Can old sarees be transformed into new outfits?',                      a: 'Absolutely. Old, unused and treasured sarees can be transformed into beautiful wearable creations.' },
  { q: 'What types of sarees can be transformed?',                             a: 'Silk sarees, Kanjivaram sarees, wedding sarees, designer sarees and many other varieties can be transformed.' },
  { q: 'Can you convert my wedding saree into a lehenga or gown?',            a: 'Yes. Wedding sarees are commonly transformed into lehengas, gowns, Indo-Western outfits and customized occasion wear.' },
  { q: 'How long does the process take?',                                      a: 'Most projects are completed within 2–6 weeks depending on complexity.' },
  { q: 'Do you offer trial fittings?',                                         a: 'Yes. Trial sessions can be arranged whenever required.' },
  { q: 'Do you serve customers outside Bangalore?',                            a: 'Yes. Remote consultations and measurement guidance can be arranged.' },
];

const processSteps = [
  { n: '01', title: 'Consultation',                desc: 'Share your saree, ideas and style preferences personally with Chief Designer Shruthi Ajith.' },
  { n: '02', title: 'Design & Measurements',       desc: 'We finalize the design concept, customization details and measurements.' },
  { n: '03', title: 'Transformation & Craftsmanship', desc: 'Your saree is carefully transformed according to the approved design with premium craftsmanship.' },
  { n: '04', title: 'Trial & Adjustments',         desc: 'Necessary adjustments are made to ensure perfect fitting and comfort.' },
  { n: '05', title: 'Final Delivery',              desc: 'Your customized creation is completed, quality checked and delivered ready for your occasion.' },
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

const ChevronIcon = ({ size = 18, open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width={size} height={size}
    style={{ transition: 'transform .3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────
function ImageModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="sw-overlay" onClick={onClose}>
      <div className="sw-modal" onClick={e => e.stopPropagation()}>
        <button className="sw-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="sw-modal-img"><img src={item.src} alt={item.alt} /></div>
        <div className="sw-modal-body">
          <p className="sw-eyebrow-sm">Design Preview</p>
          <h3 className="sw-modal-title">{item.title}</h3>
          <button className="sw-modal-closebtn" onClick={onClose}>Close Preview</button>
        </div>
      </div>
    </div>
  );
}

function GalleryGrid({ images, waKey, waLabel1, waLabel2, columns = 4 }) {
  const [modal, setModal] = useState(null);
  return (
    <>
      <div className="sw-gallery-grid" style={{ '--cols': columns }}>
        {images.map((img, i) => (
          <button key={i} className="sw-gallery-card" onClick={() => setModal(img)} aria-label={`View ${img.title}`}>
            <div className="sw-gallery-card-inner">
              <img src={img.src} alt={img.alt} loading={i < 4 ? 'eager' : 'lazy'} />
            </div>
          </button>
        ))}
      </div>
      <div className="sw-sec-cta-row">
        <a href={waLink(waKey)} target="_blank" rel="noopener noreferrer"
          className="sw-btn-pri" onClick={() => trackWhatsApp(waKey)}>
          <WaIcon size={16} /> {waLabel1}
        </a>
        <a href={`tel:${PHONE_NUMBER}`} className="sw-btn-sec" onClick={() => trackPhoneCall(waKey)}>
          <PhoneIcon size={14} /> {waLabel2 || 'Call Now'}
        </a>
      </div>
      <ImageModal item={modal} onClose={() => setModal(null)} />
    </>
  );
}

function Highlights({ points }) {
  return (
    <ul className="sw-highlights">
      {points.map((p, i) => (
        <li key={i} className="sw-highlight-item"><span className="sw-check">✔</span>{p}</li>
      ))}
    </ul>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`sw-faq-item${open ? ' open' : ''}`}>
      <button className="sw-faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span><ChevronIcon size={18} open={open} />
      </button>
      {open && <div className="sw-faq-a"><p>{a}</p></div>}
    </div>
  );
}

function ReviewsCarousel() {
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const max = reviews.length - visible;
  const shown = reviews.slice(idx, idx + visible);
  return (
    <div className="sw-carousel">
      <div className="sw-carousel-track">
        {shown.map((r, i) => (
          <div key={i} className="sw-review-card">
            <p className="sw-review-stars">★★★★★</p>
            <p className="sw-review-text">{r.text}</p>
            <p className="sw-review-name">{r.name}</p>
          </div>
        ))}
      </div>
      <div className="sw-carousel-nav">
        <button className="sw-nav-btn" onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} aria-label="Previous">←</button>
        <div className="sw-dots">
          {reviews.map((_, i) => i <= max && (
            <button key={i} className={`sw-dot${idx === i ? ' active' : ''}`} onClick={() => setIdx(i)} aria-label={`Go to ${i + 1}`} />
          ))}
        </div>
        <button className="sw-nav-btn" onClick={() => setIdx(i => Math.min(max, i + 1))} disabled={idx >= max} aria-label="Next">→</button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SareeLandingPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --sw-gold:      #B8935A;
          --sw-gold-pale: #F5EDD9;
          --sw-dark:      #1C1410;
          --sw-cream:     #FBF8F3;
          --sw-white:     #FFFFFF;
          --sw-text:      #3A2E25;
          --sw-muted:     #7A6A5A;
          --sw-border:    rgba(184,147,90,.15);
        }
        body { font-family: 'Jost','Poppins',sans-serif; background: var(--sw-cream); color: var(--sw-text); overflow-x: hidden; }

        /* ── HEADER ── */
        .sw-hdr { position: sticky; top: 0; z-index: 100; background: rgba(251,248,243,.97); backdrop-filter: blur(12px); border-bottom: 1px solid var(--sw-border); padding: 0 4vw; display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 10px; }
        .sw-hdr-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .sw-hdr-logo  { height: 44px; width: auto; object-fit: contain; }
        .sw-hdr-name  { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: 1.5rem; font-weight: 700; color: var(--sw-dark); line-height: 1; white-space: nowrap; }
        .sw-hdr-sub   { font-size: .44rem; letter-spacing: .28em; text-transform: uppercase; color: var(--sw-gold); font-weight: 600; margin-top: 4px; }
        .sw-hdr-badge { display: flex; align-items: center; gap: 6px; font-size: .58rem; letter-spacing: .14em; text-transform: uppercase; color: var(--sw-muted); font-weight: 500; }
        .sw-hdr-dot   { width: 6px; height: 6px; border-radius: 50%; background: #4CAF50; animation: swpulse 2s infinite; flex-shrink: 0; }
        @keyframes swpulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .sw-hdr-cta   { display: inline-flex; align-items: center; gap: 7px; background: var(--sw-dark); color: var(--sw-white); font-size: .56rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 10px 16px; text-decoration: none; flex-shrink: 0; transition: background .2s; }
        .sw-hdr-cta:hover { background: var(--sw-gold); }

        /* ── SHARED ── */
        .sw-sec       { padding: 72px 4vw; }
        .sw-sec-white { background: var(--sw-white); }
        .sw-sec-cream { background: var(--sw-cream); }
        .sw-sec-dark  { background: var(--sw-dark); }
        .sw-center    { text-align: center; }
        .sw-eyebrow   { display: inline-flex; align-items: center; gap: 9px; font-size: .58rem; letter-spacing: .22em; text-transform: uppercase; color: var(--sw-gold); font-weight: 600; margin-bottom: 12px; }
        .sw-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--sw-gold); display: block; }
        .sw-eyebrow-sm { font-size: .54rem; letter-spacing: .18em; text-transform: uppercase; color: var(--sw-gold); font-weight: 600; }
        .sw-h2        { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: clamp(1.5rem,2.6vw,2.5rem); font-weight: 700; color: var(--sw-dark); line-height: 1.18; margin-bottom: 10px; }
        .sw-h2-white  { color: var(--sw-white); }
        .sw-lead      { font-size: .88rem; line-height: 1.82; color: var(--sw-muted); max-width: 680px; font-weight: 300; margin-bottom: 32px; }
        .sw-center .sw-lead { margin-left: auto; margin-right: auto; }
        .sw-divider   { height: 1px; background: var(--sw-border); }

        /* ── BUTTONS ── */
        .sw-btn-pri { display: inline-flex; align-items: center; gap: 9px; background: var(--sw-dark); color: var(--sw-white); font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 14px 26px; text-decoration: none; border: 2px solid var(--sw-dark); transition: transform .2s, box-shadow .2s; white-space: nowrap; }
        .sw-btn-pri:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,20,16,.2); }
        .sw-btn-pri-gold { background: var(--sw-gold); border-color: var(--sw-gold); }
        .sw-btn-pri-gold:hover { box-shadow: 0 8px 24px rgba(184,147,90,.35); }
        .sw-btn-sec { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--sw-dark); font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 14px 26px; text-decoration: none; border: 2px solid var(--sw-dark); transition: background .2s, color .2s; white-space: nowrap; }
        .sw-btn-sec:hover { background: var(--sw-dark); color: var(--sw-white); }
        .sw-btn-sec-white { color: var(--sw-white); border-color: rgba(255,255,255,.35); }
        .sw-btn-sec-white:hover { background: rgba(255,255,255,.1); color: var(--sw-white); }
        .sw-sec-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }

        /* ── HERO ── */
        .sw-hero { display: flex; min-height: 88vh; background: var(--sw-cream); overflow: hidden; position: relative; }
        .sw-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 70% at 28% 55%, rgba(184,147,90,.07) 0%, transparent 70%); pointer-events: none; z-index: 1; }
        .sw-hero-text { flex: 1.1; display: flex; flex-direction: column; justify-content: center; padding: 72px 40px 72px 5vw; z-index: 2; }
        .sw-hero-img  { flex: 1; position: relative; overflow: hidden; }
        .sw-hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .sw-hero-img-fade { position: absolute; inset: 0; background: linear-gradient(to right, var(--sw-cream) 0%, transparent 18%); }
        .sw-hero-tag  { display: inline-flex; align-items: center; gap: 9px; font-size: .58rem; letter-spacing: .22em; text-transform: uppercase; color: var(--sw-gold); font-weight: 600; margin-bottom: 18px; }
        .sw-hero-tag::before { content: ''; width: 24px; height: 1px; background: var(--sw-gold); }
        .sw-hero-h1   { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: clamp(1.8rem,3vw,3.2rem); font-weight: 700; line-height: 1.12; color: var(--sw-dark); margin-bottom: 6px; }
        .sw-hero-h1 em { font-style: italic; color: var(--sw-gold); }
        .sw-hero-amp  { display: block; font-family: 'Cormorant Garamond',serif; font-size: clamp(1rem,1.4vw,1.3rem); font-style: italic; color: var(--sw-gold); margin: 4px 0; opacity: .7; }
        .sw-hero-sub  { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: clamp(1rem,1.3vw,1.35rem); font-style: italic; color: var(--sw-muted); margin-bottom: 16px; line-height: 1.4; font-weight: 400; }
        .sw-hero-desc { font-size: .85rem; line-height: 1.82; color: var(--sw-muted); max-width: 440px; margin-bottom: 20px; font-weight: 300; }
        .sw-hero-trust { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .sw-hero-trust-item { display: flex; align-items: center; gap: 8px; font-size: .76rem; color: var(--sw-text); }
        .sw-hero-trust-item .sw-check { color: var(--sw-gold); }
        .sw-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
        .sw-hero-note { font-size: .7rem; line-height: 1.6; color: var(--sw-muted); padding: 12px 16px; background: rgba(184,147,90,.07); border-left: 3px solid var(--sw-gold); max-width: 440px; }

        /* ── FEATURE CARDS ── */
        .sw-feature-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--sw-border); }
        .sw-feature-item { background: var(--sw-white); padding: 26px 20px; display: flex; align-items: flex-start; gap: 13px; }
        .sw-feature-icon { width: 36px; height: 36px; border-radius: 50%; background: var(--sw-gold-pale); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: .9rem; color: var(--sw-gold); }
        .sw-feature-label { font-size: .52rem; letter-spacing: .16em; text-transform: uppercase; color: var(--sw-gold); font-weight: 600; margin-bottom: 4px; }
        .sw-feature-title { font-family: 'Cormorant Garamond',serif; font-size: 1rem; font-weight: 700; color: var(--sw-dark); margin-bottom: 3px; }
        .sw-feature-desc  { font-size: .76rem; color: var(--sw-muted); line-height: 1.6; font-weight: 300; }

        /* ── SERVICE CARDS ── */
        .sw-service-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
        .sw-service-card { background: var(--sw-white); border: 1px solid var(--sw-border); padding: 36px 30px; transition: transform .2s, box-shadow .2s; }
        .sw-service-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(28,20,16,.1); }
        .sw-service-num  { font-family: 'Cormorant Garamond',serif; font-size: 3rem; font-weight: 700; color: var(--sw-gold-pale); line-height: 1; margin-bottom: 12px; }
        .sw-service-title { font-family: 'Cormorant Garamond',serif; font-size: 1.25rem; font-weight: 700; color: var(--sw-dark); margin-bottom: 8px; }
        .sw-service-desc  { font-size: .82rem; color: var(--sw-muted); line-height: 1.68; font-weight: 300; }

        /* ── PRODUCT SECTIONS ── */
        .sw-prod-header { display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start; justify-content: space-between; margin-bottom: 32px; }
        .sw-prod-header-text { flex: 1; min-width: 260px; }
        .sw-prod-header-aside { display: flex; flex-direction: column; justify-content: flex-end; }
        .sw-seo-note { font-size: .76rem; line-height: 1.72; color: var(--sw-muted); background: rgba(184,147,90,.06); border: 1px solid var(--sw-border); padding: 16px 18px; margin-top: 20px; font-weight: 300; max-width: 760px; }

        /* ── GALLERY ── */
        .sw-gallery-grid { display: grid; grid-template-columns: repeat(var(--cols, 4), 1fr); gap: 14px; }
        .sw-gallery-card { overflow: hidden; border-radius: 20px; background: rgba(255,255,255,.82); padding: 8px; box-shadow: 0 4px 18px rgba(28,20,16,.09); cursor: pointer; border: none; transition: transform .3s, box-shadow .3s; display: block; width: 100%; text-align: left; appearance: none; }
        .sw-gallery-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(28,20,16,.16); }
        .sw-gallery-card-inner { border-radius: 14px; overflow: hidden; background: var(--sw-gold-pale); aspect-ratio: 4/5; }
        .sw-gallery-card-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .sw-gallery-card:hover .sw-gallery-card-inner img { transform: scale(1.05); }

        /* ── HIGHLIGHTS ── */
        .sw-highlights { list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .sw-highlight-item { display: flex; align-items: center; gap: 9px; font-size: .8rem; color: var(--sw-text); font-weight: 400; }
        .sw-check { color: var(--sw-gold); font-size: .76rem; flex-shrink: 0; }

        /* ── TRANSFORMATION GALLERY ── */
        .sw-transform-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .sw-transform-card { overflow: hidden; border-radius: 20px; background: rgba(255,255,255,.82); padding: 8px; box-shadow: 0 4px 18px rgba(28,20,16,.09); }
        .sw-transform-inner { border-radius: 14px; overflow: hidden; background: var(--sw-gold-pale); aspect-ratio: 3/4; }
        .sw-transform-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .sw-transform-card:hover .sw-transform-inner img { transform: scale(1.04); }
        .sw-transform-label { padding: 10px 6px 4px; text-align: center; font-size: .72rem; font-weight: 600; color: var(--sw-dark); letter-spacing: .04em; }

        /* ── WHY ── */
        .sw-why-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; max-width: 1100px; margin: 0 auto; }
        .sw-why-list  { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
        .sw-why-item  { display: flex; align-items: flex-start; gap: 12px; padding: 16px 18px; background: var(--sw-white); border: 1px solid var(--sw-border); transition: border-color .2s; }
        .sw-why-item:hover { border-color: rgba(184,147,90,.4); }
        .sw-why-item-icon { width: 32px; height: 32px; border-radius: 50%; background: var(--sw-gold-pale); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: .8rem; color: var(--sw-gold); }
        .sw-why-item-text { font-size: .82rem; color: var(--sw-text); line-height: 1.58; }
        .sw-why-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .sw-why-img-card  { border-radius: 16px; overflow: hidden; background: var(--sw-gold-pale); padding: 7px; box-shadow: 0 4px 16px rgba(28,20,16,.08); transition: transform .3s; }
        .sw-why-img-card:hover { transform: translateY(-4px); }
        .sw-why-img-inner { border-radius: 11px; overflow: hidden; aspect-ratio: 3/4; }
        .sw-why-img-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .sw-why-img-card:hover .sw-why-img-inner img { transform: scale(1.04); }

        /* ── SOCIAL PROOF ── */
        .sw-google-card { background: var(--sw-white); border-radius: 28px; padding: 24px 40px; max-width: 860px; margin: 0 auto 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; box-shadow: 0 10px 36px rgba(0,0,0,.04); border: 1px solid rgba(0,0,0,.03); }
        .sw-google-div  { width: 1px; height: 46px; background: #eee; flex-shrink: 0; }
        .sw-big-num     { font-size: 3.8rem; font-weight: 700; color: var(--sw-dark); line-height: 1; font-family: 'Jost',sans-serif; }
        .sw-stars-row   { color: #FFB400; font-size: 1.5rem; letter-spacing: 2px; }
        .sw-source-lbl  { font-size: 1rem; font-weight: 600; color: #444; }
        .sw-sub-row     { font-size: .9rem; color: var(--sw-muted); }
        .sw-pill-btn    { border: 1px solid var(--sw-gold); border-radius: 100px; padding: 12px 26px; color: var(--sw-gold); font-size: .7rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; }
        .sw-pill-btn:hover { background: var(--sw-gold); color: var(--sw-white); }
        .sw-black-badge { background: #251D18; border-radius: 18px; padding: 22px 40px; max-width: 620px; margin: 0 auto; display: flex; align-items: center; gap: 28px; text-align: left; position: relative; }
        .sw-black-badge::after { content: ""; position: absolute; bottom: 0; left: 12%; right: 45%; height: 4px; background: #A88A64; border-radius: 10px 10px 0 0; }
        .sw-badge-div   { width: 1px; height: 56px; background: rgba(168,138,100,.2); }
        .sw-badge-stars { color: #A88A64; font-size: 1.3rem; letter-spacing: 4px; margin-bottom: 10px; line-height: 1; }
        .sw-badge-h3    { color: #A88A64; font-size: 1rem; font-weight: 700; letter-spacing: .05em; margin: 0 0 5px; text-transform: uppercase; }
        .sw-badge-p     { color: #9C9C9C; font-size: .92rem; margin: 0; font-weight: 300; }

        /* ── CAROUSEL ── */
        .sw-carousel { max-width: 1100px; margin: 0 auto; }
        .sw-carousel-track { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .sw-review-card  { background: var(--sw-cream); border: 1px solid rgba(184,147,90,.14); border-radius: 14px; padding: 24px 20px; }
        .sw-review-stars { color: #FFC107; letter-spacing: 3px; font-size: .88rem; margin-bottom: 10px; }
        .sw-review-text  { font-size: .82rem; line-height: 1.72; color: var(--sw-text); font-weight: 300; margin-bottom: 14px; font-style: italic; }
        .sw-review-name  { font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--sw-dark); }
        .sw-carousel-nav { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 28px; }
        .sw-nav-btn      { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--sw-border); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--sw-muted); transition: all .2s; }
        .sw-nav-btn:hover:not(:disabled) { border-color: var(--sw-gold); color: var(--sw-gold); }
        .sw-nav-btn:disabled { opacity: .35; cursor: default; }
        .sw-dots  { display: flex; gap: 7px; }
        .sw-dot   { width: 7px; height: 7px; border-radius: 50%; border: none; background: var(--sw-border); cursor: pointer; transition: background .2s; padding: 0; }
        .sw-dot.active { background: var(--sw-gold); }

        /* ── PROCESS ── */
        .sw-process-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 36px; }
        .sw-process-card { background: var(--sw-white); border: 1px solid var(--sw-border); padding: 26px 18px; position: relative; overflow: hidden; }
        .sw-process-card::before { content: attr(data-n); position: absolute; top: -14px; right: 10px; font-family: 'Cormorant Garamond',serif; font-size: 5rem; font-weight: 700; color: rgba(184,147,90,.09); pointer-events: none; line-height: 1; }
        .sw-process-n    { font-size: .58rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--sw-gold); margin-bottom: 10px; display: block; }
        .sw-process-title { font-family: 'Cormorant Garamond',serif; font-size: 1rem; font-weight: 700; color: var(--sw-dark); margin-bottom: 7px; }
        .sw-process-desc  { font-size: .76rem; color: var(--sw-muted); line-height: 1.66; font-weight: 300; }

        /* ── FAQ ── */
        .sw-faq-wrap  { max-width: 760px; margin: 36px auto 0; display: flex; flex-direction: column; gap: 8px; }
        .sw-faq-item  { border: 1px solid var(--sw-border); background: var(--sw-white); }
        .sw-faq-item.open { border-color: rgba(184,147,90,.35); }
        .sw-faq-q     { width: 100%; background: none; border: none; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; cursor: pointer; font-size: .84rem; font-weight: 600; color: var(--sw-dark); text-align: left; font-family: 'Jost','Poppins',sans-serif; }
        .sw-faq-a     { padding: 0 20px 18px; font-size: .8rem; color: var(--sw-muted); line-height: 1.72; font-weight: 300; }

        /* ── FINAL CTA ── */
        .sw-cta-box { background: var(--sw-dark); padding: 64px 48px; text-align: center; position: relative; overflow: hidden; max-width: 960px; margin: 0 auto; }
        .sw-cta-box::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 70% 55% at 50% 100%, rgba(184,147,90,.12) 0%, transparent 70%); }
        .sw-cta-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: .58rem; letter-spacing: .2em; text-transform: uppercase; color: var(--sw-gold); font-weight: 600; margin-bottom: 16px; }
        .sw-cta-eyebrow::before, .sw-cta-eyebrow::after { content: ''; width: 18px; height: 1px; background: var(--sw-gold); display: block; }
        .sw-cta-h   { font-family: 'Cormorant Garamond',serif; font-size: clamp(1.6rem,2.8vw,2.6rem); font-weight: 700; color: var(--sw-white); margin-bottom: 12px; line-height: 1.2; }
        .sw-cta-sub { font-size: .88rem; line-height: 1.72; color: rgba(255,255,255,.68); max-width: 560px; margin: 0 auto 20px; font-weight: 300; }
        .sw-cta-trust { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; margin-bottom: 28px; }
        .sw-cta-tp  { display: inline-flex; align-items: center; gap: 6px; font-size: .68rem; color: rgba(255,255,255,.55); font-weight: 500; }
        .sw-cta-tp::before { content: '✔'; color: var(--sw-gold); font-size: .62rem; }
        .sw-cta-btns { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; position: relative; z-index: 1; }

        /* ── FOOTER ── */
        .sw-footer { background: var(--sw-dark); border-top: 1px solid rgba(184,147,90,.18); padding: 40px 4vw 22px; }
        .sw-footer-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 32px 56px; align-items: flex-start; }
        .sw-footer-brand { flex: 1.3; min-width: 200px; }
        .sw-footer-name  { font-family: 'Cormorant Garamond',serif; font-size: 1.25rem; font-weight: 700; color: var(--sw-white); margin-bottom: 2px; }
        .sw-footer-tag   { font-size: .48rem; letter-spacing: .2em; text-transform: uppercase; color: var(--sw-gold); font-weight: 600; margin-bottom: 10px; display: block; }
        .sw-footer-desc  { font-size: .74rem; line-height: 1.7; color: rgba(255,255,255,.4); font-weight: 300; max-width: 300px; }
        .sw-footer-seo   { font-size: .68rem; line-height: 1.68; color: rgba(255,255,255,.22); font-weight: 300; max-width: 340px; margin-top: 10px; }
        .sw-footer-div   { width: 1px; align-self: stretch; background: rgba(184,147,90,.14); flex-shrink: 0; }
        .sw-footer-contact { flex: 1; min-width: 200px; }
        .sw-footer-contact-title { font-size: .52rem; letter-spacing: .18em; text-transform: uppercase; color: var(--sw-gold); font-weight: 600; margin-bottom: 14px; display: block; }
        .sw-footer-contact-list  { display: flex; flex-direction: column; gap: 10px; }
        .sw-footer-contact-item  { display: flex; align-items: flex-start; gap: 8px; font-size: .74rem; color: rgba(255,255,255,.5); line-height: 1.44; text-decoration: none; transition: color .2s; }
        .sw-footer-contact-item:hover { color: var(--sw-gold); }
        .sw-footer-icon  { color: var(--sw-gold); flex-shrink: 0; margin-top: 2px; }
        .sw-footer-map   { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: .56rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--sw-gold); text-decoration: none; border: 1px solid rgba(184,147,90,.3); padding: 6px 12px; transition: background .2s; }
        .sw-footer-map:hover { background: rgba(184,147,90,.1); }
        .sw-footer-bottom { max-width: 1100px; margin: 22px auto 0; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.06); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .sw-footer-copy  { font-size: .62rem; color: rgba(255,255,255,.2); }
        .sw-footer-seo-b { font-size: .58rem; color: rgba(255,255,255,.14); text-align: right; }

        /* ── FLOATING ── */
        .sw-float-call { position: fixed; bottom: 98px; right: 20px; z-index: 200; }
        .sw-float-call a { display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; background: #000; color: #fff; box-shadow: 0 6px 24px rgba(0,0,0,.4); text-decoration: none; transition: background .2s; }
        .sw-float-call a:hover { background: var(--sw-gold); }
        .sw-float-wa  { position: fixed; bottom: 26px; right: 20px; z-index: 200; }
        .sw-float-wa a { display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; background: #25D366; color: var(--sw-white); box-shadow: 0 6px 24px rgba(37,211,102,.45); position: relative; text-decoration: none; }
        .sw-float-wa a::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #25D366; opacity: .5; animation: swring 2s infinite; }
        @keyframes swring { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.75);opacity:0} }

        /* ── MODAL ── */
        .sw-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,.88); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 16px; }
        .sw-modal   { background: #FAF8F5; border-radius: 18px; max-width: 860px; width: 100%; max-height: 92vh; overflow-y: auto; position: relative; }
        .sw-modal-close { position: absolute; top: 12px; right: 12px; width: 38px; height: 38px; border-radius: 50%; background: var(--sw-white); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: var(--sw-dark); z-index: 10; }
        .sw-modal-img   { width: 100%; background: #000; display: flex; justify-content: center; }
        .sw-modal-img img { width: 100%; height: auto; max-height: 65vh; object-fit: contain; }
        .sw-modal-body  { padding: 20px 24px; text-align: center; }
        .sw-modal-title { font-family: 'Cormorant Garamond',serif; font-size: 1.5rem; font-weight: 700; color: var(--sw-dark); margin: 6px 0 18px; }
        .sw-modal-closebtn { padding: 12px 34px; background: var(--sw-dark); color: var(--sw-white); border: none; border-radius: 100px; font-size: .72rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; cursor: pointer; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .sw-process-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 1024px) {
          .sw-feature-grid  { grid-template-columns: repeat(2,1fr); }
          .sw-gallery-grid  { --cols: 2 !important; }
          .sw-transform-grid { grid-template-columns: repeat(2,1fr); }
          .sw-why-inner     { grid-template-columns: 1fr; gap: 36px; }
          .sw-footer-div    { display: none; }
          .sw-carousel-track { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 768px) {
          .sw-hdr { height: 60px; padding: 0 16px; }
          .sw-hdr-logo { height: 38px; }
          .sw-hdr-name { font-size: 1.2rem; }
          .sw-hdr-badge { display: none; }
          .sw-hdr-cta { font-size: .5rem; padding: 9px 11px; }
          .sw-hero { flex-direction: column; min-height: auto; }
          .sw-hero-img { order: 1; height: 58vw; min-height: 220px; }
          .sw-hero-img-fade { background: linear-gradient(to bottom, transparent 50%, var(--sw-cream) 100%); }
          .sw-hero-text { order: 2; padding: 28px 16px 44px; }
          .sw-hero-btns { flex-direction: column; }
          .sw-btn-pri, .sw-btn-sec { width: 100%; justify-content: center; padding: 13px 18px; font-size: .64rem; }
          .sw-sec { padding: 48px 16px; }
          .sw-feature-grid  { grid-template-columns: 1fr; }
          .sw-service-grid  { grid-template-columns: 1fr; }
          .sw-gallery-grid  { --cols: 2 !important; gap: 8px; }
          .sw-transform-grid { grid-template-columns: repeat(2,1fr); gap: 8px; }
          .sw-why-right { grid-template-columns: repeat(2,1fr); }
          .sw-process-grid { grid-template-columns: 1fr; }
          .sw-google-card { flex-direction: column; padding: 22px 18px; border-radius: 20px; text-align: center; gap: 14px; }
          .sw-google-div  { display: none; }
          .sw-pill-btn    { width: 100%; justify-content: center; }
          .sw-black-badge { flex-direction: column; text-align: center; padding: 22px 18px; gap: 16px; border-radius: 16px; max-width: 100%; }
          .sw-badge-div   { display: none; }
          .sw-carousel-track { grid-template-columns: 1fr; }
          .sw-cta-box     { padding: 40px 18px; }
          .sw-cta-btns    { flex-direction: column; }
          .sw-footer-inner { flex-direction: column; gap: 22px; }
          .sw-footer-bottom { flex-direction: column; gap: 6px; }
          .sw-sec-cta-row { flex-direction: column; }
          .sw-prod-header { flex-direction: column; gap: 20px; }
          .sw-float-call  { bottom: 90px; right: 14px; }
          .sw-float-call a, .sw-float-wa a { width: 50px; height: 50px; }
          .sw-float-wa    { bottom: 20px; right: 14px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="sw-hdr">
        <a className="sw-hdr-brand" href="/">
          <img src="/videos/Revisedlogo.webp" alt="Shrusara Logo" className="sw-hdr-logo" />
          <div>
            <div className="sw-hdr-name">Shrusara</div>
            <div className="sw-hdr-sub">FASHION&nbsp;&nbsp;BOUTIQUE</div>
          </div>
        </a>
        <div className="sw-hdr-badge">
          <span className="sw-hdr-dot" />
          Bangalore's Premium Designer Boutique
        </div>
        <a href={waLink('hero')} target="_blank" rel="noopener noreferrer"
          className="sw-hdr-cta" onClick={() => trackWhatsApp('header')}>
          <WaIcon size={13} /> Book Consultation
        </a>
      </header>

      {/* ── SECTION 1: HERO ── */}
      <section className="sw-hero">
        <div className="sw-hero-text">
          <p className="sw-hero-tag">Bangalore's Premium Designer Boutique</p>
          <h1 className="sw-hero-h1">
            <em>Ready-to-Wear</em> Sarees
            <span className="sw-hero-amp">&amp;</span>
            Transform Your Saree Into <em>Beautiful New Outfits</em>
          </h1>
          <p className="sw-hero-sub">Transform your treasured sarees into convenient ready-to-wear sarees or beautiful customized outfits tailored to your style, measurements and preferences.</p>
          <p className="sw-hero-desc">At Shrusara Fashion Boutique, we specialize in giving sarees a beautiful new life. Whether you want a saree that can be worn in minutes or wish to transform a cherished saree into a stunning designer outfit, every project is customized exclusively for you.</p>
          <div className="sw-hero-trust">
            {['Fully Customized Services', 'Bring Your Own Saree', 'Personalized Design Consultation', 'Premium Craftsmanship & Finishing', 'Trusted by Women Across Bangalore'].map((t, i) => (
              <span key={i} className="sw-hero-trust-item"><span className="sw-check">✔</span>{t}</span>
            ))}
          </div>
          <div className="sw-hero-btns">
            <a href={waLink('hero')} target="_blank" rel="noopener noreferrer"
              className="sw-btn-pri" onClick={() => trackWhatsApp('hero')}>
              <WaIcon size={16} /> Book Consultation
            </a>
            <a href={`tel:${PHONE_NUMBER}`} className="sw-btn-sec" onClick={() => trackPhoneCall('hero')}>
              <PhoneIcon size={14} /> Call Now
            </a>
          </div>
          <p className="sw-hero-note">We do not sell ready-made sarees or outfits. Every project is customized according to your saree, measurements and style preferences.</p>
        </div>
        <div className="sw-hero-img">
          <img src="/videos/ready-to-wear-designer-saree-bangalore-shrusara.webp" alt="Ready-to-wear saree and saree transformation services in Bangalore by Shrusara" />
          <div className="sw-hero-img-fade" />
        </div>
      </section>

      {/* ── SECTION 2: FEATURE CARDS ── */}
      <section className="sw-sec sw-sec-white" style={{ padding: '0 4vw 56px' }}>
        <div style={{ padding: '48px 0 28px', textAlign: 'center' }}>
          <h2 className="sw-h2">Give Your Sarees a Beautiful New Life</h2>
          <p className="sw-lead" style={{ margin: '8px auto 0' }}>Many beautiful sarees remain unused because they are difficult to drape, worn only occasionally or no longer suit your lifestyle. Our customization services help transform those treasured sarees into practical, elegant and wearable creations.</p>
        </div>
        <div className="sw-feature-grid">
          {[
            { icon: '◈', label: 'Customized For You',      title: 'Customized for You',         desc: 'Every design is tailored according to your measurements, preferences and occasion.' },
            { icon: '✦', label: 'Preserve Memories',        title: 'Preserve Precious Memories',  desc: 'Transform treasured sarees while preserving their emotional and sentimental value.' },
            { icon: '◷', label: 'Modern & Practical',       title: 'Modern & Practical',           desc: 'Enjoy creations that are easier to wear and suited to modern lifestyles.' },
            { icon: '★', label: 'Premium Craftsmanship',    title: 'Premium Craftsmanship',        desc: 'Expert tailoring and finishing ensure every creation looks elegant and refined.' },
          ].map(item => (
            <div key={item.title} className="sw-feature-item">
              <div className="sw-feature-icon">{item.icon}</div>
              <div>
                <p className="sw-feature-label">{item.label}</p>
                <p className="sw-feature-title">{item.title}</p>
                <p className="sw-feature-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="sw-divider" />

      {/* ── SECTION 3: SERVICES ── */}
      <section className="sw-sec sw-sec-cream">
        <p className="sw-eyebrow">Our Services</p>
        <h2 className="sw-h2">Our Saree Customization Services</h2>
        <p className="sw-lead">Two distinct services to help you get more from your treasured sarees — both fully customized to your measurements, style and preferences.</p>
        <div className="sw-service-grid">
          <div className="sw-service-card">
            <div className="sw-service-num">01</div>
            <h3 className="sw-service-title">Ready-to-Wear Sarees (Pre-Stitched Sarees)</h3>
            <p className="sw-service-desc">Convert your saree into a permanently stitched saree that can be worn quickly and comfortably while maintaining the elegance of a traditional saree.</p>
          </div>
          <div className="sw-service-card">
            <div className="sw-service-num">02</div>
            <h3 className="sw-service-title">Transform Your Saree Into Beautiful New Outfits</h3>
            <p className="sw-service-desc">Convert treasured sarees into customized lehengas, gowns, Indo-Western outfits, crop tops, dresses and designer blouses.</p>
          </div>
        </div>
      </section>

      <div className="sw-divider" />

      {/* ── SECTION 4: READY-TO-WEAR ── */}
      <section id="ready-to-wear-gallery" className="sw-sec sw-sec-white">
        <div className="sw-prod-header">
          <div className="sw-prod-header-text">
            <p className="sw-eyebrow">Service 01</p>
            <h2 className="sw-h2">Ready-to-Wear Saree &amp; Pre-Stitched Saree Customization in Bangalore</h2>
            <p className="sw-lead" style={{ marginBottom: 0 }}>Enjoy the elegance of a saree without the hassle of traditional draping. We permanently customize your saree into a ready-to-wear pre-stitched saree that can be worn in just a few minutes while maintaining the beauty and grace of a traditional saree.</p>
          </div>
          <div className="sw-prod-header-aside">
            <Highlights points={['Wear in Minutes', 'Permanent Stitching', 'Customized Measurements', 'Comfortable & Secure Fit', 'Ideal for Weddings & Functions', 'Reusable & Easy to Wear']} />
          </div>
        </div>
        <GalleryGrid images={readyToWearImages} waKey="readyToWear" waLabel1="Discuss Your Saree" columns={4} />
        <p className="sw-seo-note">Looking for a ready-to-wear saree in Bangalore? Our customized ready-to-wear saree service transforms your saree into a permanently stitched saree that can be worn quickly and comfortably. Whether you call it a pre-stitched saree, one-minute saree or ready-to-wear saree, every design is customized according to your measurements and preferences while preserving the elegance of the original saree.</p>
      </section>

      <div className="sw-divider" />

      {/* ── SECTION 5: TRANSFORMATION ── */}
      <section className="sw-sec sw-sec-cream">
        <div className="sw-prod-header">
          <div className="sw-prod-header-text">
            <p className="sw-eyebrow">Service 02</p>
            <h2 className="sw-h2">Transform Your Saree Into Beautiful New Outfits</h2>
            <p className="sw-lead" style={{ marginBottom: 0 }}>Transform old, unused, wedding or treasured sarees into beautiful designer outfits that can be worn and enjoyed again. Every creation is customized according to your vision, measurements and personal style.</p>
          </div>
          <div className="sw-prod-header-aside">
            <Highlights points={['Saree to Lehenga', 'Saree to Designer Gown', 'Saree to Indo-Western Outfit', 'Saree to Crop Top & Skirt Set', 'Saree to Long Dress', 'Saree to Designer Jacket', 'Saree to Customized Blouse', 'Saree to Occasion Wear Outfit']} />
          </div>
        </div>
        <GalleryGrid images={transformImages} waKey="transform" waLabel1="Share Your Saree Design Idea" columns={4} />
        <p className="sw-seo-note">Our saree transformation service helps convert silk sarees, Kanjivaram sarees, wedding sarees and treasured heirloom sarees into elegant designer outfits. Whether you wish to create a lehenga, gown, Indo-Western outfit or custom ensemble, every design is tailored around your preferences while preserving the beauty of the original saree.</p>
      </section>

      <div className="sw-divider" />

      {/* ── SECTION 6: TRANSFORMATION GALLERY ── */}
      <section id="saree-transformation-gallery" className="sw-sec sw-sec-white sw-center">
        <p className="sw-eyebrow" style={{ justifyContent: 'center' }}>Transformation Gallery</p>
        <h2 className="sw-h2">From Treasured Saree to Stunning New Creation</h2>
        <p className="sw-lead">See how cherished sarees have been transformed into elegant, wearable creations through thoughtful design, expert tailoring and personalized customization.</p>
        <div className="sw-transform-grid">
          {transformationGallery.map((img, i) => (
            <div key={i} className="sw-transform-card">
              <div className="sw-transform-inner">
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
              <p className="sw-transform-label">{img.title}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="sw-divider" />

      {/* ── SECTION 7: WHY ── */}
      <section className="sw-sec sw-sec-cream">
        <div className="sw-why-inner">
          <div>
            <p className="sw-eyebrow">Why Us</p>
            <h2 className="sw-h2">Why Women Across Bangalore Choose Shrusara</h2>
            <p className="sw-lead" style={{ marginBottom: 0 }}>At Shrusara Fashion Boutique, we focus on creating customized designs rather than selling ready-made products. Every project begins with understanding your vision, saree and styling preferences before transforming it into something uniquely yours.</p>
            <div className="sw-why-list">
              {[
                { icon: '✦', text: 'Personalized Consultation' },
                { icon: '◈', text: 'Fully Customized Designs' },
                { icon: '◷', text: 'Expertise in Saree Transformations' },
                { icon: '★', text: 'Attention to Detail' },
                { icon: '✒', text: 'Premium Finishing' },
                { icon: '◉', text: 'Made-to-Measure Fit' },
                { icon: '✿', text: 'Preservation of Saree Beauty' },
                { icon: '◆', text: 'Trusted by Women Across Bangalore' },
              ].map((pt, i) => (
                <div key={i} className="sw-why-item">
                  <div className="sw-why-item-icon">{pt.icon}</div>
                  <p className="sw-why-item-text">{pt.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sw-why-right">
            {[
              { src: '/videos/ready-to-wear-designer-saree-bangalore-shrusara.webp',             alt: 'Ready-to-wear saree Bangalore' },
              { src: '/bridal/Lehenga/luxury-bridal-lehenga-custom-design-bangalore.webp',        alt: 'Saree to lehenga transformation' },
              { src: '/designer/designer gown/designer-party-wear-designer-evening-gown-shrusara.webp', alt: 'Saree to gown transformation' },
              { src: '/videos/designer-croptop-lehenga-bangalore-shruthi-shrusara.webp',          alt: 'Saree to crop top set' },
            ].map((img, i) => (
              <div key={i} className="sw-why-img-card">
                <div className="sw-why-img-inner">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sw-divider" />

      {/* ── SECTION 8: SOCIAL PROOF ── */}
      <section className="sw-sec sw-sec-white sw-center">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 40, height: 1, background: 'var(--sw-gold)', opacity: .6 }} />
          <span style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--sw-gold)' }}>Top Rated Designer Boutique in Bangalore</span>
          <div style={{ width: 40, height: 1, background: 'var(--sw-gold)', opacity: .6 }} />
        </div>
        <h2 className="sw-h2">Trusted by Women Across Bangalore</h2>
        <p className="sw-lead">Real experiences from women who trusted Shrusara Fashion Boutique for their saree customization and transformation projects.</p>
        <div className="sw-google-card">
          <GoogleIcon size={42} />
          <div className="sw-google-div" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' }}>
            <span className="sw-big-num">4.9</span>
            <div>
              <div className="sw-stars-row">★★★★★</div>
              <div className="sw-source-lbl">Google Reviews</div>
            </div>
          </div>
          <div className="sw-google-div" />
          <div className="sw-sub-row">Based on <strong style={{ color: 'var(--sw-dark)', fontWeight: 700 }}>250+</strong> verified reviews on Google</div>
          <div className="sw-google-div" />
          <a href="https://www.google.com/search?q=Shrusara+Fashion+Boutique+Bangalore" target="_blank" rel="noopener noreferrer" className="sw-pill-btn">
            VIEW ON GOOGLE <span style={{ fontSize: '1.1rem' }}>→</span>
          </a>
        </div>
        <div className="sw-black-badge">
          <div style={{ color: '#A88A64', flexShrink: 0 }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </div>
          <div className="sw-badge-div" />
          <div>
            <div className="sw-badge-stars">★★★★★</div>
            <h3 className="sw-badge-h3">250+ HAPPY CLIENTS IN BANGALORE</h3>
            <p className="sw-badge-p">Loved by clients. Chosen for craftsmanship.</p>
          </div>
        </div>
        <div style={{ marginTop: 52 }}>
          <p className="sw-eyebrow" style={{ justifyContent: 'center' }}>What Our Clients Say</p>
          <h2 className="sw-h2" style={{ marginBottom: 10 }}>Real Reviews from Real Clients</h2>
          <p className="sw-lead" style={{ marginBottom: 36 }}>Personal stories from women who trusted Shrusara to transform their treasured sarees.</p>
          <ReviewsCarousel />
        </div>
      </section>

      <div className="sw-divider" />

      {/* ── SECTION 9: PROCESS ── */}
      <section className="sw-sec sw-sec-cream">
        <p className="sw-eyebrow">How It Works</p>
        <h2 className="sw-h2">Our Custom Design Process</h2>
        <p className="sw-lead">A simple, guided process from your first consultation to the final delivery of your beautifully transformed saree.</p>
        <div className="sw-process-grid">
          {processSteps.map(s => (
            <div key={s.n} className="sw-process-card" data-n={s.n}>
              <span className="sw-process-n">Step {s.n}</span>
              <h3 className="sw-process-title">{s.title}</h3>
              <p className="sw-process-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="sw-divider" />

      {/* ── SECTION 10: FAQ ── */}
      <section className="sw-sec sw-sec-white sw-center">
        <p className="sw-eyebrow" style={{ justifyContent: 'center' }}>FAQs</p>
        <h2 className="sw-h2">Frequently Asked Questions</h2>
        <p className="sw-lead">Everything you need to know about our ready-to-wear saree and saree transformation services.</p>
        <div className="sw-faq-wrap">
          {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      <div className="sw-divider" />

      {/* ── FINAL CTA ── */}
      <section id="consultation" className="sw-sec sw-sec-cream">
        <div className="sw-cta-box">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <p className="sw-cta-eyebrow">Saree Consultation</p>
          </div>
          <h2 className="sw-cta-h">Transform Your Saree Into Something Beautiful</h2>
          <p className="sw-cta-sub">Whether you want a convenient ready-to-wear saree or wish to create a completely new outfit from a cherished saree, our designer will guide you through every step of the customization process.</p>
          <div className="sw-cta-trust">
            {['Personalized Design Consultation', 'Customized To Your Measurements', 'Premium Craftsmanship'].map(t => (
              <span key={t} className="sw-cta-tp">{t}</span>
            ))}
          </div>
          <div className="sw-cta-btns">
            <a href={waLink('finalCta')} target="_blank" rel="noopener noreferrer"
              className="sw-btn-pri sw-btn-pri-gold" onClick={() => trackWhatsApp('final_cta')}>
              <WaIcon size={18} /> WhatsApp Consultation
            </a>
            <a href={`tel:${PHONE_NUMBER}`} className="sw-btn-sec sw-btn-sec-white" onClick={() => trackPhoneCall('final_cta')}>
              <PhoneIcon size={14} /> Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="sw-footer">
        <div className="sw-footer-inner">
          <div className="sw-footer-brand">
            <p className="sw-footer-name">Shrusara Fashion Boutique</p>
            <span className="sw-footer-tag">Designer Boutique · Bangalore</span>
            <p className="sw-footer-desc">Specializing in ready-to-wear saree customization, pre-stitched sarees, and saree transformation services tailored to your measurements and style.</p>
            <p className="sw-footer-seo">Shrusara Fashion Boutique is a premium designer boutique in Bangalore specializing in ready-to-wear saree customization, pre-stitched sarees, one-minute sarees, saree stitching services and saree transformation services. We help transform treasured sarees into elegant wearable creations including lehengas, gowns, Indo-Western outfits, crop tops, dresses and customized blouses.</p>
          </div>
          <div className="sw-footer-div" />
          <div className="sw-footer-contact">
            <span className="sw-footer-contact-title">Contact Us</span>
            <div className="sw-footer-contact-list">
              <span className="sw-footer-contact-item">
                <span className="sw-footer-icon"><MapPinIcon size={13} /></span>
                106, 6th Main Road, Mahalakshmipuram, Bangalore – 560086
              </span>
              <a href={`tel:${PHONE_NUMBER}`} className="sw-footer-contact-item" onClick={() => trackPhoneCall('footer')}>
                <span className="sw-footer-icon"><PhoneIcon size={13} /></span>{PHONE_NUMBER}
              </a>
              <a href="mailto:help@shrusara.com" className="sw-footer-contact-item">
                <span className="sw-footer-icon"><MailIcon size={13} /></span>help@shrusara.com
              </a>
              <a href={waLink('hero')} target="_blank" rel="noopener noreferrer" className="sw-footer-contact-item" onClick={() => trackWhatsApp('footer')}>
                <span className="sw-footer-icon"><WaIcon size={13} /></span>WhatsApp Us
              </a>
            </div>
            <a href="https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore" target="_blank" rel="noopener noreferrer" className="sw-footer-map">
              <MapPinIcon size={11} /> View on Google Maps
            </a>
          </div>
        </div>
        <div className="sw-footer-bottom">
          <p className="sw-footer-copy">© {new Date().getFullYear()} Shrusara Fashion Boutique. All rights reserved.</p>
          <p className="sw-footer-seo-b">Ready-to-Wear Sarees · Saree Transformation · Pre-Stitched Sarees · Bangalore</p>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ── */}
      <div className="sw-float-call">
        <a href={`tel:${PHONE_NUMBER}`} aria-label="Call Now" onClick={() => trackPhoneCall('floating')}>
          <PhoneIcon size={24} />
        </a>
      </div>
      <div className="sw-float-wa">
        <a href={waLink('hero')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={() => trackWhatsApp('floating')}>
          <WaIcon size={26} />
        </a>
      </div>
    </>
  );
}
