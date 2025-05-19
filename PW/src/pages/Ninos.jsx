import React from 'react';
import {Outlet, Link } from 'react-router-dom';
import { useProductos } from "../hooks/useProductos";
import '../ninos.css';

const Ninos = () => {
    const productos3 = useProductos();   
    const nino = productos3.filter(p => p.categoria === "nino");
    console.log("IDs de productos:", productos3.map(p => p.id));
    return (
        <>
                <main>
                    <div className="section_media_container">
                        <Link to="" className='Link_media'>
                            <img id="img_media" alt="Image banner" loading="lazy" width="1500" height="500" decoding="async" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Ff50dafa0-d5f7-4556-a0fa-13e9264c047b___b9523d5067d9580d778eaab2747a4fe7.png" srcSet="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Ff50dafa0-d5f7-4556-a0fa-13e9264c047b___b9523d5067d9580d778eaab2747a4fe7.png 1x" style={{ color: "transparent" }}/>
                        </Link>
                        <div className="section_overlay_texts">
                            <p className="overlay_text">Novedades invierno</p>
                            <Link to="" className="link_overlay">comprar ahora</Link>
                        </div>
                    </div>
                    <div className="section_infocard_container">
                        <div className="section_infocard_left">
                            <Link to="" className="link_infocard1">
                                <img id="img_infocard1" alt="Suave y Dulce" loading="lazy" width="768" height="960" decoding="async" className="section_image__EtgEj" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Ffeb498af-b115-4e44-9b58-73ef56c4e55f___2e3d8d54811b55f7b1e038ac5226dbd0.png" srcSet="https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Ffeb498af-b115-4e44-9b58-73ef56c4e55f___2e3d8d54811b55f7b1e038ac5226dbd0.png 1x, https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Ffeb498af-b115-4e44-9b58-73ef56c4e55f___2e3d8d54811b55f7b1e038ac5226dbd0.png 2x" style={{ color: "transparent" }}/>
                            </Link>
                        </div>
                        <div className="section_infocard_right">
                            <Link to="" className="link_infocard1">
                                <img id="img_infocard2" alt="Vibras de invierno" loading="lazy" width="768" height="960" decoding="async" className="section_image__EtgEj" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F5794d9cc-cf3c-424f-bd3f-e63b09c05f50___a91657ea446b1a3af87686833e726701.png" srcSet="https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F5794d9cc-cf3c-424f-bd3f-e63b09c05f50___a91657ea446b1a3af87686833e726701.png 1x, https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F5794d9cc-cf3c-424f-bd3f-e63b09c05f50___a91657ea446b1a3af87686833e726701.png 2x" style={{ color: "transparent" }}/>
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
                                    {nino.map(producto => (
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


export default Ninos