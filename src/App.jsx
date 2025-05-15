import React from "react";
import { Routes, Route} from 'react-router-dom';
import Layout from "./Layout";
import Mujer from './pages/Mujer';
import Carrito from './pages/Carrito';    


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="mujer" element={<Mujer />} />
          <Route path="Carrito" element={<Carrito />} />
          
      </Route>
    </Routes>
  );
};

export default App;
