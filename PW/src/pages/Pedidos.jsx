
import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pedidos.css";
const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [cargar, setCargar] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener el usuario logueado desde localStorage
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
        if (!usuario) {
            setError("Debes iniciar sesión para ver tus pedidos.");
            setCargar(false);
            navigate("/login");
            return;
        }

        const obtenerPedidos = async () => {
            try {
                const response = await axios.get(`/api/usuarios/${usuario.id}/orders`);
                console.log("Respuesta de la API:", response.data);
                if (Array.isArray(response.data)) {
                    setPedidos(response.data);
                } else {
                    throw new Error("La respuesta de la API no es un arreglo.");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setCargar(false);
            }
        };

        obtenerPedidos();
    }, []);

    if (cargar) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

   // const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    //const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    // Filtra solo los pedidos del usuario actual
    //const misPedidos = pedidos.filter(p => p.usuarioId === usuario?.id);
    //if (!usuario) return <div>Debes iniciar sesión para ver tus pedidos.</div>;
    return (
        <div className="pedidos-container">
        <h2>Mis pedidos</h2>
        {pedidos.length === 0 ? (
            <p className="no-pedidos">No tienes pedidos anteriores.</p>
        ) : (
            <div className="pedidos-list">
            {pedidos.map((pedido, idx) => (
                <div className="pedido-card" key={idx}>
                <div className="pedido-header">
                    <span className="pedido-fecha">
                    <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}
                    </span>
                    <span className="pedido-total">
                    <strong>Total:</strong> S/ {pedido.monto.toFixed(2)}
                    </span>
                </div>
                <div className="pedido-productos-resumen">
                    <h4>Resumen de la compra</h4>
                    <ul>
                    {pedido.items.map((prod, i) => (
                        <li className="pedido-producto-item" key={i}>
                        {prod.producto.imagen && (
                            <img
                            src={prod.producto.imagen}
                            alt={prod.producto.nombre}
                            className="pedido-producto-img"
                            />
                        )}
                        <div>
                            <div className="pedido-producto-nombre">
                            <strong>{prod.producto.nombre}</strong>
                            </div>
                            <div>
                            Cantidad: {prod.cantidad || 1}
                            </div>
                            {prod.talla && (
                            <div>
                                Talla: {prod.talla}
                            </div>
                            )}
                        </div>
                        <div className="pedido-producto-precio">
                            S/ {(prod.precio * (prod.cantidad || 1)).toFixed(2)}
                        </div>
                        </li>
                    ))}
                    </ul>
                </div>
                {pedido.direccion && (
                    <div className="pedido-direccion">
                    <strong>Dirección de envío:</strong>
                    <div>
                        {pedido.direccion.departamento} - {pedido.direccion.provincia} - {pedido.direccion.distrito}
                    </div>
                    <div>{pedido.direccion.direccion}</div>
                    </div>
                )}
                </div>
            ))}
            </div>
        )}
        </div>
    );
};
export default Pedidos;