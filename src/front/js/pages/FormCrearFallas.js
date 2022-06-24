import React, { useState, useEffect, useContext } from "react";
import { Form, Button, FloatingLabel, InputGroup } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";

const FormCrearFallas = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const { store, actions } = useContext(Context);

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
      <h2>Registrar Falla</h2>
      <Form noValidate onSubmit={grabarInforme}>
        <Form.Group className="mb-3" controlId="formBasicEmail"></Form.Group>

        <Form.Group>
          <Form.Label>Titulo: </Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              required
              as="textarea"
              placeholder="Observaciones acerca del trabajo realizado"
              name="comentario_servicio"
              style={{ height: "100px" }}
            />
            <Form.Control.Feedback type="invalid">
              Ingrese un título
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <Form.Label>Modelo: </Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              required
              as="textarea"
              placeholder="Observaciones acerca del trabajo realizado"
              name="comentario_servicio"
              style={{ height: "100px" }}
            />
            <Form.Control.Feedback type="invalid">
              Ingrese el modelo
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción: </Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              required
              as="textarea"
              placeholder="Observaciones acerca del trabajo realizado"
              name="comentario_servicio"
              style={{ height: "100px" }}
            />
            <Form.Control.Feedback type="invalid">
              Ingrese la descripción de su falla
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <Form.Label>Ubicación: </Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              required
              as="textarea"
              placeholder="Observaciones acerca del trabajo realizado"
              name="comentario_servicio"
              style={{ height: "100px" }}
            />
            <Form.Control.Feedback type="invalid">
              Ingrese su ubicación
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Imagenes</Form.Label>
          <Form.Control type="file" multiple name="imagen" accept="image/*" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default FormCrearFallas;
