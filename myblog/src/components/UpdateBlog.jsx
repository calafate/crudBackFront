import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/createBlog.css'


const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const baseURL ='http://localhost:8080';

const UpdateBlog = () => {
    
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [bdate, setBdate] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        const verNoticiaXid = async () => {
            await axios
            .get(`${baseURL}/api/blogs/${id}`)
            .then((res) => {
                setTitle(res.data.data.title);
                setSummary(res.data.data.summary)
                setBody(res.data.data.body);
                setCategory(res.data.data.category);
                setImage(res.data.data.image);
                setBdate(res.data.data.createdAt);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        verNoticiaXid()
    }, [id]);
    
    const actualizarPublicacion = (e) => {
        e.preventDefault();
        const noticia = {
            title: title,
            summary: summary,
            body: body,
            category: category,
            image: "imagen",
            createdAt: bdate
        }
        axios.put(`${baseURL}/api/blogs/${id}`, noticia)
            .then(res => {
                console.log(res.data)
                if(res.data?.status === "success"){
                    navigate("/allblogs");
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="container text-secondary p-5">
            <h2>Modificar Publicación</h2>
            <div className="container-create mt-5">
                    <div className="create-body">
                        <input type="text" className="form-control mb-3" value={title}
                            placeholder= "Título de la Publicacioón"
                            onChange={(e)=>{setTitle(e.target.value)}}/>
                        <input type="text" className="form-control mb-3" value={summary}
                            placeholder= "Resumen de la Publicacioón"
                            onChange={(e)=>{setSummary(e.target.value)}}/>
                            <div className="file">
                                <label htmlFor="image">Seleccione una imagen (*.jpg o *.png)</label>
                                <input type="file" className="form-control mb-3" 
                            id="image" accept="image/png, image/jpg"/>
                            </div>
                            <div className="quill">
                                <ReactQuill theme="snow" 
                                    modules={modules} formats={formats}
                                    value={body}
                                    onChange={newValue => {setBody(newValue)}} />
                            </div>
                    </div>
                    <div className="create-varios">
                        <input type="date" className="form-control mb-3"
                                value={dayjs().format("YYYY-MM-DD")}
                                onChange={(e)=>{setBdate(e.target.value)}} />
                        <select className="form-select mb-3" 
                            onChange={(e)=>{setCategory(e.target.value)}}>
                            <option>Categoria</option>
                            <option value="Vida Sana">Vida Sana</option>
                            <option value="Educación">Educación</option>
                            <option value="Política">Política</option>
                            <option value="Sociedad">Sociedad</option>
                            <option value="Tecnología">Tecnología</option>
                        </select>
                        
                        <button onClick={(e) => {actualizarPublicacion(e)}} className="btn btn-outline-light mb-3 mt-5">
                            Actualizar
                        </button>
                        <Link to="/allblogs"><button className="btn btn-outline-danger mb-3">Cancelar</button></Link>
                    </div>
            </div>
        </div>
    )
}

export default UpdateBlog