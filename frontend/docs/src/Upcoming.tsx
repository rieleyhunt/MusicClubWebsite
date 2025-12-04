import { Link } from "react-router-dom";
import "./Upcoming.css";

// Use relative URL if VITE_API_URL is not set (for App Runner deployment)
// const API = "";

// type Concert = {
//   _id?: string;
//   title: string;
//   date: string;
//   location: string;
//   photo: string;
//   url?: string;
// };

const Upcoming: React.FC = () => {
  // const [concerts, setConcerts] = useState<Concert[]>([]);

  // useEffect(() => {
  //   // Ensure proper URL construction - handle empty API and edge cases
  //   let url;
  //   if (!API || API === "") {
  //     url = "/concerts";
  //   } else {
  //     // Remove trailing slash from API if present
  //     const cleanAPI = API.endsWith("/") ? API.slice(0, -1) : API;
  //     url = `${cleanAPI}/concerts`;
  //   }
  //   console.log("API value:", API);
  //   console.log("Constructed URL:", url);
  //   fetch(url)
  //     .then((r) => r.json())
  //     .then(setConcerts)
  //     .catch((err) => console.error("Error fetching concerts:", err));
  // }, []);
  // console.log(concerts.length);

  return (
    <>
      <div className="app-container">
        <div
          aria-hidden
          style={{
            position: "fixed", // stays in place on scroll
            inset: 0,
            backgroundImage: `url(https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/DSCN1928.JPG)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.6)", // optional darken
            zIndex: -1,
          }}
        />
        {/*Add the logo*/}
        <div className="top-bar">
          <img
            src={
              "https://pub-9539b9de20804c718eb32ea5e85bc69a.r2.dev/assets/bbf%20text%202.png"
            }
            alt="BBF Logo"
            className="bbfWrittenLogo"
          />

          <div className="button-container">
            <Link to="/">
              <button className="button">Home</button>
            </Link>
            <Link to="/upcoming">
              <button className="button">Upcoming</button>
            </Link>
            <Link to="/Board">
              <button className="button">Board</button>
            </Link>
            <Link to="/Join">
              <button className="button">Join</button>
            </Link>
          </div>
        </div>
        <div className="upcoming-page">
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

export default Upcoming;
