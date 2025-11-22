import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Events.css";
import { Helmet } from "react-helmet-async";
import { autoShrinkText } from "./autoshrink";
// Use relative URL if VITE_API_URL is not set (for App Runner deployment)
const API = import.meta.env.VITE_API_URL || "";

type Concert = {
  _id?: string;
  title: string;
  date: string;
  location: string;
  photo: string;
  url?: string;
};

const Events: React.FC = () => {
  // const [concerts, setConcerts] = useState<Concert[]>([]);

  // useEffect(() => {
  //   // Ensure proper URL construction - handle empty API and edge cases
  //   let url;
  //   if (!API || API === "") {
  //     url = "/concerts";
  //   } else {
  //     // Remove trailing slash from API if present
  //     const cleanAPI = API.endsWith("/") ? API.slice(0, -1) : API;
  //     url = `${cleanAPI}/concerts`;
  //   }
  //   console.log("API value:", API);
  //   console.log("Constructed URL:", url);
  //   fetch(url)
  //     .then((r) => r.json())
  //     .then(setConcerts)
  //     .catch((err) => console.error("Error fetching concerts:", err));
  // }, []);
  // console.log(concerts.length);
  useEffect(() => {
    const titles = document.querySelectorAll(".event-title h1");
    const whens = document.querySelectorAll(".event-when h2");
    const wheres = document.querySelectorAll(".event-where h2");

    titles.forEach((el) => autoShrinkText(el as HTMLElement));
    whens.forEach((el) => autoShrinkText(el as HTMLElement));
    wheres.forEach((el) => autoShrinkText(el as HTMLElement));
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
        <div
          aria-hidden
          style={{
            position: "fixed", // stays in place on scroll
            inset: 0,
            backgroundImage: `url(https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1928.JPG)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
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
            <h1>Carleton Music Club</h1>
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
            <Link to="/booking">
              <button className="button-navbar"><p>Booking</p></button>
            </Link>
          </div>
        </div>
        <div className="Events-page">
          <div className="events-introduction">
          </div>
          <h1 className="Events">Upcoming Events</h1>
          <div className="events-grid">
            <div className="event-card">
              
              <div className="event-photo">
                <img src="https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Screenshot%202025-11-21%20at%208.06.59%E2%80%AFPM.png"></img>
              </div>
              <div className="event-title">
                <h1>Karaoke Night</h1>
              </div>
              <div className="event-when">
                <h2>Happening November 21st, 2025!</h2>
              </div>
              <div className="event-where">
                <h2>Mackenzie Building ME3174</h2>
              </div>
            </div>

            <div className="event-card">
              
              <div className="event-photo">
                <img src="https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Screenshot%202025-11-21%20at%208.06.59%E2%80%AFPM.png"></img>
              </div>
              <div className="event-title">
                <h1>Karaoke Night</h1>
              </div>
              <div className="event-when">
                <h2>Happening November 21st, 2025!</h2>
              </div>
              <div className="event-where">
                <h2>Mackenzie Building ME3174</h2>
              </div>
            </div>

            <div className="event-card">
              
              <div className="event-photo">
                <img src="https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Screenshot%202025-11-21%20at%208.06.59%E2%80%AFPM.png"></img>
              </div>
              <div className="event-title">
                <h1>Karaoke Night</h1>
              </div>
              <div className="event-when">
                <h2>Happening November 21st, 2025!</h2>
              </div>
              <div className="event-where">
                <h2>Mackenzie Building ME3174</h2>
              </div>
            </div>

            <div className="event-card">
              
              <div className="event-photo">
                <img src="https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Screenshot%202025-11-21%20at%208.06.59%E2%80%AFPM.png"></img>
              </div>
              <div className="event-title">
                <h1>Karaoke Night</h1>
              </div>
              <div className="event-when">
                <h2>Happening November 21st, 2025!</h2>
              </div>
              <div className="event-where">
                <h2>Mackenzie Building ME3174</h2>
              </div>
            </div>
            
          </div>
          <div className="footer">
            <p className="footer-text">
              © 2025 Carleton Music Club. All rights reserved.
            </p>
        </div>
        </div>
      </div>
    </>
  );
};

export default Events;
