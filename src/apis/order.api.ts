/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api, {Entity, IResponseLayout} from "./api.config";
import {UserEntity} from "./auth.api";
import {AssessmentEntity, DeliverCharges, DeliverEntity} from "./deliver.api";
import {FoodEntity} from "./food.api";
import {VoucherEntity} from "./voucher.api.tsx";

export interface CommentEntity extends Entity {
    content: string;
    code_order: string;
    emotion: "DISAPPOINTED";
}


export enum StatusOrder {
    HANDLING = "HANDLING",
    CANCELED = "CANCELED",
    FINISHED = "FINISHED",
}

export interface OrderEntity extends Entity {
    updatedAt: string;
    createdAt: string;
    code_order: string;
    latitude_receive: number;
    longitude_receive: number;
    latitude_send: number;
    longitude_send: number;
    quantity: number;
    note: string;
    reason_cancel: string;
    status: StatusOrder;
    total: number;
    kilometer: number;
    address: string;
    user: UserEntity;
    deliver: DeliverEntity;
    delivery_charges: DeliverCharges;
    voucher: VoucherEntity;
    food: FoodEntity;
    assessmentEntity: AssessmentEntity;
    commentEntity: CommentEntity;
}

//api
export async function getMyOrders(
    req: { token: string },
    handler: (res: IResponseLayout<{
        handling: Array<OrderEntity>,
        canceled: Array<OrderEntity>,
        finished: Array<OrderEntity>
    }>) => void,
    errorHandler: (res: any) => void
) {
    await axios
        .get<IResponseLayout<{
            handling: Array<OrderEntity>,
            canceled: Array<OrderEntity>,
            finished: Array<OrderEntity>
        }>>(api("sellers/orders"), {
            headers: {
                Authorization: `Bearer ${req.token}`,
            },
        })
        .then((res) => handler(res.data))
        .catch((err) => errorHandler(err));
}

export async function cancelOrderById(req: {
    token: string,
    order_id: number,
    reason_cancel: string
}, handler: (res: IResponseLayout<string>) => void, errorHandler: (err: any) => void) {
    await axios.post<IResponseLayout<string>>(api("foods/orders/cancel"), {
        order_id: req.order_id,
        reason_cancel: req.reason_cancel
    }, {
        headers: {
            Authorization: `Bearer ${req.token}`,
        }
    }).then(res => handler(res.data))
        .catch((err) => errorHandler(err));
}