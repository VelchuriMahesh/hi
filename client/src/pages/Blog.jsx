import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import { fallbackBlogPosts } from '../data/content';
import { fetchPosts } from '../services/api';
import { trackWhatsApp, trackPhoneCall } from '../utils/tracking';
import { calculateReadingTime, getPostUrl, normalizePost } from '../utils/blog';

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919741827558';
const PHONE_NUMBER    = import.meta.env.VITE_PHONE_NUMBER    || '9741827558';
const TEL_LINK        = `tel:${PHONE_NUMBER}`;

const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi, I am looking for a customized bridal / designer outfit consultation. Please share details.'
)}`;

// ─── Date formatter ───────────────────────────────────────────────────────────
function formatDate(date) {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    }).format(new Date(date));
  } catch {
    return '';
  }
}

// ─── Static SEO fallback posts (shown when admin has no posts yet) ─────────────
// These are ONLY used when the API returns 0 items, so admin posts always win.
const seoBlogTopics = [
  {
    id: 'seo-1',
    title: 'Bridal Blouse Design Ideas in Bangalore',
    excerpt: 'Discover the most popular bridal blouse silhouettes, necklines, and embroidery styles trending in Bangalore boutiques this season.',
    coverImage: '/images/blog/bridal-blouse-designs.jpg',
    publishedAt: '2025-01-10',
    tag: 'Bridal Blouse',
  },
  {
    id: 'seo-2',
    title: 'Latest Maggam Work Blouse Designs',
    excerpt: 'A deep dive into the finest maggam work patterns — from traditional motifs to contemporary geometric styles for modern brides.',
    coverImage: '/images/blog/maggam-work-blouse.jpg',
    publishedAt: '2025-01-18',
    tag: 'Maggam Work',
  },
  {
    id: 'seo-3',
    title: 'How to Choose a Bridal Blouse for Your Saree',
    excerpt: 'Match your blouse perfectly with your bridal saree — tips on fabric pairing, colour coordination, and embellishment balance.',
    coverImage: '/images/blog/bridal-saree-blouse.jpg',
    publishedAt: '2025-02-02',
    tag: 'Styling Tips',
  },
  {
    id: 'seo-4',
    title: 'Aari Work Blouse Trends You Need to Know',
    excerpt: 'Aari embroidery is making a bold comeback. Explore the freshest aari work trends for bridal and festive blouses in 2025.',
    coverImage: '/images/blog/aari-work-blouse.jpg',
    publishedAt: '2025-02-15',
    tag: 'Aari Work',
  },
  {
    id: 'seo-5',
    title: 'Bridal Outfit Styling Tips from a Bangalore Boutique',
    excerpt: 'Expert styling tips — how to coordinate your blouse, lehenga, and jewellery for a cohesive and stunning bridal look.',
    coverImage: '/images/blog/bridal-styling-tips.jpg',
    publishedAt: '2025-03-01',
    tag: 'Bridal Styling',
  },
];

const blogTopicPills = [
  'Bridal Blouse Designs',
  'Maggam Work',
  'Aari Work',
  'Lehenga Styling',
  'Bridal Gowns',
  'Designer Outfits',
  'Styling Tips',
  'Bangalore Boutique',
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

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ post, loading }) {
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <article className="blg-card">
        <div className="blg-card-img-wrap blg-skel-block" />
        <div className="blg-card-body">
          <div className="blg-skel" style={{ width: '35%', height: 9, marginBottom: 12 }} />
          <div className="blg-skel" style={{ width: '85%', height: 18, marginBottom: 10 }} />
          <div className="blg-skel" style={{ width: '100%', height: 13, marginBottom: 6 }} />
          <div className="blg-skel" style={{ width: '70%', height: 13 }} />
        </div>
      </article>
    );
  }

  const normalized = normalizePost(post);
  const image = normalized.featuredImage?.url || normalized.coverImage || fallbackBlogPosts?.[0]?.coverImage;
  const date = normalized.publishedAt || normalized.createdAt;
  const articleUrl = post.slug ? getPostUrl(normalized) : '';

  return (
    <article className="blg-card">
      <div className="blg-card-img-wrap">
        <LazyImage
          src={image}
          alt={normalized.featuredImage?.alt || normalized.title}
          sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
          wrapperClassName="blg-card-img"
        />
        {normalized.category && <span className="blg-card-tag">{normalized.category}</span>}
      </div>
      <div className="blg-card-body">
        {date && <p className="blg-card-date">{formatDate(date)} · {calculateReadingTime(normalized)} min read</p>}
        <h2 className="blg-card-title">{normalized.title}</h2>
        <p className="blg-card-excerpt">{normalized.excerpt}</p>
        {expanded && normalized.content && (
          <p className="blg-card-content">{normalized.content}</p>
        )}
        {articleUrl ? (
          <Link className="blg-read-more" to={articleUrl}>
            Read Article <ArrowIcon />
          </Link>
        ) : normalized.content ? (
          <button
            type="button"
            className="blg-read-more"
            onClick={() => setExpanded(prev => !prev)}
          >
            {expanded ? 'Show Less' : 'Read More'} <ArrowIcon />
          </button>
        ) : null}
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Blog() {
  const [adminPosts, setAdminPosts] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchPosts()
      .then(res => {
        if (!mounted) return;
        // fetchPosts returns { items: [...] }  (same shape the Dashboard uses)
        const items = res?.items || [];
        if (items.length > 0) {
          setAdminPosts(items);
        }
        // If items is empty we fall through to seoBlogTopics below
      })
      .catch(() => {
        // Network / Firebase error — silently fall through to SEO topics
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  // Admin posts take priority. SEO topics only show when admin has published nothing yet.
  const displayPosts = loading
    ? Array.from({ length: 5 }).map((_, i) => ({ id: `skel-${i}` }))
    : adminPosts.length > 0
      ? adminPosts
      : seoBlogTopics;

  return (
    <>
      <style>{`
        /* ── Variables — same palette as Designer / Kids / About ── */
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
        .blg-hero {
          background: var(--c-bg); padding: 96px 5vw 72px;
          position: relative; overflow: hidden; text-align: center;
        }
        .blg-hero::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,169,106,.08) 0%, transparent 65%);
        }
        .blg-hero-inner { max-width: 700px; margin: 0 auto; position: relative; z-index: 1; }
        .blg-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 22px;
        }
        .blg-eyebrow::before,
        .blg-eyebrow::after { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .blg-hero-h1 {
          font: 700 clamp(2rem,3.6vw,3.2rem)/1.15 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 20px;
        }
        .blg-hero-sub {
          font: 400 1rem/1.8 'Poppins',sans-serif;
          color: var(--c-muted); max-width: 580px; margin: 0 auto;
        }

        /* ── TOPIC PILLS ── */
        .blg-topics {
          background: var(--c-white);
          border-top: 1px solid rgba(62,44,35,.06);
          border-bottom: 1px solid rgba(62,44,35,.06);
        }
        .blg-topics-inner {
          max-width: 1280px; margin: 0 auto; padding: 24px 5vw;
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
        }
        .blg-topics-label {
          font: 700 10px/1 'Poppins',sans-serif; letter-spacing: .2em;
          text-transform: uppercase; color: var(--c-muted); white-space: nowrap;
        }
        .blg-topics-divider { width: 1px; height: 18px; background: rgba(62,44,35,.15); flex-shrink: 0; }
        .blg-topics-pills { display: flex; gap: 8px; flex-wrap: wrap; }
        .blg-pill {
          font: 500 11px/1 'Poppins',sans-serif; color: var(--c-primary);
          border: 1.5px solid rgba(62,44,35,.18); border-radius: 50px;
          padding: 7px 16px; background: transparent; white-space: nowrap;
          transition: background .18s, border-color .18s; cursor: default;
        }
        .blg-pill:hover { background: rgba(62,44,35,.05); border-color: rgba(62,44,35,.35); }

        /* ── SHELLS ── */
        .blg-shell { max-width: 1280px; margin: 0 auto; padding: 72px 5vw; }

        /* ── SECTION HEADING ── */
        .blg-sec-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 14px;
        }
        .blg-sec-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .blg-sec-h2 {
          font: 700 clamp(1.6rem,2.6vw,2.3rem)/1.25 'Playfair Display',serif;
          color: var(--c-primary); margin-bottom: 10px;
        }
        .blg-sec-sub { font: 400 .95rem/1.75 'Poppins',sans-serif; color: var(--c-muted); max-width: 540px; }

        /* ── BLOG GRID ── */
        .blg-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; margin-top: 40px;
        }

        /* ── BLOG CARD ── */
        .blg-card {
          background: var(--c-white); border-radius: var(--r-lg);
          overflow: hidden; display: flex; flex-direction: column;
          border: 1px solid rgba(62,44,35,.06);
          box-shadow: 0 2px 18px rgba(62,44,35,.07);
          transition: transform .28s, box-shadow .28s;
        }
        .blg-card:hover { transform: translateY(-5px); box-shadow: 0 12px 36px rgba(62,44,35,.13); }
        .blg-card-img-wrap { position: relative; aspect-ratio: 16/10; overflow: hidden; background: var(--c-secondary); flex-shrink: 0; }
        .blg-card-img { width: 100%; height: 100%; }
        .blg-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .blg-card:hover .blg-card-img img { transform: scale(1.05); }
        .blg-card-tag {
          position: absolute; top: 14px; left: 14px;
          background: var(--c-primary); color: #fff;
          font: 600 9px/1 'Poppins',sans-serif; letter-spacing: .16em;
          text-transform: uppercase; padding: 6px 13px; border-radius: 50px;
        }
        .blg-card-body { padding: 22px 22px 26px; display: flex; flex-direction: column; flex: 1; gap: 8px; }
        .blg-card-date {
          font: 600 10px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent);
        }
        .blg-card-title {
          font: 700 1.1rem/1.35 'Playfair Display',serif; color: var(--c-primary);
        }
        .blg-card-excerpt {
          font: 400 .86rem/1.7 'Poppins',sans-serif; color: var(--c-muted); flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .blg-card-content {
          font: 400 .86rem/1.8 'Poppins',sans-serif; color: var(--c-muted);
          border-top: 1px solid rgba(62,44,35,.08); padding-top: 12px;
        }
        .blg-read-more {
          display: inline-flex; align-items: center; gap: 6px;
          font: 600 10px/1 'Poppins',sans-serif; letter-spacing: .14em;
          text-transform: uppercase; color: var(--c-primary);
          background: none; border: none; cursor: pointer; padding: 0; margin-top: 4px;
          transition: color .2s, gap .2s;
        }
        .blg-read-more:hover { color: var(--c-accent); gap: 9px; }

        /* ── SKELETON ── */
        .blg-skel-block { aspect-ratio: 16/10; background: var(--c-secondary); }
        .blg-skel {
          border-radius: 6px;
          background: linear-gradient(90deg, var(--c-secondary) 25%, #ddd5cb 50%, var(--c-secondary) 75%);
          background-size: 200% 100%; animation: blg-shimmer 1.4s infinite;
        }
        @keyframes blg-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* ── FINAL CTA ── */
        .blg-cta-wrap {
          background: var(--c-primary); border-radius: 32px; padding: 64px 56px;
          text-align: center; position: relative; overflow: hidden;
        }
        .blg-cta-wrap::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,169,106,.12) 0%, transparent 70%);
        }
        .blg-cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font: 600 11px/1 'Poppins',sans-serif; letter-spacing: .18em;
          text-transform: uppercase; color: var(--c-accent); margin-bottom: 20px;
        }
        .blg-cta-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .blg-cta-eyebrow::after  { content: ''; width: 22px; height: 1px; background: var(--c-accent); display: block; }
        .blg-cta-h {
          font: 700 clamp(1.6rem,2.8vw,2.4rem)/1.2 'Playfair Display',serif;
          color: #fff; margin-bottom: 14px;
        }
        .blg-cta-sub {
          font: 400 1rem/1.75 'Poppins',sans-serif;
          color: rgba(255,255,255,.75); max-width: 460px; margin: 0 auto 36px;
        }
        .blg-cta-btns { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; position: relative; z-index: 1; }
        .blg-cta-btn-pri {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--c-accent); color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid var(--c-accent); transition: box-shadow .2s, transform .2s;
        }
        .blg-cta-btn-pri:hover { box-shadow: 0 0 0 4px rgba(200,169,106,.3); transform: translateY(-1px); }
        .blg-cta-btn-sec {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #fff;
          font: 600 13px/1 'Poppins',sans-serif; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          border: 2px solid rgba(255,255,255,.35); transition: background .2s;
        }
        .blg-cta-btn-sec:hover { background: rgba(255,255,255,.1); }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px) { .blg-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:768px) {
          .blg-hero { padding: 64px 5vw 52px; }
          .blg-shell { padding: 52px 5vw; }
          .blg-grid { grid-template-columns: 1fr; }
          .blg-topics-divider { display: none; }
          .blg-cta-wrap { padding: 40px 24px; }
          .blg-cta-btns { flex-direction: column; align-items: center; }
          .blg-cta-btn-pri, .blg-cta-btn-sec { width: 100%; justify-content: center; }
        }
      `}</style>

      <PageMeta
  title="Bridal Blouse Designs & Fashion Tips | Shrusara Boutique Blog"
  description="Explore bridal blouse designs, lehenga inspirations, and styling tips from Shrusara Fashion Boutique in Bangalore for your wedding and special occasions."
  canonicalPath="/bridal-fashion-blog-bangalore"
/>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="blg-hero">
        <div className="blg-hero-inner">
          <p className="blg-eyebrow">Blog</p>
          <h1 className="blg-hero-h1">Bridal &amp; Designer Boutique Insights</h1>
          <p className="blg-hero-sub">
            Explore bridal blouse designs, lehenga and gown inspirations, designer outfit
            ideas, and styling tips from Shrusara Fashion Boutique in Bangalore.
          </p>
        </div>
      </section>

      {/* ── TOPIC PILLS ─────────────────────────────────────────────────────── */}
      <div className="blg-topics">
        <div className="blg-topics-inner">
          <span className="blg-topics-label">Topics</span>
          <div className="blg-topics-divider" />
          <div className="blg-topics-pills">
            {blogTopicPills.map(t => (
              <span key={t} className="blg-pill">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. BLOG LISTING ─────────────────────────────────────────────────── */}
      <Reveal className="blg-shell">
        <p className="blg-sec-eyebrow">Latest Posts</p>
        <h2 className="blg-sec-h2">Bridal &amp; Designer Styling Reads</h2>
        <p className="blg-sec-sub">
          Practical guides and inspiration for bridal outfit planning, designer wear, and
          festive occasion styling.
        </p>
        <div className="blg-grid">
          {displayPosts.map(post => (
            <Reveal key={post.id}>
              <BlogCard post={post} loading={loading} />
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── 3. FINAL CTA ────────────────────────────────────────────────────── */}
      <div className="blg-shell" style={{ paddingTop: 0 }}>
        <div className="blg-cta-wrap">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <p className="blg-cta-eyebrow">Customized Design</p>
          </div>
          <h2 className="blg-cta-h">Looking for a Customized Design?</h2>
          <p className="blg-cta-sub">
            Connect with our Chief Designer Shruthi Ajith for a personalized consultation.
          </p>
          <div className="blg-cta-btns">
           <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="blg-cta-btn-pri" onClick={() => trackWhatsApp('blog_cta')}>
  <WaIcon size={18} /> WhatsApp Enquiry
</a>
            <a href={TEL_LINK} className="blg-cta-btn-sec" onClick={() => trackPhoneCall('blog_cta')}>
  <PhoneIcon /> Call Now
</a>
          </div>
        </div>
      </div>
    </>
  );
}
