import { useState, useEffect } from 'react';
import '../styles/optimizedimage.css';

function OptimizedImage({ avifSrc, webpSrc, fallbackSrc, alt, className, onClick, index = 0 }) {
  const [loaded, setLoaded] = useState(false);

  // Check if image is already in browser cache
  useEffect(() => {
    const img = new Image();
    img.src = fallbackSrc;
    if (img.complete) {
      setLoaded(true);
    }
  }, [fallbackSrc]);

  // Priority for first 6 images (parallel loading)
  const fetchPriority = index < 6 ? "high" : "auto";

  return (
    <div className={`optimized-image-container ${loaded ? 'loaded' : ''}`}>
      {!loaded && <div className="skeleton-loader" aria-hidden="true" />}
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          onClick={onClick}
          loading="eager"
          fetchPriority={fetchPriority}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </picture>
    </div>
  );
}

export default OptimizedImage;