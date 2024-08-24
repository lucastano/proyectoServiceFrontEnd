import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ComponenteNavbar from "../components/ComponenteNavbar/ComponenteNavbar";
import ContenedorOpcionesLogin from "../components/ContenedorOpcionesLogin/ContenedorOpcionesLogin";
import { useRolSesion, useEmailSesion } from "../store/selectors";

const PantallaLogin = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();
  const navigate = useNavigate();

  useEffect(() => {
    if (rolSesion || emailSesion) {
      if (rolSesion == "Cliente") {
        navigate("/servicios");
      } else if (rolSesion == "Tecnico") {
        navigate("/serviciostecnico");
      } else if (rolSesion == "Administrador") {
        navigate("/metricas");
      }
    }
  }, [rolSesion, emailSesion, navigate]);

  return (
    <div className="flex ">
      <div className="w-1/4">
      <ComponenteNavbar />
      </div>
      <div className="flex justify-center w-3/4">
        <ContenedorOpcionesLogin />
      </div>
    </div>
  );
};

export default PantallaLogin;