import React, { useEffect, useState } from "react";
import "./Header.scss";
import { BsMoon, BsSun } from "react-icons/bs";
import Hamburger from "hamburger-react";
import UniversalButton from "../Button&Link/UniversalButton";
import avatar from "../../assets/avatar.png";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { user, handleLogout } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

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
        <UniversalButton
          type="link"
          action="/"
          title={isMobile ? "ELMA" : "Employee List Management Application"}
          classes="header-logo-link dark:text-white"
        />
      </div>
      <nav className="header-nav">
        {isMobile ? (
          <>
            <div className="burger-icon dark:text-white" onClick={toggleMenu}>
              <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
            </div>
            {showMenu && (
              <div className="menu-wrapper dark:bg-slate-700">
                <ul className={`header-nav-menu vertical `}>
                  <li>
                    <UniversalButton
                      type="link"
                      action="/workers-list"
                      title={<span className="dark:text-white">Workers</span>}
                      classes="find-workers-link"
                    />
                  </li>
                  {token ? (
                    <li>
                      <div className="avatar-container rounded-full h-7 w-7 object-cover">
                        {user && user.avatar ? (
                          <img
                            src={avatar}
                            alt="User Avatar"
                            className="avatar rounded-full h-7 w-7 object-cover"
                          />
                        ) : (
                          <img
                            src={avatar}
                            alt="Default Avatar"
                            className="avatar rounded-full h-7 w-7 object-cover"
                          />
                        )}
                      </div>
                    </li>
                  ) : (
                    <li>
                      <UniversalButton
                        type="link"
                        action="/login"
                        title={<span className="dark:text-black">Login</span>}
                        classes="btn-login"
                      />
                    </li>
                  )}
                  
                  <li>
                    <UniversalButton
                      type="link"
                      action="/sign-up"
                      title={<span className="dark:text-black">Sign Up</span>}
                      classes="btn-sign-up"
                    />
                  </li>
                  {token && ( 
                    <li>
                      <UniversalButton
                        type="button"
                        action={handleLogout}
                        title={<span className="dark:text-black">Logout</span>}
                        classes="btn-logout"
                      />
                    </li>
                  )}
                </ul>
              </div>
            )}
          </>
        ) : (
          <ul className={`header-nav-menu horizontal`}>
            <li>
              <UniversalButton
                type="link"
                action="/workers-list"
                title={<span className="dark:text-white">Workers</span>}
                classes="find-workers-link"
              />
            </li>
            {token ? (
              <li>
                <div className="avatar-container rounded-full h-7 w-7 object-cover">
                  {user && user.avatar ? (
                    <img
                      src={avatar}
                      alt="User Avatar"
                      className="avatar rounded-full h-7 w-7 object-cover"
                    />
                  ) : (
                    <img
                      src={avatar}
                      alt="Default Avatar"
                      className="avatar rounded-full h-7 w-7 object-cover"
                    />
                  )}
                </div>
              </li>
            ) : (
              <li>
                <UniversalButton
                  type="link"
                  action="/login"
                  title={<span className="dark:text-black">Login</span>}
                  classes="btn-login"
                />
              </li>
            )}
            <li>
              <UniversalButton
                type="link"
                action="/sign-up"
                title={<span className="dark:text-black">Sign Up</span>}
                classes="btn-sign-up"
              />
            </li>
            {token && ( 
              <li>
                <UniversalButton
                  type="button"
                  action={handleLogout}
                  title={<span className="dark:text-black">Logout</span>}
                  classes="btn-logout"
                />
              </li>
            )}
          </ul>
        )}


        <div className="switch-mode">
          {darkMode ? (
            <BsMoon className="moon-icon" onClick={handleThemeSwitch} />
          ) : (
            <BsSun className="sun-icon" onClick={handleThemeSwitch} />
          )}
        </div>
      </nav>
    </header>
  );
};
