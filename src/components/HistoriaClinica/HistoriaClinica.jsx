import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineContent,
} from "keep-react";
import { format } from "date-fns";

function HistoriaClinica({ numeroSerie, historiaClinica }) {

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
      {cantidadReparacionesRealizadas > 0 ? (<div className="mb-8 space-y-2 ">
        <div>
          <p>Cantidad de reparaciones: {cantidadReparacionesRealizadas}</p>
        </div>
        <div>
          <p>Gasto total: ${gastoTotalEnReparaciones}</p>
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
                  Costo de reparación: ${reparacion.costoReparacion}
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
