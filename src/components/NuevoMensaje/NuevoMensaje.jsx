import React, { useState, useMemo } from "react";
import { Button, Textarea, toast } from "keep-react";
import { useIdSesion, useClientePorCi } from "../../store/selectors";
import { postMensaje } from "../../store/effects";
import { useDispatch } from "react-redux";

function NuevoMensaje({ servicio }) {
  const idSesion = useIdSesion();
  const [descripcion, setDescripcion] = useState("");
  const ciCliente = servicio.clienteCedula;
  const cliente = useClientePorCi(ciCliente);
  const dispatch = useDispatch();

  const destinatario = useMemo(() => {
    return idSesion === cliente.id ? servicio.tecnicoId : cliente.id;
  }, [idSesion, servicio.clienteCedula]);

  const manejarCambioDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const manejarClickEnviar = async () => {
    const nuevoMensaje = {
      reparacionId: servicio.id,
      emisorId: idSesion,
      destinatarioId: destinatario,
      texto: descripcion,
    };

    try {
      await postMensaje(dispatch, nuevoMensaje);
      setDescripcion("");
      toast("Mensaje enviado correctamente");
    } catch (error) {
      toast.error("Error al enviar mensaje");
    }
  };

  return (
    <div>
      <Textarea
        placeholder="Escribe tu mensaje aqui..."
        value={descripcion}
        rows={8}
        onChange={(e) => manejarCambioDescripcion(e)}
      />
      <div className="mt-4">
      <Button onClick={manejarClickEnviar}>Enviar</Button>
      </div>
    </div>
  );
}

export default NuevoMensaje;
