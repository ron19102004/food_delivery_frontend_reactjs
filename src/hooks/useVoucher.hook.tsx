import {
    createVoucherForAdmin,
    createVoucherForSeller,
    getAllVoucherBySellerUsername, hiddenVoucher,
    RequestCreateVoucher,
    VoucherEntity
} from "../apis/voucher.api.tsx";
import {useContext, useEffect} from "react";
import {toast} from "react-toastify";
import {VoucherContext} from "../contexts/voucher.context.tsx";
import useList from "./useList.hook.tsx";

export interface IUseVoucher {
    list: Array<VoucherEntity>

    loadList(_toast?: typeof toast): Promise<void>

    sellerNew(token: string, data: RequestCreateVoucher, _toast?: typeof toast): Promise<void>

    adminNew(token: string, data: RequestCreateVoucher, _toast?: typeof toast): Promise<void>

    hide(id: number, token: string, _toast?: typeof toast): Promise<void>
}

export const _useVoucher = (username: string): IUseVoucher => {
    const {list, setList, addItem, removeItemById} = useList<VoucherEntity>()
    const loadList = async (_toast?: typeof toast) => {
        await getAllVoucherBySellerUsername({username: username}, (res) => {
            if (res.status) {
                setList(res.data)
                if (_toast)
                    _toast(res.message, {
                        type: "success"
                    })
                return
            }
            if (_toast)
                _toast(res.message, {
                    type: "error"
                })
        }, err => {
            if (_toast)
                _toast(err?.response?.data?.message ?? "Undefined error", {
                    type: "error"
                })
        })
    }
    const sellerNew = async (token: string, data: RequestCreateVoucher, _toast?: typeof toast) => {
        await createVoucherForSeller({token: token, data: data}, res => {
            if (res.status) {
                addItem(res.data)
                if (_toast)
                    _toast(res.message, {
                        type: "success"
                    })
                return
            }
            if (_toast)
                _toast(res.message, {
                    type: "error"
                })
        }, err => {
            if (_toast)
                _toast(err?.response?.data?.message ?? "Undefined error", {
                    type: "error"
                })
        })
    }
    const adminNew = async (token: string, data: RequestCreateVoucher, _toast?: typeof toast) => {
        await createVoucherForAdmin({token: token, data: data}, res => {
            if (res.status) {
                addItem(res.data)
                if (_toast)
                    _toast(res.message, {
                        type: "success"
                    })
                return
            }
            if (_toast)
                _toast(res.message, {
                    type: "error"
                })
        }, err => {
            if (_toast)
                _toast(err?.response?.data?.message ?? "Undefined error", {
                    type: "error"
                })
        })
    }
    const hide = async (id: number, token: string, _toast?: typeof toast) => {
        await hiddenVoucher({id_voucher: id, token: token}, res => {
            if (res.status) {
                removeItemById(id)
                if (_toast)
                    _toast(res.message, {
                        type: "success"
                    })
                return
            }
            if (_toast)
                _toast(res.message, {
                    type: "error"
                })
        }, err => {
            if (_toast)
                _toast(err?.response?.data?.message ?? "Undefined error", {
                    type: "error"
                })
        })
    }
    useEffect(() => {
        loadList()
    }, []);
    return {
        list: list,
        loadList: loadList,
        adminNew: adminNew,
        sellerNew: sellerNew,
        hide: hide
    }
}
const useVoucher = () => useContext(VoucherContext)
export default useVoucher