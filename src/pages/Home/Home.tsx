import React from "react";
import "./Home.scss";
import { CarouselOfPhoto } from "../../components/CarouselOfPhotos/CarouselOfPhoto";

export const Home = () => {
  return (
    <main>
      <div className="home">
        <h1 className="home-heading dark:bg-slate-900/30 dark:text-white">Our team is the key to your</h1>
        <h2 className="home-heading-word dark:bg-slate-900/30 dark:text-white">SUCCESS</h2>
      </div>
      <div className="about-us dark:bg-slate-800 ">
        <h2 className="about-us-heading">
          <span className="dark:bg-slate-500 dark:text-white">About us</span>
        </h2>
        <p className="about-us-text dark:bg-slate-500 dark:text-white">
          "TechSolutions" reigns supreme in the IT domain, headquartered in the
          vibrant city of Warsaw, with an expansive team of over 250 highly
          skilled professionals excelling in both backend and frontend
          development. Since our establishment in 2010, our track record boasts
          an impressive 5000 successfully completed projects spanning diverse
          industries, underlining our steadfast dedication to cultivating client
          trust and respect. Our renowned culture of innovation propels
          "TechSolutions" to maintain an unrivaled position as the preeminent
          leader in the ever-evolving IT landscape. For those in pursuit of an
          unwavering and indispensable partner for avant-garde solutions,
          "TechSolutions" stands as the epitome of excellence.
        </p>
      </div>

      <div className="carousel">
        <CarouselOfPhoto />
      </div>
    </main>
  );
};

export default Home;
