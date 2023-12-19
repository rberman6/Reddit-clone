"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function Register() {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const router = useRouter();

  function handleRegister(e) {
    e.preventDefault();
    console.log(newUsername, newPassword);
    router.push("/");
  }

  function handleCloseRegister() {
    setShowRegisterForm(false);
    router.push("/");
  }

  return (
    <section>
      {showRegisterForm && (
        <div className="modal-sign-up">
          <button onClick={handleCloseRegister}>X</button>
          <form onSubmit={handleRegister}>
            <input
              onChange={(e) => setNewUsername(e.target.value)}
              value={newUsername}
              placeholder="Enter Username"
            />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              placeholder="Enter password"
              type="password"
            />
            <button>Register</button>
          </form>
        </div>
      )}
    </section>
  );
}
