import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

// REMOVED: buildWhatsAppMessage function and contactLinks import

function ModalContent({ item, onClose }) {
  const title = item.title || item.alt || 'Boutique design';
  const description =
    item.description ||
    item.alt ||
    'A custom boutique design with premium finishing, thoughtful fit, and celebration-ready detailing.';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.75)',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Image box — fixed height, image centered inside */}
        <div style={{
          backgroundColor: '#f5f4f2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '340px',
          position: 'relative',
        }}>
          <img
            src={item.url || item.thumbUrl}
            alt={title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(0,0,0,0.45)',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6 18 18M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Info + CTA */}
        <div style={{ padding: '20px 24px 24px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#b98c64', marginBottom: '6px' }}>
            Design Preview
          </p>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', lineHeight: 1.3, color: '#1a1a1a', margin: '0 0 6px' }}>
            {title}
          </h3>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, margin: '0 0 18px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {description}
          </p>
          
          {/* Updated Button Section */}
          <div style={{ display: 'flex' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '100px',
                // I updated the color to make this button stand out more
                background: 'linear-gradient(135deg, #1a1a1a, #b98c64)', 
                color: '#fff',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Continue browsing
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ImageModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined;
    document.documentElement.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [item, onClose]);

  // REMOVED: whatsappLink useMemo

  return createPortal(
    <AnimatePresence>
      {item && (
        <ModalContent item={item} onClose={onClose} />
      )}
    </AnimatePresence>,
    document.body
  );
}