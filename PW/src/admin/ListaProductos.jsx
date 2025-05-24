import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import './ListaProductos.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const storedProductos = localStorage.getItem('productos');
    if (storedProductos) {
      setProductos(JSON.parse(storedProductos));
    }
  }, []);

  const handleEliminar = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
  };

  const handleEditar = (id) => {
    // Puedes redirigir a una ruta tipo `/admin/editar/${id}`
    // o simplemente mostrar un alert por ahora:
    alert(`Función de editar pendiente para el producto con ID: ${id}`);
  };

  return (
    <div className="lista-productos">
      <h2>Lista de Productos</h2>
      <Link to="/admin/agregar" className="btn-agregar">Agregar Producto</Link>
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td><img src={producto.imagenMain} alt={producto.nombre} width="50" /></td>
              <td>{producto.nombre}</td>
              <td>S/ {producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>
                <button onClick={() => handleEditar(producto.id)}>✏️</button>
                <button onClick={() => handleEliminar(producto.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
};

export default ListaProductos;
