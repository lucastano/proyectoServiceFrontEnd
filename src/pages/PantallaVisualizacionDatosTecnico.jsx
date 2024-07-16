import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import VisualizacionDatosTecnico from "../components/VisualizacionDatosTecnico/VisualizacionDatosTecnico";

const PantallaVisualizacionDatosTecnico = (idTecnico) => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();

  if (!rolSesion || rolSesion != "Administrador" || !emailSesion) {
      return null;
  }

  return (
    <div className="flex">
      <ComponenteNavbar className="w-1/3" />
      <VisualizacionDatosTecnico className="w-2/3" idTecnico={idTecnico}/>
    </div>
  );
}

export default PantallaVisualizacionDatosTecnico;
