/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api, { IResponseLayout } from "./api.config";

export interface CategoryEntity {
  id: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  image: string;
  deleted: boolean;
}
export async function getAllCategory(
  handler: (res: IResponseLayout<Array<CategoryEntity>>) => void,
  errorHandler: (error: any) => void
) {
  await axios
    .get<IResponseLayout<Array<CategoryEntity>>>(api("categories"))
    .then((res) => handler(res.data))
    .catch((err) => errorHandler(err));
}
export async function newCategory(
  req: { token: string; name: string },
  handler: (res: IResponseLayout<CategoryEntity>) => Promise<void>,
  errorHandler: (error: any) => void
) {
  await axios
    .post<IResponseLayout<CategoryEntity>>(api("categories/new"), req, {
      headers: { Authorization: `Bearer ${req.token}` },
    })
    .then(async (res) => await handler(res.data))
    .catch((err) => errorHandler(err));
}
export async function updateCategory(
  req: { url_img_driver: string; id: number; token: string; name: string },
  handler: (res: IResponseLayout<CategoryEntity>) => Promise<void>,
  errorHandler: (error: any) => void
) {
  await axios
    .put<IResponseLayout<CategoryEntity>>(
      api(`categories/${req.id}`),
      {
        name: req.name,
        image_url_drive: req.url_img_driver,
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    )
    .then(async (res) => await handler(res.data))
    .catch((err) => errorHandler(err));
}
export async function removeCategory(
  req: { id: number; token: string },
  handler: (res: IResponseLayout<string>) => Promise<void>,
  errorHandler: (error: any) => void
) {
  await axios
    .delete<IResponseLayout<string>>(api(`categories/${req.id}`), {
      headers: { Authorization: `Bearer ${req.token}` },
    })
    .then(async(res) =>await handler(res.data))
    .catch((err) => errorHandler(err));
}
