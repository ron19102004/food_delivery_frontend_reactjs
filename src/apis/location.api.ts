/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api, { IResponseLayout } from "./api.config";

export interface LocationEntity {
  id: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  deleted: boolean;
  code: number;
}
export async function getAllLocation(
  handler: (res: IResponseLayout<Array<LocationEntity>>) => void,
  errorHandler: (err: any) => void
): Promise<void> {
  await axios
    .get<IResponseLayout<Array<LocationEntity>>>(api("locations"))
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function deletedLocation(
  req: { token: string; id: number },
  handler: (res: IResponseLayout<string>) => Promise<void>,
  errorHandler: (err: any) => void
): Promise<void> {
  await axios
    .delete<IResponseLayout<string>>(api(`locations/${req.id}`), {
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
export async function createLocation(
  req: { name: string; code: number; token?: string },
  handler: (res: IResponseLayout<LocationEntity>) => Promise<void>,
  errorHandler: (err: any) => void
) {
  const token: string = req.token ?? "";
  delete req.token;
  await axios
    .post<IResponseLayout<LocationEntity>>(api("locations/new"), req, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => {
      await handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function updateLocation(
  req: { name: string; code: number; token?: string; id?: number | string },
  handler: (res: IResponseLayout<LocationEntity>) => Promise<void>,
  errorHandler: (err: any) => void
) {
  const token: string = req.token ?? "";
  delete req.token;
  const id: number | string = req.id ?? "";
  delete req.id;
  await axios
    .put<IResponseLayout<LocationEntity>>(api(`locations/${id}`), req, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => {
      await handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
