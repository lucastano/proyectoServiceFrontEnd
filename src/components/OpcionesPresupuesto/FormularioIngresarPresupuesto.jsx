import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
  toast,
  Label,
  Input,
} from "keep-react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { Calendar } from "phosphor-react";
import { postPresupuestacionReparacion } from "../../store/effects";
import { useNavigate } from "react-router-dom";

const FormularioIngresarPresupuesto = ({ servicio }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [manoDeObra, setManoDeObra] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [fechaPromesaEntrega, setFechaPromesaEntrega] = useState(null);

  const manejarCambioManoDeObra = (e) => {
    const esDigitoValido = /^\d+$/.test(e.target.value);

    if (esDigitoValido) {
      setManoDeObra(e.target.value);
    }
  };

  const manejarCambioDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const validarPresupuesto = () => {
    return manoDeObra > 0 && descripcion.length > 0 && fechaPromesaEntrega;
  }

  const manejarClickIngresoPresupuesto = async () => {
    if (!validarPresupuesto()) {
      toast.error("Por favor complete todos los campos");
      return;
    }
    const presupuesto = {
      idReparacion: servicio.id,
      manoObra: manoDeObra,
      descripcion: descripcion,
      fechaPromesaEntrega: fechaPromesaEntrega,
    };

    try {
      await postPresupuestacionReparacion(presupuesto, dispatch);
      navigate("/serviciostecnico");
      toast("Presupuesto ingresado", {
        description: "El presupuesto ha sido ingresado correctamente",
      });
    } catch (error) {
      toast.error("Ha habido un error al ingresar el presupuesto");
    }
  };

  return (
    <>
      <div className="rounded-lg border p-8 shadow-md text-left">
        <h2 className="mb-2 text-body-1 font-medium">Ingresar Presupuesto</h2>
        <div className="mb-4 space-y-2">
          <fieldset className="space-y-1">
            <Label htmlFor="manoObra">Mano de obra:</Label>
            <Input
              id="manoObra"
              placeholder=""
              className="ps-4"
              onChange={(e) => manejarCambioManoDeObra(e)}
            />
          </fieldset>
          <fieldset className="space-y-1">
            <Label htmlFor="descripcion">Descripción:</Label>
            <Input
              id="descripcion"
              placeholder="Ingrese una descripcion..."
              className="ps-4"
              onChange={(e) => manejarCambioDescripcion(e)}
            />
          </fieldset>
          <fieldset className="space-y-1">
            <Label htmlFor="fechaPromesa">Fecha promesa de entrega:</Label>
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
                    format(fechaPromesaEntrega ?? new Date(), "dd/MM/yyyy")
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
                  hidden={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </fieldset>
        </div>
        <Button
          size="sm"
          color="secondary"
          type="submit"
          onClick={manejarClickIngresoPresupuesto}
        >
          Ingresar presupuesto
        </Button>
      </div>
    </>
  );
};

export default FormularioIngresarPresupuesto;
