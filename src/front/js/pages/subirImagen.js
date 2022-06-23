import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const SubidaPrueba = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const { store, actions } = useContext(Context);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    //formData.append("descripcion", "texto");
    formData.append("recomendacion", "texto");
    formData.append("comentario", "texto");
    formData.append("falla_id", 1);
    formData.append("importe", 1);
    formData.append("imagen", selectedFile);
    //formData.append("idTecnico", store.token);

    fetch(
      "https://3001-arnaldopere-latam5proje-rjlvzy4dwab.ws-us47.gitpod.io/api/informe_tecnico", //recordar cambiar url del backend
      {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${store.token}`,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: formData,
      }
    )
      .then(async (response) => {
        await response.json();
        console.log(response.json());
      })
      .then(async (result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <input type="file" name="imagen" onChange={changeHandler} />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
};
