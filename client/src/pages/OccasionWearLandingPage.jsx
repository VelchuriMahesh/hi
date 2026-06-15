import { useState } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919741827558';
const PHONE_NUMBER    = import.meta.env.VITE_PHONE_NUMBER    || '9741827558';

// ─── WhatsApp Pre-filled Messages ────────────────────────────────────────────
const WA_MESSAGES = {
  hero: `Hi Shrusara Boutique, I visited your page and want to book a custom design consultation with Chief Designer Shruthi Ajith.\n• Outfit Type: (Gown / Lehenga / Blouse / Matching Set)\n• My Event Date: \n[I am sharing my design reference screenshots below]`,
  gowns: `Hi Shrusara Boutique, I am looking to custom-stitch a Designer Gown / Indo-Western outfit for an upcoming event and want to discuss my design ideas with Shruthi Ajith.\n• My Event Date: \n[Sharing my reference images below]`,
  blouses: `Hi Shrusara Boutique, I want to get a Custom Designer Blouse stitched for an occasion. I would like to share my measurements and discuss necklines/patterns.\n• Required By Date: \n[Sharing my blouse inspiration/saree photos below]`,
  lehenga: `Hi Shrusara Boutique, I am interested in custom-building a Lehenga / Crop Top Set / Half Saree from scratch. Can you help me with fabric curation and design options?\n• My Event Date: \n[Sharing my reference screenshots below]`,
  motherDaughter: `Hi Shrusara Boutique, I love your Mother-Daughter twinning outfits! I want to get a coordinated set custom-tailored for my daughter and myself.\n• Daughter's Age/Size: \n• Occasion Date: \n[Sharing our preferred color/style reference below]`,
  finalCta: `Hi Shrusara Boutique, I just reviewed your customized occasion wear collections and would like to book a design consultation with Chief Designer Shruthi Ajith.\n• My Event Date: \n• Custom Outfit Needed (Gown / Blouse / Lehenga / Matching Set): \n[I am attaching my design reference screenshots below so we can discuss ideas!]`,
};

const waLink = (key) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGES[key] || WA_MESSAGES.hero)}`;

// ─── Tracking Helpers ─────────────────────────────────────────────────────────
function trackWhatsApp(label) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', { event_category: 'Lead', event_label: label });
  }
}
function trackPhoneCall(label) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'phone_call_click', { event_category: 'Lead', event_label: label });
  }
}

// ─── Gallery Data ─────────────────────────────────────────────────────────────
const gownImages = [
  { src: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp',          alt: 'Gold Indo-Western Crop Top Lehenga',         title: 'Gold Indo-Western Crop Top Lehenga' },
  { src: '/designer/Indowestern/contemporary-modren-bridal-trousseau-outfit-shruthi-ajith.webp',   alt: 'Ivory Indo-Western Crop Top Lehenga',         title: 'Ivory Indo-Western Lehenga' },
  { src: '/designer/designer gown/designer-party-wear-designer-evening-gown-shrusara.webp',        alt: 'Midnight Wine Designer Gown',                 title: 'Midnight Wine Designer Gown' },
  { src: '/videos/designer-party-wear-designer-frock-shrusara.webp',                               alt: 'Midnight Wine Couture Gown',                  title: 'Midnight Wine Couture Gown' },
  { src: '/videos/desingerhero.webp',                                                              alt: 'Ruby One-Shoulder Designer Gown',             title: 'Ruby One-Shoulder Gown' },
  { src: '/designer/Partwearset/elegant-designer-evening-gown-for-shruthi-ajith-bangalore.webp',   alt: 'Crimson Trail Party Gown',                    title: 'Crimson Trail Party Gown' },
  { src: '/bridal/Gown/elegant-modern-reception-gown-brides-featuring-silhouette-premium-fabric.webp', alt: 'Elegant Reception Gown',                  title: 'Elegant Reception Gown' },
  { src: '/designer/designer gown/premium-designer-ball-gown-for-engagement-bangalore.webp',       alt: 'Mint Luxe Designer Ball Gown',                title: 'Mint Luxe Ball Gown' },
  { src: '/designer/designer gown/modern-gown-maternity-photoshoot-premium-finishing-shrusara-banaglore.webp', alt: 'Royal Blue Maternity Gown',        title: 'Royal Blue Maternity Gown' },
  { src: '/designer/Partwearset/custom-photoshoot-red-gown-reception-wear-bangalore.webp',         alt: 'Scarlet Evening Designer Gown',               title: 'Scarlet Evening Gown' },
  { src: '/designer/designer gown/elegant-evening-gown-brides-featuring-modern-silhouette-premium-fabric.webp', alt: 'Noir Evening Couple Couture',     title: 'Noir Evening Couture' },
  { src: '/designer/designer gown/modern-gown-bridal-reception-premium-finishing-Shrusara-banaglore.webp', alt: 'Floral Trail Indo-Western Gown',       title: 'Floral Trail Gown' },
];

const blouseImages = [
  { src: '/designer/Partwearset/designer-blouse-saree-bangalore-shrusara.webp',             alt: 'Contemporary Designer Blouse',       title: 'Contemporary Designer Blouse' },
  { src: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp',   alt: 'Embroidered Designer Blouse',        title: 'Embroidered Designer Blouse' },
  { src: '/designer/Partwearset/elegant-designer-evening-gown-for-shruthi-ajith-bangalore.webp', alt: 'Statement Sleeve Blouse',       title: 'Statement Sleeve Blouse' },
  { src: '/designer/Indowestern/contemporary-modren-bridal-trousseau-outfit-shruthi-ajith.webp', alt: 'Modern Neckline Blouse',        title: 'Modern Neckline Blouse' },
  { src: '/videos/ready-to-wear-designer-saree-bangalore-shrusara.webp',                    alt: 'Ready-to-Wear Designer Saree',       title: 'Saree & Blouse Set' },
  { src: '/designer/designer gown/designer-party-wear-designer-evening-gown-shrusara.webp', alt: 'Festive Designer Blouse',            title: 'Festive Designer Blouse' },
  { src: '/bridal/Gown/elegant-modern-reception-gown-brides-featuring-silhouette-premium-fabric.webp', alt: 'Reception Blouse',        title: 'Reception Blouse' },
  { src: '/designer/Partwearset/modern-tail-gown-reception-premium-finishing-shrusara-banaglore.webp', alt: 'Couture Blouse',          title: 'Couture Blouse' },
];

const lehengaImages = [
  { src: '/videos/designer-croptop-lehenga-bangalore-shruthi-shrusara.webp',   alt: 'Designer Crop Top Lehenga',              title: 'Designer Crop Top Lehenga' },
  { src: '/bridal/Lehenga/luxury-bridal-lehenga-custom-design-bangalore.webp',  alt: 'Luxury Bridal Lehenga',                  title: 'Luxury Bridal Lehenga' },
  { src: '/bridal/bridalblow/custom-made-bridal-reception-lehenga-shrusara.webp', alt: 'Custom Bridal Reception Lehenga',       title: 'Custom Bridal Lehenga' },
  { src: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp', alt: 'Indo-Western Crop Top Set',     title: 'Indo-Western Crop Top Set' },
  { src: '/designer/Partwearset/designer-blouse-saree-bangalore-shrusara.webp', alt: 'Half Saree Set',                         title: 'Designer Half Saree' },
  { src: '/designer/Indowestern/contemporary-modren-bridal-trousseau-outfit-shruthi-ajith.webp', alt: 'Contemporary Lehenga',   title: 'Contemporary Lehenga Set' },
  { src: '/videos/ready-to-wear-designer-saree-bangalore-shrusara.webp',        alt: 'Ready-to-Wear Half Saree',               title: 'Ready-to-Wear Half Saree' },
  { src: '/designer/designer gown/reception-gown-for-brides-shrusara-fashion-boutique.webp', alt: 'Festive Lehenga',            title: 'Festive Lehenga Set' },
];

const motherDaughterImages = [
  { src: '/videos/mother-and-daughter-premium-matching-frock-shrusara-boutique.webp', alt: 'Mother Daughter Heritage Set',  title: 'Heritage Matching Set' },
  { src: '/videos/mother-and-daughter-matching-frock-shrusara-boutique.webp',         alt: 'Mommy & Me Princess Set',       title: 'Mommy & Me Princess Set' },
  { src: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp', alt: 'Coordinated Family Look',   title: 'Coordinated Family Look' },
  { src: '/designer/Partwearset/modern-tail-gown-reception-premium-finishing-shrusara-banaglore.webp', alt: 'Matching Festive Set', title: 'Festive Matching Set' },
  { src: '/designer/designer gown/designer-party-wear-designer-evening-gown-shrusara.webp', alt: 'Celebration Matching Set', title: 'Celebration Matching Set' },
  { src: '/videos/designer-croptop-lehenga-bangalore-shruthi-shrusara.webp',          alt: 'Birthday Matching Outfits',     title: 'Birthday Matching Outfits' },
];

const reviews = [
  { name: 'Kavitha M.',  text: 'I ordered a custom designer gown from Shrusara for my sister\'s reception. The fitting was absolutely perfect and Shruthi Ajith personally helped me choose the right design. An outstanding boutique in Bangalore!' },
  { name: 'Pooja D.',    text: 'My Indo-western outfit for the Diwali party was absolutely stunning. The tailoring was precise and it was delivered on time. Shrusara truly understands what modern women want from their designer outfits.' },
  { name: 'Smitha R.',   text: 'I got a mother-daughter matching set made at Shrusara for a family function. The quality and attention to detail were exceptional. We received so many compliments! Highly recommended boutique in Bangalore.' },
  { name: 'Nandini K.',  text: 'The crop top and lehenga set I ordered was beyond my expectations. Shruthi Ajith guided me through the entire design process and the outcome was simply gorgeous. Perfect fit and premium finishing.' },
  { name: 'Haritha S.',  text: 'Shrusara delivered my designer blouse exactly the way I imagined. The craftsmanship is superb and the consultation was so helpful. They really listen to what you want and bring it to life beautifully.' },
  { name: 'Anjali T.',   text: 'I was pleasantly surprised by the quality of the kurtha set I ordered. The fabric was premium and the stitching was flawless. Shrusara is now my go-to designer boutique in Bangalore for all occasions.' },
];

const faqs = [
  { q: 'Do you sell ready-made outfits?',           a: 'No. We specialize exclusively in customized designer outfits tailored according to your measurements, preferences and occasion requirements.' },
  { q: 'Can I share reference images?',             a: 'Yes. Inspiration images and design references help us better understand your preferred style.' },
  { q: 'Do you stitch designer blouses?',           a: 'Yes. We create customized designer blouses featuring premium embroidery, unique necklines and personalized detailing.' },
  { q: 'Can I provide my own fabric?',              a: 'Yes. You may provide your own fabric or choose from our available options.' },
  { q: 'How long does customization take?',         a: 'Timelines vary depending on design complexity. Most projects are completed within 2–6 weeks.' },
  { q: 'Do you offer trial fittings?',              a: 'Yes. Trial sessions are arranged whenever required to ensure the perfect fit.' },
  { q: 'Do you take urgent orders?',               a: 'Urgent requests may be accommodated depending on design complexity and production schedules.' },
  { q: 'Do you serve clients outside Bangalore?',  a: 'Yes. Remote consultations and measurement guidance can be arranged.' },
  { q: 'Can you create matching family outfits?',   a: 'Yes. We design mother-daughter and coordinated family outfits for special occasions.' },
];

const processSteps = [
  { n: '01', title: 'Consultation',          desc: 'Share your occasion, preferences, inspiration images and styling requirements. Our Chief Designer will personally guide you.' },
  { n: '02', title: 'Design & Measurements', desc: 'We finalize the outfit design, measurements, customization details and styling direction.' },
  { n: '03', title: 'Fabric & Craftsmanship',desc: 'Premium fabrics, embroidery work and detailing are selected and crafted according to the approved design.' },
  { n: '04', title: 'Trial & Adjustments',   desc: 'Trial sessions ensure the outfit fits perfectly. Necessary adjustments are made for optimal comfort and appearance.' },
  { n: '05', title: 'Final Delivery',        desc: 'Your outfit undergoes final quality checks before being delivered ready for your special occasion.' },
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
    <div className="ow-overlay" onClick={onClose}>
      <div className="ow-modal" onClick={e => e.stopPropagation()}>
        <button className="ow-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="ow-modal-img">
          <img src={item.src} alt={item.alt} />
        </div>
        <div className="ow-modal-body">
          <p className="ow-eyebrow-sm">Design Preview</p>
          <h3 className="ow-modal-title">{item.title}</h3>
          <button className="ow-modal-closebtn" onClick={onClose}>Close Preview</button>
        </div>
      </div>
    </div>
  );
}

function GalleryGrid({ images, waKey, waLabel, columns = 4 }) {
  const [modal, setModal] = useState(null);
  return (
    <>
      <div className="ow-gallery-grid" style={{ '--cols': columns }}>
        {images.map((img, i) => (
          <button key={i} className="ow-gallery-card" onClick={() => setModal(img)} aria-label={`View ${img.title}`}>
            <div className="ow-gallery-card-inner">
              <img src={img.src} alt={img.alt} loading={i < 4 ? 'eager' : 'lazy'} />
            </div>
          </button>
        ))}
      </div>
      <div className="ow-sec-cta-row">
        <a href={waLink(waKey)} target="_blank" rel="noopener noreferrer"
          className="ow-btn-pri" onClick={() => trackWhatsApp(waKey)}>
          <WaIcon size={16} /> {waLabel}
        </a>
        <a href={`tel:${PHONE_NUMBER}`} className="ow-btn-sec" onClick={() => trackPhoneCall(waKey)}>
          <PhoneIcon size={14} /> Call Now
        </a>
      </div>
      <ImageModal item={modal} onClose={() => setModal(null)} />
    </>
  );
}

function SectionHighlights({ points }) {
  return (
    <ul className="ow-highlights">
      {points.map((p, i) => <li key={i} className="ow-highlight-item"><span className="ow-check">✔</span>{p}</li>)}
    </ul>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ow-faq-item${open ? ' open' : ''}`}>
      <button className="ow-faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <ChevronIcon size={18} open={open} />
      </button>
      {open && <div className="ow-faq-a"><p>{a}</p></div>}
    </div>
  );
}

function ReviewsCarousel() {
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const max = reviews.length - visible;
  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(max, i + 1));
  const shown = reviews.slice(idx, idx + visible);
  return (
    <div className="ow-carousel">
      <div className="ow-carousel-track">
        {shown.map((r, i) => (
          <div key={i} className="ow-review-card">
            <p className="ow-review-stars">★★★★★</p>
            <p className="ow-review-text">{r.text}</p>
            <p className="ow-review-name">{r.name}</p>
          </div>
        ))}
      </div>
      <div className="ow-carousel-nav">
        <button className="ow-nav-btn" onClick={prev} disabled={idx === 0} aria-label="Previous">←</button>
        <div className="ow-dots">
          {reviews.map((_, i) => i <= max && (
            <button key={i} className={`ow-dot${idx === i ? ' active' : ''}`} onClick={() => setIdx(i)} aria-label={`Go to ${i + 1}`} />
          ))}
        </div>
        <button className="ow-nav-btn" onClick={next} disabled={idx >= max} aria-label="Next">→</button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OccasionWearLandingPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold:       #B8935A;
          --gold-pale:  #F5EDD9;
          --gold-light: #E8D5B0;
          --dark:       #1C1410;
          --cream:      #FBF8F3;
          --white:      #FFFFFF;
          --text:       #3A2E25;
          --muted:      #7A6A5A;
          --border:     rgba(184,147,90,.15);
        }
        body { font-family: 'Jost','Poppins',sans-serif; background: var(--cream); color: var(--text); overflow-x: hidden; }

        /* ── HEADER ── */
        .ow-hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(251,248,243,.97); backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 0 4vw; display: flex; align-items: center;
          justify-content: space-between; height: 64px; gap: 10px;
        }
        .ow-hdr-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .ow-hdr-logo  { height: 44px; width: auto; object-fit: contain; }
        .ow-hdr-name  { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: 1.5rem; font-weight: 700; color: var(--dark); line-height: 1; white-space: nowrap; }
        .ow-hdr-sub   { font-size: .44rem; letter-spacing: .28em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-top: 4px; }
        .ow-hdr-badge { display: flex; align-items: center; gap: 6px; font-size: .58rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); font-weight: 500; }
        .ow-hdr-dot   { width: 6px; height: 6px; border-radius: 50%; background: #4CAF50; animation: pulse 2s infinite; flex-shrink: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
        .ow-hdr-cta   { display: inline-flex; align-items: center; gap: 7px; background: var(--dark); color: var(--white); font-size: .56rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 10px 16px; text-decoration: none; flex-shrink: 0; transition: background .2s; }
        .ow-hdr-cta:hover { background: var(--gold); }

        /* ── SHARED SECTION CHROME ── */
        .ow-sec { padding: 72px 4vw; }
        .ow-sec-white  { background: var(--white); }
        .ow-sec-cream  { background: var(--cream); }
        .ow-sec-dark   { background: var(--dark); }
        .ow-eyebrow { display: inline-flex; align-items: center; gap: 9px; font-size: .58rem; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 12px; }
        .ow-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--gold); display: block; }
        .ow-eyebrow-sm { font-size: .54rem; letter-spacing: .18em; text-transform: uppercase; color: var(--gold); font-weight: 600; }
        .ow-h2 { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: clamp(1.5rem,2.6vw,2.5rem); font-weight: 700; color: var(--dark); line-height: 1.18; margin-bottom: 10px; }
        .ow-h2-white { color: var(--white); }
        .ow-lead { font-size: .88rem; line-height: 1.82; color: var(--muted); max-width: 640px; font-weight: 300; margin-bottom: 36px; }
        .ow-center { text-align: center; }
        .ow-center .ow-lead { margin-left: auto; margin-right: auto; }

        /* ── BUTTONS ── */
        .ow-btn-pri { display: inline-flex; align-items: center; gap: 9px; background: var(--dark); color: var(--white); font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 14px 26px; text-decoration: none; border: 2px solid var(--dark); transition: transform .2s, box-shadow .2s; white-space: nowrap; }
        .ow-btn-pri:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,20,16,.2); }
        .ow-btn-pri-gold { background: var(--gold); border-color: var(--gold); }
        .ow-btn-pri-gold:hover { box-shadow: 0 8px 24px rgba(184,147,90,.35); }
        .ow-btn-sec { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--dark); font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; padding: 14px 26px; text-decoration: none; border: 2px solid var(--dark); transition: background .2s, color .2s; white-space: nowrap; }
        .ow-btn-sec:hover { background: var(--dark); color: var(--white); }
        .ow-btn-sec-white { color: var(--white); border-color: rgba(255,255,255,.35); }
        .ow-btn-sec-white:hover { background: rgba(255,255,255,.1); color: var(--white); }
        .ow-sec-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }

        /* ── HERO ── */
        .ow-hero { display: flex; min-height: 88vh; background: var(--cream); overflow: hidden; position: relative; }
        .ow-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 70% at 28% 55%, rgba(184,147,90,.07) 0%, transparent 70%); pointer-events: none; z-index: 1; }
        .ow-hero-text { flex: 1.1; display: flex; flex-direction: column; justify-content: center; padding: 72px 40px 72px 5vw; z-index: 2; }
        .ow-hero-img  { flex: 1; position: relative; overflow: hidden; min-height: 88vh; }
        .ow-hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .ow-hero-img-fade { position: absolute; inset: 0; background: linear-gradient(to right, var(--cream) 0%, transparent 18%); }
        .ow-hero-tag  { display: inline-flex; align-items: center; gap: 9px; font-size: .58rem; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 18px; }
        .ow-hero-tag::before { content: ''; width: 24px; height: 1px; background: var(--gold); }
        .ow-hero-h1   { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: clamp(1.8rem,3.1vw,3.3rem); font-weight: 700; line-height: 1.1; color: var(--dark); margin-bottom: 10px; }
        .ow-hero-h1 em { font-style: italic; color: var(--gold); }
        .ow-hero-sub  { font-family: 'Cormorant Garamond','Playfair Display',serif; font-size: clamp(1rem,1.4vw,1.45rem); font-style: italic; color: var(--muted); margin-bottom: 16px; line-height: 1.4; font-weight: 400; }
        .ow-hero-desc { font-size: .85rem; line-height: 1.82; color: var(--muted); max-width: 440px; margin-bottom: 20px; font-weight: 300; }
        .ow-hero-trust { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        .ow-hero-trust-item { display: flex; align-items: center; gap: 8px; font-size: .76rem; color: var(--text); font-weight: 400; }
        .ow-hero-trust-item .ow-check { color: var(--gold); font-size: .8rem; }
        .ow-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
        .ow-hero-note { font-size: .68rem; color: rgba(184,147,90,.8); display: flex; align-items: center; gap: 5px; }
        .ow-hero-note::before { content: '⚑'; }

        /* ── TRUST STRIP ── */
        .ow-trust-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--border); }
        .ow-trust-item { background: var(--white); padding: 26px 20px; display: flex; align-items: flex-start; gap: 13px; }
        .ow-trust-icon { width: 36px; height: 36px; border-radius: 50%; background: var(--gold-pale); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: .9rem; color: var(--gold); }
        .ow-trust-label { font-size: .52rem; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 4px; }
        .ow-trust-title { font-family: 'Cormorant Garamond',serif; font-size: 1rem; font-weight: 700; color: var(--dark); margin-bottom: 3px; }
        .ow-trust-desc  { font-size: .76rem; color: var(--muted); line-height: 1.6; font-weight: 300; }

        /* ── SERVICES ── */
        .ow-services-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .ow-service-card  { background: var(--white); border: 1px solid var(--border); padding: 28px 20px; transition: transform .2s, box-shadow .2s; }
        .ow-service-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(28,20,16,.1); }
        .ow-service-num   { font-family: 'Cormorant Garamond',serif; font-size: 2.8rem; font-weight: 700; color: var(--gold-pale); line-height: 1; margin-bottom: 10px; }
        .ow-service-title { font-family: 'Cormorant Garamond',serif; font-size: 1.1rem; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
        .ow-service-desc  { font-size: .76rem; color: var(--muted); line-height: 1.62; font-weight: 300; }

        /* ── PRODUCT SECTIONS ── */
        .ow-prod-layout { display: grid; grid-template-columns: 1fr; gap: 32px; }
        .ow-prod-header { display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-start; justify-content: space-between; margin-bottom: 32px; }
        .ow-prod-header-text { flex: 1; min-width: 260px; }
        .ow-prod-header-aside { display: flex; flex-direction: column; justify-content: flex-end; }

        /* ── GALLERY ── */
        .ow-gallery-grid { display: grid; grid-template-columns: repeat(var(--cols, 4), 1fr); gap: 14px; }
        .ow-gallery-card { overflow: hidden; border-radius: 20px; background: rgba(255,255,255,.82); padding: 8px; box-shadow: 0 4px 18px rgba(28,20,16,.09); cursor: pointer; border: none; transition: transform .3s, box-shadow .3s; display: block; width: 100%; text-align: left; appearance: none; }
        .ow-gallery-card:hover { transform: translateY(-5px); box-shadow: 0 12px 32px rgba(28,20,16,.16); }
        .ow-gallery-card-inner { border-radius: 14px; overflow: hidden; background: var(--gold-pale); aspect-ratio: 4/5; }
        .ow-gallery-card-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .ow-gallery-card:hover .ow-gallery-card-inner img { transform: scale(1.05); }

        /* ── HIGHLIGHTS ── */
        .ow-highlights { list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
        .ow-highlight-item { display: flex; align-items: center; gap: 9px; font-size: .8rem; color: var(--text); font-weight: 400; }
        .ow-check { color: var(--gold); font-size: .76rem; flex-shrink: 0; }

        /* ── WHY ── */
        .ow-why-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; max-width: 1100px; margin: 0 auto; }
        .ow-why-list  { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
        .ow-why-item  { display: flex; align-items: flex-start; gap: 12px; padding: 16px 18px; background: var(--white); border: 1px solid var(--border); transition: border-color .2s; }
        .ow-why-item:hover { border-color: rgba(184,147,90,.4); }
        .ow-why-item-icon { width: 32px; height: 32px; border-radius: 50%; background: var(--gold-pale); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: .8rem; color: var(--gold); }
        .ow-why-item-text { font-size: .82rem; color: var(--text); line-height: 1.58; }
        .ow-why-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .ow-why-img-card { border-radius: 16px; overflow: hidden; background: var(--gold-pale); padding: 7px; box-shadow: 0 4px 16px rgba(28,20,16,.08); transition: transform .3s; }
        .ow-why-img-card:hover { transform: translateY(-4px); }
        .ow-why-img-inner { border-radius: 11px; overflow: hidden; aspect-ratio: 3/4; }
        .ow-why-img-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .ow-why-img-card:hover .ow-why-img-inner img { transform: scale(1.04); }

        /* ── SOCIAL PROOF ── */
        .ow-google-card { background: var(--white); border-radius: 28px; padding: 24px 40px; max-width: 860px; margin: 0 auto 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; box-shadow: 0 10px 36px rgba(0,0,0,.04); border: 1px solid rgba(0,0,0,.03); }
        .ow-google-div  { width: 1px; height: 46px; background: #eee; flex-shrink: 0; }
        .ow-big-num     { font-size: 3.8rem; font-weight: 700; color: var(--dark); line-height: 1; font-family: 'Jost',sans-serif; }
        .ow-stars-row   { color: #FFB400; font-size: 1.5rem; letter-spacing: 2px; }
        .ow-source-lbl  { font-size: 1rem; font-weight: 600; color: #444; }
        .ow-sub-row     { font-size: .9rem; color: var(--muted); }
        .ow-pill-btn    { border: 1px solid var(--gold); border-radius: 100px; padding: 12px 26px; color: var(--gold); font-size: .7rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; }
        .ow-pill-btn:hover { background: var(--gold); color: var(--white); }
        .ow-black-badge { background: #251D18; border-radius: 18px; padding: 22px 40px; max-width: 620px; margin: 0 auto; display: flex; align-items: center; gap: 28px; text-align: left; position: relative; }
        .ow-black-badge::after { content: ""; position: absolute; bottom: 0; left: 12%; right: 45%; height: 4px; background: #A88A64; border-radius: 10px 10px 0 0; }
        .ow-badge-stars { color: #A88A64; font-size: 1.3rem; letter-spacing: 4px; margin-bottom: 10px; line-height: 1; }
        .ow-badge-h3    { color: #A88A64; font-size: 1rem; font-weight: 700; letter-spacing: .05em; margin: 0 0 5px; text-transform: uppercase; }
        .ow-badge-p     { color: #9C9C9C; font-size: .92rem; margin: 0; font-weight: 300; }
        .ow-badge-div   { width: 1px; height: 56px; background: rgba(168,138,100,.2); }

        /* ── CAROUSEL ── */
        .ow-carousel { max-width: 1100px; margin: 0 auto; }
        .ow-carousel-track { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ow-review-card   { background: var(--cream); border: 1px solid rgba(184,147,90,.14); border-radius: 14px; padding: 24px 20px; }
        .ow-review-stars  { color: #FFC107; letter-spacing: 3px; font-size: .88rem; margin-bottom: 10px; }
        .ow-review-text   { font-size: .82rem; line-height: 1.72; color: var(--text); font-weight: 300; margin-bottom: 14px; font-style: italic; }
        .ow-review-name   { font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--dark); }
        .ow-carousel-nav  { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 28px; }
        .ow-nav-btn       { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--border); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--muted); transition: all .2s; }
        .ow-nav-btn:hover:not(:disabled) { border-color: var(--gold); color: var(--gold); }
        .ow-nav-btn:disabled { opacity: .35; cursor: default; }
        .ow-dots { display: flex; gap: 7px; }
        .ow-dot  { width: 7px; height: 7px; border-radius: 50%; border: none; background: var(--border); cursor: pointer; transition: background .2s; padding: 0; }
        .ow-dot.active { background: var(--gold); }

        /* ── PROCESS ── */
        .ow-process-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 36px; }
        .ow-process-card { background: var(--white); border: 1px solid var(--border); padding: 26px 18px; position: relative; overflow: hidden; }
        .ow-process-card::before { content: attr(data-n); position: absolute; top: -14px; right: 10px; font-family: 'Cormorant Garamond',serif; font-size: 5rem; font-weight: 700; color: rgba(184,147,90,.09); pointer-events: none; line-height: 1; }
        .ow-process-n    { font-size: .58rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; display: block; }
        .ow-process-title { font-family: 'Cormorant Garamond',serif; font-size: 1rem; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
        .ow-process-desc  { font-size: .76rem; color: var(--muted); line-height: 1.66; font-weight: 300; }

        /* ── FAQ ── */
        .ow-faq-wrap  { max-width: 760px; margin: 36px auto 0; display: flex; flex-direction: column; gap: 8px; }
        .ow-faq-item  { border: 1px solid var(--border); background: var(--white); }
        .ow-faq-item.open { border-color: rgba(184,147,90,.35); }
        .ow-faq-q     { width: 100%; background: none; border: none; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; cursor: pointer; font-size: .84rem; font-weight: 600; color: var(--dark); text-align: left; font-family: 'Jost','Poppins',sans-serif; }
        .ow-faq-a     { padding: 0 20px 18px; font-size: .8rem; color: var(--muted); line-height: 1.72; font-weight: 300; }

        /* ── FINAL CTA ── */
        .ow-cta-box { background: var(--dark); padding: 64px 48px; text-align: center; position: relative; overflow: hidden; max-width: 960px; margin: 0 auto; }
        .ow-cta-box::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 70% 55% at 50% 100%, rgba(184,147,90,.12) 0%, transparent 70%); }
        .ow-cta-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: .58rem; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 16px; }
        .ow-cta-eyebrow::before, .ow-cta-eyebrow::after { content: ''; width: 18px; height: 1px; background: var(--gold); display: block; }
        .ow-cta-h   { font-family: 'Cormorant Garamond',serif; font-size: clamp(1.6rem,2.8vw,2.6rem); font-weight: 700; color: var(--white); margin-bottom: 12px; line-height: 1.2; }
        .ow-cta-sub { font-size: .88rem; line-height: 1.72; color: rgba(255,255,255,.68); max-width: 520px; margin: 0 auto 20px; font-weight: 300; }
        .ow-cta-trust { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; margin-bottom: 28px; }
        .ow-cta-tp  { display: inline-flex; align-items: center; gap: 6px; font-size: .68rem; color: rgba(255,255,255,.55); font-weight: 500; }
        .ow-cta-tp::before { content: '✔'; color: var(--gold); font-size: .62rem; }
        .ow-cta-note { font-size: .7rem; color: rgba(255,255,255,.36); margin-top: 14px; font-style: italic; }
        .ow-cta-btns { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; position: relative; z-index: 1; }

        /* ── FOOTER ── */
        .ow-footer { background: var(--dark); border-top: 1px solid rgba(184,147,90,.18); padding: 40px 4vw 22px; }
        .ow-footer-inner { max-width: 1100px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 32px 56px; align-items: flex-start; }
        .ow-footer-brand { flex: 1.3; min-width: 200px; }
        .ow-footer-name  { font-family: 'Cormorant Garamond',serif; font-size: 1.25rem; font-weight: 700; color: var(--white); margin-bottom: 2px; }
        .ow-footer-tag   { font-size: .48rem; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 10px; display: block; }
        .ow-footer-desc  { font-size: .74rem; line-height: 1.7; color: rgba(255,255,255,.4); font-weight: 300; max-width: 300px; }
        .ow-footer-seo   { font-size: .68rem; line-height: 1.68; color: rgba(255,255,255,.22); font-weight: 300; max-width: 340px; margin-top: 10px; }
        .ow-footer-div   { width: 1px; align-self: stretch; background: rgba(184,147,90,.14); flex-shrink: 0; }
        .ow-footer-contact { flex: 1; min-width: 200px; }
        .ow-footer-contact-title { font-size: .52rem; letter-spacing: .18em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 14px; display: block; }
        .ow-footer-contact-list  { display: flex; flex-direction: column; gap: 10px; }
        .ow-footer-contact-item  { display: flex; align-items: flex-start; gap: 8px; font-size: .74rem; color: rgba(255,255,255,.5); line-height: 1.44; text-decoration: none; transition: color .2s; }
        .ow-footer-contact-item:hover { color: var(--gold); }
        .ow-footer-icon  { color: var(--gold); flex-shrink: 0; margin-top: 2px; }
        .ow-footer-map   { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: .56rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); text-decoration: none; border: 1px solid rgba(184,147,90,.3); padding: 6px 12px; transition: background .2s; }
        .ow-footer-map:hover { background: rgba(184,147,90,.1); }
        .ow-footer-bottom { max-width: 1100px; margin: 22px auto 0; padding-top: 16px; border-top: 1px solid rgba(255,255,255,.06); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .ow-footer-copy  { font-size: .62rem; color: rgba(255,255,255,.2); }
        .ow-footer-seo-b { font-size: .58rem; color: rgba(255,255,255,.14); text-align: right; }

        /* ── FLOATING ── */
        .ow-float-call { position: fixed; bottom: 98px; right: 20px; z-index: 200; }
        .ow-float-call a { display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; background: #000; color: #fff; box-shadow: 0 6px 24px rgba(0,0,0,.4); text-decoration: none; transition: background .2s; }
        .ow-float-call a:hover { background: var(--gold); }
        .ow-float-wa  { position: fixed; bottom: 26px; right: 20px; z-index: 200; }
        .ow-float-wa a { display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; background: #25D366; color: var(--white); box-shadow: 0 6px 24px rgba(37,211,102,.45); position: relative; text-decoration: none; }
        .ow-float-wa a::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #25D366; opacity: .5; animation: ring 2s infinite; }
        @keyframes ring { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.75);opacity:0} }

        /* ── MODAL ── */
        .ow-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,.88); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 16px; }
        .ow-modal   { background: #FAF8F5; border-radius: 18px; max-width: 860px; width: 100%; max-height: 92vh; overflow-y: auto; position: relative; }
        .ow-modal-close { position: absolute; top: 12px; right: 12px; width: 38px; height: 38px; border-radius: 50%; background: var(--white); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: var(--dark); z-index: 10; }
        .ow-modal-img   { width: 100%; background: #000; display: flex; justify-content: center; }
        .ow-modal-img img { width: 100%; height: auto; max-height: 65vh; object-fit: contain; }
        .ow-modal-body  { padding: 20px 24px; text-align: center; }
        .ow-modal-title { font-family: 'Cormorant Garamond',serif; font-size: 1.5rem; font-weight: 700; color: var(--dark); margin: 6px 0 18px; }
        .ow-modal-closebtn { padding: 12px 34px; background: var(--dark); color: var(--white); border: none; border-radius: 100px; font-size: .72rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; cursor: pointer; }

        /* ── DIVIDER ── */
        .ow-divider { height: 1px; background: var(--border); margin: 0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .ow-process-grid  { grid-template-columns: repeat(3, 1fr); }
          .ow-services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 1024px) {
          .ow-trust-grid  { grid-template-columns: repeat(2, 1fr); }
          .ow-gallery-grid { --cols: 2 !important; }
          .ow-why-inner   { grid-template-columns: 1fr; gap: 36px; }
          .ow-footer-div  { display: none; }
          .ow-carousel-track { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ow-hdr { height: 60px; padding: 0 16px; }
          .ow-hdr-logo { height: 38px; }
          .ow-hdr-name { font-size: 1.2rem; }
          .ow-hdr-badge { display: none; }
          .ow-hdr-cta { font-size: .5rem; padding: 9px 11px; }
          .ow-hero { flex-direction: column; min-height: auto; }
          .ow-hero-img { order: 1; height: 58vw; min-height: 220px; min-height: auto; }
          .ow-hero-img-fade { background: linear-gradient(to bottom, transparent 50%, var(--cream) 100%); }
          .ow-hero-text { order: 2; padding: 28px 16px 44px; }
          .ow-hero-btns { flex-direction: column; }
          .ow-btn-pri, .ow-btn-sec { width: 100%; justify-content: center; padding: 13px 18px; font-size: .64rem; }
          .ow-sec { padding: 48px 16px; }
          .ow-trust-grid  { grid-template-columns: 1fr; }
          .ow-services-grid { grid-template-columns: 1fr; }
          .ow-gallery-grid { --cols: 2 !important; gap: 8px; }
          .ow-why-right { grid-template-columns: repeat(2, 1fr); }
          .ow-process-grid { grid-template-columns: 1fr; }
          .ow-google-card { flex-direction: column; padding: 22px 18px; border-radius: 20px; text-align: center; gap: 14px; }
          .ow-google-div  { display: none; }
          .ow-pill-btn    { width: 100%; justify-content: center; }
          .ow-black-badge { flex-direction: column; text-align: center; padding: 22px 18px; gap: 16px; border-radius: 16px; max-width: 100%; }
          .ow-badge-div   { display: none; }
          .ow-carousel-track { grid-template-columns: 1fr; }
          .ow-cta-box     { padding: 40px 18px; }
          .ow-cta-btns    { flex-direction: column; }
          .ow-footer-inner { flex-direction: column; gap: 22px; }
          .ow-footer-bottom { flex-direction: column; gap: 6px; }
          .ow-sec-cta-row { flex-direction: column; }
          .ow-float-call { bottom: 90px; right: 14px; }
          .ow-float-call a, .ow-float-wa a { width: 50px; height: 50px; }
          .ow-float-wa { bottom: 20px; right: 14px; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header className="ow-hdr">
        <a className="ow-hdr-brand" href="/">
          <img src="/videos/Revisedlogo.webp" alt="Shrusara Logo" className="ow-hdr-logo" />
          <div>
            <div className="ow-hdr-name">Shrusara</div>
            <div className="ow-hdr-sub">FASHION&nbsp;&nbsp;BOUTIQUE</div>
          </div>
        </a>
        <div className="ow-hdr-badge">
          <span className="ow-hdr-dot" />
          Bangalore's Premium Designer Boutique
        </div>
        <a href={waLink('hero')} target="_blank" rel="noopener noreferrer"
          className="ow-hdr-cta" onClick={() => trackWhatsApp('header')}>
          <WaIcon size={13} /> Book Consultation
        </a>
      </header>

      {/* ── SECTION 1: HERO ── */}
      <section className="ow-hero">
        <div className="ow-hero-text">
          <p className="ow-hero-tag">Bangalore's Premium Designer Boutique</p>
          <h1 className="ow-hero-h1">Premium Customized<br /><em>Occasion Wear</em> in Bangalore</h1>
          <p className="ow-hero-sub">Designer gowns, Indo-Western outfits, designer blouses, half sarees and matching sets customized exclusively for your style, measurements and special occasions.</p>
          <p className="ow-hero-desc">At Shrusara Fashion Boutique, every outfit is designed from scratch to suit your body type, comfort and personal style. From elegant designer gowns to statement blouses and occasion wear, our focus is on creating outfits that feel uniquely yours.</p>
          <div className="ow-hero-trust">
            {['Designed personally by Chief Designer Shruthi Ajith', 'Customized to your measurements and preferences', 'Premium craftsmanship and finishing', 'Trusted by clients across Bangalore'].map((t, i) => (
              <span key={i} className="ow-hero-trust-item"><span className="ow-check">✔</span>{t}</span>
            ))}
          </div>
          <div className="ow-hero-btns">
            <a href={waLink('hero')} target="_blank" rel="noopener noreferrer"
              className="ow-btn-pri" onClick={() => trackWhatsApp('hero')}>
              <WaIcon size={16} /> Discuss Your Design
            </a>
            <a href={`tel:${PHONE_NUMBER}`} className="ow-btn-sec" onClick={() => trackPhoneCall('hero')}>
              <PhoneIcon size={14} /> Call Now
            </a>
          </div>
          <p className="ow-hero-note">Limited designer consultation slots available this week.</p>
        </div>
        <div className="ow-hero-img">
          <img src="/videos/desingerhero.webp" alt="Premium customized occasion wear by Shrusara Fashion Boutique Bangalore" />
          <div className="ow-hero-img-fade" />
        </div>
      </section>

      {/* ── SECTION 2: TRUST STRIP ── */}
      <section className="ow-sec ow-sec-white" style={{ padding: '0 4vw 56px' }}>
        <div style={{ padding: '48px 0 28px', textAlign: 'center' }}>
          <h2 className="ow-h2">Outfits Designed Around Your Style, Occasion and Comfort</h2>
          <p className="ow-lead" style={{ margin: '8px auto 0' }}>Every woman deserves an outfit that feels personal. At Shrusara Fashion Boutique, we create customized occasion wear tailored to your body type, event requirements and styling preferences.</p>
        </div>
        <div className="ow-trust-grid">
          {[
            { icon: '◈', label: 'Designed For You',    title: 'Made For Your Body',      desc: 'Every outfit is customized according to your measurements, body type and styling preferences.' },
            { icon: '✦', label: 'Modern Meets Elegant', title: 'Modern Meets Elegant',    desc: 'Contemporary silhouettes blended beautifully with timeless craftsmanship.' },
            { icon: '◷', label: 'Precision Fit',        title: 'Precision Fit',            desc: 'Made-to-measure tailoring ensures comfort, confidence and perfect fitting.' },
            { icon: '★', label: 'Premium Finishing',    title: 'Premium Finishing',        desc: 'Attention to detail, quality fabrics and refined finishing in every creation.' },
          ].map(item => (
            <div key={item.title} className="ow-trust-item">
              <div className="ow-trust-icon">{item.icon}</div>
              <div>
                <p className="ow-trust-label">{item.label}</p>
                <p className="ow-trust-title">{item.title}</p>
                <p className="ow-trust-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="ow-divider" />

      {/* ── SECTION 3: SERVICES ── */}
      <section className="ow-sec ow-sec-cream">
        <p className="ow-eyebrow">Our Services</p>
        <h2 className="ow-h2">Customized Occasion Wear Services in Bangalore</h2>
        <p className="ow-lead">We specialize in designing customized occasion wear for modern women who value style, comfort and individuality. Every outfit is tailored to suit your event, preferences and personality.</p>
        <div className="ow-services-grid">
          {[
            { n: '01', title: 'Designer Gowns & Indo-Western Wear',   desc: 'Customized designer gowns and indo-western outfits crafted for receptions, parties, festive celebrations and special occasions with premium fabrics and elegant finishing.' },
            { n: '02', title: 'Designer Blouses',                      desc: 'Customized designer blouses with premium embroidery, unique necklines, statement sleeves and modern detailing tailored to complement your saree beautifully.' },
            { n: '03', title: 'Crop Tops, Lehenga Sets & Half Sarees', desc: 'Stylish crop tops, lehenga sets and half sarees customized for engagements, festive celebrations, cultural events and family functions.' },
            { n: '04', title: 'Mother & Daughter Matching Sets',        desc: 'Beautiful matching outfits for mothers and daughters, individually tailored while maintaining a coordinated and elegant look for every special occasion.' },
          ].map(s => (
            <div key={s.title} className="ow-service-card">
              <div className="ow-service-num">{s.n}</div>
              <h3 className="ow-service-title">{s.title}</h3>
              <p className="ow-service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="ow-divider" />

      {/* ── SECTION 4: GOWNS & INDO-WESTERN ── */}
      <section className="ow-sec ow-sec-white">
        <div className="ow-prod-header">
          <div className="ow-prod-header-text">
            <p className="ow-eyebrow">Section 01</p>
            <h2 className="ow-h2">Designer Gowns &amp; Indo-Western Wear in Bangalore</h2>
            <p className="ow-lead" style={{ marginBottom: 0 }}>Customized designer gowns and Indo-Western outfits created for receptions, engagements, parties, festive celebrations and special occasions. Every outfit is designed with personalized styling, premium fabrics and elegant finishing to ensure a distinctive look.</p>
          </div>
          <div className="ow-prod-header-aside">
            <SectionHighlights points={['Personalized Design Consultation', 'Premium Fabrics', 'Elegant Silhouettes', 'Contemporary Styling', 'Made-to-Measure Fit']} />
          </div>
        </div>
        <GalleryGrid images={gownImages} waKey="gowns" waLabel="Discuss Your Design" columns={4} />
      </section>

      <div className="ow-divider" />

      {/* ── SECTION 5: BLOUSES ── */}
      <section className="ow-sec ow-sec-cream">
        <div className="ow-prod-header">
          <div className="ow-prod-header-text">
            <p className="ow-eyebrow">Section 02</p>
            <h2 className="ow-h2">Designer Blouses in Bangalore</h2>
            <p className="ow-lead" style={{ marginBottom: 0 }}>Our customized designer blouses are crafted with premium embroidery, unique necklines, statement sleeves and modern detailing. Whether you need a blouse for a reception, festive celebration, family function or special occasion, every piece is tailored to complement your saree beautifully.</p>
          </div>
          <div className="ow-prod-header-aside">
            <SectionHighlights points={['Designer Necklines', 'Statement Sleeves', 'Premium Embroidery', 'Personalized Styling', 'Custom Measurements']} />
          </div>
        </div>
        <GalleryGrid images={blouseImages} waKey="blouses" waLabel="Share Your Reference Image" columns={4} />
      </section>

      <div className="ow-divider" />

      {/* ── SECTION 6: LEHENGA & HALF SAREES ── */}
      <section className="ow-sec ow-sec-white">
        <div className="ow-prod-header">
          <div className="ow-prod-header-text">
            <p className="ow-eyebrow">Section 03</p>
            <h2 className="ow-h2">Crop Tops, Lehenga Sets &amp; Half Sarees in Bangalore</h2>
            <p className="ow-lead" style={{ marginBottom: 0 }}>Stylish crop tops, lehenga sets and half sarees customized for engagements, festive celebrations, cultural events and family functions. Each design is crafted with attention to comfort, fit and modern elegance.</p>
          </div>
          <div className="ow-prod-header-aside">
            <SectionHighlights points={['Customized Styling', 'Elegant Finishing', 'Premium Fabrics', 'Personalized Measurements', 'Contemporary Designs']} />
          </div>
        </div>
        <GalleryGrid images={lehengaImages} waKey="lehenga" waLabel="Book Consultation" columns={4} />
      </section>

      <div className="ow-divider" />

      {/* ── SECTION 7: MOTHER & DAUGHTER ── */}
      <section className="ow-sec ow-sec-cream">
        <div className="ow-prod-header">
          <div className="ow-prod-header-text">
            <p className="ow-eyebrow">Section 04</p>
            <h2 className="ow-h2">Mother &amp; Daughter Matching Outfits in Bangalore</h2>
            <p className="ow-lead" style={{ marginBottom: 0 }}>Create beautiful memories with customized mother and daughter matching outfits designed for weddings, birthdays, celebrations and family occasions. Every outfit is tailored individually while maintaining a coordinated and elegant look.</p>
          </div>
          <div className="ow-prod-header-aside">
            <SectionHighlights points={['Coordinated Styling', 'Custom Measurements', 'Premium Fabrics', 'Elegant Finishing', 'Personalized Designs']} />
          </div>
        </div>
        <GalleryGrid images={motherDaughterImages} waKey="motherDaughter" waLabel="Discuss Matching Designs" columns={3} />
      </section>

      <div className="ow-divider" />

      {/* ── SECTION 8: WHY ── */}
      <section className="ow-sec ow-sec-white">
        <div className="ow-why-inner">
          <div>
            <p className="ow-eyebrow">Why Us</p>
            <h2 className="ow-h2">Why Women Across Bangalore Choose Shrusara</h2>
            <p className="ow-lead" style={{ marginBottom: 0 }}>We don't simply stitch outfits. We create customized designer wear that reflects your personality, occasion and style preferences while ensuring exceptional comfort and premium finishing.</p>
            <div className="ow-why-list">
              {[
                { icon: '✦', text: 'Personalized consultation with Chief Designer Shruthi Ajith' },
                { icon: '◈', text: 'Fully customized design approach' },
                { icon: '◷', text: 'Expertise in modern and ethnic occasion wear' },
                { icon: '★', text: 'Precision fitting and trial support' },
                { icon: '✒', text: 'Premium fabrics and craftsmanship' },
                { icon: '◉', text: 'Attention to detail in every outfit' },
                { icon: '✿', text: 'Timely completion and delivery' },
                { icon: '◆', text: 'Trusted by women across Bangalore' },
              ].map((pt, i) => (
                <div key={i} className="ow-why-item">
                  <div className="ow-why-item-icon">{pt.icon}</div>
                  <p className="ow-why-item-text">{pt.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ow-why-right">
            {[
              { src: '/designer/designer gown/designer-party-wear-designer-evening-gown-shrusara.webp',     alt: 'Designer gown Bangalore' },
              { src: '/designer/Indowestern/indo-western-fusion-bridal-wear-bangalore-shrusara.webp',        alt: 'Indo-western designer outfit' },
              { src: '/videos/designer-croptop-lehenga-bangalore-shruthi-shrusara.webp',                    alt: 'Crop top lehenga set' },
              { src: '/designer/designer gown/premium-designer-ball-gown-for-engagement-bangalore.webp',    alt: 'Custom reception gown' },
            ].map((img, i) => (
              <div key={i} className="ow-why-img-card">
                <div className="ow-why-img-inner">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ow-divider" />

      {/* ── SECTION 9: SOCIAL PROOF ── */}
      <section className="ow-sec ow-sec-cream ow-center">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ width: 40, height: 1, background: 'var(--gold)', opacity: .6 }} />
          <span style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--gold)' }}>Top Rated Designer Boutique in Bangalore</span>
          <div style={{ width: 40, height: 1, background: 'var(--gold)', opacity: .6 }} />
        </div>
        <h2 className="ow-h2">Trusted by Clients Across Bangalore</h2>
        <p className="ow-lead">Real experiences from women who trusted Shrusara Fashion Boutique for their customized designer outfits and occasion wear.</p>
        <div className="ow-google-card">
          <GoogleIcon size={42} />
          <div className="ow-google-div" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' }}>
            <span className="ow-big-num">4.9</span>
            <div>
              <div className="ow-stars-row">★★★★★</div>
              <div className="ow-source-lbl">Google Reviews</div>
            </div>
          </div>
          <div className="ow-google-div" />
          <div className="ow-sub-row">Based on <strong style={{ color: 'var(--dark)', fontWeight: 700 }}>250+</strong> verified reviews on Google</div>
          <div className="ow-google-div" />
          <a href="https://www.google.com/search?q=Shrusara+Fashion+Boutique+Bangalore" target="_blank" rel="noopener noreferrer" className="ow-pill-btn">
            VIEW ON GOOGLE <span style={{ fontSize: '1.1rem' }}>→</span>
          </a>
        </div>
        <div className="ow-black-badge">
          <div style={{ color: '#A88A64', flexShrink: 0 }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </div>
          <div className="ow-badge-div" />
          <div>
            <div className="ow-badge-stars">★★★★★</div>
            <h3 className="ow-badge-h3">250+ HAPPY CLIENTS IN BANGALORE</h3>
            <p className="ow-badge-p">Loved by clients. Chosen for style.</p>
          </div>
        </div>

        <div style={{ marginTop: 52 }}>
          <p className="ow-eyebrow" style={{ justifyContent: 'center' }}>What Our Clients Say</p>
          <h2 className="ow-h2" style={{ marginBottom: 10 }}>Real Reviews from Real Clients</h2>
          <p className="ow-lead" style={{ marginBottom: 36 }}>Personal styling experiences from women who chose Shrusara for their special occasions.</p>
          <ReviewsCarousel />
        </div>
      </section>

      <div className="ow-divider" />

      {/* ── SECTION 10: PROCESS ── */}
      <section className="ow-sec ow-sec-white">
        <p className="ow-eyebrow">How It Works</p>
        <h2 className="ow-h2">Our Custom Design Process</h2>
        <p className="ow-lead">A simple, guided process from your first consultation to the final delivery of your perfect outfit.</p>
        <div className="ow-process-grid">
          {processSteps.map(s => (
            <div key={s.n} className="ow-process-card" data-n={s.n}>
              <span className="ow-process-n">Step {s.n}</span>
              <h3 className="ow-process-title">{s.title}</h3>
              <p className="ow-process-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="ow-divider" />

      {/* ── SECTION 11: FAQs ── */}
      <section className="ow-sec ow-sec-cream ow-center">
        <p className="ow-eyebrow" style={{ justifyContent: 'center' }}>FAQs</p>
        <h2 className="ow-h2">Frequently Asked Questions</h2>
        <p className="ow-lead">Everything you need to know about our customization process and services.</p>
        <div className="ow-faq-wrap">
          {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      <div className="ow-divider" />

      {/* ── FINAL CTA ── */}
      <section className="ow-sec ow-sec-white">
        <div className="ow-cta-box">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <p className="ow-cta-eyebrow">Designer Consultation</p>
          </div>
          <h2 className="ow-cta-h">Book Your Occasion Wear Consultation Today</h2>
          <p className="ow-cta-sub">Tell us about your occasion, preferred style and design ideas. Chief Designer Shruthi Ajith will personally guide you in creating a customized outfit tailored to your measurements, comfort and vision.</p>
          <div className="ow-cta-trust">
            {['Personalized Styling Support', 'Premium Customization', 'Limited Consultation Slots Available'].map(t => (
              <span key={t} className="ow-cta-tp">{t}</span>
            ))}
          </div>
          <div className="ow-cta-btns">
            <a href={waLink('finalCta')} target="_blank" rel="noopener noreferrer"
              className="ow-btn-pri ow-btn-pri-gold" onClick={() => trackWhatsApp('final_cta')}>
              <WaIcon size={18} /> Book Free Studio Consultation via WhatsApp
            </a>
            <a href={`tel:${PHONE_NUMBER}`} className="ow-btn-sec ow-btn-sec-white" onClick={() => trackPhoneCall('final_cta')}>
              <PhoneIcon size={14} /> Call Now
            </a>
          </div>
          <p className="ow-cta-note">Your WhatsApp enquiry will be pre-filled for faster assistance.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ow-footer">
        <div className="ow-footer-inner">
          <div className="ow-footer-brand">
            <p className="ow-footer-name">Shrusara Fashion Boutique</p>
            <span className="ow-footer-tag">Designer Boutique · Bangalore</span>
            <p className="ow-footer-desc">Customized occasion wear, designer gowns, blouses, lehenga sets and matching outfits tailored for premium fit and modern styling.</p>
            <p className="ow-footer-seo">Shrusara Fashion Boutique is a premium designer boutique in Bangalore specializing in customized occasion wear, designer gowns, Indo-Western outfits, designer blouses, crop tops, lehenga sets, half sarees and mother-daughter matching outfits. Every outfit is tailored through personalized consultation, premium craftsmanship and made-to-measure fitting.</p>
          </div>
          <div className="ow-footer-div" />
          <div className="ow-footer-contact">
            <span className="ow-footer-contact-title">Contact Us</span>
            <div className="ow-footer-contact-list">
              <span className="ow-footer-contact-item">
                <span className="ow-footer-icon"><MapPinIcon size={13} /></span>
                106, 6th Main Road, Mahalakshmipuram, Bangalore – 560086
              </span>
              <a href={`tel:${PHONE_NUMBER}`} className="ow-footer-contact-item" onClick={() => trackPhoneCall('footer')}>
                <span className="ow-footer-icon"><PhoneIcon size={13} /></span>{PHONE_NUMBER}
              </a>
              <a href="mailto:help@shrusara.com" className="ow-footer-contact-item">
                <span className="ow-footer-icon"><MailIcon size={13} /></span>help@shrusara.com
              </a>
              <a href={waLink('hero')} target="_blank" rel="noopener noreferrer" className="ow-footer-contact-item" onClick={() => trackWhatsApp('footer')}>
                <span className="ow-footer-icon"><WaIcon size={13} /></span>WhatsApp Us
              </a>
            </div>
            <a href="https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore" target="_blank" rel="noopener noreferrer" className="ow-footer-map">
              <MapPinIcon size={11} /> View on Google Maps
            </a>
          </div>
        </div>
        <div className="ow-footer-bottom">
          <p className="ow-footer-copy">© {new Date().getFullYear()} Shrusara Fashion Boutique. All rights reserved.</p>
          <p className="ow-footer-seo-b">Premium Designer Boutique in Bangalore · Customized Occasion Wear · Designer Gowns · Blouses · Lehenga Sets</p>
        </div>
      </footer>

      {/* ── FLOATING BUTTONS ── */}
      <div className="ow-float-call">
        <a href={`tel:${PHONE_NUMBER}`} aria-label="Call Now" onClick={() => trackPhoneCall('floating')}>
          <PhoneIcon size={24} />
        </a>
      </div>
      <div className="ow-float-wa">
        <a href={waLink('hero')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={() => trackWhatsApp('floating')}>
          <WaIcon size={26} />
        </a>
      </div>
    </>
  );
}