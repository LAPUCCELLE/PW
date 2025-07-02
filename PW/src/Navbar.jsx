import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import usuariosPredefinidos from "./data/usuarios";
//import productosPredefinidos from "./data/productosMujer";
import "./main.css";
import { useCarrito } from './components/CarritoContext';

/*const inicializarDatos = () => {
    const existentes = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    const nuevos = usuariosPredefinidos.filter(nuevo =>
        !existentes.some(ex => ex.id === nuevo.id)
    );
    const fusionados = [...existentes, ...nuevos];
    localStorage.setItem("usuariosRegistrados", JSON.stringify(fusionados));
    //localStorage.setItem("productos", JSON.stringify(productosPredefinidos));
    
    const categorias = ["casacas", "camisas", "pantalones", "zapatos"];
    localStorage.setItem("categorias", JSON.stringify(categorias));

    alert("Datos cargados: usuarios, productos y categorías.");
};*/


const Navbar = () => {
    const [menuDeslizanteAbierto, setMenuDeslizanteAbierto] = useState(false);
    const [loginAbierto, setLoginAbierto] = useState(false);
    const [usuarioLogueado, setUsuarioLogueado] = useState(false);
    const [showCartPopup, setShowCartPopup] = useState(false);

    const navigate = useNavigate();
    const { carrito } = useCarrito();


    const totalProductos = carrito.reduce((acc, prod) => acc + (prod.cantidad || 1), 0);
    const totalPrecio = carrito.reduce((acc, prod) => acc + (prod.precio * (prod.cantidad || 1)), 0);


    useEffect(() => {
        
        const chequearLogin = () => {
            const user = localStorage.getItem("usuarioLogueado");
            try {
                const parsed = JSON.parse(user);
                if (parsed && parsed.id && parsed.nombre) {
                    setUsuarioLogueado(true);
                } else {
                    setUsuarioLogueado(false);
                }
            } catch (e) {
                setUsuarioLogueado(false);
            }
        };
        window.addEventListener("storage", chequearLogin);
        chequearLogin();
        return () => window.removeEventListener("storage", chequearLogin);
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem("usuarioLogueado");
        setUsuarioLogueado(false);
        setLoginAbierto(false);
        setMenuDeslizanteAbierto(false);
    };

    const toggleMenu = () => {
        setMenuDeslizanteAbierto(!menuDeslizanteAbierto);
        setLoginAbierto(false);
    };

    const handleCartClick = () => {
        navigate('/carrito');
    };

    return (
        <>
            {menuDeslizanteAbierto && <div className="overlay" onClick={toggleMenu}></div>}

            <div className={`menu_deslizante ${menuDeslizanteAbierto ? 'abierto' : ''}`}>
                <div role="button" tabIndex="0" onClick={toggleMenu} className="cerrar_btn">X
                    <div className="menu_top_links">
                        <ul>
                            <li><Link to="/mujer">Mujer</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="menu_content">
                    <div className="menu_left">
                        <p className="menu_title">NOVEDADES<br />WINTER 2025</p>
                        <ul>
                            <li><Link to="/casacas">CASACAS Y ABRIGOS</Link></li>
                            <li><Link to="/camisas">POLOS Y CAMISAS</Link></li>
                            <li><Link to="/pantalones">PANTALONES</Link></li>
                            <li><Link to="/zapatos">ZAPATOS</Link></li>
                        </ul>
                    </div>
                    <div className="menu_right">
                        <div className="menu_img">
                            <img src="https://hmperu.vtexassets.com/assets/vtex.file-manager-graphql/images/25b8840b-a587-4b31-aafe-16dc121f9f70___8727b01078a6ebcbfd94ec649c3ab81e.jpg" width="190" height="285" loading="lazy" decoding="async" style={{ color: 'transparent' }}/>
                            <p>CASACAS Y ABRIGOS<br /><small>VER TODO</small></p>
                        </div>
                        <div className="menu_img">
                            <img alt="model-main" loading="lazy" width="190" height="285" decoding="async" src="https://hmperu.vtexassets.com/assets/vtex.file-manager-graphql/images/332037c9-193b-48e4-b79b-cdec2877c453___4a0d0cc5e19cc2950eaa418842194568.jpg" style={{ color: "transparent" }}/>
                            <p>POLOS Y CAMISAS<br /><small>VER TODO</small></p>
                        </div>
                        <div className="menu_img">
                            <img src="https://hmperu.vtexassets.com/assets/vtex.file-manager-graphql/images/bcc599ae-e8d9-47ff-8280-8bf7b3e5414e___3c7211ef0c52d433cda1d2f2af12ff53.jpg" alt="Pantalones" width="190" height="285" loading="lazy" decoding="async" style={{ color: 'transparent' }}/>
                            <p>PANTALONES<br /><small>VER TODO</small></p>
                        </div>
                        <div className="menu_img">
                            <img src="https://hmperu.vtexassets.com/unsafe/1280x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5844913%2FBotas-con-puntera-fina---Beige-oscuro---H-M-PE.jpg%3Fv%3D638860396222730000" width="190" height="285" alt="Zapatos" loading="lazy" decoding="async" style={{ color: "transparent" }}/>
                            <p>ZAPATOS<br /><small>VER TODO</small></p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="nav_container">
                <div className="section_promoBar_content">
                    <span className="section_promo_text">Hasta 60% en seleccion mujer</span>
                    <button className="section_compra_button">Comprar ahora</button>
                </div>
                <div className="navbar_content">
                    <div className="left">
                        <Link to="/">
                            <button /*onClick={inicializarDatos}*/ style={{background: "none", border: "none", cursor: "pointer",padding: 0}}>
                                <img className="logo_marca" src="https://hmperu.vtexassets.com/assets/vtex.file-manager-graphql/images/d0e454f7-81d9-41e2-a306-f8f41c804a7c___d81e534ae8621b10d58c605eba2fcdf5.webp" alt="Logo de la tienda" loading="lazy"/>
                            </button>
                        </Link>
                        <ul>
                            <li><button className="menu_btn" onClick={toggleMenu}>☰</button></li>
                            <li><Link to="/mujer" className="nav_link">mujer</Link></li>
                        </ul>
                    </div>
                    <div className="right">
                        {/* Botón de búsqueda */}
                        <button className="icon-button" aria-label="Buscar">
                            <div className="button_container">
                                <span className="button_span">
                                    <svg role="img" aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fillRule="evenodd" d="M14.391 15.452a7 7 0 1 1 1.06-1.06l5.86 5.858-1.061 1.06-5.859-5.858ZM15.5 10a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"></path></svg>
                                </span>
                            </div>
                        </button>

                    <div className="login_dropdown_container">
                    <button
                        id="button"
                        className="button_container"
                        onClick={() => {
                        setLoginAbierto(!loginAbierto);
                        setMenuDeslizanteAbierto(false);
                        }}
                        aria-label="Iniciar sesión"
                    >
                        <span className="button_span">
                        <svg
                            role="img"
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                        >
                            <path
                            fillRule="evenodd"
                            d="M16.75 6.25a4.75 4.75 0 1 1-9.5 0 4.75 4.75 0 0 1 9.5 0ZM12 12.5c-2.397 0-4.827.238-6.684.991-.935.38-1.767.907-2.367 1.64-.611.746-.949 1.665-.949 2.752V20h1.5v-2.117c0-.753.226-1.334.61-1.802.393-.48.986-.881 1.77-1.2C7.464 14.238 9.66 14 12 14c2.348 0 4.542.214 6.124.845.783.312 1.373.71 1.765 1.192.382.47.61 1.063.61 1.847L20.5 20H22v-2.116c0-1.107-.335-2.04-.947-2.793-.602-.74-1.436-1.266-2.374-1.64-1.858-.74-4.29-.951-6.679-.951Z"
                            />
                        </svg>
                        </span>
                    </button>

                    {loginAbierto && (
                        <div className="dropdown_login">
                        {!usuarioLogueado ? (
                            <div className="login-detalle">
                            <Link to="/login" onClick={() => setLoginAbierto(false)}>
                                Iniciar sesión
                            </Link>
                            </div>
                        ) : (
                            <div className="login-detalle">
                            <Link to="/pedidos" onClick={() => setLoginAbierto(false)}>
                                Mis pedidos
                            </Link>
                            <Link to="/cambiar_contrasena" onClick={() => setLoginAbierto(false)}>
                                Cambiar contraseña
                            </Link>
                            <button onClick={cerrarSesion} className="link-logout">
                                Cerrar sesión
                            </button>
                            </div>
                        )}
                        </div>
                    )}
                    </div>



                        <button className="icon_button" aria-label="Favoritos">
                            <svg viewBox="0 0 24 24" height="20" width="20">
                                <path d="M13.035 4.54a5.25 5.25 0 1 1 7.425 7.424L12 20.424l-8.46-8.459a5.25 5.25 0 0 1 7.424-7.425l1.037 1.034 1.034-1.034ZM19.4 5.6a3.75 3.75 0 0 0-5.303 0l-2.093 2.094-2.098-2.092a3.75 3.75 0 0 0-5.304 5.303l7.4 7.397 7.398-7.398a3.75 3.75 0 0 0 0-5.304Z" />
                            </svg>
                        </button>


                        <div
                            className="cart-icon-wrapper"
                            onMouseEnter={() => setShowCartPopup(true)}
                            onMouseLeave={() => setShowCartPopup(false)}
                        >
                            <button className="icon_button" aria-label="Carrito" onClick={handleCartClick}>
                                <svg viewBox="0 0 24 24" height="20" width="20">
                                    <path fillRule="evenodd" d="M12 2c-1.17 0-2.436.262-3.437.853-1.02.601-1.813 1.586-1.813 2.97v1.178H5.126L2 7.003V21h20V7h-4.75V5.872c0-1.4-.783-2.399-1.806-3.011C14.442 2.26 13.174 2 12 2Zm3.75 6.5V12h1.5V8.5h3.25v11h-17V8.502h3.25V12h1.5V8.5h7.5Zm0-1.5V5.872c0-.75-.389-1.313-1.076-1.724-.71-.424-1.692-.648-2.674-.648-.977 0-1.961.224-2.674.644-.694.41-1.076.962-1.076 1.679v1.178L15.75 7Z" />
                                </svg>
                                {totalProductos > 0 && (
                                    <span className="carrito-contador">{totalProductos}</span>
                                )}
                            </button>

                            {showCartPopup && totalProductos === 0 && (
                                <div className="cart-popup">
                                    <div className="cart-popup-content">
                                        <div className="cart-popup-empty-title">
                                            TU CARRITO ESTÁ VACÍO
                                        </div>
                                        <button
                                            className="cart-popup-empty-btn"
                                            onClick={() => navigate('/mujer')}
                                        >
                                            SEGUIR COMPRANDO
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Popup resumen carrito */}
                            {showCartPopup && totalProductos > 0 && (
                                <div className="cart-popup">
                                    <div className="cart-popup-content">
                                        <div className="cart-popup-title">
                                            Resumen de la compra
                                        </div>
                                        <div className="cart-popup-row">
                                            <span>Productos ({totalProductos})</span>
                                            <span>S/ {totalPrecio.toFixed(2)}</span>
                                        </div>
                                        <div className="cart-popup-row">
                                            <span>Delivery</span>
                                            <span className="cart-popup-delivery">GRATIS</span>
                                        </div>
                                        <div className="cart-popup-row">
                                            <span>Descuentos</span>
                                            <span className="cart-popup-discount">-S/ 0.00</span>
                                        </div>
                                        <hr />
                                        <div className="cart-popup-row cart-popup-total">
                                            <span>Total</span>
                                            <span>S/ {totalPrecio.toFixed(2)}</span>
                                        </div>
                                        <button
                                            className="cart-popup-btn"
                                            onClick={handleCartClick}
                                        >
                                            Continuar compra
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;