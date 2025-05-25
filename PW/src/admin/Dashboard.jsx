import React, { useState, useEffect } from "react";
import orders from "../data/orders";
import usuarios from "../data/usuarios";

const Dashboard = () => {
  // Devuelve fecha actual en formato yyyy-mm-dd para el input
  const obtenerHoyInput = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  };

  // Convierte yyyy-mm-dd a dd/mm/yyyy (el formato de las órdenes)
  const convertirAFormatoOrden = (fechaISO) => {
    const [anio, mes, dia] = fechaISO.split('-');
    return `${dia}/${mes}/${anio}`;
  };

  const [fechaInput, setFechaInput] = useState(obtenerHoyInput());
  const [ordenes, setOrdenes] = useState(0);
  const [usuariosUnicos, setUsuariosUnicos] = useState(0);
  const [montoTotal, setMontoTotal] = useState(0);

  // Búsqueda sobre orders.js por fecha seleccionada
  const buscarRegistros = () => {
    const fechaBusqueda = convertirAFormatoOrden(fechaInput);
    const ordenesFiltradas = orders.filter(order => order.date === fechaBusqueda);

    setOrdenes(ordenesFiltradas.length);
    const usuariosSet = new Set(ordenesFiltradas.map(order => order.userId));
    setUsuariosUnicos(usuariosSet.size);
    setMontoTotal(ordenesFiltradas.reduce((sum, o) => sum + (o.total || 0), 0));
  };

  // Al cargar la página y cada vez que cambia la fechaInput
  useEffect(() => {
    buscarRegistros();
    // eslint-disable-next-line
  }, [fechaInput]);

  // Resumen global (de todos los datos)
  const totalOrdenesGlobal = orders.length;
  const userIdsUnicosGlobal = Array.from(new Set(orders.map(order => order.userId)));
  const totalUsuariosUnicosGlobal = userIdsUnicosGlobal.length;
  const montoTotalGlobal = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '410px', margin: 'auto' }}>
      <h2>Bienvenido ADMIN</h2>
      <p>Registro diario de las órdenes, usuarios y montos</p>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="fecha">Buscar por fecha:</label><br />
        <input
          id="fecha"
          type="date"
          value={fechaInput}
          onChange={e => setFechaInput(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', marginTop: '0.3rem' }}
        />
        <button
          onClick={buscarRegistros}
          style={{
            marginLeft: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#e60023',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Buscar
        </button>
      </div>

      <div style={{ fontSize: '1.1rem' }}>
        <p><strong>Órdenes (por fecha):</strong> {ordenes}</p>
        <p><strong>Usuarios únicos (por fecha):</strong> {usuariosUnicos}</p>
        <p><strong>Monto total (por fecha):</strong> S/ {montoTotal.toFixed(2)}</p>
      </div>

      <hr style={{margin: "1.5rem 0"}} />

      <div style={{ fontSize: '1.13rem' }}>
        <p><strong>Órdenes totales:</strong> {totalOrdenesGlobal}</p>
        <p><strong>Usuarios únicos totales:</strong> {totalUsuariosUnicosGlobal}</p>
        <p><strong>Monto total global:</strong> <span style={{color: "#16a34a", fontWeight: 600}}>S/ {montoTotalGlobal.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default Dashboard;
