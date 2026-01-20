import React, { useState, useEffect } from "react";
import "./Events.css";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { autoShrinkText } from "./autoshrink";
import { authFetch } from "./authFetch.ts";
import { useAuth } from "./AuthContext";

type Event = {
  _id?: string;
  img: string;
  title: string;
  date: string;
  location: string;
};

interface EventsProps {
  API: string;
}

const Events: React.FC<EventsProps> = ({ API }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [eventImageUrl, setEventImageUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const { logout, isLoggedIn } = useAuth();

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

    const res = await fetch(`${API}/events`, {
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

  async function handleDeleteEvent(eventName: string) {

    try {
      const res = await authFetch(
        `${API}/events`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: eventName,
          }),
        },
        logout  
      );

      if (res.ok) {
        console.log("backend responeded, with eventname", eventName);
      }
      if (!res.ok) {
        console.error(`Failed to delete event ${eventName}`);
      }
    } catch(err) {
      console.error(err);
    }
  } 

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await authFetch(
        `${API}/upload`,
        {
          method: "POST",
          body: formData
        },
        logout
      );

      const data = await res.json();

      if (data.url) {
        setEventImageUrl(data.url);
        console.log("Uploaded image URL:", data.url);
      }
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch(`${API}/events`, {
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Unable to fetch events");
      }
      return res.json()
    })
    .then(setEvents)
    .catch((err) => console.error("Error fetching events: ", err));
  }, [API]);

  useEffect(() => {
    const shrinkAll = () => {
      const titles = document.querySelectorAll(".event-title h1");
      const whens = document.querySelectorAll(".event-when h2");
      const wheres = document.querySelectorAll(".event-where h2");

      titles.forEach((el) => autoShrinkText(el as HTMLElement));
      whens.forEach((el) => autoShrinkText(el as HTMLElement));
      wheres.forEach((el) => autoShrinkText(el as HTMLElement));
    };

    shrinkAll();
    window.addEventListener("resize", shrinkAll);
    return () => window.removeEventListener("resize", shrinkAll);
  }, [events]);

  useEffect(() => {
    const shrinkAll = () => {
      const titles = document.querySelectorAll(".event-title h1");
      titles.forEach((el) => autoShrinkText(el as HTMLElement));
    };

    shrinkAll();
    window.addEventListener("resize", shrinkAll);
    return () => window.removeEventListener("resize", shrinkAll);
  }, [events]);

  return (
    <>
      <div className="app-container">
        {/*Add the nav bar*/}
        <TopBar />
    
        {/* PAGE CONTENT */}
        <div className="Events-page">
          <div className="events-introduction">
          </div>
          <h1 className="Events">Upcoming Events</h1>
          
          <div className="events-grid">
            {events.map((event) => (
              <div className="event-card" key={event._id || event.title}>
                <div className="event-photo">
                  <img src={event.img}></img>
                  {isLoggedIn && (
                  <div className="event-delete">
                    <button className="event-delete-button" onClick={() => handleDeleteEvent(event.title)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f00c0c" className="size-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  )}
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
          {isLoggedIn && (
            <button
              className="add-event-button"
              onClick={() => setShowModal(true)}
            >
              Add Event
            </button>
          )}
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
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Events;
