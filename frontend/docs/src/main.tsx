import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Events.css";
import App from "./App";
import Events from "./Events";
import Board from "./Board";
import Join from "./Join";
import Login from "./Login";

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <StrictMode>
      <BrowserRouter>
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
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
