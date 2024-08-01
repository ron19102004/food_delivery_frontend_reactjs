import React from "react";
import { Outlet } from "react-router-dom";

const PersonalLayout: React.FC = () => {
  return (
    <main>
      HI
      <Outlet />
    </main>
  );
};

export default PersonalLayout;
