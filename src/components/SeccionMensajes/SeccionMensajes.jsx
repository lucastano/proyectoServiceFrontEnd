import React from "react";
import { Timeline, TimelineItem, TimelinePoint, TimelineContent } from "keep-react";
import { useRolSesion, useEmailSesion, useServicioPorId } from "../../store/selectors";
import NuevoMensaje from "../NuevoMensaje/NuevoMensaje";


function SeccionMensajes(idServicio) {
  //const rolSesion = useRolSesion();
  //const emailSesion = useEmailSesion();
  const servicioPorId = useServicioPorId(idServicio);

  /*
  if (!rolSesion || !emailSesion) {
    return null;
  }
  */

  const mensajesServicio = servicioPorId.mensajes;
  /*
    suponiendo que mensaje tiene :
    fecha
    idUsuario
    contenido
    */
  return (
    <div>
      <Timeline>
        {mensajesServicio &&
          mensajesServicio.map((mensaje) => {
            <TimelineItem>
              <TimelinePoint />
              <TimelineContent>
                <p className="text-body-5 font-normal leading-[1.4] text-metal-400 dark:text-metal-300">
                  {mensaje.fecha}
                </p>
                <h1 className="text-body-3 font-medium text-metal-900 dark:text-white">
                  {mensaje.idUsuario}
                </h1>
                <p className="text-body-4 font-normal text-metal-600 dark:text-metal-300">
                  {mensaje.contenido}
                </p>
              </TimelineContent>
            </TimelineItem>;
          })}
      </Timeline>
      <NuevoMensaje idServicio={idServicio}/>
    </div>
  );
}

export default SeccionMensajes;
