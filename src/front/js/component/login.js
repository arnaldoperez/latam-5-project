import React, { useState, useContext } from "react";
import { Context, loginInfo } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const [loginInfo, setloginInfo] = useState();
  const { store, actions } = useContext(Context);
  //const changeHandler = (event) => {
  //formValue = setformValue(event.target.value);
  //};
  function handleSubmission(event) {
    console.log("Submission event");
    event.preventDefault();
    const data = new FormData(event.target);
    let email = data.get("email");
    let password = data.get("password");

    actions.login(email, password);
  }

  return (
    <div>
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
        <p className="text-center">
          <a href="#" className="btn">
            Forgot password?
          </a>
        </p>
      </form>
    </div>
  );
};
