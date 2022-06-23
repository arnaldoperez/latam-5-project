import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";
import avatar from "../../img/User_Avatar_2.png";
//importando los componentes de Bootstrap para mejorar el aspecto del SignUp
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import ProgressBar from "react-bootstrap/ProgressBar";

import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { Card, Row, Container, Column } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import ListadoFallas from "./ListadoFallas";

function ProfileTecnico() {
  const { store, actions } = useContext(Context);
  const navigate = useHistory();

  function profile(event) {
    // Previene el comportamiento por defecto, evitando que la pagina se recargue
    event.preventDefault();
    // Se crea un objeto "FormData" con los datos del formulario
    let data = new FormData(event.target); //en esta variable estoy capturando controladamente todos los valores que el usuario ingreso en el formulario una vez realice el evento submit
    // capturo los valores que el usuario ingreso en el formulario
    let historial = data.get("historial"); //lo estoy sacando directamente de mi form.Control name="email"
    let ubicacion = data.get("ubicacion"); //lo estoy sacando directamente de mi form.Control name="password"
    let descripcion = data.get("descripcion");
    let url = data.get("url");
    let id_user = data.get("id_user");
    let check = data.get("check");

    if (!check) {
      console.error("El usuario no acepto los terminos");
      return;
    }

    actions //importe las actions y el store
      .signUpTech(historial, ubicacion, descripcion, url, id_user) //evaluo mi funcion signup que me retorna una promesa
      .then((resp) => {
        //evalua la respuesta en sus dos casos
        if (resp.code == 201) navigate.push("/");
        //caso exitoso
        else console.log("Problema en el registro de tecnico: ", resp); //caso no exitoso
      })
      .catch((error) => {
        console.log("Error en el registro de tecnico: ", error);
      });
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
                class="mx-auto"
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
          <Col>
            {/*acaempieza el acordion */}
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Mis Propuestas Aceptadas</Accordion.Header>
                <Accordion.Body>
                  <ListadoFallas />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Mis Propuestas Enviadas</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Mis Informes Técnicos</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          <Col>
            {/*acaempieza los comentarios */}
            <Card>
              <Card.Title className="text-center">
                <h4>Mis Mensajes</h4>
              </Card.Title>
              <Card.Header>Quote</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.{" "}
                  </p>
                  <footer className="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Quote</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.{" "}
                  </p>
                  <footer className="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Quote</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.{" "}
                  </p>
                  <footer className="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                    {/* <Link to="/subidaprueba">subidaprueba</Link> */}
                  </footer>
                </blockquote>
              </Card.Body>
              <Card.Header></Card.Header>
              <button className="btn btn-success mx-auto">Ver más</button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileTecnico;
