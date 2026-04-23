import { FaPaperPlane } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/floatingcontact.css";

function FloatingContact() {
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/contact");
  };

  return (
    <button
      onClick={handleClick}
      className="floating-contact-btn"
      aria-label="Contact Us"
    >
      <FaPaperPlane />
    </button>
  );
}

export default FloatingContact;
