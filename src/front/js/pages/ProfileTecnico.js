import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";
import avatar from "../../img/User_Avatar_2.png";
//importando los componentes de Bootstrap para mejorar el aspecto del SignUp
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

import { Link } from "react-router-dom";

import { Card, Row, Container, Column, ListGroup } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import ListadoFallas from "./ListadoFallas";

function ProfileTecnico() {
  const { store, actions } = useContext(Context);
  const navigate = useHistory();

  useEffect(() => {
    cargarDatos(store.id_tecnico);
  }, []);

  function cargarDatos(id) {
    actions.listarPropuestasTecnico(id);
  }

  return (
    <div className="mainMargin">
      <h2>Mi Perfil Técnico</h2>
      <Container>
        <Row>
          <Col>
            {/*acaempieza el card con la imagen */}
            <Card style={{ width: "20rem" }}>
              <Card.Img
                variant="top"
                src={avatar}
                style={{ width: "15rem" }}
                className="mx-auto"
              />
              <Card.Body>
                <Card.Title>
                  <h4>Datos Generales</h4>
                </Card.Title>
                <Card.Text>
                  <label>Nombre:</label> Jack Baso
                  <p></p>
                  <label>Email:</label> tecnico@4geeks
                  <p></p>
                  <label>Website:</label> www.tecni.com
                  <p></p>
                  <label>Ubicación:</label> Ciudad Panamá, Panamá
                  <p></p>
                </Card.Text>
                <Card>
                  <Card.Title className="text-center">
                    Mi Calificación
                  </Card.Title>
                  <ProgressBar>
                    <ProgressBar striped variant="success" now={35} key={1} />
                    <ProgressBar variant="warning" now={20} key={2} />
                    <ProgressBar striped variant="danger" now={10} key={3} />
                  </ProgressBar>
                </Card>
              </Card.Body>
            </Card>
            <div>{/*acaempieza la calificacion */}</div>
          </Col>
          <Col xs={12} sm={8} md={8} lg={8}>
            <h4>Mis Actividades</h4>
            <h6 className="labelProfile">Propuestas Aprobadas</h6>
            <ListGroup>
              <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
            <h6 className="labelProfile">Propuestas Pendientes</h6>
            <ListGroup>
              <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
            <h6 className="labelProfile">Informes Realizados</h6>
            <ListGroup>
              <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileTecnico;
