import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createBlog.css";
import ErrorMsg from "../common/ErrorMsg";

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
    ["link"],
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
];

const baseURL = process.env.REACT_APP_URL;

const CreateBlog = () => {

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [bdate, setBdate] = useState(dayjs().format("YYYY-MM-DDThh:mm"));
  const [files, setFiles] = useState("");
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState([]);
  const navigate = useNavigate();
  
  const crearPublicacion = () => {
    const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('body', body);
      data.set('category', category);
      data.set('image', files[0]);
      data.set('fecha', dayjs(bdate).format("YYYY-MM-DDThh:mm"));

      axios
        .post(`${baseURL}/api/blogs/`, data)
        .then((res) => {
          setTitle("");
          setSummary("");
          setBody("");
          setCategory("");
          setFiles("");
          setBdate(dayjs().format("YYYY-MM-DDThh:mm"));
          navigate("/allblogs");
        })
        .catch((err) => {
          setIsError(true);
          setMsgError(err.response.data.errors);
          console.log(err.response.data);
        });
    setIsError(false)
  };

  return (
    <div className="container main-body p-5">
      <h2>Nueva Publicaci??n</h2>
      {isError&&<ErrorMsg msgError={msgError}/>}
      <div className="container-side mt-5">
        <div className="side-body">
          <input
            type="text"
            className="form-control mb-3"
            value={title}
            placeholder="T??tulo de la Publicaci??n"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <input
            type="text"
            className="form-control mb-3"
            value={summary}
            placeholder="Resumen de la Publicaci??n"
            onChange={(e) => {setSummary(e.target.value);}}
            required
          />
          <div className="file">
            <label htmlFor="image">Seleccione una imagen (*.jpg o *.png)</label>
            <input
              type="file"
              className="form-control mb-3"
              name="image"
              accept=".jpg, .png"
              onChange={(e) => {setFiles(e.target.files);}}
              required
            />
          </div>
          <div className="quill">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={body}
              onChange={(newValue) => {setBody(newValue)}}
              required
            />
          </div>
        </div>
        <div className="side-bar">
          <div>
            <input
              required
              type="date"
              className="form-control mb-3"
              value={dayjs(bdate).format("YYYY-MM-DD")}
              onChange={(e) => {setBdate(e.target.value)}}
            />
            <select
              required
              className="form-select mb-3"
              defaultValue={""}
              onChange={(e) => {setCategory(e.target.value)}}>
              <option value="" disabled >Categor??a</option>
              <option value="Vida Sana">Vida Sana</option>
              <option value="Educaci??n">Educaci??n</option>
              <option value="Deporte">Deporte</option>
              <option value="Pol??tica">Pol??tica</option>
              <option value="Sociedad">Sociedad</option>
              <option value="Tecnolog??a">Tecnolog??a</option>
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
