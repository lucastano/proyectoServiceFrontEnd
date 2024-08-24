import React from "react";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import FormularioAgregarProducto from "../components/FormularioAgregarProducto/FormularioAgregarProducto";
import ListaProductos from "../components/ListaProductos/ListaProductos";

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
      <div className="w-3/4">
        <FormularioAgregarProducto />
        <ListaProductos />
      </div>
    </div>
  );
};

export default PantallaAgregarProducto;
