import React, { useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const { formValue, setformValue } = useState("");

  const changeHandler = (event) => {
    formValue = setformValue(event.target.value);
  };
  const handleSubmission = () => {
    const formData = new FormData();
    formData.append("email");
  };

  return (
    <div>
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
    </div>
  );
};
