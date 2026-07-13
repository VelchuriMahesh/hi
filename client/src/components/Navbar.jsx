import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { contactLinks, navLinks } from '../data/content';
import { trackPhoneCall, trackWhatsApp } from '../utils/tracking';

function navLinkClass({ isActive }) {
  return [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive ? 'bg-ink text-white shadow-soft' : 'text-stone-600 hover:bg-white/80 hover:text-ink'
  ].join(' ');
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-linen/80 backdrop-blur-xl">
      <div className="section-shell flex min-h-[84px] items-center justify-between gap-4">
        <NavLink className="min-w-0" to="/">
          <div className="flex items-center gap-3">
            <img
              src="/videos/Revisedlogo.webp"
              alt="Shrusara Logo"
              className="h-20 w-auto object-contain sm:h-28"
            />
            <div>
              <p className="font-heading text-xl text-ink sm:text-2xl">Shrusara</p>
              <p className="text-xs uppercase tracking-[0.28em] text-cocoa">Fashion Boutique</p>
            </div>
          </div>
        </NavLink>

        {/* NAV LINKS */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} className={navLinkClass} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP BUTTONS */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* DESKTOP CALL */}
          <a
            className="button-secondary"
            href={contactLinks.call}
            onClick={() => trackPhoneCall('navbar')}
          >
            Call Now
          </a>

          {/* DESKTOP WHATSAPP */}
          <a
            className="button-primary"
            href={contactLinks.whatsapp}
            onClick={() => trackWhatsApp('navbar')}
          >
            Book on WhatsApp
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink/20 bg-white shadow-md text-ink lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 fill-none stroke-current stroke-[2.5]"
          >
            {open ? (
              <path d="M6 6 18 18M18 6 6 18" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open ? (
        <div className="section-shell pb-5 lg:hidden">
          <div className="glass-panel space-y-2 p-3">

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-lg font-medium ${
                    isActive ? 'bg-ink text-white' : 'text-stone-700'
                  }`
                }
                to={link.to}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="grid gap-2 pt-2 sm:grid-cols-2">

              {/* MOBILE CALL */}
              <a
                className="button-secondary text-center py-4"
                href={contactLinks.call}
                onClick={() => trackPhoneCall('navbar_mobile')}
              >
                Call Now
              </a>

              {/* MOBILE WHATSAPP */}
              <a
                className="button-primary text-center py-4"
                href={contactLinks.whatsapp}
                onClick={() => trackWhatsApp('navbar_mobile')}
              >
                WhatsApp Us
              </a>

            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
