import { createContext, useContext, useState, useEffect } from "react";

import { uniqBy } from 'lodash';
import axios from "axios";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
      const carritoUnico = uniqBy(carrito, item => `${item.id}-${item.tallaSeleccionada}`);
      localStorage.setItem("carrito", JSON.stringify(carritoUnico));
      guardarCarritoEnBD(carritoUnico);
  }, [carrito]);

  async function guardarCarritoEnBD(carritoActualizado) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario || carritoActualizado.length === 0) return;

    const agrupado = agruparProductosPorIdYtalla(carritoActualizado);

    try {
      await axios.put(`http://localhost:3000/api/carrito/${usuario.id}`, {
        productos: agrupado
      });
      console.log("Carrito guardado en BD:", agrupado);
    } catch (error) {
      console.error("Error al guardar el carrito en la BD:", error);
    }
  }

  function agruparProductosPorIdYtalla(productos) {
    const agrupados = [];
    productos.forEach(p => {
      const existente = agrupados.find(
        item => item.id === p.id && item.tallaSeleccionada === p.tallaSeleccionada
      );
      if (existente) {
        existente.cantidad += p.cantidad;
      } else {
        agrupados.push({ ...p });
      }
    });
    return agrupados;
  }


  function agregarAlCarrito(producto, talla) {
    if (!producto?.id) return;

    const cantidadAgregar = Number(producto.cantidad) > 0 ? Number(producto.cantidad) : 1;

    setCarrito(prev => {
      const index = prev.findIndex(
        item => item.id === producto.id && item.tallaSeleccionada === talla
      );

      return index !== -1
        ? prev.map((item, i) =>
            i === index
              ? { ...item, cantidad: item.cantidad + cantidadAgregar }
              : item
          )
        : [
            ...prev,
            {
              ...producto,
              tallaSeleccionada: talla,
              cantidad: cantidadAgregar,
            },
          ];
    });
  }

  function eliminarDelCarrito(id, talla) {
    const actualizado = carrito.filter(item => !(item.id === id && item.tallaSeleccionada === talla));
    setCarrito(actualizado); // 🟡 Ya no llames guardarCarritoEnBD aquí
  }

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}
