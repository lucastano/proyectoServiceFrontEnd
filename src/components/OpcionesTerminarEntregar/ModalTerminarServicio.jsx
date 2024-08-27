import React from "react";
import { Modal, Button, toast, ModalAction, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalClose, ModalTitle } from "keep-react";
import { useDispatch } from "react-redux";
import { postTerminarReparacion } from "../../store/effects";
import { useNavigate } from "react-router-dom";

const ModalTerminarServicio = ({servicio}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fuePresupuestada = servicio.estado === "PresupuestoAceptado" || servicio.estado === "PresupuestoNoAceptado";

  const manejarClickReparado = async (reparado) => {
    const terminoReparacion = {
      idReparacion: servicio.id,
      fueReparada: reparado,
    };
  
    try {
      await postTerminarReparacion(terminoReparacion, dispatch);
      navigate('/');
      toast.success("Servicio finalizado");
    } catch (error) {
      toast.error("Ha habido un error al finalizar el servicio");
    }
  };

  return (
    <div>
      <Modal>
        <ModalAction asChild>
          <Button size="xs" id="modalButton" disabled={!fuePresupuestada}>Terminar</Button>
        </ModalAction>
        <ModalBody className="space-y-3">
          <ModalContent>
            <ModalClose className="absolute right-4 top-4"/>
            <ModalHeader>
              <div className="!mb-6">
                <ModalTitle>
                  Terminar reparación
                </ModalTitle>
                <p className="text-body-4 font-normal text-metal-600">
                  Selecciona la opción que corresponda.
                </p>
              </div>
            </ModalHeader>
            <ModalFooter>
                <Button
                  onClick={() => manejarClickReparado(true)}
                  color="primary"
                  size="sm"
                >
                  Reparado
                </Button>
                <Button
                  onClick={ () => manejarClickReparado(false)}
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
