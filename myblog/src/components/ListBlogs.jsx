import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';


const ListBlogs = ({ noticias, baseURL}) => {    

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
                            <p>Publicado el: {dayjs(noticia.createdAt).format("DD-MM-YYYY HH:MM")}</p>
                            <p>{noticia.createdAt}</p>
                            </div>
                            <hr />
                            <div className="noticia-buttons">
                            <Link
                                to={`/updateblog/${noticia._id}`}
                                type="button"
                                className="btn btn-dark"
                            >
                                Modificar
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {borrarNoticia(e, noticia._id);
                                }}
                            >
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

export default ListBlogs;
