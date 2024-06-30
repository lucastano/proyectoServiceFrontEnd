import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ButtonGroup,
  Button,
  Input,
  DatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
  DropdownList,
} from "keep-react";
import { Calendar } from "phosphor-react";
import { format, parseISO } from "date-fns";
import {
  useRolSesion,
  useServicios,
  useCedulaSesion,
} from "../../store/selectors";

const ListaVisualizacionServiciosCliente = () => {
  const servicios = useServicios();
  const rolSesion = useRolSesion();
  const cedulaSesion = useCedulaSesion();

  const [tipoFiltro, setTipoFiltro] = useState("");
  const [stringFiltro, setStringFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");

  if (!rolSesion || rolSesion !== "cliente") {
    return null;
  }
  //orden de servicio,
  //fecha y estado

  //lista servicios
  //rolSesion
  //cedulaSesion

  const manejarCambioNumeroOrden = (e) => {
    tipoFiltro == "Numero de orden" && setStringFiltro(e.target.value);
  };

  const manejarCambioTipoFiltro = (tipo) => {
    setFechaFiltro("");
    setStringFiltro("");
    setTipoFiltro(tipo);
  };

  const manejarCambioEstado = (estado) => {
    tipoFiltro === "Estado" && setStringFiltro(estado);
  };

  const serviciosFiltrados = () => {
    if (tipoFiltro == "Numero de orden") {
      return servicios.filter((servicio) => servicio.id.includes(stringFiltro));
    } else if (tipoFiltro == "Fecha") {
      const fechaFiltroFormateada = format(parseISO(fechaFiltro), 'yyyy-MM-dd');
      return servicios.filter((servicio) =>
        format(parseISO(servicio.fecha), 'yyyy-MM-dd') === fechaFiltroFormateada
      );
    } else if (tipoFiltro == "Estado") {
      return servicios.filter((servicio) =>
        servicio.estado.includes(stringFiltro)
      );
    } else {
      return servicios;
    }
  };

  return (
    <>
      <div>
        <ButtonGroup>
          <Button
            position="start"
            onClick={manejarCambioTipoFiltro("Numero de orden")}
          >
            Numero de orden
          </Button>
          <Button position="center" onClick={manejarCambioTipoFiltro("Fecha")}>
            Fecha
          </Button>
          <Button position="end" onClick={manejarCambioTipoFiltro("Estado")}>
            Estado
          </Button>
        </ButtonGroup>
      </div>
      <div>
        {tipoFiltro === "Numero de orden" && (
          <Input
            placeholder="Escriba numero de orden"
            type="text"
            onChange={(e) => manejarCambioNumeroOrden(e)}
          />
        )}
        {tipoFiltro === "Fecha" && (
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
                {date ? (
                  format(date ?? new Date(), "PPP")
                ) : (
                  <span>Selecciona una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="z-50 max-w-min">
              <DatePicker
                mode="single"
                selected={fechaFiltro}
                onSelect={setFechaFiltro}
                showOutsideDays={true}
              />
            </PopoverContent>
          </Popover>
        )}
        {tipoFiltro === "Estado" && (
          <Dropdown>
            <DropdownAction>Seleccione estado</DropdownAction>
            <DropdownContent>
              <DropdownList>
                <DropdownItem onClick={manejarCambioEstado("En Taller")}>
                  En Taller
                </DropdownItem>
                <DropdownItem onClick={manejarCambioEstado("En Progreso")}>
                  En Progreso
                </DropdownItem>
                <DropdownItem onClick={manejarCambioEstado("Presupuestado")}>
                  Presupuestado
                </DropdownItem>
                <DropdownItem onClick={manejarCambioEstado("Finalizado")}>
                  Finalizado
                </DropdownItem>
                <DropdownItem onClick={manejarCambioEstado("Entregado")}>
                  Entregado
                </DropdownItem>
              </DropdownList>
            </DropdownContent>
          </Dropdown>
        )}
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>
                <div className="w-[80px]">Numero de orden</div>
              </TableHead>
              <TableHead>
                <div className="max-w-[250px]">Nombre</div>
              </TableHead>
              <TableHead>
                <div className="w-[80px]">Fecha</div>
              </TableHead>
              <TableHead>
                <div className="w-[80px]">Costo</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviciosFiltrados.forEach((servicio) => (
              <TableRow key={servicio.id}>
                <TableCell>{servicio.id}</TableCell>
                <div className="max-w-[250px] truncate">{servicio.nombre}</div>
                <TableCell>{servicio.fecha}</TableCell>
                <TableCell>{servicio.costo}</TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ListaVisualizacionServiciosCliente;
