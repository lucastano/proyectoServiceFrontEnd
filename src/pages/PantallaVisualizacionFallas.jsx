import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner, toast } from 'keep-react';
import { getFallas } from '../store/effects';
import { useEmailSesion, useRolSesion } from '../store/selectors';
import ComponenteNavbar from '../components/ComponenteNavbar/ComponenteNavbar';
import VisualizacionListaFallas from '../components/VisualizacionListaFallas/VisualizacionListaFallas';

function PantallaVisualizacionFallas() {
    const rolSesion = useRolSesion();
    const emailSesion = useEmailSesion();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
  
    if (!rolSesion || rolSesion == "Cliente" || !emailSesion) {
      return null;
    }
  
    useEffect(() => {
      const fetchFallas = async () => {
        try {
          await getFallas(dispatch);
          setLoading(false);
        } catch (error) {
          toast.error("No se pudo obtener fallas");
        }
      };
  
      if (rolSesion && rolSesion !== "Cliente" && emailSesion) {
        fetchFallas();
      }
    }, [rolSesion, emailSesion, dispatch]);

    return (
        <div className="flex">
          <div className="w-1/4">
            <ComponenteNavbar />
          </div>
          <div className="w-3/4">
            {loading ? (<Spinner color="info" size="lg" />) : (<VisualizacionListaFallas />)}
          </div>
        </div>
      );
}

export default PantallaVisualizacionFallas;