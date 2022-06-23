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
          <strong>Detalle Propuesta No. {datos.id}</strong>
        </Card.Title>
        <Card.Header className="bold">Datos Generales de la Falla</Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="paralelo">
              <p>
                <strong>Cliente:</strong> {datos.cliente_nombre}{" "}
                {datos.cliente_apellido}:
              </p>

              <p>
                <strong>Titulo de la Falla:</strong> {datos.falla_titulo}
              </p>
            </div>
            <div className="paralelo">
              <p>
                <strong>Descripción:</strong> {datos.falla_detalle}
              </p>
            </div>
          </Card.Text>
          <Card.Header className="bold">Propuesta Realizada</Card.Header>
          <div className="paralelo">
            <p>
              <strong>Detalle:</strong> {datos.detalle}
            </p>
            <p>
              <strong>Costo Estimado: $</strong> {datos.costo_servicio}
            </p>
          </div>
          <div className="paralelo">
            <p>
              <strong>Estado:</strong> {datos.estado}
            </p>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </div>
  );
}

export default DetallePropuesta;
