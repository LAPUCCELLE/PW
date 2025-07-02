import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import usuarios from "../data/usuarios";
import './users/UserAdmin.css';

export default function UserList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/usuarios").then(res => setUsuarios(res.data)).catch(error => console.error("Error al obtener usuarios:", error));
  },[]); 
  
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table className="user-admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Fecha de registro</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => {
            const avatarURL = `https://randomuser.me/api/portraits/${user.genero === "mujer" ? "women" : "men"}/${parseInt(user.id) % 100}.jpg`;
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img
                    src={avatarURL}
                    alt={user.nombre}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid #eee"
                    }}
                  />
                  {user.nombre}
                </td>
                <td>{user.correo}</td>
                <td>{user.rol}</td>
                <td>{new Date(user.fechaRegistro).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/users/${user.id}`}>Ver detalle</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
