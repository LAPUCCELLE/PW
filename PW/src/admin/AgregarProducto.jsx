import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
      const productoExistente = productosGuardados.find(p => p.id === id);
      if (productoExistente) {
        setProducto(productoExistente);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

    // Eliminar si ya existía el ID (para evitar duplicados)
    const filtrados = productosGuardados.filter(p => p.id !== producto.id);
    const nuevosProductos = [...filtrados, producto];
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    navigate('/admin/lista');
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Editar Producto' : 'Agregar Producto'}</h2>
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
              readOnly={key === 'id' && id}
            />
          </div>
        ))}
        <button type="submit">{id ? 'Guardar Cambios' : 'Agregar'}</button>
      </form>
    </div>
  );
}

export default AgregarProducto;
