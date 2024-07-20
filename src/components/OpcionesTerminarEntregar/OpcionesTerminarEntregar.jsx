import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, toast } from "keep-react";
import { useError, useServicioPorId } from "../../store/selectors";
import { postEntregarReparacion } from "../../store/effects";
import  ModalTerminarServicio  from "./ModalTerminarServicio";
import { limpiarError } from "../../store/actions";


const OpcionesTerminarEntregar = (idServicio) => {
    const dispatch = useDispatch();
    const servicioPorId = useServicioPorId(idServicio);
    
    const manejarClickEntregar = async () => {
        await postEntregarReparacion(servicioPorId, dispatch);
        
        const error = useError();
        if (!error) {
            toast('Entrega realizada', {
                description: 'El servicio ha sido entregado al cliente',
              });
        } else {
            toast.error('Ha habido un error al realizar la entrega');
            dispatch(limpiarError());
        }
        
    }

    return (
        <div className="max-w-[250px]">
            <ModalTerminarServicio idServicio={idServicio} />
            <Button onClick={manejarClickEntregar} disabled={servicioPorId.estado !== "Terminada"}>Entregar</Button>
        </div>
    );
};

export default OpcionesTerminarEntregar;