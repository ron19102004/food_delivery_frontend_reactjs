/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api, { Entity, IResponseLayout } from "./api.config";
import { LocationEntity } from "./location.api";

export interface SellerEntity extends Entity {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone_number: string;
  email: string;
  background_image: string;
  avatar: string;
  open_at: string;
  close_at: string;
  issued_at: string;
  enabled: boolean;
  location: LocationEntity | null;
}
export async function getMyInfoSeller(
  req: { token: string },
  handler: (res: IResponseLayout<SellerEntity>) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .get<IResponseLayout<SellerEntity>>(api("sellers/me"), {
      headers: { Authorization: `Bearer ${req.token}` },
    })
    .then((res) => handler(res.data))
    .catch((err) => errorHandler(err));
}
interface RequestUpdateSellerInfo {
  name: string;
  address: string;
  latitude: 0;
  longitude: 0;
  phone_number: string;
  email: string;
  open_at: string;
  close_at: string;
  location_id: number;
  avatar_url: string;
  background_url:string
}
export async function updateSellerInfo(
  req: {
    data: RequestUpdateSellerInfo;
    token: string;
  },
  handler: (res: IResponseLayout<SellerEntity>) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .post<IResponseLayout<SellerEntity>>(
      api("sellers/update-information"),
      req.data,
      {
        headers: { Authorization: `Bearer ${req.token}` },
      }
    )
    .then((res) => handler(res.data))
    .catch((err) => errorHandler(err));
}
