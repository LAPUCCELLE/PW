import { useEffect, useState } from "react";
import productosBase from "../data/productos";

export function useProductos() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const datos = localStorage.getItem("productos")
        if (datos) {
            setProductos(JSON.parse(datos))
        } else {
            localStorage.setItem("productos", JSON.stringify(productosBase))
            setProductos(productosBase)
        }
    }, [])
    
    return productos
};