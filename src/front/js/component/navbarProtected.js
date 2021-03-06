import React from "react";
import { Link } from "react-router-dom";

export const NavbarProtected = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/tecnicos">
          <button className="btn btn-primary mx-2">SignUp Technician</button>
        </Link>
        <Link to="/falla">
          <button className="btn btn-primary mx-2">New Failure</button>
        </Link>
        <Link to="/fallas">
          <button className="btn btn-primary mx-2">Ver Fallas</button>
        </Link>
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Tallerapp</span>
          <span className="btn btn-primary mx-2">My Reports</span>
        </Link>
        <Link to="/calificaciones">
          <span className="btn btn-primary mx-2">Ratings</span>
        </Link>
        <Link to="/propuestas">
          <button className="btn btn-primary mx-2">Propuesta</button>
        </Link>
        <Link to="/logout">
          <button className="btn btn-primary">Logout</button>
        </Link>
      </div>
    </nav>
  );
};
