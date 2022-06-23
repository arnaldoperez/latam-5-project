import React, { useEffect, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ListadoInformes = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    cargarListado();
  }, []);

  const cargarListado = () => {
    actions.listarInformes();
  };

  console.log(store.informes);
  //console.log(lista);
  return (
    <div className="mainMargin">
      <h2>Listado de Informes</h2>

      <ListGroup as="ul">
        {store.informes.map((informe, index) => (
          <Link
            to={`/detalle_informe/${informe.id}`}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <ListGroup.Item as="li" className="activation">
              <div className="paralelo">
                <h6>
                  <strong>Falla No. {informe.falla_id}:</strong>{" "}
                  {informe.falla_titulo}
                </h6>

                <p>
                  <strong>Fecha del informe:</strong> {informe.fecha_creacion}
                </p>
              </div>

              <div className="paralelo">
                <p>
                  <strong>Cliente: </strong>
                  {informe.cliente_nombre} {informe.cliente_apellido}
                </p>
                <p>
                  <strong>${informe.importe}</strong>
                </p>
              </div>
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
};

export default ListadoInformes;
