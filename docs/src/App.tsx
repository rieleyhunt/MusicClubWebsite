import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { Helmet } from "react-helmet-async";

// const buttons = [
//   { label: "Home", onClick: () => console.log("Home Clicked")},
//   { label: "Events", onClick: () => console.log("Events Clicked")}
// ]
const App: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = headingRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

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
        {/*Add the logo*/}
        <div className="top-bar">
          <img
            src="https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Carleton_Music_Club_Ravens_Only_Logo_1.svg"
            alt="Carl"
            className="musicClubLogo"
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

        {/* PAGE CONTENT */}
        <div className="main-page">
          {/*Add the band name and description */}
          <div className="hero">
            
          </div>
          
          <h1
            ref={headingRef}
            className={`we-are-carleton-music-club ${inView ? "animate" : ""}`}
          >
            We are the Official Carleton Music Club
          </h1>
          <p
            ref={headingRef}
            className={`fostering-a-community ${inView ? "animate" : ""}`}
          >
            Fostering a community of both beginner and experienced musicians
          </p>
        </div>
        <div className="footer">
          <p className="footer-text">
            © 2025 Carleton Music Club. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
