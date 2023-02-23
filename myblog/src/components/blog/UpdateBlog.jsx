import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
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
  const [files, setFiles] = useState("");
  const [filesAnt, setFilesAnt] = useState("");
  const [bdate, setBdate] = useState("");
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verNoticiaXid = async () => {
      await axios
        .get(`${baseURL}/api/blogs/${id}`)
        .then((res) => {
          setTitle(res.data.data.title);
          setSummary(res.data.data.summary);
          setBody(res.data.data.body);
          setCategory(res.data.data.category);
          setFiles(res.data.data.image);
          setFilesAnt(res.data.data.image);
          setBdate(res.data.data.createdAt);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setMsgError(err.response.data.errors);
        });
    };
    verNoticiaXid();
    setIsError(false)
  }, [id]);

  const actualizarPublicacion = (e) => {
    e.preventDefault();
    const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('body', body);
      data.set('category', category);
      data.set('createdAt', bdate);
      if ( typeof files[0] === 'object') {
        data.set('image', files[0]);
      } else {
        data.set('image', filesAnt);
      }

    axios
      .put(`${baseURL}/api/blogs/${id}`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data?.status === "success") {
          navigate("/allblogs");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setMsgError(err.response.data.errors);
      })
  };

  return (
    <div className="container main-body p-5">
      <h2>Modificar Publicación</h2>
      {isError&&<ErrorMsg msgError={msgError}/>}
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
              name="image"
              accept=".jpg, .png"
              onChange={(e) => {setFiles(e.target.files);}}
            />
          </div>
          <h5>Imagen Seleccionada : {filesAnt}</h5>
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
              type="datetime-local"
              className="form-control mb-3"
              value={dayjs(bdate).format("YYYY-MM-DDThh:mm")}
              onChange={(e) => {setBdate(e.target.value)}}/>
            <select
              required
              value={category}
              className="form-select mb-3"
              onChange={(e) => {setCategory(e.target.value)}}>
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
