import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div className="card col-4 container-fluid">
        <article className="card-body">
          <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>

          <p className="text-success text-center">Let's find your handyman!</p>
          <form>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i class="fa fa-user"></i>{" "}
                  </span>
                </div>
                <input
                  name=""
                  className="form-control"
                  placeholder="Email or login"
                  type="email"
                ></input>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="******"
                  type="password"
                ></input>
              </div>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary btn-block">
                {" "}
                Login{" "}
              </button>
            </div>
            <p className="text-center">
              <a href="#" class="btn">
                Forgot password?
              </a>
            </p>
          </form>
        </article>
      </div>
      <div class="jumbotron container-fluid">
        <div class="container col-6 text-center">
          <h1 class="justify-content">About us</h1>
          <p class="lead">
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
