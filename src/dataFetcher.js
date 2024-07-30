

const apiUrl = "https://proyectoserviceapirest20240712211208.azurewebsites.net";

async function getOrden(idServicio) {
  const url = `${apiUrl}/api/Reparaciones/GenerarOrdenDeServicio?id=${idServicio}`;
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
      return data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    return null;
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
      const data = await response.json();
      return data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getOrden, getHistoriaClinica };