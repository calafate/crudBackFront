import {useState} from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


  return (
        <div className="container p-5">
            <h2>Ingresar</h2>
            <div className="row">
                <div className="col-sm-4 offset-4 text-bg-success">
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
                    <div className="mb-3">
                      <button type="button" className="btn btn-outline-dark btn-block">Login</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login