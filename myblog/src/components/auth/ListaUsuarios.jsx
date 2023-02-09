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
            <table className="table table-success table-striped table-bordered border-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha Nac.</th>
                  <th scope="col">Email</th>
                  <th scope="col">Pass</th>
                </tr>
              </thead>
              {users.map((user, i) => {
                return (
                  <tbody key={user._id}>
                    <tr>
                      <th scope="row">{i}</th>
                      <td>{user.apellido}</td>
                      <td>{user.nombre}</td>
                      <td>{user.fecNacimiento}</td>
                      <td>{user.email}</td>
                      <td>{user.pass}</td>
                    </tr>
                  </tbody>
                )})}
            </table>
        </div>
    )
}

export default ListaUsuarios