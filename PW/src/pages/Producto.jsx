import { useParams} from "react-router-dom";
import { useProductos } from "../hooks/useProductos";

export default function Producto() {
    const { id } = useParams()
    const productos = useProductos()
    const producto = productos.find(p => p.id == id)

    if (!producto) return <p>Producto no encontrado</p>

    return (
        <div className="producto_detalle">
            <img src={producto.imagen} alt={producto.nombre} />
            <div>
                <h1>{producto.nombre}</h1>
                <p>S/ {producto.precio}</p>
                <p>{producto.descripción}</p>
                <button>AÑADIR</button>
            </div>
        </div>
    )
}