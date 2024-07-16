import React from "react";
import { Modal, Button, toast, ModalAction, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalClose } from "keep-react";
import { useDispatch } from "react-redux";
import { useServicioPorId } from "../../store/selectors";
import { postTerminarReparacion } from "../../store/effects";

const ModalTerminarServicio = (idServicio) => {
  const dispatch = useDispatch();
  const servicioPorId = useServicioPorId(idServicio);

  const manejarClickReparado = (reparado) => () => {
    const terminoReparacion = {
      idReparacion: idServicio,
      fueReparada: reparado,
    };

    dispatch(postTerminarReparacion(terminoReparacion, dispatch));

    if (servicioPorId.reparada != undefined) {
      const descripcionToast =
        servicioPorId.reparada == true
          ? "Servicio fue reparado"
          : "Servicio no fue reparado";
      toast("Servicio finalizado", {
        description: descripcionToast,
      });
    } else {
      toast.error("Ha habido un error al finalizar el servicio");
    }
  };

  return (
    <div>
      <Modal>
        <ModalAction asChild>
          <Button>Terminar</Button>
        </ModalAction>
        <ModalBody className="space-y-3">
          <ModalContent>
            <ModalClose className="absolute right-4 top-4" />
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
              <ModalClose asChild>
                <Button
                  onClick={manejarClickReparado(true)}
                  color="primary"
                  size="sm"
                >
                  Reparado
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button
                  onClick={manejarClickReparado(false)}
                  color="error"
                  size="sm"
                >
                  No reparado
                </Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalTerminarServicio;
