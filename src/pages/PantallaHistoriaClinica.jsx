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
      <div className="w-3/5 flex flex-col items-center rounded pt-8 shadow-md text-left">
        <div className="mb-16 flex flex-col items-center rounded border p-8 shadow-md">
          <h2 className="mb-8 text-body-1 font-medium">Ver historia clinica</h2>
          <div className="flex flex-col items-center">
            <div className="flex mb-8 space-x-8">
              <Label className="inline-block" htmlFor="numeroSerie">Numero de serie: </Label>
              <Input
                id="numeroSerieInput"
                placeholder="numero de serie"
                type="text"
                onChange={(e) => manejarCambioNumeroSerie(e)}
              />
            </div>
            <Button className="px-12" size="xl" onClick={manejarClickBoton}>
              Buscar
            </Button>
          </div>
        </div>
        <div>
          {numeroSerie == "" ? null : (
            <HistoriaClinica numeroSerie={numeroSerie} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PantallaHistoriaClinica;
