import React from "react";
import "../login.css"
import {Outlet, Link } from 'react-router-dom';

const Contraseña = () => {
  return (
        <div className="login-contenedor">
          <div className='left-login'>
            <img src = './password.png' width={850}/>
          </div>
          <div className='right-login'>
            <div className='login-marco'>
              <div className="login-titulo">
                <h1>Recuperar contraseña</h1>
                <p>Te enviaremos un email con las intrucciones para recuperar tu contraseña</p>
              </div>
                <form>
                  <label for="email">Correo Electrónico *</label><br/>
                  <input type="email" id="email" name="email" placeholder="correo@ejemplo.com" autoFocus required /><br/>
                  <Link to="/Confirmacion" className="btn-confirmar">
                    <div className="btn-contenedor confirmar">
                        <p>Continuar</p>
                    </div>
                  </Link>
                  <Link to="/login" className="btn-atras">
                    <div className="btn-contenedor atras">
                        <p>Regresar</p>
                    </div>
                  </Link>
                </form>
            </div>
          </div>
        </div>
  );
};

export default Contraseña;