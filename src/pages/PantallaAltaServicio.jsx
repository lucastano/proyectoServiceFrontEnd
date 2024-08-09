import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import FormularioAltaServicio from "../components/FormularioAltaServicio/FormularioAltaServicio";
import { useRolSesion, useEmailSesion } from "../store/selectors";

const PantallaAltaServicio = () => {
    const rolSesion = useRolSesion();
    const emailSesion = useEmailSesion();

    if (!rolSesion || rolSesion == "Cliente" || !emailSesion) {
        return null;
    }


  return (
    <div className="flex">
      <div className="w-1/4">
      <ComponenteNavbar />
      </div>
      <div className="flex justify-center w-3/4">
        <FormularioAltaServicio />
      </div>
    </div>
  );
}

export default PantallaAltaServicio;
