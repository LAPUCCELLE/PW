import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AgregarProducto.css';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const encontrado = productos.find(p => p.id === id);
    if (encontrado) {
      setProducto(encontrado);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const actualizados = productos.map(p => (p.id === id ? producto : p));
    localStorage.setItem('productos', JSON.stringify(actualizados));
    navigate('/admin/lista');
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="form-container">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(producto).map((key) => (
          <div className="form-group" key={key}>
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={producto[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
