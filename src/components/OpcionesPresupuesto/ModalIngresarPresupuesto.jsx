import React, { useState } from "react";
import {
  Modal,
  Button,
  DatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  toast,
  ModalHeader,
  ModalClose,
} from "keep-react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { Calendar } from "phosphor-react";
import { useServicioPorId } from "../../store/selectors";
import { postPresupuestacionReparacion } from "../../store/effects";

const ModalIngresarPresupuesto = (idServicio) => {
  const dispatch = useDispatch();
  const servicioPorId = useServicioPorId(idServicio);
  const fuePresupuestado =
    servicioPorId.descripcionPresupuesto == "" && servicioPorId.manoDeObra == 0;

  const [manoDeObra, setManoDeObra] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [fechaPromesaEntrega, setFechaPromesaEntrega] = useState("");

  const manejarCambioManoDeObra = (e) => {
    const esDigitoValido = /^\d$/.test(e.target.value);

    if (esDigitoValido) {
      setManoDeObra(e.target.value);
    }
  };

  const manejarCambioDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const manejarClickIngresoPresupuesto = () => {
    const presupuesto = {
      idReparacion: idServicio,
      manoObra: manoDeObra,
      descripcion: descripcion,
      fechaPromesaEntrega: fechaPromesaEntrega,
    };

    dispatch(postPresupuestacionReparacion(presupuesto, dispatch));

    if (servicioPorId.estado == "Presupuestado") {
      toast("Presupuesto ingresado", {
        description: "El presupuesto ha sido ingresado correctamente",
      });
    } else {
      toast.error("Ha habido un error al ingresar el presupuesto");
    }
  };

  return (
      <Modal>
        <ModalAction asChild>
          <Button
            position="start"
            onClick={manejarClickPresupuestar}
            disabled={fuePresupuestado}
          >
            Presupuestar
          </Button>
        </ModalAction>
        <ModalBody className="space-y-3">
          <ModalContent>
            <ModalClose className="absolute right-4 top-4" />
            <ModalHeader>
              <div className="!mb-6">
                <h3 className="mb-2 text-body-1 font-medium text-metal-900">
                  Ingresar Presupuesto
                </h3>
                <form className="mx-auto max-w-md space-y-2 p-4">
                  <fieldset className="space-y-1">
                    <Label htmlFor="manoDeObra">Mano de obra:</Label>
                    <Input
                      placeholder="0"
                      onChange={(e) => manejarCambioManoDeObra(e)}
                    />
                  </fieldset>
                  <fieldset className="space-y-1">
                    <Label htmlFor="descripcion">Descripcion:</Label>
                    <Textarea
                      placeholder="Descripcion..."
                      onChange={(e) => manejarCambioDescripcion(e)}
                    />
                  </fieldset>
                  <fieldset className="space-y-1">
                    <Label htmlFor="fechaPromesa">
                      Fecha promesa de entrega:
                    </Label>
                    <Popover showArrow={false} placement="bottom-start">
                      <PopoverTrigger asChild>
                        <Button
                          className="w-[286px] justify-start gap-2 rounded-xl border border-metal-50 px-4 text-left text-body-4 font-normal text-metal-600 hover:bg-white active:focus:scale-100 dark:border-metal-900 dark:bg-metal-900 dark:text-white dark:hover:bg-metal-800"
                          variant="outline"
                          color="secondary"
                        >
                          <Calendar
                            size={20}
                            className="text-metal-400 dark:text-white"
                          />
                          {fechaPromesaEntrega ? (
                            format(fechaPromesaEntrega ?? new Date(), "PPP")
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="z-50 max-w-min">
                        <DatePicker
                          mode="single"
                          selected={fechaPromesaEntrega}
                          onSelect={setFechaPromesaEntrega}
                          showOutsideDays={true}
                        />
                      </PopoverContent>
                    </Popover>
                  </fieldset>
                </form>
              </div>
            </ModalHeader>
            <ModalFooter className="justify-center">
              <ModalClose asChild>
                <Button onClick={manejarClickIngresoPresupuesto} size="md">
                  Ingresar Presupuesto
                </Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>
  );
};

export default ModalIngresarPresupuesto;
