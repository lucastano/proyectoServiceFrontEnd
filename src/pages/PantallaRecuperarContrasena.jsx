import React from 'react';
import ComponenteNavbar from '../components/ComponenteNavbar/ComponenteNavbar';
import FormularioCambiarContrasena from '../components/FormularioCambiarContrasena/FormularioCambiarContrasena';
import { useEmailSesion, useRolSesion } from '../store/selectors';

function PantallaRecuperarContrasena() {
  const mailSesion = useEmailSesion();
  const rolSesion = useRolSesion();

  console.log(mailSesion);
  console.log(rolSesion);

    return (
        <div className="flex ">
          <div className="w-1/4">
          <ComponenteNavbar />
          </div>
          <div className="flex justify-center w-3/4 mr-32">
            <FormularioCambiarContrasena email={mailSesion} rolSesion={rolSesion} />
          </div>
        </div>
      );
}

export default PantallaRecuperarContrasena;