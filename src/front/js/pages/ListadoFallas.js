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

  function selectBackground(e) {
    e.target.style.background = "red";
  }
  function unselectBackground(e) {
    e.target.style.background = "white";
  }

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
              <div className="fechaFalla">
                <h4>{falla.titulo}</h4>

                <p>{falla.fecha_creacion}</p>
              </div>

              <p>{falla.descripcion}</p>
              <p>{falla.usuario}</p>
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
};

export default ListadoFallas;
