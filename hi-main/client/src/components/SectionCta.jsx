import { contactLinks } from '../data/content';

export default function SectionCta({
  title = 'Book your consultation on WhatsApp',
  description = 'Share your occasion, timeline, and design references. We will guide you toward the right silhouette and finish.',
  primaryLabel = 'WhatsApp',
  secondaryLabel = 'Call Now'
}) {
  return (
    <section className="section-shell py-12 sm:py-16">
      <div className="overflow-hidden rounded-[36px] bg-ink px-6 py-10 text-white shadow-soft sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div className="space-y-4">
            <span className="eyebrow border-white/20 bg-white/10 text-white">Consultation</span>
            <h2 className="font-heading text-3xl leading-tight sm:text-4xl">{title}</h2>
            <p className="max-w-2xl text-white/80">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:justify-self-end">
            <a className="button-primary bg-white text-ink hover:bg-sand" href={contactLinks.whatsapp}>
              {primaryLabel}
            </a>
            <a className="button-secondary border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" href={contactLinks.call}>
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

