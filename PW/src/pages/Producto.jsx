import { useParams } from "react-router-dom";
import useProductos from "../hooks/UseProductos";
import { useCarrito } from "../components/CarritoContext";
import { useState } from "react";
import '../producto.css';

const Producto = () => {
    const { id } = useParams();
    const productos = useProductos();
    const producto = productos.find(p => String(p.id) === id); // Comparación segura

    const { agregarAlCarrito } = useCarrito();
    const [tallaSeleccionada, setTallaSeleccionada] = useState(null);

    if (!producto) return <p>Producto no encontrado</p>;

    const imagenes = [
        producto.imagenMain,
        producto.imagen1,
        producto.imagen2,
        producto.imagen3
    ].filter(Boolean);

    const tallas = typeof producto.talla === 'string'
        ? producto.talla.split(',').map(t => t.trim()).filter(Boolean)
        : Array.isArray(producto.talla) ? producto.talla : [];

    const handleAgregar = () => {
        if (!tallaSeleccionada) return;
        agregarAlCarrito(producto, tallaSeleccionada);
    };

    return (
        <div className="producto_detalle_hm">
            <div className="galeria_columnas">
                {imagenes.map((img, index) => (
                    <img key={index} src={img} alt={`Imagen ${index + 1} del producto ${producto.nombre}`} />
                ))}
            </div>

            <div className="info_producto_hm">
                <div className="container">
                    <p className="nombre">{producto.nombre}</p>
                    <p className="precio">S/ {producto.precio}</p>

                    <div className="franja_envio">
                        ▪ COMPRA ANTES DE LAS 12 HRS Y RECIBE EL PRÓXIMO DÍA HÁBIL 
                    </div>

                    <div className="color_opcion">
                        <p id="p">COLOR: {producto.color}</p>
                        <img src={producto.imagenMain} alt="Vista del color" className="mini_imagen" />
                    </div>

                    <div className="bloque_tallas">
                        <p className="titulo_seccion">TALLA MUJER</p>
                        <div className="tallas">
                            {tallas.length > 0 ? (
                                tallas.map((talla, idx) => (
                                    <button
                                        key={idx}
                                        className={tallaSeleccionada === talla ? "talla-activa" : ""}
                                        onClick={() => setTallaSeleccionada(talla)}
                                        type="button"
                                    >
                                        {talla}
                                    </button>
                                ))
                            ) : (
                                <p>No hay tallas disponibles</p>
                            )}
                        </div>
                        <p className="guia_tallas">GUÍA DE TALLAS</p>
                    </div>

                    <button className="btn_añadir" onClick={handleAgregar} disabled={!tallaSeleccionada}>AÑADIR</button>

                    <div className="franja_envio">
                        ▪ COMPRA ANTES DE LAS 12 HRS Y RECIBE EL PRÓXIMO DÍA HÁBIL
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Producto;