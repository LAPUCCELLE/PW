import React from 'react';
import { Link} from 'react-router-dom';
import "./main.css"

const Navbar = () => {
    return (
            <div className="nav_container">
                <div className="section_promoBar_content">
                    <span className="section_promo_text">Hasta 60% en seleccion mujer</span>
                    <button className="section_compra_button">Comprar ahora</button>
                </div>
                <div className="navbar_content">
                    <div className="left">
                        <img className="logo_marca" src="https://hmperu.vtexassets.com/assets/vtex.file-manager-graphql/images/d0e454f7-81d9-41e2-a306-f8f41c804a7c___d81e534ae8621b10d58c605eba2fcdf5.webp" alt="Logo de la tienda" loading="lazy"/>
                        <ul>
                            <li><Link to="" className="nav_link">=</Link></li>
                            <li><Link to="/mujer" className="nav_link">mujer</Link></li>
                            <li><Link to="/hombre" className="nav_link">hombre</Link></li>
                            <li><Link to="/ninos" className="nav_link">niños</Link></li>
                            <li><Link to="/home" className="nav_link">home</Link></li>
                        </ul>
                    </div>
                    <div className="right">
                        <button id="button">
                            <div className="button_container">
                                <span className="button_span">
                                <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fillRule="evenodd" d="M14.391 15.452a7 7 0 1 1 1.06-1.06l5.86 5.858-1.061 1.06-5.859-5.858ZM15.5 10a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"></path></svg></span>
                            </div>
                        </button>
                        <Link to="/login" id="button" className="button_container">
                            <span className="button_span">
                                <svg role="img" aria-hidden="true"focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="20"width="20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.75 6.25a4.75 4.75 0 1 1-9.5 0 4.75 4.75 0 0 1 9.5 0Z
                                        M12 12.5c-2.397 0-4.827.238-6.684.991-.935.38-1.767.907-2.367 1.64
                                        -.611.746-.949 1.665-.949 2.752V20h1.5v-2.117c0-.753.226-1.334.61
                                        -1.802.393-.48.986-.881 1.77-1.2C7.464 14.238 9.66 14 12 14c2.348 
                                        0 4.542.214 6.124.845.783.312 1.373.71 1.765 1.192.382.47.61 
                                        1.063.61 1.847L20.5 20H22v-2.116c0-1.107-.335-2.04-.947-2.793
                                        -.602-.74-1.436-1.266-2.374-1.64-1.858-.74-4.29-.951-6.679-.951Z"
                                    />
                                </svg>
                            </span>
                        </Link>
                        <button id="button">
                            <div className="button_container">
                                <span className="button_span"><svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M13.035 4.54a5.25 5.25 0 1 1 7.425 7.424L12 20.424l-8.46-8.459a5.25 5.25 0 0 1 7.424-7.425l1.037 1.034 1.034-1.034ZM19.4 5.6a3.75 3.75 0 0 0-5.303 0l-2.093 2.094-2.098-2.092a3.75 3.75 0 0 0-5.304 5.303l7.4 7.397 7.398-7.398a3.75 3.75 0 0 0 0-5.304Z"></path></svg></span>
                            </div>
                        </button>
                        <button id="button">
                            <div className="button_container">
                                <span className="button_span"><svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fillRule="evenodd" d="M12 2c-1.17 0-2.436.262-3.437.853-1.02.601-1.813 1.586-1.813 2.97v1.178H5.126L2 7.003V21h20V7h-4.75V5.872c0-1.4-.783-2.399-1.806-3.011C14.442 2.26 13.174 2 12 2Zm3.75 6.5V12h1.5V8.5h3.25v11h-17V8.502h3.25V12h1.5V8.5h7.5Zm0-1.5V5.872c0-.75-.389-1.313-1.076-1.724-.71-.424-1.692-.648-2.674-.648-.977 0-1.961.224-2.674.644-.694.41-1.076.962-1.076 1.679v1.178L15.75 7Z"></path></svg></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default Navbar;