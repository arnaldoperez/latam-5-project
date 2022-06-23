import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/landing.css";
import { SignUp } from "./signUp";
//importando los componentes de Bootstrap para mejorar el aspecto del SignUp
import { Card, Row, Container, Column } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Single } from "./single";

export const Landing = () => {
  return (
    <div className="container-fluid row">
      <div className="row bg pageholder">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 bold card">TallerApp</h1>
          <p className="lead bold card">
            Vamos a presentarte la persona indicada para reparar tus vehiculos.
            Podrás visitar su taller o el mecánico visitará tu domicilio. Somos
            la comunidad mas grande para servicios mecanicos. ¿Ya estás
            registrado? Inicia sesión!
          </p>
          <a className="btn btn-primary" href="/login">
            Iniciar Sesión
          </a>
        </div>
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 bold card">Acerca de nosotros</h1>
          <p className="lead bold card">
            Reporta fallas en tus vehiculos, recibe propuestas de reparación,
            conoce el mecánico adecuado para ti! Califica el servicio recibido y
            conoce sobre la experiencia de otros clientes con tu mecánico.
            Registrate y empieza a utilizar la App totalmente gratis!
          </p>
          <a className="btn btn-primary" href="/signup">
            Registrarse
          </a>
        </div>
        <div className="row logo"></div>
      </div>
    </div>
  );
};
