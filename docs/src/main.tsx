import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Events.css";
import App from "./App.tsx";
import Events from "./Events.tsx";
import Gallery from "./Gallery.tsx";
import Join from "./Join.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/Join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
