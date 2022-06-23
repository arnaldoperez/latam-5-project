import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";
import rigoImageUrl from "../../img/rigo-baby.jpg";
//importando los componentes de Bootstrap para mejorar el aspecto del SignUp
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { Card, Row, Container, Column } from "react-bootstrap";

import Button from "react-bootstrap/Button";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useHistory();

  function profile(event) {
    // Previene el comportamiento por defecto, evitando que la pagina se recargue
    event.preventDefault();
    // Se crea un objeto "FormData" con los datos del formulario
    let data = new FormData(event.target); //en esta variable estoy capturando controladamente todos los valores que el usuario ingreso en el formulario una vez realice el evento submit
    // capturo los valores que el usuario ingreso en el formulario
    let id_tecnico = data.get("id_tecnico"); //lo estoy sacando directamente de mi form.Control name="email"
    return actions.listarCalificacionesTecnico(id_tecnico);
  }

  function media(list) {
    var suma = 0;
    let prom = 0;
    let promedio = 0;
    console.log(list);
    for (var index in list) {
      prom = parseFloat(list[index].calificacion);
      suma = suma + prom;
    }
    promedio = suma / list.length;
    promedio = parseInt(promedio * 10);
    return promedio;
  }
  media(store.historialTecnico);
  
  /*useEffect(() => {
    cargarListado();
  }, []);

  const cargarListado = () => {
    actions.listarCalificacionesTodos();
  };*/

  useEffect(() => {
    cargarListadoFallas();
    cargarListadoPropuestas();    
  }, []);

  const cargarListadoFallas = () => {
    actions.listarFallas_user();
  };
  const cargarListadoPropuestas = () => {
    actions.listarPropuestas();
  };

  //cargarListadoCalificaciones = () =>{
    //let id_tecnico = store.propuestas[0].id_tecnico//lo estoy sacando directamente de mi form.Control name="email"
    //return actions.listarCalificacionesTecnico(id_tecnico);}


  return (
    <Container>
      <Row>
        {/*ACA EMPIEZA LA COLUMNA 1 */}
        <Col>
          {/*acaempieza el card con la imagen */}
          <Card>
            <Card.Img variant="top" src="http://placeimg.com/640/360/any" />
            <Card.Body>
              <Card.Title>Arnaldo Martínez</Card.Title>
              <Card.Text>
                Mecanico certificado KTM, Kawasaki y Ducatti. Más de 10 años de
                experiencia reparando vehiculos. Conocimientos en motores
                eléctricos y de combustión
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/*ACA EMPIEZA LA COLUMNA 2 */}
        <Col>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Propuestas</Modal.Title>
            </Modal.Header>
            {/*acaempieza el acordion */}
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Listado de propuestas</Accordion.Header>
                <Accordion.Body>
                  <ListGroup as="ul">
                    <div>
                      <h3>History</h3>

                  {store.propuestas.map((propuesta, index) => (
                    <ListGroup.Item key={index}>
                      <div className="paralelo">
                        <h3>
                          <strong>{propuesta.costo_servicio}</strong>
                        </h3>
                        <footer className="blockquote-footer">
                        {propuesta.estado}
                        </footer>
                        <footer className="blockquote-footer">
                        id_tecnico : {propuesta.id_tecnico}
                        </footer>
                      </div>
                      <blockquote className="blockquote mb-0">
                        <cite title="Source Title">
                        {propuesta.detalle}
                        </cite>
                      </blockquote>
                      <Button variant="secondary">Accept</Button>
                      <Button variant="primary">Decline</Button>
                      <Button variant="success" onclick="cargarListadoCalificaciones()">score</Button>
                    </ListGroup.Item>
                  ))}
                </div>
                </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Fails </Accordion.Header>
                <Accordion.Body>
                  <ListGroup as="ul">
                    {store.fallas_user.map((falla, index) => (
                      <Link
                        to={`/falla/${falla.id}`}
                        style={{ textDecoration: "none" }}
                        key={index}
                      >
                        <ListGroup.Item>
                          <div className="paralelo">
                            <footer className="blockquote-footer">
                              {falla.id}
                            </footer>
                            <footer className="blockquote-footer">
                              {falla.fecha_creacion}
                            </footer>
                            <footer className="blockquote-footer">
                              ubicacion: {falla.ubicacion}
                            </footer>
                          </div>
                          <blockquote className="blockquote mb-0">
                            <cite title="Source Title">{falla.titulo}</cite>
                          </blockquote>
                        </ListGroup.Item>
                      </Link>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Modal.Dialog>

          {/*acaempieza el modal */}
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Necesito un nuevo servicio</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Col>

        {/*ACA EMPIEZA LA COLUMNA 3 */}
        <Col>
          <Form onSubmit={profile}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="integer"
                placeholder="Enter id Technician"
                name="id_tecnico"
                required
              />
              {/*Este email es el que se toma en la funcion SignUpUser con el evento submit*/}{" "}
            </Form.Group>
          </Form>
          {/*acaempieza el card con la imagen opcional del taller prestador del servicio */}
          <Card>
            <Card.Body>
              <Card.Title>
                Taller Name Cailificacion{" "}
                <strong>{media(store.historialTecnico)}</strong>
              </Card.Title>
              <Card.Text>
                Promedio de calificaciones recibidas por el taller.{" "}
                {store.historialTecnico.map((calificacion, index) => (
                  <strong key={{ index }}>{calificacion.calificacion}</strong>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>

          <div>
            {/*acaempieza la calificacion */}
            <Card>
              <Card.Title className="text-center">Puntaje</Card.Title>
              <ProgressBar>
                <ProgressBar
                  striped
                  variant="success"
                  now={media(store.historialTecnico)}
                  key={1}
                />
              </ProgressBar>
            </Card>
          </div>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>History</Accordion.Header>
              <Accordion.Body>
                <div>
                  <h3>History</h3>

                  {store.historialTecnico.map((calificacion, index) => (
                    <ListGroup.Item key={index}>
                      <div className="paralelo">
                        <h3>
                          <strong>{calificacion.calificacion}</strong>
                        </h3>
                        <footer className="blockquote-footer">
                          {calificacion.fecha_cierre}
                        </footer>
                      </div>
                      <blockquote className="blockquote mb-0">
                        <cite title="Source Title">
                          {calificacion.comentario}
                        </cite>
                      </blockquote>
                    </ListGroup.Item>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};
