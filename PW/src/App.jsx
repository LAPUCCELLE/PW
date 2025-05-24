import React from "react";
import { Routes, Route } from 'react-router-dom';
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
import AgregarProducto from "./admin/AgregarProducto";
import OrderList from "./admin/OrderList";
import OrderDetail from "./admin/OrderDetail";
import UserList from "./admin/UserList";
import UserDetail from "./admin/UserDetail";
import Casacas from "./pages/Casacas";
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
        <Route path="/casacas" element={<Casacas />}/>
        <Route path="contraseña" element={<Contraseña />} />
        <Route path="confirmacion" element={<Confirmacion />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="lista" element={<ListaProductos />}>
          <Route path="agregar" element={<AgregarProducto />} />
        </Route>
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/:id" element={<OrderDetail />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/:id" element={<UserDetail />} />
      </Route>
    </Routes>
  );
};

export default App;
