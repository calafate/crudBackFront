import React from "react";

const NavBar = () => {
  return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            My Blog
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <a className="nav-link active" aria-current="page" href="/">
                Todas las Noticias
              </a>
              <a className="nav-link" href="/createblog">
                Crear Noticia
              </a>
              <a className="nav-link" href="/auth/login">
                Login
              </a>
              <a className="nav-link" href="/auth/register">
                Registro
              </a>
              <a className="nav-link" href="/auth/lista">
                Lista
              </a>
              <a className="nav-link" href="/pokemon">
                PokeAPI
              </a>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default NavBar;
