import React from 'react';
import { useParams } from 'react-router-dom';
import { useRolSesion, useEmailSesion, useServicioPorId } from '../store/selectors';
import ComponenteNavbar from '../components/ComponenteNavbar/ComponenteNavbar';
import DetalleVisualizacionServicio from '../components/DetalleVisualizacionServicio/DetalleVisualizacionServicio';

const PantallaDetalleServicio = () => {
    const { idServicio } = useParams();
    const rolSesion = useRolSesion();
    const emailSesion = useEmailSesion();
    const servicio = useServicioPorId(idServicio);
  
    if (!rolSesion || !emailSesion || servicio == undefined) {
      return null;
    }
  
    return (
      <div className="flex">
        <div className="w-1/4">
          <ComponenteNavbar />
        </div>
        <div className="flex justify-center w-3/4">
          <DetalleVisualizacionServicio servicio={servicio} />
        </div>
      </div>
    );
};

export default PantallaDetalleServicio;