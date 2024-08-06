import api, {Entity, IResponseLayout} from "./api.config.ts";
import {CategoryEntity} from "./category.api.ts";
import axios from "axios";

export interface VoucherEntity extends Entity {
    updatedAt: string;
    createdAt: string;
    percent: number;
    code: string;
    name: string;
    quantity: number;
    quantity_current: number;
    issued_at: string;
    expired_at: string;
    hidden: boolean;
    of_system: boolean;
    category: CategoryEntity;
}

export interface RequestCreateVoucher {
    percent: number,
    name: string,
    quantity: number,
    issued_at: string,
    expired_at: string,
    category_id: number,
    code: string
}

export async function createVoucherForSeller(req: {
    token: string;
    data: RequestCreateVoucher;
}, handler: (res: IResponseLayout<VoucherEntity>) => void, errorHandler: (err: any) => void) {
    await axios.post<IResponseLayout<VoucherEntity>>(api("vouchers/seller/new"), req.data, {
        headers: {
            Authorization: `Bearer ${req.token}`
        }
    }).then(res => handler(res.data))
        .catch(reason => errorHandler(reason))
}

export async function createVoucherForAdmin(req: {
    token: string;
    data: RequestCreateVoucher;
}, handler: (res: IResponseLayout<VoucherEntity>) => void, errorHandler: (err: any) => void) {
    await axios.post<IResponseLayout<VoucherEntity>>(api("vouchers/admin/new"), req.data, {
        headers: {
            Authorization: `Bearer ${req.token}`
        }
    }).then(res => handler(res.data))
        .catch(reason => errorHandler(reason))
}

export async function getAllVoucherBySellerUsername(req: {
    username: string
}, handler: (res: IResponseLayout<Array<VoucherEntity>>) => void, errorHandler: (err: any) => void) {
    await axios.get<IResponseLayout<Array<VoucherEntity>>>(api("vouchers/" + req.username))
        .then(value => handler(value.data))
        .catch(reason => errorHandler(reason));
}

export async function hiddenVoucher(req: {
    id_voucher: number,
    token: string
}, handler: (res: IResponseLayout<string>) => void, errorHandler: (err: any) => void) {
    await axios.delete<IResponseLayout<string>>(api("vouchers/" + req.id_voucher), {
        headers: {
            Authorization: `Bearer ${req.token}`
        }
    })
        .then(value => handler(value.data))
        .catch(reason => errorHandler(reason));
}
