import { useState } from "react";
import "../portada/portada.css";
import "./auth.css";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import ErrorMsg from "../common/ErrorMsg";

const baseURL = process.env.REACT_APP_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState([]);

  let navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const login = {
      email: email,
      pass: pass
    };
    /* axios.post("/user/login", login) */
    axios.post(`${baseURL}/user/login`, login)
      .then(res => {
          console.log(res.data.data);
          navigate("/allblogs");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setIsError(true);
        setMsgError(err.response.data.errors);
      })
      setIsError(false);
    };

  return (
    <div className="container-fluid portada">
      <form className="login" onSubmit={login}>
        <h2 className="login-title">Iniciar sesión</h2>
        {isError&&<ErrorMsg msgError={msgError}/>}
        <input 
          type="text"
          className="login-mail"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          required
        />
        <input
          type="password"
          className="login-pass"
          placeholder="Ingrese password"
          value={pass}
          onChange={(e) => {setPass(e.target.value)}}
          required
        />
        <button className="login-button">Iniciar sesión</button>
      </form>
      <div>
        <p>¿No tenés una cuenta?</p>
        <p><Link className="text-reset-auth" to="/auth/register">
            Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
