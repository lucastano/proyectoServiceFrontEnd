import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spinner, toast } from "keep-react";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import ListaVisualizacionServiciosTecnico from "../components/ListaVisualizacionServicios/ListaVisualizacionServiciosTecnico";
import { getReparaciones } from "../store/effects";

const PantallaLandingTecnico = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  if (!rolSesion || rolSesion == "Cliente" || !emailSesion) {
    return null;
  }

  useEffect(() => {
    const fetchReparaciones = async () => {
      try {
        await getReparaciones(dispatch);
        setLoading(false);
      } catch (error) {
        toast.error("No se pudo obtener reparaciones");
      }
    };

    if (rolSesion && rolSesion !== "Cliente" && emailSesion) {
      fetchReparaciones();
    }
  }, [rolSesion, emailSesion, dispatch]);

  return (
    <div className="flex">
      <div className="w-1/4">
        <ComponenteNavbar />
      </div>
      <div className="w-3/4">
        {loading ? (<Spinner color="info" size="lg" />) : (<ListaVisualizacionServiciosTecnico />)}
      </div>
    </div>
  );
};

export default PantallaLandingTecnico;
