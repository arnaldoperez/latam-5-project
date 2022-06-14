import React, { useState, useEffect, useContext } from "react";
import { Figure } from "react-bootstrap";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

const DetalleFallas = () => {
  const { store, actions } = useContext(Context);
  let param = useParams();
  param = parseInt(param.id);

  useEffect(() => {
    cargarDetalle(param);
  }, []);

  function cargarDetalle(param) {
    actions.detalleFallas(param);
  }

  const datos = store.detalle;
  console.log(datos);
  return (
    <div className="mainMargin">
      <h6>Detalle de la Falla</h6>
      <Figure>
        <h2>{datos.titulo}</h2>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src="https://picsum.photos/250/200"
        />
        <Figure.Caption>
          <h6>Descripción:</h6>
          <p>{datos.descripcion}</p>
          <div className="detalles">
            <div>
              <p>
                <strong>Modelo: </strong> {datos.modelo}
              </p>
              <p>
                <strong>Usuario: </strong>
                {datos.usuario}
              </p>

              <p>
                <strong>Estado: </strong>
                {datos.estado}
              </p>
            </div>
            <div>
              <p>
                <strong>Creado el: </strong>
                {datos.fecha_creacion}
              </p>
              <p>
                <strong>Cerrado el: </strong>
                {datos.fecha_cierre}
              </p>
            </div>
          </div>
        </Figure.Caption>
      </Figure>
    </div>
  );
};

export default DetalleFallas;
