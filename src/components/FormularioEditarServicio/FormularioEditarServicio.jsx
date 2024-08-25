import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Label,
  Input,
  Textarea,
  Button,
  DatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
  toast,
} from "keep-react";
import { format } from "date-fns";
import { Calendar } from "phosphor-react";
import { putServicio } from "../../store/effects";
import { useNavigate } from "react-router-dom";

const FormularioEditarServicio = ({ servicio }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/serviciostecnico");
      toast("Edicion de servicio realizada correctamente");
    } catch (error) {
      toast.error("Error al modificar servicio");
    }
  };

  return (
    <>
      <div className="rounded-lg border p-8 shadow-md text-left w-2/5">
        <h2 className="mb-8 text-body-1 font-medium flex justify-center">
          Editar Servicio
        </h2>
        <div className="mb-4 space-y-2">
          <div className="mb-8">
            <div className="space-y-1 mb-8">
              <Label htmlFor="numeroSerie">Numero de serie: </Label>
              <Input
                placeholder={numeroSerie}
                onChange={(e) => manejarCambioNumeroSerie(e)}
              />
            </div>
            <div className="space-y-1 mb-8">
              <Label htmlFor="descripcion">Descripción: </Label>
              <Textarea
                id="descripcion"
                placeholder={descripcion}
                className="ps-4"
                onChange={(e) => manejarCambioDescripcion(e)}
              />
            </div>
            <div className="space-y-1 mb-8">
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
                      format(
                        fechaPromesaPresupuesto ?? new Date(),
                        "dd/MM/yyyy"
                      )
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
                    hidden={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              size="sm"
              color="secondary"
              type="submit"
              onClick={editarServicio}
            >
              Modificar servicio
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormularioEditarServicio;
