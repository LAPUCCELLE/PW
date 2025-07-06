import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './users/UserAdmin.css';

const API_URL = "http://localhost:3000/api/usuarios"; // Cambia si tu backend está en otro lugar

export default function UserList() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setUsuarios(res.data))
      .catch(err => setError("Error al cargar usuarios"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

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
