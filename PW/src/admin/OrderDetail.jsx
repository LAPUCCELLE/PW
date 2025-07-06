import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './orders/OrderAdmin.css';

const API_ORDERS = "http://localhost:3000/api/orders";
const API_USERS = "http://localhost:3000/api/usuarios";
const API_PRODUCTS = "http://localhost:3000/api/productosMujer"; // Cambia por el endpoint real de tus productos

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_ORDERS}/${id}`),
      axios.get(API_USERS),
      axios.get(API_PRODUCTS)
    ])
      .then(([orderRes, usersRes, productsRes]) => {
        const foundOrder = orderRes.data;
        setOrder(foundOrder);

        const usuario = usersRes.data.find(u => u.id === foundOrder.userId);
        setUser(usuario);

        if (foundOrder && Array.isArray(foundOrder.productos)) {
          const productosComprados = foundOrder.productos.map(pid =>
            productsRes.data.find(p => p.id === pid)
          ).filter(Boolean);
          setProductos(productosComprados);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Orden no encontrada");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando orden...</p>;
  if (error) return <p className="order-detail-container">{error}</p>;
  if (!order) return <p className="order-detail-container">Orden no encontrada</p>;

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
              {productos && productos.length > 0 ? (
                <ul style={{listStyle: "none", paddingLeft: 0, margin: 0}}>
                  {productos.map(prod => (
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
              S/. {order.total?.toFixed(2) || "0.00"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
