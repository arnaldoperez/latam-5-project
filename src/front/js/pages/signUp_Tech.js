import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";
//importando los componentes de Bootstrap para mejorar el aspecto del SignUp
import { Card, Row, Container, Column } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SignUp_Tech = () => {
  const { store, actions } = useContext(Context);
  const navigate = useHistory();

  function signTech(event) {
    // Previene el comportamiento por defecto, evitando que la pagina se recargue
    event.preventDefault();
    // Se crea un objeto "FormData" con los datos del formulario
    let data = new FormData(event.target); //en esta variable estoy capturando controladamente todos los valores que el usuario ingreso en el formulario una vez realice el evento submit
    // capturo los valores que el usuario ingreso en el formulario
    let historial = data.get("historial"); //lo estoy sacando directamente de mi form.Control name="email"
    let ubicacion = data.get("ubicacion"); //lo estoy sacando directamente de mi form.Control name="password"
    let descripcion = data.get("descripcion");
    let url = data.get("url");
    let check = data.get("check");
   
    if (!check) {
      console.error("El usuario no acepto los terminos");
      return;
    }

    actions //importe las actions y el store
      .signUpTech( historial, ubicacion, descripcion, url) //evaluo mi funcion signup que me retorna una promesa
      .then((resp) => {
        //evalua la respuesta en sus dos casos
        if (resp.code == 200) navigate.push("/");
        //caso exitoso
        else console.log("Problema en el registro de tecnico: ", resp); //caso no exitoso
      })
      .catch((error) => {
        console.log("Error en el registro de tecnico: ", error);
      });
  }

  return (
    <Container style={{ width: '30rem' }}>
      <Row  >
        <Card className="text-center" border="light" >
          <h2 className="text-primary" >Taller@pp</h2>
          <Form onSubmit={signTech}>
          <h3 className="bg-secondary text-light">Sign Up Technician</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter history"
                name="historial"
                required
              />
              {/*Este email es el que se toma en la funcion SignUpUser con el evento submit*/}            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                placeholder="ubication"
                name="ubicacion"
                required
              />
              {/*Este password es el que se toma en la funcion SignUpUser con el evento submit*/}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">            
              <Form.Control
                type="text"
                placeholder="Description"
                name="descripcion"
                required
              />
              {/*Este password es el que se toma en la funcion SignUpUser con el evento submit*/}
            </Form.Group>

            <Form.Group className="mb-3">            
              <Form.Control
                type="text"
                placeholder="Enter your url"
                name="url"
              />
              {/*Este nombre es el que se toma en la funcion SignUpUser con el evento submit*/}
            </Form.Group>

           
              {/*Este phoneNumber es el que se toma en la funcion SignUpUser con el evento submit*/}
            
          
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I accept the terms"
                required
                name="check"
              />
            </Form.Group>
            
            
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Card>
      </Row>
    </Container>
  );
};
