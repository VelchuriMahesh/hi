import LazyImage from './LazyImage';
import { contactLinks } from '../data/content';

export default function HeroBanner({
  eyebrow,
  title,
  description,
  image,
  videoUrl,
  primaryLabel = 'WhatsApp',
  secondaryLabel = 'Call Now',
  primaryHref = contactLinks.whatsapp,
  secondaryHref = contactLinks.call
}) {
  return (
    <section className="section-shell pb-12 pt-4 sm:pt-6 sm:pb-16">
      {/* Media container — Set to Full Mobile Ratio (9:16) and Desktop Ratio (16:9) */}
      <div className="relative overflow-hidden rounded-[30px] sm:rounded-[36px] border border-white/60 shadow-soft bg-stone-100">
        {videoUrl ? (
          <video
            key={videoUrl}
            /* 
               aspect-[9/16] ensures full vertical frame on mobile 
               sm:aspect-video ensures full horizontal frame on website 
               No min-h values to prevent unwanted cropping
            */
            className="w-full h-full object-cover aspect-[9/16] sm:aspect-video"
            autoPlay
            muted
            loop
            playsInline
            poster={image}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <LazyImage
            src={image}
            alt={title}
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
            /* Matching the video aspect ratios exactly */
            wrapperClassName="w-full h-full aspect-[9/16] sm:aspect-video"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Text + CTA box — sits below the media with responsive overlap */}
      <div className="mt-[-60px] relative z-10 px-3 sm:mt-6 sm:px-4">
        <div className="mx-auto max-w-3xl space-y-5 rounded-[28px] border border-ink/10 bg-white/95 p-6 shadow-xl backdrop-blur-md sm:p-10">
          <span className="inline-flex rounded-full border border-cocoa/20 bg-linen px-3 py-1 text-[10px] font-bold uppercase tracking-[0.32em] text-cocoa">
            {eyebrow}
          </span>
          <div className="space-y-3">
            <h1 className="font-heading text-3xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a className="button-primary text-center" href={primaryHref}>
              {primaryLabel}
            </a>
            <a className="button-secondary text-center" href={secondaryHref}>
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}