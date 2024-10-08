import React, { useEffect, useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineContent,
  Spinner,
} from "keep-react";
import NuevoMensaje from "../NuevoMensaje/NuevoMensaje";
import { useDispatch } from "react-redux";
import { getMensajes } from "../../store/effects";
import { useMensajes } from "../../store/selectors";
import { format } from "date-fns";

function SeccionMensajes({ servicio }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const mensajes = useMensajes();

  useEffect(() => {
    const fetchMensajes = async () => {
      await getMensajes(dispatch, servicio.id);
      setIsLoading(false);
    };

    fetchMensajes();
    const intervalId = setInterval(fetchMensajes, 2 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [dispatch, servicio.id]);

  return isLoading ? (
    <>
      <Spinner color="info" size="xl" />
    </>
  ) : (
    <div className="mt-4">
      <h2 className="text-h2 font-bold text-metal-900 dark:text-white">
        Mensajes
      </h2>
      <div className="mt-4">
      <Timeline>
        {mensajes &&
          mensajes.map((mensaje) => (
            <TimelineItem>
              <TimelinePoint />
              <TimelineContent>
                <p className="text-body-5 font-normal leading-[1.4] text-metal-400 dark:text-metal-300">
                  Fecha: {format(new Date(mensaje.fechaHora), "dd-MM-yyyy HH:mm:ss")}
                </p>
                <h1 className="text-body-4 font-normal text-metal-600 dark:text-metal-300">
                  Emisor: {mensaje.emisorNombre}
                </h1>
                <p className="text-body-4 font-normal text-metal-600 dark:text-metal-300">
                  {mensaje.texto}
                </p>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
      </div>
      <div className="mt-4">
        <NuevoMensaje servicio={servicio} />
      </div>
    </div>
  );
}

export default SeccionMensajes;
