import React from "react";
import { Card, Button } from "react-bootstrap";

function DetalleInforme() {
  return (
    <div className="mainMargin">
      <Card className="text-center">
        <Card.Title>
          <strong>Detalle Informe Técnico</strong>
        </Card.Title>
        <Card.Header>Datos Generales</Card.Header>
        <Card.Body>
          <Card.Text>
            ObserWith supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Card.Header>Observaciones</Card.Header>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Card.Header>Recomendaciones</Card.Header>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Card.Header>Costo por Servicio</Card.Header>
          <Card.Text>$</Card.Text>

          <Button variant="success">Marcar Pagado</Button>
          <Button variant="primary">Realizar Pago</Button>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </div>
  );
}

export default DetalleInforme;
