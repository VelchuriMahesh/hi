import { useState } from 'react';

export default function LazyImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  sizes = '100vw'
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && <div className="skeleton absolute inset-0 animate-shimmer" />}
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-200 p-6 text-center text-sm text-cocoa">
          {alt}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(true);
            setFailed(true);
          }}
          style={{ imageRendering: 'auto' }}
          className={`h-full w-full object-cover transition duration-500 ${
            loaded ? 'scale-100 opacity-100' : 'scale-100 opacity-0'
          } ${className}`}
        />
      )}
    </div>
  );
}

