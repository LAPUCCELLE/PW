  import React, { useState, useEffect } from 'react';
  import {Link, useNavigate } from 'react-router-dom';
  import { useCarrito } from '../components/CarritoContext';

  import axios from "axios";
  import "../carrito.css";

  // Agrupa productos por ID y talla
  const agruparProductos = (carrito) => {
    const agrupados = [];
    carrito.forEach(prod => {
      const existente = agrupados.find(
        p => p.id === prod.id && p.tallaSeleccionada === prod.tallaSeleccionada
      );
      if (existente) {
        existente.cantidad += prod.cantidad;
      } else {
        agrupados.push({ ...prod });
      }
    });
    return agrupados;
  };

  const Carrito = () => {
    const [hasFetched, setHasFetched] = useState(false);
    const { carrito, setCarrito, eliminarDelCarrito, agregarAlCarrito } = useCarrito();
    const navigate = useNavigate();
    const [guardados, setGuardados] = useState(
      //JSON.parse(localStorage.getItem("guardadosDespues")) || []
    []);

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
      const fetchCarrito = async () => {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
        if (usuario) {
          try {
            const response = await axios.get(`http://localhost:3000/api/carrito/${usuario.id}`);
            setCarrito(response.data.map(item => ({
              id: item.productoId,
              nombre: item.producto.nombre  ,
              imagen: item.producto.imagenMain || item.producto.imagen1,
              precio: item.producto.precio,
              cantidad: item.cantidad,
              tallaSeleccionada: item.talla
            })));
            } catch (error) {
              if (error.response && error.response.status === 404) {
                console.warn("No existe carrito aún para este usuario. Se creará cuando agregue productos.");
                setCarrito([]);
              } else {
                console.error("Error al obtener el carrito:", error);
              }
          } finally {
            setHasFetched(true);
          }
        } else {
          navigate("/login");
        }
      };

      fetchCarrito();
  }, [setCarrito, navigate]);

  /*useEffect(() => {

    if (!hasFetched) return;

  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!usuario) return;

  if (carrito.length === 0) {
    console.log(" Carrito vacío, no se sincroniza con DB.");
    return;
  }

  const saveCarritoToDB = async () => {
    try {
      console.log(" Sincronizando carrito con DB:", carrito);
      await axios.put(`http://localhost:3000/api/carrito/${usuario.id}`, {
        productos: carrito,
      });
    } catch (error) {
      console.error(" Error al guardar el carrito:", error);
    }
  };

  saveCarritoToDB();
  }, [carrito, hasFetched]);*/
    // Calcula productos agrupados en cada render
    const productosAgrupados = agruparProductos(carrito);

    const totalProductos = productosAgrupados.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
    const totalPrecio = productosAgrupados.reduce((acc, prod) => acc + (prod.precio * (prod.cantidad || 1)), 0);

    // Cambiar cantidad
    const cambiarCantidad = (id, tallaSeleccionada, cantidadActual) => {
      const cantidadStr = window.prompt(
        `¿Con cuántas unidades deseas quedarte? (Debe ser mayor a 0)`,
        cantidadActual
      );
      const cantidad = parseInt(cantidadStr, 10);
      if (!isNaN(cantidad) && cantidad > 0) {
        setCarrito(prev =>
          prev.map(item =>
            item.id === id && item.tallaSeleccionada === tallaSeleccionada
              ? { ...item, cantidad }
              : item
          )
        );
      }
    };

    // Eliminar cantidad
    const eliminarCantidad = (id, tallaSeleccionada, cantidadActual) => {
      const cantidadStr = window.prompt(
        `¿Cuántas unidades deseas eliminar? (Máximo ${cantidadActual})`,
        "1"
      );
      const motivo = window.prompt(
        "¿Por qué deseas eliminar este producto?\n(Ejemplo: No me gusta, Error de talla, Otro motivo)"
      );
      const cantidad = parseInt(cantidadStr, 10);

      if (
        motivo &&
        motivo.trim() !== "" &&
        !isNaN(cantidad) &&
        cantidad > 0 &&
        cantidad <= cantidadActual
      ) {
        setCarrito(prev =>
          prev
            .map(item => {
              if (item.id === id && item.tallaSeleccionada === tallaSeleccionada) {
                if (item.cantidad > cantidad) {
                  return { ...item, cantidad: item.cantidad - cantidad };
                }
                return null;
              }
              return item;
            })
            .filter(Boolean)
        );
      }
    };

    // Mover a guardados
    const moverAGuardados = (prod) => {
      syncGuardados([...guardados, prod]);
      /*setCarrito(prev =>
        prev.filter(item => !(item.id === prod.id && item.tallaSeleccionada === prod.tallaSeleccionada))
      );*/
      eliminarDelCarrito(id, tallaSeleccionada);
    };

    // Regresar del guardado
    const regresarAlCarrito = (prod) => {
      setCarrito(prev => [...prev, prod]);
      syncGuardados(guardados.filter(item => !(item.id === prod.id && item.tallaSeleccionada === prod.tallaSeleccionada)));
    };

    // Eliminar de guardados
    const eliminarGuardado = (id, tallaSeleccionada) => {
      syncGuardados(guardados.filter(item => !(item.id === id && item.tallaSeleccionada === tallaSeleccionada)));
    };

    const handleOrdenCompleta = async () => {
      const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
      if (!usuario) {
        alert("Debes iniciar sesión para completar tu compra");
        return;
      }

      if (productosAgrupados.length === 0) {
        alert("Tu carrito está vacío");
        return;
      }

      try {
        const fechaActual = new Date().toISOString();
        const productos = productosAgrupados.map(p => ({
          id: p.id,
          cantidad: p.cantidad,
          precio: p.precio,
          talla: p.tallaSeleccionada || null
        }));

        alert("Orden realizada exitosamente");
        setCarrito([]);
        localStorage.removeItem("carrito");
        navigate("/checkout");
      } catch (error) {
        console.error("Error al crear la orden", error);
        alert("Error al crear la orden. Intenta nuevamente.");
      }

      navigate("/checkout");
    };  

    const handleEliminarProducto = async (id, tallaSeleccionada) => {
      const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
      if (!usuario) return;

      const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
      if (!confirmar) return;

      try {
        await axios.delete(`http://localhost:3000/api/carrito/${usuario.id}/${id}`, {
          data: { talla: tallaSeleccionada }
        });

        /*setCarrito(prev =>
          prev.filter(item => !(item.id === id && item.tallaSeleccionada === tallaSeleccionada))
        );*/
        eliminarDelCarrito(id,tallaSeleccionada);
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        alert("No se pudo eliminar el producto");
      }
    };

    return (
      <div className="carrito-page">
        <header className="carrito-header">
          <h1 className="carrito-title">
            Carro <span className="carrito-productos">({totalProductos} productos)</span>
          </h1>
        </header>

        <main className="carrito-main-hm">
          <section className="carrito-lista-hm">
            {totalProductos === 0 ? (
              <div className="carrito-vacio">
                <h2 className="carrito-empty-title">SU CARRITO ESTÁ VACÍO</h2>
                <p className="carrito-empty-text">
                  Para seguir comprando, navegue por las categorías en el sitio, o busque su producto.
                </p>
                <Link to="/">
                  <button className="carrito-button-visible">ELEGIR PRODUCTOS</button>
                </Link>
              </div>
            ) : (
              productosAgrupados.map((prod) => (
                <div
                  className="carrito-producto-ficha-hm"
                  key={prod.id + '-' + prod.tallaSeleccionada + '-' + prod.cantidad}
                >
                  <div className="carrito-producto-foto-hm">
                    <img
                      src={prod.imagen || prod.imagenMain || prod.img || "https://via.placeholder.com/50"}
                      alt={prod.nombre}
                    />
                  </div>
                  <div className="carrito-producto-datos-hm">
                    <div className="carrito-producto-nombre-hm">{prod.nombre}</div>
                    <div className="carrito-producto-infofila-hm">
                      <span>PRECIO</span>
                      <span className="carrito-producto-precio-hm">S/. {prod.precio.toFixed(2)}</span>
                    </div>
                    <div className="carrito-producto-infofila-hm">
                      <span>TALLA</span>
                      <span>{prod.tallaSeleccionada || '34'}</span>
                    </div>
                    <div className="carrito-producto-infofila-hm">
                      <span>CANTIDAD</span>
                      <span>
                        {prod.cantidad}
                        <button
                          style={{ marginLeft: 8, fontSize: 12, padding: "2px 8px" }}
                          onClick={() => cambiarCantidad(prod.id, prod.tallaSeleccionada, prod.cantidad)}
                        >
                          Cambiar
                        </button>
                      </span>
                    </div>
                    <div className="carrito-producto-infofila-hm total">
                      <span>TOTAL</span>
                      <span className="carrito-producto-total-hm">
                        S/. {(prod.precio * prod.cantidad).toFixed(2)}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="carrito-eliminar-btn"
                        onClick={() => handleEliminarProducto(prod.id, prod.tallaSeleccionada)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="carrito-eliminar-btn"
                        style={{ background: "#888" }}
                        onClick={() => moverAGuardados(prod)}
                      >
                        Guardar para después
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Guardados para después */}
            {guardados.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <h2 style={{ fontSize: "1.1rem", marginBottom: 12 }}>Guardados para después</h2>
                {guardados.map((prod) => (
                  <div className="carrito-producto-ficha-hm" key={"g-" + prod.id + '-' + prod.tallaSeleccionada + '-' + prod.cantidad}>
                    <div className="carrito-producto-foto-hm">
                      <img
                        src={prod.imagen || prod.imagenMain || prod.img || "https://via.placeholder.com/50"}
                        alt={prod.nombre}
                      />
                    </div>
                    <div className="carrito-producto-datos-hm">
                      <div className="carrito-producto-nombre-hm">{prod.nombre}</div>
                      <div className="carrito-producto-infofila-hm">
                        <span>PRECIO</span>
                        <span className="carrito-producto-precio-hm">S/. {prod.precio.toFixed(2)}</span>
                      </div>
                      <div className="carrito-producto-infofila-hm">
                        <span>TALLA</span>
                        <span>{prod.tallaSeleccionada || '34'}</span>
                      </div>
                      <div className="carrito-producto-infofila-hm">
                        <span>CANTIDAD</span>
                        <span>{prod.cantidad}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          className="carrito-eliminar-btn"
                          onClick={() => regresarAlCarrito(prod)}
                        >
                          Regresar al carrito
                        </button>
                        <button
                          className="carrito-eliminar-btn"
                          style={{ background: "#888" }}
                          onClick={() => eliminarGuardado(prod.id, prod.tallaSeleccionada)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Resumen de la compra */}
          <aside className="carrito-resumen-container-hm">
            <h2 className="resumen-title-hm">Resumen de la compra</h2>
            <div className="resumen-row-hm">
              <span>PRODUCTOS ({totalProductos})</span>
              <span>S/ {totalPrecio.toFixed(2)}</span>
            </div>
            <div className="resumen-row-hm">
              <span>ENTREGA</span>
              <span className="resumen-green-hm">GRATIS</span>
            </div>
            <div className="resumen-row-hm">
              <span>DESCUENTOS</span>
              <span className="resumen-red-hm">-S/ 0.00</span>
            </div>
            <hr />
            <div className="resumen-total-hm resumen-row-hm">
              <span>TOTAL</span>
              <span>S/ {totalPrecio.toFixed(2)}</span>
            </div> 
              <button className="resumen-btn-hm" onClick={handleOrdenCompleta}>COMPLETAR ORDEN</button>
          </aside>
        </main>
      </div>
    );
  };

  export default Carrito;