import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import employeeFirst from './images/employee-first.png';
import employeeSecond from './images/employee-second.png';

export const Home = () => {
  return (
    <div className="container">
      <div className="background-line"></div>
      <img src={employeeFirst} alt="workers-first-img" className="workers-first-img" />
      <div className="heading">
        <h1 className="heading-text">
          We take joy in every success achieved side by side with our amazing clients
        </h1>
        <Link to="/workers-list" className="heading-button">
          Our employees
        </Link>
      </div>
      <img src={employeeSecond} alt="workers-second-img" className="workers-second-img" />
    </div>
  );
};

export default Home;
