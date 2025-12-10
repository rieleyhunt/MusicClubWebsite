import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

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
      <div className="app-container">
        {/*Add the nav bar*/}
        <div className="top-bar">
          <div className="top-bar-logo">
            <Link to="/">
              <img
                src="https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Carleton_Music_Club_Ravens_Only_Logo_1.svg"
                alt="Carleton Music Club Logo"
                className="musicClubLogo"
              />
            </Link>
            <div className="music-club-text">
              <h1>Carleton Music Club</h1>
              <h2>Play - Learn - Create</h2>
            </div>
          </div>

          <div className="button-container">
            <Link to="/">
              <button className="button-navbar"><p>Home</p></button>
            </Link>
            <Link to="/Events">
              <button className="button-navbar"><p>Events</p></button>
            </Link>
            <Link to="/Board">
              <button className="button-navbar"><p>Board</p></button>
            </Link>
            <Link to="/Join">
              <button className="button-navbar"><p>Join</p></button>
            </Link>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="main-page">
          <div className="hero">
            <div className="transparent-box">
              <div className="main-content">
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
            </div>
          </div>


          <div className="footer">
            <div className="footer-text">
              <strong>Carleton Music Club</strong>
              <div className="address">
                <p>1125 Colonel By Drive,</p>
                <p>Ottawa, ON, K1S 5B6</p>
              </div>
              <p>email: <a href="mailto:musicclubcu@gmail.com">musicclubcu@gmail.com</a></p>
              <div className="footer-socials">
                <a href="http://instagram.com/musicclubcu" target="_blank" rel="noopener noreferrer">
                  <img src="/instagram.png" alt="Follow us on Instagram"></img>
                </a>
                <a href="https://discord.gg/rCm28JwxVb" target="_blank" rel="noopener noreferrer">
                  <img src="/discord.png" alt="Discord"></img>
                </a>
              </div>
              <p className="copyright">© 2025 Carleton Music Club. All rights reserved.</p>
            </div>
          </div>
      </div>
      </div>
    </>
  );
};

export default App;
