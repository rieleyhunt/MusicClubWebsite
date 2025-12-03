import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Events.css";
import { autoShrinkText } from "./autoshrink";

type Event = {
  _id?: string;
  img: string;
  title: string;
  date: string;
  location: string;
};

interface EventsProps {
  isLoggedIn: boolean;
}

const Events: React.FC<EventsProps> = ({ isLoggedIn }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const API = import.meta.env.VITE_API_URL || "";
  const [eventImageUrl, setEventImageUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");

  async function saveEvent() {
    console.log(newTitle, newDate, newLocation, eventImageUrl);
    if (!newTitle || !newDate || !newLocation || !eventImageUrl) {
      alert("Fill all fields and upload an image first!");
      return;
    }

    const body = {
      title: newTitle,
      date: newDate,
      location: newLocation,
      img: eventImageUrl
    };

    const res = await fetch("http://localhost:3001/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      alert("Error saving event");
      return;
    }

    const savedEvent = await res.json();

    // Add to UI
    setEvents((prev) => [...prev, savedEvent]);

    // Close modal & clear form
    setShowModal(false);
    setNewTitle("");
    setNewDate("");
    setNewLocation("");
    setEventImageUrl("");
  }

 const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.url) {
      setEventImageUrl(data.url);
      console.log("Uploaded image URL:", data.url);
    }
  };

  useEffect(() => {
    // Ensure proper URL construction - handle empty API and edge cases
    let url;
    if (!API) {
      url = "/events";
    } else {
      // Remove trailing slash from API if present
      const cleanAPI = API.endsWith("/") ? API.slice(0, -1) : API;
      url = `${cleanAPI}/events`;
    }
    console.log("API value:", API);
    console.log("Constructed URL:", url);
    fetch(url)
      .then((r) => r.json())
      .then(setEvents)
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

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
      <div className="app-container">
        {/*Add the nav bar*/}
        <div className="top-bar">
          <div className="top-bar-logo">
            <Link to="/">
              <img
                src="https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Carleton_Music_Club_Ravens_Only_Logo_1.svg"
                alt="Carleon Music Club Logo"
                className="musicClubLogo"
              />
            </Link>
            <div className="music-club-text">
              <h1>Carleton Music Club</h1>
              <h2>Live - Laugh - Love</h2>
            </div>
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
    
        {/* PAGE CONTENT */}
        <div className="Events-page">
          <div className="events-introduction">
          </div>
          <h1 className="Events">Upcoming Events</h1>
          {isLoggedIn && (
            <button
              className="add-event-button"
              onClick={() => setShowModal(true)}
            >
              +
            </button>
          )}
          <div className="events-grid">
            {events.map((event) => (
              <div className="event-card" key={event._id || event.title}>
                <div className="event-photo">
                  <img src={event.img}></img>
                </div>
                <div className="event-title">
                  <h1>{event.title}</h1>
                </div>
                <div className="event-when">
                  <h2>{event.date}</h2>
                </div>
                <div className="event-where">
                  <h2>{event.location}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="footer">
            <p className="footer-text">
              © 2025 Carleton Music Club. All rights reserved.
            </p>
        </div>
        </div>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Add Event</h2>

            <input
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <input
              placeholder="Date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />

            <input
              placeholder="Location"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={saveEvent}>Save</button>
            </div>
          </div>
      </div>
      )}
      </div>
    </>
  );
};

export default Events;
