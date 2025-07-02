import { useEffect, useState } from "react";
//import productosMujer from "../data/productosMujer";
import axios from "axios";

//const productosBase = [...productosMujer];

const UseProductos = (categoria) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (categoria) {
            localStorage.setItem("categoriaSeleccionada", categoria);
        }
        //Llamando a la API
        axios.get("http://localhost:3000/api/productos").then((res) => {
            let data = res.data;

            if (categoria) {
                data = data.filter(p => p.categoria === categoria);
            }

            setProductos(data);  
        })
        .catch((error) => {
            console.error("Error al obtener productos desde la API:", error);
        });
        //let data = [...productosBase];

        //const datos = localStorage.getItem("productos");

        /*if (datos) {
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

        setProductos(filtrados);*/
    }, [categoria]);

    return productos;
};

export default UseProductos;
