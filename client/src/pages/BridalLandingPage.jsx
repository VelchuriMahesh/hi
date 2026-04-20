import { useState } from 'react';

const heroBridal = '/bridal/bridalblow/hero-bridal.webp';
const galleryItems = [
  {
    src: '/bridal/bridalblow/custom-fit-muhurtham-silk-saree-blouse-bangalore.webp',
    title: 'Muhurtham Designer Bridal Blouse',
    desc: 'A designer bridal blouse styled for muhurtham with traditional detailing and premium finishing.',
  },
  {
    src: '/bridal/bridalblow/designer-bridal-blouse-back-neck-pattern-shrusara.webp',
    title: 'Designer Bridal Blouse Back Neck Pattern',
    desc: 'Elegant back neck design with intricate detailing, crafted to complement your bridal saree.',
  },
  {
    src: '/bridal/bridalblow/handcrafted-aari-work-wedding-blouse-shrusara-bangalore-boutique.webp',
    title: 'Purple Heritage Bridal Blouse',
    desc: 'A rich purple bridal blouse inspired by heritage craftsmanship and detailed hand embroidery.',
  },
  {
    src: '/bridal/bridalblow/intricate-hand-embroidery-maggam-aari-bridal-wear-mahalakshmipuram.webp',
    title: 'Traditional Silk Wedding Blouse',
    desc: 'A classic silk wedding blouse designed with elegant traditional detailing for timeless bridal styling.',
  },
  {
    src: '/bridal/bridalblow/premium-antique-gold-temple-work-bridal-blouse-shrusara-bangalore.webp',
    title: 'Royal Heritage Style Bridal Maggam Blouse',
    desc: 'A heritage-inspired bridal blouse crafted with intricate maggam embroidery, rich detailing, and premium finishing.',
  },
  {
    src: '/bridal/bridalblow/premium-maggam-work-bridal-blouse-mahalakshmipuram-shrusara.webp',
    title: 'Premium Maggam Work Bridal Blouse',
    desc: 'Rich maggam work bridal blouse with premium stone and bead detailing for muhurtham.',
  },
  {
    src: '/bridal/bridalblow/royal-heritage-style-bridal-maggam-blouse-bangalore.webp',
    title: 'Royal Heritage Style Bridal Blouse',
    desc: 'A heritage-inspired bridal blouse featuring royal maggam embroidery and timeless handcrafted elegance.',
  },
  {
    src: '/bridal/bridalblow/traditional-south-indian-wedding-blouse-gold-zari-work-designed-shrusara-boutique.webp',
    title: 'Silk Saree Floral Beadwork Blouse',
    desc: 'A designer silk saree blouse highlighted with floral beadwork and rich handcrafted detailing.',
  },
  {
    src: '/bridal/Lehenga/luxury-bridal-lehenga-custom-design-bangalore.webp',
    title: 'Traditional Deep Back Bridal Blouse',
    desc: 'A traditional bridal blouse featuring a graceful deep back pattern and elegant embroidery accents.',
  },
  {
    src: '/bridal/Lehenga/custom-made-bridal-muhurtham-lehenga-shrusara.webp',
    title: 'Pastel Maggam Bridal Blouse',
    desc: 'A pastel-toned bridal blouse crafted with premium maggam embroidery and rich bridal detailing.',
  },
  {
    src: '/landingpage/close-up-handcrafted-aari-work-embroidery-premium-bridal-silksaree-blouse.webp',
    title: 'Bridal Couple Couture Look',
    desc: 'A custom bridal couture look styled for couples with elegant coordination and premium finishing.',
  },
  {
    src: '/landingpage/custom-made-bridal-reception-lehenga-shrusara.webp',
    title: 'Luxury Reception Bridal Look',
    desc: 'A reception bridal ensemble crafted for modern elegance with premium finishing and refined styling.',
  },
  {
    src: '/landingpage/designer-bridal-blouse-back-neck-pattern-bangalore-shrusara.webp',
    title: 'Classic Bridal Back Neck Pair',
    desc: 'A coordinated bridal blouse pair featuring elegant back neck detailing and handcrafted wedding embroidery.',
  },
  {
    src: '/landingpage/heavy-hand-embroidery-reception-blouse-with-crystal-detailing-shrusara.webp',
    title: 'Temple Heritage Bridal Blouse',
    desc: 'A heritage-inspired bridal blouse crafted with intricate embroidery, classic elegance, and refined finishing.',
  },
  {
    src: '/landingpage/intricate-hand-embroidery-bridal-wear-shruthi-ajith-bangalore.webp',
    title: 'Temple Heritage Bridal Blouse',
    desc: 'A traditional bridal blouse inspired by temple motifs and classic South Indian craftsmanship.',
  },
  {
    src: '/landingpage/intricate-heavy-hand-embroidery-bridal-wear-bangalore.webp',
    title: 'Heavy Hand Embroidery Bridal Wear',
    desc: 'Rich and heavy hand embroidery bridal wear crafted for the discerning Bangalore bride.',
  },
  {
    src: '/landingpage/red-bridal-maggam-work-blouse-featuring-heavy-stone-bead-detailing-muhurtham-bangalore.webp',
    title: 'Red Bridal Maggam Work Muhurtham Blouse',
    desc: 'Bold red muhurtham blouse with heavy maggam work, stone and bead detailing for a striking look.',
  },
  {
    src: '/landingpage/red-bridal-maggam-work-blouse-featuring-heavy-stone-bead-detailing-muhurtham-mahalakshmipuram.webp',
    title: 'Regal Reception Couture',
    desc: 'A graceful reception outfit designed with rich detailing, elegant styling, and premium finishing.',
  },
  {
    src: '/landingpage/vintage-inspired-heavy-work-bridal-blouse-shruthi-ajith-bangalore.webp',
    title: 'Vintage Inspired Heavy Work Bridal Blouse',
    desc: 'Vintage-style bridal blouse with heavy work detailing, designed by Chief Designer Shruthi Ajith.',
  },
];

const WHATSAPP_NUMBER = '919741827558';
const PHONE_NUMBER    = '+919741827558';
const WA_PREFILL = `https://wa.me/919741827558?text=Hi%2C%20I%20am%20looking%20for%20a%20customized%20bridal%20outfit.%20My%20wedding%20date%20is%20%5Bdate%5D.%20I%20need%20consultation%20for%20blouse%20%2F%20lehenga%20%2F%20gown.%20I%20would%20like%20to%20consult%20with%20Chief%20Designer%20Shruthi%20Ajith.`;

const trustPoints = [
  { icon: '✦', label: 'Craftsmanship', title: 'Premium Maggam & Aari Work', desc: 'Intricate handcrafted embroidery designed for bridal elegance and richness' },
  { icon: '◈', label: 'Fit Promise',   title: 'Perfect Fit – Tailored for You', desc: 'Every measurement is customized to your body type for flawless fitting' },
  { icon: '◷', label: 'Reliability',   title: 'On-Time Delivery Commitment', desc: 'Your bridal outfit will be ready well before your special day' },
];

const reviews = [
  { text: 'The fit was like a second skin. Best bridal boutique in Bangalore!', name: 'Priya Rao' },
  { text: 'Highly professional service and timely delivery. Shruthi Ajith is incredibly talented.', name: 'Meghana V.' },
  { text: 'They made my Pinterest dream into reality. Worth every penny!', name: 'Kavya Ramesh' },
];

const googleReviews = [
  { name: 'Anusha R.',    ago: '2 weeks ago', text: 'The blouse fitting was perfect and the maggam work looked premium in person. The consultation made the whole bridal styling process easier.' },
  { name: 'Keerthana M.', ago: '1 month ago', text: 'Loved the finishing, delivery commitment, and how well they understood the reference I showed. The outfit felt custom in the best way.' },
  { name: 'Pallavi S.',   ago: '1 month ago', text: 'The boutique helped with blouse and kids outfit coordination for our family event. Everything looked polished and fit beautifully.' },
];

const processSteps = [
  { step: '01', title: 'Consultation',       desc: 'Discuss your wedding details, design ideas, and preferences' },
  { step: '02', title: 'Design Finalization', desc: 'Finalize blouse and outfit design, fabrics, and embroidery details' },
  { step: '03', title: 'Trial & Perfect Fit', desc: 'Ensure perfect fitting with trials and finishing touches' },
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
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="38" height="38" aria-label="Google" role="img" style={{ flexShrink: 0 }}>
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.6 35.4 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C36.9 36.8 44 31 44 24c0-1.3-.1-2.6-.4-3.9z"/>
  </svg>
);

// ─── Image Modal ──────────────────────────────────────────────────────────────
// ─── Image Modal ──────────────────────────────────────────────────────────────
function ImageModal({ item, onClose }) {
  if (!item) return null;
  
  return (
    <div className="blm-overlay" onClick={onClose}>
      <div className="blm-box" onClick={e => e.stopPropagation()}>
        <button className="blm-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="blm-img-wrap">
          <img src={item.src} alt={item.title} />
        </div>
        <div className="blm-body">
          <p className="blm-eyebrow">Design Preview</p>
          <h3 className="blm-title">{item.title}</h3>
          <p className="blm-desc">{item.desc}</p>
          <button className="blm-btn-cont" onClick={onClose}>Close Preview</button>
          {/* WhatsApp Button Removed as requested */}
        </div>
      </div>
    </div>
  );
}

// ─── CTA Form ────────────────────────────────────────────────────────────────
function BridalCtaForm() {
  const [weddingDate, setWeddingDate] = useState('');
  const [sareeDetails, setSareeDetails] = useState('');
  const [designPref, setDesignPref] = useState('');
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I am looking for a customized bridal outfit.\nMy wedding date is ${weddingDate || '[date]'}.\nSaree details: ${sareeDetails || '—'}.\nDesign preferences: ${designPref || '—'}.\nI would like to consult with Chief Designer Shruthi Ajith.`
  )}`;
  return (
    <div className="bl-cta-form">
      <div className="bl-form-fields">
        <div className="bl-form-group">
          <label className="bl-form-label" htmlFor="bl-date">Wedding Date</label>
          <input id="bl-date" className="bl-form-input" type="text" placeholder="e.g. 15 Feb 2026" value={weddingDate} onChange={e => setWeddingDate(e.target.value)} />
        </div>
        <div className="bl-form-group">
          <label className="bl-form-label" htmlFor="bl-saree">Saree / Outfit Details</label>
          <input id="bl-saree" className="bl-form-input" type="text" placeholder="e.g. Kanjivaram silk, deep red" value={sareeDetails} onChange={e => setSareeDetails(e.target.value)} />
        </div>
        <div className="bl-form-group">
          <label className="bl-form-label" htmlFor="bl-design">Design Preferences</label>
          <input id="bl-design" className="bl-form-input" type="text" placeholder="e.g. Maggam work, heavy neck" value={designPref} onChange={e => setDesignPref(e.target.value)} />
        </div>
      </div>
      <div className="bl-cta-btns">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="bl-cta-btn-pri"><WaIcon size={18} /> WhatsApp Consultation</a>
        <a href={`tel:${PHONE_NUMBER}`} className="bl-cta-btn-sec"><PhoneIcon size={16} /> Call Now</a>
      </div>
      <p className="bl-form-hint">Your details will be pre-filled in WhatsApp — just hit send.</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const BridalLandingPage = () => {
  const [modalItem, setModalItem] = useState(null);

  return (
    <>
      <style>{`
        :root {
          --bl-gold:      #B8935A;
          --bl-gold-pale: #F5EDD9;
          --bl-dark:      #1C1410;
          --bl-cream:     #FBF8F3;
          --bl-text:      #3A2E25;
          --bl-muted:     #7A6A5A;
          --bl-white:     #FFFFFF;
        }
        .bl-body { font-family:'Jost','Poppins',sans-serif; background:var(--bl-cream); color:var(--bl-text); overflow-x:hidden; }

        /* HEADER */
        .bl-hdr { position:sticky;top:0;z-index:100;background:rgba(251,248,243,.96);backdrop-filter:blur(12px);border-bottom:1px solid rgba(184,147,90,.15);padding:0 5vw;display:flex;align-items:center;justify-content:space-between;height:72px; }
        .bl-hdr-brand { display:flex;align-items:center;gap:14px;text-decoration:none; }
        .bl-hdr-logo { height:52px;width:auto;object-fit:contain;display:block;flex-shrink:0; }
        .bl-hdr-name { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:1.85rem;font-weight:700;color:#2b2118;letter-spacing:.01em;line-height:1;margin:0; }
        .bl-hdr-sub { font-size:.52rem;letter-spacing:.32em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-top:5px;line-height:1; }
        .bl-hdr-badge { display:flex;align-items:center;gap:6px;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--bl-muted);font-weight:500; }
        .bl-hdr-badge-dot { width:6px;height:6px;border-radius:50%;background:#4CAF50;animation:bl-pulse 2s infinite; }
        @keyframes bl-pulse { 0%,100%{opacity:1}50%{opacity:.4} }
        .bl-hdr-cta { display:inline-flex;align-items:center;gap:8px;background:var(--bl-dark);color:var(--bl-white);font-size:.62rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;padding:11px 22px;text-decoration:none;border:none;cursor:pointer;transition:background .2s; }
        .bl-hdr-cta:hover { background:var(--bl-gold); }

        /* HERO */
        .bl-hero { display:flex;flex-direction:row;align-items:stretch;width:100%;min-height:90vh;background:var(--bl-cream);position:relative;overflow:hidden; }
        .bl-hero::before { content:'';position:absolute;inset:0;pointer-events:none;z-index:1;background:radial-gradient(ellipse 60% 70% at 30% 50%,rgba(184,147,90,.08) 0%,transparent 70%); }
        .bl-hero-text { flex:1.1;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:80px 48px 80px 5vw;z-index:2; }
        .bl-hero-eyebrow { display:inline-flex;align-items:center;gap:10px;font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:22px; }
        .bl-hero-eyebrow::before { content:'';width:28px;height:1px;background:var(--bl-gold);display:block; }
        .bl-hero-h1 { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:clamp(2rem,3.4vw,3.2rem);font-weight:700;line-height:1.12;color:var(--bl-dark);margin-bottom:10px; }
        .bl-hero-h1 em { font-style:italic;color:var(--bl-gold); }
        .bl-hero-h2 { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:clamp(1.1rem,1.6vw,1.5rem);font-weight:400;font-style:italic;color:var(--bl-muted);margin-bottom:20px;line-height:1.35; }
        .bl-hero-sub { font-size:.88rem;line-height:1.85;color:var(--bl-muted);max-width:460px;margin-bottom:6px;font-weight:300; }
        .bl-hero-designer { display:inline-flex;align-items:center;gap:7px;font-size:.72rem;font-weight:600;letter-spacing:.06em;color:var(--bl-dark);margin-bottom:6px; }
        .bl-hero-designer::before { content:'✦';color:var(--bl-gold);font-size:.7rem; }
        .bl-hero-price { font-size:.76rem;color:var(--bl-muted);margin-bottom:10px; }
        .bl-hero-price strong { color:var(--bl-dark);font-weight:700; }
        .bl-hero-scarcity { display:inline-flex;align-items:center;gap:6px;font-size:.68rem;color:rgba(184,147,90,.85);font-weight:500;letter-spacing:.04em;margin-bottom:28px; }
        .bl-hero-scarcity::before { content:'⚑';font-size:.65rem; }
        .bl-hero-btns { display:flex;gap:14px;flex-wrap:wrap; }
        .bl-hero-img-wrap { flex:1;position:relative;min-height:90vh;overflow:hidden; }
        .bl-hero-img-wrap img { width:100%;height:100%;object-fit:cover;object-position:center top;display:block; }
        .bl-hero-img-fade { position:absolute;inset:0;background:linear-gradient(to right,var(--bl-cream) 0%,transparent 18%); }

        /* BUTTONS */
        .bl-btn-pri { display:inline-flex;align-items:center;gap:9px;background:var(--bl-dark);color:var(--bl-white);font-size:.7rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:15px 28px;text-decoration:none;border:2px solid var(--bl-dark);transition:transform .2s,box-shadow .2s; }
        .bl-btn-pri:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(28,20,16,.2); }
        .bl-btn-sec { display:inline-flex;align-items:center;gap:9px;background:transparent;color:var(--bl-dark);font-size:.7rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:15px 28px;text-decoration:none;border:2px solid var(--bl-dark);transition:background .2s,color .2s; }
        .bl-btn-sec:hover { background:var(--bl-dark);color:var(--bl-white); }

        /* TRUST BAR */
        .bl-trust { padding:0 5vw 64px;background:var(--bl-white); }
        .bl-trust-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(184,147,90,.12); }
        .bl-trust-item { background:var(--bl-white);padding:32px 28px;display:flex;align-items:flex-start;gap:16px; }
        .bl-trust-icon { width:40px;height:40px;border-radius:50%;background:var(--bl-gold-pale);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1rem;color:var(--bl-gold); }
        .bl-trust-label { font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:6px; }
        .bl-trust-title { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--bl-dark);margin-bottom:4px; }
        .bl-trust-desc { font-size:.8rem;color:var(--bl-muted);line-height:1.65;font-weight:300; }

        /* SECTION LABELS */
        .bl-sec-eyebrow { display:inline-flex;align-items:center;gap:8px;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:14px; }
        .bl-sec-eyebrow::before { content:'';width:22px;height:1px;background:var(--bl-gold);display:block; }
        .bl-sec-h { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--bl-dark);margin-bottom:10px;line-height:1.2; }
        .bl-sec-sub { font-size:.87rem;color:var(--bl-muted);line-height:1.75;max-width:500px;font-weight:300; }

        /* ═══════════════════════════════
           GALLERY — clean cards, no text
        ═══════════════════════════════ */
        .bl-gallery { padding:80px 5vw;background:var(--bl-cream); }
        .bl-gallery-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:40px; }
        .bl-gallery-card {
          overflow:hidden;border-radius:28px;
          border:1px solid rgba(255,255,255,.6);
          background:rgba(255,255,255,.82);
          padding:12px;
          box-shadow:0 4px 24px rgba(28,20,16,.10);
          transition:transform .3s,box-shadow .3s;
          cursor:pointer;width:100%;
          text-align:left;appearance:none;-webkit-appearance:none;
          display:block;
        }
        .bl-gallery-card:hover { transform:translateY(-6px);box-shadow:0 12px 36px rgba(28,20,16,.16); }
        .bl-gallery-card-inner { border-radius:22px;overflow:hidden;background:var(--bl-gold-pale);aspect-ratio:4/5; }
        .bl-gallery-card-inner img { width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease; }
        .bl-gallery-card:hover .bl-gallery-card-inner img { transform:scale(1.05); }

        /* CRAFTSMANSHIP */
        .bl-craft { padding:80px 5vw;background:var(--bl-white); }
        .bl-craft-inner { max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center; }
        .bl-craft-eyebrow { display:inline-flex;align-items:center;gap:8px;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:14px; }
        .bl-craft-eyebrow::before { content:'';width:22px;height:1px;background:var(--bl-gold);display:block; }
        .bl-craft-h { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--bl-dark);margin-bottom:20px;line-height:1.2; }
        .bl-craft-desc { font-size:.9rem;line-height:1.85;color:var(--bl-muted);font-weight:300;margin-bottom:16px; }
        .bl-craft-note { font-size:.85rem;line-height:1.75;color:var(--bl-text);font-weight:400;margin-top:20px;border-left:2px solid var(--bl-gold);padding-left:14px; }
        .bl-craft-tags { display:flex;flex-wrap:wrap;gap:10px;margin-top:28px; }
        .bl-craft-tag { display:inline-flex;align-items:center;gap:6px;background:var(--bl-gold-pale);color:var(--bl-dark);font-size:.62rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:8px 16px;border:1px solid rgba(184,147,90,.25); }
        .bl-craft-tag::before { content:'✦';color:var(--bl-gold);font-size:.55rem; }
        .bl-craft-right { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
        .bl-craft-img-card { overflow:hidden;border-radius:22px;border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.82);padding:10px;box-shadow:0 4px 20px rgba(28,20,16,.09);transition:transform .3s,box-shadow .3s; }
        .bl-craft-img-card:hover { transform:translateY(-4px);box-shadow:0 10px 30px rgba(28,20,16,.15); }
        .bl-craft-img-inner { border-radius:16px;overflow:hidden;background:var(--bl-gold-pale);aspect-ratio:3/4; }
        .bl-craft-img-inner img { width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s; }
        .bl-craft-img-card:hover .bl-craft-img-inner img { transform:scale(1.05); }

        /* DESIGNER */
        .bl-designer { padding:80px 5vw;background:var(--bl-dark); }
        .bl-designer-inner { max-width:960px;margin:0 auto; }
        .bl-designer-eyebrow { display:inline-flex;align-items:center;gap:8px;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:14px; }
        .bl-designer-eyebrow::before { content:'';width:22px;height:1px;background:var(--bl-gold);display:block; }
        .bl-designer-sec-h { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:var(--bl-white);margin-bottom:48px;line-height:1.2; }
        .bl-designer-layout { display:grid;grid-template-columns:1fr 2fr;gap:60px;align-items:center; }
        .bl-designer-accent { position:relative;padding:36px 32px;border:1px solid rgba(184,147,90,.3); }
        .bl-designer-accent::before { content:'';position:absolute;top:-1px;left:36px;right:36px;height:2px;background:var(--bl-gold); }
        .bl-designer-name { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:1.5rem;font-weight:700;color:var(--bl-white);margin-bottom:6px; }
        .bl-designer-role { font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:14px; }
        .bl-designer-stars { color:var(--bl-gold);letter-spacing:3px;font-size:.9rem; }
        .bl-designer-text { font-size:1.05rem;line-height:1.9;color:rgba(255,255,255,.75);font-weight:300;font-family:'Cormorant Garamond','Playfair Display',serif;font-style:italic;margin-bottom:18px; }
        .bl-designer-sub { font-size:.87rem;line-height:1.75;color:rgba(255,255,255,.5);font-weight:300; }
        .bl-designer-trusted { font-size:.82rem;line-height:1.7;color:rgba(255,255,255,.45);font-weight:300;margin-top:28px;border-top:1px solid rgba(184,147,90,.2);padding-top:20px; }

        /* REVIEWS */
        .bl-reviews { padding:80px 5vw;background:var(--bl-white); }
        .bl-reviews-hdr { margin-bottom:12px; }
        .bl-reviews-top-rated { font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--bl-gold);margin-bottom:10px;display:block; }
        .bl-reviews-badge { display:inline-flex;align-items:center;gap:10px;background:var(--bl-dark);color:var(--bl-white);font-size:.62rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:10px 22px;margin-bottom:16px; }
        .bl-reviews-badge-stars { color:var(--bl-gold);letter-spacing:2px; }
        .bl-reviews-title { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:clamp(1.4rem,2.2vw,2rem);font-weight:700;color:var(--bl-dark);margin-bottom:8px; }
        .bl-reviews-sub { font-size:.87rem;color:var(--bl-muted);line-height:1.75;max-width:520px;font-weight:300;margin-bottom:36px; }
        .bl-reviews-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
        .bl-review-card { background:var(--bl-cream);padding:32px 28px;border:1px solid rgba(184,147,90,.12);position:relative; }
        .bl-review-card::before { content:'"';position:absolute;top:16px;right:20px;font-family:'Cormorant Garamond',serif;font-size:4rem;color:rgba(184,147,90,.15);line-height:1; }
        .bl-review-text { font-size:.87rem;line-height:1.75;color:var(--bl-text);font-style:italic;margin-bottom:16px;font-weight:300; }
        .bl-review-name { font-size:.72rem;font-weight:700;color:var(--bl-dark);letter-spacing:.06em; }
        .bl-review-stars { color:var(--bl-gold);font-size:.75rem;margin-bottom:12px; }

        /* GOOGLE REVIEWS */
        .bl-grev { padding:80px 5vw;background:var(--bl-cream); }
        .bl-grev-inner { max-width:1100px;margin:0 auto; }
        .bl-grev-top-label { display:inline-flex;align-items:center;gap:8px;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:14px; }
        .bl-grev-top-label::before { content:'';width:22px;height:1px;background:var(--bl-gold);display:block; }
        .bl-grev-heading { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:var(--bl-dark);line-height:1.15;margin-bottom:8px; }
        .bl-grev-sub { font-size:.87rem;color:var(--bl-muted);line-height:1.7;font-weight:300;margin-bottom:32px; }
        .bl-grev-badge-card { background:var(--bl-white);border:1px solid rgba(184,147,90,.14);border-radius:14px;padding:22px 28px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:20px;box-shadow:0 2px 18px rgba(28,20,16,.07); }
        .bl-grev-rating-block { display:flex;align-items:center;gap:16px;flex:1;min-width:240px; }
        .bl-grev-rating-texts { display:flex;flex-direction:column;gap:4px; }
        .bl-grev-rating-row { display:flex;align-items:center;gap:8px;flex-wrap:wrap; }
        .bl-grev-rating-num { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:2rem;font-weight:700;color:var(--bl-dark);line-height:1; }
        .bl-grev-stars { display:flex;gap:2px; }
        .bl-grev-star { color:#FFC107;font-size:.95rem;line-height:1; }
        .bl-grev-rating-label { font-size:.78rem;font-weight:700;color:var(--bl-dark);letter-spacing:.04em; }
        .bl-grev-verified { font-size:.72rem;color:var(--bl-muted);font-weight:300; }
        .bl-grev-vdivider { width:1px;height:44px;background:rgba(184,147,90,.2);flex-shrink:0; }
        .bl-grev-view-btn { display:inline-flex;align-items:center;gap:7px;font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#1a73e8;text-decoration:none;border:1.5px solid #1a73e8;border-radius:100px;padding:10px 22px;transition:background .2s,color .2s;white-space:nowrap; }
        .bl-grev-view-btn:hover { background:#1a73e8;color:var(--bl-white); }
        .bl-grev-arrow { transition:transform .2s;display:inline-flex;align-items:center; }
        .bl-grev-view-btn:hover .bl-grev-arrow { transform:translateX(3px); }
        .bl-grev-clients-pill { display:inline-flex;align-items:center;gap:10px;background:var(--bl-dark);color:var(--bl-white);font-size:.76rem;font-weight:700;letter-spacing:.06em;padding:12px 24px;border-radius:4px;margin-bottom:44px; }
        .bl-grev-clients-stars { color:var(--bl-gold);letter-spacing:2px;font-size:.9rem; }
        .bl-grev-proof-row { display:flex;align-items:flex-start;gap:48px;margin-bottom:32px;flex-wrap:wrap; }
        .bl-grev-proof-left { flex:1;min-width:200px; }
        .bl-grev-proof-eyebrow { font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--bl-muted);font-weight:600;margin-bottom:10px; }
        .bl-grev-proof-title { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:clamp(1.4rem,2vw,1.9rem);font-weight:700;color:var(--bl-dark);line-height:1.2;margin-bottom:10px; }
        .bl-grev-proof-desc { font-size:.82rem;color:var(--bl-muted);font-weight:300;line-height:1.65;max-width:360px; }
        .bl-grev-mini-rating { background:var(--bl-gold-pale);border:1px solid rgba(184,147,90,.22);border-radius:14px;padding:26px 30px;min-width:190px;display:flex;flex-direction:column;gap:6px; }
        .bl-grev-mini-stars { display:flex;gap:4px;margin-bottom:2px; }
        .bl-grev-mini-star { color:var(--bl-gold);font-size:.82rem; }
        .bl-grev-mini-label { font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:var(--bl-muted);font-weight:600; }
        .bl-grev-mini-num { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:3rem;font-weight:700;color:var(--bl-dark);line-height:1; }
        .bl-grev-mini-based { font-size:.72rem;color:var(--bl-muted);font-weight:300;line-height:1.45; }
        .bl-grev-cards { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
        .bl-grev-card { background:var(--bl-white);border-radius:12px;border:1px solid rgba(184,147,90,.10);padding:24px 22px;box-shadow:0 2px 14px rgba(28,20,16,.05); }
        .bl-grev-card-header { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;gap:8px; }
        .bl-grev-card-name { font-size:.9rem;font-weight:700;color:var(--bl-dark);line-height:1.2; }
        .bl-grev-card-ago { font-size:.72rem;color:var(--bl-muted);font-weight:300;margin-top:3px; }
        .bl-grev-card-stars { display:flex;gap:3px;flex-shrink:0; }
        .bl-grev-card-star { color:#FFC107;font-size:.82rem; }
        .bl-grev-card-text { font-size:.82rem;line-height:1.72;color:var(--bl-text);font-weight:300; }

        /* PROCESS */
        .bl-process { padding:80px 5vw;background:var(--bl-white); }
        .bl-process-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px; }
        .bl-process-card { background:var(--bl-cream);padding:36px 28px;border:1px solid rgba(184,147,90,.12);position:relative;overflow:hidden; }
        .bl-process-card::before { content:attr(data-step);position:absolute;top:-12px;right:14px;font-family:'Cormorant Garamond','Playfair Display',serif;font-size:5rem;font-weight:700;color:rgba(184,147,90,.1);pointer-events:none;line-height:1; }
        .bl-process-step { display:inline-block;font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--bl-gold);margin-bottom:14px; }
        .bl-process-title { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--bl-dark);margin-bottom:10px; }
        .bl-process-desc { font-size:.82rem;color:var(--bl-muted);line-height:1.7;font-weight:300; }

        /* FINAL CTA */
        .bl-cta-wrap { padding:80px 5vw;background:var(--bl-cream); }
        .bl-cta-box { background:var(--bl-dark);padding:72px 60px;text-align:center;position:relative;overflow:hidden;max-width:960px;margin:0 auto; }
        .bl-cta-box::before { content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 70% 55% at 50% 100%,rgba(184,147,90,.12) 0%,transparent 70%); }
        .bl-cta-eyebrow { display:inline-flex;align-items:center;gap:8px;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:20px; }
        .bl-cta-eyebrow::before { content:'';width:20px;height:1px;background:var(--bl-gold);display:block; }
        .bl-cta-eyebrow::after  { content:'';width:20px;height:1px;background:var(--bl-gold);display:block; }
        .bl-cta-h { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:var(--bl-white);margin-bottom:14px;line-height:1.2; }
        .bl-cta-sub { font-size:.9rem;line-height:1.75;color:rgba(255,255,255,.7);max-width:480px;margin:0 auto 12px;font-weight:300; }
        .bl-cta-scarcity { display:inline-flex;align-items:center;gap:6px;font-size:.72rem;color:rgba(255,255,255,.45);margin-bottom:36px; }
        .bl-cta-scarcity::before { content:'⚑';font-size:.7rem; }
        .bl-cta-form { margin-top:32px;position:relative;z-index:1; }
        .bl-form-fields { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:28px; }
        .bl-form-group { display:flex;flex-direction:column;gap:8px;text-align:left; }
        .bl-form-label { font-size:.62rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5); }
        .bl-form-input { background:rgba(255,255,255,.09);border:1.5px solid rgba(255,255,255,.18);padding:12px 16px;font-size:.87rem;color:var(--bl-white);outline:none;transition:border-color .2s,background .2s;width:100%;font-family:'Jost','Poppins',sans-serif; }
        .bl-form-input::placeholder { color:rgba(255,255,255,.32); }
        .bl-form-input:focus { border-color:var(--bl-gold);background:rgba(255,255,255,.13); }
        .bl-cta-btns { display:flex;justify-content:center;gap:14px;flex-wrap:wrap; }
        .bl-cta-btn-pri { display:inline-flex;align-items:center;gap:9px;background:var(--bl-gold);color:var(--bl-white);font-size:.7rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border:2px solid var(--bl-gold);transition:transform .2s,box-shadow .2s; }
        .bl-cta-btn-pri:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,147,90,.35); }
        .bl-cta-btn-sec { display:inline-flex;align-items:center;gap:9px;background:transparent;color:var(--bl-white);font-size:.7rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:16px 32px;text-decoration:none;border:2px solid rgba(255,255,255,.3);transition:background .2s; }
        .bl-cta-btn-sec:hover { background:rgba(255,255,255,.08); }
        .bl-form-hint { font-size:.72rem;color:rgba(255,255,255,.38);margin-top:16px;font-style:italic; }

        /* FOOTER */
        .bl-footer { background:var(--bl-dark);border-top:1px solid rgba(184,147,90,.18);padding:36px 5vw 24px;color:rgba(255,255,255,.65); }
        .bl-footer-inner { max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:flex-start;gap:32px 60px; }
        .bl-footer-brand { display:flex;flex-direction:column;gap:4px;min-width:200px;flex:1.2; }
        .bl-footer-brand-name { font-family:'Cormorant Garamond','Playfair Display',serif;font-size:1.25rem;font-weight:700;color:var(--bl-white);letter-spacing:.02em;line-height:1;margin:0; }
        .bl-footer-brand-tag { font-size:.52rem;letter-spacing:.2em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:10px; }
        .bl-footer-desc { font-size:.76rem;line-height:1.7;color:rgba(255,255,255,.42);font-weight:300;max-width:300px;margin:0; }
        .bl-footer-seo { font-size:.72rem;line-height:1.7;color:rgba(255,255,255,.28);font-weight:300;max-width:340px;margin:10px 0 0; }
        .bl-footer-divider-v { width:1px;align-self:stretch;background:rgba(184,147,90,.15);flex-shrink:0; }
        .bl-footer-contact { flex:1;min-width:200px; }
        .bl-footer-contact-title { font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;color:var(--bl-gold);font-weight:600;margin-bottom:14px; }
        .bl-footer-contact-list { display:flex;flex-direction:column;gap:10px; }
        .bl-footer-contact-item { display:flex;align-items:flex-start;gap:8px;font-size:.76rem;color:rgba(255,255,255,.52);line-height:1.45;text-decoration:none;transition:color .2s; }
        .bl-footer-contact-item:hover { color:var(--bl-gold); }
        .bl-footer-contact-icon { color:var(--bl-gold);flex-shrink:0;margin-top:2px; }
        .bl-footer-map-link { display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:.6rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--bl-gold);text-decoration:none;border:1px solid rgba(184,147,90,.3);padding:7px 14px;transition:background .2s,border-color .2s; }
        .bl-footer-map-link:hover { background:rgba(184,147,90,.1);border-color:var(--bl-gold); }
        .bl-footer-bottom { max-width:1100px;margin:20px auto 0;padding-top:16px;border-top:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px; }
        .bl-footer-copy { font-size:.65rem;color:rgba(255,255,255,.22); }

        /* FLOATING */
        .bl-float-call { position:fixed;bottom:100px;right:24px;z-index:200; }
        .bl-float-call a { display:flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:50%;background:#000;color:#fff;box-shadow:0 6px 28px rgba(0,0,0,.4);text-decoration:none; }
        .bl-float-call a:hover { background:#B8935A; }
        .bl-float-wa { position:fixed;bottom:28px;right:24px;z-index:200; }
        .bl-float-wa a { display:flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:50%;background:#25D366;color:var(--bl-white);box-shadow:0 6px 28px rgba(37,211,102,.45);position:relative;text-decoration:none; }
        .bl-float-wa a::before { content:'';position:absolute;inset:0;border-radius:50%;background:#25D366;opacity:.55;animation:bl-ring 2s infinite; }
        @keyframes bl-ring { 0%{transform:scale(1);opacity:.55} 100%{transform:scale(1.75);opacity:0} }

       /* ═══════════════════════════════
           IMAGE MODAL - FULL IMAGE VERSION
        ═══════════════════════════════ */
        .blm-overlay {
          position:fixed;inset:0;z-index:1000;
          background:rgba(0,0,0,0.85); /* Darker background for focus */
          backdrop-filter:blur(8px);
          display:flex;align-items:center;justify-content:center;
          padding:20px;
          animation:blm-fade .2s ease;
        }
        @keyframes blm-fade { from{opacity:0} to{opacity:1} }
        
        .blm-box {
          background:#FAF8F5;
          border-radius:20px;
          max-width:900px; /* Increased width */
          width:100%;
          max-height:95vh; /* Ensure it fits on screen */
          overflow-y:auto; /* Scroll if content is very long */
          position:relative;
          box-shadow:0 32px 80px rgba(0,0,0,0.5);
          animation:blm-up .25s ease;
        }
        @keyframes blm-up { from{transform:translateY(24px);opacity:0} to{transform:translateY(0);opacity:1} }
        
        .blm-close {
          position:absolute;top:15px;right:15px;
          width:40px;height:40px;border-radius:50%;
          background:#fff;border:none;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          font-size:1.2rem;color:#1C1410;
          box-shadow:0 4px 12px rgba(0,0,0,0.2);
          transition:transform .2s;z-index:10;
        }
        .blm-close:hover { transform:scale(1.1); }

        .blm-img-wrap { 
          width:100%;
          background:#000;
          display:flex;
          justify-content:center;
        }
        .blm-img-wrap img { 
          width:100%; 
          height:auto; /* Allow full height */
          max-height:70vh; /* Don't let image push text off screen */
          object-fit:contain; /* Shows full image without cropping */
          display:block; 
        }

        .blm-body { padding:24px 30px; text-align:center; }
        .blm-eyebrow { font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#B8935A;margin-bottom:8px; }
        .blm-title { font-family:'Cormorant Garamond',serif;font-size:1.75rem;font-weight:700;color:#1C1410;line-height:1.2;margin-bottom:10px; }
        .blm-desc { font-size:.9rem;line-height:1.6;color:#7A6A5A;font-weight:300;margin:0 auto 24px; max-width:600px; }
        
        .blm-btn-cont {
          display:inline-block;
          padding:14px 40px;
          background:#1C1410;
          color:#fff;border:none;border-radius:100px;
          font-size:.75rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;
          cursor:pointer;transition:background .2s;
          font-family:'Jost',sans-serif;
        }
        .blm-btn-cont:hover { background:#B8935A; }
        /* RESPONSIVE */
        @media(max-width:1024px) {
          .bl-gallery-grid{grid-template-columns:repeat(2,1fr)}
          .bl-craft-inner{grid-template-columns:1fr;gap:40px}
          .bl-designer-layout{grid-template-columns:1fr;gap:32px}
          .bl-footer-divider-v{display:none}
          .bl-grev-cards{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:768px) {
          .bl-hdr-badge{display:none}
          .bl-hero{flex-direction:column;min-height:auto}
          .bl-hero-text{padding:50px 5vw 32px;order:2}
          .bl-hero-img-wrap{order:1;height:55vw;min-height:300px;min-width:100%}
          .bl-hero-img-wrap img{min-height:300px}
          .bl-hero-img-fade{background:linear-gradient(to bottom,transparent 60%,var(--bl-cream) 100%)}
          .bl-hero-btns{flex-direction:column}
          .bl-btn-pri,.bl-btn-sec{width:100%;justify-content:center}
          .bl-trust-grid{grid-template-columns:1fr}
          .bl-gallery-grid{grid-template-columns:repeat(2,1fr)}
          .bl-craft-inner{grid-template-columns:1fr;gap:40px}
          .bl-craft-right{grid-template-columns:repeat(2,1fr)}
          .bl-designer-layout{grid-template-columns:1fr;gap:32px}
          .bl-reviews-grid{grid-template-columns:1fr}
          .bl-process-grid{grid-template-columns:1fr}
          .bl-cta-box{padding:48px 24px}
          .bl-form-fields{grid-template-columns:1fr}
          .bl-cta-btns{flex-direction:column;align-items:center}
          .bl-cta-btn-pri,.bl-cta-btn-sec{width:100%;justify-content:center}
          .bl-footer{padding:28px 5vw 20px}
          .bl-footer-inner{flex-direction:column;gap:24px}
          .bl-footer-bottom{flex-direction:column;align-items:flex-start;gap:6px}
          .bl-hdr-logo{height:40px}
          .bl-hdr-name{font-size:1.4rem}
          .bl-hdr-sub{font-size:.45rem;letter-spacing:.25em}
          .bl-grev-cards{grid-template-columns:1fr}
          .bl-grev-proof-row{flex-direction:column;gap:24px}
          .bl-grev-badge-card{flex-direction:column;align-items:flex-start;gap:16px}
          .bl-grev-vdivider{display:none}
          .blm-box{max-width:100%}
        }
        @media(max-width:480px) {
          .bl-gallery-grid{grid-template-columns:1fr}
        }
      `}</style>

      <div className="bl-body">

        {/* HEADER */}
        <header className="bl-hdr">
          <div className="bl-hdr-brand">
            <img src="/videos/Revisedlogo.webp" alt="Shrusara Logo" className="bl-hdr-logo" />
            <div>
              <div className="bl-hdr-name">Shrusara</div>
              <div className="bl-hdr-sub">FASHION&nbsp;&nbsp;BOUTIQUE</div>
            </div>
          </div>
          <div className="bl-hdr-badge"><span className="bl-hdr-badge-dot" />Bangalore's Bridal Studio</div>
          <a href={WA_PREFILL} target="_blank" rel="noopener noreferrer" className="bl-hdr-cta">
            <WaIcon size={14} /> Book Consultation
          </a>
        </header>

        {/* HERO */}
        <section className="bl-hero">
          <div className="bl-hero-text">
            <p className="bl-hero-eyebrow">Bridal Specialist · Bangalore</p>
            <h1 className="bl-hero-h1">Customized Bridal Blouse Designer in <em>Bangalore</em><br />Premium Bridal Blouses &amp; Complete Bridal Outfits</h1>
            <h2 className="bl-hero-h2">Perfect Fit. Handcrafted Maggam &amp; Aari Work. Designed for Your Big Day.</h2>
            <p className="bl-hero-sub">Customized bridal blouses, bridal lehengas, and gowns tailored to your body type and wedding style by experienced bridal designers.</p>
            <p className="bl-hero-designer">Designed personally by Chief Designer Shruthi Ajith</p>
            <p className="bl-hero-price">Bridal designs starting from <strong>₹6,000</strong></p>
            <p className="bl-hero-scarcity">Limited bridal consultation slots available this month</p>
            <div className="bl-hero-btns">
              <a href={WA_PREFILL} target="_blank" rel="noopener noreferrer" className="bl-btn-pri"><WaIcon size={17} /> Book Your Bridal Consultation</a>
              <a href={`tel:${PHONE_NUMBER}`} className="bl-btn-sec"><PhoneIcon size={15} /> Call Now</a>
            </div>
          </div>
          <div className="bl-hero-img-wrap">
            <img src={heroBridal} alt="Bridal blouse by Shrusara Fashion Boutique Bangalore" />
            <div className="bl-hero-img-fade" />
          </div>
        </section>

        {/* TRUST BAR */}
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

        {/* GALLERY — tap card → modal, no text on images */}
        <section className="bl-gallery">
          <p className="bl-sec-eyebrow">Gallery</p>
          <h2 className="bl-sec-h">Customized Bridal Blouse Designs in Bangalore</h2>
          <p className="bl-sec-sub">Explore our collection of maggam work blouses, aari embroidery designs, and customized bridal outfits created for brides across Bangalore.</p>
          <div className="bl-gallery-grid">
            {galleryItems.map((item, i) => (
              <button key={i} className="bl-gallery-card" onClick={() => setModalItem(item)} aria-label={`View ${item.title}`}>
                <div className="bl-gallery-card-inner">
                  <img src={item.src} alt={item.title} loading={i < 4 ? 'eager' : 'lazy'} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CRAFTSMANSHIP */}
        <section className="bl-craft">
          <div className="bl-craft-inner">
            <div>
              <p className="bl-craft-eyebrow">Craftsmanship</p>
              <h2 className="bl-craft-h">Intricate Hand Embroidery –<br />Crafted to Perfection</h2>
              <p className="bl-craft-desc">Every bridal outfit at Shrusara is detailed with precision using maggam work, aari work, zari, and handcrafted embroidery techniques to create timeless, elegant designs.</p>
              <p className="bl-craft-desc">From heavy bridal blouses to complete bridal outfits, each piece reflects careful craftsmanship and premium finishing.</p>
              <div className="bl-craft-tags">
                {['Maggam Work','Aari Work','Zari Embroidery','Handcrafted Detailing','Premium Finishing'].map(t => <span key={t} className="bl-craft-tag">{t}</span>)}
              </div>
              <p className="bl-craft-note">Every bridal blouse is handcrafted using premium maggam work, aari embroidery, zari, and detailed finishing techniques.</p>
            </div>
            <div className="bl-craft-right">
              {[
                { src:'/bridal/bridalblow/handcrafted-aari-work-wedding-blouse-shrusara-bangalore-boutique.webp', alt:'Handcrafted aari work bridal blouse' },
                { src:'/bridal/bridalblow/intricate-hand-embroidery-maggam-aari-bridal-wear-mahalakshmipuram.webp', alt:'Intricate maggam aari bridal wear' },
                { src:'/bridal/bridalblow/premium-antique-gold-temple-work-bridal-blouse-shrusara-bangalore.webp', alt:'Premium antique gold temple work blouse' },
                { src:'/videos/designer-bridal-blouse-back-neck-pattern-bangalore-shrusara.webp', alt:'Premium maggam work bridal blouse' },
              ].map((img,i) => (
                <div key={i} className="bl-craft-img-card">
                  <div className="bl-craft-img-inner">
                    <img src={img.src} alt={img.alt} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESIGNER */}
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
              <div>
                <p className="bl-designer-text">"Every bridal outfit at Shrusara — from blouse to complete bridal look — is personally guided by our Chief Designer to ensure perfect fit, styling, and finishing."</p>
                <p className="bl-designer-sub">We work closely with every bride to understand her vision and bring it to life with precision and care.</p>
                <p className="bl-designer-trusted">One of the trusted bridal blouse designers in Bangalore, known for customized designs and perfect fitting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="bl-reviews">
          <div className="bl-reviews-hdr">
            <span className="bl-reviews-top-rated">Top Rated Bridal Boutique in Bangalore</span>
            <div className="bl-reviews-badge"><span className="bl-reviews-badge-stars">★★★★★</span> 100+ Happy Brides in Bangalore</div>
            <h2 className="bl-reviews-title">Trusted by Brides Across Bangalore</h2>
            <p className="bl-reviews-sub">From engagement to wedding day, we design outfits that brides truly love and feel confident in.</p>
          </div>
          <div className="bl-reviews-grid">
            {reviews.map((r,i) => (
              <div key={i} className="bl-review-card">
                <p className="bl-review-stars">★★★★★</p>
                <p className="bl-review-text">{r.text}</p>
                <p className="bl-review-name">{r.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GOOGLE REVIEWS */}
        <section className="bl-grev">
          <div className="bl-grev-inner">
            <p className="bl-grev-top-label">Trusted by Brides</p>
            <h2 className="bl-grev-heading">Trusted by Brides Across Bangalore</h2>
            <p className="bl-grev-sub">100+ happy clients with consistent quality and service.</p>
            <div className="bl-grev-badge-card">
              <div className="bl-grev-rating-block">
                <GoogleIcon />
                <div className="bl-grev-rating-texts">
                  <div className="bl-grev-rating-row">
                    <span className="bl-grev-rating-num">5.0</span>
                    <div className="bl-grev-stars">{[1,2,3,4,5].map(s=><span key={s} className="bl-grev-star">★</span>)}</div>
                    <span className="bl-grev-rating-label">Google Reviews</span>
                  </div>
                  <p className="bl-grev-verified">Based on 100+ verified reviews on Google</p>
                </div>
              </div>
              <div className="bl-grev-vdivider" />
              <a href="https://www.google.com/search?q=Shrusara+Fashion+Boutique+Bangalore" target="_blank" rel="noopener noreferrer" className="bl-grev-view-btn">
                View on Google <span className="bl-grev-arrow"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>
              </a>
            </div>
            <div><span className="bl-grev-clients-pill"><span className="bl-grev-clients-stars">★★★★★</span>250+ Happy Clients in Bangalore</span></div>
            <div className="bl-grev-proof-row">
              <div className="bl-grev-proof-left">
                <p className="bl-grev-proof-eyebrow">Social Proof</p>
                <h3 className="bl-grev-proof-title">Google Reviews</h3>
                <p className="bl-grev-proof-desc">Real experiences from brides and clients who trusted Shrusara for their special occasions.</p>
              </div>
              <div className="bl-grev-mini-rating">
                <div className="bl-grev-mini-stars">{[1,2,3,4,5].map(s=><span key={s} className="bl-grev-mini-star">★</span>)}</div>
                <p className="bl-grev-mini-label">Google rating</p>
                <p className="bl-grev-mini-num">4.9</p>
                <p className="bl-grev-mini-based">Based on 229+<br />boutique experiences</p>
              </div>
            </div>
            <div className="bl-grev-cards">
              {googleReviews.map((r,i) => (
                <div key={i} className="bl-grev-card">
                  <div className="bl-grev-card-header">
                    <div><p className="bl-grev-card-name">{r.name}</p><p className="bl-grev-card-ago">{r.ago}</p></div>
                    <div className="bl-grev-card-stars">{[1,2,3,4,5].map(s=><span key={s} className="bl-grev-card-star">★</span>)}</div>
                  </div>
                  <p className="bl-grev-card-text">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
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

        {/* FINAL CTA */}
        <section className="bl-cta-wrap">
          <div className="bl-cta-box">
            <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
              <p className="bl-cta-eyebrow">Bridal Consultation</p>
            </div>
            <h2 className="bl-cta-h">Book Your Bridal Consultation Today</h2>
            <p className="bl-cta-sub">Share your wedding date, outfit details, and design preferences to get started with your customized bridal outfit.</p>
            <p className="bl-cta-scarcity">Limited bridal consultation slots available for upcoming wedding season</p>
            <BridalCtaForm />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bl-footer">
          <div className="bl-footer-inner">
            <div className="bl-footer-brand">
              <p className="bl-footer-brand-name">Shrusara Fashion Boutique</p>
              <p className="bl-footer-brand-tag">Bridal Boutique · Bangalore</p>
              <p className="bl-footer-desc">Customized bridal blouses, lehengas, and gowns crafted with premium fit, detailed handwork, and elegant finishing.</p>
              <p className="bl-footer-seo">Shrusara Fashion Boutique is a leading bridal boutique in Bangalore specializing in customized bridal blouses, maggam work designs, aari embroidery, and complete bridal outfits including lehengas and gowns.</p>
            </div>
            <div className="bl-footer-divider-v" />
            <div className="bl-footer-contact">
              <p className="bl-footer-contact-title">Contact Us</p>
              <div className="bl-footer-contact-list">
                <span className="bl-footer-contact-item"><span className="bl-footer-contact-icon"><MapPinIcon size={13}/></span>106, 6th Main Road, Mahalakshmipuram, Bangalore – 560086</span>
                <a href="tel:+919741827558" className="bl-footer-contact-item"><span className="bl-footer-contact-icon"><PhoneIcon size={13}/></span>9741827558</a>
                <a href="mailto:help@shrusara.com" className="bl-footer-contact-item"><span className="bl-footer-contact-icon"><MailIcon size={13}/></span>help@shrusara.com</a>
              </div>
              <a href="https://maps.google.com/?q=Shrusara+Fashion+Boutique+Mahalakshmipuram+Bangalore" target="_blank" rel="noopener noreferrer" className="bl-footer-map-link">
                <MapPinIcon size={11}/> View on Google Maps
              </a>
            </div>
          </div>
          <div className="bl-footer-bottom">
            <p className="bl-footer-copy">© {new Date().getFullYear()} Shrusara Fashion Boutique. All rights reserved.</p>
            <p className="bl-footer-copy">Bangalore's Bridal Studio</p>
          </div>
        </footer>

        <div className="bl-float-call"><a href={`tel:${PHONE_NUMBER}`} aria-label="Call"><PhoneIcon size={26}/></a></div>
        <div className="bl-float-wa"><a href={WA_PREFILL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WaIcon size={28}/></a></div>
      </div>

      {/* MODAL — outside bl-body for clean z-index stacking */}
      <ImageModal item={modalItem} onClose={() => setModalItem(null)} />
    </>
  );
};

export default BridalLandingPage;