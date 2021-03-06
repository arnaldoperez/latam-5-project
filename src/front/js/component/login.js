import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context, loginInfo } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const [loginInfo, setloginInfo] = useState();
  const { store, actions } = useContext(Context);
  const history = useHistory();
  //const changeHandler = (event) => {
  //formValue = setformValue(event.target.value);
  //};
  function handleSubmission(event) {
    console.log("Submission event");
    event.preventDefault();
    const data = new FormData(event.target);
    let email = data.get("email");
    let password = data.get("password");

    actions.login(email, password).then((resp) => {
      if (resp.code !== 200) {
        return (
          <div class="alert alert-danger" role="alert">
            Usuario o contraseña incorrecta
          </div>
        );
      }
      history.push("");
    });
  }
  useEffect(() => {}, [store.token]);
  return (
    <div className="col-12 col-md-9 container-fluid">
      <div className="card col-lg-4 col-sm-12 container-fluid ">
        <article className="card-body">
          <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>

          <p className="text-success text-center">Let's find your handyman!</p>
          <form onSubmit={handleSubmission}>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-user"></i>{" "}
                  </span>
                </div>
                <input
                  name="email"
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
                  name="password"
                  className="form-control"
                  placeholder="******"
                  type="password"
                ></input>
              </div>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};
