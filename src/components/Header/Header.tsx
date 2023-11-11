import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    console.log("ok");
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="header bg-white dark:bg-black ">
      <div className="header-logo">
        <Link to="/" className="header-logo-link dark:text-white">
          {isMobile ? "ELMA" : "Employee List Management Application"}
        </Link>
      </div>
      <nav className="header-nav">
        <button className="dark:text-white" onClick={handleThemeSwitch}>
          Dark mode
        </button>
        {isMobile ? (
          <FaBars className="burger-icon " onClick={toggleMenu} />
        ) : (
          <ul className={`header-nav-menu  ${showMenu ? "show" : ""}`}>
            <li>
              <Link className="workers-link" to="/workers-list">
                <span className="dark:text-white">Workers</span>
              </Link>
            </li>
            <li>
              <Link className="find-workers-link" to="/find-workers">
                <span className="dark:text-white">Find Worker</span>
              </Link>
            </li>
            <li>
              <Link className="btn-login " to="/login">
                <span className="dark:text-black">Login</span>
              </Link>
            </li>
            <li>
              <Link className="btn-sign-up" to="/sign-up">
                <span className="dark:text-black">Sign Up</span>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
