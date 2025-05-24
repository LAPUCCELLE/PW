import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const formatearFecha = (fechaISO) => {
    const [anio, mes, dia] = fechaISO.split('-');
    return `${dia}/${mes}/${anio}`;
  };

  const obtenerHoyInput = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  };

  const [fechaInput, setFechaInput] = useState(obtenerHoyInput());
  const [ordenes, setOrdenes] = useState(0);
  const [usuariosUnicos, setUsuariosUnicos] = useState(0);
  const [montoTotal, setMontoTotal] = useState(0);

  const buscarRegistros = () => {
    const registros = JSON.parse(localStorage.getItem('registroDiario')) || [];
    const fechaBusqueda = formatearFecha(fechaInput);
    const registrosFiltrados = registros.filter(r => r.fecha === fechaBusqueda);

    let totalOrdenes = 0;
    let usuariosSet = new Set();
    let totalMonto = 0;

    registrosFiltrados.forEach(r => {
      totalOrdenes += r.ordenes;
      if (Array.isArray(r.usuarios)) {
        r.usuarios.forEach(u => usuariosSet.add(u));
      } else {
        usuariosSet.add(r.usuarios);
      }
      totalMonto += r.monto;
    });

    setOrdenes(totalOrdenes);
    setUsuariosUnicos(usuariosSet.size);
    setMontoTotal(totalMonto);
  };

  useEffect(() => {
    buscarRegistros();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: 'auto' }}>
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
        <p><strong>Órdenes:</strong> {ordenes}</p>
        <p><strong>Usuarios únicos:</strong> {usuariosUnicos}</p>
        <p><strong>Monto total:</strong> S/ {montoTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Dashboard;
