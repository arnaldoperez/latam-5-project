import React, { useState, useEffect, useContext } from "react";
import { Form, Button, FloatingLabel, InputGroup } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

const FormInfoTecnico = () => {
  const { store, actions } = useContext(Context);
  let param = useParams();
  param = parseInt(param.id);

  useEffect(() => {}, []);

  const datos = store.detalle;
  console.log(datos);
  return (
    <div className="mainMargin">
      <h2>Informe Técnico</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Falla Asociada</Form.Label>
          <Form.Select>
            <option>1</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Observación</Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              placeholder="Observaciones acerca del trabajo realizado"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Imagenes</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>
        <Form.Group>
          <Form.Label>Recomendación</Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              placeholder="Tienes algo que recomendar?"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Costo Estimado</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control aria-label="Ingresa el costo por servicio" />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Estado</Form.Label>
          <Form.Select>
            <option>Open</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default FormInfoTecnico;
