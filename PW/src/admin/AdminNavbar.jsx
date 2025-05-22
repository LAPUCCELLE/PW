import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/h&m-logo.png'; 
import './AdminNavbar.css';

function AdminNavbar() {
  return (
    <header className="admin-header">
      <div className="admin-header__logo">
        <NavLink to="/admin">
          <img src={logo} alt="H&M Admin" />
        </NavLink>
      </div>
      <nav className="admin-header__nav">
        <NavLink
          to="/admin/lista"
          className={({ isActive }) =>
            isActive ? 'admin-nav__link active' : 'admin-nav__link'
          }
        >
          Lista de Productos
        </NavLink>
      </nav>
    </header>
  );
};


export default AdminNavbar;
