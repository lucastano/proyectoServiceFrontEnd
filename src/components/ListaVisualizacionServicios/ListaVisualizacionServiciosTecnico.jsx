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
import { format } from "date-fns";
import { useServicios } from "../../store/selectors";
import OpcionesPresupuesto from "../OpcionesPresupuesto/OpcionesPresupuesto";
import OpcionesTerminarEntregar from "../OpcionesTerminarEntregar/OpcionesTerminarEntregar";
import ModalEditarPresupuestoServicio from "../ModalEditarPresupuestoServicio/ModalEditarPresupuestoServicio";

const ListaVisualizacionServiciosTecnico = () => {
  const servicios = useServicios();
  const [selected, setSelected] = useState(null);
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [stringFiltro, setStringFiltro] = useState("");

  const manejarCambioNumeroOrden = (e) => {
    tipoFiltro == "Numero de orden" && setStringFiltro(e.target.value);
  };

  const manejarCambioTipoFiltro = (tipo) => {
    setSelected(null);
    setStringFiltro("");
    setTipoFiltro(tipo);
  };

  const manejarCambioEstado = (estado) => {
    tipoFiltro === "Estado" && setStringFiltro(estado);
  };

  let serviciosFiltrados;

  const filtrarServicios = () => {
    if (tipoFiltro == "Numero de orden") {
      return servicios.filter((servicio) => servicio.id.includes(stringFiltro));
    } else if (tipoFiltro == "Fecha") {
      if (selected == null || selected.from == null || selected.to == null)
        return servicios;

      const fechaFiltroFromDate = new Date(selected.from);
      const fechaFiltroToDate = new Date(selected.to);

      return servicios.filter((servicio) => {
        const servicioFecha = new Date(servicio.fecha);
        return (
          servicioFecha >= fechaFiltroFromDate &&
          servicioFecha <= fechaFiltroToDate
        );
      });
    } else if (tipoFiltro == "Estado") {
      return servicios.filter((servicio) =>
        servicio.estado.includes(stringFiltro)
      );
    } else {
      return servicios;
    }
  };

  filtrarServicios();

  return (
    <>
      <div className="flex flex-col ml-16">
        <div>
          <ButtonGroup>
            <Button
              position="start"
              onClick={() => manejarCambioTipoFiltro("Numero de orden")}
            >
              Numero de orden
            </Button>
            <Button
              position="center"
              onClick={() => manejarCambioTipoFiltro("Fecha")}
            >
              Fecha
            </Button>
            <Button
              position="end"
              onClick={() => manejarCambioTipoFiltro("Estado")}
            >
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
                  mode={"range"}
                  selected={selected}
                  onSelect={setSelected}
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
                  <DropdownItem
                    onClick={() => manejarCambioEstado("En Taller")}
                  >
                    En Taller
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => manejarCambioEstado("En Progreso")}
                  >
                    En Progreso
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => manejarCambioEstado("Presupuestado")}
                  >
                    Presupuestado
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => manejarCambioEstado("Finalizado")}
                  >
                    Finalizado
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => manejarCambioEstado("Entregado")}
                  >
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
                  <div className="max-w-[250px]">Producto</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px]">Fecha</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px]">Costo</div>
                </TableHead>
                <TableHead>
                  <div className="w-[250px]">Presupuesto</div>
                </TableHead>
                <TableHead>
                  <div className="w-[250px]">Modificar</div>
                </TableHead>
                <TableHead>
                  <div className="max-w-[250px]">Otros</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviciosFiltrados &&
                serviciosFiltrados.forEach((servicio) => (
                  <TableRow key={servicio.id}>
                    <TableCell>{servicio.id}</TableCell>
                    <TableCell>
                      <div className="max-w-[250px] truncate">
                        {servicio.producto}
                      </div>
                    </TableCell>
                    <TableCell>{servicio.fecha}</TableCell>
                    <TableCell>{servicio.costo}</TableCell>
                    <TableCell>
                      <OpcionesPresupuesto idServicio={servicio.id} />
                    </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <ModalEditarPresupuestoServicio
                          idServicio={servicio.id}
                        />
                        <ModalEditarServicio idServicio={servicio.id} />
                      </ButtonGroup>
                    </TableCell>
                    <TableCell>
                      <OpcionesTerminarEntregar idServicio={servicio.id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListaVisualizacionServiciosTecnico;
