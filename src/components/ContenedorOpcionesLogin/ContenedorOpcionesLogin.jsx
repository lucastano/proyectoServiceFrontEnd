import React from "react";
import { ModalLoginCliente } from "./ModalLoginCliente/ModalLoginCliente";
import { ModalLoginTecnico } from "./ModalLoginTecnico/ModalLoginTecnico";
import { ModalLoginAdmin } from "./ModalLoginAdmin/ModalLoginAdmin";
import ModalRecuperarPassword from "../ModalRecuperarPassword/ModalRecuperarPassword";

const ContenedorOpcionesLogin = () => {
  return (
    <div className="flex flex-col space-y-4 border rounded-lg shadow-md p-11">
      <h1>Login</h1>
      <h2>Seleccione una opción de acceso</h2>
      <div className="flex space-x-4">
        <ModalLoginCliente />
        <ModalLoginAdmin />
        <ModalLoginTecnico />
        <ModalRecuperarPassword />
      </div>
    </div>
  );
};

export default ContenedorOpcionesLogin;
