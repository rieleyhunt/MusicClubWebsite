import { Link } from "react-router-dom";
import "./Join.css";

const Join: React.FC = () => {
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
              <h2>Play - Learn - Create</h2>
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

        <div className="join-page">
          <div className="join-image">
            <div className="join-text-box">
              <h1>Join our growing musical community!</h1>
            </div>
          </div>
          <div className="join-socials">
            <div className="join-socials-text-section">
              <div className="intro-left">
                <h1 className="weAreTheCarletonMusicClub">We are the Carleton Music Club</h1>
                <p>Founded in 2022, the Carleton Music Club has been a place for Carleton Universities music enthusiasts to meet and jam together.
                  The Carleton Music Club remains a large and active club, boasting over 700 members of the community. Whether you are a seasoned musician
                  or just starting out, the Carleton Music Club welcomes everyone. 
                </p>
              </div>
              <div className="intro-right">
                <h1 className="weeklyJamSessionMeetups">Weekly Jam Session Meetups</h1>
                <p>The Carleton Music Club often does weekly jam session meetups. This is your chance to meet fellow musicians and make connections that last a lifetime.
                  Many lifelong friends and band mates have been met through these weekly meetups, so taking advantage of these would be worthwhile!
                  During these jam sessions, you are permitted to bring your own instruments, with some limitations on louder ones. And if you do not have an instrument,
                  that is okay as well, everyone is welcome!
                </p>
              </div>
            </div>
            <div className="join-socials-social-section">
              <h1 className="join-our-socials">Join our socials!</h1>
              <div className="join-socials-box">
                <div className="join-socials-grid">
                  <a className="instagram" href="http://instagram.com/musicclubcu" target="_blank" rel="noopener noreferrer">
                    <img src="/Instagram_Red.svg" alt="Follow us on Instagram"></img>
                  </a>
                  <a className="discord" href="https://discord.gg/rCm28JwxVb" target="_blank" rel="noopener noreferrer">
                    <img src="/Discord_Red.svg" alt="Discord"></img>
                  </a>
                </div>
              </div>
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

export default Join;
