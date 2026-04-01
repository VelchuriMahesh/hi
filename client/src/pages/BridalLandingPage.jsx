import React from 'react';

/**
 * SHRUSARA BRIDAL LANDING PAGE
 * Converted from HTML to React
 */

const BridalLandingPage = () => {
  const WHATSAPP_URL = "https://wa.me/919741827558?text=Hi%2C%20I%20am%20looking%20for%20a%20customized%20bridal%20outfit.%20My%20wedding%20date%20is%20%5Bdate%5D.%20I%20need%20consultation%20for%20blouse%20%2F%20lehenga%20%2F%20gown.%20I%20would%20like%20to%20consult%20with%20Chief%20Designer%20Shruthi%20Ajith.";
  const PHONE_NUMBER = "+919741827558";

  return (
    <>
      <style>{`
        :root {
          --gold: #B8935A;
          --gold-light: #D4B483;
          --gold-pale: #F5EDD9;
          --dark: #1C1410;
          --warm: #2E2016;
          --cream: #FBF8F3;
          --text: #3A2E25;
          --muted: #7A6A5A;
          --white: #FFFFFF;
        }

        .bridal-body {
          font-family: 'Jost', sans-serif;
          background: var(--cream);
          color: var(--text);
          overflow-x: hidden;
        }

        /* HEADER */
        .hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(251,248,243,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(184,147,90,0.15);
          padding: 0 5vw;
          display: flex; align-items: center; justify-content: space-between;
          height: 80px;
        }
        .hdr-brand { display: flex; flex-direction: column; gap: 1px; }
        .hdr-name { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 700; color: var(--dark); letter-spacing: .03em; line-height: 1; }
        .hdr-sub { font-size: .6rem; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); font-weight: 500; }
        .hdr-badge { display: flex; align-items: center; gap: 6px; font-size: .6rem; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); font-weight: 500; }
        .hdr-badge span { width: 6px; height: 6px; border-radius: 50%; background: #4CAF50; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
        .hdr-cta {
          background: var(--dark); color: var(--white);
          font-size: .65rem; font-weight: 600; letter-spacing: .2em; text-transform: uppercase;
          padding: 12px 24px; border: none; cursor: pointer; text-decoration: none;
          transition: background .2s;
        }
        .hdr-cta:hover { background: var(--gold); }

        /* HERO */
        .hero {
          min-height: 90vh;
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 60px 5vw;
          gap: 60px;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute;
          top: -20%; right: -10%;
          width: 50vw; height: 130%;
          background: radial-gradient(ellipse, rgba(184,147,90,.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-text { z-index: 2; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: .65rem; letter-spacing: .25em; text-transform: uppercase;
          color: var(--gold); font-weight: 600; margin-bottom: 22px;
        }
        .hero-eyebrow::before { content: ''; width: 30px; height: 1px; background: var(--gold); }
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 700; line-height: 1.1;
          color: var(--dark); margin-bottom: 8px;
        }
        .hero-h1 em { font-style: italic; color: var(--gold); }
        .hero-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 2.2vw, 1.9rem);
          font-weight: 400; font-style: italic;
          color: var(--muted); margin-bottom: 22px; line-height: 1.3;
        }
        .hero-sub {
          font-size: .88rem; line-height: 1.85; color: var(--muted);
          max-width: 440px; margin-bottom: 6px; font-weight: 300;
        }
        .hero-designer {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: .7rem; font-weight: 600; letter-spacing: .08em;
          color: var(--dark); margin-bottom: 10px;
        }
        .hero-designer::before { content: '✦'; color: var(--gold); font-size: .7rem; }
        .hero-price { font-size: .75rem; color: var(--muted); margin-bottom: 36px; }
        .hero-price strong { color: var(--dark); font-weight: 700; }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        
        .btn-wa {
          display: inline-flex; align-items: center; gap: 9px;
          background: #25D366; color: var(--white);
          font-size: .7rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
          padding: 15px 28px; text-decoration: none;
          border: 2px solid #25D366;
          transition: transform .2s, box-shadow .2s;
        }
        .btn-wa:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,211,102,.3); }
        .btn-call {
          display: inline-flex; align-items: center; gap: 9px;
          background: transparent; color: var(--dark);
          font-size: .7rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase;
          padding: 15px 28px; text-decoration: none;
          border: 2px solid var(--dark);
          transition: background .2s, color .2s;
        }
        .btn-call:hover { background: var(--dark); color: var(--white); }

        /* Hero image */
        .hero-img-wrap { position: relative; }
        .hero-img-frame {
          position: relative;
          border-radius: 50% 50% 0 0;
          overflow: hidden;
          aspect-ratio: 4/5;
          border: 12px solid var(--white);
          box-shadow: 0 20px 60px rgba(28,20,16,.18);
        }
        .hero-img-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .hero-badge {
          position: absolute; bottom: 40px; left: -20px;
          background: var(--dark); color: var(--white);
          padding: 16px 20px;
          box-shadow: 0 8px 32px rgba(28,20,16,.3);
          text-align: center; min-width: 130px;
        }
        .hero-badge-num { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: var(--gold); line-height: 1; }
        .hero-badge-txt { font-size: .55rem; letter-spacing: .18em; text-transform: uppercase; opacity: .8; margin-top: 4px; }

        /* TRUST BAR */
        .trust { padding: 60px 5vw; background: var(--white); border-top: 1px solid rgba(184,147,90,.12); }
        .trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(184,147,90,.12); }
        .trust-item { background: var(--white); padding: 32px 28px; display: flex; align-items: flex-start; gap: 16px; }
        .trust-icon { width: 40px; height: 40px; border-radius: 50%; background: var(--gold-pale); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem; }
        .trust-label { font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 6px; }
        .trust-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
        .trust-desc { font-size: .78rem; color: var(--muted); line-height: 1.6; font-weight: 300; }

        /* GALLERY */
        .gallery { padding: 80px 5vw; background: var(--cream); }
        .sec-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: .62rem; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 14px; }
        .sec-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--gold); }
        .sec-h { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.6rem, 2.8vw, 2.4rem); font-weight: 700; color: var(--dark); margin-bottom: 10px; line-height: 1.2; }
        .sec-sub { font-size: .85rem; color: var(--muted); line-height: 1.75; max-width: 500px; font-weight: 300; }
        .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 40px; }
        .gallery-card { overflow: hidden; background: var(--gold-pale); position: relative; }
        .gallery-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
        .gallery-card:hover img { transform: scale(1.06); }
        .gallery-tag { position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 12px 12px; background: linear-gradient(to top, rgba(28,20,16,.65), transparent); font-size: .6rem; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.9); font-weight: 600; }

        /* DESIGNER */
        .designer { padding: 80px 5vw; background: var(--dark); color: var(--white); }
        .designer-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 2fr; gap: 60px; align-items: center; }
        .designer-accent { position: relative; padding: 40px; border: 1px solid rgba(184,147,90,.3); }
        .designer-accent::before { content: ''; position: absolute; top: -1px; left: 40px; right: 40px; height: 2px; background: var(--gold); }
        .designer-name { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 700; color: var(--white); margin-bottom: 6px; }
        .designer-role { font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); font-weight: 600; }
        .designer-text { font-size: 1.05rem; line-height: 1.9; color: rgba(255,255,255,.75); font-weight: 300; font-family: 'Cormorant Garamond', serif; font-style: italic; }

        /* REVIEWS */
        .reviews { padding: 80px 5vw; background: var(--white); }
        .reviews-badge { display: inline-flex; align-items: center; gap: 10px; background: var(--dark); color: var(--white); font-size: .65rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; padding: 10px 22px; margin-bottom: 40px; }
        .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .review-card { background: var(--cream); padding: 32px 28px; border: 1px solid rgba(184,147,90,.12); position: relative; }

        /* CTA */
        .cta-wrap { padding: 80px 5vw; background: var(--cream); }
        .cta-box { background: var(--dark); padding: 72px 60px; text-align: center; position: relative; overflow: hidden; max-width: 900px; margin: 0 auto; }
        .cta-h { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 700; color: var(--white); margin-bottom: 14px; }
        .cta-btn-pri { display: inline-flex; align-items: center; gap: 9px; background: var(--gold); color: var(--white); font-size: .7rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; padding: 16px 32px; text-decoration: none; transition: transform .2s; }

        /* FLOATING */
        .float-wa { position: fixed; bottom: 28px; right: 24px; z-index: 200; }
        .float-wa a { display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; border-radius: 50%; background: #25D366; color: var(--white); box-shadow: 0 6px 28px rgba(37,211,102,0.45); position: relative; }
        .float-wa a::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #25D366; opacity: .6; animation: ring 2s infinite; }
        @keyframes ring { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(1.7); opacity: 0; } }

        @media(max-width:900px){
          .hero { grid-template-columns: 1fr; gap: 40px; }
          .trust-grid, .reviews-grid, .gallery-grid { grid-template-columns: 1fr; }
          .designer-inner { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="bridal-body">
        {/* HEADER */}
        <header className="hdr">
          <div className="hdr-brand">
            <div className="hdr-name">Shrusara</div>
            <div className="hdr-sub">Fashion Boutique, Bangalore</div>
          </div>
          <div className="hdr-badge">
            <span /> Bangalore's Bridal Studio
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hdr-cta">
            Book Consultation
          </a>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            <p className="hero-eyebrow">Bridal Specialist · Bangalore</p>
            <h1 className="hero-h1">Exquisite Bridal Blouses<br />in <em>Bangalore</em></h1>
            <h2 className="hero-h2">Designed for Your Big Day</h2>
            <p className="hero-sub">Customized bridal blouses with perfect fit, premium maggam & aari work, and complete bridal outfit guidance including lehengas and gowns.</p>
            <p className="hero-designer">Designed personally by Chief Designer Shruthi Ajith</p>
            <p className="hero-price">Bridal blouses starting from <strong>₹6,000</strong></p>
            <div className="hero-btns">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp Enquiry
              </a>
              <a href={`tel:${PHONE_NUMBER}`} className="btn-call">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                Call Now
              </a>
            </div>
          </div>
          <div className="hero-img-wrap">
            <div className="hero-img-frame">
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800" alt="Bridal blouse by Shrusara" />
            </div>
            <div className="hero-badge">
              <div className="hero-badge-num">100+</div>
              <div className="hero-badge-txt">Happy Brides</div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="trust">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">✦</div>
              <div>
                <p className="trust-label">Craftsmanship</p>
                <p className="trust-title">Premium Maggam Work</p>
                <p className="trust-desc">Intricate handcrafted embroidery for every bridal outfit.</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">◈</div>
              <div>
                <p className="trust-label">Fit Promise</p>
                <p className="trust-title">Perfect Fit</p>
                <p className="trust-desc">Pattern and measurements tailored precisely to your body.</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">◷</div>
              <div>
                <p className="trust-label">Reliability</p>
                <p className="trust-title">On-Time Delivery</p>
                <p className="trust-desc">Delivery planned well before your special day, every time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery">
          <p className="sec-eyebrow">Gallery</p>
          <h2 className="sec-h">Bridal Masterpieces</h2>
          <div className="gallery-grid">
            {[
              "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600",
              "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600",
              "https://images.unsplash.com/photo-1631215105212-0761e0996841?q=80&w=600",
              "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600"
            ].map((img, idx) => (
              <div key={idx} className="gallery-card">
                <img src={img} alt={`Design ${idx}`} />
                <div className="gallery-tag">Premium Collection</div>
              </div>
            ))}
          </div>
        </section>

        {/* DESIGNER TRUST */}
        <section className="designer">
          <div className="designer-inner">
            <div className="designer-accent">
              <p className="designer-role">Chief Designer</p>
              <p className="designer-name">Shruthi Ajith</p>
              <div style={{ marginTop: '15px', color: 'var(--gold)' }}>★★★★★</div>
            </div>
            <p className="designer-text">
              "Every bridal outfit at Shrusara is personally guided by me to ensure the perfect fit and exquisite finishing. Your dream wedding deserves nothing less than perfection."
            </p>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews">
          <div className="reviews-badge">★★★★★ 100+ Happy Brides</div>
          <div className="reviews-grid">
            <div className="review-card">
              <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"The fit was like a second skin. Best bridal studio in Bangalore!"</p>
              <strong>Priya Rao</strong>
            </div>
            <div className="review-card">
              <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"Highly professional service and timely delivery."</p>
              <strong>Meghana V.</strong>
            </div>
            <div className="review-card">
              <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"They made my Pinterest dream a reality!"</p>
              <strong>Kavya Ramesh</strong>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="cta-wrap">
          <div className="cta-box">
            <h2 className="cta-h">Ready to Design Your Dream Outfit?</h2>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
              <a href={WHATSAPP_URL} className="cta-btn-pri">WhatsApp Enquiry</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: '40px', textAlign: 'center', background: '#fff', borderTop: '1px solid #eee' }}>
          <p className="hdr-name">Shrusara Fashion Boutique</p>
          <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '10px' }}>© 2025 Shrusara. All rights reserved.</p>
        </footer>

        {/* FLOATING WHATSAPP */}
        <div className="float-wa">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default BridalLandingPage;