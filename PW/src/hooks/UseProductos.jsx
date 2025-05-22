import { useEffect, useState } from "react";
import productosMujer from "../data/productosMujer";

const productosBase = [...productosMujer];

export function useProductos(categoria) {
    const [productos, setProductos] = useState([])
    useEffect(() => {
        if (categoria) {
            localStorage.getItem("categoriaSeleccionada", categoria);
        }
        
        const datos = localStorage.getItem("productos");
        let data = productosBase;

        if (datos) {
            const dataParseada = JSON.parse(datos);
            const ids = new Set(dataParseada.map(p => p.id));
            if (ids.size === productosBase.length) {
                data = dataParseada;
            } else {
                localStorage.setItem("productos", JSON.stringify(productosBase));
            } 
        } else {
            localStorage.setItem("productos", JSON.stringify(productosBase))
        }

        const filtrados = categoria
            ? data.filter(p => p.categoria === categoria)
            : data;

        setProductos(filtrados);
    }, [categoria]);
    
    return productos;
};