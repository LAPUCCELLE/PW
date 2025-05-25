import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import logo from '../assets/h&m-logo.png'; 

function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="admin-navbar">
      <div className="logo-container" onClick={() => navigate('/admin')}>
        <img src={logo} alt="H&M Logo" className="hm-logo" />
      </div>
      <div className="nav-links">
        <button onClick={() => navigate('/admin/categoria')}>
          Lista de Categorias
        </button>
        <button onClick={() => navigate('/admin/lista')}>
          Lista de Productos
        </button>
        <button onClick={() => navigate('/admin/orders')}>
          Lista de Órdenes
        </button>
        <button onClick={() => navigate('/admin/users')}>
          Lista de Usuarios
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
