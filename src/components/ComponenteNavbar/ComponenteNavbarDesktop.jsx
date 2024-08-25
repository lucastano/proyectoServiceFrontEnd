import React from "react";
import DropdownTecnicos from "../DropdownTecnicos/DropdownTecnicos";
import { ModalLogout } from "../ModalLogout/ModalLogout";
import { Link } from "react-router-dom";
import {
  SignIn,
  Wrench,
  ListBullets,
  ChartPieSlice,
  UserPlus,
  FirstAid,
  Plus,
  ListDashes,
  Password,
  Users,
} from "phosphor-react";
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarList,
  SidebarFooter,
} from "keep-react";

const ComponenteNavbarDesktop = ({ rolSesion, emailSesion }) => {
  const sinLoguear = emailSesion === undefined;

  const esAdmin = rolSesion === "Administrador";
  const esCliente = rolSesion === "Cliente";
  const esTecnico = rolSesion === "Tecnico";

  return (
    <Sidebar className="h-screen">
      <SidebarBody>
        <SidebarList>
          <img
            src="../../../Empresa-nobg.png"
            alt="logo"
            className="object-contain"
          />

          {sinLoguear && (
            <Link to="/">
              <SidebarItem>
                <SignIn size={20} />
                Login
              </SidebarItem>
            </Link>
          )}
          {esTecnico && (
            <Link to="/nuevoservicio">
              <SidebarItem>
                <Wrench size={20} />
                Nueva reparación
              </SidebarItem>
            </Link>
          )}
          {(esTecnico || esAdmin) && (
            <>
              <Link to="/clientes">
                <SidebarItem>
                  <Users size={20} />
                  Clientes
                </SidebarItem>
              </Link>
              <Link to="/cambiarContrasena">
                <SidebarItem>
                  <Password size={20} />
                  Cambiar Contraseña
                </SidebarItem>
              </Link>
              <Link to="/agregarProducto">
                <SidebarItem>
                  <Plus size={20} />
                  Agregar Producto
                </SidebarItem>
              </Link>
              <Link to="/serviciostecnico">
                <SidebarItem>
                  <ListBullets size={20} />
                  Servicios - Tecnico
                </SidebarItem>
              </Link>
              <Link to="/historiaClinica">
                <SidebarItem>
                  <FirstAid size={20} />
                  Historia Clinica
                </SidebarItem>
              </Link>
              <Link to="/altaFalla">
                <SidebarItem>
                  <Plus size={20} />
                  Agregar Falla
                </SidebarItem>
              </Link>
              <Link to="/fallas">
                <SidebarItem>
                  <ListDashes size={20} />
                  Ver fallas
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
              <DropdownTecnicos />
              <Link to="/nuevotecnico">
                <SidebarItem>
                  <UserPlus size={20} />
                  Nuevo Tecnico
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
          {!sinLoguear && (
            <>
              <ModalLogout />

              <SidebarFooter>
                <p className="text-body-4 font-medium text-metal-400">
                  Logueado como:
                </p>
                <p className="text-body-4 font-normal text-metal-300">
                  {emailSesion}
                </p>
              </SidebarFooter>
            </>
          )}
        </SidebarList>
      </SidebarBody>
    </Sidebar>
  );
};

export default ComponenteNavbarDesktop;
