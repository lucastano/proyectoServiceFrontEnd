import React, {useState} from 'react';
import { Button, Textarea } from 'keep-react';
import { useServicioPorId } from '../../store/selectors';

function NuevoMensaje (idServicio) {
    const servicioPorId = useServicioPorId(idServicio);
    const [descripcion, setDescripcion] = useState("");

    const manejarCambioDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const manejarClickEnviar = () => {
        //logica para hacer post de mensaje o como sea.
    }

    cons
    return (
        <div>
            <Textarea placeholder="Escribe tu mensaje aqui..." rows={8} onChange={e => manejarCambioDescripcion(e)}/>
            <Button onClick={manejarClickEnviar}>Enviar</Button>
        </div>
    );
}

export default NuevoMensaje;