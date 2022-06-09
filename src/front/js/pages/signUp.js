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
    let phoneNumber = data.get("phone-number");
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
      .signUp(email, password, phoneNumber) //evaluo mi funcion signup que me retorna una promesa
      .then((resp) => {
        //evalua la respuesta en sus dos casos
        if (resp.code == 201) navigate.push("/login");
        //caso exitoso
        else console.log("Problema en el registro de usuario: ", resp); //caso no exitoso
      })
      .catch((error) => {
        console.log("Error en el registro: ", error);
      });
  }

  return (
    <Container>
      <Row>
        <Card>
          <h1>Registro</h1>
          <Form onSubmit={signUpUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              {/*Este password es el que se toma en la funcion SignUpUser con el evento submit*/}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirm"
                required
              />
              {/*Este password es el que se toma en la funcion SignUpUser con el evento submit*/}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                name="phone-number"
              />
              {/*Este phoneNumber es el que se toma en la funcion SignUpUser con el evento submit*/}
              <Form.Text className="text-muted">
                We'll never share your phone Number with anyone else.
              </Form.Text>
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
              Submit
            </Button>
          </Form>
        </Card>
      </Row>
    </Container>
  );
};
