import React, {useEffect, useState} from 'react'
import axios from 'axios';

const baseURL =  'http://localhost:8080'

const ListaUsuarios = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
    const showUsers = async () => {
        await axios
            .get(`${baseURL}/user/`)
            .then((res) => {
            setUsers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    showUsers();
}, []);

return (
    <div className="container">
        <h2>Lista de usuarios registrados</h2>
        <div className="row">
            {users.map((user) => {
                return (
                    <div key={user._id} className="col">
                        <ul>
                            <li>{user.nombre}{user.apellido}</li>
                            <li>{user.email}</li>
                        </ul>
                    </div>
                )})}
        </div>
    </div>
    )
}

export default ListaUsuarios