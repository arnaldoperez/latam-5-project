import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Login } from "../component/login";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div className="card col-lg-4 col-sm-12 container-fluid ">
        <article className="card-body">
          <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>

          <p className="text-success text-center">Let's find your handyman!</p>
          <Login />
        </article>
      </div>
      <div className="jumbotron container-fluid">
        <div className="container col-6 text-center">
          <h1 className="justify-content">About us</h1>
          <p className="lead">
            We will introduce you the right person to repair your vehicles. You
            can visit the workshop o the workshop can visit you. Know the
            reputation from your handyman. We are the biggest community for
            mechanical services
          </p>
        </div>
      </div>
    </div>
  );
};
