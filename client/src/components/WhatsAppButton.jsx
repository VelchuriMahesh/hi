import { motion } from 'framer-motion';
import { contactLinks } from '../data/content';

function IconButton({ href, label, className, children }) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold shadow-soft transition ${className}`}
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </motion.a>
  );
}

export default function WhatsAppButton() {
  return (
    <div className="pointer-events-none fixed bottom-5 left-4 z-[60] flex flex-col items-start gap-3">
      <div className="pointer-events-auto">
        <IconButton
          href={contactLinks.call}
          label="Call Now"
          className="animate-pulse-ring border border-white/70 bg-white/95 text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M5 4h4l2 5-2 1.5c1.5 3 3.5 5 6.5 6.5L17 15l5 2v4a2 2 0 0 1-2 2C11.7 23 1 12.3 1 4a2 2 0 0 1 2-2h2Z" />
          </svg>
        </IconButton>
      </div>
      <div className="pointer-events-auto">
        <IconButton
          href={contactLinks.whatsapp}
          label="WhatsApp"
          className="animate-float bg-[#25D366] text-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M12 2a10 10 0 0 0-8.7 14.93L2 22l5.24-1.27A10 10 0 1 0 12 2Zm5.81 14.21c-.24.67-1.4 1.29-1.94 1.38-.5.08-1.13.12-1.82-.1-.42-.14-.96-.32-1.65-.62-2.9-1.25-4.78-4.18-4.92-4.38-.14-.2-1.18-1.56-1.18-2.98 0-1.42.74-2.12 1-2.41.26-.3.58-.37.77-.37.2 0 .39 0 .56.01.18.01.43-.07.67.52.25.6.84 2.06.91 2.2.08.15.13.33.02.54-.1.2-.15.33-.3.5-.14.16-.3.36-.44.48-.15.13-.3.28-.13.56.17.28.76 1.24 1.63 2 .9.8 1.66 1.05 1.94 1.17.28.12.44.1.6-.06.16-.17.7-.82.89-1.1.18-.27.37-.23.62-.14.26.09 1.62.76 1.9.9.27.13.45.2.51.31.06.11.06.65-.18 1.33Z" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
