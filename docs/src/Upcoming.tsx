import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Upcoming.css';

// Use relative URL if VITE_API_URL is not set (for App Runner deployment)
const API = import.meta.env.VITE_API_URL || '';

type Concert = {
    _id?: string;
    title: string;
    date: string;
    location: string;
    photo: string;
    url?: string;
}

const Upcoming: React.FC = () => {
    const [concerts, setConcerts] = useState<Concert[]>([]);

    useEffect(() => {
      fetch(`${API}/concerts`)
        .then(r => r.json())
        .then(setConcerts)
        .catch(err => console.error('Error fetching concerts:', err));
    }, []);  
    console.log(concerts.length)
  
    return (
    <div className="app-container">
      <div
        aria-hidden
        style={{
          position: 'fixed',       // stays in place on scroll
          inset: 0,
          backgroundImage: `url(https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1928.JPG)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.6)', // optional darken
          zIndex: -1,
        }}
      />
      {/*Add the logo*/}
      <div className="top-bar">
        <img src={"https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/bbf%20text%202.png"} alt="BBF Logo" className="bbfWrittenLogo" />

        <div className="button-container">
            <Link to="/"><button className="button">Home</button></Link>
            <Link to="/upcoming"><button className="button">Upcoming</button></Link>
            <Link to="/gallery"><button className="button">Gallery</button></Link>
            <Link to="/booking"><button className="button">Booking</button></Link>
        </div>
      </div>
      <div className="upcoming-page">
        <h1 className="upcoming-shows">Upcoming Shows</h1>
        <div className="concerts-grid">
          {concerts.map((concert) => {
            const href = concert.url || '#';
            const external = /^https?:\/\//i.test(href);

            return (
              <a
                key={concert._id}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="concert-card-link"
                aria-label={`View details for ${concert.title}`}
              >
                <div className="concert-card">
                  <img src={concert.photo} alt={concert.title} className="concert-img" />
                  <h2>{concert.title}</h2>
                  <p>{concert.date}</p>
                  <p>{concert.location}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
    );
  };
  
export default Upcoming;