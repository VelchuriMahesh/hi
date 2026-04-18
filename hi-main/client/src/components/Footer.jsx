import { Link } from 'react-router-dom';
import { contactLinks, navLinks } from '../data/content';

export default function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/75">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div className="space-y-4">
          <p className="font-heading text-3xl text-ink">Shrusara Fashion Boutique</p>
          <p className="max-w-xl text-sm leading-7 text-stone-600">
            Bridal blouses, designer outfits, lehengas, gowns, and kids outfits tailored for
            premium fit, handcrafted detailing, and elegant occasion styling.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* UPDATED: We filter out 'Kids Outfits' before mapping */}
          {navLinks
            .filter((link) => link.label !== 'Kids Outfits') 
            .map((link) => (
              <Link key={link.to} className="text-sm text-stone-600 transition hover:text-cocoa" to={link.to}>
                {link.label}
              </Link>
            ))}
          
          {/* REMOVED: Admin Login link deleted from here */}
        </div>

        <div className="space-y-3 text-sm text-stone-600">
          <p>{contactLinks.address}</p>
          <a className="block transition hover:text-cocoa" href={contactLinks.call}>
            {contactLinks.phoneDisplay}
          </a>
          <a
  className="block transition hover:text-cocoa"
  href="mailto:help@shrusara.com"
>
  help@shrusara.com
</a>
          <a className="block transition hover:text-cocoa" href={contactLinks.maps} target="_blank" rel="noreferrer">
            View on Google Maps
          </a>
        </div>
      </div>
    </footer>
  );
}