// Board.tsx
import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
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
        <TopBar />

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
      </div>
      <Footer />
    </>
  );
};

export default Board;
