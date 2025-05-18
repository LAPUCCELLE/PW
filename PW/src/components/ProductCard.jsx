import { Link } from "react-router-dom"

export default function ProductCard({ producto }) {

    return (
        <li>
            <Link to={`/producto/${producto.id}`}>
            <img src={producto.imagen} alt={producto.nombre} />
            <p>{producto.nombre}</p>
            <span>S/ {producto.precio}</span>
            </Link>
        </li>
    );
}
