import React, { useContext, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link, useParams, useHistory } from "react-router-dom";

function DetallePropuesta() {
  const { store, actions } = useContext(Context);

  let param = useParams();
  param = parseInt(param.id);

  useEffect(() => {
    cargarDetalle(param);
  }, []);

  function cargarDetalle(param) {
    actions.detallePropuesta(param);
  }

  const datos = store.detalle_propuesta;
  console.log(datos);

  return (
    <div className="mainMargin">
      <Card className="text-center">
        <Card.Title>
          <strong>Detalle Propuesta No. {datos.cliente_apellido}</strong>
        </Card.Title>
        <Card.Header className="bold">Datos Generales</Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="paralelo">
              <p>
                <strong>Cliente:</strong> {datos.cliente_nombre}{" "}
                {datos.cliente_apellido}:
              </p>

              <p>
                <strong>Fecha del datos:</strong> {datos.fecha_creacion}
              </p>
            </div>
            <div className="paralelo">
              <p>
                <strong>Titulo de la Falla:</strong> {datos.falla_titulo}
              </p>
            </div>
          </Card.Text>
          <Card.Header className="bold">Observaciones</Card.Header>
          <Card.Text>{datos.comentario_servicio}</Card.Text>
          <Card.Header className="bold">Recomendaciones</Card.Header>
          <Card.Text>{datos.recomendacion}</Card.Text>
          <Card.Header className="bold">Costo por Servicio</Card.Header>
          <Card.Text>${datos.importe}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </div>
  );
}

export default DetallePropuesta;
