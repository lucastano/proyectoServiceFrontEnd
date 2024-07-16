import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import { useRolSesion, useEmailSesion } from "../store/selectors";

const PantallaLandingAdmin = () => {
    const rolSesion = useRolSesion();
    const emailSesion = useEmailSesion();

    if (!rolSesion || rolSesion != "Administrador" || !emailSesion) {
        return null;
    }

  return (
    <div className="flex">
      <ComponenteNavbar className="w-1/3" />
      {/* ACA VA LO DE METRICAS */}
    </div>
  );
}

export default PantallaLandingAdmin;
