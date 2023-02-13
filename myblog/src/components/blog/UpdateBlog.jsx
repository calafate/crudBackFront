import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createBlog.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const baseURL = "http://localhost:8080";

const UpdateBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  /* const [files, setFiles] = useState(""); */
  const [bdate, setBdate] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const verNoticiaXid = async () => {
      await axios
        .get(`${baseURL}/api/blogs/${id}`)
        .then((res) => {
          setTitle(res.data.data.title);
          setSummary(res.data.data.summary);
          setBody(res.data.data.body);
          setCategory(res.data.data.category);
          // setFiles(res.data.data.image);
          setBdate(res.data.data.createdAt);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    verNoticiaXid();
  }, [id]);

  const actualizarPublicacion = (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString('en-US');
    console.log("bdate  ",bdate)
    const formatDateTime = `${bdate}T${time}`;
    console.log("formatDateTime  ",formatDateTime)
    const dateTime = Date(formatDateTime)
    console.log("DateTime", dateTime)

    const noticia = {
      title: title,
      summary: summary,
      body: body,
      category: category,
      image: "imagen",
      createdAt: dateTime,
    };
    axios
      .put(`${baseURL}/api/blogs/${id}`, noticia)
      .then((res) => {
        console.log(res.data);
        if (res.data?.status === "success") {
          navigate("/allblogs");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container main-body p-5">
      <h2>Modificar Publicación</h2>
      <div className="container-side mt-5">
        <div className="side-body">
          <label>Título de la Publicación</label>
          <input
            type="text"
            className="form-control mb-3"
            value={title}
            placeholder="Título de la Publicacioón"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label>Resumen de la Publicación</label>
          <input
            type="text"
            className="form-control mb-3"
            value={summary}
            placeholder="Resumen de la Publicacioón"
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          />
          <div className="file">
            <label htmlFor="image">Seleccione una imagen (*.jpg o *.png)</label>
            <input
              type="file"
              className="form-control mb-3"
              id="image"
              accept="image/png, image/jpg"
            />
          </div>
          <div className="quill">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={body}
              onChange={(newValue) => {
                setBody(newValue);
              }}
            />
          </div>
        </div>
        <div className="side-bar">
          <div>
            <input
              type="date"
              className="form-control mb-3"
              value={dayjs(bdate).format("YYYY-MM-DD")}
              onChange={(e) => {
                setBdate(e.target.value);
              }}/>
            <select
            value={category}
              className="form-select mb-3"
              onChange={(e) => {
                setCategory(e.target.value);
              }}>
              <option value="Vida Sana">Vida Sana</option>
              <option value="Educación">Educación</option>
              <option value="Deporte">Deporte</option>
              <option value="Política">Política</option>
              <option value="Sociedad">Sociedad</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Arte">Arte</option>
              <option value="Literatura">Literatura</option>
            </select>
          </div>
          <div className="side-buttons">
            <button
              onClick={(e) => {
                actualizarPublicacion(e);
              }}
              className="save-button"
            >
              Actualizar
            </button>
            <Link to="/allblogs">
              <button className="cancel-button">Cancelar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
