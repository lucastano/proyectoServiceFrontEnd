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
      <ComponenteNavbar className="w-1/3" />
      <FormularioAltaServicio className="w-2/3" />
    </div>
  );
}

export default PantallaAltaServicio;
