import React, { useState, useEffect } from "react";
import { useRolSesion, useEmailSesion } from "../../store/selectors";
import ComponenteNavbarDesktop from "./ComponenteNavbarDesktop";
import ComponenteNavbarMobile from "./ComponenteNavbarMobile";

const ComponenteNavbar = () => {
  const rolSesion = useRolSesion();
  const emailSesion = useEmailSesion();
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <>
      {isMobile ? (
        <ComponenteNavbarMobile
          rolSesion={rolSesion}
          emailSesion={emailSesion}
        />
      ) : (
        <ComponenteNavbarDesktop
          rolSesion={rolSesion}
          emailSesion={emailSesion}
        />
      )}
    </>
  );
};

export default ComponenteNavbar;
