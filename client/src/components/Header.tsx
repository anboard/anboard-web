import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header: React.FC = () => {
  return (
    <nav className="nav-container">
      <img src="/logo.png" alt="" />

      <div className="nav-right-container">
        <div className="right-row-one nav-list">
          <a href="/news">News</a>
          <a href="/corporate-partners">Corporate Partners</a>
          <a href="/events">Events</a>
          <a href="http://localhost:3000" className="login-btn">Member Login</a>
        </div>
        <div className="right-row-two nav-list">
          <a href="/home">Home</a>
          <a href="/#">About</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/#">Membership</a>
          <button className="search-btn">
            <svg
              className="search-icon"
              width="30"
              height="30"
              viewBox="0 0 23 23"
              fill="none"
            >
              <circle
                cx="9"
                cy="9"
                r="5"
                stroke="black"
                stroke-width="2"
              ></circle>
              <line
                x1="13"
                y1="13"
                x2="21"
                y2="21"
                stroke="black"
                stroke-width="2"
              ></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
