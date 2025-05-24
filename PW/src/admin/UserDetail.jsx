import { useParams, Link } from "react-router-dom";
import "./users/UserAdmin.css";

// Simulación de usuarios y órdenes (debería ser la misma fuente de datos que usas en otros componentes)
const users = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@gmail.com",
    registered: "2025-01-20",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    orders: [101]
  },
  {
    id: 2,
    name: "Ana Gómez",
    email: "ana.gomez@example.com",
    registered: "2024-01-22",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    orders: [102]
  }
];

const orders = [
  { id: 101, date: "20/01/2025", total: 120.00 },
  { id: 102, date: "22/01/2024", total: 85.00 },

];

export default function UserDetail() {
  const { id } = useParams();
  const user = users.find(u => u.id === Number(id));
  if (!user) return <p className="user-detail-container">Usuario no encontrado</p>;

  // Traer las órdenes de este usuario
  const userOrders = orders.filter(o => user.orders.includes(o.id));

  return (
    <div className="user-detail-main-container">
      <h2 className="user-detail-section-title">Detalles de usuario</h2>
      <div className="user-detail-card">
        <div className="user-detail-data">
          <h1 className="user-detail-name">{user.name}</h1>
          <p><b>Correo:</b> <a href={`mailto:${user.email}`}>{user.email}</a></p>
          <p><b>Fecha de registro:</b> {new Date(user.registered).toLocaleDateString()}</p>
        </div>
        <div className="user-detail-avatar-container">
          <img className="user-detail-avatar" src={user.avatar} alt={user.name} />
        </div>
      </div>

      <h3 className="user-detail-table-title">Últimas órdenes</h3>
      <table className="user-detail-orders-table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map(order => (
            <tr key={order.id}>
              <td>
                <Link to={`/admin/orders/${order.id}`} className="user-order-id">
                  #{order.id}
                </Link>
              </td>
              <td>{order.date}</td>
              <td>S/.{order.total.toFixed(2)}</td>
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
      {/* Paginación removida por pedido */}
    </div>
  );
}
