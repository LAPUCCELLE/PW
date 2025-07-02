import React from "react";
import {Outlet, Link } from 'react-router-dom';
import UseProductos from "../hooks/UseProductos";
import "../casacas.css";


const Pantalones = () => {

    const productos = UseProductos("Mujer");
    const pantalones = productos.filter(p => p.tipo === "pantalones");

    return (
        <>
            <div className="section_navbar_container">
                <h1 className="section_title">PANTALONES PARA MUJER</h1>
                <div className="section_category_container">
                    <ul className="section_category_list">
                        <li className="section_category_item">PANTALONES CARGO</li>
                        <li className="section_category_item">PANTALONES CHINOS</li>
                        <li className="section_category_item">DE VESTIR</li>
                        <li className="section_category_item">TIRO ALTO</li>
                        <li className="section_category_item">JOGGERS</li>
                        <li className="section_category_item">LEGGINS Y MALLAS</li>
                        <li className="section_category_item">CUERO PU</li>
                        <li className="section_category_item">LINO</li>
                        <li className="section_category_item">ACAMPANADOS Y PALAZZO</li>
                        <li className="section_category_item">WIDE LEG Y PIERNA ANCHA</li>
                        <li className="section_category_item">PAPER BAG</li>
                    </ul>
                </div>
                <div className="section_container_custom_galery">
                    <div className="section_card_wrapper">
                        <div className="grid">
                            {pantalones.map((producto, index) => (
                                <div key={index} className="producto_card">
                                    <Link to={`/producto/${producto.id}`} className="producto_card">
                                        <img src={producto.imagenMain} alt={producto.nombre} />
                                        <p>{producto.nombre}</p>
                                        <p>S/ {producto.precio}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Pantalones;