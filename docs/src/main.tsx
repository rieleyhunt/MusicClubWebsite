import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Events.css";
import App from "./App.tsx";
import Events from "./Events.tsx";
import Gallery from "./Gallery.tsx";
import Join from "./Join.tsx";
import Login from "./Login.tsx";
import { HelmetProvider } from "react-helmet-async";

// Wrap everything in a small Root component to provide login state
function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") // true if token exists
  );

  return (
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Events" element={<Events {...({ isLoggedIn } as any)} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/Join" element={<Join />} />
            <Route
              path="/Login"
              element={<Login onLogin={() => setIsLoggedIn(true)} />}
            />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
