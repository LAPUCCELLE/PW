import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './AgregarProducto.css';

const API_URL = 'http://localhost:3000/api/productos';

function AgregarProducto() {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    color: '',
    talla: '',
    tipo: '',
    stock: '',
    imagenMain: '',
    imagen1: '',
    imagen2: '',
    imagen3: '',
    descripcion: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [enviando, setEnviando] = useState(false);
  const editando = Boolean(id);

  useEffect(() => {
    if (!editando) return; // evita llamada innecesaria
    axios.get(API_URL)
    .then(res => {
      const p = res.data.find(prod => prod.id.toString() === id);
      if (p) {
        setProducto({
          ...p,
          talla: Array.isArray(p.talla) ? p.talla.join(', ') : p.talla
        });
      }
    })
    .catch(err => {
      console.error("Error al obtener producto:", err);
    });
  }, [id, editando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);

    const productoFinal = {
      ...producto,
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock, 10),
      talla: producto.talla.split(',').map(t => t.trim())
    };

    try {
      if (editando) {
        await axios.put(`${API_URL}/${id}`, productoFinal);
        alert("Producto actualizado correctamente");
      } else {
        await axios.post(API_URL, productoFinal);
        alert("Producto agregado correctamente");
      }

      navigate('/admin/lista');
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar el producto");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{editando ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit}>
        {[
          "nombre", "precio", "categoria", "color", "talla", "tipo", "stock", "imagenMain", "imagen1", "imagen2", "imagen3", "descripcion"
        ].map((key) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type="text"
              name={key}
              value={producto[key] || ''}
              onChange={handleChange}
              required={key !== 'imagen1' && key !== 'imagen2' && key !== 'imagen3'} 
            />
          </div>
        ))}
        <button type="submit" disabled={enviando}>{editando ? 'Guardar Cambios' : 'Agregar'}</button>
      </form>
    </div>
  );
}

export default AgregarProducto;
