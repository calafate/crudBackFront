import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "react-quill/dist/quill.snow.css";
import "../styles/blog.css";

const baseURL = "http://localhost:8080";

const Blog = () => {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState([]);

  useEffect(() => {
    const verPublicacionXid = async () => {
      await axios
        .get(`${baseURL}/api/blogs/${id}`)
        .then((res) => {
          setPublicacion(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    verPublicacionXid();
  }, [id]);

  return (
    <div className="col-sm-6 offset-3">
      <div className="publicacion-title">
        <h1 className="mt-3">{publicacion.title}</h1>
      </div>
        <hr className="publicacion-hr" />
        <div
          dangerouslySetInnerHTML={{ __html: publicacion.body }}
          className="publicacion-body mb-3"
        />
        <hr className="publicacion-hr"/>
        <div className="publicacion-date-category">
          <p className="publicacion-date">
            Publicado el: {dayjs(publicacion.createdAt).format("DD MMMM YYYY")}
          </p>
          <p className="publicacion-category">{publicacion.category}</p>
        </div>
        <div className="publicacion-volver">
          <Link to="/allblogs"><button className="btn btn-outline-success mb-3">Volver</button></Link>
        </div>
      </div>
  );
};

export default Blog;
