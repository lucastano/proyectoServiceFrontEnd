import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import ContenedorOpcionesLogin from "../components/ContenedorOpcionesLogin/ContenedorOpcionesLogin";
import { useRolSesion, useEmailSesion } from "../store/selectors";

const PantallaLogin = () => {
    const rolSesion = useRolSesion();
    const emailSesion = useEmailSesion();

    if (rolSesion || emailSesion) {
        return null;
    }
    
  return (
    <div className="flex">
      <ComponenteNavbar className="w-1/3" />
      <ContenedorOpcionesLogin className="w-2/3" />
    </div>
  );
}

export default PantallaLogin;
