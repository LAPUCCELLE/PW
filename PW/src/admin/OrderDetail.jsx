import { useParams } from "react-router-dom";
import orders from "../data/orders";
import usuarios from "../data/usuarios";
import productosMujer from "../data/productosMujer";
import "./orders/OrderAdmin.css";

export default function OrderDetail() {
  const { id } = useParams();
  const order = orders.find(o => o.id === id);
  if (!order) return <p className="order-detail-container">Orden no encontrada</p>;

  const user = usuarios.find(u => u.id === order.userId);

  // Buscar productos comprados usando los IDs
  const productosComprados = order.productos?.map(pid =>
    productosMujer.find(p => p.id === pid)
  ).filter(Boolean);

  return (
    <div className="order-detail-container">
      <div className="order-detail-title">Detalle de Orden</div>
      <table className="order-admin-table order-detail-table" style={{ maxWidth: 700, margin: "1rem auto" }}>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{order.id}</td>
          </tr>
          <tr>
            <th>Usuario</th>
            <td>{user ? user.nombre : "Usuario no encontrado"}</td>
          </tr>
          <tr>
            <th>Fecha</th>
            <td>{order.date}</td>
          </tr>
          <tr>
            <th>Productos</th>
            <td>
              {productosComprados && productosComprados.length > 0 ? (
                <ul style={{listStyle: "none", paddingLeft: 0, margin: 0}}>
                  {productosComprados.map(prod => (
                    <li key={prod.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                      <img
                        src={prod.imagenMain}
                        alt={prod.nombre}
                        style={{
                          width: 36,
                          height: 36,
                          objectFit: "cover",
                          borderRadius: 5,
                          marginRight: 10,
                          border: "1px solid #eee"
                        }}
                      />
                      <span>{prod.nombre}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span style={{ color: "#888" }}>No hay productos</span>
              )}
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td style={{ background: "#f3fcf5", color: "#16a34a", fontWeight: "bold", fontSize: "1.2rem" }}>
              S/. {order.total.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
