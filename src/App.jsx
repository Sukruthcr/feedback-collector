import React, { useState } from "react";
import "./App.css"; // Import your CSS here

function App() {
  const [adminView, setAdminView] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light"); // Dark/Light theme toggle
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedbacks, setFeedbacks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const timestamp = new Date().toLocaleString(); // Add timestamp
      setFeedbacks((prev) => [...prev, { ...formData, timestamp }]);
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const toggleAdminView = () => {
    setAdminView((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app-container ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
      <div className="feedback-card">
        <h1 className="title">Feedback Collector</h1>

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>

        {!adminView ? (
          <>
            {submitted && <p className="success-msg">🎉 Thank you for your feedback!</p>}

            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Your Feedback</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your feedback"
              />
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "🚀 Submit Feedback"}
            </button>
          </>
        ) : (
          <div className="feedback-list">
            <h2>Submitted Feedback</h2>
            {feedbacks.length > 0 ? (
              feedbacks.map((fb, i) => (
                <div key={i} className="feedback-entry">
                  <p>
                    <strong>{fb.name}</strong> ({fb.email})
                  </p>
                  <p>{fb.message}</p>
                  <p className="timestamp">Submitted on: {fb.timestamp}</p>
                </div>
              ))
            ) : (
              <p className="no-feedback">No feedback submitted yet.</p>
            )}
          </div>
        )}

        <button className="toggle-view-btn" onClick={toggleAdminView}>
          {adminView ? "← Back to Feedback Form" : "📋 View Submitted Feedback"}
        </button>
      </div>

      <footer className="footer">
        Created by <strong>Sukruth</strong> | XYZ Project 2025 🚀
      </footer>
    </div>
  );
}

export default App;