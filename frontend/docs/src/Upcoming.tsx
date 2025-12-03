import { Link } from "react-router-dom";
import "./Upcoming.css";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      </Helmet>
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
            <Link to="/gallery">
              <button className="button">Gallery</button>
            </Link>
            <Link to="/Join">
              <button className="button">Join</button>
            </Link>
          </div>
        </div>
        <div className="upcoming-page">
        </div>
      </div>
    </>
  );
};

export default Upcoming;
