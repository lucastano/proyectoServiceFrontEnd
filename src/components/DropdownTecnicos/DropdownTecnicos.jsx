import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownAction, DropdownContent, DropdownItem, DropdownList } from "keep-react";
import {
  useRolSesion,
  useEmailSesion,
  useTecnicos,
} from "../../store/selectors";

const DropdownTecnicos = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();

  if (!rolSesion || rolSesion !== "Administrador" || !emailSesion) {
    return null;
  }

  const tecnicos = useTecnicos();

  return (
    <>
      <Dropdown>
        <DropdownAction>Tecnicos</DropdownAction>
        <DropdownContent>
            <DropdownList>
                {tecnicos && tecnicos.map(tecnico => 
                    (<DropdownItem key={tecnico.id}><Link to={`/tecnico/${idTecnico}`}>{tecnico.nombre} {tecnico.apellido}</Link></DropdownItem>)
                )}
            </DropdownList>
        </DropdownContent>
      </Dropdown>
    </>
  );
};

export default DropdownTecnicos;
