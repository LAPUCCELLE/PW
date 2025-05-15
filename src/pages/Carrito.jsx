import React from 'react';
import { Link } from 'react-router-dom';
import "../carrito.css";

const Carrito = () => {
  return (
    <div className="carrito">
      {/* Encabezado */}
      <header className="carrito-header">
        <img src="/hm-logo.png" alt="H&M Logo" className="carrito-logo" />
        <h1 className="carrito-title">SHOPPING BAG</h1>
      </header>

      {/* Contenido principal */}
      <main className="carrito-main">
        <h2 className="carrito-empty-title">SU CARRITO ESTÁ VACIO</h2>
        <p className="carrito-empty-text">
          Para seguir comprando, navegar por las categorías en el sitio, o
          busque su producto.
        </p>
        <Link to="/">
          <button className="carrito-button">ELEGIR PRODUCTOS</button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="carrito-footer">
        <p className="carrito-path">
          HM.COM / <span>SHOPPING BAG</span>
        </p>
        <p className="carrito-copy">
          El contenido de esta página web está protegido por copyright y es
          propiedad de H&M Hennes & Mauritz AB. La idea de negocio de H&M
          consiste en ofrecer moda y calidad al mejor precio de manera
          sustentable. Desde que se fundó en 1947, H&M ha crecido hasta
          convertirse en una de las principales compañías de moda a nivel
          mundial.
        </p>
      </footer>
    </div>
  );
};

export default Carrito; // Asegúrate de que esta línea esté presente