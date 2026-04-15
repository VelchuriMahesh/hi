import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageModal from './ImageModal';
import LazyImage from './LazyImage';

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/70 p-3 shadow-card">
      <div className="skeleton aspect-[4/5] animate-shimmer rounded-[22px]" />
    </div>
  );
}

export default function ImageGrid({
  images = [],
  loading = false,
  columnsClassName = 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  carouselOnMobile = false,
  priority = false
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (loading) {
    return (
      <div className={`grid gap-5 ${columnsClassName}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  function renderCard(image, index, compact = false) {
    return (
      <motion.button
        key={image.id || `${image.url}-${index}`}
        type="button"
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedItem(image)}
        className={`group overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-3 text-left shadow-card transition duration-300 ${
          compact ? 'min-w-[78vw] shrink-0 snap-center sm:min-w-0' : ''
        }`}
      >
        <LazyImage
          src={image.url || image.thumbUrl}
          alt={image.alt || image.title || 'Boutique design gallery image'}
          priority={priority}
          sizes={compact ? '78vw' : '(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw'}
          wrapperClassName="aspect-[4/5] rounded-[22px]"
          className="group-hover:scale-[1.02]"
        />
        <div className="space-y-2 px-1 pb-1 pt-4">
          <p className="text-sm font-medium text-stone-700">
            {image.title || image.alt || 'Custom boutique design'}
          </p>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cocoa">
            Tap to explore
          </span>
        </div>
      </motion.button>
    );
  }

  return (
    <>
      {carouselOnMobile ? (
        <>
          <div className="mb-4 flex items-center justify-between sm:hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">
              Tap to explore
            </p>
            <span className="text-xs text-stone-500">Swipe gallery</span>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:hidden">
            {images.map((image, index) => renderCard(image, index, true))}
          </div>
          <div className={`hidden gap-5 sm:grid ${columnsClassName}`}>
            {images.map((image, index) => renderCard(image, index))}
          </div>
        </>
      ) : (
        <div className={`grid gap-5 ${columnsClassName}`}>
          {images.map((image, index) => renderCard(image, index))}
        </div>
      )}

      <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
