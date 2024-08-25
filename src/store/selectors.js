import { useSelector } from 'react-redux';

const getProductos = state => state.productos;

export const useProductos = () => {
    const productos = useSelector(getProductos); 
    return productos;
}

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

const getIdSesion = state => getSesion(state)?.id;

export const useIdSesion = () => {
    const id = useSelector(getIdSesion); 
    return id;
}

const getServicios = state => {
    return state.servicios;
}

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

const getClientePorCi = (state, ci) => getClientes(state)?.find(cliente => cliente.ci == ci);

export const useClientePorCi = (ci) => {
    const cliente = useSelector(state => getClientePorCi(state, ci));
    return cliente;
}
const getServicioPorId = (state, id) => {
    return state.servicios.find(servicio => Number(servicio.id) === Number(id));
}

export const useServicioPorId = (id) => {
    const servicio = useSelector(state => getServicioPorId(state, id));
    return servicio;
}

const getTecnicoPorId = (state, id) => {
    return state.tecnicos.find(tecnico => Number(tecnico.id) === Number(id));
}

export const useTecnicoPorId = (id) => {
    const tecnico = useSelector(state => getTecnicoPorId(state, id));
    return tecnico;
}

const getServiciosPorTecnico = (state, tecnicoId) => state.servicios.filter(servicio => Number(servicio.tecnicoId) === Number(tecnicoId));

export const useServiciosPorTecnico = (tecnicoId) => {
    const servicios = useSelector(state => getServiciosPorTecnico(state, tecnicoId));
    return servicios;
}

const getTecnicos = state => state.tecnicos;

export const useTecnicos = () => {
    const tecnicos = useSelector(getTecnicos); 
    return tecnicos;
}

const getFallas = state => state.fallas;

export const useFallas = () => {
    const fallas = useSelector(getFallas);
    return fallas;
}

const getOrdenReparacion = state => state.ordenReparacion;

export const useOrdenReparacion = () => {
    const orden = useSelector(getOrdenReparacion);
    return orden;
}

const getMensajes = state => state.mensajes;

export const useMensajes = () => {
    const mensajes = useSelector(getMensajes); 
    return mensajes;
}


export const useEstadosReparaciones = () => {
    const estados = [];
    const servicios = useSelector(getServicios); 

    servicios.forEach(servicio => {
        estados.push(servicio.estado);
    })
    
    return estados;
}

export const useEstadosReparacionesPorFechas = (fechaInicio, fechaFin) => {
    const estados = [];
    const servicios = useSelector(getServicios); 

    servicios.forEach(servicio => {
        if(servicio.fecha >= fechaInicio && servicio.fecha <= fechaFin) {
            estados.push(servicio.estado);
        }
    });

    return estados;
}

export const useTecnicosReparaciones = () => {
    const arrayTecnicos = [];
    const servicios = useSelector(getServicios); 
    const tecnicos = useSelector(getTecnicos);

    servicios !== null && servicios.forEach(servicio => {
        if(servicio.tecnicoId) {
            let tecnicoTemp = tecnicos.find(tecnico => Number(tecnico.id) === Number(servicio.tecnicoId));
            console.log(tecnicoTemp);
            arrayTecnicos.push(servicio.tecnicoId + " " + tecnicoTemp.nombre + " " + tecnicoTemp.apellido);
        }
    });

    return arrayTecnicos;
}

export const useTecnicosReparacionesPorFechas = (fechaInicio, fechaFin) => {
    const arrayTecnicos = [];
    const servicios = useSelector(getServicios); 
    const tecnicos = useSelector(getTecnicos);

    servicios.forEach(servicio => {
        if(servicio.fecha >= fechaInicio && servicio.fecha <= fechaFin) {
            let tecnicoTemp = tecnicos.find(tecnico => Number(tecnico.id) === Number(servicio.tecnicoId));
            arrayTecnicos.push(servicio.tecnicoId + " " + tecnicoTemp.nombre + " " + tecnicoTemp.apellido);
        }
    });

    return arrayTecnicos;
}

export const useNumeroSerieReparaciones = () => {
    const aparatos = [];
    const servicios = useSelector(getServicios); 

    servicios.forEach(servicio => {
        aparatos.push(servicio.numeroSerie);
    });

    return aparatos;
}

export const useNumeroSerieReparacionesPorFechas = (fechaInicio, fechaFin) => {
    const aparatos = [];
    const servicios = useSelector(getServicios); 

    servicios.forEach(servicio => {
        if(servicio.fecha >= fechaInicio && servicio.fecha <= fechaFin) {
            aparatos.push(servicio.numeroSerie);
        }
    });

    return aparatos;
}

export const useCantidadReparaciones = () => {
    const servicios = useSelector(getServicios); 
    return servicios.length;
}

export const useCantidadReparacionesPorFechas = (fechaInicio, fechaFin) => {
    const servicios = useSelector(getServicios);
    const serviciosFiltrados = [];

    servicios.forEach(servicio => {
        if(servicio.fecha >= fechaInicio && servicio.fecha <= fechaFin) {
            serviciosFiltrados.push(servicio);
        }
    });

    return serviciosFiltrados.length;
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