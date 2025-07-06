import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  async function guardarCarritoEnBD(carritoActualizado) {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario || carritoActualizado.length === 0) return;

    try {
      await axios.put(`http://localhost:3000/api/carrito/${usuario.id}`, {
        productos: carritoActualizado
      });
      console.log("Carrito guardado en BD:", carritoActualizado);
    } catch (error) {
      console.error("Error al guardar el carrito en la BD:", error);
    }
  }

  function agregarAlCarrito(producto, talla) {
    if (!producto?.id) return;

    const cantidadAgregar = Number(producto.cantidad) > 0 ? Number(producto.cantidad) : 1;

    setCarrito(prev => {
      const index = prev.findIndex(
        item => item.id === producto.id && item.tallaSeleccionada === talla
      );

      const actualizado = index !== -1
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

      guardarCarritoEnBD(actualizado); 

      return actualizado;
    });
  }

  function eliminarDelCarrito(id, talla) {
    const actualizado = carrito.filter(item => !(item.id === id && item.tallaSeleccionada === talla));
    setCarrito(actualizado);
    guardarCarritoEnBD(actualizado); 
  }

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}
