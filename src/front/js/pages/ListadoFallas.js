import React, { useEffect, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const ListadoFallas = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    cargarListado();
  }, []);

  const cargarListado = () => {
    actions.listarFallas();
  };

  console.log(store.fallas);
  //console.log(lista);
  return (
    <div className="mainMargin">
      <h2>Listado de Fallas</h2>

      <ListGroup as="ul">
        {store.fallas.map((falla, index) => (
          <Link
            to={`/falla/${falla.id}`}
            style={{ textDecoration: "none" }}
            key={index}
          >
            <ListGroup.Item as="li" className="activation">
              <div className="paralelo">
                <h4>{falla.titulo}</h4>

                <p>{falla.fecha_creacion}</p>
              </div>

              <p>{falla.descripcion}</p>

              <div className="paralelo">
                <p>
                  <strong>Publicado por: </strong>
                  {falla.user_nombre} {falla.user_apellido}
                </p>
                <p>
                  <strong>{falla.ubicacion}</strong>
                </p>
              </div>
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
};

export default ListadoFallas;
