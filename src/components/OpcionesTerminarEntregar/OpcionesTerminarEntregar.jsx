import React from "react";
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, toast, ButtonGroup } from "keep-react";
import { postEntregarReparacion } from "../../store/effects";
import ModalTerminarServicio from "./ModalTerminarServicio";

const OpcionesTerminarEntregar = ({ servicio }) => {
  const navigate = useNavigate();

  const generarOrdenReparacion = (blob) => {
    if (blob == null) return;

    if (!blob) {
      toast.error("Error al generar orden");
      return;
    }

    if (!(blob instanceof Blob)) {
      console.error(
        "Unexpected data format. Ensure Blob or valid data for PDF generation."
      );
      return;
    }
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orden_${servicio.numeroSerie}_${servicio.clienteNombre}_${clienteApellido}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const manejarClickEntregar = async () => {
    try {
      const blob = await postEntregarReparacion(servicio);
      navigate("/");
      generarOrdenReparacion(blob);
      toast("Entrega realizada", {
        description: "El servicio ha sido entregado al cliente",
      });
    } catch (error) {
      toast.error("Ha habido un error al realizar la entrega");
    }
  };

  return (
    <div className="max-w-[250px]">
      <ButtonGroup>
        <ModalTerminarServicio servicio={servicio} />
        <Button
          size="xs"
          onClick={manejarClickEntregar}
          disabled={servicio.estado !== "Terminada"}
        >
          Entregar
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default OpcionesTerminarEntregar;
