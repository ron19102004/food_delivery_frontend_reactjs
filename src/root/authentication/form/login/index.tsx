import React, { useEffect, useState } from "react";
import { APP_NAME } from "../../../../utils/constant.util";
import { useForm, SubmitHandler } from "react-hook-form";
import { login, LoginRequest } from "../../../../apis/auth.api";
import { cn } from "../../../../lib/utils";
import { Input } from "../../../../components/input.component";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VerifyOTP from "./verify-otp";
import useAuth from "../../../../hooks/useAuth.hook";

const LoginFormPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const auth =  useAuth();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  useEffect(() => {}, [token]);
  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    await login(
      data,
      (res) => {
        if (!res.data.two_factor_auth) {
          toast(res?.message ?? "Successfully!", {
            type: "success",
          });
          auth.login(res.data.user, res.data.access_token);
          navigate("/")
          return;
        }
        toast("Check your email " + (res.data.user.email ?? "") + " !", {
          type: "info",
        });
        setToken(res.data.access_token);
      },
      (err) => {
        const res = err.response.data;
        toast(res?.message ?? "Undefined error", {
          type: "error",
        });
      }
    );
  };
  return token != null ? <VerifyOTP token={token}/> : (
    <div className="flex flex-col justify-center items-center min-h-full text-slate-700">
      <div className="p-10 bg-white xl:shadow-lg">
        <h1 className="font-font1 text-4xl lg:text-5xl font-semibold text-center px-5 md:px-0 text-orange-600">
          Welcome To {APP_NAME}
        </h1>
        <hr className="border-orange-600 my-2" />
        <h2 className="text-center text-3xl lg:text-4xl font-bold font-font1">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block text-lg font-font2">Username</label>
            <Input
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters long",
                },
              })}
              className={cn({ "border-orange-500": errors.username }, "shadow")}
              type="text"
              placeholder="Enter your username"
              required
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-lg font-font2">Password</label>
            <Input
              required
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className={cn({ "border-orange-500": errors.password }, "shadow")}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className=" shadow-md block w-full p-4 text-white font-font2 bg-orange-500 hover:bg-orange-400"
          >
            Sign In
          </button>
        </form>
        <div className="flex justify-center items-center my-3 w-full">
          <hr className=" border-orange-500 w-full" />
          <span className="px-3 font-font2">Or</span>
          <hr className="border-orange-500 w-full" />
        </div>
        <NavLink
          to={"/auth/register"}
          className=" text-center shadow-md block w-full p-4 text-white font-font2 bg-slate-700 hover:bg-slate-600"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default LoginFormPage;
