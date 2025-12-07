import { createRoot } from "react-dom/client";
import { useState } from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./Events.css";
import App from "./App";
import Events from "./Events.tsx";
import Board from "./Board.tsx";
import Join from "./Join.tsx";
import Login from "./Login.tsx";

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Events" element={<Events {...({ isLoggedIn } as any)} />} />
          <Route path="/Board" element={<Board />} />
          <Route path="/Join" element={<Join />} />
          <Route
            path="/Login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
        </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
