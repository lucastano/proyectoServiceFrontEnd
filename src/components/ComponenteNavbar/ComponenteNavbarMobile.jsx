import React, { useState } from "react";
import {
  List,
  X
} from "phosphor-react";
import {
  Drawer,
  DrawerAction,
  DrawerContent,
  Button,
} from "keep-react";
import ComponenteNavbarDesktop from "./ComponenteNavbarDesktop";

const ComponenteNavbarMobile = ({ rolSesion, emailSesion }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleShowDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <>
      <Button onClick={toggleShowDrawer}>
        <List size={20} />
      </Button>
      {showDrawer && (
        <Drawer position="left">
          <DrawerAction asChild></DrawerAction>
          <DrawerContent>
            <Button
              className="absolute right-5 top-5"
              onClick={toggleShowDrawer}
            >
              <X size={20} />
            </Button>
            <ComponenteNavbarDesktop
              rolSesion={rolSesion}
              emailSesion={emailSesion}
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ComponenteNavbarMobile;
