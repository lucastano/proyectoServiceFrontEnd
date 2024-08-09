import React, { useState, useMemo } from "react";
import { Button, Textarea, toast } from "keep-react";
import { useIdSesion } from "../../store/selectors";

function NuevoMensaje({ idServicio }) {
  const idSesion = useIdSesion();
  const [descripcion, setDescripcion] = useState("");
  const servicio = useServicioPorId(idServicio);

  const destinatario = useMemo(() => {
    const ciCliente = servicio.clienteCedula;
    const cliente = useClientePorCi(ciCliente);
    return idSesion === cliente.id ? servicio.tecnicoId : cliente.id;
  }, [idSesion, servicio.clienteCedula]);

  const manejarCambioDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const manejarClickEnviar = async () => {
    const nuevoMensaje = {
      reparacionId: idServicio,
      emisorId: idSesion,
      destinatarioId: destinatario,
      texto: descripcion,
    };

    try {
      await postMensaje(dispatch, nuevoMensaje);
      toast("Mensaje enviado correctamente");
      setDescripcion("");
    } catch (error) {
      toast.error("Error al enviar mensaje");
      //dispatch(limpiarError());
    }
  };

  return (
    <div>
      <Textarea
        placeholder="Escribe tu mensaje aqui..."
        rows={8}
        onChange={(e) => manejarCambioDescripcion(e)}
      />
      <Button onClick={manejarClickEnviar}>Enviar</Button>
    </div>
  );
}

export default NuevoMensaje;
