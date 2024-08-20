import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import { useRolSesion, useEmailSesion } from "../store/selectors";
import MetricasNegocio from "../components/MetricasNegocio/MetricasNegocio";
import { getReparaciones, getTecnicos } from "../store/effects";
import { Spinner, toast } from "keep-react";

const PantallaLandingAdmin = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  if (!rolSesion || rolSesion != "Administrador" || !emailSesion) {
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
    const fetchTecnicos = async () => {
      try {
        await getTecnicos(dispatch);
        setLoading(false);
      } catch (error) {
        toast.error("No se pudo obtener tecnicos");
      }
    };

    if (rolSesion && rolSesion !== "Cliente" && emailSesion) {
      fetchTecnicos();
      fetchReparaciones();
    }
  }, [rolSesion, emailSesion, dispatch]);

  return (
    <div className="flex">
      <div className="w-1/4">
        <ComponenteNavbar />
      </div>
      <div className="flex justify-center w-3/4">
      {loading ? (<Spinner color="info" size="lg" />) : (<MetricasNegocio />)}
      </div>
    </div>
  );
};

export default PantallaLandingAdmin;
