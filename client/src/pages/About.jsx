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
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 88vh;
  align-items: center;
  background: var(--c-bg);
  position: relative;
  overflow: hidden;
}
.ab-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
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
  font: 600 12px/1 'Poppins',sans-serif; color: var(--c-primary); margin-bottom: 32px;
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

/* Hero image/video wrapper — desktop */
.ab-hero-img-wrap {
  position: relative;
  height: 88vh;
  overflow: hidden;
}
.ab-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}
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

/* ── FOUNDER (legacy grid, kept for fallback) ── */
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
.ab-founder-body { font: 400 1rem/1.85 'Poppins',sans-serif; color: var(--c-muted); margin-bottom: 16px; }
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
.ab-cta-eyebrow::before, .ab-cta-eyebrow::after {
  content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block;
}
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
  font: 500 12px/1 'Poppins',sans-serif; color: rgba(255,255,255,.5); margin-bottom: 36px;
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

/* ════════════════════════════════════════════════════════════════
   ADVANCED DESIGNER SECTION  —  complete rewrite
   ════════════════════════════════════════════════════════════════ */

/* ── outer page wrapper ── */
.ab-ds-outer {
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 5vw;
}

/* ── main card ── */
.ab-designer-section {
  background: #2A1C15;
  border-radius: 40px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 420px 1fr;
  align-items: stretch;
  box-shadow:
    0 40px 80px rgba(0,0,0,.35),
    0 0 0 1px rgba(200,169,106,.12);
  position: relative;
}

/* ── decorative corner ornament ── */
.ab-designer-section::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 320px; height: 320px;
  border-radius: 0 40px 0 0;
  background: radial-gradient(ellipse at 100% 0%, rgba(200,169,106,.10) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}
.ab-designer-section::after {
  content: '';
  position: absolute;
  bottom: 0; left: 420px;
  width: 60%; height: 2px;
  background: linear-gradient(to right, rgba(200,169,106,.4) 0%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

/* ── image column ── */
.ab-designer-image-box {
  position: relative;
  overflow: hidden;
  min-height: 560px;
}
.ab-designer-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform .6s ease;
}
.ab-designer-section:hover .ab-designer-img {
  transform: scale(1.03);
}

/* gradient overlay on image — right side fade into card */
.ab-designer-img-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right,  transparent 55%, #2A1C15 100%),
    linear-gradient(to bottom, transparent 60%, rgba(0,0,0,.4) 100%);
}

/* floating years badge on image */
.ab-designer-years-badge {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(200,169,106,.18);
  border: 1px solid rgba(200,169,106,.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 10px 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  z-index: 2;
}
.ab-designer-years-badge-num {
  font: 700 1.4rem/1 'Playfair Display',serif;
  color: #C8A96A;
}
.ab-designer-years-badge-label {
  font: 500 11px/1.3 'Poppins',sans-serif;
  color: rgba(255,255,255,.75);
  letter-spacing: .04em;
}

/* ── info column ── */
.ab-designer-info-box {
  padding: 60px 56px 60px 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
}

/* top label */
.ab-designer-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #C8A96A;
  font: 600 10px/1 'Poppins',sans-serif;
  text-transform: uppercase;
  letter-spacing: .22em;
  margin-bottom: 16px;
}
.ab-designer-eyebrow::before {
  content: '';
  width: 24px;
  height: 1px;
  background: #C8A96A;
  display: block;
  flex-shrink: 0;
}

/* name */
.ab-designer-name {
  font: 700 clamp(2.2rem,3.5vw,3.2rem)/1.05 'Playfair Display',serif;
  color: #FFFFFF;
  margin: 0 0 6px;
  letter-spacing: -.01em;
}

/* role line with ornament */
.ab-designer-role-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}
.ab-designer-role-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #C8A96A;
  flex-shrink: 0;
}
.ab-designer-role {
  font: 500 .95rem/1 'Poppins',sans-serif;
  color: rgba(255,255,255,.55);
  letter-spacing: .04em;
}
.ab-designer-role-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,.08);
}

/* highlighted heritage strip */
.ab-designer-heritage {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(200,169,106,.08);
  border: 1px solid rgba(200,169,106,.22);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 28px;
}
.ab-designer-heritage-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(200,169,106,.18);
  border: 1px solid rgba(200,169,106,.35);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ab-designer-heritage-icon svg {
  width: 15px;
  height: 15px;
  color: #C8A96A;
}
.ab-designer-heritage-text {
  font: 500 .9rem/1.45 'Poppins',sans-serif;
  color: rgba(255,255,255,.85);
  margin: 0;
}
.ab-designer-heritage-text strong {
  color: #C8A96A;
  font-weight: 600;
}

/* divider */
.ab-designer-divider {
  width: 40px;
  height: 2px;
  background: linear-gradient(to right, #C8A96A, transparent);
  border-radius: 2px;
  margin-bottom: 24px;
}

/* bio paragraphs */
.ab-designer-bio {
  font: 400 .95rem/1.85 'Poppins',sans-serif;
  color: rgba(255,255,255,.72);
  margin: 0 0 16px;
}
.ab-designer-bio:last-of-type { margin-bottom: 28px; }

/* quote block */
.ab-designer-quote-wrap {
  position: relative;
  padding: 20px 24px;
  background: rgba(200,169,106,.07);
  border-radius: 12px;
  border-left: 3px solid #C8A96A;
  margin-bottom: 36px;
}
.ab-designer-quote-mark {
  font: 700 4rem/1 'Playfair Display',serif;
  color: rgba(200,169,106,.25);
  position: absolute;
  top: -8px;
  left: 16px;
  line-height: 1;
  pointer-events: none;
}
.ab-designer-quote {
  font: italic 600 1rem/1.65 'Playfair Display',serif;
  color: #C8A96A;
  margin: 0;
  position: relative;
  z-index: 1;
  padding-top: 6px;
}

/* CTA row inside designer card */
.ab-designer-cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.ab-designer-cta-pri {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #C8A96A;
  color: #2A1C15;
  font: 600 13px/1 'Poppins',sans-serif;
  padding: 13px 26px;
  border-radius: 50px;
  text-decoration: none;
  border: 2px solid #C8A96A;
  transition: box-shadow .2s, transform .2s;
}
.ab-designer-cta-pri:hover {
  box-shadow: 0 0 0 4px rgba(200,169,106,.25);
  transform: translateY(-1px);
}
.ab-designer-cta-sec {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: rgba(255,255,255,.8);
  font: 600 13px/1 'Poppins',sans-serif;
  padding: 13px 26px;
  border-radius: 50px;
  text-decoration: none;
  border: 2px solid rgba(255,255,255,.2);
  transition: border-color .2s, color .2s;
}
.ab-designer-cta-sec:hover {
  border-color: rgba(255,255,255,.45);
  color: #fff;
}

/* stats strip below designer card */
.ab-designer-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  background: #1E1310;
  border-radius: 0 0 40px 40px;
  overflow: hidden;
}
.ab-designer-stat-item {
  padding: 28px 32px;
  border-right: 1px solid rgba(255,255,255,.05);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ab-designer-stat-item:last-child { border-right: none; }
.ab-designer-stat-num {
  font: 700 2rem/1 'Playfair Display',serif;
  color: #C8A96A;
}
.ab-designer-stat-label {
  font: 500 11px/1.4 'Poppins',sans-serif;
  color: rgba(255,255,255,.45);
  text-transform: uppercase;
  letter-spacing: .1em;
}

/* Google reviews badge strip */
.ab-google-reviews-strip {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(200,169,106,.15);
}
.ab-google-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 50px;
  padding: 8px 16px 8px 10px;
}
.ab-google-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}
.ab-google-badge-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ab-google-badge-rating {
  font: 700 13px/1 'Poppins',sans-serif;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 4px;
}
.ab-google-badge-stars {
  color: #FBBC04;
  font-size: 11px;
  letter-spacing: 1px;
}
.ab-google-badge-sub {
  font: 500 10px/1 'Poppins',sans-serif;
  color: rgba(255,255,255,.45);
  letter-spacing: .04em;
}

/* ── TRUST Google badge (public section) ── */
.ab-google-reviews-public {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 28px;
  padding: 20px 28px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(62,44,35,.07);
  box-shadow: 0 2px 12px rgba(62,44,35,.06);
}
.ab-google-icon-lg {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}
.ab-google-pub-content { display: flex; flex-direction: column; gap: 4px; }
.ab-google-pub-rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ab-google-pub-num {
  font: 700 1.6rem/1 'Playfair Display',serif;
  color: var(--c-primary);
}
.ab-google-pub-stars {
  display: flex;
  align-items: center;
  gap: 2px;
}
.ab-google-pub-star {
  color: #FBBC04;
  font-size: 16px;
  line-height: 1;
}
.ab-google-pub-label {
  font: 600 13px/1 'Poppins',sans-serif;
  color: var(--c-primary);
}
.ab-google-pub-sub {
  font: 400 12px/1 'Poppins',sans-serif;
  color: var(--c-muted);
}
.ab-google-pub-divider {
  width: 1px;
  height: 44px;
  background: rgba(62,44,35,.1);
  flex-shrink: 0;
}
.ab-google-pub-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: 600 12px/1 'Poppins',sans-serif;
  color: #1a73e8;
  text-decoration: none;
  padding: 8px 16px;
  border: 1.5px solid #1a73e8;
  border-radius: 50px;
  transition: background .2s, color .2s;
}
.ab-google-pub-cta:hover {
  background: #1a73e8;
  color: #fff;
}

/* ════════════════════════════════════════════
   RESPONSIVE — single clean block, no duplicates
   ════════════════════════════════════════════ */

/* Tablet: 1200px */
@media (max-width: 1200px) {
  .ab-diff-grid { grid-template-columns: repeat(3,1fr); }
  .ab-designer-section { grid-template-columns: 360px 1fr; }
}

/* Tablet: 1024px */
@media (max-width: 1024px) {
  .ab-founder-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
  .ab-process-grid { grid-template-columns: 1fr 1fr; }
  .ab-videos-grid { grid-template-columns: 1fr; }
  .ab-designer-section { grid-template-columns: 300px 1fr; }
  .ab-designer-info-box { padding: 48px 36px; }
  .ab-designer-name { font-size: 2.4rem; }
  .ab-designer-stats-row { grid-template-columns: repeat(3,1fr); }
}

/* Tablet: 860px */
@media (max-width: 860px) {
  .ab-designer-section {
    grid-template-columns: 1fr;
    border-radius: 28px;
  }
  .ab-designer-image-box {
    min-height: 300px;
    max-height: 380px;
  }
  .ab-designer-img-overlay {
    background:
      linear-gradient(to bottom, transparent 50%, #2A1C15 100%);
  }
  .ab-designer-section::after { display: none; }
  .ab-designer-info-box { padding: 36px 32px 40px; }
  .ab-designer-stats-row { border-radius: 0 0 28px 28px; }
}

/* Mobile: 768px — THE only mobile block */
@media (max-width: 768px) {

  /* ─ HERO: video full-width on top, text below ─ */
  .ab-hero {
    display: flex;
    flex-direction: column;
    min-height: auto;
  }

  /* VIDEO WRAPPER: use a proper aspect-ratio box so it NEVER clips */
  .ab-hero-img-wrap {
    order: 1;
    width: 100%;
    height: auto;
    aspect-ratio: 9 / 14;
    min-height: 0;
    max-height: none;
    overflow: hidden;
  }

  /* video fills the portrait frame without crop */
  .ab-hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  .ab-hero-fade {
    background: linear-gradient(to bottom, transparent 55%, var(--c-bg) 100%);
  }

  .ab-hero-text {
    order: 2;
    padding: 0 6vw 48px;
    margin-top: -40px;
    background: var(--c-bg);
    position: relative;
    z-index: 10;
    border-radius: 24px 24px 0 0;
    text-align: center;
  }
  .ab-eyebrow { justify-content: center; }
  .ab-hero-h1 { font-size: clamp(1.5rem, 5vw, 1.9rem); }
  .ab-hero-sub { margin: 0 auto 16px; }
  .ab-hero-designer { justify-content: center; }
  .ab-hero-btns { flex-direction: column; gap: 10px; }
  .ab-btn-pri, .ab-btn-sec { width: 100%; justify-content: center; padding: 15px; }

  /* Shells */
  .ab-shell { padding: 48px 5vw; }
  .ab-alt-inner { padding: 48px 5vw; }

  /* Designer outer */
  .ab-ds-outer { padding: 40px 4vw; }

  /* Designer section — stacked */
  .ab-designer-section {
    grid-template-columns: 1fr;
    border-radius: 24px;
  }

  /* ── KEY FIX: tall portrait frame so the full photo is visible ── */
  .ab-designer-image-box {
    min-height: 0;
    max-height: none;
    height: auto;
    aspect-ratio: 3 / 4;   /* portrait ratio — shows full face + body */
    overflow: hidden;
  }

  /* image fills portrait frame, anchored top so face is always visible */
  .ab-designer-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  /* overlay fades bottom into card background */
  .ab-designer-img-overlay {
    background: linear-gradient(to bottom, transparent 55%, #2A1C15 100%);
  }

  .ab-designer-years-badge {
    bottom: 20px;
    padding: 8px 16px;
  }
  .ab-designer-years-badge-num { font-size: 1.1rem; }
  .ab-designer-info-box {
    padding: 28px 24px 36px;
  }
  .ab-designer-name { font-size: 1.9rem; }
  .ab-designer-role-row { margin-bottom: 20px; }
  .ab-designer-heritage { flex-direction: column; align-items: flex-start; gap: 10px; }
  .ab-designer-cta-row { flex-direction: column; }
  .ab-designer-cta-pri, .ab-designer-cta-sec {
    width: 100%;
    justify-content: center;
    padding: 15px;
  }
  .ab-google-reviews-strip { margin-top: 24px; }

  /* Stats strip */
  .ab-designer-stats-row {
    grid-template-columns: 1fr;
    border-radius: 0 0 24px 24px;
  }
  .ab-designer-stat-item {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,.05);
    padding: 20px 24px;
  }
  .ab-designer-stat-item:last-child { border-bottom: none; }

  /* Grids */
  .ab-diff-grid { grid-template-columns: 1fr 1fr; }
  .ab-founder-grid { grid-template-columns: 1fr; gap: 32px; }
  .ab-founder-img-wrap { aspect-ratio: 3/2; }
  .ab-process-grid { grid-template-columns: 1fr; }
  .ab-videos-grid { grid-template-columns: 1fr; }

  /* CTA */
  .ab-cta-wrap { padding: 40px 24px; border-radius: 20px; }
  .ab-cta-btns { flex-direction: column; align-items: center; }
  .ab-cta-btn-pri, .ab-cta-btn-sec { width: 100%; justify-content: center; }

  /* Google public badge */
  .ab-google-reviews-public { flex-direction: column; align-items: flex-start; gap: 12px; }
  .ab-google-pub-divider { display: none; }
}

@media (max-width: 480px) {
  .ab-diff-grid { grid-template-columns: 1fr; }
  .ab-trust-wrap { padding: 28px 20px; }
  /* keep portrait ratio on very small screens */
  .ab-designer-image-box { aspect-ratio: 3 / 4; }
}
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
            <a
              href={CONSULT_WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="ab-btn-pri"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'whatsapp_click', {
                    event_category: 'contact',
                    event_label: 'about_hero_whatsapp'
                  });
                }
              }}
            >
              <WaIcon size={18} /> Book Consultation on WhatsApp
            </a>
            <a
              href={TEL_LINK}
              className="ab-btn-sec"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'call_click', {
                    event_category: 'contact',
                    event_label: 'about_hero_call'
                  });
                }
              }}
            >
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>

        <div className="ab-hero-img-wrap">
          <video
            src="/videos/about.mp4"
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            className="ab-hero-img"
          />
          <div className="ab-hero-fade" />
        </div>
      </section>

      {/* ── 2. ADVANCED FOUNDER SECTION ─────────────────────────────────────── */}
      <Reveal>
        <div className="ab-ds-outer">
          {/* main two-column (or stacked mobile) card */}
          <div className="ab-designer-section">

            {/* ── left: image ── */}
            <div className="ab-designer-image-box">
              <img
                src="/videos/lead-of-shrusara.webp"
                alt="Shruthi Ajith – Founder & Chief Designer, Shrusara Fashion Boutique"
                className="ab-designer-img"
              />
              <div className="ab-designer-img-overlay" />

              {/* floating years pill */}
              <div className="ab-designer-years-badge">
                <span className="ab-designer-years-badge-num">10+</span>
                <span className="ab-designer-years-badge-label">Years of<br/>Craftsmanship</span>
              </div>
            </div>

            {/* ── right: content ── */}
            <div className="ab-designer-info-box">

              <p className="ab-designer-eyebrow">The Designer Behind Shrusara</p>

              <h2 className="ab-designer-name">Shruthi Ajith</h2>

              <div className="ab-designer-role-row">
                <span className="ab-designer-role-dot" />
                <span className="ab-designer-role">Founder &amp; Chief Designer</span>
                <span className="ab-designer-role-line" />
              </div>

              {/* highlighted heritage strip */}
              <div className="ab-designer-heritage">
                <div className="ab-designer-heritage-icon">
                  {/* needle & thread icon */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2a5 5 0 0 1 5 5c0 5-5 11-5 11S7 12 7 7a5 5 0 0 1 5-5z"/>
                    <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <p className="ab-designer-heritage-text">
                  Designing customized bridal and designer wear with precision,
                  quality and perfect fit since <strong>2015</strong>
                </p>
              </div>

              <div className="ab-designer-divider" />

              <p className="ab-designer-bio">
                Shruthi Ajith brings deep expertise in fashion designing with a strong focus
                on customized bridal and designer wear. She personally works with every client
                to understand their body type, style preferences, and occasion requirements.
              </p>

              <p className="ab-designer-bio">
                From the initial design selection to the final fitting, every outfit is guided
                with extreme attention to detail—ensuring a perfect fit and a premium finishing.
              </p>

              {/* quote */}
              <div className="ab-designer-quote-wrap">
                <span className="ab-designer-quote-mark">"</span>
                <p className="ab-designer-quote">
                  "We design your Dreams <br/>
Shruthi Ajith Founder & Chief Designer"
                </p>
              </div>

              {/* CTA buttons inside card */}
              <div className="ab-designer-cta-row">
                <a href={CONSULT_WA_LINK} target="_blank" rel="noopener noreferrer" className="ab-designer-cta-pri">
                  <WaIcon size={16} /> Book Consultation
                </a>
                <a href={TEL_LINK} className="ab-designer-cta-sec">
                  <PhoneIcon /> Call Now
                </a>
              </div>

              {/* Google reviews badge row */}
              <div className="ab-google-reviews-strip">
                <div className="ab-google-badge">
                  {/* Google G SVG */}
                  <svg className="ab-google-icon" viewBox="0 0 48 48" aria-label="Google" role="img">
                    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.6 35.4 16.3 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C36.9 36.8 44 31 44 24c0-1.3-.1-2.6-.4-3.9z"/>
                  </svg>
                  <div className="ab-google-badge-text">
                    <div className="ab-google-badge-rating">
                      5.0
                      <span className="ab-google-badge-stars">★★★★★</span>
                    </div>
                    <span className="ab-google-badge-sub">Google Rating</span>
                  </div>
                </div>
                <span style={{ font: '400 12px/1 Poppins,sans-serif', color: 'rgba(255,255,255,.4)' }}>
                  100+ happy clients across Bangalore
                </span>
              </div>

            </div>{/* end info box */}
          </div>{/* end designer-section */}

          {/* stats strip below card */}
          <div className="ab-designer-stats-row">
            <div className="ab-designer-stat-item">
              <span className="ab-designer-stat-num">250+</span>
              <span className="ab-designer-stat-label">Happy Clients</span>
            </div>
            <div className="ab-designer-stat-item">
              <span className="ab-designer-stat-num">10+</span>
              <span className="ab-designer-stat-label">Years Experience</span>
            </div>
            <div className="ab-designer-stat-item">
              <span className="ab-designer-stat-num">5.0</span>
              <span className="ab-designer-stat-label">Google Rating</span>
            </div>
          </div>

        </div>{/* end ab-ds-outer */}
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

              {/* ── Google Reviews public badge ── */}
              <div className="ab-google-reviews-public">
                <svg className="ab-google-icon-lg" viewBox="0 0 48 48" aria-label="Google" role="img">
                  <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.3C9.6 35.4 16.3 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2C36.9 36.8 44 31 44 24c0-1.3-.1-2.6-.4-3.9z"/>
                </svg>
                <div className="ab-google-pub-content">
                  <div className="ab-google-pub-rating-row">
                    <span className="ab-google-pub-num">5.0</span>
                    <div className="ab-google-pub-stars">
                      <span className="ab-google-pub-star">★</span>
                      <span className="ab-google-pub-star">★</span>
                      <span className="ab-google-pub-star">★</span>
                      <span className="ab-google-pub-star">★</span>
                      <span className="ab-google-pub-star">★</span>
                    </div>
                    <span className="ab-google-pub-label">Google Reviews</span>
                  </div>
                  <span className="ab-google-pub-sub">Based on 100+ verified reviews on Google</span>
                </div>
                <div className="ab-google-pub-divider" />
                <a
                  href="https://www.google.com/search?q=Shrusara+Fashion+Boutique+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ab-google-pub-cta"
                >
                  View on Google
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </a>
              </div>

              <div className="ab-trust-stat">
                <span className="ab-trust-stat-stars">★★★★★</span>
                250+ Happy Clients in Bangalore
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
            <a
              href={TEL_LINK}
              className="ab-cta-btn-sec"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'call_click', {
                    event_category: 'contact',
                    event_label: 'about_cta_call'
                  });
                }
              }}
            >
              <PhoneIcon /> Call Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}