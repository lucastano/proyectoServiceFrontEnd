import React from "react";
import { Card, CardContent, CardDescription, CardTitle, Label, Table, Divider, TableCell,  TableHead, TableHeader, TableRow } from "keep-react";
import {
  //useRolSesion,
  //useEmailSesion,
  useServiciosPorTecnico,
    useTecnicoPorId,
} from "../../store/selectors";
import ModalVisualizacionServicio from "../ModalVisualizacionServicio/ModalVisualizacionServicio";

const VisualizacionDatosTecnico = (idTecnico) => {
 // const rolSesion = useRolSesion();
  //const emailSesion = useEmailSesion();

  /*
  if (!rolSesion || rolSesion !== "Administrador" || !emailSesion) {
    return null;
  }
  */

  const servicios = useServiciosPorTecnico(idTecnico);
  const tecnico = useTecnicoPorId(idTecnico);

  const cantidadReparaciones = servicios.length;
  const cantidadReparacionesSinReparar = servicios.filter(servicio => servicio.estado === "Terminada" && servicio.costo === 0).length;
  const cantidadReparacionesRealizadas = cantidadReparaciones - cantidadReparacionesSinReparar;

  const {nombre, apellido, email } = tecnico;
  return (
    <div>
      <Card className="max-w-md">
        <CardContent>
          <CardTitle>Datos tecnico {idTecnico}</CardTitle>
          <CardDescription>
            <Label>Datos personales:</Label>
            <ul>
              <li>Nombre: {nombre} {apellido}</li>
              <li>Email: {email}</li>
            </ul>
            <Divider />
            <Label>Datos reparaciones</Label>
            <ul>
                <li>Reparaciones totales: {cantidadReparaciones}</li>
                <li>Reparaciones realizadas: {cantidadReparacionesRealizadas}</li>
                <li>Reparaciones sin completar: {cantidadReparacionesSinReparar}</li>
            </ul>
            <Divider />
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
                    {servicios.map(servicio => (
                        <TableRow key={servicio.id}>
                            <TableCell>{servicio.id}</TableCell>
                            <TableCell>{servicio.producto}</TableCell>
                            <TableCell>{servicio.numeroSerie}</TableCell>
                            <TableCell>{servicio.estado}</TableCell>
                            <TableCell><ModalVisualizacionServicio idServicio={servicio.id} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualizacionDatosTecnico;
