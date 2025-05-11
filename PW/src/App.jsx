import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Navbar from './Navbar';
import Mujer from './pages/Mujer';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/mujer" element={<Mujer />}/>
      </Routes>
    </>
  );
};

export default App;
