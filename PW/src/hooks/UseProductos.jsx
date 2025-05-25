import { useEffect, useState } from "react";
import productosMujer from "../data/productosMujer";

const productosBase = [...productosMujer];

const UseProductos = (categoria) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (categoria) {
            localStorage.setItem("categoriaSeleccionada", categoria);
        }

        let data = [...productosBase];

        const datos = localStorage.getItem("productos");

        if (datos) {
            try {
                const dataParseada = JSON.parse(datos);

                // Solo agregar productos que tengan al menos id, nombre e imagenMain
                const productosValidos = dataParseada.filter(p =>
                    p.id && p.nombre && p.imagenMain
                );

                // Mezclamos: productos base + nuevos agregados que no estén repetidos
                const idsBase = new Set(productosBase.map(p => p.id));
                const nuevos = productosValidos.filter(p => !idsBase.has(p.id));

                data = [...productosBase, ...nuevos];
            } catch (e) {
                console.error("Error al parsear productos de localStorage", e);
            }
        }

        const filtrados = categoria
            ? data.filter(p => p.categoria === categoria)
            : data;

        setProductos(filtrados);
    }, [categoria]);

    return productos;
};

export default UseProductos;
