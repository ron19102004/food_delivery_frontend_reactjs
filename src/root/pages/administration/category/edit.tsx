import React from "react";
import { cn } from "../../../../lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../components/input.component";
import useAuth from "../../../../hooks/useAuth.hook";
import { CategoryEntity, updateCategory } from "../../../../apis/category.api";
import { toast } from "react-toastify";

interface IEditCateForm {
  item: CategoryEntity;
  onClose(): void;
  updateItem(id: number, item: CategoryEntity): void;
}
interface IDataForm {
  name: string;
  img_url: string;
}
const EditCategoryForm: React.FC<IEditCateForm> = ({
  onClose,
  item,
  updateItem,
}) => {
  const { accessToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataForm>({
    defaultValues: {
      name: item.name,
      img_url: item.image,
    },
  });

  const onSubmit: SubmitHandler<IDataForm> = async (value) => {
    await updateCategory(
      {
        url_img_driver: value.img_url,
        id: item.id,
        token: accessToken ?? "",
        name: value.name,
      },
      async (res) => {
        if (res.status) {
          toast(res.message, {
            type: "success",
          });
          updateItem(item.id, res.data);
          onClose();
          return;
        }
      },
      (err) => {
        const res = err.response.data;
        toast(res.message ?? "Undefined error", {
          type: "error",
        });
      }
    );
  };
  return (
    <div className="px-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="block text-lg font-font2">
            Image url from google driver
          </label>
          <p className="text-sm">
            Require turn on general access to anyone on the internet with the
            link can view
          </p>
          <Input
            {...register("img_url", {
              required: {
                value: true,
                message: "Image url is required",
              },
            })}
            className={cn({ "border-orange-500": errors.img_url }, "shadow")}
            type="text"
            placeholder="Enter your image url"
            required
          />
          {errors.img_url && (
            <p className="text-red-600">{errors.img_url.message}</p>
          )}
        </div>
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
        <div className="pb-4 flex justify-end items-center space-x-4 font-font3">
          <button
            type="submit"
            className="border border-green-500 h-10 px-3 bg-green-500 hover:bg-green-600 text-white rounded-sm"
          >
            Update
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

export default EditCategoryForm;
