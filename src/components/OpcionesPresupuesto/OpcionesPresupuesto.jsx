import React from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, toast } from "keep-react";
import ModalRechazarPresupuesto from "./ModalRechazarPresupuesto";
import { postAceptarPresupuesto } from "../../store/effects";
import { useNavigate } from "react-router-dom";

const OpcionesPresupuesto = ({ servicio }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const manejarClickAceptarPresupuesto = async () => {
    try {
      await postAceptarPresupuesto(servicio, dispatch);
      navigate('/serviciostecnico');
      toast("Presupuesto aceptado", {
        description: "El presupuesto ha sido aceptado correctamente",
      });
    } catch (error) {
      toast.error("Ha habido un error al aceptar el presupuesto");
    }
  };

  const manejarClickIngresarPresupuesto = () => {
    navigate(`/ingresarPresupuesto/${servicio.id}`);
  };

  const tienePresupuesto = servicio.estado === "Presupuestada";
  const fueRechazado = servicio.estado === "PresupuestoNoAceptado";
  const fueAceptado = servicio.estado === "PresupuestoAceptado";
  const noTuvoPresupuesto = !tienePresupuesto || fueAceptado || fueRechazado;
  
  return (
    <div>
      <ButtonGroup>
        <Button size="xs" disabled={servicio.estado != "EnTaller"} onClick={manejarClickIngresarPresupuesto}>Presupuestar</Button>
        <Button
        size="xs"
          position="center"
          onClick={manejarClickAceptarPresupuesto}
          disabled={noTuvoPresupuesto}
        >
          Aceptar
        </Button>
        <ModalRechazarPresupuesto
          servicio={servicio}
          noTienePresupuesto={noTuvoPresupuesto}
        />
      </ButtonGroup>
    </div>
  );
};

export default OpcionesPresupuesto;
