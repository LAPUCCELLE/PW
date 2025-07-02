import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../login.css";
//import usuariosPredefinidos from "../data/usuarios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/usuarios/login", {
        correo: email, 
        password: password
      });

      const usuario = response.data;
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      window.dispatchEvent(new Event("storage")); // Notificacion al navbar

      // Redireaccionar segùn el rol
      if (usuario.rol == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      alert("Correo o contraseña incorrectos");
    }
        
    //const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    //const historialUsuarios = JSON.parse(localStorage.getItem("HistorialdeUsuarios")) || [];

    //const mapUsuarios = new Map();

      /*usuariosPredefinidos.forEach(u => {
        mapUsuarios.set(u.correo, u);
      });

      usuariosRegistrados.forEach(u => {
        mapUsuarios.set(u.correo, u);
      });

      historialUsuarios.forEach(u => {
      mapUsuarios.set(u.correo, u);
      });

const todosLosUsuarios = Array.from(mapUsuarios.values());

    const usuario = todosLosUsuarios.find(
      (u) => u.correo === email && u.password === password
    );

    if (usuario) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      window.dispatchEvent(new Event("storage"));

      const lista = JSON.parse(localStorage.getItem("HistorialdeUsuarios")) || [];
      const yaExiste = lista.some((u) => u.id === usuario.id);

      if (!yaExiste) {
        lista.push({
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          password: usuario.password,
          rol: usuario.rol
        });
        localStorage.setItem("HistorialdeUsuarios", JSON.stringify(lista));
      }

      if (usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert("Correo o contraseña incorrectos");
    }*/
  };

  return (
    <div className="login-contenedor">
      <div className="left-login">
        <img src='./Compras.png' width={850} alt="Imagen login" />
      </div>
      <div className="right-login">
        <div className="login-marco">
          <div className="login-titulo">
            <h1>Iniciar Sesión</h1>
          </div>
          <form onSubmit={manejarLogin}>
            <label htmlFor="email">Correo Electrónico *</label><br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              autoFocus
              required
            /><br />
            <label htmlFor="password">Contraseña *</label><br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            /><br />
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
