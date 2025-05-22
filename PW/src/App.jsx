import React from "react";
import { Routes, Route} from 'react-router-dom';
import Layout from "./Layout";
import Mujer from './pages/Mujer';
import Login from './pages/Login';
import Register from './pages/Register';
import Producto from "./pages/Producto";
import Contraseña from './pages/Contraseña';
import Confirmacion from "./pages/Confirmacion";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ListaProductos from "./admin/ListaProductos";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="mujer" element={<Mujer />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="contraseña" element={<Contraseña />} />
        <Route path="confirmacion" element={<Confirmacion />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element = {<Dashboard />} />
        <Route path="lista" element={<ListaProductos />} />
        {/* Acá van los demás elementos para la parte de ADMIN*/}

        
      </Route>
    </Routes>
  );
};

export default App;
