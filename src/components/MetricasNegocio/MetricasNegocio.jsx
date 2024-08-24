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
  Label,
} from "keep-react";
import {
  useCantidadesPorParametro,
  useEstadosReparaciones,
  useEstadosReparacionesPorFechas,
  useTecnicosReparaciones,
  useTecnicosReparacionesPorFechas,
  useCantidadReparaciones,
  useCantidadReparacionesPorFechas,
} from "../../store/selectors";

function MetricasNegocio() {
  const [selected, setSelected] = useState(null);
  const conRangoFechas = selected !== null;

  const limpiarFechas = () => {
    setSelected(null);
  };
  function convertirAFechaISO(fechaString) {
    const fecha = new Date(fechaString);
    if (isNaN(fecha.getTime())) {
      return null;
    }
    return fecha.toISOString();
  }

  const fechaInicioISO = () => {
    if (conRangoFechas && selected) {
      const fromDate = new Date(selected.from);
      const toDate = new Date(selected.to);
      if (fromDate > toDate) {
        return convertirAFechaISO(selected.to);
      }
      return convertirAFechaISO(selected.from);
    }
    return null;
  };

  const fechaFinISO = () => {
    if (conRangoFechas && selected) {
      const fromDate = new Date(selected.from);
      const toDate = new Date(selected.to);
      if (fromDate > toDate) {
        return convertirAFechaISO(selected.from);
      }
      return convertirAFechaISO(selected.to);
    }
    return null;
  };

  const arrayTecnicos = conRangoFechas
    ? useTecnicosReparacionesPorFechas(fechaInicioISO(), fechaFinISO())
    : useTecnicosReparaciones();
  const objetoTecnicos = useCantidadesPorParametro(arrayTecnicos);
  const dataTecnicos = Object.entries(objetoTecnicos).map(([name, value]) => ({
    name,
    value,
  }));

  const arrayEstados = conRangoFechas
    ? useEstadosReparacionesPorFechas(fechaInicioISO(), fechaFinISO())
    : useEstadosReparaciones();
  const objetoEstados = useCantidadesPorParametro(arrayEstados);
  const dataEstados = Object.entries(objetoEstados).map(([name, value]) => ({
    name,
    value,
  }));

  const cantidadReparaciones = conRangoFechas
    ? useCantidadReparacionesPorFechas(fechaInicioISO(), fechaFinISO())
    : useCantidadReparaciones();

  return (
    <div>
      <p>Metricas Negocio</p>
      <div className="my-8 flex justify-center">
        <div>
          <Popover showArrow={false} placement="bottom-start">
            <PopoverTrigger asChild>
              <Button
                className="w-[286px] justify-start gap-2 rounded-xl border border-metal-50 px-4 text-left text-body-4 font-normal text-metal-600 hover:bg-white active:focus:scale-100 dark:border-metal-900 dark:bg-metal-900 dark:text-white dark:hover:bg-metal-800"
                variant="outline"
                color="secondary"
              >
                <Calendar
                  size={20}
                  className="text-metal-400 dark:text-white"
                />
                {selected ? (
                  <>
                    {format(selected?.from ?? new Date(), "dd/MM/yyyy")} -{" "}
                    {format(selected?.to ?? new Date(), "dd/MM/yyyy")}
                  </>
                ) : (
                  <span>Selecciona un rango de fechas</span>
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
        <div>
          <Button size="sm" onClick={limpiarFechas} disabled={selected == null}>
            Limpiar Filtro
          </Button>
        </div>
      </div>
      <Divider />
      {selected && (
        <p>
          Entre {format(selected?.from ?? new Date(), "dd/MM/yyyy")} y{" "}
          {format(selected?.to ?? new Date(), "dd/MM/yyyy")}
        </p>
      )}
      <div className="flex flex-col">
        <div id="ChartNumerosSerie" className="my-8 flex items-center">
          <Label htmlFor="reparacionesRealizadas">
            Reparaciones realizadas:
          </Label>
          <p className="ml-4">{cantidadReparaciones}</p>
        </div>
        <Divider />
        <div id="ChartEstados" className="my-8 text-left">
          <Label htmlFor="reparacionesPorEstado">
            Reparaciones por estado:
          </Label>
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
        <div id="ChartTecnicos" className="my-8 text-left">
          <Label htmlFor="reparacionesPorTecnico">
            Reparaciones por técnico:
          </Label>
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
