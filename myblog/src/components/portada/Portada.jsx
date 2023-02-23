import { Link } from "react-router-dom";
import "./portada.css";

const Portada = () => {
  return (
    <>
    <div className="portada">
      <nav className="link-pokemones">
        <Link to="/pokemon">Pokemon API </Link>
      </nav>
      <div className="container px-4 px-lg-5 h-100 container-text">
        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-8 align-self-end">
            <h1 className="text-white font-weight-bold">Bienvenidos a Mi Blog</h1>
            <hr />
          </div>
          <div className="col-lg-8 align-self-baseline">
            <h4 className="text-white-75 mb-5">
            Sitio web donde uno puede publicar lo que desee compartir con otras personas.
            </h4>
            <Link to="/auth/login" className="getInto">
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
