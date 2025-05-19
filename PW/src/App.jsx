import React from "react";
import { Routes, Route} from 'react-router-dom';
import Layout from "./Layout";
import Mujer from './pages/Mujer';
import Login from './pages/Login';
import Register from './pages/Register';
import Carrito from './pages/Carrito'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="mujer" element={<Mujer />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="carrito" element={<Carrito />} />
      </Route>
    </Routes>
  );
};

export default App;
