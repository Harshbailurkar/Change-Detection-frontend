import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import Background from "./Background"; // Adjust the import path as needed

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <Background /> {/* Add the Background component here */}
      <div className="hero-content">
        <div className="hero-top mb-20">
          <h1 className="text-5xl font-medium">
            Witness the Apocalyptic scale of human destruction on Earth's
            ecosystems
          </h1>
        </div>

        <div className="hero-bottom">
          <Link to={"/main"}>
            <button className="p-3 px-6 mt-16 border border-gray-600">
              Try now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
