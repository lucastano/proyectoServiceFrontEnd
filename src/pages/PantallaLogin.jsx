import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import ContenedorOpcionesLogin from "../components/ContenedorOpcionesLogin/ContenedorOpcionesLogin";
import { useRolSesion, useEmailSesion } from "../store/selectors";

const PantallaLogin = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();

  if (rolSesion || emailSesion) {
    return null;
  }

  return (
    <div className="flex ">
      <div className="w-1/4">
      <ComponenteNavbar />
      </div>
      <div className="flex justify-center w-3/4">
        <ContenedorOpcionesLogin />
      </div>
    </div>
  );
};

export default PantallaLogin;