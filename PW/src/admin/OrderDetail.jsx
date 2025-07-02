import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import orders from "../data/orders";
//import usuarios from "../data/usuarios";
import "./orders/OrderAdmin.css";

export default function OrderDetail() {
  const { id } = useParams();
  //const [productosBD, setProductosBD] = useState([]);
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/orders/${id}`).then(res => setOrden(res.data)).catch(error => console.error("Error al cargar la orden:", error));
  }, [id]);

  //const order = orders.find(o => o.id === id);
  if (!orden) return <p className="order-detail-container">Orden no encontrada</p>;

  //const user = usuarios.find(u => u.id === order.userId);

  // Buscar productos comprados usando los IDs
  /*const productosComprados = order.productos?.map(pid =>
    productosBD.find(p => p.id === pid)
  ).filter(Boolean);*/

  return (
    <div className="order-detail-container">
      <div className="order-detail-title">Detalle de Orden</div>
      <table className="order-admin-table order-detail-table" style={{ maxWidth: 700, margin: "1rem auto" }}>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{orden.id}</td>
          </tr>
          <tr>
            <th>Usuario</th>
            <td>{orden.usuario?.nombre || "Usuario desconocido"}</td>
          </tr>
          <tr>
            <th>Fecha</th>
            <td>{orden.fecha}</td>
          </tr>
          <tr>
            <th>Productos</th>
            <td>
              {orden.items && orden.items.length > 0 ? (
                <ul style={{listStyle: "none", paddingLeft: 0, margin: 0}}>
                  {orden.items.map(item => (
                    <li key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                      <img
                        src={item.producto?.imagenMain}
                        alt={item.producto?.nombre}
                        style={{
                          width: 36,
                          height: 36,
                          objectFit: "cover",
                          borderRadius: 5,
                          marginRight: 10,
                          border: "1px solid #eee"
                        }}
                      />
                      <span>{item.producto?.nombre} (x{item.cantidad}) - Talla: {item.talla}</span>
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
              S/. {orden.monto?.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
