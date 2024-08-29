import React from "react";
import { Button, toast } from "keep-react";
import { getOrden } from "../../dataFetcher";

function DescargarOrdenButton({ servicio }) {
  const manejarGenerarOrden = async () => {
    const blob = await getOrden(servicio.id);
    
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
    link.download = `orden_${servicio.numeroSerie}_${servicio.clienteNombre}_${servicio.clienteApellido}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Button color="success" onClick={manejarGenerarOrden}>Generar Orden</Button>
    </div>
  );
}

export default DescargarOrdenButton;
