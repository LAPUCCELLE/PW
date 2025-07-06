import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './users/UserAdmin.css';

const API_URL = "http://localhost:3000/api/usuarios"; // Cambia si tu backend está en otro lugar
const API_ORDERS = "http://localhost:3000/api/orders"; // Cambia si tu backend está en otro lugar

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/${id}`)
      .then(res => setUser(res.data))
      .catch(() => setError("Usuario no encontrado"));

    axios.get(API_ORDERS)
      .then(res => setUserOrders(res.data.filter(o => o.userId === id)))
      .catch(() => {});

    setLoading(false);
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p className="user-detail-container">Usuario no encontrado</p>;

  const avatarURL = `https://randomuser.me/api/portraits/${user.genero === "mujer" ? "women" : "men"}/${parseInt(user.id) % 100}.jpg`;

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
