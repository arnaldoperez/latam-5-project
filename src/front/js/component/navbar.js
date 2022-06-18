import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Find your handy man</span>
        </Link>
        <Link to="/signup">
          <button className="btn btn-primary mx-2">SignUp</button>
        </Link>
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Tallerapp</span>
        </Link>
        <div className="ml-auto">
          <Link to="/logout">
            <button className="btn btn-primary">Logout</button>
          </Link>
        </div>
        <div className="ml-auto"></div>
      </div>
    </nav>
  );
};
