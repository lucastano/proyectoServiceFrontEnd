import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import ListaVisualizacionServiciosTecnico from "../components/ListaVisualizacionServicios/ListaVisualizacionServiciosTecnico";

const PantallaLandingTecnico = () => {
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
        <ListaVisualizacionServiciosTecnico className="w-2/3" />
      </div>
    </div>
  );
};

export default PantallaLandingTecnico;
