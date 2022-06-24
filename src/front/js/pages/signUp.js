import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/home.css";
//importando los componentes de Bootstrap para mejorar el aspecto del SignUp
import { Card, Row, Container, Column } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const navigate = useHistory();

  function signUpUser(event) {
    // Previene el comportamiento por defecto, evitando que la pagina se recargue
    event.preventDefault();
    // Se crea un objeto "FormData" con los datos del formulario
    let data = new FormData(event.target); //en esta variable estoy capturando controladamente todos los valores que el usuario ingreso en el formulario una vez realice el evento submit
    // capturo los valores que el usuario ingreso en el formulario
    let email = data.get("email"); //lo estoy sacando directamente de mi form.Control name="email"
    let password = data.get("password"); //lo estoy sacando directamente de mi form.Control name="password"
    let confirm = data.get("confirm");
    let nombre = data.get("nombre");
    let apellido = data.get("apellido");
    let check = data.get("check");
    if (password !== confirm) {
      console.error("Las claves no coinciden");
      return;
    }
    if (!check) {
      console.error("El usuario no acepto los terminos");
      return;
    }

    actions //importe las actions y el store
      .signUp(email, password, nombre, apellido) //evaluo mi funcion signup que me retorna una promesa
      .then((resp) => {
        //evalua la respuesta en sus dos casos
        if (resp.code == 201) navigate.push("/");
        //caso exitoso
        else console.log("Problema en el registro de usuario: ", resp); //caso no exitoso
      })
      .catch((error) => {
        console.log("Error en el registro: ", error);
      });
  }

  return (
    <Container style={{ width: "30rem" }}>
      <Row>
        <Card className="text-center" border="light">
          <h2 className="text-primary">Taller@pp</h2>
          <Form onSubmit={signUpUser}>
            <h3 className="bg-secondary text-light">Sign Up</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
              />
              {/*Este email es el que se toma en la funcion SignUpUser con el evento submit*/}
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              {/*Este password es el que se toma en la funcion SignUpUser con el evento submit*/}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirm"
                required
              />
              {/*Este password es el que se toma en la funcion SignUpUser con el evento submit*/}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="nombre"
              />
              {/*Este nombre es el que se toma en la funcion SignUpUser con el evento submit*/}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter your Last name"
                name="apellido"
              />
              {/*Este phoneNumber es el que se toma en la funcion SignUpUser con el evento submit*/}
            </Form.Group>

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
