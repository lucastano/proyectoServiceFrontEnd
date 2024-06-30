export const TRAER_SERVICIO_EXITO = 'TRAER_SERVICIO_EXITO';
export const TRAER_SERVICIO_ERROR = 'TRAER_SERVICIO_ERROR';
export const TRAER_CLIENTE_EXITO = 'TRAER_CLIENTE_EXITO';
export const TRAER_SERVICIOS_CLIENTE_EXITO = 'TRAER_SERVICIOS_CLIENTE_EXITO';
export const TRAER_SERVICIOS_CLIENTE_ERROR = 'TRAER_SERVICIOS_CLIENTE_ERROR';
export const TRAER_REPUESTOS_EXITO = 'TRAER_REPUESTOS_EXITO';
export const TRAER_REPUESTOS_ERROR = 'TRAER_REPUESTOS_ERROR';
export const TRAER_CLIENTES_EXITO = 'TRAER_CLIENTES_EXITO';
export const TRAER_CLIENTES_ERROR = 'TRAER_CLIENTES_ERROR';
export const TRAER_SERVICIOS_EXITO = 'TRAER_SERVICIOS_EXITO';
export const TRAER_SERVICIOS_ERROR = 'TRAER_SERVICIOS_ERROR';
export const TRAER_REPARACIONES_EXITO = 'TRAER_REPARACIONES_EXITO';
export const TRAER_REPARACIONES_ERROR = 'TRAER_REPARACIONES_ERROR';
export const TRAER_REPARACIONES_TALLER_EXITO = 'TRAER_REPARACIONES_TALLER_EXITO';
export const TRAER_REPARACIONES_TALLER_ERROR = 'TRAER_REPARACIONES_TALLER_ERROR';
export const TRAER_REPARACIONES_PRESUPUESTADAS_EXITO = 'TRAER_REPARACIONES_PRESUPUESTADAS_EXITO';
export const TRAER_REPARACIONES_PRESUPUESTADAS_ERROR = 'TRAER_REPARACIONES_PRESUPUESTADAS_ERROR';
export const ALTA_CLIENTE_EXITO = 'ALTA_CLIENTE_EXITO';
export const ALTA_CLIENTE_ERROR = 'ALTA_CLIENTE_ERROR';
export const ALTA_SERVICIO_EXITO = 'ALTA_SERVICIO_EXITO';  
export const ALTA_SERVICIO_ERROR = 'ALTA_SERVICIO_ERROR';
export const ALTA_REPARACION_EXITO = 'ALTA_REPARACION_EXITO';
export const ALTA_REPARACION_ERROR = 'ALTA_REPARACION_ERROR';
export const PRESUPUESTAR_SERVICIO_EXITO = 'PRESUPUESTAR_SERVICIO_EXITO';
export const PRESUPUESTAR_SERVICIO_ERROR = 'PRESUPUESTAR_SERVICIO_ERROR';
export const ALTA_TECNICO_EXITO = 'ALTA_TECNICO_EXITO';
export const ALTA_TECNICO_ERROR = 'ALTA_TECNICO_ERROR';
export const ALTA_ADMIN_EXITO = 'ALTA_ADMIN_EXITO';
export const ALTA_ADMIN_ERROR = 'ALTA_ADMIN_ERROR';
export const TRAER_TECNICOS_EXITO = 'TRAER_TECNICOS_EXITO';
export const TRAER_TECNICOS_ERROR = 'TRAER_TECNICOS_ERROR';
export const TRAER_ADMINS_EXITO = 'TRAER_ADMINS_EXITO';
export const TRAER_ADMINS_ERROR = 'TRAER_ADMINS_ERROR';
export const LOGIN_CLIENTE_EXITO = 'LOGIN_CLIENTE_EXITO';
export const LOGIN_TECNICO_EXITO = 'LOGIN_TECNICO_EXITO';
export const LOGIN_ADMIN_EXITO = 'LOGIN_ADMIN_EXITO';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_EXITO = 'LOGOUT_EXITO';

export const presupuestarServicioExito = (servicio) => {
    return {
        type: PRESUPUESTAR_SERVICIO_EXITO,
        payload: servicio
    };
};
export const presupuestarServicioError = (error) => {
    return {
        type: PRESUPUESTAR_SERVICIO_ERROR,
        payload: error
    };
};
export const traerReparacionesPresupuestadasExito = (reparaciones) => {
    return {
        type: TRAER_REPARACIONES_PRESUPUESTADAS_EXITO,
        payload: reparaciones
    };
};
export const traerReparacionesPrespuestadasError = (error) => {
    return {
        type: TRAER_REPARACIONES_PRESUPUESTADAS_ERROR,
        payload: error
    };
};
export const traerReparacionesExito = (reparaciones) => {
    return {
        type: TRAER_REPARACIONES_EXITO,
        payload: reparaciones
    };

};
export const traerReparacionesError = (error) => {
    return {
        type: TRAER_REPARACIONES_ERROR,
        payload: error
    };

};
export const traerReparacionesTallerExito = (reparaciones) => {
    return {
        type: TRAER_REPARACIONES_TALLER_EXITO,
        payload: reparaciones
    };
};
export const traerReparacionesTallerError = (error) => {
    return {
        type: TRAER_REPARACIONES_TALLER_ERROR,
        payload: error
    };
};
export const traerTecnicosExito = (tecnicos) => {
    return {
        type: TRAER_TECNICOS_EXITO,
        payload: tecnicos
    };
};
export const traerTecnicosError = (error) => {
    return {
        type: TRAER_TECNICOS_ERROR,
        payload: error
    };
};
export const traerAdminsExito = (admins) => {
    return {
        type: TRAER_ADMINS_EXITO,
        payload: admins
    };
};
export const traerAdminsError = (error) => {
    return {
        type: TRAER_ADMINS_ERROR,
        payload: error
    };
};
export const altaTecnicoExito = (tecnico) => {
    return {
        type: ALTA_TECNICO_EXITO,
        payload: tecnico
    };
};
export const altaTecnicoError = (error) => {
    return {
        type: ALTA_TECNICO_ERROR,
        payload: error
    };
};
export const traerServicioExito = (servicio) => {
    return {
        type: TRAER_SERVICIO_EXITO,
        payload: servicio
    };
};
export const traerServicioError = (error) => {
    return {
        type: TRAER_SERVICIO_ERROR,
        payload: error
    };
};
export const traerClienteExito = (cliente) => {
    return {
        type: TRAER_CLIENTE_EXITO,
        payload: cliente
    };
};
export const traerClienteError = (error) => {
    return {
        type: TRAER_CLIENTE_ERROR,
        payload: error
    };
}
export const traerServiciosClienteExito = (servicios) => {
    return {
        type: TRAER_SERVICIOS_CLIENTE_EXITO,
        payload: servicios
    };
};
export const traerServiciosClienteError = (error) => {
    return {
        type: TRAER_SERVICIOS_CLIENTE_ERROR,
        payload: error
    };
};
export const traerRepuestosExito = (repuestos) => {
    return {
        type: TRAER_REPUESTOS_EXITO,
        payload: repuestos
    };
};
export const traerRepuestosError = (error) => {
    return {
        type: TRAER_REPUESTOS_ERROR,
        payload: error
    };
};
export const traerClientesExito = (clientes) => {
    return {
        type: TRAER_CLIENTES_EXITO,
        payload: clientes
    };
};
export const traerClientesError = (error) => {
    return {
        type: TRAER_CLIENTES_ERROR,
        payload: error
    };
};
export const traerServiciosExito = (servicios) => {
    return {
        type: TRAER_SERVICIOS_EXITO,
        payload: servicios
    };
};
export const traerServiciosError = (error) => {
    return {
        type: TRAER_SERVICIOS_ERROR,
        payload: error
    };
};
export const altaClienteExito = (cliente) => {
    return {
        type: ALTA_CLIENTE_EXITO,
        payload: cliente
    };
};
export const altaClienteError = (error) => {
    return {
        type: ALTA_CLIENTE_ERROR,
        payload: error
    };
};
export const altaServicioExito = (servicio) => {
    return {
        type: ALTA_SERVICIO_EXITO,
        payload: servicio
    };
};
export const altaServicioError = (error) => {
    return {
        type: ALTA_SERVICIO_ERROR,
        payload: error
    };
};
export const loginClienteExito = (usuario) => {
    return {
        type: LOGIN_CLIENTE_EXITO,
        payload: usuario
    };
};
export const loginTecnicoExito = (usuario) => {
    return {
        type: LOGIN_TECNICO_EXITO,
        payload: usuario
    };
};
export const loginAdminExito = (usuario) => {
    return {
        type: LOGIN_ADMIN_EXITO,
        payload: usuario
    };
};
export const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: error
    };
};
export const logoutExito = () => {
    return {
        type: LOGOUT_EXITO
    };
};