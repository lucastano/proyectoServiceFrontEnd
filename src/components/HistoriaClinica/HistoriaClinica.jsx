import React, { useEffect, useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineContent,
  Spinner,
} from "keep-react";
import { getHistoriaClinica } from "../../dataFetcher";
import { format } from "date-fns";

function HistoriaClinica({ numeroSerie }) {
  const [historiaClinica, setHistoriaClinica] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistoriaClinica(numeroSerie);
      setHistoriaClinica(data);
      setIsLoading(false);
    };

    fetchData();
  }, [numeroSerie]);

  if (isLoading || !historiaClinica) {
    return <Spinner color="info" size="xl" />;
  }

  const {
    cantidadReparacionesRealizadas,
    gastoTotalEnReparaciones,
    reparacionesRealizadas,
  } = historiaClinica;

  return (
    <div>
      <h2 className="text-h2 font-bold text-metal-900 dark:text-white">
        Historia Clínica - {numeroSerie}{" "}
      </h2>
      {cantidadReparacionesRealizadas > 0 ? (<div>
        <div>
          <p>Cantidad de reparaciones: {cantidadReparacionesRealizadas}</p>
        </div>
        <div>
          <p>Gasto total: {gastoTotalEnReparaciones}</p>
        </div>
      </div>) : (<div><p>No hay reparaciones realizadas para ese numero de serie</p></div>)}
      <Timeline>
        {reparacionesRealizadas &&
          reparacionesRealizadas.map((reparacion) => (
            <TimelineItem key={reparacion.id}>
              <TimelinePoint />
              <TimelineContent>
                <p className="text-body-5 font-normal leading-[1.4] text-metal-400 dark:text-metal-300">
                  Fecha de entrega de reparación:{" "}
                  {format(new Date(reparacion.fechaEntregaReparacion), "dd-MM-yyyy HH:mm:ss")}
                </p>
                <h1 className="text-body-3 font-medium text-metal-900 dark:text-white">
                  Costo de reparación: {reparacion.costoReparacion}
                </h1>
                <p className="text-body-4 font-normal text-metal-600 dark:text-metal-300">
                  Descripción de problema: {reparacion.descripcionProblema}
                </p>
                <p className="text-body-4 font-normal text-metal-600 dark:text-metal-300">
                  Descripción de solución: {reparacion.descripcionSolucion}
                </p>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
    </div>
  );
}

export default HistoriaClinica;
