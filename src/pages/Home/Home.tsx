import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss'; 

export const Home = () => {
  return (
    <div className="container"> 
      <h1 className="heading">Welcome!</h1>
      <Link to="/workers-list" className="button">
        Our employee
      </Link>
    </div>
  );
};

export default Home;
