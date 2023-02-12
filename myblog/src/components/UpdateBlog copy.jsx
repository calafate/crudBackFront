import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';


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
    
    const actualizarNoticia = (e) => {
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
        <div className="container text-bg-dark p-5">
            <h2>Actualizar Noticia</h2>
            <div className="row mt-5">
                <div className="col-sm-6 offset-3">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titulo de la Noticia</label>
                            <input type="text" className="form-control" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="body" className="form-label">Texto de la Noticia</label>
                            <div dangerouslySetInnerHTML={{__html:body}} className="noticia-body"/>
                            <textarea className="form-control" rows="5" value={body} onChange={(e)=>{setBody(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <select className="form-select" 
                                onChange={(e)=>{setCategory(e.target.value)}}>
                                <option selected>{category}</option>
                                <option value="Vida Sana">Vida Sana</option>
                                <option value="Educación">Educación</option>
                                <option value="Política">Política</option>
                                <option value="Sociedad">Sociedad</option>
                                <option value="Tecnología">Tecnología</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Fecha de la Noticia</label>
                            <input type="date" className="form-control" value={bdate} onChange={(e)=>{setBdate(e.target.value)}} />
                        </div>
                        <button onClick={(e) => {actualizarNoticia(e)}} className="btn btn-outline-light">
                            Actualizar
                        </button>
                        <Link to="/allblogs"><button className="btn btn-outline-danger mx-2">Cancelar</button></Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateBlog