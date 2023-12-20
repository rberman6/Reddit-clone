"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function Register() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    console.log(newUsername, newPassword);
    const response = await fetch(`api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
      }),
    });
    const info = await response.json();
    console.log(info);
    router.push("/");
  }

  function handleCloseRegister() {
    setShowRegisterForm(false);
    router.push("/");
  }

  return (
    <section id="register-section">
      {showRegisterForm && (
        <div className="modal-form">
          <button
            className="close-btn"
            type="button"
            onClick={handleCloseRegister}
          >
            X
          </button>
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
          </form>
        </div>
      )}
    </section>
  );
}
