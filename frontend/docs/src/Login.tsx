import { useState, FormEvent } from "react";
import Footer from "./Footer";
import TopBar from "./TopBar";

interface LoginProps {
  onLogin?: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUser] = useState<string>("");
  const [password, setPass] = useState<string>("");

  async function submit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    console.log(data?.error);
    
    console.log(res);
    if (!res.ok) {

      alert("Invalid login:");
      return;
    } else {
        alert("Login successful");
    }

    localStorage.setItem("token", data.token);
    onLogin?.();
  }

  return (
    <div className="app-container">
      <TopBar />
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
      <Footer />
    </div>
  );
}
