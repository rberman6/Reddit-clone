"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();
    console.log(username, password);
  }

  function handleCloseLogin() {
    setShowLoginForm(false);
    router.push("/");
  }

  return (
    <section>
      {showLoginForm && (
        <div className="modal-login">
          <button onClick={handleCloseLogin}>X</button>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </div>
      )}
    </section>
  );
}
