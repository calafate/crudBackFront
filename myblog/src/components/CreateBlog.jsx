import {useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
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

const baseURL ='http://localhost:8080'

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [bdate, setBdate] = useState("");

    const crearPublicacion = () => {
        const publicacion = {
            title: title,
            summary: summary,
            body: body,
            category: category,
            image: "imagen",
            createdAt: dayjs(bdate).format("YYYY-MM-DD")
        }
        console.log(publicacion)

        axios.post(`${baseURL}/api/blogs/`, publicacion)
            .then(res => {
                setTitle("");
                setSummary("");
                setBody("");
                setCategory("");
                setImage("")
                setBdate("");
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    return (
        <div className="container text-secondary p-5">
            <h2>Nueva Publicación</h2>
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
                        
                        <button onClick={crearPublicacion} className="btn btn-outline-light mb-3 mt-5">Guardar</button>
                        <Link to="/allblogs"><button className="btn btn-outline-danger mb-3">Cancelar</button></Link>
                    </div>
            </div>
        </div>
    )
}

export default CreateBlog