import { useEffect, useState } from "react";
import productosBase from "../data/productos";

export function useProductos() {
    const [productos, setProductos] = useState([])
    useEffect(() => {
        const datos = localStorage.getItem("productos")
        if (datos) {
            const dataParseada = JSON.parse(datos);
            const ids = new Set(dataParseada.map(p => p.id));
            if (ids.size === productosBase.length) {
                setProductos(dataParseada);
            } else {
                localStorage.setItem("productos", JSON.stringify(productosBase));
                setProductos(productosBase);
            } 
        } else {
            localStorage.setItem("productos", JSON.stringify(productosBase))
            setProductos(productosBase)
        }
    }, [])
    
    return productos
};