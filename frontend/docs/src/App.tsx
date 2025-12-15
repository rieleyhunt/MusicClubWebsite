import React, { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
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
        {/*Add the nav bar component*/}
        <TopBar />

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
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
