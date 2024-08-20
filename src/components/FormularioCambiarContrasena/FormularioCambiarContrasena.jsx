import React from "react";

const FormularioCambiarContrasena = ({id}) => { //supongo que se precisa id o algo
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

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    if (
      validarContrasena(contrasena) &&
      validarConfirmarContrasena(contrasena, confirmarContrasena)
    ) {
      //logica para cambiar contrasena
      try {
        //await cambioContrasena
        toast("Contraseña modificada correctamente");
      } catch (error) {
        toast.error("Error al modificar contraseña");
      }
    }
  };

  return (
    <div className="rounded border p-8 shadow-md text-left ml-16">
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
      <Button size="sm" color="secondary" type="submit" className="mt-8" onClick={enviarFormulario}>
          Cambiar contraseña
        </Button>
    </div>
  );
};

export default FormularioCambiarContrasena;
