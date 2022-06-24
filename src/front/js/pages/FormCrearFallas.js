import React, { useState, useEffect, useContext } from "react";
import { Form, Button, FloatingLabel, InputGroup } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

const FormCrearFallas = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context);

  const navigate = useHistory();
  useEffect(() => {}, []);

  const datos = store.detalle;

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  function grabarFalla(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    //const imagen = new FormData(event.target.files);
    let data = new FormData(event.target);
    let titulo = data.get("titulo");
    let modelo = data.get("modelo");
    let descripcion = data.get("descripcion");
    let ubicacion = data.get("ubicacion");
    let imagen = data.get("imagen");

    actions
      .grabarFalla(titulo, modelo, descripcion, ubicacion, imagen)
      .then((resp) => {
        //evalua la respuesta en sus dos casos
        if (resp.code == 201) navigate.push("/");
        //caso exitoso
        else console.log("Problema en el registro de la falla: ", resp);
      })
      .catch((error) => {
        console.log("Error en el registro de la falla: ", error);
      });

    setValidated(true);
  }

  return (
    <div className="mainMargin">
      <h2>Registrar Falla</h2>
      <Form noValidate validated={validated} onSubmit={grabarFalla}>
        <Form.Group className="mb-3" controlId="formBasicEmail"></Form.Group>

        <Form.Group>
          <Form.Label>Titulo: </Form.Label>

          <Form.Control
            required
            placeholder="Ingrese un título descriptivo"
            name="titulo"
          />
          <Form.Control.Feedback type="invalid">
            Ingrese un título
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Modelo: </Form.Label>

          <Form.Control
            required
            placeholder="Ingrese el modelo del vehículo"
            name="modelo"
          />
          <Form.Control.Feedback type="invalid">
            Ingrese el modelo
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción: </Form.Label>

          <Form.Control
            required
            as="textarea"
            placeholder="Ingrese la descripción de la falla presentada"
            name="descripcion"
          />
          <Form.Control.Feedback type="invalid">
            Ingrese la descripción de su falla
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Ubicación: </Form.Label>

          <Form.Control
            required
            placeholder="Ingrese la dirección"
            name="ubicacion"
          />
          <Form.Control.Feedback type="invalid">
            Ingrese su dirección
          </Form.Control.Feedback>
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
