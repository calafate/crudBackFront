import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../portada/portada.css'
import ErrorMsg from "../common/ErrorMsg";

/* const baseURL ='http://localhost:8080'; */
const baseURL = process.env.REACT_APP_URL

const Register = () => {
  let navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState([]);

  const register = (e) => {
    e.preventDefault();
    const usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        pass: pass
    }
    axios.post(`${baseURL}/user/register`, usuario)
        .then(res => {
            console.log(res.data.data);
            navigate("/auth/login");
        })
        .catch((err) => {
          console.log(err.response.data.errors)
          setIsError(true);
          setMsgError(err.response.data.errors);
        })
    setIsError(false)
}

  return (
    <div className="container-fluid portada">
      <form className="register" onSubmit={register}>
        <h2 className="register-title">Registro de Usuario</h2>
        {isError&&<ErrorMsg msgError={msgError}/>}
        <input
          type="text"
          placeholder="Ingrese Nombre"
          value={nombre}
          onChange={(e) => {setNombre(e.target.value)}}
          required
        />
        <input
          type="text"
          placeholder="Ingrese Apellido"
          value={apellido}
          onChange={(e) => {setApellido(e.target.value)}}
          required
        />
        <input
          type="text"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => {
          setEmail(e.target.value)}}
          required
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={pass}
          onChange={(e) => {setPass(e.target.value)}}
          required
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
