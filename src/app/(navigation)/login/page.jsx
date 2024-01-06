"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import Link from "next/link.js";
import { AiOutlineClose } from "react-icons/ai";
export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch(`/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    console.log(info);
    router.push("/");
    router.refresh();
  }

  function handleCloseLogin() {
    setShowLoginForm(false);
    router.push("/");
    router.refresh();
  }

  return (
    <section id="login-section">
      {showLoginForm && (
        <div className="modal-form">
          <div className="close-btn move-to-right" onClick={handleCloseLogin}>
            <AiOutlineClose />
          </div>
          <h2>Login</h2>
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
            <p className="login-text">
              New to Reddit?{" "}
              <Link href={"/register"} className="register-link">
                Sign up
              </Link>
            </p>
            <p>{error}</p>
          </form>
        </div>
      )}
    </section>
  );
}
