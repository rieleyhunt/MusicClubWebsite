import { useState, FormEvent } from "react";
import Footer from "./Footer";
import TopBar from "./TopBar";
import { useAuth } from "./AuthContext";
import "./Login.css";

interface LoginProps {
  API: string;
}

export default function Login({ API }: LoginProps) {
  const [username, setUser] = useState<string>("");
  const [password, setPass] = useState<string>("");

  const { login, logout, isLoggedIn } = useAuth();

  async function submit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      alert("Invalid login:");
      return;
    } else {
        alert("Login successful");
    }

    login(data.token);
  }


  return (
    <div className="app-container">
      <TopBar />
      {!isLoggedIn && (
        <div className="login-form">
          <form onSubmit={submit}>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
      {isLoggedIn && (
        <div className="logout-form">
          <form onSubmit={logout}>
            <button type="submit">Logout</button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
}
