import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import "../styles/navbar.css";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/team", label: "Team" },
  { path: "/gallery", label: "Gallery" },
  { path: "/contact", label: "Contact Us" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPage = navItems.find(item => item.path === location.pathname)?.label || "Home";

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <a href="https://iem.edu.my/international-school/" target="_blank" rel="noopener noreferrer" className="navbar-logo-link">
          <img src="/school logo.png" alt="MIS" className="navbar-logo" />
        </a>
        <h1>AV Club</h1>
        <button 
          className="mobile-dropdown-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="current-page">{currentPage}</span>
          <VscTriangleDown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
        </button>
      </div>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        {navItems.map(item => (
          <Link 
            key={item.path}
            to={item.path} 
            onClick={() => setIsOpen(false)}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="desktop-nav-links">
        {navItems.map(item => (
          <Link 
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;