
import React from "react";
import {Outlet, Link } from 'react-router-dom';
import "../login.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const manejarLogin = (e) => {
    e.preventDefault();

    const lista = JSON.parse(localStorage.getItem("HistorialdeUsuarios")) || [];

    const usuario = lista.find(
      (u) => u.correo === email && u.password === password
    );

  
    if (usuario) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    }else {
      alert("Correo o contraseña incorrectos");
    }
  };
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
                <form onSubmit={manejarLogin}>
                  <label for="email">Correo Electrónico *</label><br/>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" autoFocus required/><br/>
                  <label for="password">Contraseña *</label><br/>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required /><br/>
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