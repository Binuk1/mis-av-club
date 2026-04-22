import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { CgMail } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import "../styles/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>AV Club</h3>
          <p>Capturing moments, creating stories, and bringing events to life since 2026.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram" title="Instagram icons created by Freepik - Flaticon">
              <img src="/social-icons/instagram.png" alt="Instagram" className="social-icon-img" />
            </a>
            <a href="#" aria-label="YouTube" title="Youtube icons created by Freepik - Flaticon">
              <img src="/social-icons/youtube.png" alt="YouTube" className="social-icon-img" />
            </a>
            <a href="#" aria-label="Facebook" title="Facebook icons created by Freepik - Flaticon">
              <img src="/social-icons/facebook.png" alt="Facebook" className="social-icon-img" />
            </a>
            <a href="#" aria-label="TikTok" title="Tiktok icons created by cobynecz - Flaticon">
              <img src="/social-icons/tiktok.png" alt="TikTok" className="social-icon-img" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/" onClick={handleNavClick}>Home</Link></li>
            <li><Link to="/about" onClick={handleNavClick}>About</Link></li>
            <li><Link to="/team" onClick={handleNavClick}>Team</Link></li>
            <li><Link to="/gallery" onClick={handleNavClick}>Gallery</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>
              <span className="contact-icon"><FaLocationDot /></span>
              Lecture Room 2, C3-224 , EDUTECH DESIGNERS
            </li>
            <li>
              <span className="contact-icon"><CgMail /></span>
              iemcorp@iem.edu.my
            </li>
            <li>
              <span className="contact-icon"><SlCalender /></span>
              Meetings: Every Thursday 1:00-3:00 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-school">
          <span>MIS AV Club brought to you by</span>
          <a
            href="https://iem.edu.my/international-school/"
            target="_blank"
            rel="noopener noreferrer"
            className="school-logo-link"
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src="/school logo.png"
              alt="MIS School"
              className="school-logo"
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
            />
          </a>
        </div>
        <p className="footer-credit">Powered by creativity & technology</p>
      </div>
    </footer>
  );
}

export default Footer;