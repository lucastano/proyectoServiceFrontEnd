import React from 'react';
import ComponenteNavbar from '../components/ComponenteNavbar/ComponenteNavbar';
import ListadoAdmins from '../components/ListadoAdmins/ListadoAdmins';

function PantallaListadoAdmins() {
    return (
        <div className="flex">
          <div className="w-1/4">
            <ComponenteNavbar />
          </div>
          <div className="w-4/5">
            <ListadoAdmins />
          </div>
        </div>
      );
}

export default PantallaListadoAdmins;