import React, { useContext, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link, useParams, useHistory } from "react-router-dom";

function DetalleInforme() {
  const { store, actions } = useContext(Context);

  let param = useParams();
  param = parseInt(param.id);

  useEffect(() => {
    cargarDetalle(param);
  }, []);

  function cargarDetalle(param) {
    actions.detalleInforme(param);
  }

  const informe = store.detalle_informe;

  console.log(informe);
  return (
    <div className="mainMargin">
      <Card className="text-center">
        <Card.Title>
          <strong>Detalle Informe Técnico</strong>
        </Card.Title>
        <Card.Header className="bold">Datos Generales</Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="paralelo">
              <p>
                <strong>Cliente:</strong> {informe.cliente_nombre}{" "}
                {informe.cliente_apellido}:
              </p>

              <p>
                <strong>Fecha del informe:</strong> {informe.fecha_creacion}
              </p>
            </div>
            <div className="paralelo">
              <p>
                <strong>Titulo de la Falla:</strong> {informe.falla_titulo}
              </p>
            </div>
          </Card.Text>
          <Card.Header className="bold">Observaciones</Card.Header>
          <Card.Text>{informe.comentario_servicio}</Card.Text>
          <Card.Header className="bold">Recomendaciones</Card.Header>
          <Card.Text>{informe.recomendacion}</Card.Text>
          <Card.Header className="bold">Costo por Servicio</Card.Header>
          <Card.Text>${informe.importe}</Card.Text>

          <Button variant="success">Marcar Pagado</Button>
          <Button variant="primary">Realizar Pago</Button>

          <Card.Header className="bold">Imagenes Asociadas</Card.Header>
          <Card.Text>
            <Card>
              <Card.Img
                variant="top"
                className="imagen_informe mx-auto"
                src={informe.imagen}
              />
            </Card>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </div>
  );
}

export default DetalleInforme;
