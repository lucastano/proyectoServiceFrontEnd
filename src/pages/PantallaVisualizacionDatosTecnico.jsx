import React from "react";
import { useParams } from "react-router-dom";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import VisualizacionDatosTecnico from "../components/VisualizacionDatosTecnico/VisualizacionDatosTecnico";

const PantallaVisualizacionDatosTecnico = () => {
  const { idTecnico } = useParams();
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
        <VisualizacionDatosTecnico idTecnico={idTecnico} className="w-2/3" />
      </div>
    </div>
  );
};

export default PantallaVisualizacionDatosTecnico;
