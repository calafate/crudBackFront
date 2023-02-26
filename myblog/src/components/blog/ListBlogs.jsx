import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { es } from "dayjs/locale/es";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import "./allblogs.css";


const ListBlogs = ({ noticias, baseURL }) => {
    dayjs.locale(es);

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
            <div key={noticia._id} className="col-sm-12 col-md-6 col-lg-4">    
              <div className="blog-container mb-5">
                <Link className="link-blog" to={`/allblogs/${noticia._id}`}>
                  <div className="blog-img-container">
                    {noticia.image ? 
                    <img className="item-img" src={`${baseURL}/uploads/${noticia.image}`} alt="imagen" /> :
                    <div className="item-img-text">Sin Imagen</div>}
                  </div>
                  <div className="blog-text-container">
                    <div className="item-title">
                      <h6>{noticia.title}</h6>
                    </div>
                    <div className="item-summary">
                      <p>{noticia.summary}</p>
                    </div>
                  </div>
                </Link>
                <hr className="blog-hr"/>
                  <div className="item-date-category">
                    <p className="item-date">
                      {dayjs(noticia.fecha).format("DD MMMM YYYY")}
                    </p>
                    <p className="item-category">
                      {noticia.category}
                    </p>
                    <div className="item-buttons">
                        <Link to={`/updateblog/${noticia._id}`} className="buttons-upt-del">
                          <FontAwesomeIcon icon = {faPenToSquare} color="var(--update-color)"/>
                        </Link>
                        <Link to = "/allblogs"
                        onClick = {(e) => borrarNoticia(e, noticia._id)} className="buttons-upt-del">
                          <FontAwesomeIcon icon = {faTrashCan} color="var(--danger-color)" />
                        </Link>
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
