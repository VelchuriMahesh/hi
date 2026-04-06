import { useEffect, useState } from 'react';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import ReviewsSection from '../components/ReviewsSection';
import VideoCard from '../components/VideoCard';
import { fallbackReviews } from '../data/content';
import useHeroMedia from '../hooks/useHeroMedia';
import { fetchReviews } from '../services/api';
import { fetchVideos } from '../services/cms';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919741827558';
const PHONE_NUMBER    = import.meta.env.VITE_PHONE_NUMBER    || '9741827558';
const TEL_LINK        = `tel:${PHONE_NUMBER}`;

const CONSULT_WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi, I would like to book a design consultation at Shrusara Fashion Boutique. Please share available slots.'
)}`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const differentiators = [
  'Customized Fit for Every Body Type',
  'Premium Maggam & Aari Work',
  'Personally Guided Design Process',
  'Focus on Finishing & Detail',
  'On-Time Delivery Commitment',
];

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    description:
      'We begin by understanding your occasion, body type, preferences, and design vision. Chief Designer Shruthi Ajith personally guides every consultation.',
  },
  {
    step: '02',
    title: 'Design Finalization',
    description:
      'Silhouette, fabric, embellishments, and handwork are finalized together — ensuring every detail reflects your style and occasion requirement.',
  },
  {
    step: '03',
    title: 'Trial & Perfect Fit',
    description:
      'Trials are carefully scheduled around your event timeline. Final delivery is planned so your outfit is ready well before your special day.',
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

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15" aria-hidden="true">
    <path d="M5 12l4.2 4.2L19 6.5" />
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  const { media: heroMedia }                = useHeroMedia('about');
  const [reviews, setReviews]               = useState(fallbackReviews);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // ── Dynamic videos from admin (Dashboard → fetchVideos → page='about') ──
  const [videos, setVideos]           = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Fetch reviews and videos in parallel
    Promise.allSettled([fetchReviews(), fetchVideos()]).then(
      ([reviewsResult, videosResult]) => {
        if (!mounted) return;

        if (
          reviewsResult.status === 'fulfilled' &&
          reviewsResult.value.reviews?.length
        ) {
          setReviews(reviewsResult.value);
        }

        if (videosResult.status === 'fulfilled') {
          // Filter only videos the admin tagged to the 'about' page
          const aboutVideos = (videosResult.value || []).filter(v => {
            const page = String(v.page || v.section || 'about').trim().toLowerCase();
            return page === 'about';
          });
          setVideos(aboutVideos);
        }

        setReviewsLoading(false);
        setVideosLoading(false);
      }
    );

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
          --c-muted:     #7A6A60;
          --c-white:     #FFFFFF;
          --r-lg:        24px;
          --r-sm:        14px;
        }
        body { background: var(--c-bg); }

        /* ── HERO ── */
        .ab-hero {
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: 88vh; align-items: center;
          background: var(--c-bg); position: relative; overflow: hidden;
        }
        .ab-hero::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 55% 65% at 28% 50%, rgba(200,169,106,.09) 0%, transparent 70%);
        }
        .ab-hero-text { padding: 80px 40px 80px 5vw; z-index: 2; }
        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 18px;
        }
        .ab-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--c-accent); display: block; }
        .ab-hero-h1 {
          font: 700 clamp(1.9rem,3.2vw,2.8rem)/1.2 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 20px;
        }
        .ab-hero-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: var(--c-muted); max-width: 440px; margin-bottom: 10px;
        }
        .ab-hero-designer {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 12px/1 'Poppins',sans-serif; color: var(--c-primary);
          margin-bottom: 32px;
        }
        .ab-hero-designer::before { content: '✦'; color: var(--c-accent); font-size: 10px; }
        .ab-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .ab-btn-pri {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-primary); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-primary); transition: box-shadow .25s, transform .2s;
        }
        .ab-btn-pri:hover { box-shadow: 0 0 0 4px rgba(62,44,35,.15), 0 6px 24px rgba(62,44,35,.25); transform: translateY(-1px); }
        .ab-btn-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--c-primary);
          font: 600 13px/1 'Poppins',sans-serif; padding: 14px 28px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-primary); transition: background .2s, color .2s;
        }
        .ab-btn-sec:hover { background: var(--c-primary); color: #fff; }
        .ab-hero-img-wrap { position: relative; height: 88vh; overflow: hidden; }
        .ab-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .ab-hero-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to right, var(--c-bg) 0%, transparent 16%);
        }

        /* ── SHELLS ── */
        .ab-shell { max-width: 1280px; margin: 0 auto; padding: 80px 5vw; }
        .ab-alt { background: var(--c-secondary); }
        .ab-alt-inner { max-width: 1280px; margin: 0 auto; padding: 80px 5vw; }

        /* ── SECTION HEADINGS ── */
        .ab-sec-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 14px;
        }
        .ab-sec-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .ab-sec-h2 {
          font: 700 clamp(1.6rem,2.6vw,2.3rem)/1.25 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 12px;
        }
        .ab-sec-sub { font: 400 .95rem/1.75 'Poppins',sans-serif; color: var(--c-muted); max-width: 600px; }

        /* ── FOUNDER ── */
        .ab-founder-grid {
          display: grid; grid-template-columns: 1fr 1.3fr; gap: 56px;
          align-items: center; margin-top: 40px;
        }
        .ab-founder-img-wrap {
          position: relative; border-radius: 28px; overflow: hidden;
          aspect-ratio: 4/5; background: var(--c-secondary);
          box-shadow: 0 8px 40px rgba(62,44,35,.14);
        }
        .ab-founder-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        .ab-founder-badge {
          position: absolute; bottom: 24px; left: 24px;
          background: var(--c-primary); color: #fff;
          border-radius: 16px; padding: 14px 20px;
          box-shadow: 0 4px 20px rgba(62,44,35,.3);
        }
        .ab-founder-badge-name { font: 700 14px/1 'Playfair Display',serif; color: #fff; margin-bottom: 4px; }
        .ab-founder-badge-role { font: 500 11px/1 'Poppins',sans-serif; color: var(--c-accent); letter-spacing: .08em; }
        .ab-founder-content { display: flex; flex-direction: column; justify-content: center; }
        .ab-founder-body {
          font: 400 1rem/1.85 'Poppins',sans-serif; color: var(--c-muted); margin-bottom: 16px;
        }
        .ab-founder-sig {
          display: inline-flex; align-items: center; gap: 10px;
          font: 600 13px/1 'Poppins',sans-serif; color: var(--c-primary);
        }
        .ab-founder-sig::before { content: '✦'; color: var(--c-accent); font-size: 11px; }

        /* ── DIFFERENTIATORS ── */
        .ab-diff-grid {
          display: grid; grid-template-columns: repeat(5,1fr); gap: 16px; margin-top: 36px;
        }
        .ab-diff-item {
          background: var(--c-white); border-radius: var(--r-lg); padding: 24px 20px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
          display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px;
        }
        .ab-diff-icon {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(200,169,106,.12); display: flex; align-items: center;
          justify-content: center; color: var(--c-accent); flex-shrink: 0;
        }
        .ab-diff-text { font: 600 .82rem/1.5 'Poppins',sans-serif; color: var(--c-primary); }

        /* ── PROCESS ── */
        .ab-process-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 40px; }
        .ab-process-card {
          background: var(--c-white); border-radius: var(--r-lg); padding: 32px 28px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
          position: relative; overflow: hidden;
        }
        .ab-process-card::before {
          content: attr(data-step); position: absolute; top: -10px; right: 16px;
          font: 700 5rem/1 'Playfair Display',serif; color: rgba(200,169,106,.1); pointer-events: none;
        }
        .ab-process-step {
          display: inline-block; font: 700 11px/1 'Poppins',sans-serif;
          letter-spacing: .15em; text-transform: uppercase; color: var(--c-accent); margin-bottom: 16px;
        }
        .ab-process-title { font: 700 1.2rem/1.25 'Playfair Display',serif; color: var(--c-primary); margin-bottom: 12px; }
        .ab-process-desc { font: 400 .87rem/1.7 'Poppins',sans-serif; color: var(--c-muted); }

        /* ── VIDEOS ── */
        .ab-videos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 36px; }
        .ab-videos-empty {
          background: var(--c-white); border-radius: var(--r-lg); padding: 32px 28px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 2px 16px rgba(62,44,35,.07);
          font: 400 .9rem/1.6 'Poppins',sans-serif; color: var(--c-muted);
        }
        .ab-videos-skeleton {
          border-radius: var(--r-lg); aspect-ratio: 16/9;
          background: linear-gradient(90deg, var(--c-secondary) 25%, #ddd5cb 50%, var(--c-secondary) 75%);
          background-size: 200% 100%; animation: ab-shimmer 1.4s infinite;
        }
        @keyframes ab-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* ── TRUST ── */
        .ab-trust-wrap {
          background: var(--c-white); border-radius: 28px; padding: 40px 36px;
          border: 1px solid rgba(62,44,35,.06); box-shadow: 0 4px 24px rgba(62,44,35,.07);
        }
        .ab-trust-stat {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--c-primary); color: #fff;
          font: 700 14px/1 'Poppins',sans-serif;
          padding: 12px 24px; border-radius: 50px; margin-bottom: 32px;
        }
        .ab-trust-stat-stars { color: var(--c-accent); letter-spacing: 2px; font-size: 13px; }

        /* ── FINAL CTA ── */
        .ab-cta-wrap {
          background: var(--c-primary); border-radius: 32px; padding: 64px 56px;
          text-align: center; position: relative; overflow: hidden;
        }
        .ab-cta-wrap::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,169,106,.12) 0%, transparent 70%);
        }
        .ab-cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 20px;
        }
        .ab-cta-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .ab-cta-eyebrow::after  { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .ab-cta-h {
          font: 700 clamp(1.6rem,2.8vw,2.4rem)/1.2 'Playfair Display',serif;
          color: #fff; margin-bottom: 14px;
        }
        .ab-cta-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: rgba(255,255,255,.75); max-width: 480px; margin: 0 auto 12px;
        }
        .ab-cta-scarcity {
          display: inline-flex; align-items: center; gap: 6px;
          font: 500 12px/1 'Poppins',sans-serif; color: rgba(255,255,255,.5);
          margin-bottom: 36px;
        }
        .ab-cta-scarcity::before { content: '⚑'; font-size: 11px; }
        .ab-cta-btns { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; position: relative; z-index: 1; }
        .ab-cta-btn-pri {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-accent); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-accent); transition: box-shadow .2s, transform .2s;
        }
        .ab-cta-btn-pri:hover { box-shadow: 0 0 0 4px rgba(200,169,106,.3); transform: translateY(-1px); }
        .ab-cta-btn-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid rgba(255,255,255,.35); transition: background .2s;
        }
        .ab-cta-btn-sec:hover { background: rgba(255,255,255,.1); }

        /* ── RESPONSIVE ── */
        @media(max-width:1200px) { .ab-diff-grid { grid-template-columns: repeat(3,1fr); } }
        @media(max-width:1024px) {
          .ab-founder-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
          .ab-process-grid { grid-template-columns: 1fr 1fr; }
          .ab-videos-grid { grid-template-columns: 1fr; }
        }
        @media(max-width:768px) {
          .ab-hero { grid-template-columns: 1fr; min-height: auto; }
          .ab-hero-text { padding: 50px 5vw 32px; order: 2; }
          .ab-hero-img-wrap { order: 1; height: 55vw; min-height: 280px; }
          .ab-hero-fade { background: linear-gradient(to bottom, transparent 60%, var(--c-bg) 100%); }
          .ab-hero-btns { flex-direction: column; }
          .ab-btn-pri, .ab-btn-sec { width: 100%; justify-content: center; }
          .ab-shell { padding: 50px 5vw; }
          .ab-alt-inner { padding: 50px 5vw; }
          .ab-founder-grid { grid-template-columns: 1fr; gap: 32px; }
          .ab-founder-img-wrap { aspect-ratio: 3/2; }
          .ab-diff-grid { grid-template-columns: 1fr 1fr; }
          .ab-process-grid { grid-template-columns: 1fr; }
          .ab-cta-wrap { padding: 40px 24px; }
          .ab-cta-btns { flex-direction: column; align-items: center; }
          .ab-cta-btn-pri, .ab-cta-btn-sec { width: 100%; justify-content: center; }
        }
        @media(max-width:480px) { .ab-diff-grid { grid-template-columns: 1fr; } }
      `}</style>

      <PageMeta
  title="About Shrusara Fashion Boutique | Bridal Designer in Bangalore"
  description="Learn about Shrusara Fashion Boutique, a Bangalore-based bridal and designer boutique led by Chief Designer Shruthi Ajith, specializing in customized outfits with perfect fit and premium finishing."
  canonicalPath="/about-shrusara-boutique"
/>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="ab-hero">
        <div className="ab-hero-text">
          <p className="ab-eyebrow">About Shrusara · Bangalore</p>
          <h1 className="ab-hero-h1">
            A Bridal &amp; Designer Boutique Built on Craftsmanship, Fit &amp; Trust
          </h1>
          <p className="ab-hero-sub">
            Shrusara Fashion Boutique is a Bangalore based designer boutique specializing in
            customized bridal blouses and outfits with premium handwork, precise fitting, and
            personalized styling.
          </p>
          <p className="ab-hero-designer">Designed personally by Chief Designer Shruthi Ajith</p>
          <div className="ab-hero-btns">
            <a href={CONSULT_WA_LINK} target="_blank" rel="noopener noreferrer" className="ab-btn-pri">
              <WaIcon size={18} /> Book Consultation on WhatsApp
            </a>
            <a href={TEL_LINK} className="ab-btn-sec">
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>
       <div className="ab-hero-img-wrap">
  <video
    src="/videos/about-hero.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="ab-hero-img"
  />
  <div className="ab-hero-fade" />
</div>
      </section>

      {/* ── 2. FOUNDER ──────────────────────────────────────────────────────── */}
      <Reveal className="ab-shell">
        <p className="ab-sec-eyebrow">The Designer Behind Shrusara</p>
        <h2 className="ab-sec-h2">Meet Our Chief Designer – Shruthi Ajith</h2>
        <div className="ab-founder-grid">
          <div className="ab-founder-img-wrap">
            <img
  src="/videos/shruthi-ajith.jpeg"
  alt="Shruthi Ajith – Chief Designer, Shrusara Fashion Boutique"
  className="ab-founder-img"
/>
            <div className="ab-founder-badge">
              <p className="ab-founder-badge-name">Shruthi Ajith</p>
              <p className="ab-founder-badge-role">Chief Designer &amp; Founder</p>
            </div>
          </div>
          <div className="ab-founder-content">
            <p className="ab-founder-body">
              Shruthi Ajith, founder and chief designer of Shrusara Fashion Boutique, brings
              deep expertise in fashion designing with a strong focus on customized bridal and
              designer wear.
            </p>
            <p className="ab-founder-body">
              She personally works with every client to understand their body type, style
              preferences, and occasion requirements. From design selection to final fitting,
              every outfit is guided with attention to detail — ensuring perfect fit and
              premium finishing.
            </p>
            <p className="ab-founder-sig">Shruthi Ajith, Chief Designer</p>
          </div>
        </div>
      </Reveal>

      {/* ── 3. DIFFERENTIATORS ──────────────────────────────────────────────── */}
      <div className="ab-alt">
        <div className="ab-alt-inner">
          <p className="ab-sec-eyebrow">Why Shrusara</p>
          <h2 className="ab-sec-h2">Why Brides Choose Shrusara</h2>
          <p className="ab-sec-sub">
            A boutique experience designed to feel personal, precise, and premium at every step.
          </p>
          <div className="ab-diff-grid">
            {differentiators.map(item => (
              <div key={item} className="ab-diff-item">
                <div className="ab-diff-icon"><CheckIcon /></div>
                <p className="ab-diff-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. PROCESS ──────────────────────────────────────────────────────── */}
      <Reveal className="ab-shell">
        <p className="ab-sec-eyebrow">Our Approach</p>
        <h2 className="ab-sec-h2">Our Approach to Every Design</h2>
        <p className="ab-sec-sub">
          Every outfit at Shrusara is designed with a structured approach — starting from
          understanding your requirement, guiding you through design selection, and ensuring
          perfect fitting through trials.
        </p>
        <div className="ab-process-grid">
          {processSteps.map(step => (
            <article key={step.step} className="ab-process-card" data-step={step.step}>
              <span className="ab-process-step">Step {step.step}</span>
              <h3 className="ab-process-title">{step.title}</h3>
              <p className="ab-process-desc">{step.description}</p>
            </article>
          ))}
        </div>
      </Reveal>

      {/* ── 5. VIDEOS (dynamic — admin uploads via Dashboard) ───────────────── */}
      {(videosLoading || videos.length > 0) && (
        <div className="ab-alt">
          <div className="ab-alt-inner">
            <p className="ab-sec-eyebrow">Client Stories</p>
            <h2 className="ab-sec-h2">Boutique Moments from Our Clients</h2>
            <p className="ab-sec-sub">
              Testimonial videos shared by brides and clients who experienced Shrusara.
            </p>
            <div className="ab-videos-grid">
              {videosLoading
                ? [1, 2].map(i => <div key={i} className="ab-videos-skeleton" />)
                : videos.map(video => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onOpen={item => window.open(item.url, '_blank', 'noopener,noreferrer')}
                    />
                  ))
              }
            </div>
          </div>
        </div>
      )}

      {/* ── 6. TRUST / SOCIAL PROOF ─────────────────────────────────────────── */}
      <div className={videos.length > 0 ? 'ab-shell' : 'ab-alt'}>
        <div className={videos.length > 0 ? '' : 'ab-alt-inner'}>
          <Reveal className={videos.length > 0 ? '' : undefined}>
            <p className="ab-sec-eyebrow">Trusted by Brides</p>
            <h2 className="ab-sec-h2">Trusted by Brides Across Bangalore</h2>
            <p className="ab-sec-sub">100+ happy clients with consistent quality and service.</p>
            <div className="ab-trust-wrap" style={{ marginTop: 36 }}>
              <div className="ab-trust-stat">
                <span className="ab-trust-stat-stars">★★★★★</span>
                100+ Happy Clients in Bangalore
              </div>
              <ReviewsSection
                payload={reviews}
                loading={reviewsLoading}
                description="Real experiences from brides and clients who trusted Shrusara for their special occasions."
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 7. FINAL CTA ────────────────────────────────────────────────────── */}
      <div className="ab-shell" style={{ paddingTop: 0 }}>
        <div className="ab-cta-wrap">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <p className="ab-cta-eyebrow">Start Your Consultation</p>
          </div>
          <h2 className="ab-cta-h">Start Your Design Consultation Today</h2>
          <p className="ab-cta-sub">
            Share your requirement and our Chief Designer Shruthi Ajith will guide you with
            the right design and fit.
          </p>
          <p className="ab-cta-scarcity">Limited consultation slots available</p>
          <div className="ab-cta-btns">
            <a href={CONSULT_WA_LINK} target="_blank" rel="noopener noreferrer" className="ab-cta-btn-pri">
              <WaIcon size={18} /> WhatsApp Consultation
            </a>
            <a href={TEL_LINK} className="ab-cta-btn-sec">
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}