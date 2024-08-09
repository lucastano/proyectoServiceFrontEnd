import React, { useState } from "react";
import { Modal, Button, Textarea, toast, ModalClose, ModalAction, ModalBody, ModalContent, ModalFooter, Label, Input } from "keep-react";
import { useDispatch } from "react-redux";
import { postRechazarPresupuesto } from "../../store/effects";

const ModalRechazarPresupuesto = (idServicio, tienePresupuesto) => {
  const dispatch = useDispatch();
  //const servicioPorId = useServicioPorId(idServicio);
  const [costo, setCosto] = useState(0);
  const [razon, setRazon] = useState("");

  const manejarCambioCosto = (e) => {
    const esDigitoValido = /^\d$/.test(e.target.value);

    if (esDigitoValido) {
      setCosto(e.target.value);
    }
  };

  const manejarCambioRazon = (e) => {
    setRazon(e.target.value);
  };

  const manejarClickRechazarPresupuesto = async () => {
    const rechazoPresupuesto = {
      id: idServicio,
      costo: costo,
      razon: razon,
    };
  
    try {
      await postRechazarPresupuesto(rechazoPresupuesto, dispatch);
      toast("Presupuesto rechazado", {
        description: "El presupuesto ha sido rechazado correctamente",
      });
    } catch (error) {
      toast.error("Ha habido un error al rechazar el presupuesto");
      //dispatch(limpiarError());
    }
  
    document.getElementById("buttonModal").click();
  };

  return (
    <Modal>
      <ModalAction asChild>
        <Button position="end" disabled={!tienePresupuesto} id="buttonModal">
          Rechazar
        </Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <h3 className="mb-2 text-body-1 font-medium text-metal-900">
                Rechazar Presupuesto
              </h3>
              <form className="mx-auto max-w-md space-y-2 p-4">
                <fieldset className="space-y-1">
                  <Label htmlFor="costo">Costo:</Label>
                  <Input
                    placeholder="0"
                    onChange={(e) => manejarCambioCosto(e)}
                  />
                </fieldset>
                <fieldset className="space-y-1">
                  <Label htmlFor="costo">Razón:</Label>
                  <Textarea
                    placeholder="Razon..."
                    onChange={(e) => manejarCambioRazon(e)}
                  />
                </fieldset>
              </form>
            </div>
          </ModalHeader>
          <ModalFooter className="justify-center">
            <ModalClose asChild>
            <Button onClick={manejarClickRechazarPresupuesto} size="md">
              Rechazar Presupuesto
            </Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModalRechazarPresupuesto;
