import React from "react";
import { Divider, Label } from "keep-react";
import SeccionMensajes from "../SeccionMensajes/SeccionMensajes";
import DescargarOrdenButton from "../DescargarOrdenButton/DescargarOrdenButton";
import { format } from "date-fns";

export const DetalleVisualizacionServicio = ({ servicio }) => {
  const {
    id,
    fecha,
    clienteNombre,
    clienteApellido,
    clienteCedula,
    clienteEmail,
    clienteTelefono,
    clienteDireccion,
    producto,
    descripcionPresupuesto,
    costo,
    numeroSerie,
    descripcion,
    estado,
  } = servicio;

  const existeFechaPromesaPresupuesto = () => {
    const fecha = new Date(fecha);
    const fechaPromesaPresupuesto = new Date(servicio.fechaPromesaPresupuesto);

    return fecha > fechaPromesaPresupuesto;
  };

  const existeFechaPromesaEntrega = () => {
    const fecha = new Date(fecha);
    const fechaPromesaEntrega = new Date(servicio.fechaPromesaEntrega);

    return fecha > fechaPromesaEntrega;
  };

  return (
    <div className="rounded-lg border p-8 shadow-md text-left w-5/6">
      <h2 className="mb-8 text-body-1 font-medium flex justify-center">
        Servicio No: {id}
      </h2>
      <Divider />
      <div className="m-8 space-y-2">
        <div>
          <Label htmlFor="fecha">Fecha: </Label>
          <p>{format(new Date(fecha), "dd-MM-yyyy HH:mm:ss")}</p>
        </div>
        <div>
          <Label htmlFor="ciCliente">CI Usuario: </Label>
          <p>{clienteCedula}</p>
        </div>
        <div>
          <Label htmlFor="nombre">Nombre: </Label>
          <p>
            {clienteNombre} {clienteApellido}
          </p>
        </div>
        <div>
          <Label htmlFor="numeroSerie">Numero de serie: </Label>
          <p>{numeroSerie}</p>
        </div>
        <div>
          <Label htmlFor="email">Email: </Label>
          <p>{clienteEmail}</p>
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono: </Label>
          <p>{clienteTelefono}</p>
        </div>
        <div>
          <Label htmlFor="direccion">Dirección: </Label>
          <p>{clienteDireccion}</p>
        </div>
        <div>
          <Label htmlFor="marca">Marca: </Label>
          <p>{producto.marca}</p>
        </div>
        <div>
          <Label htmlFor="modelo">Modelo: </Label>
          <p>{producto.modelo}</p>
        </div>
        <div>
          <Label htmlFor="version">Versión: </Label>
          <p>{producto.version}</p>
        </div>
        <div>
          <Label htmlFor="descripcion">Descripcion: </Label>
          <p>{descripcion}</p>
        </div>
        <div>
          <Label htmlFor="estado">Estado: </Label>
          <p>{estado}</p>
        </div>
        <div>
          <Label htmlFor="descripcionPresupuesto">
            Descripcion de presupuesto:{" "}
          </Label>
          <p>{descripcionPresupuesto}</p>
        </div>
        {existeFechaPromesaPresupuesto && (
          <div>
            <Label htmlFor="fechaPresupuesto">
              Fecha promesa presupuesto:{" "}
            </Label>
            <p>
              {format(new Date(servicio.fechaPromesaPresupuesto), "dd-MM-yyyy")}
            </p>
          </div>
        )}
        {existeFechaPromesaEntrega && (
          <div>
            <Label htmlFor="fechaEntrega">
              Fecha promesa entrega:{" "}
            </Label>
            <p>
              {format(new Date(servicio.fechaPromesaEntrega), "dd-MM-yyyy")}
            </p>
          </div>
        )}
        <div>
          <Label htmlFor="costo">Costo: </Label>
          <p>${costo}</p>
        </div>
      </div>
      <Divider />
      <div>
        <SeccionMensajes servicio={servicio} />
      </div>
      <div className="mt-8">
        <DescargarOrdenButton servicio={servicio} />
      </div>
    </div>
  );
};

export default DetalleVisualizacionServicio;
