import React, {useState} from 'react';
import axios from 'axios';

const baseURL ='http://localhost:8080'

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [bdate, setBdate] = useState("");

    const crearNoticia = () => {
        const noticia = {
            title: title,
            body: body,
            image: "imagen",
            createdAt: Date(bdate)
        }
        console.log(noticia)

        axios.post(`${baseURL}/api/blogs/`, noticia)
            .then(res => {
                console.log(res.data.data)
                setTitle("");
                setBody("");
                setBdate("");
            })
            .catch((err) => {
                console.log(err)
            })
    }
    

    return (
        <div className="container text-bg-secondary p-5">
            <h2>Crear Noticia</h2>
            <div className="row mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titulo de la Noticia</label>
                        <input type="text" className="form-control" value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="body" className="form-label">Texto de la Noticia</label>
                        <textarea className="form-control" rows="5" value={body} 
                            onChange={(e)=>{setBody(e.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Fecha de la Noticia</label>
                        <input type="date" className="form-control" value={bdate} 
                            onChange={(e)=>{setBdate(e.target.value)}} />
                    </div>
                    <button onClick={crearNoticia} className="btn btn-dark">Guardar</button>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog