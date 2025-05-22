import React from "react";
import "../login.css"
import {Outlet, Link } from 'react-router-dom';

const Confirmacion = () => {
    return (
            <div className="login-contenedor">
              <div className='left-login'>
                <img src = './Correo.png' width={850}/>
              </div>
              <div className='right-login'>
                <div className='login-marco'>
                  <div className="login-titulo">
                    <img src="hym.svg" width={50}/>
                    <p>En breve recibirás un correo con las instrucciones para el restablecimiento de tu contraseña</p>
                    <p><strong>Si no ves el correo, revisa tu bandeja de spam o promociones</strong></p>
                  </div>
                      <Link to="/login" className="btn-confirmacion">
                        <div className="btn-contenedor confirmar">
                            <p>Aceptar</p>
                        </div>
                      </Link>
                </div>
              </div>
            </div>
      );
}

export default Confirmacion;