import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import FormularioAltaTecnico from "../components/FormularioAltaTecnico/FormularioAltaTecnico";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import { useNavigate } from "react-router-dom";

const PantallaAltaTecnico = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();
  const navigate = useNavigate();

  if (!rolSesion || rolSesion != "Administrador" || !emailSesion) {
      navigate('/')
  }
  
  return (
    <div className="flex">
      <div className="w-1/4">
      <ComponenteNavbar />
      </div>
      <div className="flex justify-center w-3/4">
        <FormularioAltaTecnico />
      </div>
    </div>
  );
}

export default PantallaAltaTecnico;
