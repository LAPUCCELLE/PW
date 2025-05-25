import React from "react";
import {Outlet, Link } from 'react-router-dom';
import productos from "../data/productosMujer";
import "../casacas.css";

const Casacas = () => {

    const casacas = productos.filter(p => p.tipo === "casacas");

    return (
        <>
            <div className="section_navbar_container">
                <h1 className="section_title">Casacas y Abrigos</h1>
                <div className="section_category_container">
                    <ul className="section_category_list">
                        <li className="section_category_item">CASACAS</li>
                        <li className="section_category_item">ABRIGOS</li>
                        <li className="section_category_item">CHALECOS</li>
                        <li className="section_category_item">PUFFER Y ACOLCHADAS</li>
                        <li className="section_category_item">CASACAS BOMBER</li>
                        <li className="section_category_item">SOBRECAMISAS</li>
                        <li className="section_category_item">GABARDINAS</li>
                        <li className="section_category_item">DENIM</li>
                        <li className="section_category_item">CASACAS BIKER</li>
                        <li className="section_category_item">CARNERO</li>
                        <li className="section_category_item">PARKAS</li>
                        <li className="section_category_item">ANORAKS</li>
                    </ul>
                </div>
                <div className="section_container_custom_galery">
                    <div className="section_card_wrapper">
                        <div className="grid">
                            {casacas.map((producto, index) => (
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


export default Casacas;