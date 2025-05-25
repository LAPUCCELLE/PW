import { useEffect, useState } from "react";

const UseUsuariosLogueados = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("HistorialdeUsuarios");

    if (data) {
      try {
        const usuariosParseados = JSON.parse(data);
        const usuariosValidos = usuariosParseados.filter(
          (u) => u.correo && u.id && u.nombre && u.password && u.rol 
        );
        setUsuarios(usuariosValidos);
      } catch (e) {
        console.error("Error al leer usuarios logueados:", e);
      }
    }
  }, []);

  return usuarios;
};

export default UseUsuariosLogueados;