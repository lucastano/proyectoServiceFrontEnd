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
      <div className="w-1/4">
        <ComponenteNavbar />
      </div>
      <div className="flex justify-center w-3/4">
        <MetricasNegocio />
      </div>
    </div>
  );
};

export default PantallaLandingAdmin;
