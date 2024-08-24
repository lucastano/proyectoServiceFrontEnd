import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner, toast } from "keep-react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import { useRolSesion, useEmailSesion, useCedulaSesion } from "../store/selectors";
import ListaVisualizacionServiciosCliente from "../components/ListaVisualizacionServicios/ListaVisualizacionServiciosCliente";
import { getClientePorCI, getReparacionesPorCI } from "../store/effects";

const PantallaLandingTecnico = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();
  const ciSesion = useCedulaSesion();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  if (!rolSesion || rolSesion != "Cliente" || !emailSesion) {
    return null;
  }

  useEffect(() => {
    const fetchReparaciones = async () => {
      try {
        await getReparacionesPorCI(ciSesion, dispatch);
        setLoading(false);
      } catch (error) {
        toast.error("No se pudo obtener reparaciones");
      }
    };

    const fetchClientePorCI = async () => {
      try {
        await getClientePorCI(ciSesion, dispatch);
        setLoading(false);
      } catch (error) {
        toast.error("No se pudo obtener cliente");
      }
    }

    if (rolSesion && rolSesion == "Cliente" && emailSesion) {
      fetchClientePorCI();
      fetchReparaciones();
    }
  }, [rolSesion, emailSesion, dispatch]);

  return (
    <div className="flex">
      <div className="w-1/4">
        <ComponenteNavbar />
      </div>
      <div className="flex justify-center w-3/4">
        {loading ? (
          <Spinner color="info" size="lg" />
        ) : (
          <ListaVisualizacionServiciosCliente />
        )}
      </div>
    </div>
  );
};

export default PantallaLandingTecnico;
