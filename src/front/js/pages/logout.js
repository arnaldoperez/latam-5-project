import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Logout = () => {
  const { store, actions } = useContext(Context);
  const navigate = useHistory();
  useEffect(() => {
    actions
      .logout()
      .then((resp) => {
        if (resp.code == 200) {
          console.log("Sesion cerrada");
          navigate.push("/");
        }
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="text-center mt-5">
      <h1>Su sesion fue cerrada, vuelva pronto</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
    </div>
  );
};