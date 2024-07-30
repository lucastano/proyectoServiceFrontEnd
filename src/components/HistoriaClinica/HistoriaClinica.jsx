import React, { useEffect, useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineContent,
} from "keep-react";
import { getHistoriaClinica } from "../../dataFetcher";

function HistoriaClinica({ numeroSerie }) {
  const [historiaClinica, setHistoriaClinica] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistoriaClinica(numeroSerie);
      setHistoriaClinica(data);
    };

    fetchData();
  }, [numeroSerie]);

  if (!historiaClinica) {
    return <div>Cargando...</div>;
  }

  const {
    cantidadReparacionesRealizadas,
    gastoTotalEnReparaciones,
    reparacionesRealizadas,
  } = historiaClinica;

  return (
    <div>
      <h1 className="text-h2 font-bold text-metal-900 dark:text-white">
        Historia Clínica - {numeroSerie}{" "}
      </h1>
      <div>
        <div>
          <p>Cantidad de reparaciones: {cantidadReparacionesRealizadas}</p>
        </div>
        <div>
          <p>Gasto total: {gastoTotalEnReparaciones}</p>
        </div>
      </div>
      <Timeline>
        {reparacionesRealizadas &&
          reparacionesRealizadas.forEach(() => {
            <TimelineItem>
              <TimelinePoint />
              <TimelineContent>
                <p className="text-body-5 font-normal leading-[1.4] text-metal-400 dark:text-metal-300">
                  {reparacion.fechaEntregaReparacion}
                </p>
                <h1 className="text-body-3 font-medium text-metal-900 dark:text-white">
                  {reparacion.costoReparacion}
                </h1>
                <p className="text-body-4 font-normal text-metal-600 dark:text-metal-300">
                  {reparacion.descripcionProblema}
                </p>
                <p className="text-body-4 font-normal text-metal-600 dark:text-metal-300">
                  {reparacion.descripcionSolucion}
                </p>
              </TimelineContent>
            </TimelineItem>;
          })}
      </Timeline>
    </div>
  );
}

export default HistoriaClinica;
