import {
    createVoucherForAdmin,
    createVoucherForSeller,
    getAllVoucherBySellerUsername, getAllVoucherOfSystem, hiddenVoucher,
    RequestCreateVoucher,
    VoucherEntity
} from "../apis/voucher.api.ts";
import {useContext, useEffect} from "react";
import {toast} from "react-toastify";
import {VoucherContext} from "../contexts/voucher.context.tsx";
import useList from "./useList.hook.tsx";
import {UserRole} from "../apis/auth.api.ts";

export interface IUseVoucher {
    list: Array<VoucherEntity>

    loadList(_toast?: typeof toast): Promise<void>

    add(token: string, data: RequestCreateVoucher, _toast?: typeof toast, success?:()=>void): Promise<void>

    hide(id: number, token: string, _toast?: typeof toast): Promise<void>
}

export const _useVoucher = (username: string, userRole: UserRole): IUseVoucher => {
    const {list, setList, addItem, removeItemById} = useList<VoucherEntity>()
    const loadList = async (_toast?: typeof toast) => {
        if (userRole == UserRole.SELLER) {
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
            return
        }
        if (userRole == UserRole.ADMIN) {
            await getAllVoucherOfSystem((res) => {
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
            return
        }
        if (_toast)
            _toast("Role not permission", {
                type: "error"
            })
    }
    const sellerNew = async (token: string, data: RequestCreateVoucher, _toast?: typeof toast,success?:()=>void) => {
        await createVoucherForSeller({token: token, data: data}, res => {
            if (res.status) {
                addItem(res.data)
                if (_toast)
                    _toast(res.message, {
                        type: "success"
                    })
                if(success)
                    success();
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
    const adminNew = async (token: string, data: RequestCreateVoucher, _toast?: typeof toast,success?:()=>void) => {
        await createVoucherForAdmin({token: token, data: data}, res => {
            if (res.status) {
                addItem(res.data)
                if (_toast)
                    _toast(res.message, {
                        type: "success"
                    })
                if(success)
                    success();
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
    const add = async (token: string, data: RequestCreateVoucher, _toast?: typeof toast,success?:()=>void) => {
        if (userRole == UserRole.SELLER) {
            await sellerNew(token, data, _toast,success);
            return
        }
        if (userRole == UserRole.ADMIN) {
            await adminNew(token, data, _toast,success)
            return
        }
        if (_toast)
            _toast("Role not permission", {
                type: "error"
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
        add: add,
        hide: hide
    }
}
const useVoucher = () => useContext(VoucherContext)
export default useVoucher