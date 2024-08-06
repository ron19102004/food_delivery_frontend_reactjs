import React, { useEffect, useState } from "react";
import { cn } from "../../../../lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../components/input.component";
import useAuth from "../../../../hooks/useAuth.hook";
import { toast } from "react-toastify";
import useCategory from "../../../../hooks/useCategory.hook";
import { FoodEntity, updateFoods } from "../../../../apis/food.api";
import { CategoryEntity } from "../../../../apis/category.api";
import LoopList from "../../../../components/loop.component";

interface IUpdateFoodForm {
  item: FoodEntity;
  onClose(): void;
  updateItem(id: number, item: FoodEntity): void;
}
interface IDataForm {
  description: string;
  price: number;
  sale_off: number;
  poster_url: string;
  name: string;
}
const EditFoodForm: React.FC<IUpdateFoodForm> = ({
  onClose,
  item,
  updateItem,
}) => {
  const { list: categories } = useCategory();
  const [categorySelected, setCategorySelected] =
    useState<CategoryEntity | null>(null);
  const { accessToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataForm>({
    defaultValues: {
      description: item.description,
      price: item.price,
      sale_off: item.sale_off,
      poster_url: undefined,
      name: item.name,
    },
  });
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
      await updateFoods(
        {
          token: accessToken ?? "",
          data: {
            category_id: categorySelected.id,
            name: value.name,
            description: value.description,
            price: value.price,
            sale_off: value.sale_off,
            poster_url: value.poster_url,
          },
          food_id: item.id,
        },
        async (res) => {
          if (res.status) {
            toast(res.message, { type: "success" });
            updateItem(item.id, res.data);
            onClose();
            return;
          }
          toast(res.message ?? "Undefined error", { type: "error" });
        },
        (err) => {
          toast(err.response.data.message ?? "Undefined error", {
            type: "error",
          });
        }
      );
      return;
    }
    toast("Please select a category", { type: "error" });
  };
  return (
    <div className="px-6">
      <div>
        <label className="block text-lg font-font2">
          Category<span className="text-red-600 text-xs">(*Require)</span>
        </label>
        <ul className="w-92 flex justify-start space-x-4 over">
          <LoopList
            list={categories}
            render={(item) => {
              return (
                <li>
                  <button
                    onClick={() => {
                      setCategorySelected(item);
                    }}
                    className={cn("border px-2 py-1 rounded font-font3", {
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
            className={cn({ "border-orange-500": errors.name }, "shadow")}
            type="text"
            placeholder="Enter your name"
            required
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="mb-2">
          <label className="block text-lg font-font2">
            Price[$]<span className="text-red-600 text-xs">(*Require)</span>
          </label>
          <Input
            {...register("price", {
              required: {
                value: true,
                message: "Price is required",
              },
            })}
            className={cn({ "border-orange-500": errors.price }, "shadow")}
            type="number"
            placeholder="Enter your price"
            required
          />
          {errors.price && (
            <p className="text-red-600">{errors.price.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-lg font-font2">
            Sale off[%]<span className="text-red-600 text-xs">(*Require)</span>
          </label>
          <Input
            {...register("sale_off", {
              required: {
                value: true,
                message: "Sale off is required",
              },
            })}
            className={cn({ "border-orange-500": errors.sale_off }, "shadow")}
            type="number"
            placeholder="Enter your sale off"
            required
          />
          {errors.sale_off && (
            <p className="text-red-600">{errors.sale_off.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-lg font-font2">
            Poster url from driver
            <span className="text-red-600 text-xs">(*Require)</span>
          </label>
          <Input
            {...register("poster_url", {
              required: {
                value: true,
                message: "Poster is required",
              },
            })}
            className={cn({ "border-orange-500": errors.poster_url }, "shadow")}
            type="text"
            placeholder="Enter your poster url"
            required
          />
          <p className="text-sm">
            Require turn on general access to anyone on the internet with the
            link can view
          </p>
          {errors.poster_url && (
            <p className="text-red-600">{errors.poster_url.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label className="block text-lg font-font2">
            Description<span className="text-red-600 text-xs">(*Require)</span>
          </label>
          <textarea
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
              minLength: {
                value: 40,
                message: "Description must be at least 40 characters",
              },
            })}
            className={cn(
              "w-full p-3 text-gray-700 border-2 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 h-40",
              { "border-orange-500": errors.description },
              "shadow"
            )}
            placeholder="Enter your price"
            required
          />
          {errors.description && (
            <p className="text-red-600">{errors.description.message}</p>
          )}
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

export default EditFoodForm;
