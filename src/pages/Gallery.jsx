import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import OptimizedImage from "../components/OptimizedImage";
import "../styles/gallery.css";

// Gallery images with existing AVIF/WebP optimization
// Using pre-converted files in public/avif assets and public/webp assets folders
const galleryImages = [
  { avif: "/avif-assets/jaypajuscmlcfornfiym.avif", webp: "/webp-assets/avefvprdw4gfvm8nuaax.webp", fallback: "/mis-av-assets/IMG_3022.jpeg", alt: "Event setup" },
  { avif: "/avif-assets/jdqp5rcwlo9xwmfkpzsg.avif", webp: "/webp-assets/dockc0cdg8dcr5j55asm.webp", fallback: "/mis-av-assets/IMG_3024.jpeg", alt: "Live broadcast" },
  { avif: "/avif-assets/kgl6yf6b0ktucjiigrlq.avif", webp: "/webp-assets/egn2jo6h6doljpec4xi3.webp", fallback: "/mis-av-assets/IMG_3044.jpeg", alt: "Behind the scenes" },
  { avif: "/avif-assets/kirtffdddmbgdshbiuqo.avif", webp: "/webp-assets/enr7huitkz5mjobqd1qy.webp", fallback: "/mis-av-assets/IMG_3046.jpeg", alt: "Crew working" },
  { avif: "/avif-assets/mnhzsvllsxi2dpkofjca.avif", webp: "/webp-assets/gjcf1u3ohd3lsfbyowbo.webp", fallback: "/mis-av-assets/IMG_3048.jpeg", alt: "Equipment setup" },
  { avif: "/avif-assets/rhfpsiqubrp11k1vhsvo.avif", webp: "/webp-assets/j1iy3ctaizbacj5ityu2.webp", fallback: "/mis-av-assets/IMG_3055.jpeg", alt: "Production" },
  { avif: "/avif-assets/rvpqlu5thqqhddyiya3o.avif", webp: "/webp-assets/n36uithr2rueuwmhbmin.webp", fallback: "/mis-av-assets/IMG_3480.jpg", alt: "Team at work" },
  { avif: "/avif-assets/s1ecx0wdcbg11j2ayd8m.avif", webp: "/webp-assets/qu2cewmmohupgncxqi59.webp", fallback: "/mis-av-assets/IMG_3481.jpg", alt: "Camera operation" },
  { avif: "/avif-assets/tnfei79qcdwkv9l7rsng.avif", webp: "/webp-assets/sqddjq9tca3v9toidduj.webp", fallback: "/mis-av-assets/IMG_3485.jpg", alt: "Live event" },
  { avif: "/avif-assets/twshdmnoacrcsfmnnm47.avif", webp: "/webp-assets/tc7ese3vvyiseeqetfe5.webp", fallback: "/mis-av-assets/IMG_3526.jpg", alt: "Broadcasting" },
  { avif: "/avif-assets/uqxxio0b5lxnltolpu4s.avif", webp: "/webp-assets/wfgsdtk1wlswetaohqga.webp", fallback: "/mis-av-assets/IMG_6314.jpg", alt: "Audio setup" },
  { avif: "/avif-assets/vjwy3ibcqhwkvwavgffz.avif", webp: "/webp-assets/xprttabjiv2vgkbavfk6.webp", fallback: "/mis-av-assets/IMG_6317.jpg", alt: "Technical director" },
  { avif: "/avif-assets/xmiqngjdami4uqrxeiy5.avif", webp: "/webp-assets/y7psik3wybc3h7by3idc.webp", fallback: "/mis-av-assets/IMG_6331.jpg", alt: "AV Club in action" },
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
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

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
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
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
              priority={index < 4}
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
              priority
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