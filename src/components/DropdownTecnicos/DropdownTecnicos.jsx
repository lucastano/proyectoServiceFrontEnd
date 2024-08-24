import React from "react";
import { Link } from "react-router-dom";
import { useTecnicos } from "../../store/selectors";
import { CaretDown, UserGear } from "phosphor-react";
import { SidebarItem, SidebarDropdown, SidebarCollapse, SidebarDropdownList } from "keep-react";

const DropdownTecnicos = () => {
  const tecnicos = useTecnicos();

  return (
    <SidebarItem dropdown>
      <SidebarDropdown>
        <SidebarCollapse>
          <div className="flex items-center gap-3">
            <span>
              <UserGear size={20} />
            </span>
            <span>Tecnicos</span>
          </div>
          <span className="group-open:-rotate-180">
            <CaretDown size={20} />
          </span>
        </SidebarCollapse>

        <SidebarDropdownList>
          {tecnicos &&
            tecnicos.map((tecnico) => (
              <SidebarItem key={tecnico.id}>
                <Link to={`/tecnico/${tecnico.id}`}>
                  {tecnico.nombre} {tecnico.apellido}
                </Link>
              </SidebarItem>
            ))}
        </SidebarDropdownList>
      </SidebarDropdown>
    </SidebarItem>
  );
};

export default DropdownTecnicos;
