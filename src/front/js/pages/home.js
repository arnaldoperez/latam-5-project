import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Login } from "../component/login";
import { Profile } from "./Profile";
import { Landing } from "./landing";

export const Home = () => {
  const { store, actions } = useContext(Context);
  return store.token && store.token != "" ? (
    <div>
      <Profile />
    </div>
  ) : (
    <div>
      <Landing />
    </div>
  );
};
