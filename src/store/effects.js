import {
  traerAdminsExito,
  traerClientesExito,
  traerClienteExito,
  traerReparacionesExito,
  traerReparacionesTallerExito,
  traerReparacionesPresupuestadasExito,
  traerTecnicosExito,
  altaClienteExito,
  altaServicioExito,
  presupuestarReparacionExito,
  altaTecnicoExito,
  loginExito,
  logoutExito,
  aceptarPresupuestoExito,
  rechazarPresupuestoExito,
  terminarReparacionExito,
  entregarReparacionExito,
  cambiarPresupuestoExito,
  cambiarServicioExito,
  traerMensajesExito,
  postMensajeExito,
  traerProductosExito,
  crearProductoExito,
  lanzarError
} from "./actions";
import { config } from "../../config";

const { apiUrl } = config;

async function postProducto(dispatch, producto) {
  const url = `${apiUrl}/api/Productos`;
  const data = JSON.stringify(producto);
  const token = localStorage.getItem("token");
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  try {
    const response = await fetch(url, opciones);
    if (response.ok) {
      const datos = await response.json();
      dispatch(crearProductoExito(datos));
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

async function getProductos(dispatch) {
  const url = `${apiUrl}/api/Productos`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
  }
}

try {
  const response = await fetch(url, opciones);
  if (response.ok) {
    const data = await response.json();
    dispatch(traerProductosExito(data));
  } else {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
} catch (error) {
  dispatch(lanzarError(error));
}
}

async function getMensajes(dispatch, idServicio) {
  const url = `${apiUrl}/api/Mensajes/Mensajes?id=${idServicio}`;
  const opciones = {
    method: "GET",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, opciones);
    if (response.ok) {
      const datos = await response.json();
      dispatch(traerMensajesExito(datos));
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

async function postMensaje(dispatch, mensaje) {
  const url = `${apiUrl}/api/Mensajes`;
  const data = JSON.stringify(mensaje);
  const token = localStorage.getItem("token");
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  try {
    const response = await fetch(url, opciones);
    if (response.ok) {
      const datos = await respuesta.json();
      dispatch(postMensajeExito(datos));
    } else {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    }
  } catch (error) {
    dispatch(lanzarError(datos));
  }
}

async function putServicio(dispatch, servicio) {
  const { id, fechaPromesaPresupuesto, numeroSerie, descripcion } = servicio;
  const url = `${apiUrl}/api/Reparaciones/ModificarDatosReparacion?id=${id}&fechaPromesaPresupuesto=${fechaPromesaPresupuesto}&numeroSerie=${numeroSerie}&descripcion=${descripcion}`;
  const token = localStorage.getItem("token");

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(cambiarServicioExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}
async function putPresupuesto(dispatch, presupuesto) {
  const { id, costo, descripcion } = presupuesto;
  const url = `${apiUrl}/api/Reparaciones/ModificarPresupuestoReparacion?id=${id}&costo=${costo}&descripcion=${descripcion}`;
  const token = localStorage.getItem("token");

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(cambiarPresupuestoExito(datos));
    }
  } catch (error) {
    console.error(error);
    dispatch(lanzarError(error));
  }
}

//get administradores
async function getAdministradores(dispatch) {
  const url = `${apiUrl}/api/Administradores`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(traerAdminsExito(datos));
    }
  } catch (error) {
    console.error("Error al obtener administradores:", error);
    dispatch(lanzarError(error));
  }
}

//get clientes
async function getClientes(dispatch) {
  const url = `${apiUrl}/api/Clientes`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(traerClientesExito(datos.clientes));
    }
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    dispatch(lanzarError(error));
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
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(traerClienteExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//get reparaciones
async function getReparaciones(dispatch) {
  const url = `${apiUrl}/api/Reparaciones/TodasLasReparaciones`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(traerReparacionesExito(datos.reparaciones));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

async function getReparacionesPorCI(cedula, dispatch) {
  const url = `${apiUrl}/api/Reparaciones/TodasLasReparaciones`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      const reparacionesFiltradas = datos.reparaciones.filter(reparacion => reparacion.clienteCedula === cedula);
      console.log(reparacionesFiltradas);
      dispatch(traerReparacionesExito(reparacionesFiltradas));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//get reparaciones por ci
async function getReparacionesPorCI2(cedula, dispatch) {
  const url = `${apiUrl}/api/Reparaciones/ObtenerReparacionesPorCi?ci=${cedula}`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(traerReparacionesExito(datos.reparaciones));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//get reparaciones en taller
async function getReparacionesEnTaller(dispatch) {
  const url = `${apiUrl}/api/Reparaciones/EnTaller`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(traerReparacionesTallerExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//get reparaciones presupuestadas
async function getReparacionesPresupuestadas(dispatch) {
  const url = `${apiUrl}/api/Reparaciones/Presupuestadas`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(traerReparacionesPresupuestadasExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//get tecnicos
async function getTecnicos(dispatch) {
  const url = `${apiUrl}/api/Tecnicos`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(traerTecnicosExito(datos.tecnicos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//post cliente
async function postCliente(nuevoCliente, dispatch) {
  const url = `${apiUrl}/api/Clientes`;
  const data = JSON.stringify(nuevoCliente);
  const token = localStorage.getItem("token");
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(altaClienteExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//post reparacion
async function postReparacion(nuevaReparacion, dispatch) {
  console.log("nuevaReparacion en effect: ", nuevaReparacion);
  const url = `${apiUrl}/api/Reparaciones`;
  const data = JSON.stringify(nuevaReparacion);
  const token = localStorage.getItem("token");
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(altaServicioExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//post presupuestacion reparacion
async function postPresupuestacionReparacion(reparacion, dispatch) {
  const { idReparacion, manoObra, descripcion, fechaPromesaEntrega } =
    reparacion;
  const url = `${apiUrl}/api/Reparaciones/Presupuestar`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: idReparacion,
      manoObra: manoObra,
      descripcion: descripcion,
      fechaPromesaEntrega: fechaPromesaEntrega,
    }),
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(presupuestarReparacionExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
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
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(terminarReparacionExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
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
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(entregarReparacionExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
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
      Authorization: `Bearer ${token}`,
    },
    body: "",
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(aceptarPresupuestoExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

async function postRechazarPresupuesto(rechazo, dispatch) {
  const { id, costo, razon } = rechazo;
  const url = `${apiUrl}/api/Reparaciones/RechazarPresupuesto?id=${id}&costo=${costo}&razon=${razon}`;
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: "",
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(rechazarPresupuestoExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//post tecnico
async function postTecnico(nuevoTecnico, dispatch) {
  console.log(nuevoTecnico);
  const url = `${apiUrl}/api/Tecnicos`;
  const data = JSON.stringify(nuevoTecnico);
  const token = localStorage.getItem("token");
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(altaTecnicoExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//post administrador
async function postAdministrador(nuevoAdmin, dispatch) {
  const url = `${apiUrl}/api/Administradores`;
  const data = JSON.stringify(nuevoAdmin);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(altaAdminExito(datos));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

//post login
async function login(user, dispatch) {
  console.log('user: ', user);
  const url = `${apiUrl}/api/Seguridad`;
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
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      if (datos.token) {
        localStorage.setItem("token", datos.token);
      } else {
        throw new Error("No se recibio token");
      }
      dispatch(loginExito(datos.usuario));
    }
  } catch (error) {
    dispatch(lanzarError(error));
  }
}

async function logout(dispatch) {
  localStorage.removeItem("token");
  sessionStorage.clear();

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
  postMensaje,
  getMensajes,
  postProducto,
  getProductos,
};
