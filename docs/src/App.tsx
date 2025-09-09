import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

// Temporarily disabled redirect until brokenbyfriday.com is properly configured
// if (
//   import.meta.env.PROD && 
//   window.location.hostname === 'sidysm7pb7.us-east-1.awsapprunner.com'
// ) {
//   window.location.href = 'https://www.brokenbyfriday.com' + window.location.pathname;
// }

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
    <div className="app-container">
      {/*Add the logo*/}
      <div className="top-bar">
        <img src='https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/bbf%20text%202.png' alt="BBF Logo" className="bbfWrittenLogo" />

        <div className="button-container">
            <Link to="/"><button className="button">Home</button></Link>
            <Link to="/upcoming"><button className="button">Upcoming</button></Link>
            <Link to="/gallery"><button className="button">Gallery</button></Link>
            <Link to="/booking"><button className="button">Booking</button></Link>
        </div>
      </div>
      <div className="logo-container">
        <img src='https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/collage1.jpg' alt= "Concert1" className = "concert1" />
        <img src='https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Carleton_Music_Club_Ravens_Only_Logo_1.svg' alt = "Broken By Friday Logo" className = "logo" />
      </div>
      <div className="main-page">
        {/*Add the band name and description */}
        <h1 ref={headingRef} className={`we-are-broken-by-friday ${inView ? 'animate' : ''}`}>We are the Official Carleton Music Club</h1>
        <p ref={headingRef} className={`ottawa-pop-punk ${inView ? 'animate' : ''}`}>Fostering a community of both beginner and experienced musicians</p>
        <div className="display-photos">
          <img src='https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/Concert2.JPG' alt="Concert2" className="concert2" />
          <img src='https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/Concert3.JPG' alt="Concert3" className="concert3" />
          <img src='https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/Concert4.JPG' alt="Concert4" className="concert4" />
        </div>
      </div>
      <div className="footer">
        <p className="footer-text">© 2025 Carleton Music Club. All rights reserved.</p>
      </div>
    </div>
  );
};

export default App;