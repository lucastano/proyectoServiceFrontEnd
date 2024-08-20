import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Label, Button, toast } from "keep-react";
import { postTecnico } from "../../store/effects";

const FormularioAltaTecnico = () => {
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
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[\s!@#$%^&*()\-_=+{};:,<.>]).{9,}$/;
    return regex.test(contrasena);
  };

  const validarConfirmarContrasena = (contrasena, confirmarContrasena) => {
    return contrasena === confirmarContrasena;
  }

  const enviarFormulario = async (evento) => {
    evento.preventDefault();
  
    if (
      validarNombreApellido(nombre) &&
      validarNombreApellido(apellido) &&
      validarEmail(email) &&
      validarContrasena(contrasena) &&
      validarConfirmarContrasena(contrasena, confirmarContrasena)
    ) {
      const nuevoTecnico = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: contrasena,
      };
  
      try {
        await postTecnico(nuevoTecnico, dispatch);
        toast("Tecnico dado de alta correctamente");
      } catch (error) {
        toast.error("Error al dar de alta a tecnico");
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
      <form
        className="rounded border p-8 shadow-md text-left ml-16"
        onSubmit={enviarFormulario}
      >
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
        <Button size="sm" color="secondary" type="submit" className="mt-8">
          Registrar tecnico
        </Button>
      </form>
    </>
  );
};

export default FormularioAltaTecnico;