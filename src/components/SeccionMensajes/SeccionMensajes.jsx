import React, { useEffect, useState } from "react";
import {
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineContent,
  Spinner
} from "keep-react";
import NuevoMensaje from "../NuevoMensaje/NuevoMensaje";
import { useDispatch } from "react-redux";
import { getMensajes } from "../../store/effects";
import { useMensajes } from "../../store/selectors";

function SeccionMensajes({ idServicio }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const mensajes = useMensajes();

  useEffect(() => {
    const fetchMensajes = async () => {
      await getMensajes(dispatch, idServicio);
      setIsLoading(false);
    };

    fetchMensajes();
    const intervalId = setInterval(fetchMensajes, 5 * 60 * 1000);

    return () => clearInterval(intervalId)
  }, [dispatch, idServicio]);

  return isLoading ? (
    <><Spinner color="info" size="xl" /></>
  ) : (
    <div>
      <Timeline>
        {mensajes &&
          mensajes.map((mensaje) => {
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
      <NuevoMensaje idServicio={idServicio} />
    </div>
  );
}

export default SeccionMensajes;
