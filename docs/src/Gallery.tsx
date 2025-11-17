// Gallery.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";
import { Helmet } from "react-helmet-async";

const images: string[] = [
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/BeauRieley.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/BeauRieley2.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/RieleyGerard.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/Trio.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1900.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1901.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1902.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1907.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1922.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1925.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1929.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1935.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/SAM_1356.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/SAM_1378.JPG",
  "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/SAM_1397.JPG",
];
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
        <div className="top-bar">
          <img
            src={
              "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/bbf%20text%202.png"
            }
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

        <div className="gallery-page">
          {/* Masonry container */}
          <div className="masonry">
            {images.map((src, i) => (
              <a
                key={i}
                href={src}
                className="masonry-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="masonry-img"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
