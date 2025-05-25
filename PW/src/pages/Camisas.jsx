import React from "react";
import {Outlet, Link } from 'react-router-dom';
import productos from "../data/productosMujer";
import "../casacas.css";


const Camisas = () => {

    const camisas = productos.filter(p => p.tipo === "camisas");

    return (
        <>
            <div className="section_navbar_container">
                <h1 className="section_title">POLOS Y CAMISAS</h1>
                <div className="section_category_container">
                    <ul className="section_category_list">
                        <li className="section_category_item">BLUSAS</li>
                        <li className="section_category_item">DENIM</li>
                        <li className="section_category_item">LINO</li>
                        <li className="section_category_item">CAMISAS</li>
                        <li className="section_category_item">POLOS</li>
                        <li className="section_category_item">VESTIDOS</li>
                    </ul>
                </div>
                <div className="section_container_custom_galery">
                    <div className="section_card_wrapper">
                        <div className="grid">
                            {camisas.map((producto, index) => (
                                <Link to={`/producto/${producto.id}`} className="producto_card">
                                    <img src={producto.imagenMain} alt={producto.nombre} />
                                    <p>{producto.nombre}</p>
                                    <p>S/ {producto.precio}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Camisas;