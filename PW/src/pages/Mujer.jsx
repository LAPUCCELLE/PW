import React from 'react';
import {Outlet, Link } from 'react-router-dom';
import "../mujer.css"

const Mujer = () => {
    return (
        <>
        <div className="section_media_container">
            <Link to="" className='Link_media'>
                <img id="img_media" alt="Image banner" loading="lazy" width="1500" height="500" decoding="async" srcSet="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F1aa393e3-1a67-497e-a326-d1a1b23f803b___a87f6974a44c19acf04bb32d339e31ba.jpg 1x" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F1aa393e3-1a67-497e-a326-d1a1b23f803b___a87f6974a44c19acf04bb32d339e31ba.jpg" style={{ color: 'transparent' }}/>
            </Link>
            <div className="section_overlay_texts">
                <p className="overlay_text">winter 2025</p>
                <Link to="" className="link_overlay">comprar ahora</Link>
            </div>
        </div>
        
        </>
    )
}

export default Mujer;