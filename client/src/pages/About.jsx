import { useEffect, useMemo, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import ImageGrid from '../components/ImageGrid';
import PageMeta from '../components/PageMeta';
import Reveal from '../components/Reveal';
import ReviewsSection from '../components/ReviewsSection';
import SectionCta from '../components/SectionCta';
import SectionHeading from '../components/SectionHeading';
import VideoCard from '../components/VideoCard';
import { aboutServices, aboutStory, fallbackReviews, heroContent } from '../data/content';
import useMergedGallery from '../hooks/useMergedGallery';
import useHeroMedia from '../hooks/useHeroMedia';
import { fetchReviews } from '../services/api';
import { fetchVideos } from '../services/cms';

export default function About() {
  const { media: heroMedia } = useHeroMedia('about');
  const { images, firebaseImages, loading: galleryLoading, refresh: refreshGallery } = useMergedGallery('all');
  const [reviews, setReviews] = useState(fallbackReviews);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const totalImageCount = images.length;
  const dynamicImageCount = firebaseImages.length;

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'gallery-updated') {
        refreshGallery();
      }
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, [refreshGallery]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshGallery();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshGallery]);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([fetchReviews(), fetchVideos()]).then(([reviewsResponse, videosResponse]) => {
      if (!mounted) {
        return;
      }

      if (reviewsResponse.status === 'fulfilled' && reviewsResponse.value.reviews?.length) {
        setReviews(reviewsResponse.value);
      }

      if (videosResponse.status === 'fulfilled') {
        const aboutVideos = (videosResponse.value || []).filter((video) => {
          const videoPage = String(video.page || video.section || 'about').trim().toLowerCase();
          return videoPage === 'about';
        });
        setVideos(aboutVideos);
      }

      setReviewsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const featuredDesigns = useMemo(() => images.slice(0, 8), [images]);

  return (
    <>
      <PageMeta
        title="About Shrusara Fashion Boutique | Bangalore Boutique"
        description="Learn about Shrusara Fashion Boutique in Mahalakshmipuram, Bangalore and our approach to bridal and designer customization."
        keywords="About boutique Bangalore, bridal boutique Mahalakshmipuram, designer boutique Bangalore"
        canonicalPath="/about"
      />

      <HeroBanner
        eyebrow={heroContent.about.eyebrow}
        title={heroContent.about.title}
        description={heroContent.about.description}
        image={heroMedia?.imageUrl || heroContent.about.image}
        videoUrl={heroMedia?.videoUrl || heroContent.about.videoUrl}
      />

      <Reveal className="section-shell py-12 sm:py-16">
        <div className="glass-panel p-6 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="About Shrusara"
            title="About Shrusara"
            description={aboutStory.short}
          />
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Our Services"
          title="A boutique offering for bridal, festive, designer, and kids wear"
          description="No clutter, no generic styling copy, just clear boutique services with a premium finish."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {aboutServices.map((service) => (
            <article key={service} className="luxury-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linen text-cocoa">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                  <path d="m5 12 4.2 4.2L19 6.5" />
                </svg>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-ink">{service}</h2>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                Personalized boutique work shaped around fit, finish, and occasion.
              </p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <div className="glass-panel p-6 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why Choose Us"
            title={aboutStory.intro}
            description="A calm boutique experience with attention to fitting, embroidery quality, and delivery confidence."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              'Customized fitting',
              'Maggam expertise',
              'Premium stitching',
              'Consultation',
              'On-time delivery'
            ].map((item) => (
              <article key={item} className="rounded-[24px] bg-white/90 p-5 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linen text-cocoa">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                    <path d="m5 12 4.2 4.2L19 6.5" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink">{item}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  Premium boutique execution that keeps the process elegant and dependable.
                </p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Featured Designs"
          title="Bridal, designer, and kids favorites from our boutique collection"
          description="Static local references come first, followed by dynamic gallery uploads managed through Firebase-backed admin tools."
        />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-stone-600">
            Total designs: <strong>{totalImageCount}</strong>, admin uploads: <strong>{dynamicImageCount}</strong>
          </p>
          <button
            className="button-secondary h-10 px-3 text-sm"
            type="button"
            onClick={refreshGallery}
            disabled={galleryLoading}
          >
            {galleryLoading ? 'Refreshing...' : 'Refresh gallery'}
          </button>
        </div>
        <div className="mt-10">
          <ImageGrid
            images={featuredDesigns}
            loading={galleryLoading}
            columnsClassName="sm:grid-cols-2 lg:grid-cols-4"
            carouselOnMobile
          />
        </div>
      </Reveal>

      <Reveal className="section-shell py-12 sm:py-16">
        <SectionHeading
          eyebrow="Client Videos"
          title="Boutique moments shared through testimonial videos"
          description="YouTube testimonial links added from the admin panel appear here with premium preview cards."
        />
        {videos.length ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onOpen={(item) => window.open(item.url, '_blank', 'noopener,noreferrer')}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[28px] border border-white/70 bg-white/85 p-8 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
              Video testimonials
            </p>
            <p className="mt-4 text-lg font-semibold text-ink">
              Add testimonial YouTube links from the admin panel to show them here.
            </p>
          </div>
        )}
      </Reveal>

      <ReviewsSection
        payload={reviews}
        loading={reviewsLoading}
        description="Google review data helps reassure visitors that the boutique experience is trusted and well rated."
      />

      <SectionCta
        title="Start with a boutique consultation"
        description="Tell us what you are planning for and we will recommend the right category, silhouette, and design direction."
      />
    </>
  );
}
