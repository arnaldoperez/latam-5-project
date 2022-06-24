import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar, Collapse, Container, Nav } from "react-bootstrap";

export const Navbarr = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    console.log(store.token);
  }, [store.token]);

  return store.token && store.token != "" ? (
    store.esTecnico == true ? (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>Tallerapp</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Link to="/">
                <span className="btn btn-primary mx-2 nav-item">Mi perfil</span>
              </Link>
              <Link to="/propuestas">
                <span className="btn btn-primary mx-2 nav-item">
                  Mis propuestas
                </span>
              </Link>
              <Link to="/calificaciones">
                <span className="btn btn-primary mx-2 nav-item">
                  calificaciones
                </span>
              </Link>
              <Link to="/logout">
                <button className="btn btn-primary nav-item">
                  Cerrar sesión
                </button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    ) : (
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>Tallerapp</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/">
                <span className="btn btn-primary mx-2 nav-item">Mi perfil</span>
              </Link>
              <Link to="/tecnicos">
                <button className="btn btn-primary mx-2 nav-item">
                  Registro Técnico
                </button>
              </Link>
              <Link to="/crear_falla">
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
              <Link to="/calificaciones">
                <span className="btn btn-primary mx-2 nav-item">
                  Calificaciones
                </span>
              </Link>
              <Link to="/logout">
                <button className="btn btn-primary nav-item">
                  Cerrar sesión
                </button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  ) : (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>Tallerapp</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
};
