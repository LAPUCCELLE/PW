import React from "react";
import { Routes, Route} from 'react-router-dom';
import Layout from "./Layout";
import Mujer from './pages/Mujer';
import Login from './pages/Login';
import Register from './pages/Register';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="mujer" element={<Mujer />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
