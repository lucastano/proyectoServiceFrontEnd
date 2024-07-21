import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Label, Button, toast } from "keep-react";
import { /*useRolSesion, useEmailSesion,*/ useError } from "../../store/selectors";
import { postTecnico } from "../../store/effects";
import { limpiarError } from "../../store/actions";

const FormularioAltaTecnico = () => {
  const dispatch = useDispatch();
  //const rolSesion = useRolSesion();
  //const emailSesion = useEmailSesion();

  /*
  if (!rolSesion || rolSesion !== "Administrador" || !emailSesion) {
    return null;
  }
  */

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const validarNombreApellido = (valor) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(valor);
  };

  const validarEmail = (email) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  const validarContrasena = (contrasena) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    return regex.test(contrasena);
  };

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    if (
      validarNombreApellido(nombre) &&
      validarNombreApellido(apellido) &&
      validarEmail(email) &&
      validarContrasena(contrasena)
    ) {
      console.log(
        `Nombre: ${nombre}, Apellido: ${apellido}, Email: ${email}, Contrasena: ${contrasena}`
      );
      const nuevoTecnico = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasena: contrasena,
      };

      await postTecnico(nuevoTecnico, dispatch);
      const error = useError();

      if (error) {
        toast.error("Error al dar de alta a tecnico");
        dispatch(limpiarError());
      } else {
        toast("Tecnico dado de alta correctamente");
      }
    } else {
      if (!validarNombreApellido(nombre)) {
        toast.error("Nombre invalido");
      }
      if (!validarNombreApellido(apellido)) {
        toast.error("Apellido invalido");
      }
      if (!validarEmail(email)) {
        toast.error("Email invalido");
      }
      if (!validarContrasena(contrasena)) {
        toast.error(
          "Contraseña inválida. Recuerde que debe ser de al menos 8 caracteres, contener al menos una letra mayúscula, un número y un caracter especial"
        );
      }
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

  const manejarCambioContrasena = (event) => {
    setContrasena(event.target.value);
  };

  return (
    <>
      <form
        className="rounded-lg border p-8 shadow-md text-left w-2/5"
        onSubmit={enviarFormulario}
      >
        <div className="mb-4 space-y-2">
          <Label htmlFor="email">Email: </Label>
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
          <Label htmlFor="contrasena">Contraseña: </Label>
          <Input
            id="contrasena"
            placeholder="Contraseña"
            className="ps-4"
            onChange={(e) => manejarCambioContrasena(e)}
          />
        </div>
        <Button size="sm" color="secondary" type="submit" className="mt-8">
          Registrar tecnico
        </Button>
      </form>
    </>
  );
};

export default FormularioAltaTecnico;