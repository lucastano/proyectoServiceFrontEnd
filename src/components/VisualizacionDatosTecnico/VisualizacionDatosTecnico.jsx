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
  Button
} from "keep-react";
import {
  useServiciosPorTecnico,
  useTecnicoPorId,
} from "../../store/selectors";
import { useNavigate } from "react-router-dom";

const VisualizacionDatosTecnico = ({ idTecnico }) => {
  const tecnico = useTecnicoPorId(idTecnico);
  const servicios = useServiciosPorTecnico(idTecnico);
  const navigate = useNavigate();

  const manejarClickDetalle = (id) => {
    navigate(`/servicios/${id}`);
  };

  const cantidadReparaciones = servicios.length;

  const cantidadReparacionesSinCompletar = servicios.filter(
    (servicio) => {
      return servicio.estado !== "Terminada" && servicio.estado !== "Entregada";
    }
  ).length;
  
  const cantidadReparacionesRealizadas =
    cantidadReparaciones - cantidadReparacionesSinCompletar;

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
                Reparaciones sin completar: {cantidadReparacionesSinCompletar}
              </li>
            </ul>
          </div>
        </div>
        <Divider />
        <div className="my-16 overflow-y-auto h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Id servicio</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Id Producto</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Nro. serie</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Estado</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Detalle</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicios.map((servicio) => (
                <TableRow key={servicio.id}>
                  <TableCell>{servicio.id}</TableCell>
                  <TableCell>{servicio.producto.id}</TableCell>
                  <TableCell>{servicio.numeroSerie}</TableCell>
                  <TableCell>{servicio.estado}</TableCell>
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

export default VisualizacionDatosTecnico;
