import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const baseURL ='http://localhost:8080';

const UpdateBlog = () => {
    
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [bdate, setBdate] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        const verNoticiaXid = async () => {
            await axios
            .get(`${baseURL}/api/blogs/${id}`)
            .then((res) => {
                setTitle(res.data.data.title);
                setBody(res.data.data.body);
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
            body: body,
            image: "imagen",
            createdAt: bdate
        }
        axios.put(`${baseURL}/api/blogs/${id}`, noticia)
            .then(res => {
                console.log(res.data)
                if(res.data?.status === "success"){
                    navigate("/");
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="container text-bg-dark p-5">
            <h2>Actualizar Noticia</h2>
            <div className="row mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titulo de la Noticia</label>
                        <input type="text" className="form-control" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="body" className="form-label">Texto de la Noticia</label>
                        <textarea className="form-control" rows="5" value={body} onChange={(e)=>{setBody(e.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Fecha de la Noticia</label>
                        <input type="date" className="form-control" onChange={(e)=>{setBdate(e.target.value)}} />
                    </div>
                    <button onClick={(e) => {actualizarNoticia(e)}} className="btn btn-secondary">
                        Actualizar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateBlog