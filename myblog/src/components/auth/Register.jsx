import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../portada/portada.css'

const baseURL ='http://localhost:8080';

const Register = () => {
  let navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecNacimiento, setFecNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const register = (e) => {
    e.preventDefault();
    const usuario = {
        nombre: nombre,
        apellido: apellido,
        fecNacimiento: fecNacimiento,
        email: email,
        pass: pass
    }

    axios.post(`${baseURL}/user/register`, usuario)
        .then(res => {
            console.log(res.data.data);
            navigate("/auth/login");
        })
        .catch((err) => {
            alert("Datos Incorrectos")
            console.log(err)
        })
}

  return (
    <div className="container-fluid portada">
      <form className="register" onSubmit={register}>
        <h2 className="register-title">Registro de Usuario</h2>
        <input
          type="text"
          placeholder="Ingrese Nombre"
          value={nombre}
          onChange={(e) => {setNombre(e.target.value)}}
        />
        <input
          type="text"
          placeholder="Ingrese Apellido"
          value={apellido}
          onChange={(e) => {setApellido(e.target.value)}}
        />
        <input
          type="text"
          placeholder="Ingrese Fecha de Nacimiento"
          value={fecNacimiento}
          onChange={(e) => {setFecNacimiento(e.target.value)}}
        />
        <input
          type="text"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => {
          setEmail(e.target.value)}}
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={pass}
          onChange={(e) => {setPass(e.target.value)}}
        />
        <button className="register-button">Guardar </button>
      </form>
      <div>
        <p>¿Ya tenés una cuenta?</p>
        <p><Link className="text-reset-auth" to="/auth/login">Iniciar Sesión</Link></p>
      </div>
    </div>
  );
};

export default Register;
