"use client";
import { useEffect, useState } from "react";

export default function ToggleBtn() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleToggleClick() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    const body = document.querySelector("body");
    if (isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <>
      {/* <input type="checkbox" id="theme-switcher" />
      <label htmlFor="theme-switcher" className="toggle-container">
        <div onClick={handleToggleClick} className="toggle-inner"></div>
      </label> */}
    </>
  );
}
