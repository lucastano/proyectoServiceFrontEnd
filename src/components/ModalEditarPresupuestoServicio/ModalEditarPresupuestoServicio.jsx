import React from "react";
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
} from "keep-react";
import {
  useServicioPorId,
  //useRolSesion,
  //useEmailSesion,
} from "../../store/selectors";

const ModalEditarPresupuestoServicio = (idServicio) => {
  const dispatch = useDispatch();
  //const rolSesion = useRolSesion();
  //const emailSesion = useEmailSesion();
  const servicioPorId = useServicioPorId(idServicio);

  /*
  if (!rolSesion || rolSesion == "Cliente" || !emailSesion) {
    return null;
  }
  */

  const [costo, setCosto] = useState(servicioPorId.costo);
  const [descripcionPresupuesto, setDescripcionPresupuesto] = useState(
    servicioPorId.descripcionPresupuesto
  );

  const manejarCambioCosto = (e) => {
    const esDigitoValido = /^\d$/.test(e.target.value);

    if (esDigitoValido) {
      setCosto(e.target.value);
    }
  };

  const manejarCambioDescripcion = (e) => {
    setDescripcionPresupuesto(e.target.value);
  };

  const editarPresupuesto = async () => {
    const reparacionEditada = {
      id: idServicio,
      costo: costo,
      descripcion: descripcionPresupuesto,
    };
  
    try {
      await putPresupuesto(dispatch, reparacionEditada);
      toast("Edicion de presupuesto realizada correctamente");
    } catch (error) {
      toast.error("Error al modificar presupuesto");
      //dispatch(limpiarError());
    }
  
    document.getElementById("modalButton").click();
  };

  return (
    <Modal>
      <ModalAction asChild>
        <Button id="modalButton">Editar presupuesto</Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <h3 className="mb-2 text-body-1 font-medium text-metal-900">
                Editar presupuesto
              </h3>
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
                costo == servicioPorId.costo &&
                descripcionPresupuesto == servicioPorId.descripcionPresupuesto
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
