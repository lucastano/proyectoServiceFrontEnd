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
      const regex = /^\d{8,12}$/;
      return regex.test(numero);
    };

    const enviarFormulario = (evento) => {
      evento.preventDefault();
  
      if (validarNombreApellido(nombre) && validarNombreApellido(apellido) && validarEmail(email) && validarCedula(cedula)) {
        console.log(`Nombre: ${nombre}, Apellido: ${apellido}, Email: ${email}, Cédula: ${cedula}`);
        setConfirmacionAbierta(true);
      } else {
        console.log('Error: Ingrese nombre, apellido, cedula y email válidos.');
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
  <>
    <form className="rounded-lg border p-8 shadow-md text-left w-2/5" onSubmit={enviarFormulario}>
    <div className="mb-4 space-y-2">
      <Label htmlFor="email" >Email: </Label>
        <Input
          id="email"
          placeholder="Email"
          className="ps-4"
          onChange={(e) => manejarCambioEmail(e)}
        />
      </div>
      <div className="mb-4 space-y-2">
      <Label htmlFor="nombre">Nombre: </Label>
        <Input
          id="nombre"
          placeholder="Nombre"
          className="ps-4"
          onChange={(e) => manejarCambioNombre(e)}
        />
      </div>
      <div className="mb-4 space-y-2">
      <Label htmlFor="apellido">Apellido: </Label>
        <Input
          id="apellido"
          placeholder="Apellido"
          className="ps-4"
          onChange={(e) => manejarCambioApellido(e)}
        />
      </div>
      <div className="mb-50 space-y-2">
      <Label htmlFor="cedula">Cedula de identidad (sin guión): </Label>
        <Input
          id="cedula"
          placeholder="Cedula de identidad"
          className="ps-4"
          onChange={(e) => manejarCambioCedula(e)}
        />
      </div>
    <Button size="sm" color="secondary" type="submit" className="mt-8">
      Registrar cliente
    </Button>
  </form>
    {confirmacionAbierta && <ModalConfirmacionAltaCliente onClose={manejarCierreModalConfirmacion} />}
  </>
  );
};
