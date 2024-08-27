import React, { useState } from "react";
import { Label, Input, Button, toast } from "keep-react";
import { useNavigate } from "react-router-dom";
import { cambiarPasswordAdmin, cambiarPasswordTecnico } from "../../store/effects";


const FormularioCambiarContrasena = ({ email, rolSesion }) => {
  const navigate = useNavigate();
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmacionContrasena] = useState("");

  const validarContrasena = (contrasena) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*[\s!@#$%^&*()\-_=+{};:,<.>]).{9,}$/;
    return regex.test(contrasena);
  };

  const validarConfirmarContrasena = (contrasena, confirmarContrasena) => {
    return contrasena === confirmarContrasena;
  };

  const manejarCambioContrasena = (evento) => {
    setContrasena(evento.target.value);
  };

  const manejarCambioConfirmarContrasena = (evento) => {
    setConfirmacionContrasena(evento.target.value);
  };

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    if (
      validarContrasena(contrasena) &&
      validarConfirmarContrasena(contrasena, confirmarContrasena)
    ) {
      try {
        if (rolSesion === "Administrador") {
          await cambiarPasswordAdmin(email, contrasena);
        } else if (rolSesion === "Tecnico") {
          await cambiarPasswordTecnico(email, contrasena);
        }
        navigate('/');
        toast.success("Contraseña modificada correctamente");
      } catch (error) {
        toast.error("Error al modificar contraseña");
      }
    } else {
      toast.error("Las contraseñas no coinciden o no cumplen con los requisitos");
    }
  };

  return (
    <div className="rounded border p-8 shadow-md text-left ml-16">
      <h2 className="mb-8 text-body-1 font-medium flex justify-center">
          Cambiar contraseña
        </h2>
      <div className="mb-4 space-y-2">
        <Label htmlFor="contrasena">Nueva contraseña: </Label>
        <Input
          id="contrasena"
          placeholder="Contraseña"
          type="password"
          onChange={(e) => manejarCambioContrasena(e)}
        />
      </div>
      <div className="mb-4 space-y-2">
        <Label htmlFor="confirmarContrasena">Confirmar nueva contraseña: </Label>
        <Input
          id="confirmarContrasena"
          placeholder="Confirmar contraseña"
          type="password"
          onChange={(e) => manejarCambioConfirmarContrasena(e)}
        />
      </div>
      <div>
        <p>Recuerde que la contraseña debe poseer al menos 9 caracteres, de los cuales al menos uno es mayúscula, uno es minuscula, y cinco son números.</p>
      </div>
      <Button
        size="sm"
        color="secondary"
        type="submit"
        className="mt-8"
        onClick={enviarFormulario}
      >
        Cambiar contraseña
      </Button>
    </div>
  );
};

export default FormularioCambiarContrasena;
