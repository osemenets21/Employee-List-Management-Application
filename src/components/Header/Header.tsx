import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { BsMoon, BsSun } from "react-icons/bs";
import Hamburger from "hamburger-react";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setOpen] = useState(false);

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
    setDarkMode(!darkMode);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`header ${
        isMobile ? "mobile" : ""
      } bg-white dark:bg-slate-800`}
    >
      <div className="header-logo">
        <Link to="/" className="header-logo-link dark:text-white">
          {isMobile ? "ELMA" : "Employee List Management Application"}
        </Link>
      </div>
      <nav className="header-nav">
        {isMobile ? (
          <> 
            <div className="burger-icon dark:text-white" onClick={toggleMenu}>
              <Hamburger size={20} toggled={isOpen} toggle={setOpen}/>
            </div>
            {showMenu && (
              <div className="menu-wrapper dark:bg-slate-700">
                <ul className={`header-nav-menu vertical `}>
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
                    <Link className="btn-login" to="/login">
                      <span className="dark:text-black">Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="btn-sign-up" to="/sign-up">
                      <span className="dark:text-black">Sign Up</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <ul className={`header-nav-menu horizontal`}>
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
              <Link className="btn-login" to="/login">
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

        <div className="switch-mode">
          {darkMode ? (
            <BsMoon className="moon-icon" onClick={handleThemeSwitch} />
          ) : (
            <BsSun onClick={handleThemeSwitch} />
          )}
        </div>
      </nav>
    </header>
  );
};
