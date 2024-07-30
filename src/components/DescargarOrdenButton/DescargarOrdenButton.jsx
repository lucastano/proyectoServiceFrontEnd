import React from 'react';
import { Button, toast } from 'keep-react';
import { getOrden } from '../../dataFetcher';

function DescargarOrdenButton({idServicio}) {
    const manejarGenerarOrden = async () => {
        const ordenGenerada = await getOrden(idServicio);

        if(ordenGenerada === null) {
            toast.error("Error al generar orden");
        } else {
            const link = document.createElement('a');
            const blob = new Blob([atob(ordenGenerada)], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `${idServicio}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Liberar el objeto URL
        }
    }

    return (
        <div>
            <Button onClick={manejarGenerarOrden}>Generar Orden</Button>
        </div>
    );
}

export default DescargarOrdenButton;