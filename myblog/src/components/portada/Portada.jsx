import React from "react";
import NavBar from "../navBar/NavBar";
import { Link } from "react-router-dom";
import "./portada.css";

const Portada = () => {
  return (
    <>
    <div className="portada">
      
      <div className="container px-4 px-lg-5 h-100 container-text">
        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-8 align-self-end">
            <h1 className="text-white font-weight-bold">Bienvenidos a Mi Blog</h1>
            <hr />
          </div>
          <div className="col-lg-8 align-self-baseline">
            <p className="text-white-75 mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, tenetur ullam quos saepe alias natus porro aperiam!
            </p>
            <Link to="/auth/login" className="btn btn-dark btn-xl">
              Ingresar
            </Link>
          </div>
        </div>
      </div>
      <p></p>
    </div>
    </>
  );
};

export default Portada;
