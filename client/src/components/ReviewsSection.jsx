import SectionHeading from './SectionHeading';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1 text-clay">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 ${index < Math.round(rating) ? 'fill-current' : 'fill-clay/20'}`}
        >
          <path d="M10 1.5 12.6 6.78l5.83.85-4.22 4.11.99 5.81L10 14.73 4.8 17.55l.99-5.81L1.57 7.63l5.83-.85L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection({
  payload,
  loading = false,
  title = 'Google Reviews',
  description = 'Real client feedback that builds trust before the first consultation.'
}) {
  const reviewCards = loading
    ? Array.from({ length: 3 }).map((_, index) => ({ id: `skeleton-${index}` }))
    : payload?.reviews || [];

  return (
    <section className="section-shell py-12 sm:py-16">
      <div className="glass-panel overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Social Proof" title={title} description={description} />
          <div className="rounded-[26px] border border-ink/10 bg-linen/90 px-6 py-5">
            {loading ? (
              <div className="space-y-2">
                <div className="skeleton h-4 w-24 animate-shimmer" />
                <div className="skeleton h-8 w-20 animate-shimmer" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Stars rating={payload?.rating || 5} />
                  <span className="text-sm text-stone-500">Google rating</span>
                </div>
                <p className="mt-3 font-heading text-4xl text-ink">
                  {(payload?.rating || 4.9).toFixed(1)}
                </p>
                <p className="text-sm text-stone-500">
                  Based on {payload?.total || 120}+ boutique experiences
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {reviewCards.slice(0, 3).map((review) => (
            <article
              key={review.id || review.authorName}
              className="rounded-[26px] border border-ink/8 bg-white/90 p-6 shadow-card"
            >
              {loading ? (
                <div className="space-y-4">
                  <div className="skeleton h-4 w-28 animate-shimmer" />
                  <div className="skeleton h-16 w-full animate-shimmer" />
                  <div className="skeleton h-4 w-20 animate-shimmer" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-ink">{review.authorName}</p>
                      <p className="text-sm text-stone-500">{review.relativeTime}</p>
                    </div>
                    <Stars rating={review.rating || 5} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-stone-600">{review.text}</p>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

