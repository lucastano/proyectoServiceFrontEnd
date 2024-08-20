import React, { useState } from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import HistoriaClinica from "../components/HistoriaClinica/HistoriaClinica";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import { Input, Label, Button } from "keep-react";

export const PantallaHistoriaClinica = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();
  const [numeroSerie, setNumeroSerie] = useState("");
  const [tempNumeroSerie, setTempNumeroSerie] = useState("");

  if (!rolSesion || rolSesion == "Cliente" || !emailSesion) {
    return null;
  }

  const manejarCambioNumeroSerie = (e) => {
    setTempNumeroSerie(e.target.value);
  };

  const manejarClickBoton = () => {
    setNumeroSerie(tempNumeroSerie);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <ComponenteNavbar />
      </div>
      <div className="flex justify-center w-3/4">
        <fieldset className="max-w-md space-y-1">
          <Label htmlFor="name">Ingrese numero de serie</Label>
          <Input
            id="name"
            placeholder="Ingrese numero de serie"
            type="text"
            onChange={(e) => manejarCambioNumeroSerie(e)}
          />
          <Button onClick={manejarClickBoton}>Buscar</Button>
        </fieldset>
        {numeroSerie == "" ? null : (
          <HistoriaClinica numeroSerie={numeroSerie} />
        )}
      </div>
    </div>
  );
};

export default PantallaHistoriaClinica;
