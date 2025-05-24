import { useParams } from "react-router-dom";
import "./orders/OrderAdmin.css"; // Ajusta la ruta según tu estructura

const orders = [
  { id: 101, user: "Juan Pérez", items: ["Camisa", "Pantalón"], total: 120.00, status: "Completado" },
  { id: 102, user: "Ana Gómez", items: ["Blusa"], total: 85.50, status: "Pendiente" },
];

export default function OrderDetail() {
  const { id } = useParams();
  const order = orders.find(o => o.id === Number(id));
  if (!order) return <p className="order-detail-container">Orden no encontrada</p>;

  return (
    <div className="order-detail-container">
      <div className="order-detail-title">Detalle de Orden</div>
      <table className="order-admin-table order-detail-table" style={{maxWidth: 600, margin: "1rem auto"}}>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{order.id}</td>
          </tr>
          <tr>
            <th>Usuario</th>
            <td>{order.user}</td>
          </tr>
          <tr>
            <th>Estado</th>
            <td>{order.status}</td>
          </tr>
          <tr>
            <th>Productos</th>
            <td>
              <ul style={{margin: 0, paddingLeft: "1.25rem"}}>
                {order.items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td><b>S/. {order.total.toFixed(2)}</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
