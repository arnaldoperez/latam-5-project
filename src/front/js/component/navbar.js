import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-primary">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Tallerapp</span>
        </Link>
        <div className="ml-auto">
          <Link to="/logout">
            <button className="btn btn-primary">Logout</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
