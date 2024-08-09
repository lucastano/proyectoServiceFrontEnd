import React from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, toast } from "keep-react";
import { useServicioPorId } from "../../store/selectors";
import ModalIngresarPresupuesto from "./ModalIngresarPresupuesto";
import ModalRechazarPresupuesto from "./ModalRechazarPresupuesto";
import { postAceptarPresupuesto } from "../../store/effects";

const OpcionesPresupuesto = (idServicio) => {
  const dispatch = useDispatch();
  const servicioPorId = useServicioPorId(idServicio);

  const manejarClickAceptarPresupuesto = async () => {
    try {
      await postAceptarPresupuesto(servicioPorId, dispatch);
      toast("Presupuesto aceptado", {
        description: "El presupuesto ha sido aceptado correctamente",
      });
    } catch (error) {
      toast.error("Ha habido un error al aceptar el presupuesto");
      //dispatch(limpiarError());
    }
  };

  const tienePresupuesto = servicioPorId.estado === "Presupuestada";

  return (
    <div>
      <ButtonGroup>
        <ModalIngresarPresupuesto idServicio={idServicio} />
        <Button
          position="center"
          onClick={manejarClickAceptarPresupuesto}
          disabled={!tienePresupuesto}
        >
          Aceptar
        </Button>
        <ModalRechazarPresupuesto idServicio={idServicio} tienePresupuesto={tienePresupuesto}/>
      </ButtonGroup>
    </div>
  );
};

export default OpcionesPresupuesto;
