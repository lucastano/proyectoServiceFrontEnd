import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import ListaVisualizacionServiciosCliente from "../components/ListaVisualizacionServicios/ListaVisualizacionServiciosCliente";

const PantallaLandingTecnico = () => {
    const rolSesion = useRolSesion();
    const emailSesion = useEmailSesion();

    if (!rolSesion || rolSesion != "Cliente" || !emailSesion) {
        return null;
    }

  return (
    <div className="flex">
      <ComponenteNavbar className="w-1/3" />
      <ListaVisualizacionServiciosCliente className="w-2/3" />
    </div>
  );
}

export default PantallaLandingTecnico;