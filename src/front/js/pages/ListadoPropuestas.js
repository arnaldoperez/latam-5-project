import React, { useEffect, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ListadoPropuestas = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    cargarListado(store.id_tecnico);
  }, []);

  const cargarListado = (id) => {
    actions.listarPropuestasTecnico(id);
  };

  const listarPropuestasTecnico = store.listarPropuestasTecnico;

  return (
    <div className="mainMargin">
      <h2>Listado de Propuestas</h2>

      <ListGroup as="ul">
        {store.listarPropuestasTecnico.length == 0 ? (
          <h4>Aún no ha presentado Propuestas</h4>
        ) : (
          store.listarPropuestasTecnico.map((dato, index) => (
            <Link
              to={`/propuesta/${dato.id}`}
              style={{ textDecoration: "none" }}
              key={index}
            >
              <ListGroup.Item className="activation">
                {index + 1}. {dato.falla_titulo} <strong>Cliente:</strong>{" "}
                {dato.cliente_nombre} {dato.cliente_apellido}{" "}
                <strong>Estado:</strong> {dato.estado}
              </ListGroup.Item>
            </Link>
          ))
        )}
      </ListGroup>
    </div>
  );
};

export default ListadoPropuestas;
