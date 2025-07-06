import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import departamentos from "../data/ubigeo_peru_2016_departamentos.json";
import provincias from "../data/ubigeo_peru_2016_provincias.json";
import distritos from "../data/ubigeo_peru_2016_distritos.json";
import { useCarrito } from "../components/CarritoContext";
import axios from "axios";  
import "../checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { carrito } = useCarrito();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario) {
      navigate("/login");
    }
  }, [navigate]);

  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [provinciasFiltradas, setProvinciasFiltradas] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [distritosFiltrados, setDistritosFiltrados] = useState([]);
  const [distritoSeleccionado, setDistritoSeleccionado] = useState("");

  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("qr");
  const [tarjeta, setTarjeta] = useState({ numero: "", nombre: "", vencimiento: "", cvv: "" });
  const [metodoEnvio, setMetodoEnvio] = useState("normal");
  const [error, setError] = useState("");

  const cartItems = carrito.map(item => ({
    id: item.id,
    name: item.nombre,
    precio: item.precio,
    cantidad: item.cantidad,
    talla: item.tallaSeleccionada,
    imagen: item.imagen
  }));

  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const envio = metodoEnvio === "express" ? 15 : 5;
  const total = subtotal + envio;



  useEffect(() => {
    if (departamentoSeleccionado) {
      const nuevasProvincias = provincias.filter(
        (prov) => prov.department_id === departamentoSeleccionado
      );
      setProvinciasFiltradas(nuevasProvincias);
      setProvinciaSeleccionada("");
      setDistritosFiltrados([]);
      setDistritoSeleccionado("");
    } else {
      setProvinciasFiltradas([]);
      setProvinciaSeleccionada("");
      setDistritosFiltrados([]);
      setDistritoSeleccionado("");
    }
  }, [departamentoSeleccionado]);

  useEffect(() => {
    if (provinciaSeleccionada) {
      const nuevosDistritos = distritos.filter(
        (dist) => dist.province_id === provinciaSeleccionada
      );
      setDistritosFiltrados(nuevosDistritos);
      setDistritoSeleccionado("");
    } else {
      setDistritosFiltrados([]);
      setDistritoSeleccionado("");
    }
  }, [provinciaSeleccionada]);

  const handleFinalizarCompra = async () => {
  const direccionEnvio = {
    departamento: departamentos.find(dep => dep.id === departamentoSeleccionado)?.name || "",
    provincia: provincias.find(prov => prov.id === provinciaSeleccionada)?.name || "",
    distrito: distritos.find(dist => dist.id === distritoSeleccionado)?.name || "",
    direccion,
    metodoEnvio,
  };

  // Guardar en localStorage
  localStorage.setItem("productosPedido", JSON.stringify(carrito));
  localStorage.setItem("totalPedido", total);
  localStorage.setItem("metodoEnvio", metodoEnvio);
  localStorage.setItem("direccionEnvio", JSON.stringify(direccionEnvio));

  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (usuario) {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const nuevoPedido = {
      usuarioId: usuario.id,
      fecha: new Date().toISOString(),
      productos: cartItems,
      total: total,
      direccion: direccionEnvio,
      metodoPago,
    };

    try {

      console.log("Datos enviados al backend:", {
        userId: usuario.id,
        productos: cartItems,
        total,
        direccion: direccionEnvio,
        metodoPago,
        metodoEnvio
      });
      // Hacer la solicitud POST para crear la orden en el backend
      const response = await axios.post('http://localhost:3000/api/orders', {
        userId: usuario.id,
        total: total,
        direccion: direccionEnvio,  // Enviar dirección
        metodoPago,
        metodoEnvio,
      });

      // Obtener el ID de la respuesta de la API
      const id = response.data.id;
      console.log("ID de la orden:", id); // Verifica que el backend devuelve el id de la orden

      // Redirigir al usuario a la página de detalles del pedido
      navigate(`/pedido-completo/${id}`);
    } catch (error) {
      console.error("Error al crear orden:", error.response?.data || error.message);
      setError("Hubo un problema al crear la orden");
    }

    // Añadir la orden a los pedidos locales (esto es opcional, depende de tus necesidades)
    pedidos.push(nuevoPedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }
};




  const handleCompletar = (e) => {
    e.preventDefault();
    setError("");

    if (!departamentoSeleccionado) return setError("Seleccione un departamento.");
    if (!provinciaSeleccionada) return setError("Seleccione una provincia.");
    if (!distritoSeleccionado) return setError("Seleccione un distrito.");
    if (!direccion.trim()) return setError("Ingrese la dirección de envío.");

    if (metodoPago === "tarjeta") {
      const { numero, nombre, vencimiento, cvv } = tarjeta;
      if (!numero.match(/^\d{16}$/)) return setError("Número de tarjeta inválido. Debe tener 16 dígitos.");
      if (!nombre.trim()) return setError("Ingrese el nombre en la tarjeta.");
      if (!vencimiento.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) return setError("Formato de vencimiento inválido. Use MM/AA.");
      if (!cvv.match(/^\d{3}$/)) return setError("CVV inválido. Debe tener 3 dígitos.");
    }

    handleFinalizarCompra();
  };

  return (
    <main>
      <form onSubmit={handleCompletar} className="checkout-form">
        <h2>Checkout</h2>
        {error && <p className="error">{error}</p>}

        <div>
          <label>Departamento:</label>
          <select value={departamentoSeleccionado} onChange={e => setDepartamentoSeleccionado(e.target.value)} required>
            <option value="">Seleccione</option>
            {departamentos.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Provincia:</label>
          <select value={provinciaSeleccionada} onChange={e => setProvinciaSeleccionada(e.target.value)} disabled={!departamentoSeleccionado} required>
            <option value="">Seleccione</option>
            {provinciasFiltradas.map(prov => (
              <option key={prov.id} value={prov.id}>{prov.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Distrito:</label>
          <select value={distritoSeleccionado} onChange={e => setDistritoSeleccionado(e.target.value)} disabled={!provinciaSeleccionada} required>
            <option value="">Seleccione</option>
            {distritosFiltrados.map(dist => (
              <option key={dist.id} value={dist.id}>{dist.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Dirección de envío:</label>
          <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} required />
        </div>

        <div>
          <label>Método de pago:</label>
          <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
            <option value="qr">Código QR</option>
            <option value="tarjeta">Tarjeta de crédito</option>
          </select>
        </div>

        {metodoPago === "qr" && (
          <div style={{ textAlign: "center" }}>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Pago" alt="QR" />
          </div>
        )}

        {metodoPago === "tarjeta" && (
          <>
            <input type="text" inputMode="numeric" pattern="\d{16}" placeholder="Número de tarjeta (16 dígitos)" value={tarjeta.numero} onChange={e => setTarjeta({ ...tarjeta, numero: e.target.value })} maxLength={16} required />
            <input type="text" placeholder="Nombre en la tarjeta" value={tarjeta.nombre} onChange={e => setTarjeta({ ...tarjeta, nombre: e.target.value })} required />
            <input type="text" pattern="^(0[1-9]|1[0-2])\/\d{2}$" placeholder="Vencimiento (MM/AA)" value={tarjeta.vencimiento} onChange={e => setTarjeta({ ...tarjeta, vencimiento: e.target.value })} maxLength={5} required />
            <input type="text" inputMode="numeric" pattern="\d{3}" placeholder="CVV" value={tarjeta.cvv} onChange={e => setTarjeta({ ...tarjeta, cvv: e.target.value })} maxLength={3} required />
          </>
        )}

        <div>
          <label>Método de envío:</label>
          <select value={metodoEnvio} onChange={e => setMetodoEnvio(e.target.value)}>
            <option value="normal">Normal (S/. 5)</option>
            <option value="express">Express (S/. 15)</option>
          </select>
        </div>

        <h3>Resumen de artículos</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.id + '-' + (item.talla || '')}>
              {item.name} {item.talla ? `(${item.talla})` : ""} x {item.cantidad} - S/. {(item.precio * item.cantidad).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Subtotal: S/. {subtotal.toFixed(2)}</p>
        <p>Envío: S/. {envio.toFixed(2)}</p>
        <p><strong>Total: S/. {total.toFixed(2)}</strong></p>

        <button type="submit">COMPLETAR ORDEN</button>
      </form>
    </main>
  );
};

export default Checkout;
