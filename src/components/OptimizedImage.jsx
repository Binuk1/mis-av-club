import { useState } from 'react';
import '../styles/optimizedimage.css';

// Global cache to track loaded images across the app
const loadedImageCache = new Set();

function OptimizedImage({ avifSrc, webpSrc, fallbackSrc, alt, className, onClick, priority = false }) {
  // Check if image was already loaded in this session or stored in localStorage
  const imageKey = fallbackSrc;
  const wasPreviouslyLoaded = loadedImageCache.has(imageKey) || localStorage.getItem(`img_${imageKey}`);
  const [loaded, setLoaded] = useState(wasPreviouslyLoaded || false);

  return (
    <div className={`optimized-image-container ${loaded ? 'loaded' : ''}`}>
      {!loaded && <div className="skeleton-loader" />}
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onClick={onClick}
          onLoad={() => {
            setLoaded(true);
            loadedImageCache.add(imageKey);
            localStorage.setItem(`img_${imageKey}`, 'true');
          }}
        />
      </picture>
    </div>
  );
}

export default OptimizedImage;
