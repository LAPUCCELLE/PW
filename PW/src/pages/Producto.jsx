import { useParams} from "react-router-dom";
import useProductos from "../hooks/useProductos";
import '../producto.css'




const Producto = () => {
    const { id } = useParams()
    const productos = useProductos()
    const producto = productos.find(p => p.id == id)

    if (!producto) return <p>Producto no encontrado</p>

    const imagenes = [
        producto.imagenMain,
        producto.imagen1,
        producto.imagen2,
        producto.imagen3
    ].filter(Boolean);

    return (
        <div className="producto_detalle_hm">
            <div className="galeria_columnas">
            {imagenes.map((img, index) => (
            <img key={index} src={img} alt={`Vista ${index + 1}`} className={`imagen${index + 1}`}/>
            ))}
        </div>

        <div className="info_producto_hm">
            <h1>{producto.nombre}</h1>
            <p className="precio">S/ {producto.precio}</p>
            <p className="descripcion">{producto.descripcion}</p>
            <button className="btn_add">AÑADIR</button>
        </div>
</div>
    )
}

export default Producto;