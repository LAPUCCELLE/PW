import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import Mujer from "./pages/Mujer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Producto from "./pages/Producto";
import Contraseña from "./pages/Contraseña";
import Confirmacion from "./pages/Confirmacion";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import PedidoCompleto from "./pages/PedidoCompleto";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ListaProductos from "./admin/ListaProductos";
import AgregarProducto from "./admin/AgregarProducto";
import EditarProducto from "./admin/EditarProducto";
import DetalleProducto from "./admin/DetalleProducto";
import OrderList from "./admin/OrderList";
import OrderDetail from "./admin/OrderDetail";
import UserList from "./admin/UserList";
import UserDetail from "./admin/UserDetail";
import Casacas from "./pages/Casacas";
import Camisas from "./pages/Camisas";
import Pantalones from "./pages/Pantalones";
import Zapatos from "./pages/Zapatos";
import Cambiar_contrasena from "./pages/Cambiar_contrasena";
import ListaCategorias from "./admin/ListaCategorias";
import Pedidos from "./pages/Pedidos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import { CarritoProvider } from "./components/CarritoContext";
import Navbar from "./Navbar"; // Importa tu Navbar aquí

const App = () => {
  return (
    <CarritoProvider>
      {/* El Navbar se puede colocar aquí si quieres que esté en todas las páginas */}
      {/* <Navbar /> */}
      <Routes>
        {/* Rutas del sitio público */}
        <Route path="/" element={
          <>
            <Navbar />
            <Layout />
          </>
        }>
          <Route index element={<Navigate to="/mujer"/>}/>
          <Route path="mujer" element={<Mujer />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="producto/:id" element={<Producto />} />
          <Route path="cambiar_contrasena" element={<Cambiar_contrasena />} />
          <Route path="contraseña" element={<Contraseña />} />
          <Route path="confirmacion" element={<Confirmacion />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="pedidos" element={<Pedidos />}/>
          <Route path="checkout" element={<Checkout />} />
          <Route path="pedido-completo/:id" element={<PedidoCompleto />} />
          <Route path="casacas" element={<Casacas />} />
          <Route path="camisas" element={<Camisas />} />
          <Route path="pantalones" element={<Pantalones />} />
          <Route path="zapatos" element={<Zapatos />} />
        </Route>

        {/* Rutas del panel de administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="lista" element={<ListaProductos />} />
          <Route path="categoria" element={<ListaCategorias />} />
          <Route path="agregar" element={<AgregarProducto />} />
          <Route path="editar/:id" element={<EditarProducto />} />
          <Route path="detalle/:id" element={<DetalleProducto />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="/admin/orders/:id" element={<OrderDetail />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserDetail />} />
        </Route>
      </Routes>
    </CarritoProvider>
  );
};

export default App;