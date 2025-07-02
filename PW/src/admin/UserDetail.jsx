import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./users/UserAdmin.css";

export default function UserDetail() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/usuarios/${id}`)
      .then(res => setUsuario(res.data))
      .catch(error => console.error("Error al obtener usuario:", error));

    axios
      .get(`http://localhost:3000/api/orders`)
      .then(res => {
        const userOrders = res.data.filter(o => String(o.userId) === id);
        setOrdenes(userOrders);
      })
      .catch(error => console.error("Error al obtener órdenes:", error));
  }, [id]);

  if (!usuario) {
    return <p className="user-detail-container">Usuario no encontrado</p>;
  }

  const avatarURL = `https://randomuser.me/api/portraits/${
    usuario.genero === "mujer" ? "women" : "men"
  }/${parseInt(usuario.id) % 100}.jpg`;

  return (
    <div className="user-detail-main-container">
      <h2 className="user-detail-section-title">Detalles de usuario</h2>

      <div className="user-detail-card">
        <div className="user-detail-data">
          <h1 className="user-detail-name">{usuario.nombre}</h1>
          <p>
            <b>Correo:</b>{" "}
            <a href={`mailto:${usuario.correo}`}>{usuario.correo}</a>
          </p>
          <p><b>Rol:</b> {usuario.rol}</p>
          <p><b>Fecha de registro:</b> {new Date(usuario.fechaRegistro).toLocaleDateString()}</p>
        </div>

        <div className="user-detail-avatar-container">
          <img className="user-detail-avatar" src={avatarURL} alt={usuario.nombre} />
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
          {ordenes.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", color: "#888" }}>
                No hay órdenes recientes
              </td>
            </tr>
          ) : (
            ordenes.map(order => (
              <tr key={order.id}>
                <td>
                  <Link to={`/admin/orders/${order.id}`} className="user-order-id">
                    #{order.id}
                  </Link>
                </td>
                <td>{order.fecha}</td>
                <td>S/.{order.monto?.toFixed(2)}</td>
                <td>
                  <Link to={`/admin/orders/${order.id}`} className="user-order-btn">
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
