import { useSelector } from 'react-redux';

export const getSesion = state => state.sesion;

const getCISesion = state => getSesion(state)?.ci;

export const useCedulaSesion = () => {
    const cedula = useSelector(getCISesion); 
    return cedula;
  };

const getEmailSesion = state => getSesion(state)?.email;

export const useEmailSesion = () => {
    const cedula = useSelector(getEmailSesion); 
    return cedula;
  };
const getRolSesion = state => getSesion(state)?.rol;

export const useRolSesion = () => {
    const rol = useSelector(getRolSesion); 
    return rol;
  
}

const getIdSesion = state => state.sesion.id;

export const useIdSesion = () => {
    const id = useSelector(getIdSesion); 
    return id;
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

export const useServiciosPorFechas = (fechaInicio, fechaFin) => {
    const servicios = useSelector(getServicios); 
    const serviciosFiltrados = servicios.filter(servicio => {
        const fechaServicio = new Date(servicio.fecha);
        return fechaServicio >= fechaInicio && fechaServicio <= fechaFin;
    });

    return serviciosFiltrados;
}


const getClientes = state => state.clientes;

export const useClientes = () => {
    const clientes = useSelector(getClientes); 
    return clientes;

}

const getClientePorCi = (state, ci) => state.clientes.find(cliente => cliente.ci === ci);

export const useClientePorCi = (ci) => {
    const cliente = useSelector(state => getClientePorCi(state, ci));
    return cliente;
}
const getServicioPorId = (state, id) => state.servicios.find(servicio => servicio.id === id);

export const useServicioPorId = (id) => {
    const servicio = useSelector(state => getServicioPorId(state, id));
    return servicio;
}

const getTecnicoPorId = (state, id) => state.tecnicos.find(tecnico => tecnico.id === id);

export const useTecnicoPorId = (id) => {
    const tecnico = useSelector(state => getTecnicoPorId(state, id));
    return tecnico;
}

const getServiciosPorTecnico = (state, idTecnico) => state.servicios.filter(servicio => servicio.idTecnico === idTecnico);

export const useServiciosPorTecnico = (idTecnico) => {
    const servicios = useSelector(state => getServiciosPorTecnico(state, idTecnico));
    return servicios;
}

const getTecnicos = state => state.tecnicos;

export const useTecnicos = () => {
    const tecnicos = useSelector(getTecnicos); 
    return tecnicos;
}

const getMensajes = state => state.mensajes;

export const useMensajes = () => {
    const mensajes = useSelector(getMensajes); 
    return mensajes;
}


export const useEstadosReparaciones = (arrayServicios) => {
    const estados = [];

    arrayServicios.forEach(servicio => {
        estados.push(servicio.estado);
    })
    
    return estados;
}

export const useTecnicosReparaciones = (arrayServicios) => {
    const tecnicos = [];

    arrayServicios.forEach(servicio => {
        if(servicio.idTecnico) {
            tecnicos.push(servicio.idTecnico);
        }
    });

    return tecnicos;
}

export const useNumeroSerieReparaciones = (arrayServicios) => {
    const aparatos = [];

    arrayServicios.forEach(servicio => {
        aparatos.push(servicio.numeroSerie);
    });

    return aparatos;
}

export const useCantidadesPorParametro = (array) => {
    const cantidades = {};

    array.forEach(item => {
        if(cantidades[item]) {
            cantidades[item]++;
        } else {
            cantidades[item] = 1;
        }
    })

    return cantidades;
} 