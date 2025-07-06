import React, { useState} from 'react';
import axios from "axios";
import "../cambioContraseña.css";

const cambiar_contrasena = () => {
    const [actual, setActual] = useState("");
    const [nueva, setNueva] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleCambio = async () => {
        //  const usuarios = JSON.parse(localStorage.getItem("HistorialdeUsuarios")) || [];
        const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if (!usuarioLogueado) {
            setMensaje("Ningun usuario está logueado");
            return;
        }

        // Validar contraseña actual coincida con la antigua
        try {
            const response = await axios.get("http://localhost:3000/api/usuarios");
            const usuarioReal = response.data.find(u => u.correo === usuarioLogueado.correo);
            
            if (!usuarioReal) {
                setMensaje("Usuario no encontrado");
                return;
            }

            if (usuarioReal.password !== actual) {
                setMensaje("Contraseña actual incorrecta");
                return;
            }

            await axios.put(`http://localhost:3000/api/usuarios/${usuarioReal.id}/cambiar-password`, {
                nuevoPassword: nueva
            });

            setMensaje("Contraseña cambiada exitosamente");
            setActual("");
            setNueva("");
        } catch (error) {
            console.error(error);
            setMensaje("Error al cambiar la contraseña");
        }


        /*const emailLogueado = usuarioLogueado.correo; 
        const index = usuarios.findIndex(u => u.correo === emailLogueado);
        if (index === -1) {
            setMensaje("Usuario no encontrado");
            return;
        }

        if (usuarios[index].password !== actual) {
            setMensaje("Contraseña actual incorrecta");
            return;
        }

        usuarios[index].password = nueva;
        localStorage.setItem("HistorialdeUsuarios", JSON.stringify(usuarios));
        setMensaje("Contraseña cambiada exitosamente ✅");
        setActual("");
        setNueva("");*/
    };

    return <>
        <div className="contraseña_container">
            <div className="contraseña_left">

            </div>
            <div className="contraseña_right">
                <div className="contraseña_form">
                    <h1>Cambiar contraseña</h1>
                    <p>Ingrese su contraseña actual *</p>
                    <input type="password" value={actual} onChange={e => setActual(e.target.value)}/>
                    <p>Ingrese nueva contraseña *</p> 
                    <input type="password" value={nueva} onChange={e => setNueva(e.target.value)}/>
                    <button className="btn-confirmar" onClick={handleCambio}>CONFIRMAR</button>
                    {mensaje && <p style={{ marginTop: "1rem", color: mensaje.includes("exitosamente") ? "green" : "red" }}>{mensaje}</p>}
                </div>
            </div>
        </div>
    </>
}



export default cambiar_contrasena;