import React from "react";
import { Link } from "react-router-dom";

export const NavbarProtected = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Find your handy man</span>
        </Link>
        <Link to="/falla">
          <button className="btn btn-primary mx-2">Nueva Falla</button>
        </Link>
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Tallerapp</span>
        </Link>
        <div className="ml-auto">
          <Link to="/logout">
            <button className="btn btn-primary">Logout</button>
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
