import React from 'react';
import {Outlet, Link } from 'react-router-dom';
import "../mujer.css"

const Mujer = () => {
    return (
        <>
        <main>
            <div className="section_media_container">
                <Link to="" className='Link_media'>
                    <img id="img_media" alt="Image banner" loading="lazy" width="1500" height="500" decoding="async" srcSet="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F1aa393e3-1a67-497e-a326-d1a1b23f803b___a87f6974a44c19acf04bb32d339e31ba.jpg 1x" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2F1aa393e3-1a67-497e-a326-d1a1b23f803b___a87f6974a44c19acf04bb32d339e31ba.jpg" style={{ color: 'transparent' }}/>
                </Link>
                <div className="section_overlay_texts">
                    <p className="overlay_text">winter 2025</p>
                    <Link to="" className="link_overlay">comprar ahora</Link>
                </div>
            </div>
            <div className="section_infocard_container">
                <div className="section_infocard_left">
                    <Link to="" className="link_infocard1">
                        <img id="img_infocard1" alt="ESTILO URBANO" loading="lazy" width="768" height="960" decoding="async" className="section_image__EtgEj" srcSet="https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fc8db988c-fdf2-4ebd-9ddc-3f699e3edce6___318ae21687e12e5b659f97f5b498b761.jpg 1x,https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fc8db988c-fdf2-4ebd-9ddc-3f699e3edce6___318ae21687e12e5b659f97f5b498b761.jpg 2x" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fc8db988c-fdf2-4ebd-9ddc-3f699e3edce6___318ae21687e12e5b659f97f5b498b761.jpg"style={{ color: 'transparent' }}/>
                    </Link>
                </div>
                <div className="section_infocard_right">
                    <Link to="" className="link_infocard1">
                        <img id="img_infocard2" alt="Move softly" loading="lazy" width="768" height="960" decoding="async" className="section_image__EtgEj" srcSet="https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fa8125d5a-5692-408b-94c0-4d7f4b47475f___8fd158da4df38e5bc6df051e92362659.jpg 1x,https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fa8125d5a-5692-408b-94c0-4d7f4b47475f___8fd158da4df38e5bc6df051e92362659.jpg 2x" src="https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Fassets%2Fvtex.file-manager-graphql%2Fimages%2Fa8125d5a-5692-408b-94c0-4d7f4b47475f___8fd158da4df38e5bc6df051e92362659.jpg" style={{ color: "transparent" }}/>
                    </Link>
                </div>
            </div>
        </main>
        
        </>
    )
}

export default Mujer;