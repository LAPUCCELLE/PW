import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import './AgregarProducto.css';

const API_URL = "http://localhost:3000/api/productos";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}`)
      .then(res => {
        const p = res.data.find(p => p.id.toString() === id);
        if (p) {
          setProducto({
            ...p,
            talla: Array.isArray(p.talla) ? p.talla.join(', ') : p.talla
          });
        }
      })
      .catch(err => {
        console.error("Error al cargar producto:", err);
        alert("No se pudo cargar el producto.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando || !producto) return;
    setEnviando(true);

    const productoFinal = {
      ...producto,
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock, 10),
      talla: producto.talla.split(',').map(t => t.trim())
    };

    try {
      await axios.put(`${API_URL}/${id}`, productoFinal);
      alert("Producto actualizado correctamente");
      navigate('/admin/lista');
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert("Error al actualizar el producto");
    } finally {
      setEnviando(false);
    }
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="form-container">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        {[
          "nombre", "precio", "categoria", "color", "talla", "tipo", "stock", "imagenMain", "imagen1", "imagen2" , "imagen3", "descripcion"
        ].map((key) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type="text"
              name={key}
              value={producto[key] || ""}
              onChange={handleChange}
              required={key !== 'imagen1' && key !== 'imagen2' && key !== 'imagen3'}
            />
          </div>
        ))}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
