import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import OptimizedImage from "../components/OptimizedImage";
import "../styles/gallery.css";

// Gallery images using Cloudinary URLs
const galleryImages = [
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271306/oxgqzv9ib3qbjqrqnjmn.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271306/oxgqzv9ib3qbjqrqnjmn.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271306/oxgqzv9ib3qbjqrqnjmn.webp", alt: "Event setup" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271306/r7ihoewv2x80juxmcwox.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271306/r7ihoewv2x80juxmcwox.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271306/r7ihoewv2x80juxmcwox.webp", alt: "Live broadcast" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/og6hcdhc2wetvf6xbbf2.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/og6hcdhc2wetvf6xbbf2.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/og6hcdhc2wetvf6xbbf2.webp", alt: "Behind the scenes" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/o71uwcrthx4an5ctagj4.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/o71uwcrthx4an5ctagj4.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/o71uwcrthx4an5ctagj4.webp", alt: "Crew working" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/pormwoaiif1vlkhyutpw.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/pormwoaiif1vlkhyutpw.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/pormwoaiif1vlkhyutpw.webp", alt: "Equipment setup" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/oxzbstqnddn2v9muze28.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/oxzbstqnddn2v9muze28.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/oxzbstqnddn2v9muze28.webp", alt: "Production" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/o1s5jboqthd3mx96ttef.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/o1s5jboqthd3mx96ttef.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/o1s5jboqthd3mx96ttef.webp", alt: "Team at work" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/ybjvxt5v8rppnzgsn3w9.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/ybjvxt5v8rppnzgsn3w9.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/ybjvxt5v8rppnzgsn3w9.webp", alt: "Camera operation" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/xiud0kohxpcmrmxunvrr.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/xiud0kohxpcmrmxunvrr.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/xiud0kohxpcmrmxunvrr.webp", alt: "Live event" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/cdil4vmbzt6ltmdccg3m.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/cdil4vmbzt6ltmdccg3m.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/cdil4vmbzt6ltmdccg3m.webp", alt: "Broadcasting" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/p5vmppoz7bath2i1gbc7.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/p5vmppoz7bath2i1gbc7.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/p5vmppoz7bath2i1gbc7.webp", alt: "Audio setup" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271303/hicilcgp3ce0jad7asxl.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271303/hicilcgp3ce0jad7asxl.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271303/hicilcgp3ce0jad7asxl.webp", alt: "Technical director" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271303/fdx2mxigo1fpezxx6i7t.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271303/fdx2mxigo1fpezxx6i7t.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271303/fdx2mxigo1fpezxx6i7t.webp", alt: "AV Club in action" },
  { avif: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/tbkmfsnvzczio5skjjsq.webp", webp: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/tbkmfsnvzczio5skjjsq.webp", fallback: "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/tbkmfsnvzczio5skjjsq.webp", alt: "Showcase" },
];

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, [galleryImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, [galleryImages.length]);

  // Keyboard event listener
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  // Body scroll lock
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // Touch handlers for swipe gestures
  const onTouchStart = (e) => {
    if (!lightboxOpen) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (!lightboxOpen) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!lightboxOpen) return;
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div className="gallery">
      <h1>Gallery</h1>

      <div className="grid">
        {galleryImages.map((image, index) => (
          <div key={index} className="gallery-item">
            <OptimizedImage
              avifSrc={image.avif}
              webpSrc={image.webp}
              fallbackSrc={image.fallback}
              alt={image.alt}
              className="gallery-thumbnail"
              onClick={() => openLightbox(index)}
              index={index}
            />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
              <FaTimes />
            </button>

            <button className="lightbox-arrow lightbox-prev" onClick={goToPrevious} aria-label="Previous image">
              <FaChevronLeft />
            </button>

            <OptimizedImage
              avifSrc={galleryImages[currentIndex].avif}
              webpSrc={galleryImages[currentIndex].webp}
              fallbackSrc={galleryImages[currentIndex].fallback}
              alt={galleryImages[currentIndex].alt}
              className="lightbox-image"
              index={0}
            />

            <button className="lightbox-arrow lightbox-next" onClick={goToNext} aria-label="Next image">
              <FaChevronRight />
            </button>

            <div className="lightbox-counter">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;