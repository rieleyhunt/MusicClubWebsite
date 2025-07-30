import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bbfWrittenLogo from './assets/bbfwritten.png'
import './Upcoming.css';
const API = import.meta.env.VITE_API_URL;

type Concert = {
    _id?: string;
    title: string;
    date: string;
    location: string;
    photo: string;
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
      {/*Add the logo*/}
      <div className="top-bar">
        <img src={bbfWrittenLogo} alt="BBF Logo" className="bbfWrittenLogo" />

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
            {concerts.map((concert) => (
            <div key={concert._id} className="concert-card">
                <img src={concert.photo} alt={concert.title} className="concert-img" />
                <h2>{concert.title}</h2>
                <p>{concert.date}</p>
                <p>{concert.location}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
    );
  };
  
export default Upcoming;