import React, { useState, useEffect } from "react";
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
  toast
} from "keep-react";
import { Calendar, WarningCircle } from "phosphor-react";
import { format } from "date-fns";
import { useServicios } from "../../store/selectors";
import OpcionesPresupuesto from "../OpcionesPresupuesto/OpcionesPresupuesto";
import OpcionesTerminarEntregar from "../OpcionesTerminarEntregar/OpcionesTerminarEntregar";
import ModalEditarPresupuestoServicio from "../ModalEditarPresupuestoServicio/ModalEditarPresupuestoServicio";
import { useNavigate } from "react-router-dom";

const ListaVisualizacionServiciosTecnico = () => {
  const servicios = useServicios();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [stringFiltro, setStringFiltro] = useState("");

  const fuePresupuestado = (servicio) => {
    const fechaCreacion = new Date(servicio.fecha);
    const fechaPromesaEntrega = new Date(servicio.fechaPromesaEntrega);

    return fechaCreacion < fechaPromesaEntrega;
  };

  const agregarWarning = (servicio) => {
    if(servicio.estado != "Entregada") {
      if (fuePresupuestado(servicio)) {
        return new Date(servicio.fechaPromesaEntrega) < new Date();
      } else {
        return new Date(servicio.fechaPromesaPresupuesto) < new Date();
      }
    }

    return false;
  };

  const manejarCambioNumeroOrden = (e) => {
    tipoFiltro == "Numero de orden" && setStringFiltro(e.target.value);
  };

  const manejarCambioCedulaCliente = (e) => {
    tipoFiltro == "CICliente" && setStringFiltro(e.target.value);
  };

  const manejarCambioTipoFiltro = (tipo) => {
    setSelected(null);
    setStringFiltro("");
    setTipoFiltro(tipo);
  };

  const manejarCambioEstado = (estado) => {
    tipoFiltro === "Estado" && setStringFiltro(estado);
  };

  const manejarClickEditarServicio = (servicio) => {
    navigate(`/editarServicio/${servicio.id}`);
  };

  const manejarClickDetalle = (id) => {
    navigate(`/servicios/${id}`);
  };

  let serviciosFiltrados;

  const filtrarServicios = () => {
    if (tipoFiltro == "Numero de orden") {
      return servicios.filter((servicio) =>
        servicio.id.toString().includes(stringFiltro)
      );
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
    } else if (tipoFiltro == "CICliente") {
      return servicios.filter((servicio) =>
        servicio.clienteCedula.includes(stringFiltro)
      );
    } else {
      return servicios;
    }
  };

  serviciosFiltrados = filtrarServicios();

  return (
    <>
      <div className="flex flex-col ml-12">
        <h1 className="mb-8">Listado de servicios</h1>
        <div className="mb-8">
          <div className="mb-4">
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
                position="center"
                onClick={() => manejarCambioTipoFiltro("CICliente")}
              >
                Cliente
              </Button>
              <Button
                position="end"
                onClick={() => manejarCambioTipoFiltro("Estado")}
              >
                Estado
              </Button>
            </ButtonGroup>
          </div>
          <Button position="end" onClick={() => manejarCambioTipoFiltro("")}>
            Quitar filtros
          </Button>
        </div>
        <div className="mb-8">
          {tipoFiltro === "Numero de orden" && (
            <Input
              placeholder="Escriba numero de orden"
              type="text"
              onChange={(e) => manejarCambioNumeroOrden(e)}
            />
          )}
          {tipoFiltro === "CICliente" && (
            <Input
              placeholder="Escriba cedula de cliente"
              type="text"
              onChange={(e) => manejarCambioCedulaCliente(e)}
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
                  <DropdownItem onClick={() => manejarCambioEstado("EnTaller")}>
                    En Taller
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => manejarCambioEstado("Presupuestada")}
                  >
                    Presupuestada
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => manejarCambioEstado("PresupuestoAceptado")}
                  >
                    Aceptada
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => manejarCambioEstado("PresupuestoNoAceptado")}
                  >
                    No aceptada
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => manejarCambioEstado("Terminada")}
                  >
                    Terminada
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => manejarCambioEstado("Entregada")}
                  >
                    Entregada
                  </DropdownItem>
                </DropdownList>
              </DropdownContent>
            </Dropdown>
          )}
        </div>
        <div className="mr-16">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="w-[80px] flex justify-center"> </div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">
                    Numero de orden
                  </div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Producto</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Fecha</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Costo</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Estado</div>
                </TableHead>
                <TableHead>
                  <div className="w-[250px] flex justify-center">
                    Presupuesto
                  </div>
                </TableHead>
                <TableHead>
                  <div className="w-[250px] flex justify-center">Modificar</div>
                </TableHead>
                <TableHead>
                  <div className="w-[250px] flex justify-center">Otros</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Detalle</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviciosFiltrados &&
                serviciosFiltrados.map((servicio) => (
                  <TableRow key={servicio.id}>
                    <TableCell>
                      {agregarWarning(servicio) ? <WarningCircle color="#e82c2c" size={20} /> : <></>}
                    </TableCell>
                    <TableCell>{servicio.id}</TableCell>
                    <TableCell>
                      <div className="w-[80px] truncate">
                        {servicio.producto.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(servicio.fecha), "dd-MM-yyyy")}
                    </TableCell>
                    <TableCell>{servicio.costo}</TableCell>
                    <TableCell>{servicio.estado}</TableCell>
                    <TableCell>
                      <OpcionesPresupuesto servicio={servicio} />
                    </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <ModalEditarPresupuestoServicio
                          disabled={servicio.estado !== "Presupuestada"}
                          servicio={servicio}
                        />
                        <Button
                          size="xs"
                          disabled={
                            servicio.estado !== "EnTaller" &&
                            servicio.estado !== "Presupuestada"
                          }
                          onClick={() => manejarClickEditarServicio(servicio)}
                        >
                          Servicio
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell>
                      <OpcionesTerminarEntregar servicio={servicio} />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => manejarClickDetalle(servicio.id)}>
                        Ver
                      </Button>
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
