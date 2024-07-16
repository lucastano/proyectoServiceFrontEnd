import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup } from "keep-react";
import { useServicioPorId } from "../../store/selectors";
import ModalIngresarPresupuesto from "./ModalIngresarPresupuesto";
import ModalRechazarPresupuesto from "./ModalRechazarPresupuesto";
import { postAceptarPresupuesto } from "../../store/effects";

const OpcionesPresupuesto = (idServicio) => {
  const dispatch = useDispatch();
  const servicioPorId = useServicioPorId(idServicio);

  const manejarClickAceptarPresupuesto = () => {
    dispatch(postAceptarPresupuesto(servicioPorId, dispatch));

    if (servicioPorId.estado == "Presupuestado") {
      toast("Presupuesto aceptado", {
        description: "El presupuesto ha sido aceptado correctamente",
      });
    } else {
      toast.error("Ha habido un error al aceptar el presupuesto");
    }
  };

  const fuePresupuestado =
    servicioPorId.descripcionPresupuesto == "" && servicioPorId.manoDeObra == 0;

  return (
    <div>
      <ButtonGroup>
        <ModalIngresarPresupuesto idServicio={idServicio} />
        <Button
          position="center"
          onClick={manejarClickAceptarPresupuesto}
          disabled={!fuePresupuestado}
        >
          Aceptar
        </Button>
        <ModalRechazarPresupuesto idServicio={idServicio} />
      </ButtonGroup>
    </div>
  );
};

export default OpcionesPresupuesto;
