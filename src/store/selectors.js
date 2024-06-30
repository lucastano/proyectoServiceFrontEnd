import { useSelector } from 'react-redux';

export const getSesion = state => state.sesion;

const getCISesion = state => state.sesion.ci;

export const useCedulaSesion = () => {
    const cedula = useSelector(getCISesion); 
    return cedula;
  };

const getRolSesion = state => state.sesion.rol;

export const useRolSesion = () => {
    const rol = useSelector(getRolSesion); 
    return rol;
  
}

const getError = state => state.error;

export const useError = () => {
    const error = useSelector(getError); 
    return error;
}

const getServicios = state => state.servicios;

export const useServicios = () => {
    const servicios = useSelector(getServicios); 
    return servicios;
};
