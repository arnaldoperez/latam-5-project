import react, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

const url =
  "https://3001-arnaldopere-latam5proje-oc9ibpyg9t9.ws-us46.gitpod.io/";

export const ListarFallas = () => {
  const [data, setData] = useState([]);

  const cargarListado = async () => {
    const res = await fetch(`${url}/servicios`);
    const data = (await res.json()) < setData(data);
  };

  useEffect(() => {
    cargarListado();
  }, []);

  return (
    <>
    <h1>Listado de Servicios</h1>
    <ListGroup as="ul">
      {data.map((falla) => {
        <ListGroup.Item as="li" key={falla.id} active>
          <h3>{data.titulo}</h3>
          <h5>{data.fecha_creacion}</h5>
          <p>{data.descripcion}</p>
          <p>{data.ubicacion}</p>
          <h5>{data.usuario}</h5>
        </ListGroup.Item>;
      })}
    </ListGroup>
  );
  </>
};
