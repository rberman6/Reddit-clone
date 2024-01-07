"use client";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link.js";
import CreatePostBtn from "./CreatePostBtn.jsx";
import Logout from "./Logout.jsx";
import { FaReddit } from "react-icons/fa";
import { useRouter } from "next/navigation.js";
import { AiOutlineClose } from "react-icons/ai";

export default function HamburgerMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleHamburgerClick() {
    setIsOpen(!isOpen);
  }

  function handleClickClose() {
    setIsOpen(!isOpen);
  }

  function navigateAndCloseMenu(path) {
    router.push(path);
    setIsOpen(false);
  }

  return (
    <>
      <div onClick={handleHamburgerClick} className="mobile-hamburger">
        <RxHamburgerMenu />
      </div>
      {isOpen && (
        <div className="mobile-menu-container">
          <div className="close-btn" onClick={handleClickClose}>
            <AiOutlineClose />
          </div>
          <ul className="nav-links">
            <li>
              <div onClick={() => navigateAndCloseMenu("/")}>
                <FaReddit className="show-mobile" />
              </div>
            </li>
            <li>
              <div
                className="dark-links"
                onClick={() => navigateAndCloseMenu("/subreddits")}
              >
                Subreddits
              </div>
            </li>
            {!user.id && (
              <>
                <li>
                  <div onClick={() => navigateAndCloseMenu("/login")}>
                    Login
                  </div>
                </li>
                <li>
                  <div onClick={() => navigateAndCloseMenu("/register")}>
                    Sign Up
                  </div>
                </li>
              </>
            )}
          </ul>
          {user.id && (
            <>
              <span className="italic">Welcome {user.username}</span>
              <div onClick={() => navigateAndCloseMenu("/")}>
                <Logout />
              </div>
            </>
          )}
          <div onClick={() => navigateAndCloseMenu("/submit")}>
            <CreatePostBtn />
          </div>
        </div>
      )}
    </>
  );
}
