import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  // Inicializa el carrito desde localStorage si existe
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  // Sincroniza el carrito con localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto, talla) {
    if (!producto?.id) return;

    const cantidadAgregar = Number(producto.cantidad) > 0 ? Number(producto.cantidad) : 1;

    setCarrito(prev => {
      const index = prev.findIndex(
        item => item.id === producto.id && item.tallaSeleccionada === talla
      );

      if (index !== -1) {
        // Producto ya existe: actualiza solo la cantidad, sin duplicar lógica
        return prev.map((item, i) =>
          i === index
            ? { ...item, cantidad: item.cantidad + cantidadAgregar }
            : item
        );
      }

      // Producto nuevo: agregarlo con la cantidad especificada
      return [
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
    setCarrito(prev =>
      prev.filter(item => !(item.id === id && item.tallaSeleccionada === talla))
    );
  }

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}
