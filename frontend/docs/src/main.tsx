import { createRoot } from "react-dom/client";
import { AuthProvider } from "./AuthContext";
import Root from "./Root";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Root />
  </AuthProvider>
);
