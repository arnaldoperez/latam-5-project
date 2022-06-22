import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    console.log(store.token);
  }, [store.token]);

  return store.token && store.token != "" ? (
    <nav className="navbar navbar-dark bg-primary">
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
        <Link to="/logout">
          <button className="btn btn-primary">Logout</button>
        </Link>
      </div>
    </nav>
  ) : (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link to="/signup">
          <button className="btn btn-primary mx-2">SignUp</button>
        </Link>        
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Tallerapp</span>
        </Link>
        <div className="ml-auto"></div>
      </div>
    </nav>
  );
};
