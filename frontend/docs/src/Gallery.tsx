// Gallery.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";
import { Helmet } from "react-helmet-async";

const Gallery: React.FC = () => {
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
        {/* Background Image */}
        <div
          aria-hidden
          style={{
            position: "fixed", // stays in place on scroll
            inset: 0,
            backgroundImage: `url(https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/Broken.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
            filter: "brightness(0.6)", // optional darken
            zIndex: -1,
          }}
        />
        {/*TOP BAR*/}
        <div className="top-bar">
          <div className="top-bar-logo">
            <img
              src="https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Carleton_Music_Club_Ravens_Only_Logo_1.svg"
              alt="Carleon Music Club Logo"
              className="musicClubLogo"
              />
            <h1><span>Carleton</span> Music Club</h1>
          </div>

          <div className="button-container">
            <Link to="/">
              <button className="button-navbar"><p>Home</p></button>
            </Link>
            <Link to="/Events">
              <button className="button-navbar"><p>Events</p></button>
            </Link>
            <Link to="/gallery">
              <button className="button-navbar"><p>Gallery</p></button>
            </Link>
            <Link to="/Join">
              <button className="button-navbar"><p>Join</p></button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
