import React, { useState, ChangeEvent, FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import "../styles/header.css";

const Header: React.FC = () => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      // Handle logout logic here
      // For example, you can use navigate or axios here
    };
  
    return (
      <nav>
        <div className="left-menu">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/browse">Browse</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
        <div className="right-menu">
          <ul>
            <li><a onClick={handleClick} href="/login">Logout</a></li>
          </ul>
        </div>
      </nav>
    );
};
  
export default Header;