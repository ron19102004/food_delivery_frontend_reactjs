import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../../../../components/input.component";
import { cn } from "../../../../lib/utils";
import { APP_NAME } from "../../../../utils/constant.util";
import { register as rgst, RegisterRequest } from "../../../../apis/auth.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface PRegisterRequest extends RegisterRequest {
  confirm_password?: string;
}
const RegisterFormPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PRegisterRequest>();
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<PRegisterRequest> = async (data) => {
    if (data.password !== data.confirm_password) {
      toast("Confirm Password Failed", {
        type: "error",
      });
      return;
    }
    delete data.confirm_password;
    const req: RegisterRequest = data;
    await rgst(
      req,
      (res) => {    
        if(res.success === false){
            toast(res.message, {
              type: "error",
            });
            return;
        }
        toast(res.message, {
          type: "success",
        });
        navigate("/auth/login")
      },
      (err) => {
        const res = err?.response?.data
        toast(res.message ?? "Undefine error", {
          type: "error",
        });
      }
    );
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-full text-slate-700">
      <div className="p-10 bg-slate-50 rounded xl:shadow-lg">
        <h1 className="font-font1 text-4xl lg:text-5xl font-semibold text-center px-5 md:px-0 text-orange-600">
          Welcome To {APP_NAME}
        </h1>
        <hr className="border-orange-600 my-2" />
        <h2 className="text-center text-3xl lg:text-4xl font-bold font-font1">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label className="block text-lg font-font2">First name</label>
            <Input
              {...register("first_name", {
                required: {
                  value: true,
                  message: "First name is required",
                },
              })}
              className={cn(
                { "border-orange-500": errors.first_name },
                "shadow"
              )}
              type="text"
              placeholder="Enter your first name"
              required
            />
            {errors.first_name && (
              <p className="text-red-600">{errors.first_name.message}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-lg font-font2">Last name</label>
            <Input
              {...register("last_name", {
                required: {
                  value: true,
                  message: "Last name is required",
                },
              })}
              className={cn(
                { "border-orange-500": errors.last_name },
                "shadow"
              )}
              type="text"
              placeholder="Enter your last name"
              required
            />
            {errors.last_name && (
              <p className="text-red-600">{errors.last_name.message}</p>
            )}
          </div>
          <div className="mb-2">
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
          <div className="mb-2">
            <label className="block text-lg font-font2">Email address</label>
            <Input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              className={cn({ "border-orange-500": errors.email }, "shadow")}
              type="email"
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-lg font-font2">Phone number</label>
            <Input
              {...register("phone_number", {
                required: {
                  value: true,
                  message: "Phone number is required",
                },
              })}
              className={cn(
                { "border-orange-500": errors.phone_number },
                "shadow"
              )}
              type="tel"
              placeholder="Enter your phone number"
              required
            />
            {errors.phone_number && (
              <p className="text-red-600">{errors.phone_number.message}</p>
            )}
          </div>
          <div className="mb-2">
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
          <div className="mb-2">
            <label className="block text-lg font-font2">Confirm password</label>
            <Input
              required
              {...register("confirm_password", {
                required: {
                  value: true,
                  message: "Password confirm is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              className={cn(
                { "border-orange-500": errors.confirm_password },
                "shadow"
              )}
              type="password"
              placeholder="Enter your password"
            />
            {errors.confirm_password && (
              <p className="text-red-600">{errors.confirm_password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className=" shadow-md block w-full p-4 text-white font-font2 bg-orange-500 hover:bg-orange-400 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center items-center my-3 w-full">
          <hr className=" border-orange-500 w-full" />
          <span className="px-3 font-font2">Or</span>
          <hr className="border-orange-500 w-full" />
        </div>
        <NavLink
          to={"/auth/login"}
          className=" text-center shadow-md block w-full p-4 text-white font-font2 bg-slate-700 hover:bg-slate-600 rounded-md"
        >
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default RegisterFormPage;
