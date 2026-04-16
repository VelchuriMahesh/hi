import { useState } from 'react';
import ImageGrid from '../components/ImageGrid';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import useMergedGallery from '../hooks/useMergedGallery';
import useHeroMedia from '../hooks/useHeroMedia';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919741827558';
const PHONE_NUMBER    = import.meta.env.VITE_PHONE_NUMBER    || '9741827558';
const TEL_LINK        = `tel:${PHONE_NUMBER}`;

// Hero buttons use a simple default message
const DEFAULT_WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi, I am looking for a customized kids outfit. Please share details.'
)}`;

// CTA form builds a prefilled message from the three input fields
function buildWaLink({ age = '', occasion = '', colors = '' } = {}) {
  const msg =
    `Hi, I am looking for a customized kids outfit.\n` +
    `Age: ${age || '—'}\n` +
    `Occasion: ${occasion || '—'}\n` +
    `Preferred colors/design: ${colors || '—'}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const offeringItems = [
  
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

// ─── CTA Form ─────────────────────────────────────────────────────────────────
function KidsCtaForm() {
  const [age, setAge]           = useState('');
  const [occasion, setOccasion] = useState('');
  const [colors, setColors]     = useState('');

  const waLink = buildWaLink({ age, occasion, colors });

  return (
    <div className="kd-cta-form">
      <div className="kd-form-fields">
        <div className="kd-form-group">
          <label className="kd-form-label" htmlFor="kd-age">Age</label>
          <input
            id="kd-age"
            className="kd-form-input"
            type="text"
            placeholder="e.g. 4 years"
            value={age}
            onChange={e => setAge(e.target.value)}
          />
        </div>
        <div className="kd-form-group">
          <label className="kd-form-label" htmlFor="kd-occasion">Occasion</label>
          <input
            id="kd-occasion"
            className="kd-form-input"
            type="text"
            placeholder="e.g. Birthday, Wedding"
            value={occasion}
            onChange={e => setOccasion(e.target.value)}
          />
        </div>
        <div className="kd-form-group">
          <label className="kd-form-label" htmlFor="kd-colors">Preferred colors / design</label>
          <input
            id="kd-colors"
            className="kd-form-input"
            type="text"
            placeholder="e.g. Pastel pink, floral"
            value={colors}
            onChange={e => setColors(e.target.value)}
          />
        </div>
      </div>
      <div className="kd-cta-btns">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="kd-cta-btn-pri">
          <WaIcon size={18} /> WhatsApp Order
        </a>
        <a href={TEL_LINK} className="kd-cta-btn-sec">
          <PhoneIcon /> Call Now
        </a>
      </div>
      <p className="kd-form-hint">
        Your details will be pre-filled in WhatsApp — just hit send.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Kids() {
  const { media: heroMedia }                              = useHeroMedia('kids');
  const { images: kidsGallery, loading: galleryLoading } = useMergedGallery('kids');

  const galleryImages = kidsGallery?.length > 0
    ? kidsGallery.slice(0, 9)
    : [];

  return (
    <>
      <style>{`
        :root {
          --c-primary:   #3E2C23;
          --c-secondary: #EAE3DC;
          --c-bg:        #F8F6F3;
          --c-accent:    #C8A96A;
          --c-muted:     #7A6A60;
          --c-white:     #FFFFFF;
          --r-lg:        24px;
          --r-sm:        14px;
        }
        body { background: var(--c-bg); }

        /* HERO */
        .kd-hero {
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: 88vh; align-items: center;
          background: var(--c-bg); position: relative; overflow: hidden;
        }
        .kd-hero::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 55% 65% at 28% 50%, rgba(200,169,106,.09) 0%, transparent 70%);
        }
        .kd-hero-text { padding: 80px 40px 80px 5vw; z-index: 2; }
        .kd-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 18px;
        }
        .kd-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--c-accent); display: block; }
        .kd-hero-h1 {
          font: 700 clamp(1.9rem,3.2vw,3rem)/1.2 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 20px;
        }
        .kd-hero-h1 span { display: block; color: var(--c-accent); }
        .kd-hero-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: var(--c-muted); max-width: 440px; margin-bottom: 32px;
        }
        .kd-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .kd-btn-pri {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-primary); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-primary); transition: box-shadow .25s, transform .2s;
        }
        .kd-btn-pri:hover { box-shadow: 0 0 0 4px rgba(62,44,35,.15), 0 6px 24px rgba(62,44,35,.25); transform: translateY(-1px); }
        .kd-btn-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--c-primary);
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-primary); transition: background .2s, color .2s;
        }
        .kd-btn-sec:hover { background: var(--c-primary); color: #fff; }
        .kd-hero-img-wrap { position: relative; height: 88vh; overflow: hidden; }
        .kd-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .kd-hero-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to right, var(--c-bg) 0%, transparent 16%);
        }

        /* SHELLS */
        .kd-shell { max-width: 1280px; margin: 0 auto; padding: 80px 5vw; }
        .kd-alt { background: var(--c-secondary); }
        .kd-alt-inner { max-width: 1280px; margin: 0 auto; padding: 80px 5vw; }

        /* SECTION HEADING */
        .kd-sec-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 14px;
        }
        .kd-sec-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .kd-sec-h2 {
          font: 700 clamp(1.6rem,2.6vw,2.3rem)/1.25 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 12px;
        }
        .kd-sec-sub { font: 400 .95rem/1.75 'Poppins',sans-serif; color: var(--c-muted); max-width: 560px; }

        /* OFFERING */
        .kd-offering-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 36px; }
        .kd-offering-card {
          background: var(--c-white); border-radius: var(--r-lg); padding: 32px 28px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
          position: relative; overflow: hidden;
        }
        .kd-offering-card::before {
          content: attr(data-num); position: absolute; top: -10px; right: 16px;
          font: 700 5rem/1 'Playfair Display',serif; color: rgba(200,169,106,.1); pointer-events: none;
        }
        .kd-offering-num {
          display: inline-block; font: 700 11px/1 'Poppins',sans-serif;
          letter-spacing: .15em; text-transform: uppercase; color: var(--c-accent); margin-bottom: 16px;
        }
        .kd-offering-title { font: 700 1.2rem/1.25 'Playfair Display',serif; color: var(--c-primary); margin-bottom: 10px; }
        .kd-offering-desc { font: 400 .87rem/1.7 'Poppins',sans-serif; color: var(--c-muted); }

        /* GALLERY */
        .kd-gallery-note {
          font: 400 .82rem/1.5 'Poppins',sans-serif; color: var(--c-muted);
          font-style: italic; margin-top: 28px; text-align: center;
        }

        /* TRUST LINE */
        .kd-trust-line {
          display: flex; align-items: center; justify-content: center; gap: 14px;
          background: var(--c-white); border-radius: var(--r-lg); padding: 28px 36px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
          text-align: center; flex-wrap: wrap;
        }
        .kd-trust-icon { color: var(--c-accent); font-size: 18px; flex-shrink: 0; }
        .kd-trust-text { font: 500 1rem/1.6 'Poppins',sans-serif; color: var(--c-primary); max-width: 560px; }

        /* CTA */
        .kd-cta-wrap {
          background: var(--c-primary); border-radius: 32px; padding: 64px 56px;
          text-align: center; position: relative; overflow: hidden;
        }
        .kd-cta-wrap::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,169,106,.12) 0%, transparent 70%);
        }
        .kd-cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 20px;
        }
        .kd-cta-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .kd-cta-eyebrow::after  { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .kd-cta-h {
          font: 700 clamp(1.6rem,2.8vw,2.4rem)/1.2 'Playfair Display',serif;
          color: #fff; margin-bottom: 14px;
        }
        .kd-cta-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: rgba(255,255,255,.75); max-width: 480px; margin: 0 auto;
        }

        /* CTA FORM */
        .kd-cta-form { margin-top: 32px; position: relative; z-index: 1; }
        .kd-form-fields { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 28px; }
        .kd-form-group { display: flex; flex-direction: column; gap: 8px; text-align: left; }
        .kd-form-label {
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .12em;
          text-transform: uppercase; color: rgba(255,255,255,.55);
        }
        .kd-form-input {
          background: rgba(255,255,255,.09); border: 1.5px solid rgba(255,255,255,.2);
          border-radius: 10px; padding: 12px 16px;
          font: 400 14px/1 'Poppins',sans-serif; color: #fff;
          outline: none; transition: border-color .2s, background .2s; width: 100%;
        }
        .kd-form-input::placeholder { color: rgba(255,255,255,.35); }
        .kd-form-input:focus { border-color: var(--c-accent); background: rgba(255,255,255,.13); }
        .kd-cta-btns { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .kd-cta-btn-pri {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-accent); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-accent); transition: box-shadow .2s, transform .2s;
        }
        .kd-cta-btn-pri:hover { box-shadow: 0 0 0 4px rgba(200,169,106,.3); transform: translateY(-1px); }
        .kd-cta-btn-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid rgba(255,255,255,.35); transition: background .2s;
        }
        .kd-cta-btn-sec:hover { background: rgba(255,255,255,.1); }
        .kd-form-hint {
          font: 400 11.5px/1.5 'Poppins',sans-serif;
          color: rgba(255,255,255,.4); margin-top: 16px; font-style: italic;
        }

        /* RESPONSIVE */
        @media(max-width:1024px) {
          .kd-offering-grid { grid-template-columns: 1fr 1fr; }
        }
        @media(max-width:768px) {
          .kd-hero { grid-template-columns: 1fr; min-height: auto; }
          .kd-hero-text { padding: 50px 5vw 32px; order: 2; }
          .kd-hero-img-wrap { order: 1; height: 55vw; min-height: 280px; }
          .kd-hero-fade { background: linear-gradient(to bottom, transparent 60%, var(--c-bg) 100%); }
          .kd-hero-btns { flex-direction: column; }
          .kd-btn-pri, .kd-btn-sec { width: 100%; justify-content: center; }
          .kd-shell { padding: 50px 5vw; }
          .kd-alt-inner { padding: 50px 5vw; }
          .kd-offering-grid { grid-template-columns: 1fr; }
          .kd-cta-wrap { padding: 40px 24px; }
          .kd-form-fields { grid-template-columns: 1fr; }
          .kd-cta-btns { flex-direction: column; align-items: center; }
          .kd-cta-btn-pri, .kd-cta-btn-sec { width: 100%; justify-content: center; }
        }
      `}</style>

      <PageMeta
        title="Kids Outfit Boutique in Bangalore | Customized Kids Wear"
        description="Customized kids outfits in Bangalore designed for comfort, movement, and special occasions with premium fabrics and boutique finishing at Shrusara Fashion Boutique."
        canonicalPath="/kids-outfits-bangalore"
      />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="kd-hero">
        <div className="kd-hero-text">
          <p className="kd-eyebrow">Kids Outfits · Bangalore</p>
          <h1 className="kd-hero-h1">
            Kids Outfits in Bangalore
            <span>Designed for Comfort &amp; Celebration</span>
          </h1>
          <p className="kd-hero-sub">
            Customized kids outfits designed with comfort, premium fabrics,
            and perfect finishing for special occasions.
          </p>
          <div className="kd-hero-btns">
            <a href={DEFAULT_WA_LINK} target="_blank" rel="noopener noreferrer" className="kd-btn-pri">
              <WaIcon size={18} /> Order on WhatsApp
            </a>
            <a href={TEL_LINK} className="kd-btn-sec">
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>
        <div className="kd-hero-img-wrap">
          <img
            src="/videos/kidshero.webp"
            alt="Kids outfits Bangalore – Shrusara Fashion Boutique"
            className="kd-hero-img"
          />
          <div className="kd-hero-fade" />
        </div>
      </section>

      {/* ── 2. OFFERING ─────────────────────────────────────────────────────── */}
      <Reveal className="kd-shell">
        <p className="kd-sec-eyebrow">What We Design</p>
        <h2 className="kd-sec-h2">What We Design for Kids</h2>
        <p className="kd-sec-sub">
          Every piece is crafted keeping your child's comfort and the occasion in mind.
        </p>
        <div className="kd-offering-grid">
          {offeringItems.map(item => (
            <article key={item.number} className="kd-offering-card" data-num={item.number}>
              <span className="kd-offering-num">{item.number}</span>
              <h3 className="kd-offering-title">{item.title}</h3>
              <p className="kd-offering-desc">{item.description}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── 3. GALLERY ──────────────────────────────────────────────────────── */}
{/* ── 3. GALLERY ──────────────────────────────────────────────────────── */}
      {(galleryImages.length > 0 || galleryLoading) && (
        <div className="kd-alt">
          <div className="kd-alt-inner">
            <p className="kd-sec-eyebrow">Gallery</p>
            <h2 className="kd-sec-h2">Kids Outfit Collection</h2>
            <p className="kd-sec-sub">
              A mix of custom designed and ready boutique styles for kids.
            </p>
            <div style={{ marginTop: 36 }}>
              <ImageGrid
                images={galleryImages}
                loading={galleryLoading}
                priority
                columnsClassName="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
              />
            </div>
            <p className="kd-gallery-note">
              Showing our latest kids outfits · Updated regularly with new work
            </p>
          </div>
        </div>
      )}

      {/* ── 4. TRUST LINE ───────────────────────────────────────────────────── */}
      <Reveal className="kd-shell">
        <div className="kd-trust-line">
          <span className="kd-trust-icon">✦</span>
          <p className="kd-trust-text">
            Every outfit is designed keeping comfort, movement and occasion styling in mind.
          </p>
          <span className="kd-trust-icon">✦</span>
        </div>
      </Reveal>

      {/* ── 5. CTA WITH PREFILL FORM ────────────────────────────────────────── */}
      <div className="kd-shell" style={{ paddingTop: 0 }}>
        <div className="kd-cta-wrap">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <p className="kd-cta-eyebrow">Consultation</p>
          </div>
          <h2 className="kd-cta-h">Order Customized Kids Outfits on WhatsApp</h2>
          <p className="kd-cta-sub">
            Share age, occasion, preferred colors and design ideas to get started.
          </p>
          <KidsCtaForm />
        </div>
      </div>
    </>
  );
}