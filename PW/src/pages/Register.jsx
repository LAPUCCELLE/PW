import React, { useState } from "react";
import "../login.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [genero, setGenero] = useState("desconocido");
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post("http://localhost:3000/api/usuarios", {
        nombre,
        correo,
        password,
        rol: "usuario",
        genero: "sin especificar"
      });

      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("Este correo ya está registrado.");
      } else {
        console.error("Error al registrar:", error);
        alert("Ocurrió un error al registrar el usuario.");
      }
    }
    //const usuariosGuardados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    
    /*const yaExiste = usuariosGuardados.some((u) => u.correo === correo);
    if (yaExiste) {
      alert("Este correo ya está registrado.");
      return;
    }

    const nuevoUsuario = {
      id: `U-${Date.now()}`,
      nombre,
      correo,
      password,
      rol: "cliente"
    };

    const nuevosUsuarios = [...usuariosGuardados, nuevoUsuario];
    localStorage.setItem("usuariosRegistrados", JSON.stringify(nuevosUsuarios));

    const historial = JSON.parse(localStorage.getItem("HistorialdeUsuarios")) || [];
    const yaEsta = historial.some((u) => u.id === nuevoUsuario.id);
    if (!yaEsta) {
      historial.push(nuevoUsuario); 
      localStorage.setItem("HistorialdeUsuarios", JSON.stringify(historial));
    }

    // Redirigir a /login
    navigate("/login");*/
  };

  return (
    <div className="login-contenedor">
      <div className="left-login">
        <img src="./Mujer.png" width={800} />
      </div>
      <div className="right-login">
        <div className="login-marco login-marco-register">
          <div className="login-titulo">
            <h1>Crea una cuenta</h1>
            <p>Empieza a disfrutar de muchos beneficios y a acumular puntos</p>
          </div>
          <form onSubmit={manejarRegistro}>
            <label htmlFor="nombre">Nombre </label><br />
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              autoFocus
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            /><br />
            <label htmlFor="email">Correo Electrónico</label><br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu correo"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            /><br />
            <label htmlFor="password">Contraseña</label><br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Crea una contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br />
            <label htmlFor="genero">Género</label><br/>
            <select
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select><br /><br />
            <button id="submit" type="submit">Crear cuenta</button>
            <hr className="footer-linea" />
            <div className="link-register">
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

