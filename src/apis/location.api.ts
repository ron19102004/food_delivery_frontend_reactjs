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
