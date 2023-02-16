import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Categoría");
  const [bdate, setBdate] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  
  const crearPublicacion = () => {
    /*const time = new Date().toLocaleTimeString('en-US');
    const formatDateTime = `${bdate}T${time}`;
     const dateTime = Date(formatDateTime) */

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('body', body);
    data.set('category', category);
    data.set('image', files[0]);
    data.set('createdAt', bdate);

    console.log(data);
      axios
        .post(`${baseURL}/api/blogs/`, data)
        .then((res) => {
          setTitle("");
          setSummary("");
          setBody("");
          setCategory("");
          setFiles("");
          setBdate(dayjs(new Date()).format("YYYY-MM-DD"));
          navigate("/allblogs");
        })
        .catch((err) => {
          console.log(err);
          alert("verifique que todos los datos esten completos")
        });
  };

  return (
    <div className="container main-body p-5">
      <h2>Nueva Publicación</h2>
      <div className="container-side mt-5">
        <div className="side-body">
          <input
            type="text"
            className="form-control mb-3"
            value={title}
            placeholder="Título de la Publicación"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control mb-3"
            value={summary}
            placeholder="Resumen de la Publicación"
            onChange={(e) => {
              setSummary(e.target.value);}}/>
          <div className="file">
            <label htmlFor="image">Seleccione una imagen (*.jpg o *.png)</label>
            <input
              type="file"
              className="form-control mb-3"
              name="image"
              accept=".jpg, .png"
              onChange={(e) => {setFiles(e.target.files);}}
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
              /* value={dayjs(bdate).format("YYYY-MM-DD")} */
              onChange={(e) => {
                setBdate(e.target.value);
              }}
            />
            <select
              className="form-select mb-3"
              onChange={(e) => {
                setCategory(e.target.value);
              }}>
                <option>Categoría</option>
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
            <button onClick={crearPublicacion}
              className="save-button">Guardar
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

export default CreateBlog;
