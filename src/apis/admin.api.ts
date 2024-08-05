/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api, { IResponseLayout } from "./api.config";

export async function getTotalsUser(
  req: { token: string },
  handler: (
    res: IResponseLayout<{
      totalsUser: number;
      totalsDeliver: number;
      totalsSeller: number;
    }>
  ) => void,
  errorHandler: (err: any) => void
) {
  await axios
    .get<
      IResponseLayout<{
        totalsUser: number;
        totalsDeliver: number;
        totalsSeller: number;
      }>
    >(api("admin/user/total"), {
      headers: {
        Authorization: `Bearer ${req.token}`,
      },
    })
    .then((res) => {
      handler(res.data);
    })
    .catch((err) => errorHandler(err));
}
