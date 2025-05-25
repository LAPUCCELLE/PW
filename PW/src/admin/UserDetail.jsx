import { useParams, Link } from "react-router-dom";
import usuarios from "../data/usuarios";
import orders from "../data/orders";
import "./users/UserAdmin.css";

export default function UserDetail() {
  const { id } = useParams();
  const user = usuarios.find(u => u.id === id);

  if (!user) return <p className="user-detail-container">Usuario no encontrado</p>;

  const avatarURL = `https://randomuser.me/api/portraits/${user.genero === "mujer" ? "women" : "men"}/${parseInt(user.id) % 100}.jpg`;
  const userOrders = orders.filter(order => order.userId === user.id);

  return (
    <div className="user-detail-main-container">
      <h2 className="user-detail-section-title">Detalles de usuario</h2>
      <div className="user-detail-card">
        <div className="user-detail-data">
          <h1 className="user-detail-name">{user.nombre}</h1>
          <p><b>Correo:</b> <a href={`mailto:${user.correo}`}>{user.correo}</a></p>
          <p><b>Rol:</b> {user.rol}</p>
          <p><b>Fecha de registro:</b> {new Date(user.fechaRegistro).toLocaleDateString()}</p>
        </div>
        <div className="user-detail-avatar-container">
          <img className="user-detail-avatar" src={avatarURL} alt={user.nombre} />
        </div>
      </div>

      <h3 className="user-detail-table-title">Últimas órdenes</h3>
      <table className="order-admin-table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", color: "#888" }}>No hay órdenes recientes</td>
            </tr>
          )}
          {userOrders.map(order => (
            <tr key={order.id}>
              <td>
                <Link to={`/admin/orders/${order.id}`} className="user-order-id">
                  #{order.id}
                </Link>
              </td>
              <td>{order.date}</td>
              <td>S/.{order.total?.toFixed(2) || "0.00"}</td>
              <td>
                <Link
                  to={`/admin/orders/${order.id}`}
                  className="user-order-btn"
                >
                  Ver detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
