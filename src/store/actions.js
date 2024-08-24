//export const TRAER_SERVICIO_EXITO = "TRAER_SERVICIO_EXITO";
export const TRAER_CLIENTE_EXITO = "TRAER_CLIENTE_EXITO";
//export const TRAER_SERVICIOS_CLIENTE_EXITO = "TRAER_SERVICIOS_CLIENTE_EXITO";
export const TRAER_CLIENTES_EXITO = "TRAER_CLIENTES_EXITO";
//export const TRAER_SERVICIOS_EXITO = "TRAER_SERVICIOS_EXITO";
export const TRAER_REPARACIONES_EXITO = "TRAER_REPARACIONES_EXITO";
export const TRAER_REPARACIONES_TALLER_EXITO =
  "TRAER_REPARACIONES_TALLER_EXITO";
export const TRAER_REPARACIONES_PRESUPUESTADAS_EXITO =
  "TRAER_REPARACIONES_PRESUPUESTADAS_EXITO";
export const ALTA_CLIENTE_EXITO = "ALTA_CLIENTE_EXITO";
//export const ALTA_SERVICIO_EXITO = "ALTA_SERVICIO_EXITO";
export const ALTA_REPARACION_EXITO = "ALTA_REPARACION_EXITO";
export const PRESUPUESTAR_REPARACION_EXITO = "PRESUPUESTAR_REPARACION_EXITO";
//export const ENTREGAR_REPARACION_EXITO = "ENTREGAR_REPARACION_EXITO";
export const ALTA_TECNICO_EXITO = "ALTA_TECNICO_EXITO";
export const ALTA_ADMIN_EXITO = "ALTA_ADMIN_EXITO";
export const TRAER_TECNICOS_EXITO = "TRAER_TECNICOS_EXITO";
export const TRAER_ADMINS_EXITO = "TRAER_ADMINS_EXITO";
export const LOGIN_EXITO = "LOGIN_EXITO";
export const LOGOUT_EXITO = "LOGOUT_EXITO";
//export const RECHAZAR_PRESUPUESTO_EXITO = "RECHAZAR_PRESUPUESTO_EXITO";
//export const TERMINAR_REPARACION_EXITO = "TERMINAR_REPARACION_EXITO";
export const ACEPTAR_PRESUPUESTO_EXITO = "ACEPTAR_PRESUPUESTO_EXITO";
//export const CAMBIAR_PRESUPUESTO_EXITO = "CAMBIAR_PRESUPUESTO_EXITO";
//export const CAMBIAR_SERVICIO_EXITO = "CAMBIAR_SERVICIO_EXITO";
export const PRESUPUESTAR_SERVICIO_EXITO = "PRESUPUESTAR_SERVICIO_EXITO";
//export const POST_MENSAJE_EXITO = "POST_MENSAJE_EXITO";
export const TRAER_MENSAJES_EXITO = "TRAER_MENSAJES_EXITO";
export const TRAER_PRODUCTOS_EXITO = "TRAER_PRODUCTOS_EXITO";
export const CREAR_PRODUCTO_EXITO = "CREAR_PRODUCTO_EXITO";
export const ALTA_FALLA_EXITO = "ALTA_FALLA_EXITO";
export const TRAER_FALLAS_EXITO = "TRAER_FALLAS_EXITO";

export const crearProductoExito = (producto) => {
  return {
    type: CREAR_PRODUCTO_EXITO,
    payload: producto,
  };
};

export const traerProductosExito = (productos) => {
  return {
    type: TRAER_PRODUCTOS_EXITO,
    payload: productos,
  };
};

export const traerMensajesExito = (mensajes) => {
  return {
    type: TRAER_MENSAJES_EXITO,
    payload: mensajes,
  };
};
/*
export const postMensajeExito = (mensaje) => {
  return {
    type: POST_MENSAJE_EXITO,
    payload: mensaje,
  };
};
*/
export const prespuestarReparacionExito = (servicio) => {
  return {
    type: PRESUPUESTAR_REPARACION_EXITO,
    payload: servicio,
  };
};
/*
export const cambiarServicioExito = (servicio) => {
  return {
    type: CAMBIAR_SERVICIO_EXITO,
    payload: servicio,
  };
};

export const cambiarPresupuestoExito = (reparacion) => {
  return {
    type: CAMBIAR_PRESUPUESTO_EXITO,
    payload: reparacion,
  };
};

export const terminarReparacionExito = (reparacion) => {
  return {
    type: TERMINAR_REPARACION_EXITO,
    payload: reparacion,
  };
};

export const rechazarPresupuestoExito = (servicio) => {
  return {
    type: RECHAZAR_PRESUPUESTO_EXITO,
    payload: servicio,
  };
};

export const entregarReparacionExito = (reparacion) => {
  return {
    type: ENTREGAR_REPARACION_EXITO,
    payload: reparacion,
  };
};
*/
export const aceptarPresupuestoExito = (servicio) => {
  return {
    type: ACEPTAR_PRESUPUESTO_EXITO,
    payload: servicio,
  };
};

export const presupuestarReparacionExito = (servicio) => {
  return {
    type: PRESUPUESTAR_SERVICIO_EXITO,
    payload: servicio,
  };
};

export const traerReparacionesPresupuestadasExito = (reparaciones) => {
  return {
    type: TRAER_REPARACIONES_PRESUPUESTADAS_EXITO,
    payload: reparaciones,
  };
};

export const traerReparacionesExito = (reparaciones) => {
  return {
    type: TRAER_REPARACIONES_EXITO,
    payload: reparaciones,
  };
};

export const traerReparacionesTallerExito = (reparaciones) => {
  return {
    type: TRAER_REPARACIONES_TALLER_EXITO,
    payload: reparaciones,
  };
};

export const altaFallaExito = (falla) => {
  return {
    type: ALTA_FALLA_EXITO,
    payload: falla,
  };
};

export const traerFallasExito = (fallas) => {
  return {
    type: TRAER_FALLAS_EXITO,
    payload: fallas,
  };
};

export const traerTecnicosExito = (tecnicos) => {
  return {
    type: TRAER_TECNICOS_EXITO,
    payload: tecnicos,
  };
};
export const traerAdminsExito = (admins) => {
  return {
    type: TRAER_ADMINS_EXITO,
    payload: admins,
  };
};

export const altaTecnicoExito = (tecnico) => {
  return {
    type: ALTA_TECNICO_EXITO,
    payload: tecnico,
  };
};
/*
export const traerServicioExito = (servicio) => {
  return {
    type: TRAER_SERVICIO_EXITO,
    payload: servicio,
  };
};

export const traerServiciosClienteExito = (servicios) => {
  return {
    type: TRAER_SERVICIOS_CLIENTE_EXITO,
    payload: servicios,
  };
};

export const traerServiciosExito = (servicios) => {
  return {
    type: TRAER_SERVICIOS_EXITO,
    payload: servicios,
  };
};

export const altaServicioExito = (ordenServicio) => {
  return {
    type: ALTA_SERVICIO_EXITO,
    payload: ordenServicio,
  };
};
*/

export const traerClienteExito = (cliente) => {
  return {
    type: TRAER_CLIENTE_EXITO,
    payload: cliente,
  };
};

export const traerClientesExito = (clientes) => {
  return {
    type: TRAER_CLIENTES_EXITO,
    payload: clientes,
  };
};

export const altaClienteExito = (cliente) => {
  return {
    type: ALTA_CLIENTE_EXITO,
    payload: cliente,
  };
};

export const loginExito = (usuario) => {
  return {
    type: LOGIN_EXITO,
    payload: usuario,
  };
};

export const logoutExito = () => {
  return {
    type: LOGOUT_EXITO,
  };
};
