import { useEffect } from "react";
import "../styles/home.css";

// Gallery image URLs to preload (copy the first 6-8 images from your gallery)
const galleryImagesToPreload = [
  "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271306/oxgqzv9ib3qbjqrqnjmn.webp",
  "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271306/r7ihoewv2x80juxmcwox.webp",
  "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/og6hcdhc2wetvf6xbbf2.webp",
  "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/o71uwcrthx4an5ctagj4.webp",
  "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/pormwoaiif1vlkhyutpw.webp",
  "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/oxzbstqnddn2v9muze28.webp",
  "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271305/o1s5jboqthd3mx96ttef.webp",
  "https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/ybjvxt5v8rppnzgsn3w9.webp",
];

function Home() {
  // Preload images when Home page loads (user hasn't clicked Gallery yet)
  useEffect(() => {
    // Method 1: Create image objects (loads into browser cache)
    galleryImagesToPreload.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    // Method 2: Add preload links to document head (more aggressive)
    galleryImagesToPreload.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      link.fetchPriority = "high";
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <h1>MIS AV Club</h1>
        <p>We capture moments, create stories, and bring events to life.</p>
      </div>

      <div className="hero">
        <img 
          src="https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271304/tbkmfsnvzczio5skjjsq.webp" 
          alt="AV showcase"
          fetchPriority="high"  // Tell browser this image is important
        />
      </div>
    </div>
  );
}

export default Home;