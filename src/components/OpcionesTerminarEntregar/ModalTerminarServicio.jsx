import React from "react";
import { Modal, Button, toast, ModalAction, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalClose } from "keep-react";
import { useDispatch } from "react-redux";
import { useServicioPorId } from "../../store/selectors";
import { postTerminarReparacion } from "../../store/effects";

const ModalTerminarServicio = (idServicio) => {
  const dispatch = useDispatch();
  const servicioPorId = useServicioPorId(idServicio);

  const fuePresupuestada = servicioPorId.estado === "PresupuestoAceptado" || servicioPorId.estado === "PresupuestoNoAceptado";

  const manejarClickReparado = (reparado) => async () => {
    const terminoReparacion = {
      idReparacion: idServicio,
      fueReparada: reparado,
    };
  
    try {
      await postTerminarReparacion(terminoReparacion, dispatch);
      const descripcionToast =
        servicioPorId.reparada == true
          ? "Servicio fue reparado"
          : "Servicio no fue reparado";
      toast("Servicio finalizado", {
        description: descripcionToast,
      });
    } catch (error) {
      toast.error("Ha habido un error al finalizar el servicio");
      //dispatch(limpiarError());
    }
  
    document.getElementById("modalButton").click();
  };

  return (
    <div>
      <Modal>
        <ModalAction asChild>
          <Button id="modalButton" disabled={!fuePresupuestada}>Terminar</Button>
        </ModalAction>
        <ModalBody className="space-y-3">
          <ModalContent>
            <ModalClose className="absolute right-4 top-4"/>
            <ModalHeader>
              <div className="!mb-6">
                <h3 className="mb-2 text-body-1 font-medium text-metal-900">
                  Terminar reparación
                </h3>
                <p className="text-body-4 font-normal text-metal-600">
                  Selecciona la opción que corresponda.
                </p>
              </div>
            </ModalHeader>
            <ModalFooter>
                <Button
                  onClick={manejarClickReparado(true)}
                  color="primary"
                  size="sm"
                >
                  Reparado
                </Button>
                <Button
                  onClick={manejarClickReparado(false)}
                  color="error"
                  size="sm"
                >
                  No reparado
                </Button>
            </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalTerminarServicio;
