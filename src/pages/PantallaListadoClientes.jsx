import React from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import ListadoClientes from "../components/ListadoClientes/ListadoClientes";

const PantallaListadoClientes = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <ComponenteNavbar />
      </div>
      <div className="w-4/5">
        <ListadoClientes />
      </div>
    </div>
  );
};

export default PantallaListadoClientes;
