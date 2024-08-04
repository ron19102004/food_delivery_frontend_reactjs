import React, {useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BackgroundAuth } from "../../assets/imgs";
import useAuth from "../../hooks/useAuth.hook";

const AuthenticationLayout: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated]);
  return (
    <main className="min-w-screen min-h-screen flex">
      <section className="hidden md:block md:basis-1/2 bg-orange-500">
        <img
          src={BackgroundAuth}
          alt="bg-auth"
          className="w-full h-full object-cover"
        />
      </section>
      <section className="flex-1 bg-slate-50 xl:bg-white">
        <Outlet />
      </section>
    </main>
  );
};

export default AuthenticationLayout;
