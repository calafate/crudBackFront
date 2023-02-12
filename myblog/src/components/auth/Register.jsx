import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../portada/portada.css'

const baseURL ='http://localhost:8080'

const Register = () => {
  let navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecNacimiento, setFecNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const crearUsuario = () => {
    const usuario = {
        nombre: nombre,
        apellido: apellido,
        fecNacimiento: fecNacimiento,
        email: email,
        pass: pass
    }

    axios.post(`${baseURL}/user/`, usuario)
        .then(res => {
            console.log(res.data.data);
            navigate("/auth/login");
        })
        .catch((err) => {
            console.log(err)
        })
}

  return (
    <div className="container-fluid p-5 portada">
      <h2>Registro de Usuario</h2>
      <div className="row">
        <div className="col-sm-4 offset-4">
          <div className="mt-5 mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                value={apellido}
                onChange={(e) => {
                  setApellido(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fecNacimiento" className="form-label">
                Fecha de Nacimiento
              </label>
              <input
                type="text"
                className="form-control"
                value={fecNacimiento}
                onChange={(e) => {
                  setFecNacimiento(e.target.value);
                }}
              />
            </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Ingrese email
            </label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">
              Ingrese contraseña
            </label>
            <input
              type="password"
              className="form-control"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-dark btn-block"
              onClick={crearUsuario}>
              Registrarse
            </button>
          </div>
          <div>
            <p>¿Ya tenés una cuenta?</p>
            <p><a className="text-reset" href="/auth/login">Inicia Sesión</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
