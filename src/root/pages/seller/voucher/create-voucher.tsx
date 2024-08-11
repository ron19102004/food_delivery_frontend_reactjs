import React, {useEffect, useState} from "react";
import useAuth from "../../../../hooks/useAuth.hook";
import {SubmitHandler, useForm} from "react-hook-form";
import useCategory from "../../../../hooks/useCategory.hook";
import {Input} from "../../../../components/input.component";
import {cn} from "../../../../lib/utils";
import LoopList from "../../../../components/loop.component";
import {CategoryEntity} from "../../../../apis/category.api";
import {toast} from "react-toastify";
import useVoucher from "../../../../hooks/useVoucher.hook.tsx";

interface IDataForm {
    percent: number,
    name: string,
    quantity: number,
    issued_at: string,
    expired_at: string,
    code: string
}

interface ICreateVoucherFormProps {
    onClose(): void;
}

const CreateVoucherForm: React.FC<ICreateVoucherFormProps> = ({onClose,}) => {
    const {list: categories} = useCategory();
    const [categorySelected, setCategorySelected] =
        useState<CategoryEntity | null>(null);
    const {accessToken} = useAuth();
    const {add} = useVoucher()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IDataForm>();
    const initialize = async () => {
        if (categories.length > 0) {
            setCategorySelected(categories[0]);
        }
    };
    useEffect(() => {
        initialize();
    }, [categories]);
    const onSubmit: SubmitHandler<IDataForm> = async (value) => {
        if (categorySelected) {
            await add(accessToken ?? "", {
                category_id: categorySelected.id,
                code: value.code,
                expired_at: value.expired_at,
                issued_at: value.issued_at,
                name: value.name,
                percent: value.percent,
                quantity: value.quantity
            }, toast, () => {
                onClose()
            })
            return;
        }
        toast("Please select a category", {type: "error"});
    };
    return (
        <div className="px-4">
            <div>
                <label className="block text-lg font-font2">
                    Category<span className="text-red-600 text-xs">(*Require)</span>
                </label>
                <ul className=" scroll-y-custom w-92 flex justify-start gap-4 overflow-y-auto">
                    <LoopList
                        list={categories}
                        render={(item) => {
                            return (
                                <li>
                                    <button
                                        onClick={() => {
                                            setCategorySelected(item);
                                        }}
                                        className={cn("border h-full min-w-40 px-2 py-1 rounded font-font3", {
                                            "bg-orange-500 text-white": categorySelected === item,
                                        })}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            );
                        }}
                    />
                </ul>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*name: string,*/}
                <div className="mb-2">
                    <label className="block text-lg font-font2">
                        Name<span className="text-red-600 text-xs">(*Require)</span>
                    </label>
                    <Input
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Name is required",
                            },
                        })}
                        className={cn({"border-orange-500": errors.name}, "shadow")}
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                </div>
                {/*percent: number,*/}
                <div className="mb-2">
                    <label className="block text-lg font-font2">
                        Percent<span className="text-red-600 text-xs">(*Require)</span>
                    </label>
                    <Input
                        {...register("percent", {
                            required: {
                                value: true,
                                message: "Percent is required",
                            },
                        })}
                        className={cn({"border-orange-500": errors.percent}, "shadow")}
                        type="number"
                        placeholder="Enter percent"
                        required
                    />
                    {errors.percent && <p className="text-red-600">{errors.percent.message}</p>}
                </div>
                {/*quantity: number,*/}
                <div className="mb-2">
                    <label className="block text-lg font-font2">
                        Quantity<span className="text-red-600 text-xs">(*Require)</span>
                    </label>
                    <Input
                        {...register("quantity", {
                            required: {
                                value: true,
                                message: "Quantity is required",
                            },
                        })}
                        className={cn({"border-orange-500": errors.quantity}, "shadow")}
                        type="number"
                        placeholder="Enter quantity"
                        required
                    />
                    {errors.quantity && <p className="text-red-600">{errors.quantity.message}</p>}
                </div>
                {/*issued_at: string,*/}
                <div className="mb-2">
                    <label className="block text-lg font-font2">
                        Issued at<span className="text-red-600 text-xs">(*Require)</span>
                    </label>
                    <Input
                        {...register("issued_at", {
                            required: {
                                value: true,
                                message: "Name is required",
                            },
                        })}
                        className={cn({"border-orange-500": errors.issued_at}, "shadow")}
                        type="datetime-local"
                        placeholder="Enter issued at"
                        required
                    />
                    {errors.issued_at && <p className="text-red-600">{errors.issued_at.message}</p>}
                </div>
                {/*expired_at: string,*/}
                <div className="mb-2">
                    <label className="block text-lg font-font2">
                        Expired at<span className="text-red-600 text-xs">(*Require)</span>
                    </label>
                    <Input
                        {...register("expired_at", {
                            required: {
                                value: true,
                                message: "Expired at is required",
                            },
                        })}
                        className={cn({"border-orange-500": errors.expired_at}, "shadow")}
                        type="datetime-local"
                        placeholder="Enter expired at"
                        required
                    />
                    {errors.expired_at && <p className="text-red-600">{errors.expired_at.message}</p>}
                </div>
                {/*code: string*/}
                <div className="mb-2">
                    <label className="block text-lg font-font2">
                        Code<span className="text-red-600 text-xs">(*Require)</span>
                    </label>
                    <Input
                        {...register("code", {
                            required: {
                                value: true,
                                message: "Code is required",
                            },
                        })}
                        className={cn({"border-orange-500": errors.code}, "shadow")}
                        type="text"
                        placeholder="Enter code"
                        required
                    />
                    {errors.code && <p className="text-red-600">{errors.code.message}</p>}
                </div>
                <div className="pb-4 flex justify-end items-center space-x-4 font-font3">
                    <button
                        type="submit"
                        className="border border-green-500 h-10 px-3 bg-green-500 hover:bg-green-600 text-white rounded-sm"
                    >
                        New
                    </button>
                    <button
                        onClick={onClose}
                        className="border border-red-500 hover:bg-red-600 h-10 px-3 bg-red-500 text-white rounded-sm"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateVoucherForm;
