import React from "react";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import AgregarProducto from "../components/AgregarProducto/AgregarProducto";

const PantallaAgregarProducto = () => {
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
        <AgregarProducto />
      </div>
    </div>
  );
};

export default PantallaAgregarProducto;
