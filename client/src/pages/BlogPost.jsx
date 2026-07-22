import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import PageMeta from '../components/PageMeta';
import { fetchPostBySlug, fetchPosts, trackPostView } from '../services/api';
import {
  BLOG_BASE_PATH,
  DEFAULT_BLOG_IMAGE,
  buildBlogSchema,
  buildWhatsAppUrl,
  calculateReadingTime,
  formatDate,
  getAbsoluteUrl,
  getPostUrl,
  getTableOfContents,
  normalizeImage,
  normalizePost,
  slugify
} from '../utils/blog';

function getRelatedPosts(post, posts) {
  const normalized = normalizePost(post);

  if (normalized.relatedMode === 'manual' && normalized.relatedPostIds.length) {
    return posts.filter((item) => normalized.relatedPostIds.includes(item.id)).slice(0, 3);
  }

  return posts
    .filter((item) => item.id !== normalized.id && (item.category || item.tag) === normalized.category)
    .slice(0, 3);
}

function getSimpleSections(post = {}) {
  return (post.simpleSections || []).filter((section) => {
    const image = normalizeImage(section.image || section.imageUrl || '', post.altText || post.title);
    return section.paragraph || section.html || image.url;
  });
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderBlock(block) {
  const id = slugify(block.heading || block.title || block.id);

  if (block.type === 'heading') {
    const Tag = ['h2', 'h3', 'h4'].includes(block.level) ? block.level : 'h2';
    return <Tag key={block.id} id={id}>{block.heading}</Tag>;
  }

  if (block.type === 'paragraph') {
    return <p key={block.id}>{block.text}</p>;
  }

  if (block.type === 'horizontalLine') {
    return <hr key={block.id} />;
  }

  if (block.type === 'quote') {
    return (
      <blockquote key={block.id}>
        {block.quote}
        {block.citation ? <cite>{block.citation}</cite> : null}
      </blockquote>
    );
  }

  if (block.type === 'code') {
    return <pre key={block.id}><code>{block.code}</code></pre>;
  }

  if (block.type === 'image' || block.type === 'hero') {
    const image = normalizeImage(block.image);
    if (!image.url) return null;

    return (
      <figure key={block.id}>
        <img
          src={image.url}
          alt={image.alt || block.heading || ''}
          width={image.width || undefined}
          height={image.height || undefined}
          loading={image.loading || 'lazy'}
        />
        {image.caption ? <figcaption>{image.caption}</figcaption> : null}
      </figure>
    );
  }

  if (block.type === 'gallery') {
    const images = (block.images || []).filter((image) => image.url);
    if (!images.length) return null;

    return (
      <section key={block.id} className="bp-gallery">
        {block.heading ? <h2>{block.heading}</h2> : null}
        <div>
          {images.map((image) => (
            <figure key={image.id || image.url}>
              <img src={image.url} alt={image.alt || ''} width={image.width || undefined} height={image.height || undefined} loading="lazy" />
              {image.caption ? <figcaption>{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </section>
    );
  }

  if (block.type === 'faq') {
    return (
      <details key={block.id}>
        <summary>{block.question}</summary>
        <p>{block.answer}</p>
      </details>
    );
  }

  if (block.type === 'cta') {
    const url = block.buttonUrl || buildWhatsAppUrl(block.whatsappNumber, block.whatsappMessage);
    return (
      <section key={block.id} className="bp-cta">
        <h2>{block.heading}</h2>
        <p>{block.description}</p>
        {url ? <a href={url} target={url.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{block.buttonText || 'Learn More'}</a> : null}
      </section>
    );
  }

  if (block.type === 'internalLink' || block.type === 'externalLink') {
    return <p key={block.id}><a href={block.url}>{block.label || block.url}</a></p>;
  }

  if (block.type === 'table') {
    return (
      <div key={block.id} className="bp-table-wrap">
        <table>
          <tbody>
            {(block.rows || []).map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.type === 'video') {
    return (
      <figure key={block.id}>
        <div className="bp-video">
          <iframe src={block.url} title={block.caption || 'Blog video'} loading="lazy" allowFullScreen />
        </div>
        {block.caption ? <figcaption>{block.caption}</figcaption> : null}
      </figure>
    );
  }

  return null;
}

const BLOG_STATE_STYLES = `
  .bp-page { min-height: 60vh; background: #F8F6F3; color: #3E2C23; }
  .bp-shell { max-width: 1120px; margin: 0 auto; padding: 64px 5vw; }
  .bp-eyebrow { font: 700 11px/1 Poppins,sans-serif; letter-spacing: .22em; text-transform: uppercase; color: #C8A96A; }
  .bp-state-card { display: grid; grid-template-columns: minmax(0,1fr) minmax(260px,.55fr); gap: 34px; align-items: center; overflow: hidden; border-radius: 32px; background: #fff; padding: clamp(24px,5vw,54px); box-shadow: 0 24px 70px rgba(43,35,26,.1); }
  .bp-state-card h1 { margin-top: 18px; font: 700 clamp(2.3rem,4vw,4.4rem)/1.05 "Playfair Display",serif; color: #3E2C23; }
  .bp-state-card p { margin-top: 18px; max-width: 620px; color: #6d625b; font: 400 1rem/1.9 Poppins,sans-serif; }
  .bp-state-actions { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 12px; }
  .bp-state-actions a { display: inline-flex; justify-content: center; border-radius: 999px; padding: 14px 22px; text-decoration: none; font: 700 13px/1 Poppins,sans-serif; }
  .bp-state-actions a:first-child { background: #3E2C23; color: #fff; }
  .bp-state-actions a:last-child { border: 1px solid rgba(62,44,35,.24); color: #3E2C23; }
  .bp-state-frame { overflow: hidden; border: 8px solid #F8F6F3; border-radius: 28px; background: #EAE3DC; box-shadow: inset 0 0 0 1px rgba(62,44,35,.06); }
  .bp-state-frame img { display: block; width: 100%; aspect-ratio: 4/5; object-fit: cover; }
  .bp-skeleton { height: 360px; border-radius: 28px; background: linear-gradient(90deg,#EAE3DC,#fff,#EAE3DC); background-size: 200% 100%; animation: bp-shimmer 1.4s linear infinite; }
  .bp-skeleton-title { height: 120px; margin-top: 24px; }
  @keyframes bp-shimmer { to { background-position: -200% 0; } }
  @media(max-width: 820px) { .bp-state-card { grid-template-columns: 1fr; } .bp-state-frame { order: -1; } }
`;

function BlogStateStyles() {
  return <style>{BLOG_STATE_STYLES}</style>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadPost() {
      setLoading(true);
      setMessage('');

      try {
        const [postResponse, postsResponse] = await Promise.all([
          fetchPostBySlug(slug),
          fetchPosts().catch(() => ({ items: [] }))
        ]);

        if (!mounted) return;

        const loadedPost = normalizePost(postResponse.item);
        setPost(loadedPost);
        setAllPosts((postsResponse.items || []).map(normalizePost));

        if (loadedPost.id) {
          trackPostView(loadedPost.id).catch(() => {});
        }
      } catch (error) {
        if (mounted) setMessage(error.message || 'Blog post not found.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPost();
    return () => { mounted = false; };
  }, [slug]);

  const normalized = post ? normalizePost(post) : null;
  const relatedPosts = useMemo(
    () => (normalized ? getRelatedPosts(normalized, allPosts) : []),
    [allPosts, normalized]
  );
  const toc = normalized ? getTableOfContents(normalized) : [];
  const shareUrl = normalized ? getAbsoluteUrl(getPostUrl(normalized)) : '';
  const schema = normalized ? buildBlogSchema(normalized, relatedPosts) : null;
  const simpleSections = normalized ? getSimpleSections(normalized) : [];
  const hasSimpleSections = simpleSections.length > 0;

  if (loading) {
    return (
      <>
        <BlogStateStyles />
        <PageMeta title="Loading Blog | Shrusara" description="Loading Shrusara blog post." canonicalPath={`${BLOG_BASE_PATH}/${slug}`} />
        <main className="bp-page">
          <div className="bp-shell">
            <div className="bp-skeleton" />
            <div className="bp-skeleton bp-skeleton-title" />
          </div>
        </main>
      </>
    );
  }

  if (!normalized) {
    return (
      <>
        <BlogStateStyles />
        <PageMeta title="Blog Not Found | Shrusara" description="The requested blog post was not found." canonicalPath={`${BLOG_BASE_PATH}/${slug}`} robots="noindex,nofollow" />
        <main className="bp-page">
          <section className="bp-shell">
            <div className="bp-state-card">
              <div>
                <p className="bp-eyebrow">Shrusara Blog</p>
                <h1>Blog post not found</h1>
                <p>{message || 'This article may have been moved, unpublished, or deleted.'}</p>
                <div className="bp-state-actions">
                  <Link to={BLOG_BASE_PATH}>Explore Blogs</Link>
                  <Link to="/contact">Contact Shrusara</Link>
                </div>
              </div>
              <div className="bp-state-frame">
                <LazyImage src={DEFAULT_BLOG_IMAGE} alt="Shrusara fashion boutique blog" sizes="(min-width: 820px) 32vw, 100vw" />
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  const title = normalized.metaTitle || normalized.seoTitle || normalized.title;
  const description = normalized.metaDescription || normalized.excerpt;
  const image = normalized.openGraph?.image?.url || normalized.featuredImage?.url || normalized.coverImage || DEFAULT_BLOG_IMAGE;

  return (
    <>
      <style>{`
        .bp-page { background: #fbfaf7; color: #2f2723; }
        .bp-shell { max-width: 1180px; margin: 0 auto; padding: 68px 5vw; }
        .bp-hero { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, .72fr); gap: clamp(32px, 5vw, 56px); align-items: center; background: linear-gradient(135deg, #fbfaf7 0%, #fff 58%, #eef4ef 100%); }
        .bp-hero::after { content: ''; position: absolute; left: 5vw; right: 5vw; bottom: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(47,39,35,.18), transparent); }
        .bp-eyebrow { font: 800 11px/1 Poppins,sans-serif; letter-spacing: .22em; text-transform: uppercase; color: #9F6B4E; }
        .bp-h1 { max-width: 760px; margin-top: 18px; font: 700 clamp(2.35rem, 5vw, 5.25rem)/.98 "Playfair Display", serif; color: #2f2723; }
        .bp-excerpt { max-width: 690px; margin-top: 22px; color: #61564f; font: 400 1.04rem/1.9 Poppins,sans-serif; }
        .bp-meta { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 10px; color: #5B7461; font: 700 11px/1 Poppins,sans-serif; text-transform: uppercase; letter-spacing: .13em; }
        .bp-meta span { border: 1px solid rgba(91,116,97,.24); border-radius: 999px; background: rgba(255,255,255,.74); padding: 9px 12px; }
        .bp-hero-img { overflow: hidden; border: 10px solid #fff; border-radius: 34px; box-shadow: 0 24px 70px rgba(47,39,35,.16); background: #EAE3DC; }
        .bp-hero-img img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; }
        .bp-layout { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 40px; align-items: start; }
        .bp-layout-simple { display: block; max-width: 1100px; padding-top: 48px; }
        .bp-toc { position: sticky; top: 92px; background: #fff; border: 1px solid rgba(47,39,35,.08); border-radius: 20px; padding: 20px; box-shadow: 0 18px 40px rgba(34,31,27,.08); }
        .bp-toc a { display: block; margin-top: 12px; color: #61564f; text-decoration: none; font: 500 13px/1.5 Poppins,sans-serif; }
        .bp-toc a[data-level="h3"] { padding-left: 14px; }
        .bp-article { background: #fff; border: 1px solid rgba(47,39,35,.08); border-radius: 28px; padding: clamp(24px, 5vw, 56px); box-shadow: 0 18px 40px rgba(34,31,27,.08); }
        .bp-article-simple { background: transparent; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
        .bp-content { display: grid; gap: 24px; }
        .bp-content h2 { margin-top: 8px; font: 700 2rem/1.2 "Playfair Display",serif; color: #2f2723; }
        .bp-content h3 { font: 700 1.45rem/1.25 "Playfair Display",serif; color: #2f2723; }
        .bp-content p, .bp-content li { color: #61564f; font: 400 1rem/1.9 Poppins,sans-serif; }
        .bp-content a { color: #8b5c43; font-weight: 700; }
        .bp-content figure { margin: 0; overflow: hidden; border-radius: 22px; background: #F8F6F3; }
        .bp-content figure img { width: 100%; display: block; object-fit: cover; }
        .bp-content figcaption { padding: 12px 16px; color: #61564f; font: 400 .85rem/1.6 Poppins,sans-serif; }
        .bp-simple-story { display: grid; gap: 34px; }
        .bp-simple-section { position: relative; display: grid; grid-template-columns: minmax(0, .92fr) minmax(300px, .82fr); gap: clamp(24px, 4vw, 42px); align-items: center; border: 1px solid rgba(47,39,35,.08); border-radius: 32px; background: #fff; padding: clamp(22px, 3.5vw, 34px); box-shadow: 0 22px 60px rgba(47,39,35,.09); }
        .bp-simple-section:nth-child(even) { grid-template-columns: minmax(300px, .82fr) minmax(0, .92fr); }
        .bp-simple-section:nth-child(even) .bp-simple-copy { order: 2; }
        .bp-simple-section-text-only { display: block; }
        .bp-simple-kicker { margin-bottom: 16px; color: #9F6B4E; font: 800 11px/1 Poppins,sans-serif; letter-spacing: .18em; text-transform: uppercase; }
        .bp-simple-copy { min-width: 0; }
        .bp-simple-text { color: #514741; font: 400 1rem/1.95 Poppins,sans-serif; }
        .bp-simple-text > * + * { margin-top: 14px; }
        .bp-simple-text p { margin: 0; }
        .bp-simple-text h2 { margin: 0; color: #2f2723; font: 700 clamp(1.8rem, 3vw, 2.65rem)/1.14 "Playfair Display",serif; }
        .bp-simple-text h3 { margin: 0; color: #2f2723; font: 700 clamp(1.35rem, 2vw, 1.8rem)/1.2 "Playfair Display",serif; }
        .bp-simple-text blockquote { margin: 0; border-left: 4px solid #9F6B4E; padding: 6px 0 6px 18px; color: #2f2723; font: 700 1.25rem/1.65 "Playfair Display",serif; }
        .bp-simple-text strong, .bp-simple-text b { color: #2f2723; font-weight: 800; }
        .bp-simple-text em { color: #8b5c43; }
        .bp-simple-text u { text-decoration-color: #9F6B4E; text-decoration-thickness: 2px; text-underline-offset: 4px; }
        .bp-copy-type-heading > p:first-child { color: #2f2723; font: 700 clamp(1.8rem, 3vw, 2.65rem)/1.14 "Playfair Display",serif; }
        .bp-copy-type-subheading > p:first-child { color: #2f2723; font: 700 clamp(1.35rem, 2vw, 1.8rem)/1.2 "Playfair Display",serif; }
        .bp-copy-type-quote { border-left: 4px solid #9F6B4E; padding-left: 18px; color: #2f2723; font-family: "Playfair Display",serif; font-weight: 700; }
        .bp-copy-style-lead { font-size: 1.12rem; color: #443a34; }
        .bp-copy-style-highlight { border-left: 5px solid #9F6B4E; border-radius: 18px; background: #fff8ef; padding: 18px 20px; }
        .bp-copy-style-note { border: 1px solid rgba(91,116,97,.22); border-radius: 18px; background: #eef4ef; padding: 18px 20px; }
        .bp-copy-type-heading h2:first-child, .bp-copy-type-subheading h3:first-child { margin-bottom: 8px; }
        .bp-simple-frame { overflow: hidden; border: 10px solid #f7f3ed; border-radius: 28px; background: #EAE3DC; box-shadow: 0 18px 45px rgba(47,39,35,.13); }
        .bp-simple-frame img { display: block; width: 100%; aspect-ratio: 4/3; object-fit: cover; }
        .bp-simple-frame figcaption { background: #fff; padding: 12px 15px; color: #61564f; font: 600 .82rem/1.5 Poppins,sans-serif; }
        .bp-content blockquote { margin: 0; border-left: 4px solid #C8A96A; background: #F8F6F3; padding: 24px; font: 700 1.35rem/1.5 "Playfair Display",serif; }
        .bp-content blockquote cite { display: block; margin-top: 12px; color: #61564f; font: 500 .85rem/1.5 Poppins,sans-serif; }
        .bp-content pre { overflow: auto; border-radius: 18px; background: #221f1b; color: #fff; padding: 18px; }
        .bp-gallery > div { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
        .bp-table-wrap { overflow-x: auto; border: 1px solid rgba(62,44,35,.1); border-radius: 18px; }
        .bp-table-wrap table { width: 100%; border-collapse: collapse; }
        .bp-table-wrap td { padding: 14px 16px; border-bottom: 1px solid rgba(62,44,35,.08); }
        .bp-video { aspect-ratio: 16/9; background: #221f1b; }
        .bp-video iframe { width: 100%; height: 100%; border: 0; }
        .bp-cta { text-align: center; border-radius: 28px; background: #221f1b; padding: 42px 28px; color: #fff; }
        .bp-cta h2 { color: #fff; }
        .bp-cta p { color: rgba(255,255,255,.78); }
        .bp-cta a, .bp-share a, .bp-empty a { display: inline-flex; justify-content: center; border-radius: 999px; background: #9F6B4E; color: #fff; padding: 13px 22px; text-decoration: none; font: 700 13px/1 Poppins,sans-serif; }
        .bp-faq, .bp-related, .bp-share { margin-top: 42px; display: grid; gap: 14px; }
        .bp-faq details { border: 1px solid rgba(62,44,35,.1); border-radius: 18px; padding: 18px; background: #F8F6F3; }
        .bp-faq summary { cursor: pointer; font-weight: 700; }
        .bp-related-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .bp-related-card { border-radius: 20px; background: #F8F6F3; padding: 16px; text-decoration: none; color: #2f2723; }
        .bp-share-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .bp-empty { text-align: center; }
        .bp-empty h1 { font: 700 3rem/1.1 "Playfair Display",serif; }
        .bp-skeleton { height: 360px; border-radius: 28px; background: linear-gradient(90deg,#EAE3DC,#fff,#EAE3DC); background-size: 200% 100%; animation: bp-shimmer 1.4s linear infinite; }
        .bp-skeleton-title { height: 120px; margin-top: 24px; }
        @keyframes bp-shimmer { to { background-position: -200% 0; } }
        @media(max-width: 900px) { .bp-hero, .bp-layout, .bp-simple-section, .bp-simple-section:nth-child(even) { grid-template-columns: 1fr; } .bp-simple-section:nth-child(even) .bp-simple-copy { order: 0; } .bp-hero { padding-top: 48px; } .bp-layout-simple { padding-top: 32px; } .bp-toc { position: static; } .bp-related-grid, .bp-gallery > div { grid-template-columns: 1fr; } }
      `}</style>

      <PageMeta
        title={title}
        description={description}
        canonicalPath={normalized.canonicalUrl || getPostUrl(normalized)}
        robots={normalized.robots}
        image={image}
        type="article"
        schema={schema}
      />

      <main className="bp-page">
        <section className="bp-shell bp-hero">
          <div>
            <p className="bp-eyebrow">{normalized.category}</p>
            <h1 className="bp-h1">{normalized.title}</h1>
            <p className="bp-excerpt">{normalized.excerpt}</p>
            <div className="bp-meta">
              <span>{normalized.author}</span>
              <span>{formatDate(normalized.publishedAt || normalized.createdAt)}</span>
              <span>{calculateReadingTime(normalized)} min read</span>
            </div>
          </div>
          <div className="bp-hero-img">
            <LazyImage src={image} alt={normalized.featuredImage.alt || normalized.title} sizes="(min-width: 900px) 42vw, 100vw" />
          </div>
        </section>

        <section className={`bp-shell bp-layout ${hasSimpleSections ? 'bp-layout-simple' : ''}`}>
          {!hasSimpleSections ? (
            <aside className="bp-toc">
              <p className="bp-eyebrow">Contents</p>
              {toc.length ? toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} data-level={item.level}>{item.text}</a>
              )) : <p className="mt-4 text-sm text-stone-500">This article is a quick read.</p>}
            </aside>
          ) : null}

          <article className={`bp-article ${hasSimpleSections ? 'bp-article-simple' : ''}`}>
            {hasSimpleSections ? (
              <section className="bp-simple-story">
                {simpleSections.map((section, index) => {
                  const sectionImage = normalizeImage(section.image || section.imageUrl || '', normalized.altText || normalized.title);
                  const html = section.html || (section.paragraph ? `<p>${escapeHtml(section.paragraph)}</p>` : '');

                  return (
                    <article key={section.id || index} className={`bp-simple-section ${sectionImage.url ? '' : 'bp-simple-section-text-only'}`}>
                      <div className="bp-simple-copy">
                        <p className="bp-simple-kicker">Section {index + 1}</p>
                        {html ? (
                          <div
                            className={`bp-simple-text bp-copy-style-${section.textStyle || 'classic'} bp-copy-type-${section.textType || 'paragraph'}`}
                            dangerouslySetInnerHTML={{ __html: html }}
                            style={{ textAlign: section.alignment || 'left' }}
                          />
                        ) : null}
                      </div>
                      {sectionImage.url ? (
                        <figure className="bp-simple-frame">
                          <LazyImage
                            src={sectionImage.url}
                            alt={sectionImage.alt || normalized.altText || normalized.title}
                            sizes="(min-width: 900px) 34vw, 100vw"
                          />
                          {(section.caption || sectionImage.caption) ? <figcaption>{section.caption || sectionImage.caption}</figcaption> : null}
                        </figure>
                      ) : null}
                    </article>
                  );
                })}
              </section>
            ) : (
              <>
                <div className="bp-content" dangerouslySetInnerHTML={{ __html: normalized.contentHtml }} />
                <div className="bp-content">{(normalized.blocks || []).map(renderBlock)}</div>
              </>
            )}

            {!hasSimpleSections && (normalized.images || []).filter((imageItem) => imageItem.url).length ? (
              <section className="bp-gallery bp-content">
                <h2>Images</h2>
                <div>
                  {normalized.images.filter((imageItem) => imageItem.url).map((imageItem) => (
                    <figure key={imageItem.id || imageItem.url}>
                      <img src={imageItem.url} alt={imageItem.alt || normalized.title} width={imageItem.width || undefined} height={imageItem.height || undefined} loading="lazy" />
                      {imageItem.caption ? <figcaption>{imageItem.caption}</figcaption> : null}
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            {(normalized.faqs || []).some((faq) => faq.question || faq.answer) ? (
              <section className="bp-faq">
                <h2>FAQs</h2>
                {normalized.faqs.filter((faq) => faq.question || faq.answer).map((faq) => (
                  <details key={faq.id}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </section>
            ) : null}

            {(normalized.ctas || []).filter((cta) => cta.heading || cta.description).map((cta) => renderBlock({ ...cta, id: cta.id, type: 'cta' }))}

            {relatedPosts.length ? (
              <section className="bp-related">
                <h2>Related Blogs</h2>
                <div className="bp-related-grid">
                  {relatedPosts.map((item) => (
                    <Link key={item.id} className="bp-related-card" to={getPostUrl(item)}>
                      <p className="bp-eyebrow">{item.category}</p>
                      <h3>{item.title}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="bp-share">
              <h2>Share This Blog</h2>
              <div className="bp-share-row">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">Facebook</a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(normalized.title)}`} target="_blank" rel="noreferrer">Twitter</a>
                <a href={`https://wa.me/?text=${encodeURIComponent(`${normalized.title} ${shareUrl}`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </section>
          </article>
        </section>
      </main>
    </>
  );
}
