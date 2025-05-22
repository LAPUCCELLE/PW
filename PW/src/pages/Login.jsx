
import React from "react";
import {Outlet, Link } from 'react-router-dom';
import "../login.css"

const Login = () => {
  return (
        <div className="login-contenedor">
          <div className='left-login'>
            <img src = './Compras.png' width={850}/>
          </div>
          <div className='right-login'>
            <div className='login-marco'>
              <div className="login-titulo">
                <h1>Iniciar Sesión</h1>
              </div>
                <form>
                  <label for="email">Correo Electrónico *</label><br/>
                  <input type="email" id="email" name="email" placeholder="correo@ejemplo.com" autoFocus required/><br/>
                  <label for="password">Contraseña *</label><br/>
                  <input type="password" id="password" name="password" placeholder="••••••••" required /><br/>
                  <div className="link-password">
                    <Link to="/contraseña">¿Has olvidado tu contraseña?</Link>
                  </div>
                  <button id="submit" type="submit">Ingresar</button>
                  <hr className="footer-linea" />
                  <div className="link-register">
                    ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                  </div>
                </form>
            </div>
          </div>
        </div>
  );
};

export default Login;