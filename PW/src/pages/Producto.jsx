import { useParams } from "react-router-dom";
import useProductos from "../hooks/useProductos";
import '../producto.css';

const Producto = () => {
    const { id } = useParams();
    const productos = useProductos();
    const producto = productos.find(p => p.id === id);

    if (!producto) return <p>Producto no encontrado</p>;

    const imagenes = [
        producto.imagenMain,
        producto.imagen1,
        producto.imagen2,
        producto.imagen3
    ].filter(Boolean);

    // 🔧 Arreglamos las tallas aquí:
    const tallas = typeof producto.talla === 'string'
        ? producto.talla.split(',').map(t => t.trim()).filter(Boolean)
        : Array.isArray(producto.talla) ? producto.talla : [];

    return (
        <div className="producto_detalle_hm">
            <div className="galeria_columnas">
                {imagenes.map((img, index) => (
                    <img key={index} src={img} alt={`Vista ${index + 1}`} />
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
                        <img src={producto.imagenMain} alt="color" className="mini_imagen" />
                    </div>
                    
                    <div className="bloque_tallas">
                        <p className="titulo_seccion">TALLA MUJER</p>
                        <div className="tallas">
                            {tallas.length > 0 ? (
                                tallas.map((talla, idx) => (
                                    <button key={idx}>{talla}</button>
                                ))
                            ) : (
                                <p>No hay tallas disponibles</p>
                            )}
                        </div>
                        <p className="guia_tallas">GUÍA DE TALLAS</p>
                    </div>

                    <button className="btn_añadir">AÑADIR</button>
                    <div className="franja_envio">
                        ▪ COMPRA ANTES DE LAS 12 HRS Y RECIBE EL PRÓXIMO DÍA HÁBIL
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Producto;
