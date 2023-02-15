import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import "./allblogs.css";

const ListBlogs = ({ noticias, baseURL }) => {

  const borrarNoticia = async (e, id) => {
    e.preventDefault();
    await axios
      .delete(`${baseURL}/api/blogs/${id}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row gx-5">
        {noticias.map((noticia) => {
          return (
            <div key={noticia._id} className="col-sm-6">
              <hr className="item-hr"/>
              <div className="blog-container mb-5">
                {/* <div className="item-image">
                    <img src={`./uploads/${noticia.image}`} alt="imagen" />
                </div> */}
                <div className="item-title">
                  <h5>{noticia.title}</h5>
                </div>
                <div className="item-summary">
                  <h6>Nombre Imagen: {noticia.image}</h6>
                  <p>{noticia.summary}</p>
                </div>
                <hr />
                <div className="item-date-category">
                  <p className="item-date">
                    Publicado el: {" "}
                    {dayjs(noticia.createdAt).format("DD MMMM YYYY")}
                  </p>
                  <p className="item-category">
                    {noticia.category}
                  </p>
                </div>
                <div className="noticia-buttons">
                  <div className="item-link">
                    <Link className="link-blog" to={`/allblogs/${noticia._id}`}>
                      Seguir Leyendo ...
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/updateblog/${noticia._id}`}
                      type="button"
                      className="btn">
                      <FontAwesomeIcon icon = {faPenToSquare} color="var(--update-color)"/>
                    </Link>
                    <button
                      className="btn"
                      onClick={(e) => {
                        borrarNoticia(e, noticia._id);}}>
                      <FontAwesomeIcon icon = {faTrashCan} color="var(--danger-color)" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          );
        })}
      </div>
    </div>
    
  );
};

export default ListBlogs;
