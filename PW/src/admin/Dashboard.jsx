import React, { useState, useEffect } from "react";
import axios from "axios";
//import orders from "../data/orders";
//import usuarios from "../data/usuarios";

const Dashboard = () => {
  /*const obtenerHoyInput = () => {
    const hoy = new Date()  ;
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  };*/

  const [ordenes, setOrdenes] = useState([]);
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);
  const [fechaInput, setFechaInput] = useState(() => {
    const hoy = new Date()  ;
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  });

  const convertirAFormatoOrden = (fechaISO) => {
    const [anio, mes, dia] = fechaISO.split('-');
    return `${dia}/${mes}/${anio}`;
  };
  // const [usuariosUnicos, setUsuariosUnicos] = useState(0);
  //const [montoTotal, setMontoTotal] = useState(0);
  

  /*const buscarRegistros = () => {
    const fechaBusqueda = convertirAFormatoOrden(fechaInput);
    const ordenesFiltradas = orders.filter(order => order.date === fechaBusqueda);

    setOrdenes(ordenesFiltradas.length);
    const usuariosSet = new Set(ordenesFiltradas.map(order => order.userId));
    setUsuariosUnicos(usuariosSet.size);
    setMontoTotal(ordenesFiltradas.reduce((sum, o) => sum + (o.total || 0), 0));
  };*/

  useEffect(() => {
    axios.get("http://localhost:3000/api/orders").then(res => setOrdenes(res.data)).catch(error => console.error("Error al cargar ordenes:", error));

  },[]);

  useEffect(() => {
    //buscarRegistros();
    const fechaBusqueda = convertirAFormatoOrden(fechaInput);
    const filtradas = ordenes.filter(o => o.fecha === fechaBusqueda);
    setOrdenesFiltradas(filtradas);
  }, [fechaInput, ordenes]);
  
  const usuariosUnicosHoy = new Set(ordenesFiltradas.map(o => o.userId)).size;
  const montoTotalHoy = ordenesFiltradas.reduce((sum, o) => sum + (o.monto || 0), 0);

  const usuariosUnicosTotales = new Set(ordenes.map(o => o.userId)).size;
  const montoTotalGlobal = ordenes.reduce((sum, o) => sum + (o.monto || 0), 0);

  //const totalOrdenesGlobal = orders.length;
  //const userIdsUnicosGlobal = Array.from(new Set(orders.map(order => order.userId)));
  //const totalUsuariosUnicosGlobal = userIdsUnicosGlobal.length;
  

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
        {/*<button
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
        </button>*/}
      </div>

      <div style={{ fontSize: '1.1rem' }}>
        <p><strong>Órdenes (por fecha):</strong> {ordenesFiltradas.length}</p>
        <p><strong>Usuarios únicos (por fecha):</strong> {usuariosUnicosHoy}</p>
        <p><strong>Monto total (por fecha):</strong> S/ {montoTotalHoy.toFixed(2)}</p>
      </div>

      <hr style={{margin: "1.5rem 0"}} />

      <div style={{ fontSize: '1.13rem' }}>
        <p><strong>Órdenes totales:</strong> {ordenes.length}</p>
        <p><strong>Usuarios únicos totales:</strong> {usuariosUnicosTotales}</p>
        <p><strong>Monto total global:</strong> <span style={{color: "#16a34a", fontWeight: 600}}>S/ {montoTotalGlobal.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default Dashboard;
