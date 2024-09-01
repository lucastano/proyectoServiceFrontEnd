import React, { useState } from "react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import HistoriaClinica from "../components/HistoriaClinica/HistoriaClinica";
import { Input, Label, Button, toast, Spinner } from "keep-react";
import { getHistoriaClinica } from "../dataFetcher";

export const PantallaHistoriaClinica = () => {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [historiaClinica, setHistoriaClinica] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const manejarCambioNumeroSerie = (e) => {
    setNumeroSerie(e.target.value);
  };

  const manejarClickBoton = async () => {
    try {
      setIsLoading(true);
      const data = await getHistoriaClinica(numeroSerie);
      setHistoriaClinica(data);
    } catch (error) {
      toast.error("No se han conseguido reparaciones para ese numero de serie");
      setHistoriaClinica(null);
    } finally {
      setIsLoading(false);
    }
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
              <Label className="inline-block" htmlFor="numeroSerie">
                Numero de serie:{" "}
              </Label>
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
          {isLoading ? (
            <>
              <Spinner color="info" size="xl" />
            </>
          ) : null}
          {historiaClinica == null ? null : (
            <HistoriaClinica
              numeroSerie={numeroSerie}
              historiaClinica={historiaClinica}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PantallaHistoriaClinica;
