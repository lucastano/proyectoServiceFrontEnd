import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Label, Button, toast } from "keep-react";
import { postAdministrador } from "../../store/effects";
import { useNavigate } from "react-router-dom";

const FormularioAltaAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmacionContrasena] = useState("");

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
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[\s!@#$%^&*()\-_=+{};:,<.>]).{9,}$/;
    return regex.test(contrasena);
  };

  const validarConfirmarContrasena = (contrasena, confirmarContrasena) => {
    return contrasena === confirmarContrasena;
  };

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    if (
      validarNombreApellido(nombre) &&
      validarNombreApellido(apellido) &&
      validarEmail(email) &&
      validarContrasena(contrasena) &&
      validarConfirmarContrasena(contrasena, confirmarContrasena)
    ) {
      const nuevoAdmin = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: contrasena,
      };

      try {
        await postAdministrador(nuevoAdmin, dispatch);
        navigate('/');
        toast.success("Administrador dado de alta correctamente");
      } catch (error) {
        console.log('error: ', error);
        toast.error("Error al dar de alta a administrador");
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
          "Contraseña inválida. Recuerde que debe ser de al menos 9 caracteres, contener al menos una letra mayúscula, cuatro numeros y no debe poseer caracteres especiales ni espacios."
        );
      }
      if (!validarConfirmarContrasena(contrasena, confirmarContrasena)) {
        toast.error("Las contraseñas no coinciden");
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

  const manejarCambioConfirmarContrasena = (event) => {
    setConfirmacionContrasena(event.target.value);
  };

  return (
    <>
      <div className="rounded border p-8 shadow-md text-left ml-16">
        <h2 className="mb-8 text-body-1 font-medium flex justify-center">
          Alta Administrador
        </h2>
        <div className="mb-4 space-y-2">
          <Label htmlFor="email">Email: </Label>
          <Input
            id="email"
            placeholder="Email"
            onChange={(e) => manejarCambioEmail(e)}
          />
        </div>
        <div className="mb-4 space-y-2">
          <Label htmlFor="nombre">Nombre: </Label>
          <Input
            id="nombre"
            placeholder="Nombre"
            onChange={(e) => manejarCambioNombre(e)}
          />
        </div>
        <div className="mb-4 space-y-2">
          <Label htmlFor="apellido">Apellido: </Label>
          <Input
            id="apellido"
            placeholder="Apellido"
            onChange={(e) => manejarCambioApellido(e)}
          />
        </div>
        <div className="mb-4 space-y-2">
          <Label htmlFor="contrasena">Contraseña: </Label>
          <Input
            id="contrasena"
            placeholder="Contraseña"
            type="password"
            onChange={(e) => manejarCambioContrasena(e)}
          />
        </div>
        <div className="mb-4 space-y-2">
          <Label htmlFor="confirmarContrasena">Confirmar contraseña: </Label>
          <Input
            id="confirmarContrasena"
            placeholder="Confirmar contraseña"
            className="w-96"
            type="password"
            onChange={(e) => manejarCambioConfirmarContrasena(e)}
          />
        </div>
        <div className="flex justify-center">
          <Button
            size="sm"
            color="secondary"
            type="submit"
            className="mt-8"
            onClick={enviarFormulario}
          >
            Registrar administrador
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormularioAltaAdmin;
