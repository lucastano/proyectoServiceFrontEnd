Este repositorio contiene todo el contenido FrontEnd para el proyecto final integrador para la carrera de Analista en Tecnologías de la Información de Universidad ORT

# Pasos para ejecución de repositorio:
1-Ejecutar en consola npm install
2-Ejecutar npm run dev

# Setup de url para api
Si bien ya está preconfigurada la ruta para la API desplegada en Azure para la aplicación, en caso de querer ejecutar este ambiente y utilizar como API el despliegue local de la solución de BackEnd, es necesario dirigirse al archivo config.js disponible en este repositorio. En éste encontramos lo siguiente:

export const config = {
    apiUrl: 'https://proyectoserviceapirest2024.azurewebsites.net' 
  };

Para utilizar un ambiente local o en caso de que cambie la localización de APIRest, hay que cambiar el string de la key apiUrl por la que corresponda