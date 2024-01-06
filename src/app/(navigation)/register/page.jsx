"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import Link from "next/link.js";
import { AiOutlineClose } from "react-icons/ai";

export default function Register() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    console.log(newUsername, newPassword);
    const response = await fetch(`/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
      }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    // console.log(info);
    router.push("/");
    router.refresh();
  }

  function handleCloseRegister() {
    setShowRegisterForm(false);
    router.push("/");
  }

  return (
    <section id="register-section">
      {showRegisterForm && (
        <div className="modal-form">
          <div
            className="close-btn move-to-right"
            type="button"
            onClick={handleCloseRegister}
          >
            <AiOutlineClose />
          </div>

          <h2>Sign Up</h2>
          <form className="sign-up-form" onSubmit={handleRegister}>
            <input
              className="input-field"
              onChange={(e) => setNewUsername(e.target.value)}
              value={newUsername}
              placeholder="Enter Username"
            />
            <input
              className="input-field"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              placeholder="Enter password"
              type="password"
            />
            <button className="form-btn">Register</button>
            <p className="register-text">
              Already a redditor?{" "}
              <Link href={"/login"} className="login-link">
                Login
              </Link>
            </p>
            <p className="error-reg-login-msg">{error}</p>
          </form>
        </div>
      )}
    </section>
  );
}
