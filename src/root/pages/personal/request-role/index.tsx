import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../../../../components/input.component";
import {cn} from "../../../../lib/utils";
import LoopList from "../../../../components/loop.component";
import {toast} from "react-toastify";
import {createRequestRole, getRolesToRequest} from "../../../../apis/request-role.api";
import {useNavigate} from "react-router-dom";
import useAuth from "../../../../hooks/useAuth.hook";

interface IDataForm {
    email: string;
    phone_number: string;
    name: string;
}

const RequestRolePage: React.FC = () => {
    const [listRole, setListRole] = useState<string[]>([]);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();
    const {accessToken} = useAuth();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IDataForm>();
    const init = async () => {
        await getRolesToRequest(
            (res) => {
                setListRole(res);
                if (res.length > 0) {
                    setRole(res[0]);
                }
            },
            (err) => {
                console.error(err);
            }
        );
    }
    useEffect(() => {
        init()
    }, []);
    const onSubmit: SubmitHandler<IDataForm> = async (data) => {
        if (role === null) {
            toast("Error at role selection", {
                type: "error",
            });
            return;
        }
        await createRequestRole(
            {
                data: {
                    role: role,
                    data: data,
                },
                token: accessToken ?? "",
            },
            (res) => {
                if (res.status) {
                    toast(res.message, {
                        type: "success",
                    });
                    navigate("/");
                    return;
                }
                toast(res.message, {
                    type: "error",
                });
            },
            (err) => {
                toast(err.response.data.message ?? "Undefined error", {
                    type: "error",
                });
            }
        );
    };
    return (
        <main className="container pt-20">
            <h1 className="text-center font-font1 text-4xl lg:text-5xl text-orange-600 font-semibold py-2">
                Request Role Form
            </h1>
            <div className="">
                <label className="block text-lg font-font2 font-bold">
                    Role <span className="text-red-600 text-xs">(*Require)</span>
                </label>
                <ul className="flex items-center justify-start space-x-3">
                    <LoopList
                        list={listRole}
                        render={(item) => {
                            return (
                                <li
                                    onClick={() => {
                                        setRole(item);
                                    }}
                                    className={cn(
                                        "border px-3 py-2 font-font2 font-semibold cursor-pointer transition-all ",
                                        {
                                            "bg-orange-500 text-white": role === item,
                                            "hover:bg-green-600  hover:text-white": role !== item,
                                        }
                                    )}
                                >
                                    {item}
                                </li>
                            );
                        }}
                    />
                </ul>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="block text-lg font-font2 font-bold">
                        Name<span className="text-red-600 text-xs">(*Require)</span>
                    </label>
                    <Input
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required",
                            },
                            minLength: {
                                value: 5,
                                message: "Name must be at least 5 characters long",
                            },
                        })}
                        className={cn({"border-orange-500": errors.name}, "shadow")}
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                </div>
                <div className="mb-3">
                    <label className="block text-lg font-font2 font-bold">
                        Email<span className="text-red-600 text-xs">(*Require)</span>
                    </label>
                    <Input
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required",
                            },
                            minLength: {
                                value: 5,
                                message: "Email must be at least 5 characters long",
                            },
                        })}
                        className={cn({"border-orange-500": errors.email}, "shadow")}
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    {errors.email && (
                        <p className="text-red-600">{errors.email.message}</p>
                    )}
                </div>
                <div className="mb-3">
                    <label className="block text-lg font-font2 font-bold">
                        Phone number<span className="text-red-600 text-xs">(*Require)</span>
                    </label>
                    <Input
                        {...register("phone_number", {
                            required: {
                                value: true,
                                message: "Phone number is required",
                            },
                            minLength: {
                                value: 5,
                                message: "Phone number must be at least 5 characters long",
                            },
                        })}
                        className={cn(
                            {"border-orange-500": errors.phone_number},
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
                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        className="border px-6 py-2 bg-neutral-700 text-white hover:bg-neutral-800"
                    >
                        Send
                    </button>
                </div>
            </form>
        </main>
    );
};

export default RequestRolePage;
