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
import { Link, useParams, useHistory } from "react-router-dom";

const DetallePropuesta = () => {
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const navigate = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { store, actions } = useContext(Context);

  let param = useParams();
  let id = parseInt(param.id);

  useEffect(() => {
    cargarDetalle(id);
  }, []);

  function cargarDetalle(id) {
    actions.detalleFallas(id);
  }

  const datos = store.detalle;
  console.log(datos);
  console.log(datos.propuestas);

  function grabarPropuesta(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Se crea un objeto "FormData" con los datos del formulario
    let data = new FormData(event.target); //en esta variable estoy capturando controladamente todos los valores que el usuario ingreso en el formulario una vez realice el evento submit
    // capturo los valores que el usuario ingreso en el formulario
    let detalle = data.get("detalle"); //lo estoy sacando directamente de mi form.Control name="email"
    let costo_servicio = data.get("costo_servicio"); //lo estoy sacando directamente de mi form.Control name="password"
    let estado = "No aceptada";
    let id_falla = datos.id;

    actions
      .grabarPropuesta(detalle, costo_servicio, estado, id_falla)
      .then((resp) => {
        //evalua la respuesta en sus dos casos
        if (resp.code == 201) navigate.push("/perfil_tecnico");
        else {
          //caso exitoso
          console.log("Problema en el registro de la propuesta: ", resp);
        }
      })
      .catch((error) => {
        console.log("Error en el registro de la propuesta: ", error);
      });
    setValidated(true);
  }

  function ModalPropuesta(props) {
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <strong>Propuesta por Falla No. {datos.id}: </strong>
            {datos.titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <div className="mainMargin">
            <Form noValidate validated={validated} onSubmit={grabarPropuesta}>
              <Form.Group>
                <Form.Label>Detalle</Form.Label>
                <FloatingLabel controlId="floatingTextarea2">
                  <Form.Control
                    required
                    as="textarea"
                    placeholder="Detalles de la propuesta"
                    style={{ height: "100px" }}
                    name="detalle"
                  />
                  <Form.Control.Feedback type="invalid">
                    Indique el detalle de su propuesta!
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="floatingTextarea3">
                <Form.Label>Costo Estimado</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    required
                    aria-label="Ingresa el costo estimado"
                    name="costo_servicio"
                  />
                  <Form.Control.Feedback type="invalid">
                    Indique el costo estimado por su servicio!
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit">
                Guardar
              </Button>
              <Button variant="secondary" onClick={() => setModalShow(false)}>
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
              <Card.Img variant="top" src={datos.imagen} />
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

                {datos.estado == "Sin informe" ? (
                  <Link
                    className="btn btn-success"
                    to={{
                      pathname: "/detalle_informe",
                      state: {
                        idFalla: datos.id,
                      },
                    }}
                  >
                    Ver Informe Técnico
                  </Link>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col sm={8}>
            <Card>
              <Card.Header as="h3">{datos.titulo}</Card.Header>
              <Card.Body>
                <Card.Title>
                  <strong>Descripción de la falla:</strong>
                </Card.Title>
                <Card.Text>{datos.descripcion}</Card.Text>
                <Card.Title>
                  <strong>Modelo de la moto:</strong>
                </Card.Title>
                <Card.Text>{datos.modelo}</Card.Text>
                <Card.Title>
                  <strong>Ubicación:</strong>
                </Card.Title>
                <Card.Text>{datos.ubicacion}</Card.Text>

                {store.esTecnico == true ? (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => ModalPropuesta(setModalShow(true))}
                    >
                      Crear Propuesta
                    </Button>{" "}
                  </>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ModalPropuesta show={modalShow} onHide={() => setModalShow(false)} />

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

export default DetallePropuesta;
