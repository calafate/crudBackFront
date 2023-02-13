import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Mi Blog
          </NavLink>
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
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <NavLink activeclassname="active" className="nav-link" aria-current="page" to="/allblogs">
                Publicaciones
              </NavLink>
              <li className="nav-item dropdown">
                <NavLink activeclassname="active" className="nav-link dropdown-toggle" to="/login" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Auth
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><NavLink activeclassname="active" className="dropdown-item" to="/auth/login">Login</NavLink></li>
                  <li><NavLink activeclassname="active" className="dropdown-item" to="/auth/register">Register</NavLink></li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li><NavLink activeclassname="active" className="dropdown-item" to="/auth/lista">List</NavLink></li>
                </ul>
              </li>
              <NavLink activeclassname="active" className="nav-link" to="/pokemon">
                PokeAPI
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
