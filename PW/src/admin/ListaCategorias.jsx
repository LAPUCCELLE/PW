import React, { useState, useEffect } from "react";
import productos from "../data/productosMujer";
import './ListaCategorias.css'

const ListaCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState("");

useEffect(() => {
    const tiposProductos = [...new Set(productos.map(p => p.tipo))];

    const almacenadas = JSON.parse(localStorage.getItem("categorias")) || [];
    const unificadas = [...new Set([...tiposProductos, ...almacenadas])];

    setCategorias(unificadas);
    localStorage.setItem("categorias", JSON.stringify(unificadas));
    }, []);

const agregarCategoria = () => {
    const nombre = nuevaCategoria.trim().toLowerCase();
    if (!nombre || categorias.includes(nombre)) return;

    const nuevas = [...categorias, nombre];
    setCategorias(nuevas);
    localStorage.setItem("categorias", JSON.stringify(nuevas));
    setNuevaCategoria("");
};

return (
        <div className="lista_Categorias">
        <h2>Lista de categorías</h2>

        <div style={{ marginBottom: "1rem" }}>
            <input
            type="text"
            placeholder="Nueva categoría"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            />
            <button onClick={agregarCategoria}>➕ Agregar</button>
        </div>

        <table>
            <thead>
            <tr>
                <th>Categoría</th>
            </tr>
            </thead>
            <tbody>
            {categorias.map((cat, i) => (
                <tr key={i}>
                <td>{cat}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default ListaCategorias;
