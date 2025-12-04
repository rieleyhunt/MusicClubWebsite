// Board.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Board.css";

type Exec = {
  _id?: string;
  img: string;
  name: string;
  role: string;
};

const Board: React.FC = () => {
  const [execs, setExecs] = useState<Exec[]>([]);

  useEffect(() => {
    const fetchExecs = async () => {
      try {
        const response = await fetch('http://localhost:3001/execs');
        if (response.ok) {
          const data = await response.json();
          setExecs(data);
        } else {
          console.error('Failed to fetch execs:', response.status);
        }
      } catch (error) {
        console.error('Error fetching execs:', error);
      }
    };

    fetchExecs();
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
            <Link to="/Board">
              <button className="button-navbar"><p>Board</p></button>
            </Link>
            <Link to="/Join">
              <button className="button-navbar"><p>Join</p></button>
            </Link>
          </div>
        </div>

      {/* Main page */}
      <div className="board-page">
        <div className="board-content">
          <h1>Executive Board</h1>
          <div className="board-grid">
            {execs.map((exec) => (
              <div key={exec._id || exec.name} className="exec">
                <div 
                  className="exec-photo"
                  style={{
                    backgroundImage: `url(${exec.img || '/profilephoto.jpg'})`
                  }}
                ></div>
                <div className="exec-text">
                  <div className="exec-name"><h1>{exec.name}</h1></div>
                  <div className="exec-role"><h2>{exec.role}</h2></div>
                </div>
              </div>
              ))}
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
    </>
  );
};

export default Board;
