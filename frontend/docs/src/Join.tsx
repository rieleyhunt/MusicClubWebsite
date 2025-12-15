import "./Join.css";
import TopBar from "./TopBar";
import Footer from "./Footer";

const Join: React.FC = () => {
  return (
    <>
      <TopBar />
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
              <div className="join-socials-box">
              <h1 className="join-our-socials">Join our socials!</h1>
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
      <Footer />
    </>
  );
};

export default Join;
