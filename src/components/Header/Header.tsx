import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/" className="header-logo-link">
          {isMobile ? "ELMA" : "Employee List Management Application"}
        </Link>
      </div>
      <nav className="header-nav">
        <ul className="header-nav-menu">
            <li><Link to="/workers-list">Workers</Link></li>
            <li><Link to="/find-workers">Find Worker</Link></li>
            <li><Link className="btn-login" to="/login">Login</Link></li>
            <li><Link className="btn-sign-up" to="/sign-up">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};
