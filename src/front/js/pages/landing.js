import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/landing.css";
import { SignUp } from "./signUp";
//importando los componentes de Bootstrap para mejorar el aspecto del SignUp
import { Card, Row, Container, Column } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Single } from "./single";

export const Landing = () => {
  return (
    <div className="container-fluid row">
      <div className="row bg pageholder">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 bold card">Dr. Motor</h1>
          <p className="lead bold card">
            We will introduce you the right person to repair your vehicles. You
            can visit the workshop o the workshop can visit you. Know the
            reputation from your handyman. We are the biggest community for
            mechanical services. Already registered? Sign in
          </p>
          <a className="btn btn-primary" href="/login">
            Login
          </a>
        </div>
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 bold card">About Us</h1>
          <p className="lead bold card">
            Report damage to your vehicules, recieve repair propolsals, meet the
            proper handyman for you! Rate the service recieved and know other
            users experience with your technician. Register and start using for
            free!
          </p>
          <a className="btn btn-primary" href="/signup">
            Sign Up
          </a>
        </div>
        <div className="row logo"></div>
      </div>
    </div>
  );
};
