import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import FormularioAltaTecnico from "../components/FormularioAltaTecnico/FormularioAltaTecnico";
import { useRolSesion, useEmailSesion } from "../store/selectors";

const PantallaAltaTecnico = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();

  if (!rolSesion || rolSesion != "Administrador" || !emailSesion) {
      return null;
  }

  return (
    <div className="flex">
      <ComponenteNavbar className="w-1/3" />
      <FormularioAltaTecnico className="w-2/3" />
    </div>
  );
}

export default PantallaAltaTecnico;
