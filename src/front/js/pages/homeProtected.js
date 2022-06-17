import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Profile } from "../pages/Profile";

export const HomeProtected = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <Profile />
    </div>
  );
};
