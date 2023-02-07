import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import "../styles/allblogs.css";

const AllBlogs = () => {
  const [noticias, setNoticias] = useState([]);
  const [change, setChange] = useState(false);

  const baseURL = "http://localhost:8080"
  

  const borrarNoticia = async (e, id) => {
    e.preventDefault();
    await axios
      .delete(`${baseURL}/api/blogs/${id}`)
      .then((res) => {
        console.log(res.data);
        setChange(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const mostrarNoticias = async () => {
      await axios
        .get(`${baseURL}/api/blogs/`)
        .then((res) => {
          setNoticias(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    mostrarNoticias();
    setChange(false);
  }, [change]);


  return (
    <div className="container">
      <h2>Todas las Noticias</h2>
      <div className="row">
        {noticias.map((noticia) => {
          return (
            <div key={noticia._id} className="col">
              <div className="container-noticia">
                <div className="noticia-title">
                  <h4>{noticia.title}</h4>
                </div>
                <div className="noticia-body">
                  <p>{noticia.body}</p>
                </div>
                <hr />
                <div className="noticia-date">
                  <p>Publicado el: {dayjs(noticia.createdAt).format('DD-MM-YYYY')}</p>
                  <p>{noticia.createdAt}</p>
                </div>
                <hr />
                <div className="noticia-buttons">
                  <Link to={`/updateblog/${noticia._id}`} 
                    type="button" className="btn btn-dark">Modificar
                  </Link>
                  <button className="btn btn-danger"
                    onClick={(e) => {borrarNoticia(e, noticia._id);}}>
                    Borrar
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

export default AllBlogs;
