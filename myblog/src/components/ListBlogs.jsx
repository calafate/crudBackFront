import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import "../styles/allblogs.css";

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
      <div className="row">
        {noticias.map((noticia) => {
          return (
            <div key={noticia._id} className="col-sm-6">
              <div className="container-noticia mb-5">
                <div className="noticia-title">
                  <h5>{noticia.title}</h5>
                </div>
                <div className="noticia-resumen">
                  <p>{noticia.summary}</p>
                </div>
                {/* <div dangerouslySetInnerHTML={{__html:noticia.body}} className="noticia-body"/> */}
                <hr />
                <div className="noticia-date-category">
                  <p className="noticia-date">
                    Publicado el: {" "}
                    {dayjs(noticia.createdAt).format("DD MMMM YYYY")}
                  </p>
                  <p className="noticia-category">
                    {noticia.category}
                  </p>
                  {/* <p>{noticia.createdAt}</p> */}
                </div>
                <div className="noticia-buttons">
                  <Link
                    to={`/updateblog/${noticia._id}`}
                    type="button"
                    className="btn">
                    <FontAwesomeIcon icon = {faPenToSquare} color="lightBlue"/>
                  </Link>
                  <button
                    className="btn"
                    onClick={(e) => {
                      borrarNoticia(e, noticia._id);}}>
                    <FontAwesomeIcon icon = {faTrashCan} color="red" />
                  </button>
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
