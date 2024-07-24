import React, {useState} from 'react';
import { Button, Textarea, toast } from 'keep-react';
import { useIdSesion } from '../../store/selectors';

function NuevoMensaje ({idServicio}) {
    const idSesion = useIdSesion();
    const [descripcion, setDescripcion] = useState("");

    const manejarCambioDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const manejarClickEnviar = async () => {
        //capaz hay que pasar esto a SeccionMensajes y bajarlo a NuevoMensaje como prop
        const nuevoMensaje = {
            reparacionId: idServicio,
            emisorId: idSesion,
            destinatarioId: 0, //NO ES NECESARIO
            texto: descripcion
        }

        await postMensaje(dispatch, nuevoMensaje);
        const error = useError();

        if (error) {
            toast.error("Error al enviar mensaje");
            dispatch(limpiarError());
          } else {
            toast("Mensaje enviado correctamente");
            setDescripcion("");
          }
    }

    return (
        <div>
            <Textarea placeholder="Escribe tu mensaje aqui..." rows={8} onChange={e => manejarCambioDescripcion(e)}/>
            <Button onClick={manejarClickEnviar}>Enviar</Button>
        </div>
    );
}

export default NuevoMensaje;