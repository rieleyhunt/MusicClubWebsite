import { Link } from "react-router-dom";

function TopBar() {
    return (
        <div className="top-bar">
          <div className="top-bar-logo">
            <Link to="/">
              <img
                src="https://pub-b659d9958160414ca1535341505c5f7c.r2.dev/Carleton_Music_Club_Ravens_Only_Logo_1.svg"
                alt="Carleton Music Club Logo"
                className="musicClubLogo"
              />
            </Link>
            <div className="music-club-text">
              <h1>Carleton Music Club</h1>
              <h2>Play - Learn - Jam</h2>
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
    );
}

export default TopBar;