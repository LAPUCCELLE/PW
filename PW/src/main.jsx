//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';   
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CarritoProvider } from "./components/CarritoContext";

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  //</StrictMode>
);
