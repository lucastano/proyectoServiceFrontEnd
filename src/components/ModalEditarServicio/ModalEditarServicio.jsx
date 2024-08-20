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
  DatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ModalTitle,
} from "keep-react";
import { format } from "date-fns";
import { Calendar } from "phosphor-react";
import { putServicio } from "../../store/effects";

const ModalEditarServicio = ({ servicio }) => {
  const dispatch = useDispatch();

  const [fechaPromesaPresupuesto, setFechaPromesaPresupuesto] = useState(
    servicio.fechaPromesaPresupuesto
  );
  const [numeroSerie, setNumeroSerie] = useState(servicio.numeroSerie);
  const [descripcion, setDescripcion] = useState(servicio.descripcion);

  const manejarCambioDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const manejarCambioNumeroSerie = (e) => {
    setNumeroSerie(e.target.value);
  };

  const editarServicio = async () => {
    const servicioEditado = {
      ...servicio,
      fechaPromesaPresupuesto: fechaPromesaPresupuesto,
      numeroSerie: numeroSerie,
      descripcion: descripcion,
    };

    try {
      await putServicio(dispatch, servicioEditado);
      toast("Edicion de servicio realizada correctamente");
    } catch (error) {
      toast.error("Error al modificar servicio");
    }
  };

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
              <ModalTitle>Editar servicio</ModalTitle>
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
                        {fechaPromesaPresupuesto ? (
                          format(fechaPromesaPresupuesto ?? new Date(), "PPP")
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
            <Button
              onClick={editarServicio}
              disabled={
                fechaPromesaPresupuesto == servicio.fechaPromesaPresupuesto &&
                descripcion == servicio.descripcion &&
                numeroSerie == servicio.numeroSerie
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

export default ModalEditarServicio;
