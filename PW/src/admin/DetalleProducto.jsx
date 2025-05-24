import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const encontrado = productos.find(p => p.id === id);
    setProducto(encontrado);
  }, [id]);

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Detalle del Producto</h2>
      <img src={producto.imagenMain} alt={producto.nombre} width="200" />
      <p><strong>ID:</strong> {producto.id}</p>
      <p><strong>Nombre:</strong> {producto.nombre}</p>
      <p><strong>Precio:</strong> S/ {producto.precio}</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <p><strong>Color:</strong> {producto.color}</p>
      <p><strong>Tallas:</strong> {(producto.talla || '').toString().split(/[\s,]+/).join(', ')}</p>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
    </div>
  );
};

export default DetalleProducto;
