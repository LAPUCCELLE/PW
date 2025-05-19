import React from 'react';
import {Outlet, Link } from 'react-router-dom';
import { useProductos } from "../hooks/useProductos";
import '../hombre.css';



const Hombre = () => {
    const productos2 = useProductos("hombre");
    const hombre = productos2.filter(p => p.categoria === "hombre");
    console.log("IDs de productos:", productos2.map(p => p.id));
    return (
            <>
                <main>
                    <div className="section_media_container">
                        <Link to="" className='Link_media'>
                            <img id="img_media" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fae1053d6-34f3-414c-beaf-30d062f50235___f3af0434852354377a1628219f023b81.jpg" srcSet="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fae1053d6-34f3-414c-beaf-30d062f50235___f3af0434852354377a1628219f023b81.jpg 1x" width="1500" height="500" loading="lazy" decoding="async" alt="Image banner" style={{ color: 'transparent' }}/>
                        </Link>
                        <div className="section_overlay_texts">
                            <p className="overlay_text">winter 2025</p>
                            <Link to="" className="link_overlay">comprar ahora</Link>
                        </div>
                    </div>
                    <div className="section_infocard_container">
                        <div className="section_infocard_left">
                            <Link to="" className="link_infocard1">
                                <img alt="Esenciales de temporada" loading="lazy" width="768" height="960" decoding="async" className="section_image__EtgEj" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F13da9178-316b-4de1-9e7a-99b22b6ddedb___ed932872b31b92e7c42b810de24fd8d6.jpg" srcSet="https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F13da9178-316b-4de1-9e7a-99b22b6ddedb___ed932872b31b92e7c42b810de24fd8d6.jpg 1x, https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F13da9178-316b-4de1-9e7a-99b22b6ddedb___ed932872b31b92e7c42b810de24fd8d6.jpg 2x" style={{ color: 'transparent' }}/>
                            </Link>
                        </div>
                        <div className="section_infocard_right">
                            <Link to="" className="link_infocard1">
                                <img alt="Edición: Puffer" loading="lazy" width="768" height="960" decoding="async" className="section_image__EtgEj" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F3750e72d-9c24-4ca2-bd2f-3cb767fb7477___13925b942724027af5a666baa54f37a5.jpg" srcSet="https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F3750e72d-9c24-4ca2-bd2f-3cb767fb7477___13925b942724027af5a666baa54f37a5.jpg 1x, https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F3750e72d-9c24-4ca2-bd2f-3cb767fb7477___13925b942724027af5a666baa54f37a5.jpg 2x" style={{ color: 'transparent' }}/>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="section_header_tittle">
                            <h4 id='h4'>NOVEDADES</h4>
                            <Link to="" className="ver_todo_button">VER TODO</Link>
                        </div>
                        <div className="section_product_shelf_container">
                            <section className="section_product_shelf_layout">
                                <ul className="product_grid">
                                    {hombre.map(producto => (
                                        <li key={producto.id}>
                                            <Link to={`/producto/${producto.id}`}>
                                                <img src={producto.imagen} alt={producto.nombre} />
                                                <p>{producto.nombre}</p>
                                                <span>S/ {producto.precio}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                </main>     
        </>
    )
}

export default Hombre;