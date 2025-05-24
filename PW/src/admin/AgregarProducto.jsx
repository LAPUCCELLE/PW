import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import './AgregarProducto.css';

function AgregarProducto() {
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    categoria: '',
    imagenMain: '',
    imagen1: '',
    imagen2: '',
    imagen3: '',
    color: '',
    talla: '',
    descripcion: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    const nuevosProductos = [...productosGuardados, producto];
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    navigate('/admin'); 
  };

  return (
    <div className="form-container">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(producto).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type="text"
              name={key}
              value={producto[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Agregar</button>
      </form>
      <Outlet />
    </div>
  );
};

export default AgregarProducto;
