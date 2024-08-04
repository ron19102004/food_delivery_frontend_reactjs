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
    .then(async(res) => {
     await handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
