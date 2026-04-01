import { useEffect, useState } from 'react';
import LazyImage from '../components/LazyImage';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { fallbackBlogPosts } from '../data/content';
import { fetchPosts } from '../services/api';

function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date));
}

export default function Blog() {
  const [posts, setPosts] = useState(fallbackBlogPosts);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetchPosts()
      .then((response) => {
        if (mounted && response.items?.length) {
          setPosts(response.items);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const cards = loading
    ? Array.from({ length: 3 }).map((_, index) => ({ id: `skeleton-${index}` }))
    : posts;

  return (
    <>
      <PageMeta
        title="Boutique Blog | Bridal & Designer Styling Tips"
        description="Read boutique styling tips on bridal blouse design, fittings, designer outfits, and occasion wear from Shrusara Fashion Boutique."
        keywords="Boutique blog Bangalore, bridal blouse tips, designer outfit styling Bangalore"
        canonicalPath="/blog"
      />

      <section className="section-shell pb-12 pt-8 sm:pb-16">
        <SectionHeading
          eyebrow="Blog"
          title="Boutique styling reads for bridal, designer, and festive outfit planning"
          description="A cleaner editorial layout that keeps the page visual, skimmable, and ready for SEO traffic."
          centered
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {cards.map((post) => (
            <Reveal key={post.id}>
              <article className="overflow-hidden rounded-[30px] border border-white/60 bg-white/85 shadow-card">
                {loading ? (
                  <>
                    <div className="skeleton h-72 animate-shimmer" />
                    <div className="space-y-4 p-6">
                      <div className="skeleton h-4 w-24 animate-shimmer" />
                      <div className="skeleton h-8 w-3/4 animate-shimmer" />
                      <div className="skeleton h-20 w-full animate-shimmer" />
                    </div>
                  </>
                ) : (
                  <>
                    <LazyImage
                      src={post.coverImage || fallbackBlogPosts[0].coverImage}
                      alt={post.title}
                      sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
                      wrapperClassName="h-72"
                    />
                    <div className="space-y-4 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </p>
                      <h2 className="font-heading text-3xl leading-tight text-ink">{post.title}</h2>
                      <p className="text-base leading-7 text-stone-600">{post.excerpt}</p>
                      <div className="soft-divider" />
                      {expandedId === post.id ? (
                        <p className="text-sm leading-8 text-stone-600">{post.content}</p>
                      ) : null}
                      <button
                        type="button"
                        className="button-secondary px-5 py-2 text-xs"
                        onClick={() =>
                          setExpandedId((current) => (current === post.id ? null : post.id))
                        }
                      >
                        {expandedId === post.id ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  </>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
