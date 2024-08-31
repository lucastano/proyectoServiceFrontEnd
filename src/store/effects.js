import {
  traerAdminsExito,
  traerClientesExito,
  traerClienteExito,
  traerReparacionesExito,
  traerReparacionesTallerExito,
  traerReparacionesPresupuestadasExito,
  traerTecnicosExito,
  altaClienteExito,
  presupuestarReparacionExito,
  altaTecnicoExito,
  loginExito,
  logoutExito,
  aceptarPresupuestoExito,
  traerMensajesExito,
  traerProductosExito,
  crearProductoExito,
  traerFallasExito,
} from "./actions";
import { config } from "../../config";

const { apiUrl } = config;

async function cambiarPasswordAdmin(mail, nuevaPassword) {
  const url = `${apiUrl}/api/Administradores/CambiarPassword?email=${mail}&password=${nuevaPassword}`;
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, opciones);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    return error;
  }
}

async function cambiarPasswordTecnico(mail, nuevaPassword) {
  const url = `${apiUrl}/api/Tecnicos/CambiarPassword?email=${mail}&nuevoPassword=${nuevaPassword}`;
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, opciones);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    return error;
  }
}

async function recuperarPasswordAdmin(email) {
  const url = `${apiUrl}/api/Administradores/RecuperarPassword?email=${email}`;
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, opciones);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

async function recuperarPasswordTecnico(email) {
  const url = `${apiUrl}/api/Tecnicos/RecuperarPasswordTecnico?email=${email}`;
  const token = localStorage.getItem("token"); 
  const opciones = {
    method: "PUT",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, opciones);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

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
    return error;
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
    },
  };

  try {
    const response = await fetch(url, opciones);
    if (response.ok) {
      const data = await response.json();
      dispatch(traerProductosExito(data));
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    return error;
  }
}

async function getMensajes(dispatch, idServicio) {
  const url = `${apiUrl}/api/Mensajes?id=${idServicio}`;
  const token = localStorage.getItem("token");
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
      const contentType = response.headers.get("content-type");
      let datos = [];
      if (contentType && contentType.indexOf("application/json") !== -1) {
        datos = await response.json();
      }
      dispatch(traerMensajesExito(datos.mensajes));
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    return error;
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
      await getMensajes(dispatch, mensaje.reparacionId);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

async function putServicio(dispatch, servicio) {
  const { id, fechaPromesaPresupuesto, numeroSerie, descripcion } = servicio;
  const url = `${apiUrl}/api/Reparaciones/ModificarDatosReparacion`;
  const token = localStorage.getItem("token");

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
      fechaPromesaPresupuesto: fechaPromesaPresupuesto,
      numeroSerie: numeroSerie,
      descripcion: descripcion,
    }),
  };
  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      await getReparaciones(dispatch);
    }
  } catch (error) {
    return error;
  }
}
async function putPresupuesto(dispatch, reparacionPresupuestada) {
  const { id, costo, descripcion } = reparacionPresupuestada;
  const url = `${apiUrl}/api/Reparaciones/ModificarPresupuestoReparacion`;
  const token = localStorage.getItem("token");

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
      costo: costo,
      descripcion: descripcion,
    }),
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      await getReparaciones(dispatch);
    }
  } catch (error) {
    return error;
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
      dispatch(traerAdminsExito(datos.administradores));
    }
  } catch (error) {
    return error;
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
    return error;
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
      dispatch(traerClienteExito(datos.cliente));
    }
  } catch (error) {
    return error;
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
    return error;
  }
}

async function getReparacionesPorCI(cedula, dispatch) {
  const url = `${apiUrl}/api/Reparaciones/ReparacionesDeClienteCedula?cedula=${cedula}`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
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
      dispatch(traerReparacionesExito(datos));
    }
  } catch (error) {
    return error;
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
    return error;
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
    return error;
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
    return error;
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
    return error;
  }
}

//post reparacion
async function postReparacion(nuevaReparacion) {
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
      const data = await respuesta.json();
      console.log('llega aca');

      if (data.statusCode !== 200) {
        throw new Error("Error al generar la orden");
      }

      // Verificar si la respuesta contiene la orden en formato base64
      if (typeof data.ordenDeServicio !== "string") {
        throw new Error(
          "Formato de datos inesperado para la orden de servicio"
        );
      }

      const cadenaCaracteres = data.ordenDeServicio;
      // Decodificar la cadena base64 a un ArrayBuffer
      const binaryString = window.atob(cadenaCaracteres);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Paso 2: Crear un Blob con el contenido PDF
      const blob = new Blob([bytes], { type: "application/pdf" });

      return blob;
    }
  } catch (error) {
    return error;
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
    return error;
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
    console.log('respuesta: ', respuesta);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      await getReparaciones(dispatch);
    }
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
}
async function postEntregarReparacion(reparacion) {
  const { id } = reparacion;
  const url = `${apiUrl}/api/Reparaciones/EntregarReparacion?id=${id}`;
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
    console.log('respuesta: ', respuesta);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const data = await respuesta.json();
      console.log('data: ', data);
      if (data.statusCode !== 200) {
        throw new Error("Error al generar la orden");
      }

  
      if (typeof data.ordenDeServicio !== "string") {
        throw new Error(
          "Formato de datos inesperado para la orden de servicio"
        );
      }

      const cadenaCaracteres = data.ordenDeServicio;
      const binaryString = window.atob(cadenaCaracteres);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: "application/pdf" });

      return blob;
    }
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
}

async function postAceptarPresupuesto(reparacion, dispatch) {
  const { id } = reparacion;
  const url = `${apiUrl}/api/Reparaciones/AceptarPresupuesto?id=${id}`;
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
      await getReparaciones(dispatch);
    }
  } catch (error) {
    return error;
  }
}

async function postFalla(objetoFalla, dispatch) {
  const { productoId, falla, solucion } = objetoFalla;
  const url = `${apiUrl}/api/BaseFallas`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productoId: productoId,
      falla: falla,
      solucion: solucion,
    }),
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      //const datos = await respuesta.json();
      await getFallas(dispatch);
    }
  } catch (error) {
    return error;
  }
}

async function getFallas(dispatch) {
  const url = `${apiUrl}/api/BaseFallas`;
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
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
      dispatch(traerFallasExito(datos));
    }
  } catch (error) {
    return error;
  }
}

async function postRechazarPresupuesto(rechazo, dispatch) {
  const { id, costo, razon } = rechazo;
  const url = `${apiUrl}/api/Reparaciones/NoAceptarPresupuesto?id=${id}&costo=${costo}&razon=${razon}`;

  const token = localStorage.getItem("token");
  const opciones = {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);

    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      await getReparaciones(dispatch);
    }
  } catch (error) {
    throw error;
  }
}

//post tecnico
async function postTecnico(nuevoTecnico, dispatch) {
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
      await getTecnicos(dispatch);
    }
  } catch (error) {
    throw error;
  }
}

//post administrador
async function postAdministrador(nuevoAdmin, dispatch) {
  const url = `${apiUrl}/api/Administradores`;
  const data = JSON.stringify(nuevoAdmin);
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
      await getAdministradores(dispatch);
    }
  } catch (error) {
    throw error;
  }
}

//post login
async function login(user, dispatch) {
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
    throw error;
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
  postFalla,
  getFallas,
  recuperarPasswordAdmin,
  recuperarPasswordTecnico,
  cambiarPasswordAdmin,
  cambiarPasswordTecnico,
};
