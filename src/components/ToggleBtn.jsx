"use client";

export default function ToggleBtn() {
  function handleToggleClick() {
    console.log("click");
  }

  return (
    <>
      <input type="checkbox" id="theme-switcher" />
      <label htmlFor="theme-switcher" className="toggle-container">
        <div onClick={handleToggleClick} className="toggle-inner"></div>
      </label>
    </>
  );
}
