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

  function profile(id_tecnico) {
    return actions.listarCalificacionesTecnico(id_tecnico);
  }
  const aceptar_propuesta = (id_propuesta) => {
    actions.aceptar_propuesta_actions(id_propuesta);
  }

  const declinar_propuesta = (id_propuesta) => {
    actions.declinar_propuesta_actions(id_propuesta);
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
  
  
  /*

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
              <Card.Title>Nelly Stewart</Card.Title>
              <Card.Text>
                Industria mecanica.
                Cuenta con certificado KTM, Kawasaki y Ducatti. Más de 10 años de
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
                <Accordion.Header>Configuracion Estado: {store.estadopropuesta.estado}</Accordion.Header>
                <Accordion.Body>
              <ListGroup as="ul">
                    <div>
                      

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
                        tecnico asignado : {propuesta.id_tecnico}
                        </footer>
                      </div>
                      <blockquote className="blockquote mb-0">
                        <cite title="Source Title">
                        {propuesta.detalle}
                        </cite>
                      </blockquote>
                      <Button variant="secondary"onClick={()=>aceptar_propuesta(propuesta.id)}>Accept</Button>
                      <Button variant="primary" onClick={()=>declinar_propuesta(propuesta.id)}>Decline</Button>
                      <Button variant="success" onClick={()=>profile(propuesta.id_tecnico)}>score</Button>
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
                            <footer className="blockquote-footer">
                              estado: {falla.estado}
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
              <Modal.Title>comentarios y sugerencias</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Me gustaria incluir nuevos centros de mantenimiento de mi zona en esta aplicacion.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary">Close</Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Col>

        {/*ACA EMPIEZA LA COLUMNA 3 */}
        <Col>
         
          {/*acaempieza el card con la imagen opcional del taller prestador del servicio */}
          <Card>
            <Card.Body>
              <Card.Title>
                Puntaje del tecnico{" "}
                
              </Card.Title>
              <Card.Text>
                Algunos usuarios han recibido apoyo de este taller y lo han calificado
                , este es el promedio de calificaciones recibidas por el taller.              
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
