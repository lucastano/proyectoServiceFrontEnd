import React from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalAction, ModalBody, ModalClose, ModalFooter, ModalHeader, Label, Input, Textarea, Button, ModalContent, DatePicker, Popover, PopoverContent, PopoverTrigger } from "keep-react";
import { useServicioPorId, /*useRolSesion, useEmailSesion, */useError } from "../../store/selectors";
import { format } from "date-fns";
import { Calendar } from "phosphor-react";
import { limpiarError } from "../../store/actions";
import { putServicio } from "../../store/effects";

const ModalEditarServicio = (idServicio) => {
  const dispatch = useDispatch();
  //const rolSesion = useRolSesion();
  //const emailSesion = useEmailSesion();
  const servicioPorId = useServicioPorId(idServicio);

  /*
  if (!rolSesion || rolSesion == "Cliente" || !emailSesion) {
    return null;
  }
  */

  const [fechaPromesaPresupuesto, setFechaPromesaPresupuesto] = useState(servicioPorId.fechaPromesaPresupuesto);
  const [numeroSerie, setNumeroSerie] = useState(servicioPorId.numeroSerie);
  const [descripcion, setDescripcion] = useState(servicioPorId.descripcion);

  const manejarCambioDescripcion = (e) => {
    setDescripcion(e.target.value);
  }

  const manejarCambioNumeroSerie = (e) => {
    setNumeroSerie(e.target.value);
  }

  const editarServicio = async () => {
    const servicioEditado = {
        id: idServicio,
        fechaPromesaPresupuesto: fechaPromesaPresupuesto,
        numeroSerie: numeroSerie,
        descripcion: descripcion,
    }

    await putServicio(dispatch, servicioEditado);

    const error = useError();

    if (error) {
      toast.error("Error al modificar servicio");
      dispatch(limpiarError());
    } else {
      toast("Edicion de servicio realizada correctamente");
    }

    document.getElementById("modalButton").click();
  }

  return (
    <Modal>
      <ModalAction asChild>
        <Button id="modalButton">Editar servicio</Button>
      </ModalAction>
      <ModalBody className="space-y-3">
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader>
            <div className="!mb-6">
              <h3 className="mb-2 text-body-1 font-medium text-metal-900">
                Editar servicio
              </h3>
              <div className="mx-auto max-w-md space-y-2 p-4">
                <div className="space-y-1">
                  <Label htmlFor="numeroSerie">Numero de serie: </Label>
                  <Input
                    placeholder={numeroSerie}
                    onChange={(e) => manejarCambioNumeroSerie(e)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="descripcion">Descripción: </Label>
                  <Textarea
                    id="descripcion"
                    placeholder={descripcion}
                    className="ps-4"
                    onChange={(e) => manejarCambioDescripcion(e)}
                  />
                </div>
                <div className="space-y-1">
                <Label htmlFor="fechaPromesa">
                      Fecha promesa de presupuesto:
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
                          selected={fechaPromesaPresupuesto}
                          onSelect={setFechaPromesaPresupuesto}
                          showOutsideDays={true}
                        />
                      </PopoverContent>
                    </Popover>
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalFooter>
            <Button onClick={editarServicio} disabled={fechaPromesaPresupuesto == servicioPorId.fechaPromesaPresupuesto && descripcion == servicioPorId.descripcion && numeroSerie == servicioPorId.numeroSerie}>Editar</Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditarServicio;
