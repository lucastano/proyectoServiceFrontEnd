import React from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, toast } from "keep-react";
import { useServicioPorId, useError } from "../../store/selectors";
import ModalIngresarPresupuesto from "./ModalIngresarPresupuesto";
import ModalRechazarPresupuesto from "./ModalRechazarPresupuesto";
import { postAceptarPresupuesto } from "../../store/effects";
import { limpiarError } from "../../store/actions";

const OpcionesPresupuesto = (idServicio) => {
  const dispatch = useDispatch();
  const servicioPorId = useServicioPorId(idServicio);

  const manejarClickAceptarPresupuesto = async () => {
    await postAceptarPresupuesto(servicioPorId, dispatch);


    const error = useError();

    if (!error) {
      toast("Presupuesto aceptado", {
        description: "El presupuesto ha sido aceptado correctamente",
      });
    } else {
      toast.error("Ha habido un error al aceptar el presupuesto");
      dispatch(limpiarError());
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
