/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api, { Entity, IResponseLayout } from "./api.config";
import { UserEntity } from "./auth.api";

export interface RequestRoleEntity extends Entity{
  updatedAt: string;
  createdAt: string;
  role: string;
  status: string;
  handled_at: string;
  requested_at: string;
  is_accepted: boolean;
  user: UserEntity;
}
export async function getRolesToRequest(
  handler: (res: Array<string>) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .get<Array<string>>(api("users/request-role/roles"))
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export interface RequestRoleDto {
  role: string;
  data: {
    email: string;
    phone_number: string;
    name: string;
  };
}
export async function createRequestRole(
  req: {
    data: RequestRoleDto;
    token: string;
  },
  handler: (res: IResponseLayout<RequestRoleEntity>) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .post<IResponseLayout<RequestRoleEntity>>(
      api("users/request-role/new"),
      req.data,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    )
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function handleRequestRole(
  req: {
    id_request: number;
    is_accepted: boolean;
    token: string;
  },
  handler: (res: IResponseLayout<string>) => Promise<void>,
  errorHandler: (err: any) => void
) {
  await axios
    .post<IResponseLayout<string>>(
      api(`users/request-role/${req.id_request}/handle`),
      {
        is_accepted: req.is_accepted,
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    )
    .then(async(res) => {
     await handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function cancelRole(
  req: { token: string },
  handler: (res: IResponseLayout<string>) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .post<IResponseLayout<string>>(
      api(`users/request-role/cancel`),
      {},
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    )
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
export async function getAllRequestRole(
  req: { token: string },
  handler: (
    res: IResponseLayout<{
      handled: Array<RequestRoleEntity>;
      waiting: Array<RequestRoleEntity>;
    }>
  ) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .get<
      IResponseLayout<{
        handled: Array<RequestRoleEntity>;
        waiting: Array<RequestRoleEntity>;
      }>
    >(api("users/request-role/all"), {
      headers: {
        Authorization: `Bearer ${req.token}`,
      },
    })
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => {
      errorHandler(err);
    });
}
