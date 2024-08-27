import React, { useState } from "react";
import { useFallas } from "../../store/selectors";
import {
  Label,
  Checkbox,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Input,
} from "keep-react";
import ModalDetalleFalla from "../ModalDetalleFalla/ModalDetalleFalla";

const VisualizacionListaFallas = () => {
  const fallas = useFallas();
  const [descripcion, setDescripcion] = useState("");
  const [filtroActivado, setFiltroActivado] = useState(false);

  const manejarCambioDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const manejarActivacionFiltro = () => {
    setFiltroActivado(!filtroActivado);
  };

  let fallasFiltradas;

  const filtrarFallas = () => {
    if (filtroActivado == false) {
      return fallas;
    } else {
      return fallas.filter((item) => item.falla.includes(descripcion));
    }
  };

  fallasFiltradas = filtrarFallas();

  return (
    <>
      <div className="flex flex-col ml-16">
        <div className="mb-16">
          <h1>Visualización de fallas</h1>
        </div>
        <div className="flex items-center gap-2 mb-16 ">
          <Checkbox
            checked={filtroActivado}
            onChange={manejarActivacionFiltro}
            id="checkbox"
          />
          <Label htmlFor="checkbox">Filtrar por descripción</Label>
          <Input
            placeholder="Filtrar por descripcion..."
            type="text"
            disabled={!filtroActivado}
            onChange={manejarCambioDescripcion}
          />
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="w-[120px] flex justify-center">Producto</div>
                </TableHead>
                <TableHead>
                  <div className="w-[160px] flex justify-center">Falla</div>
                </TableHead>
                <TableHead>
                  <div className="w-[160px] flex justify-center">Solución</div>
                </TableHead>
                <TableHead>
                  <div className="w-[80px] flex justify-center">Detalle</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fallasFiltradas &&
                fallasFiltradas.map((falla) => (
                  <TableRow key={falla.id}>
                    <TableCell>
                      <div className="normal-case w-[160px] truncate flex justify-center">
                        {falla.producto.marca} - {falla.producto.modelo} -{" "}
                        {falla.producto.version}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="normal-case w-[160px] truncate">
                        {falla.falla}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="normal-case truncate">
                        {falla.solucion}
                      </div>
                    </TableCell>
                    <TableCell>
                      <ModalDetalleFalla item={falla} />
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

export default VisualizacionListaFallas;
