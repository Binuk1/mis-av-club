import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "../styles/contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("access_key", "6ebdffa7-dfc5-405d-8820-45d4dc24f09c");
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">
        Have a question or want to work with us? Send us a message!
      </p>

      {submitted ? (
        <div className="success-message">
          <img
            src="https://res.cloudinary.com/dqptpxh4r/image/upload/v1777271315/lx4zia2xhhl2yzmc53v3.png"
            alt="Message sent successfully"
            className="success-image"
            onContextMenu={(e) => e.preventDefault()}
            draggable="false"
          />
          <h2>Message Sent Successfully!</h2>
          <p>Thank you for reaching out. We have received your message and will get back to you as soon as possible.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="send-another-btn"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What's this about?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Tell us more..."
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
