import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, toast } from "keep-react";
import { useServicioPorId } from "../../store/selectors";
import { postEntregarReparacion } from "../../store/effects";
import  ModalTerminarServicio  from "./ModalTerminarServicio";


const OpcionesTerminarEntregar = (idServicio) => {
    const dispatch = useDispatch();
    const servicioPorId = useServicioPorId(idServicio);
    
    const manejarClickEntregar = async () => {
        try {
          await postEntregarReparacion(servicioPorId, dispatch);
          toast('Entrega realizada', {
            description: 'El servicio ha sido entregado al cliente',
          });
        } catch (error) {
          toast.error('Ha habido un error al realizar la entrega');
          //dispatch(limpiarError());
        }
      };

    return (
        <div className="max-w-[250px]">
            <ModalTerminarServicio idServicio={idServicio} />
            <Button onClick={manejarClickEntregar} disabled={servicioPorId.estado !== "Terminada"}>Entregar</Button>
        </div>
    );
};

export default OpcionesTerminarEntregar;