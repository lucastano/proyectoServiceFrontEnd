import { config } from "../config";

const { apiUrl } = config;

async function getOrden(idServicio) {
  const url = `${apiUrl}/api/Reparaciones/GenerarOrdenDeServicio?id=${idServicio}`;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener la orden: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.statusCode !== 200) {
      throw new Error(`Error al generar la orden: ${data.message}`);
    }

    // Verificar si la respuesta contiene la orden en formato base64
    if (typeof data.ordenDeServicio !== "string") {
      throw new Error("Formato de datos inesperado para la orden de servicio");
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
    const blob = new Blob([bytes], { type: 'application/pdf' });

    return blob;

  } catch (error) {
    console.error("Error al obtener la orden:", error);
    // Puedes mostrar un mensaje de error al usuario o realizar otra acción
    throw new Error(
      "Error al obtener la orden. Por favor, inténtalo de nuevo más tarde."
    );
  }
}

async function getHistoriaClinica(numeroSerie) {
  const url = `${apiUrl}/api/Reparaciones/HistoriaClinica?numeroSerie=${numeroSerie}`;
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
      const data = response.headers.get('content-type').includes('application/json') 
        ? await response.json() 
        : await response.text();
      return data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

export { getOrden, getHistoriaClinica };
