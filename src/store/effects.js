import {
  traerAdminsExito,
  traerAdminsError,
  traerClientesExito,
  traerClientesError,
  traerClienteExito,
  traerClienteError,
  traerReparacionesExito,
  traerReparacionesError,
  traerReparacionesTallerExito,
  traerReparacionesTallerError,
  traerReparacionesPresupuestadasExito,
  traerReparacionesPrespuestadasError,
  traerTecnicosExito,
  traerTecnicosError,
  altaClienteExito,
  altaClienteError,
  altaServicioExito,
  altaServicioError,
  presupuestarReparacionExito,
  presupuestarReparacionError,
  altaTecnicoExito,
  altaTecnicoError,
  loginExito,
  loginError,
  logoutExito,
  aceptarPresupuestoExito,
  aceptarPresupuestoError,
  rechazarPresupuestoExito,
  rechazarPresupuestoError,
  terminarReparacionExito,
  terminarReparacionError,
  entregarReparacionExito,
  entregarReparacionError,
  cambiarPresupuestoExito,
  cambiarPresupuestoError,
} from "./actions";

const apiUrl = "https://proyectoserviceapirest20240712211208.azurewebsites.net";

async function putServicio(dispatch, servicio) {
  const { id, fechaPromesaPresupuesto, numeroSerie, descripcion } = servicio;
  const url = `${apiUrl}/api/Reparaciones/ModificarDatosReparacion?id=${id}&fechaPromesaPresupuesto=${fechaPromesaPresupuesto}&numeroSerie=${numeroSerie}&descripcion=${descripcion}`;
  const token = localStorage.getItem("token"); 

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(cambiarServicioExito(datos));
  } catch (error) {
    console.error(error);
    dispatch(cambiarServicioError(error));
  }
}
async function putPresupuesto(dispatch, presupuesto) {
  const {id, costo, descripcion } = presupuesto;
  const url = `${apiUrl}/api/Reparaciones/ModificarPresupuestoReparacion?id=${id}&costo=${costo}&descripcion=${descripcion}`;
const token = localStorage.getItem("token"); 

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(cambiarPresupuestoExito(datos));
  } catch (error) {
    console.error(error);
    dispatch(cambiarPresupuestoError(error));
  }
}

//get administradores
async function getAdministradores(dispatch) {
  const url = "${apiUrl}/api/Administradores";
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(traerAdminsExito(datos));
  } catch (error) {
    console.error("Error al obtener administradores:", error);
    dispatch(traerAdminsError(error));
  }
}

//get clientes
async function getClientes(dispatch) {
  const url = "${apiUrl}/api/Clientes";
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos.clientes);
    dispatch(traerClientesExito(datos.clientes));
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    dispatch(traerClientesError(error));
  }
}

//get cliente por ci
async function getClientePorCI(cedula, dispatch) {
  const url = `${apiUrl}/api/Clientes/ObtenerClientePorCi?ci=${cedula}`;
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(traerClienteExito(datos));
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    dispatch(traerClienteError(error));
  }
}

//get reparaciones
async function getReparaciones(dispatch) {
  const url = "${apiUrl}/api/Reparaciones/TodasLasReparaciones";
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos.reparaciones);
    dispatch(traerReparacionesExito(datos.reparaciones));
  } catch (error) {
    console.error("Error al obtener reparaciones:", error);
    dispatch(traerReparacionesError(error));
  }
}

//get reparaciones por ci
async function getReparacionesPorCI(cedula, dispatch) {
  const url = `${apiUrl}/api/Reparaciones/ObtenerReparacionesPorCi?ci=${cedula}`;
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos.reparaciones);
    dispatch(traerReparacionesExito(datos.reparaciones));
  } catch (error) {
    console.error("Error al obtener reparaciones:", error);
    dispatch(traerReparacionesError(error));
  }

}

//get reparaciones en taller
async function getReparacionesEnTaller(dispatch) {
  const url = "${apiUrl}/api/Reparaciones/EnTaller";
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(traerReparacionesTallerExito(datos));
  } catch (error) {
    console.error("Error al obtener reparaciones en taller:", error);
    dispatch(traerReparacionesTallerError(error));
  }
}

//get reparaciones presupuestadas
async function getReparacionesPresupuestadas(dispatch) {
  const url = "${apiUrl}/api/Reparaciones/Presupuestadas";
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(traerReparacionesPresupuestadasExito(datos));
  } catch (error) {
    console.error("Error al obtener reparaciones presupuestadas:", error);
    dispatch(traerReparacionesPrespuestadasError(error));
  }
}

//get tecnicos
async function getTecnicos(dispatch) {
  const url = "${apiUrl}/api/Tecnicos";
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(traerTecnicosExito(datos.tecnicos));
  } catch (error) {
    console.error("Error al obtener técnicos:", error);
    dispatch(traerTecnicosError(error));
  }
}

//post cliente
async function postCliente(nuevoCliente, dispatch) {
  const url = "${apiUrl}/api/Clientes";
  const data = JSON.stringify(nuevoCliente);
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: data,
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(altaClienteExito(datos));
  } catch (error) {
    console.error("Error al crear cliente:", error);
    dispatch(altaClienteError(error));
  }
}

//post reparacion
async function postReparacion(nuevaReparacion, dispatch) {
  const url = "${apiUrl}/api/Reparaciones";
  const data = JSON.stringify(nuevaReparacion);
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization: `Bearer ${token}`
    },
    body: data,
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(altaServicioExito(datos));
  } catch (error) {
    console.error("Error al crear reparación:", error);
    dispatch(altaServicioError(error));
  }
}

//post presupuestacion reparacion
async function postPresupuestacionReparacion(reparacion, dispatch) {
  const { idReparacion, manoObra, descripcion, fechaPromesaEntrega } = reparacion;
  const url = '${apiUrl}/api/Reparaciones/Presupuestar';
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      id: idReparacion,
      manoObra: manoObra,
      descripcion: descripcion,
      fechaPromesaEntrega: fechaPromesaEntrega
    })
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(presupuestarReparacionExito(datos));
  } catch (error) {
    console.error("Error al presupuestar reparación:", error);
    dispatch(presupuestarReparacionError(error));
  }
}

async function postTerminarReparacion(terminoReparacion, dispatch) {
  const { idReparacion, fueReparada } = terminoReparacion;
  const url = `${apiUrl}/api/Reparaciones/TerminarReparacion?id=${idReparacion}&reparada=${fueReparada}`;
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "POST",
    headers: {
      accept: "text/plain",
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(terminarReparacionExito(datos));
  } catch (error) {
    console.error("Error al terminar reparación:", error);
    dispatch(terminarReparacionError(error));
  }

}
async function postEntregarReparacion(reparacion, dispatch) {
  const { idReparacion } = reparacion;
  const url = `${apiUrl}/api/Reparaciones/EntregarReparacion?id=${idReparacion}`;
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "POST",
    headers: {
      accept: "text/plain",
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(entregarReparacionExito(datos));
  } catch (error) {
    console.error("Error al entregar reparación:", error);
    dispatch(entregarReparacionError(error));
  }
}

async function postAceptarPresupuesto(reparacion, dispatch) {
  const { idReparacion } = reparacion;
  const url = `${apiUrl}/api/Reparaciones/AceptarPresupuesto?id=${idReparacion}`;
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`
    },
    body: ''
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(aceptarPresupuestoExito(datos));
  } catch (error) {
    console.error("Error al aceptar presupuesto:", error);
    dispatch(aceptarPresupuestoError(error));
  }
}


async function postRechazarPresupuesto(rechazo, dispatch) {
  const { id, costo, razon } = rechazo;
  const url = `${apiUrl}/api/Reparaciones/RechazarPresupuesto?id=${id}&costo=${costo}&razon=${razon}`;
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`
    },
    body: ''
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(rechazarPresupuestoExito(datos));
  } catch (error) {
    console.error("Error al rechazar presupuesto:", error);
    dispatch(rechazarPresupuestoError(error));
  }
}

//post tecnico
async function postTecnico(nuevoTecnico, dispatch) {
  const url = "${apiUrl}/api/Tecnicos";
  const data = JSON.stringify(nuevoTecnico);
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: data,
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(altaTecnicoExito(datos));
  } catch (error) {
    console.error("Error al crear técnico:", error);
    dispatch(altaTecnicoError(error));
  }
}

//post administrador
async function postAdministrador(nuevoAdmin, dispatch) {
  const url = "${apiUrl}/api/Administradores";
  const data = JSON.stringify(nuevoAdmin);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: data,
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(altaAdminExito(datos));
  } catch (error) {
    console.error("Error al crear administrador:", error);
    dispatch(altaAdminError(error));
  }
}

//post login
async function login(user, dispatch) {
  const url = "${apiUrl}/api/Seguridad";
  const data = JSON.stringify(user);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: data,
  };
  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos); 

    if (datos.token) {
      localStorage.setItem("token", datos.token);
    };

    dispatch(loginExito(datos.usuario));
  } catch (error) {
    console.error("Error al realizar login:", error);
    dispatch(loginError(error));
  }
}



async function logout(dispatch) {
  localStorage.removeItem("token");

  dispatch(logoutExito());
}
export {
  getAdministradores,
  getClientes,
  getClientePorCI,
  getReparaciones,
  getReparacionesPorCI,
  getReparacionesEnTaller,
  getReparacionesPresupuestadas,
  getTecnicos,
  postCliente,
  postReparacion,
  postPresupuestacionReparacion,
  postTecnico,
  postAdministrador,
  postEntregarReparacion,
  postAceptarPresupuesto,
  postRechazarPresupuesto,
  postTerminarReparacion,
  login,
  logout,
  putServicio,
  putPresupuesto,
};
