import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalAction,
  ModalBody,
  ModalClose,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  Textarea,
  Button,
  ModalContent,
  toast,
  ModalTitle
} from "keep-react";
import { putPresupuesto } from "../../store/effects";

const ModalEditarPresupuestoServicio = ({servicio, disabled}) => {
  const dispatch = useDispatch();

  const [costo, setCosto] = useState(servicio.costo);
  const [descripcionPresupuesto, setDescripcionPresupuesto] = useState(
    servicio.descripcionPresupuesto
  );

  const manejarCambioCosto = (e) => {
    const esDigitoValido = /^\d+$/.test(e.target.value);

    if (esDigitoValido) {
      setCosto(e.target.value);
    }
  };

  const manejarCambioDescripcion = (e) => {
    setDescripcionPresupuesto(e.target.value);
  };

  const editarPresupuesto = async () => {
    const reparacionEditada = {
      ...servicio,
      costo: costo,
      descripcion: descripcionPresupuesto,
    };
  
    try {
      await putPresupuesto(dispatch, reparacionEditada);
      toast("Edicion de presupuesto realizada correctamente");
    } catch (error) {
      toast.error("Error al modificar presupuesto");
    }
  
    document.getElementById("modalButton").click();
  };

  return (
    <Modal>
      <ModalAction asChild>
        <Button size="xs" id="modalButton" disabled={disabled}>Editar presupuesto</Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <ModalTitle>
                Editar presupuesto
              </ModalTitle>
              <div className="mx-auto max-w-md space-y-2 p-4">
                <div className="space-y-1">
                  <Label htmlFor="costo">Costo: </Label>
                  <Input
                    placeholder={costo}
                    onChange={(e) => manejarCambioCosto(e)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="descripcion">Descripción: </Label>
                  <Textarea
                    id="descripcion"
                    placeholder={descripcionPresupuesto}
                    className="ps-4"
                    onChange={(e) => manejarCambioDescripcion(e)}
                  />
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalFooter>
            <Button
              onClick={editarPresupuesto}
              disabled={
                costo == servicio.costo &&
                descripcionPresupuesto == servicio.descripcionPresupuesto
              }
            >
              Editar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditarPresupuestoServicio;
