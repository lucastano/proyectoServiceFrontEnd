import React from "react";
import {
  Divider,
  Button,
} from "keep-react";
import SeccionMensajes from "../SeccionMensajes/SeccionMensajes";
import DescargarOrdenButton from "../DescargarOrdenButton/DescargarOrdenButton";

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

  return (
    <div className="rounded-lg border p-8 shadow-md text-left w-full">
      <h3>Servicio No: {id}</h3>
      <Divider />
      <div>
        <p>Fecha: {fecha}</p>
        <p>CI Usuario: {clienteCedula}</p>
        <p>
          Nombre: {clienteNombre} {clienteApellido}
        </p>
        <p>Numero de serie: {numeroSerie}</p>
        <p>Email: {clienteEmail}</p>
        <p>Teléfono: {clienteTelefono}</p>
        <p>Dirección: {clienteDireccion}</p>
        <p>Marca: {producto.marca}</p>
        <p>Modelo: {producto.modelo}</p>
        <p>Versión: {producto.version}</p>
        <p>Descripcion: {descripcion}</p>
        <p>Estado: {estado}</p>
        <p>Descripcion de presupuesto: {descripcionPresupuesto}</p>
        <p>Costo: {costo}</p>
      </div>
      <Divider />
      <div>
        <SeccionMensajes servicio={servicio} />
      </div>
      <div>
        <Button size="sm" color="primary">
          Cerrar
        </Button>
        <DescargarOrdenButton servicio={servicio} />
      </div>
    </div>
  );
};

export default DetalleVisualizacionServicio;
