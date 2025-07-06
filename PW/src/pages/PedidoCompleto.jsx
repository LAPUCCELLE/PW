import React, { useState, useEffect } from "react";
//import { useCarrito } from "../components/CarritoContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../pedidoCompleto.css";

// Suma días hábiles (sin contar sábados ni domingos)
function sumarDiasHabiles(fecha, dias) {
  let contador = 0;
  let resultado = new Date(fecha);
  while (contador < dias) {
    resultado.setDate(resultado.getDate() + 1);
    if (resultado.getDay() !== 0 && resultado.getDay() !== 6) {
      contador++;
    }
  }
  return resultado;
}

const PedidoCompleto = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState(null);
  //const { setCarrito } = useCarrito();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/orders/${id}`);
        console.log("Respuesta de la API:",response.data);
        setPedido(response.data);
      } catch (error) {
        setError("Hubo un problema al obtener los detalles del pedido");
      }
    };

    obtenerPedido();
    /*setCarrito([]);
    localStorage.removeItem("carrito");*/
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!pedido) return <div>Cargando...</div>;
  if (!pedido.items) return <div>No hay productos en el pedido.</div>

  console.log("Items del pedido:", pedido.items);

  const { items, monto, estado, envio, shipping } = pedido;
  const envioCosto = shipping?.metodoEnvio === "express" ? 15 : 5;
  const subtotal = items.reduce((acc, item) => acc + item.precioUnit * item.cantidad, 0);
  const total = subtotal + envioCosto;

  let fechaEntrega;
  if (!fechaEntrega) {
    const fecha = sumarDiasHabiles(new Date(),10);
    fechaEntrega = fecha.toLocaleDateString();
  }

  /*const direccionEnvio = JSON.parse(localStorage.getItem("direccionEnvio")) || {};
  const productos = JSON.parse(localStorage.getItem("productosPedido")) || [];
  const metodoEnvio = localStorage.getItem("metodoEnvio") || "normal";
  const total = Number(localStorage.getItem("totalPedido")) || 0;

  let fechaEntrega = direccionEnvio.fechaEntrega;
  if (!fechaEntrega) {
    const fecha = sumarDiasHabiles(new Date(), 10);
    fechaEntrega = fecha.toLocaleDateString();
  }

  const envio = metodoEnvio === "express" ? 15 : 5;*/

  return (
    <div className="pedido-completo-main">
      <div className="pedido-completo-header">
        <h2>Orden completada <span className="check-icon">✔️</span></h2>
        <p className="pedido-completo-msg">¡Gracias por tu compra!</p>
      </div>
      <div className="pedido-completo-content">
        <div className="pedido-completo-card">
          <h3>Resumen de la compra</h3>
          {items.length === 0 && <p>No hay productos en el pedido.</p>}
          {items.map((prod, idx) => (
            <div className="pedido-completo-producto" key={idx}>
              <img
                src={
                  prod.producto.imagenMain || "https://via.placeholder.com/50"
                }
                alt={prod.producto.nombre || "Producto"}
                style={{ width: 50, height: 50, objectFit: "cover", marginRight: 10 }}
              />
              <div>
                <p className="producto-nombre" style={{ fontWeight: "bold" }}>
                  {prod.producto.nombre || "Sin nombre"}
                </p>
                <p className="producto-detalle">Cantidad: {prod.cantidad || 1}</p>
                {prod.talla && <p className="producto-detalle">Talla: {prod.talla}</p>}
              </div>
              <div className="producto-precio">
                S/ {(prod.precioUnit * (prod.cantidad || 1)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="pedido-completo-card resumen">
          <div className="resumen-row">
            <span>PRODUCTOS ({items.length})</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>
          <div className="resumen-row green">
            <span>ENTREGA ({shipping?.metodoEnvio === "express" ? "Express" : "Normal"})</span>
            <span>S/ {envioCosto.toFixed(2)}</span>
          </div>
          <div className="resumen-row red">
            <span>DESCUENTOS</span>
            <span>-S/ 0.00</span>
          </div>
          <hr />
          <div className="resumen-row total">
            <span>TOTAL</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          <div className="direccion-envio">
            <h4>Dirección de envío</h4>
            <p>
              {shipping?.direccion || "Dirección no disponible"}<br />
              {shipping?.departamento || ""} - {shipping?.provincia || ""} - {shipping?.distrito || ""}<br />
              
            </p>
            <p>
              Fecha de entrega: <b>{fechaEntrega}</b>
            </p>
          </div>
        </div>
      </div>
      <button className="btn-volver-rojo" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
};

export default PedidoCompleto;