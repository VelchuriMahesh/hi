import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// Removed: buildDesignWhatsAppLink import
import LazyImage from './LazyImage';

export default function ProductModal({ item, onClose }) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  const title = item.title || item.alt || 'Boutique design';
  const description =
    item.description ||
    item.alt ||
    'A custom boutique design with premium finishing, thoughtful fit, and celebration-ready detailing.';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-panel relative max-h-[92vh] w-full max-w-5xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-ink shadow-soft"
            aria-label="Close design preview"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M6 6 18 18M18 6 6 18" />
            </svg>
          </button>

          <div className="grid max-h-[92vh] overflow-auto lg:grid-cols-[1.1fr_0.9fr]">
            <LazyImage
              src={item.url}
              alt={title}
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              wrapperClassName="min-h-[360px] lg:min-h-[620px]"
            />
            <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
              <div className="space-y-4">
                <span className="eyebrow">Design Preview</span>
                <h3 className="font-heading text-3xl leading-tight text-ink sm:text-4xl">{title}</h3>
                <p className="text-base leading-8 text-stone-600">{description}</p>
              </div>

              <div className="space-y-3">
                {/* WhatsApp Link Deleted from here */}
                <button className="button-primary w-full" type="button" onClick={onClose}>
                  Continue browsing
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}