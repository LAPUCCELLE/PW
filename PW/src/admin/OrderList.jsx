import { Link } from "react-router-dom";
import "./orders/OrderAdmin.css";

const orders = [
  { id: 101, user: "Juan Pérez", total: 120.00, status: "Completado" },
  { id: 102, user: "Ana Gómez", total: 85.50, status: "Pendiente" },
];

export default function OrderList() {
  return (
    <div>
      <h2>Lista de Órdenes</h2>
      <table className="order-admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>S/. {order.total.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <Link to={`/admin/orders/${order.id}`}>Ver detalle</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
