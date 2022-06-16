import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Container,
  Modal,
  Form,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

const DetalleFallas = () => {
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { store, actions } = useContext(Context);
  let param = useParams();
  param = parseInt(param.id);

  useEffect(() => {
    cargarDetalle(param);
  }, []);

  function cargarDetalle(param) {
    actions.detalleFallas(param);
  }

  const datos = store.detalle;

  console.log(datos);

  function MydModalWithGrid(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Propuesta: {datos.titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <div className="mainMargin">
            <Form>
              <Form.Group>
                <Form.Label>Detalle</Form.Label>
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    as="textarea"
                    placeholder="Detalles de la propuesta"
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Costo Estimado</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control aria-label="Ingresa el costo estimado" />
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit">
                Guardar
              </Button>
              <Button variant="secondary" type="submit">
                Cancelar
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="mainMargin">
      <h2>Detalle de la Falla</h2>
      <Container>
        <Row>
          <Col sm={4}>
            <Card>
              <Card.Img variant="top" src="https://picsum.photos/250/200" />
              <Card.Body>
                <Card.Text>
                  <strong>Publicado por: </strong>
                  {datos.user_nombre} {datos.user_apellido}
                </Card.Text>
                <Card.Text>
                  <strong>Fecha creación: </strong>
                  {datos.fecha_creacion}
                </Card.Text>
                <Card.Text>
                  <strong>Estado: </strong>
                  {datos.estado}
                </Card.Text>
                <Button variant="danger" onClick={handleShow}>
                  Reportar
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={8}>
            <Card>
              <Card.Header as="h3">{datos.titulo}</Card.Header>
              <Card.Body>
                <Card.Title>Descripción de la falla</Card.Title>
                <Card.Text>{datos.descripcion}</Card.Text>
                <Card.Title>Modelo de la moto</Card.Title>
                <Card.Text>{datos.modelo}</Card.Text>
                <Card.Title>Ubicación</Card.Title>
                <Card.Text>{datos.ubicacion}</Card.Text>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Crear Propuesta
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reportar este anuncio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Si consideras que este anuncio puede contener información falsa
          háznolo saber!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetalleFallas;
