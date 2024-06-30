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
  altaReparacionExito,
  altaReparacionError,
  presupuestarReparacionExito,
  presupuestarReparacionError,
  altaTecnicoExito,
  altaTecnicoError,
  loginClienteExito,
  loginAdminExito,
  loginTecnicoExito,
  loginError,
  logoutExito,
} from "./actions";

//get administradores
async function getAdministradores(dispatch) {
  const url = "https://localhost:7105/api/Administradores";
  const opciones = {
    method: "GET",
    headers: {
      accept: "text/plain",
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
  const url = "https://localhost:7105/api/Clientes";
  const opciones = {
    method: "GET",
    headers: {
      accept: "text/plain",
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(traerClientesExito(datos));
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    dispatch(traerClientesError(error));
  }
}

//get cliente por ci
async function getClientePorCI(cedula, dispatch) {
  const url = `https://localhost:7105/api/Clientes/ObtenerClientePorCi?ci=${cedula}`;
  const opciones = {
    method: "GET",
    headers: {
      accept: "text/plain",
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
  const url = "https://localhost:7105/api/Reparaciones/TodasLasReparaciones";
  const opciones = {
    method: "GET",
    headers: {
      accept: "text/plain",
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
  const url = `https://localhost:7105/api/Reparaciones/ObtenerReparacionesPorCi?ci=${cedula}`;
  const opciones = {
    method: "GET",
    headers: {
      accept: "text/plain",
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
  const url = "https://localhost:7105/api/Reparaciones/EnTaller";
  const opciones = {
    method: "GET",
    headers: {
      accept: "text/plain",
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
  const url = "https://localhost:7105/api/Reparaciones/Presupuestadas";
  const opciones = {
    method: "GET",
    headers: {
      accept: "text/plain",
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
  const url = "https://localhost:7105/api/Tecnicos";
  const opciones = {
    method: "GET",
    headers: {
      accept: "text/plain",
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(traerTecnicosExito(datos));
  } catch (error) {
    console.error("Error al obtener técnicos:", error);
    dispatch(traerTecnicosError(error));
  }
}

//post cliente
async function postCliente(nuevoCliente, dispatch) {
  const url = "https://localhost:7105/api/Clientes";
  const data = JSON.stringify(nuevoCliente);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "text/plain",
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
  const url = "https://localhost:7105/api/Reparaciones";
  const data = JSON.stringify(nuevaReparacion);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: data,
  };

  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(altaReparacionExito(datos));
  } catch (error) {
    console.error("Error al crear reparación:", error);
    dispatch(altaReparacionError(error));
  }
}

//post presupuestacion reparacion
async function postPresupuestacionReparacion(reparacion, dispatch) {
  const { idReparacion, manoObra, descripcion } = reparacion;
  const url = `https://localhost:7105/api/Reparaciones/Presupuestar?id=${idReparacion}&manoObra=${manoObra}&descripcion=${descripcion}`;
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
    },
    body: null, // No data in the body for this request
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

//post tecnico
async function postTecnico(nuevoTecnico, dispatch) {
  const url = "https://localhost:7105/api/Tecnicos";
  const data = JSON.stringify(nuevoTecnico);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "text/plain",
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
  const url = "https://localhost:7105/api/Administradores";
  const data = JSON.stringify(nuevoAdmin);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
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

//post login cliente
async function loginCliente(userCliente, dispatch) {
  const url = "https://localhost:7105/api/Seguridad";
  const data = JSON.stringify(userCliente);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: data,
  };
  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);

    if (data.token) {
      localStorage.setItem("token", data.token);
    };

    dispatch(loginClienteExito(datos));
  } catch (error) {
    console.error("Error al realizar login:", error);
    dispatch(loginError(error));
  }
}

//post login tecnico
async function loginTecnico(userTecnico, dispatch) {
  const url = "https://localhost:7105/api/Seguridad";
  const data = JSON.stringify(userTecnico);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: data,
  };
  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);
    dispatch(loginTecnicoExito(datos));

    if (data.token) {
      localStorage.setItem("token", data.token);
    };
  } catch (error) {
    console.error("Error al realizar login:", error);
    dispatch(loginError(error));
  }
}

//post login tecnico
async function loginAdmin(userAdmin, dispatch) {
  const url = "https://localhost:7105/api/Seguridad";
  const data = JSON.stringify(userAdmin);

  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: data,
  };
  try {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();
    console.log(datos);

    if (data.token) {
      localStorage.setItem("token", data.token);
    };

    dispatch(loginAdminExito(datos));
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
  loginAdmin,
  loginCliente,
  loginTecnico,
  logout
};
