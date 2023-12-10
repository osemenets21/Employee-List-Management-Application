import React, { useEffect, useState } from "react";
import "./Header.scss";
import { BsMoon, BsSun } from "react-icons/bs";
import Hamburger from "hamburger-react";
import UniversalButton from "../UniversalButton/UniversalButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const { authUser, handleLogout  } = useAuth();

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

  const handleItemClick = () => {
    setShowMenu(false);
    setOpen(false);
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
          title={
            <span className="dark:text-white">
              {isMobile ? "ELMA" : "Employee List Management Application"}
            </span>
          }
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
              <div
                className="menu-wrapper dark:bg-slate-700"
                onClick={() => handleItemClick()}
              >
                <ul className={`header-nav-menu vertical `}>
                  {authUser && (
                    <>
                      <li className="avatar-container rounded-full h-7 w-7 object-cover flex justify-center items-center">
                        <FontAwesomeIcon
                          className="ml-4"
                          icon={faUserTie}
                          style={{ color: "white", fontSize: "23px" }}
                        />
                        <p className="dark:text-white">{authUser.email}</p>
                      </li>
                      <li>
                        <UniversalButton
                          type="link"
                          action="/workers-list"
                          title={
                            <span className="dark:text-white">Workers</span>
                          }
                          classes="find-workers-link mr-3"
                        />
                      </li>

                      <li>
                        <UniversalButton
                          type="button"
                          action={handleLogout}
                          title={
                            <span className="dark:text-black">Logout</span>
                          }
                          classes="btn-logout mr-1 ml-2"
                        />
                      </li>
                    </>
                  )}

                  {!authUser && (
                    <>
                      <li>
                        <UniversalButton
                          type="link"
                          action="/login"
                          title={<span className="dark:text-black">Login</span>}
                          classes="btn-login mr-1"
                        />
                      </li>

                      <li>
                        <UniversalButton
                          type="link"
                          action="/sign-up"
                          title={
                            <span className="dark:text-black">Sign Up</span>
                          }
                          classes="btn-sign-up mr-1 ml-2"
                        />
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </>
        ) : (
          <ul className={`header-nav-menu horizontal`}>
            {authUser && (
              <>
                <li className="avatar-container rounded-full h-7 w-7 object-cover flex justify-center items-center">
                  <FontAwesomeIcon
                    className="ml-4"
                    icon={faUserTie}
                    style={{ color: "white", fontSize: "23px" }}
                  />
                  
                </li>
                <li className="mr-5 ml-2 dark:text-white"><div>{authUser.email}</div></li>
                <li>
                  <UniversalButton
                    type="link"
                    action="/workers-list"
                    title={<span className="dark:text-white">Workers</span>}
                    classes="find-workers-link mr-3"
                  />
                </li>

                <li>
                  <UniversalButton
                    type="button"
                    action={handleLogout}
                    title={<span className="dark:text-black">Logout</span>}
                    classes="btn-logout mr-1 ml-2"
                  />
                </li>
              </>
            )}

            {!authUser && (
              <>
                <li>
                  <UniversalButton
                    type="link"
                    action="/login"
                    title={<span className="dark:text-black">Login</span>}
                    classes="btn-login mr-1"
                  />
                </li>

                <li>
                  <UniversalButton
                    type="link"
                    action="/sign-up"
                    title={<span className="dark:text-black">Sign Up</span>}
                    classes="btn-sign-up mr-1 ml-2"
                  />
                </li>
              </>
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
