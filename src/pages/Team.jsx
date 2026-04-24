import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import "../styles/team.css";

const teamMembers = [
  { name: "Binuk", role: "Technical Director", icon: "🔧" },
  { name: "Khor Zheng Yu", role: "Camera Director", icon: "🎥" },
  { name: "Lim Zheng Yan", role: "Lead Broadcasting", icon: "📡" },
  { name: "Tan Kee Wei", role: "Photographer", icon: "📷" },
  { name: "Lee Yu Zheng", role: "FOH Audio Engineer", icon: "🎧" },
  { name: "Joseph Phang", role: "Camera Op", icon: "�" },
];

function Team() {
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
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
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

  const currentMember = teamMembers[currentIndex];

  return (
    <div className="team-container">
      <h1>Our Team</h1>
      <p className="subtitle">Meet the crew behind the scenes.</p>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div
            className="team-card"
            key={index}
            onClick={() => openLightbox(index)}
          >
            <div className="avatar">{member.icon}</div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="team-lightbox-overlay" onClick={closeLightbox}>
          <div
            className="team-lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button
              className="team-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <button
              className="team-lightbox-arrow team-lightbox-prev"
              onClick={goToPrevious}
              aria-label="Previous member"
            >
              <FaChevronLeft />
            </button>

            <div className="team-lightbox-card">
              <div className="team-lightbox-avatar">{currentMember.icon}</div>
              <h2>{currentMember.name}</h2>
              <p className="team-lightbox-role">{currentMember.role}</p>
            </div>

            <button
              className="team-lightbox-arrow team-lightbox-next"
              onClick={goToNext}
              aria-label="Next member"
            >
              <FaChevronRight />
            </button>

            <div className="team-lightbox-counter">
              {currentIndex + 1} / {teamMembers.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;