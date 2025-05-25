import React from "react";
import {Outlet, Link } from 'react-router-dom';
import productos from "../data/productosMujer";
import "../casacas.css";

const Zapatos = () => {

    const zapatos = productos.filter(p => p.tipo === "zapatos");

    return (
        <>
            <div className="section_navbar_container">
                <h1 className="section_title">Zapatos</h1>
                <div className="section_category_container">
                    <ul className="section_category_list">
                        <li className="section_category_item">TACONES ALTOS</li>
                        <li className="section_category_item">TACONES BLOQUE</li>
                        <li className="section_category_item">ZAPATOS DE SALON</li>
                        <li className="section_category_item">PEEP TOES</li>
                        <li className="section_category_item">BOTAS ALTAS</li>
                        <li className="section_category_item">BOTINES</li>
                        <li className="section_category_item">CHELSEA BOOTS</li>
                        <li className="section_category_item">MOCASINES</li>
                        <li className="section_category_item">BAILARINAS</li>
                    </ul>
                </div>
                <div className="section_container_custom_galery">
                    <div className="section_card_wrapper">
                        <div className="grid">
                            {zapatos.map((producto, index) => (
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


export default Zapatos;