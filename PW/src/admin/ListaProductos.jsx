import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './ListaProductos.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  // Cargar productos desde el backend
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/productos");
        setProductos(res.data);
        setProductosFiltrados(res.data);
      } catch (error) {
        console.error("Error al cargar productos: ", error);
      }
    };
    cargarProductos();
  },[]);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/api/productos/${id}`);
      const nuevosProductos = productos.filter((producto) => producto.id != id);
      setProductos(nuevosProductos);
      setProductosFiltrados(nuevosProductos);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  const handleBusqueda = (e) => {
    const valor = e.target.value.toLowerCase();
    setBusqueda(valor);

    const filtrados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(valor) || p.id.toString().includes(valor)
    );
    setProductosFiltrados(filtrados);
  };

  return (
    <div className="lista-productos">
      <h2>Lista de Productos</h2>
      <div className="barra-busqueda">
        <input
          type="text"
          placeholder="Buscar por nombre o ID"
          value={busqueda}
          onChange={handleBusqueda}
        />
        <Link to="/admin/agregar" className="btn-agregar">Agregar Producto</Link>
      </div>

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
          {productosFiltrados.map((producto) => (
            <tr key={producto.id}>
              <td>
                <Link to={`/admin/detalle/${producto.id}`}>
                  <img src={producto.imagenMain} alt={producto.nombre} width="50" />
                </Link>
              </td>
              <td>{producto.nombre}</td>
              <td>S/ {producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>
                <Link to={`/admin/editar/${producto.id}`} className="edit-btn">✏️</Link>
                <button onClick={() => handleEliminar(producto.id)} className="edit-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>  
    </div>
  );
};

export default ListaProductos;
