import { Link } from "react-router-dom";
import './users/UserAdmin.css';

const users = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Cliente" },
  { id: 2, name: "Ana Gómez", email: "ana@example.com", role: "Administrador" },
];

export default function UserList() {
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table className="order-admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/admin/users/${user.id}`}>Ver detalle</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
