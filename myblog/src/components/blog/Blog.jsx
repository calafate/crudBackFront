import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "react-quill/dist/quill.snow.css";
import "./blog.css";

const baseURL = process.env.REACT_APP_URL;

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const verPublicacionXid = async () => {
      await axios
        .get(`${baseURL}/api/blogs/${id}`)
        .then((res) => {
          setBlog(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    verPublicacionXid();
  }, [id]);

  return (
    <div className="container">
      <div className="blogxID-container">
        <div className="publication-return">
          <Link to="/allblogs">
            <button className="button-return">Volver</button>
          </Link>
        </div>
        <div className="publication-title">
          <h2 >{blog.title}</h2>
        </div>
        <hr className="publication-hr" />
        {blog.image ? 
        <div className="publication-img">
          <img src={`${baseURL}/uploads/${blog.image}`} alt="imagen" />
        </div>
        : <p></p>}
        <div
          dangerouslySetInnerHTML={{ __html: blog.body }}
          className="publication-body mb-3"
        />
        <hr className="publication-hr" />
        <div className="publication-date-category">
          <p className="publication-date">
            Publicado el: {dayjs(blog.fecha).format("DD MMMM YYYY")}
          </p>
          <p className="publication-category">{blog.category}</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
