import React from "react";
import "../pedidos.css";
const Pedidos = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    // Filtra solo los pedidos del usuario actual
    const misPedidos = pedidos.filter(p => p.usuarioId === usuario?.id);
    if (!usuario) return <div>Debes iniciar sesión para ver tus pedidos.</div>;
    return (
        <div className="pedidos-container">
        <h2>Mis pedidos</h2>
        {misPedidos.length === 0 ? (
            <p className="no-pedidos">No tienes pedidos anteriores.</p>
        ) : (
            <div className="pedidos-list">
            {misPedidos.map((pedido, idx) => (
                <div className="pedido-card" key={idx}>
                <div className="pedido-header">
                    <span className="pedido-fecha">
                    <strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}
                    </span>
                    <span className="pedido-total">
                    <strong>Total:</strong> S/ {pedido.total.toFixed(2)}
                    </span>
                </div>
                <div className="pedido-productos-resumen">
                    <h4>Resumen de la compra</h4>
                    <ul>
                    {pedido.productos.map((prod, i) => (
                        <li className="pedido-producto-item" key={i}>
                        {prod.imagen && (
                            <img
                            src={prod.imagen}
                            alt={prod.name || prod.nombre}
                            className="pedido-producto-img"
                            />
                        )}
                        <div>
                            <div className="pedido-producto-nombre">
                            <strong>{prod.name || prod.nombre}</strong>
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