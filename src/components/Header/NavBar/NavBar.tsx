import React from "react";
import "./NavBar.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>Employee list management application</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll></Nav>
          <Nav className="d-flex align-items-center">
            <Nav.Link>
              <Link to="/workers-list" className="link">Workers</Link>
            </Nav.Link>
            <ButtonGroup aria-label="Basic example">
              <Nav.Link>
                <Button variant="dark" >
                  <Link to="/login" className="btn-login link">Login</Link>
                </Button>
              </Nav.Link>
              <Nav.Link>
                <Button variant="warning">
                  <Link to="/sing-up" className="btn-sing-up link">Sing Up</Link>
                </Button>
              </Nav.Link>
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
