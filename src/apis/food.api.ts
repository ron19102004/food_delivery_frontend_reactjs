/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api, { Entity, IResponseLayout } from "./api.config";
import { CategoryEntity } from "./category.api";
import { SellerEntity } from "./seller.api";

export interface FoodEntity extends Entity {
  updatedAt: string;
  createdAt: string;
  name: string;
  description: string;
  price: number;
  sale_price: number;
  sale_off: number;
  sold: number;
  poster: string;
  deleted: boolean;
  category: CategoryEntity;
  seller: SellerEntity;
}
export interface CommentEntity extends Entity {
  content: string;
  code_order: string;
  emotion: string;
}
interface RequestCreateFood {
  category_id: number;
  name: string;
  description: string;
  price: number;
  poster_url: string;
}
export async function createFood(
  req: {
    data: RequestCreateFood;
    token: string;
  },
  handler: (res: IResponseLayout<FoodEntity>) => Promise<void>,
  errorHandler: (err: any) => void
) {
  await axios
    .post<IResponseLayout<FoodEntity>>(api("foods/new"), req.data, {
      headers: {
        Authorization: `Bearer ${req.token}`,
      },
    })
    .then(async (res) => {
      await handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function getFoodDetails(
  req: { food_id: number },
  handler: (
    res: IResponseLayout<{ food: FoodEntity; comments: CommentEntity }>
  ) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .get<IResponseLayout<{ food: FoodEntity; comments: CommentEntity }>>(
      api(`foods/details/${req.food_id}`)
    )
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function getFoodsByCategoryId(
  req: { category_id: number },
  handler: (res: IResponseLayout<Array<FoodEntity>>) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .get<IResponseLayout<Array<FoodEntity>>>(
      api(`foods/category/${req.category_id}`)
    )
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function getFoodsBySellerId(
  req: { seller_id: number },
  handler: (res: IResponseLayout<Array<FoodEntity>>) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .get<IResponseLayout<Array<FoodEntity>>>(
      api(`foods/seller/uid/${req.seller_id}`)
    )
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function getFoodsBySellerUsername(
  req: { seller_name: string },
  handler: (res: IResponseLayout<Array<FoodEntity>>) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .get<IResponseLayout<Array<FoodEntity>>>(
      api(`foods/seller/username/${req.seller_name}`)
    )
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}

interface RequestUpdateFood {
  category_id: number;
  name: string;
  description: string;
  price: number;
  sale_off: number;
  poster_url: string;
}
export async function updateFoods(
  req: {
    token: string;
    data: RequestUpdateFood;
    food_id: number;
  },
  handler: (res: IResponseLayout<FoodEntity>) => Promise<void>,
  errorHandler: (err: any) => void
) {
  await axios
    .patch<IResponseLayout<FoodEntity>>(
      api(`foods/${req.food_id}/update`),
      req.data,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    )
    .then(async (res) => {
      await handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function deleteFoodById(
  res: {
    food_id: number;
    token: string;
  },
  handler: (res: IResponseLayout<string>) => Promise<void>,
  errorHandler: (err: any) => void
) {
  await axios
    .delete<IResponseLayout<string>>(api(`foods/${res.food_id}`), {
      headers: {
        Authorization: `Bearer ${res.token}`,
      },
    })
    .then(async (res) => {
      await handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
