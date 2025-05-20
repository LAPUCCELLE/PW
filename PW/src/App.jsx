import React from "react";
import { Routes, Route} from 'react-router-dom';
import Layout from "./Layout";
import Mujer from './pages/Mujer';
import Login from './pages/Login';
import Register from './pages/Register';
import Hombre from './pages/Hombre';
import Ninos from "./pages/Ninos";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="mujer" element={<Mujer />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="hombre" element={<Hombre />}/>
        <Route path="ninos" element={<Ninos />}/>
      </Route>
    </Routes>
  );
};

export default App;
