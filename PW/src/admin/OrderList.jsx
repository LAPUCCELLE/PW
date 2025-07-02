import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import orders from "../data/orders";
//import usuarios from "../data/usuarios";
import "./orders/OrderAdmin.css";

export default function OrderList() {
  const [searchId, setSearchId] = useState("");
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/orders").then(res => setOrdenes(res.data)).catch(error => console.error("Error al obtener órdenes:", error));
  },[]);

  // Filtrar por ID
  const ordenesFiltradas = ordenes.filter(order => String(order.Id).includes(searchId.trim()));

  /* Relaciona cada orden con el nombre del usuario
  const ordersWithUser = orders.map(order => {
    const user = usuarios.find(u => u.id === order.userId);
    return {
      ...order,
      userName: user ? user.nombre : "Usuario no encontrado"
    };
  });

  // Filtra por el texto en la barra de búsqueda
  const ordersFiltradas = ordersWithUser.filter(order =>
    order.id.includes(searchId.trim())
  );*/

  return (
    <div>
      <h2>Lista de Órdenes</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar por ID de orden..."
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          style={{
            padding: "0.45rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #bbb",
            marginRight: "0.5rem",
            width: "220px"
          }}
        />
      </div>
      <table className="order-admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {ordersFiltradas.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", color: "#888" }}>
                No se encontraron órdenes con ese ID
              </td>
            </tr>
          ) : (
            ordersFiltradas.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.usuario?.nombre || "Desconocido"}</td>
                <td>{order.fecha}</td>
                <td>S/. {order.monto?.toFixed(2)}</td>
                <td>
                  {order.estado === "entregada"
                    ? <span className="estado-entregada">Entregada</span>
                    : <span className="estado-pendiente">Por entregar</span>
                  }
                </td>
                <td>
                  <Link to={`/admin/orders/${order.id}`}>Ver detalle</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
