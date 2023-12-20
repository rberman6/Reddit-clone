"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    console.log(username, password);
    // const response = await fetch(`api/users/login`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username,
    //     password,
    //   }),
    // });
    // const info = await response.json();
    console.log(info);
  }

  function handleCloseLogin() {
    setShowLoginForm(false);
    router.push("/");
  }

  return (
    <section id="login-section">
      {showLoginForm && (
        <div className="modal-form">
          <button className="close-btn" onClick={handleCloseLogin}>
            X
          </button>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              className="input-field"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="form-btn">Login</button>
          </form>
        </div>
      )}
    </section>
  );
}
