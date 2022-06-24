import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    console.log(store.token);
  }, [store.token]);

  return store.token && store.token != "" ? (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary container-fluid ">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link to="/">
        <span className="navbar-brand mb-0 h1">Tallerapp</span>
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="container navbar-nav justify-content-between">
          <Link to="/tecnicos">
            <button className="btn btn-primary mx-2 nav-item">
              Registro Técnico
            </button>
          </Link>
          <Link to="/falla">
            <button className="btn btn-primary mx-2 nav-item">
              Nueva Falla
            </button>
          </Link>
          <Link to="/fallas">
            <button className="btn btn-primary mx-2 nav-item">
              Ver Fallas
            </button>
          </Link>
          <Link to="/">
            <span className="btn btn-primary mx-2 nav-item">Mi perfil</span>
          </Link>
          <Link to="/calificaciones"><span className="btn btn-primary mx-2 nav-item">calificaciones</span></Link>
          <Link to="/propuestas">
            <span className="btn btn-primary mx-2 nav-item">
              Mis propuestas
            </span>
          </Link>
          <Link to="/logout">
            <button className="btn btn-primary nav-item">Cerrar sesión</button>
          </Link>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Tallerapp</span>
        </Link>
        <div className="ml-auto"></div>
      </div>
    </nav>
  );
};
