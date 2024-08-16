import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar p-2 border-b border-gray-800">
      <div className="nav-logo">
        <h1 className="text-2xl">ASHS</h1>
      </div>

      <div className="nav-items">
        <ul>
          <a href="">
            <li>About us</li>
          </a>
          <a href="">
            <li>Demo</li>
          </a>
          <a href="">
            <li>Contact</li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
