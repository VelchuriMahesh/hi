import { Link } from 'react-router-dom';
import { contactLinks, navLinks } from '../data/content';

export default function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/75">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">

        {/* BRAND */}
        <div className="space-y-4">
          <p className="font-heading text-3xl text-ink">Shrusara Fashion Boutique</p>
          <p className="max-w-xl text-sm leading-7 text-stone-600">
            Bridal blouses, designer outfits, lehengas, gowns, and kids outfits tailored for
            premium fit, handcrafted detailing, and elegant occasion styling.
          </p>
        </div>

        {/* NAV LINKS */}
        <div className="grid gap-3 sm:grid-cols-2">
          {navLinks
            .filter((link) => link.label !== 'Kids Outfits')
            .map((link) => (
              <Link
                key={link.to}
                className="text-sm text-stone-600 transition hover:text-cocoa"
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
        </div>

        {/* CONTACT */}
        <div className="space-y-3 text-sm text-stone-600">

          {/* ADDRESS */}
          <p>{contactLinks.address}</p>

          {/* PHONE — with tracking */}
          <a
            className="block transition hover:text-cocoa"
            href={contactLinks.call}
            onClick={() => {
              if (window.gtag) {
                window.gtag('event', 'phone_call_click', {
                  event_category: 'Lead',
                  event_label: 'footer',
                  value: 1,
                });
              }
            }}
          >
            {contactLinks.phoneDisplay}
          </a>

          {/* EMAIL */}
          <a
            className="block transition hover:text-cocoa"
            href="mailto:help@shrusara.com"
          >
            help@shrusara.com
          </a>

          {/* WHATSAPP — with tracking */}
          <a
            className="block transition hover:text-cocoa"
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              if (window.gtag) {
                window.gtag('event', 'whatsapp_click', {
                  event_category: 'Lead',
                  event_label: 'footer',
                  value: 1,
                });
              }
            }}
          >
            WhatsApp Us
          </a>

          {/* GOOGLE MAPS */}
          <a
            className="block transition hover:text-cocoa"
            href={contactLinks.maps}
            target="_blank"
            rel="noreferrer"
          >
            View on Google Maps
          </a>

        </div>
      </div>
    </footer>
  );
}