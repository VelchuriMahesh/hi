import PageMeta from '../components/PageMeta';
import SectionHeading from '../components/SectionHeading';
import { contactLinks } from '../data/content';

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact Shrusara Fashion Boutique | Bangalore"
        description="Contact Shrusara Fashion Boutique in Mahalakshmipuram, Bangalore for bridal blouse design, boutique appointments, and WhatsApp consultations."
        keywords="Contact boutique Bangalore, bridal boutique Mahalakshmipuram contact, WhatsApp boutique Bangalore"
        canonicalPath="/contact"
      />

      <section className="section-shell pb-12 pt-8 sm:pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-panel p-6 sm:p-8">
            <SectionHeading
              eyebrow="Contact"
              title="Visit, call, or WhatsApp for a boutique consultation"
              description="We keep the contact experience simple so high-intent visitors can enquire in one tap."
            />
            <div className="mt-8 grid gap-4">
              {[
                { label: 'Address', value: contactLinks.address, href: contactLinks.maps },
                { label: 'Phone', value: contactLinks.phoneDisplay, href: contactLinks.call },
                {
                  label: 'WhatsApp',
                  value: 'Book instantly on WhatsApp',
                  href: contactLinks.whatsapp
                },
                { label: 'Email', value: contactLinks.email, href: `mailto:${contactLinks.email}` }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="rounded-[24px] border border-ink/8 bg-white/90 px-5 py-6 shadow-card transition hover:-translate-y-0.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cocoa">
                    {item.label}
                  </p>
                  <p className="mt-3 text-base leading-7 text-ink">{item.value}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[34px] border border-white/60 bg-white/85 shadow-soft">
            <iframe
              title="Shrusara Fashion Boutique Map"
              src={contactLinks.mapEmbed}
              className="h-[560px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

