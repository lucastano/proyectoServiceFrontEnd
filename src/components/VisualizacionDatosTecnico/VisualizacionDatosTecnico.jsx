import React from "react";
import {
  Label,
  Table,
  Divider,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react";
import {
  useServiciosPorTecnico,
  useTecnicoPorId,
} from "../../store/selectors";
import ModalVisualizacionServicio from "../ModalVisualizacionServicio/ModalVisualizacionServicio";

const VisualizacionDatosTecnico = ({ idTecnico }) => {
  console.log("idTecnico: ", idTecnico);
  const tecnico = useTecnicoPorId(idTecnico);
  const servicios = useServiciosPorTecnico(idTecnico);
  console.log("tecnico: ", tecnico);

  const cantidadReparaciones = servicios.length;
  const cantidadReparacionesSinReparar = servicios.filter(
    (servicio) => servicio.estado === "Terminada" && servicio.costo === 0
  ).length;
  const cantidadReparacionesRealizadas =
    cantidadReparaciones - cantidadReparacionesSinReparar;

  const { nombre, apellido, email } = tecnico;
  return (
    <>
      <div className="ml-16">
        <h1 className="text-3xl">Datos tecnico {nombre} {apellido}</h1>
        <div className="my-8">
          <div className="mb-4 text-left">
            <Label className="text-2xl">Datos personales:</Label>
            <div className="mt-2">
              <ul>
                <li>
                  Id: {idTecnico}
                </li>
                <li>Email: {email}</li>
              </ul>
            </div>
          </div>
        </div>
        <Divider />
        <div className="mb-4 mt-2 text-left">
          <Label className="text-2xl">Datos reparaciones:</Label>
          <div className="my-2">
            <ul>
              <li>Reparaciones totales: {cantidadReparaciones}</li>
              <li>Reparaciones realizadas: {cantidadReparacionesRealizadas}</li>
              <li>
                Reparaciones sin completar: {cantidadReparacionesSinReparar}
              </li>
            </ul>
          </div>
        </div>
        <Divider />
        <div className="my-16">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="w-[80px]">Id servicio</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px]">Producto</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px]">Nro. serie</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px]">Estado</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px]">Detalle</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicios.map((servicio) => (
                <TableRow key={servicio.id}>
                  <TableCell>{servicio.id}</TableCell>
                  <TableCell>{servicio.producto}</TableCell>
                  <TableCell>{servicio.numeroSerie}</TableCell>
                  <TableCell>{servicio.estado}</TableCell>
                  <TableCell>
                    <ModalVisualizacionServicio idServicio={servicio.id} />
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

export default VisualizacionDatosTecnico;
