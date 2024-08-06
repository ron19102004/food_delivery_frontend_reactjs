import React, {createContext, FC} from "react";
import {_useVoucher, IUseVoucher} from "../hooks/useVoucher.hook.tsx";
import {toast} from "react-toastify";
import {RequestCreateVoucher} from "../apis/voucher.api.tsx";

export const VoucherContext = createContext<IUseVoucher>({
    hide(_id: number, _token: string, _toast?: typeof toast): Promise<void> {
        return Promise.resolve();
    },
    list: [],
    adminNew(_token: string, _data: RequestCreateVoucher, _toast?: typeof toast): Promise<void> {
        return Promise.resolve();
    },
    loadList(_toast?: typeof toast): Promise<void> {
        return Promise.resolve();
    },
    sellerNew(_token: string, _data: RequestCreateVoucher, _toast?: typeof toast): Promise<void> {
        return Promise.resolve();
    }
})
const VoucherProvider: FC<{ children: React.ReactNode, username: string }> = ({username, children}) => {
    return <VoucherContext.Provider value={_useVoucher(username)}>
        {children}
    </VoucherContext.Provider>
}
export default VoucherProvider;