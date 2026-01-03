import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Events from "./Events";
import Board from "./Board";
import Join from "./Join";
import Login from "./Login";

function Root() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Events" element={<Events API={API} />} />
        <Route path="/Board" element={<Board API={API} />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default Root;
