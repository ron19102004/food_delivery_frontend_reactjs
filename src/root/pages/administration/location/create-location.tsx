import React from "react";
import { cn } from "../../../../lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../components/input.component";
import useAuth from "../../../../hooks/useAuth.hook";
import { createLocation, LocationEntity } from "../../../../apis/location.api";
import { toast } from "react-toastify";

interface ICreateLocationForm {
  onClose(): void;
  addItem(item: LocationEntity): void;
}
interface IDataForm {
  code: string;
  name: string;
}
const CreateLocationForm: React.FC<ICreateLocationForm> = ({
  onClose,
  addItem,
}) => {
  const { accessToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataForm>();
  const onSubmit: SubmitHandler<IDataForm> = async (value) => {
    await createLocation(
      {
        token: accessToken ?? "",
        name: value.name,
        code: value.code,
      },
      async (res) => {
        if (res.status) {
          toast(res?.message ?? "Location created successfully!", {
            type: "success",
          });
          addItem(res.data);
          onClose();
          return;
        }
        toast(res?.message ?? "Error creating location", {
          type: "error",
        });
      },
      (err) => {
        const res = err?.response?.data;
        toast(res?.message ?? "Undefine error", {
          type: "error",
        });
      }
    );
  };
  return (
    <div className="px-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="block text-lg font-font2">Name</label>
          <Input
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            className={cn({ "border-orange-500": errors.name }, "shadow")}
            type="text"
            placeholder="Enter your name"
            required
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <label className="block text-lg font-font2">Code</label>
          <Input
            {...register("code", {
              required: {
                value: true,
                message: "Code is required",
              },
            })}
            className={cn({ "border-orange-500": errors.code }, "shadow")}
            type="text"
            placeholder="Enter your code"
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

export default CreateLocationForm;
