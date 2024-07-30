import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import MetricasNegocio from "../components/MetricasNegocio/MetricasNegocio";

const PantallaLandingAdmin = () => {
    const rolSesion = useRolSesion();
    const emailSesion = useEmailSesion();

    if (!rolSesion || rolSesion != "Administrador" || !emailSesion) {
        return null;
    }

  return (
    <div className="flex">
      <ComponenteNavbar className="w-1/3" />
      <MetricasNegocio className="w-2/3" />
    </div>
  );
}

export default PantallaLandingAdmin;
