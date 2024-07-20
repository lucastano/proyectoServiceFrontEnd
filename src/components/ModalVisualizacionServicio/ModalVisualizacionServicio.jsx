import React from "react";
import { Modal, Button, ModalAction, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalClose } from "keep-react";
import {
  useCedulaSesion,
  useRolSesion,
  useServicioPorId,
} from "../../store/selectors";

export const ModalVisualizacionServicio = (idServicio) => {
  const cedulaSesion = useCedulaSesion();
  const rolSesion = useRolSesion();
  const servicio = useServicioPorId(idServicio);

  if (
    !cedulaSesion ||
    (rolSesion == "Cliente" && cedulaSesion !== servicio.clienteCedula)
  ) {
    return null;
  }

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
    <div>
      <Modal>
        <ModalAction asChild>
          <Button>{idServicio}</Button>
        </ModalAction>
        <ModalBody>
          <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div>
              <h3>Servicio No: {id}</h3>
              <p>Fecha: {fecha}</p>
              <p>CI Usuario: {clienteCedula}</p>
              <p>
                Nombre: {clienteNombre} {clienteApellido}
              </p>
              <p>Numero de serie: {numeroSerie}</p>
              <p>Email: {clienteEmail}</p>
              <p>Teléfono: {clienteTelefono}</p>
              <p>Dirección: {clienteDireccion}</p>
              <p>Producto: {producto}</p>
              <p>Descripcion: {descripcion}</p>
              <p>Estado: {estado}</p>
              <p>Descripcion de presupuesto: {descripcionPresupuesto}</p>
              <p>Costo: {costo}</p>
            </div>
            </ModalHeader>
            <SeccionMensajes idServicio={idServicio}/>
          <ModalFooter>
          <ModalClose asChild>
            <Button size="sm" color="primary">
              Cerrar
            </Button>
            </ModalClose>
          </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalVisualizacionServicio;
