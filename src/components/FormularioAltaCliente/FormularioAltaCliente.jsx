import React, { useState } from 'react';
import { Input, Label, Button } from 'keep-react';
import { ModalConfirmacionAltaCliente } from '../ModalConfirmacionAltaCliente/ModalConfirmacionAltaCliente';

export const FormularioAltaCliente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [cedula, setCedula] = useState('');
    const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);

    const validarNombreApellido = (valor) => {
      const regex = /^[a-zA-Z]+$/;
      return regex.test(valor);
    };
  
    const validarEmail = (email) => {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(email);
    };

    const validarCedula = (numero) => {
      const regex = /^\d{8}$/;
      return regex.test(numero);
    };

    const enviarFormulario = (evento) => {
      evento.preventDefault();
  
      const nombreValido = validarNombreApellido(nombre);
      const apellidoValido = validarNombreApellido(apellido);
      const emailValido = validarEmail(email);
      const cedulaValida = validarCedula(cedula); 
  
      if (nombreValido && apellidoValido && emailValido && cedulaValida) {
        console.log(`Nombre: ${nombre}, Apellido: ${apellido}, Email: ${email}, Cédula: ${cedula}`);
        setConfirmacionAbierta(true);
      } else {
        console.log('Error: Ingrese nombre, apellido y email válidos.');
      }
    };

  const manejarCambioNombre = (event) => {
    setNombre(event.target.value);
  };

  const manejarCambioApellido = (event) => {
    setApellido(event.target.value);
  };

  const manejarCambioEmail = (event) => {
    setEmail(event.target.value);
  };

  const manejarCambioCedula = (event) => {
    setCedula(event.target.value);
  };

  const manejarCierreModalConfirmacion = () => {
    setConfirmacionAbierta(false);
  }

  return (
    <div>
    <form className="mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md" onSubmit={enviarFormulario}>
    <fieldset className="space-y-1">
      <Label htmlFor="email">Email: </Label>
      <div className="relative">
        <Input
          placeholder="Email"
          className="ps-11"
          onChange={(e) => manejarCambioEmail(e)}
        />
      </div>
    </fieldset>
    <fieldset className="space-y-1">
      <Label htmlFor="nombre">Nombre:</Label>
      <div className="relative">
        <Input
          placeholder="Nombre"
          className="ps-11"
          onChange={(e) => manejarCambioNombre(e)}
        />
      </div>
      <Label htmlFor="apellido">Apellido: </Label>
      <div className="relative">
        <Input
          placeholder="Apellido"
          className="ps-11"
          onChange={(e) => manejarCambioApellido(e)}
        />
      </div>
    </fieldset>
    <fieldset className="space-y-1">
      <Label htmlFor="cedula">Cedula de identidad (sin guión): </Label>
      <div className="relative">
        <Input
          placeholder="Cedula de identidad"
          className="ps-11"
          onChange={(e) => manejarCambioCedula(e)}
        />
      </div>
    </fieldset>
    <Button size="sm" color="secondary" type="submit">
      Registrar cliente
    </Button>
  </form>
    {confirmacionAbierta && <ModalConfirmacionAltaCliente onClose={manejarCierreModalConfirmacion} />}
  </div>
  );
};
