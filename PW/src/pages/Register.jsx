import React from "react";
import "../login.css"
import {Outlet, Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="login-contenedor">
                  <div className='left-login'>
                    <img src = './Mujer.png' width={800}/>
                  </div>
                  <div className='right-login'>
                    <div className='login-marco login-marco-register'>
                      <div className="login-titulo">
                        <h1>Crea una cuenta</h1>
                        <p>Empieza a disfrutar de muchos beneficios y a acumular puntos</p>
                      </div>
                        <form>
                          <label for="nombre">Nombre </label><br/>
                          <input type="nombre" id="nombre" name="nombre" placeholder="Tu nombre" autoFocus required /><br/>
                          <label for="email">Correo Electrónico</label><br/>
                          <input type="email" id="email" name="email" placeholder="Tu correo" required /><br/>
                          <label for="password">Contraseña</label><br/>
                          <input type="password" id="password" name="password" placeholder="Crea una contraseña" required /><br/>
                          <button id="submit" type="submit">Crear cuenta</button>
                          <hr className="footer-linea" />
                          <div className="link-register">
                            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                          </div>
                        </form>
                    </div>
                  </div>
                </div>
    )
}
export default Register;