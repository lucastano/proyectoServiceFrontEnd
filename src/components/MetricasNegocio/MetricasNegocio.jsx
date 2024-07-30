import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "phosphor-react";
import {
  Button,
  DatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Pie,
  ChartTooltip,
  PieChart,
  ResponsiveContainer,
  CustomTooltip,
  Divider,
} from "keep-react";
import {
  useCantidadesPorParametro,
  useEstadosReparaciones,
  useEstadosReparacionesPorFechas,
  useNumeroSerieReparaciones,
  useNumerosSerieReparacionesPorFechas,
  useTecnicosReparaciones,
  useTecnicosReparacionesPorFechas,
} from "../../store/selectors";

function MetricasNegocio() {
  const [selected, setSelected] = useState(null);
  const conRangoFechas = selected !== null;

  function convertirAFechaISO(fechaString) {
    const fecha = new Date(fechaString);
    return fecha.toISOString();
  }

  const fechaInicioISO = () => {
    return conRangoFechas ? convertirAFechaISO(selected.from) : null;
  };

  const fechaFinISO = () => {
    return conRangoFechas ? convertirAFechaISO(selected.to) : null;
  };

  const arrayNumerosSerie = conRangoFechas
    ? useNumerosSerieReparacionesPorFechas(fechaInicioISO, fechaFinISO)
    : useNumeroSerieReparaciones();
  const objetoNumerosSerie = useCantidadesPorParametro(arrayNumerosSerie);
  const dataNumerosSerie = Object.entries(objetoNumerosSerie).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const arrayTecnicos = conRangoFechas
    ? useTecnicosReparacionesPorFechas(fechaInicioISO, fechaFinISO)
    : useTecnicosReparaciones();
  const objetoTecnicos = useCantidadesPorParametro(arrayTecnicos);
  const dataTecnicos = Object.entries(objetoTecnicos).map(([name, value]) => ({
    name,
    value,
  }));

  const arrayEstados = conRangoFechas
    ? useEstadosReparacionesPorFechas(fechaInicioISO, fechaFinISO)
    : useEstadosReparaciones();
  const objetoEstados = useCantidadesPorParametro(arrayEstados);
  const dataEstados = Object.entries(objetoEstados).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>
      <p>Metricas Negocio</p>
      <div>
        <Popover showArrow={false} placement="bottom-start">
          <PopoverTrigger asChild>
            <Button
              className="w-[286px] justify-start gap-2 rounded-xl border border-metal-50 px-4 text-left text-body-4 font-normal text-metal-600 hover:bg-white active:focus:scale-100 dark:border-metal-900 dark:bg-metal-900 dark:text-white dark:hover:bg-metal-800"
              variant="outline"
              color="secondary"
            >
              <Calendar size={20} className="text-metal-400 dark:text-white" />
              {selected ? (
                <>
                  {format(selected?.from ?? new Date(), "LLL dd, y")} -{" "}
                  {format(selected?.to ?? new Date(), "LLL dd, y")}
                </>
              ) : (
                <span>Select Your Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-50 max-w-min">
            <DatePicker
              mode="range"
              selected={selected}
              onSelect={setSelected}
              showOutsideDays={true}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Divider />
      {selected && (
        <p>
          Entre {fechaInicioISO} y {fechaFinISO}
        </p>
      )}
      <div className="flex justify-between">
        <div id="ChartNumerosSerie">
          <p>Aparatos Ingresados</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                labelLine={false}
                data={dataNumerosSerie}
                dataKey="value"
                nameKey="name"
                fill="#1C222B"
              ></Pie>
              <ChartTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <Divider />
        <div id="ChartEstados">
          <p>Desglose por Estado</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                labelLine={false}
                data={dataEstados}
                dataKey="value"
                nameKey="name"
                fill="#1C222B"
              ></Pie>
              <ChartTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <Divider />
        <div id="ChartTecnicos">
          <p>Reparaciones por Técnico</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                cx="50%"
                cy="50%"
                labelLine={false}
                data={dataTecnicos}
                dataKey="value"
                nameKey="name"
                fill="#1C222B"
              ></Pie>
              <ChartTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MetricasNegocio;
