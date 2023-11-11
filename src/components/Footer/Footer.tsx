import React from "react";
import "./Footer.scss";
import { AiFillFacebook, AiFillGithub, AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-media">
        <a href="https://www.facebook.com/brlltman/"><AiFillFacebook className="footer-icons"/></a>
        <a href="https://www.linkedin.com/in/oleh-semenets/"><AiFillLinkedin className="footer-icons"/></a> 
        <a href="https://www.instagram.com/brlltman/"><AiOutlineInstagram className="footer-icons"/></a> 
        <a href="https://github.com/osemenets21"><AiFillGithub className="footer-icons github-ico"/></a> 
      </div>
      <div className="footer-text">© Warsaw, Poland</div>
    </footer>
  );
};
