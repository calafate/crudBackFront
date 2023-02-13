import axios from "axios";
import { useState, useEffect } from "react";
import "./allblogs.css";
import EmptyList from "../common/EmptyList";
import ListBlogs from "./ListBlogs";


const AllBlogs = () => {
  const [noticias, setNoticias] = useState([]);
  const [change, setChange] = useState(false);

  const baseURL = "http://localhost:8080";

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
      <h2 className="main-title m-3">Publicaciones</h2>
      <div className="d-flex justify-content-end">
        <a href="/createblog">
          <button className="main-button">Nueva Publicación</button>
        </a>
      </div>
      <hr />
        {!noticias.length ? <EmptyList /> : <ListBlogs noticias={noticias} baseURL={baseURL} />}
    </div>
  );
};

export default AllBlogs;
