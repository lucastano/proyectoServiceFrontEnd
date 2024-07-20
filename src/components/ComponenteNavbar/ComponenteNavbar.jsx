import React from "react";
import { Link } from "react-router-dom";
import {
  SignIn,
  Wrench,
  ListBullets,
  ChartPieSlice,
  UserPlus,
} from "phosphor-react";
import { Sidebar, SidebarBody, SidebarItem, SidebarList, SidebarFooter } from "keep-react";
import { useRolSesion, useEmailSesion } from "../../store/selectors";
import { ModalLogout } from "../ModalLogout/ModalLogout";
import  DropdownTecnicos  from "../DropdownTecnicos/DropdownTecnicos";
import ThemeSwitcher from "../ThemeSwitcher";

const ComponenteNavbar = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();

  const sinLoguear = rolSesion === null || emailSesion === null;
  const esAdmin = rolSesion === "Administrador";
  const esCliente = rolSesion === "Cliente";
  const esTecnico = rolSesion === "Tecnico";

  return (
    <>
      <Sidebar>
        <SidebarBody>
          <SidebarList>
          <SidebarItem><ThemeSwitcher /></SidebarItem>
            {sinLoguear && (
              <Link to="/">
                <SidebarItem>
                  <SignIn size={20} />
                  Login
                </SidebarItem>
              </Link>
            )}
            {(esTecnico || esAdmin) && (
              <>
                <Link to="/nuevoservicio">
                  <SidebarItem>
                    <Wrench size={20} />
                    Nueva reparación
                  </SidebarItem>
                </Link>
                <Link to="/serviciostecnico">
                  <SidebarItem>
                    <ListBullets size={20} />
                    Servicios - Tecnico
                  </SidebarItem>
                </Link>
                <Link to="/metricas">
                  <SidebarItem>
                    <ChartPieSlice size={20} />
                    Metricas
                  </SidebarItem>
                </Link>
              </>
            )}
            {esCliente && (
              <Link to="/servicios">
                <SidebarItem>
                  <ListBullets size={20} />
                  Servicios
                </SidebarItem>
              </Link>
            )}
            {esAdmin && (
              <>
                <SidebarItem>
                  <DropdownTecnicos />
                </SidebarItem>
                <Link to="/nuevotecnico">
                  <SidebarItem>
                    <UserPlus size={20} />
                    Nuevo Tecnico
                  </SidebarItem>
                </Link>
              </>
            )}
            {!sinLoguear && (
              <SidebarFooter>
                <SidebarItem>
                  <ModalLogout />
                </SidebarItem>
              </SidebarFooter>
            )}
          </SidebarList>
        </SidebarBody>
      </Sidebar>
    </>
  );
};

export default ComponenteNavbar;
