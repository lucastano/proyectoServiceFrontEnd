import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, toast } from "keep-react";
import { useServicioPorId } from "../../store/selectors";
import { postEntregarReparacion } from "../../store/effects";
import  ModalTerminarServicio  from "./ModalTerminarServicio";


const OpcionesTerminarEntregar = (idServicio) => {
    const dispatch = useDispatch();
    const servicioPorId = useServicioPorId(idServicio);
    
    const manejarClickEntregar = () => {
        dispatch(postEntregarReparacion(servicioPorId, dispatch));
        
        if (servicioPorId.estado == "Entregado") {
            toast('Entrega realizada', {
                description: 'El servicio ha sido entregado al cliente',
              });
        } else {
            toast.error('Ha habido un error al realizar la entrega');
        }
        
    }

    return (
        <div className="max-w-[250px]">
            <ModalTerminarServicio idServicio={idServicio} />
            <Button onClick={manejarClickEntregar}>Entregar</Button>
        </div>
    );
};

export default OpcionesTerminarEntregar;