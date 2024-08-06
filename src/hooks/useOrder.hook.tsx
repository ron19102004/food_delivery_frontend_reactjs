import {useContext, useEffect, useState} from "react";
import {cancelOrderById, getMyOrders, OrderEntity, StatusOrder} from "../apis/order.api.ts";
import {OrderContext} from "../contexts/order.context.tsx";
import {toast} from "react-toastify";

export interface IUseOrder {
    list_handling: Array<OrderEntity>,
    list_canceled: Array<OrderEntity>,
    list_finished: Array<OrderEntity>,

    reload(_toast?: typeof toast): Promise<void>

    cancelOrder(id: number, reason_cancel: string, _toast?: typeof toast): Promise<void>
}

export const _useOrder = (token: string): IUseOrder => {
    const [list_handling, setListHandling] = useState<Array<OrderEntity>>([])
    const [list_canceled, setListCanceled] = useState<Array<OrderEntity>>([])
    const [list_finished, setListFinished] = useState<Array<OrderEntity>>([])
    const reload = async (_toast?: typeof toast) => {
        await getMyOrders({token: token},
            (res) => {
                if (res.status) {
                    setListCanceled(res.data.canceled);
                    setListFinished(res.data.finished);
                    setListHandling(res.data.handling);
                    if (_toast)
                        _toast(res.message, {
                            type: "success"
                        })
                    return;
                }
                if (_toast)
                    _toast(res.message, {
                        type: "error"
                    })
            }, (err) => {
                if (_toast)
                    _toast(err?.response?.data?.message ?? "Undefined error", {
                        type: "error"
                    })
            })
    }
    const cancelOrder = async (id: number, reason_cancel: string, _toast?: typeof toast) => {
        await cancelOrderById({
                order_id: id,
                reason_cancel: reason_cancel,
                token: token
            },
            (res) => {
                if (res.status) {
                    if (_toast)
                        _toast(res.message, {
                            type: "success"
                        })
                    const list_handling_copy = list_handling;
                    let _index: number = 0;
                    const list_handling_handled = list_handling_copy.filter((value, index) => {
                        if (value.id === id) {
                            _index = index
                            return false
                        }
                        return true
                    })
                    console.log("list_handling_handled", list_handling_handled)
                    const order = list_handling[_index];
                    setListHandling(list_handling_handled)
                    order.status = StatusOrder.CANCELED
                    order.reason_cancel = reason_cancel;
                    setListCanceled([order, ...list_canceled])
                    return
                }
                if (_toast)
                    _toast(res.message ?? "Unknown error", {
                        type: "error"
                    })
            }, (err) => {
                if (_toast)
                    _toast(err?.response?.data?.message ?? "Unknown error")
            })
    }
    useEffect(() => {
        reload()

    }, [0]);
    return {
        list_canceled: list_canceled,
        list_finished: list_finished,
        list_handling: list_handling,
        reload: reload,
        cancelOrder: cancelOrder
    }
}
const useOrder = () => useContext(OrderContext)
export default useOrder