import {useState} from 'react';
import "../portada/portada.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");


    return (
        <div className="container-fluid p-5 portada">
            <h2>Iniciar sesión</h2>
            <div className="row">
                <div className="col-sm-4 offset-4">
                    <div className="mt-5 mb-3">
                        <label htmlFor="email" className="form-label">Ingrese email</label>
                        <input type="text" className="form-control" value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Ingrese contraseña</label>
                        <input type="password" className="form-control" value={pass} 
                            onChange={(e)=>{setPass(e.target.value)}} />
                    </div>
                    <div>
                        {/* <p className="text-danger bg-white">ERROR</p> */}
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-dark btn-block">Login</button>
                    </div>
                    <div>
                        <p>¿No tenés una cuenta?</p>
                        <p><a className="text-reset" href="/auth/register">REGISTRATE</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login