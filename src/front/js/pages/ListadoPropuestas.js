import React, { useEffect, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ListadoPropuestas = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    cargarListado();
  }, []);

  const cargarListado = () => {
    actions.listarPropuestas();
  };

  console.log(store.propuestas);
  //console.log(lista);
  return (
    <div className="mainMargin">
      <h2>Listado de Propuestas</h2>

      <ListGroup as="ul">
        {store.propuestas.map((propuesta, index) => (
          <ListGroup.Item as="li" className="activation" key={index}>
            <div className="paralelo">
              <h4>{propuesta.falla_titulo}</h4>

              <p>${propuesta.costo_servicio}</p>
            </div>

            <p>{propuesta.detalle}</p>

            <div className="paralelo">
              <p>
                <strong>Tecnico proponente:</strong>{" "}
                {propuesta.tecnico_user_nombre}{" "}
                {propuesta.tecnico_user_apellido}
              </p>
              <p>
                <strong>{propuesta.estado}</strong>
              </p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ListadoPropuestas;
