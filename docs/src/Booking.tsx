// Booking.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Booking.css";

// Use relative URL if VITE_API_URL is not set (for App Runner deployment)
const API = "";

const Booking: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    venue: "",
    message: "",
    hp: "", // honeypot (should stay empty)
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Ensure proper URL construction - handle empty API and edge cases
      let url;
      if (!API || API === "") {
        url = "/booking";
      } else {
        // Remove trailing slash from API if present
        const cleanAPI = API.endsWith("/") ? API.slice(0, -1) : API;
        url = `${cleanAPI}/booking`;
      }
      console.log("API value:", API);
      console.log("Constructed booking URL:", url);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        venue: "",
        message: "",
        hp: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="app-container">
        {/* Background */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage:
              "url(https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSC00012.JPG)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
            filter: "brightness(0.6)",
            zIndex: -1,
          }}
        />

        {/* Top bar */}
        <div className="top-bar">
          <img
            src="https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/bbf%20text%202.png"
            alt="BBF Logo"
            className="bbfWrittenLogo"
          />
          <div className="button-container">
            <Link to="/">
              <button className="button">Home</button>
            </Link>
            <Link to="/upcoming">
              <button className="button">Upcoming</button>
            </Link>
            <Link to="/gallery">
              <button className="button">Gallery</button>
            </Link>
            <Link to="/booking">
              <button className="button">Booking</button>
            </Link>
          </div>
        </div>

        {/* Booking form */}
        <div className="booking-page">
          <h1 className="booking-title">Booking Inquiry</h1>

          <form className="booking-form" onSubmit={onSubmit}>
            {/* Honeypot (hidden field) */}
            <input
              type="text"
              name="hp"
              value={form.hp}
              onChange={onChange}
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px", opacity: 0 }}
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="row">
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your Name *"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Your Email *"
                type="email"
                required
              />
            </div>

            <div className="row">
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="Phone (optional)"
              />
              <input
                name="date"
                value={form.date}
                onChange={onChange}
                placeholder="Event Date (optional)"
              />
            </div>

            <input
              name="venue"
              value={form.venue}
              onChange={onChange}
              placeholder="Venue (optional)"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Tell us about your event… *"
              rows={6}
              required
            />

            <button
              className="button"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Inquiry"}
            </button>

            {status === "sent" && (
              <p className="success-msg">
                Awesome! We will get back as soon as possible!.
              </p>
            )}
            {status === "error" && (
              <p className="error-msg">
                Sorry—couldn’t send. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Booking;
