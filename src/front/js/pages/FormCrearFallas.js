import React, { useState, useEffect, useContext } from "react";
import { Form, Button, FloatingLabel, InputGroup } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";

const FormCrearFallas = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const { store, actions } = useContext(Context);
  const [validated, setValidated] = useState(false);

  let param = useParams();
  param = parseInt(param.id);

  const location = useLocation();
  const { idFalla, tituloFalla, modeloFalla } = location.state;
  let idDetalle = idFalla;
  console.log(typeof idDetalle);
  const navigate = useHistory();
  useEffect(() => {}, []);

  const datos = store.detalle;

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  function grabarInforme(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //const imagen = new FormData(event.target.files);
    let data = new FormData(event.target);
    let comentario_servicio = data.get("comentario");
    let recomendacion = data.get("recomendacion");
    let importe = data.get("importe");
    let imagen = data.get("imagen");

    console.log("id falla", idFalla);
    actions
      .grabarInforme(
        idFalla,
        comentario_servicio,
        recomendacion,
        importe,
        imagen
      )
      .then((resp) => {
        //evalua la respuesta en sus dos casos
        if (resp.code == 201) navigate.push("/falla/" + idFalla);
        //caso exitoso
        else console.log("Problema en el registro del informe: ", resp);
      })
      .catch((error) => {
        console.log("Error en el registro del informe: ", error);
      });

    setValidated(true);
  }

  return (
    <div className="mainMargin">
      <h2>Informe Técnico</h2>
      <Form noValidate validated={validated} onSubmit={grabarInforme}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <strong>Servicio a la falla No. {idFalla}: </strong> {tituloFalla}
            <br />
            <br />
            <strong>Modelo: </strong>
            {modeloFalla}
          </Form.Label>
        </Form.Group>

        <Form.Group>
          <Form.Label>Observación</Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              required
              as="textarea"
              placeholder="Observaciones acerca del trabajo realizado"
              name="comentario_servicio"
              style={{ height: "100px" }}
            />
            <Form.Control.Feedback type="invalid">
              Ingrese su evalución o comentario acerca del servicio realizado!
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Imagenes</Form.Label>
          <Form.Control type="file" multiple name="imagen" accept="image/*" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Recomendación</Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              placeholder="Tienes algo que recomendar?"
              name="recomendacion"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Costo Total</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              required
              aria-label="Ingresa el costo por servicio"
              name="importe"
            />
            <Form.Control.Feedback type="invalid">
              Ingrese el costo total por su servicio!
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default FormInfoTecnico;
