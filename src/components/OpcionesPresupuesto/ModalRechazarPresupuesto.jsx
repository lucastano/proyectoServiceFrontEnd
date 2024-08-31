import React, { useState } from "react";
import {
  Modal,
  Button,
  Textarea,
  toast,
  ModalClose,
  ModalAction,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTitle,
  Label,
  Input,
  ModalHeader,
} from "keep-react";
import { useDispatch } from "react-redux";
import { postRechazarPresupuesto } from "../../store/effects";
import { useNavigate } from "react-router-dom";

const ModalRechazarPresupuesto = ({ servicio, noTienePresupuesto }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [costo, setCosto] = useState(0);
  const [razon, setRazon] = useState("");

  const manejarCambioCosto = (e) => {
    const esDigitoValido = /^[0-9]+$/.test(e.target.value);

    if (esDigitoValido) {
      setCosto(e.target.value);
    }
  };

  const manejarCambioRazon = (e) => {
    setRazon(e.target.value);
  };

  const validarCosto = () => {
    const costoIsNumeric = /^\d+$/.test(costo);
    return costoIsNumeric && costo >= 0;
  }

  const manejarClickRechazarPresupuesto = async () => {
    const rechazoPresupuesto = {
      id: servicio.id,
      costo: costo,
      razon: razon,
    };

    if (!validarCosto()) {
      toast.error("Por favor agregue un costo válido");
      return;
    }

    if(razon.length === 0) {
      toast.error("Por favor agregue una razón");
      return;
    }

    try {
      await postRechazarPresupuesto(rechazoPresupuesto, dispatch);
      navigate("/");
      toast.success("Presupuesto rechazado", {
        description: "El presupuesto ha sido rechazado correctamente",
      });
    } catch (error) {
      toast.error("Ha habido un error al rechazar el presupuesto");
    }
  };

  return (
    <Modal>
      <ModalAction asChild>
        <Button size="xs" position="end" disabled={noTienePresupuesto}>
          Rechazar
        </Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <ModalTitle>Rechazar Presupuesto</ModalTitle>
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
                    className="text-black"
                    onChange={(e) => manejarCambioRazon(e)}
                  />
                </fieldset>
              </form>
            </div>
          </ModalHeader>
          <ModalFooter className="justify-center">
            <Button onClick={manejarClickRechazarPresupuesto} size="md">
              Rechazar Presupuesto
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModalRechazarPresupuesto;
