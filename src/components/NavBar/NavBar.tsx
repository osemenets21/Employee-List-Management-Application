import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export const NavBar = () => {
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
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className="navBar__logo">
          {isMobile ? "ELMA" : "Employee List Management Application"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll></Nav>
          <Nav className="d-flex align-items-center">
            <Nav.Link className="nav-item">
              <Link to="/workers-list" className="link-item">
                Workers
              </Link>
            </Nav.Link>
            <Nav.Link className="nav-item">
              <Link to="/find-workers" className="link-item">
                Find Worker
              </Link>
            </Nav.Link>
            <ButtonGroup aria-label="Basic example">
              <Nav.Link className="nav-item">
                <Button variant="dark">
                  <Link to="/login" className="btn-login link">
                    Login
                  </Link>
                </Button>
              </Nav.Link>
              <Nav.Link className="nav-item">
                <Button variant="warning">
                  <Link to="/sign-up" className="btn-sign-up link">
                    Sign Up
                  </Link>
                </Button>
              </Nav.Link>
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
