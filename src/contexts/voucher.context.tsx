import React, {createContext, FC} from "react";
import {_useVoucher, IUseVoucher} from "../hooks/useVoucher.hook.tsx";
import {toast} from "react-toastify";
import {RequestCreateVoucher} from "../apis/voucher.api.ts";
import {UserRole} from "../apis/auth.api.ts";

export const VoucherContext = createContext<IUseVoucher>({
    hide(_id: number, _token: string, _toast?: typeof toast): Promise<void> {
        return Promise.resolve();
    },
    list: [],
    add(_token: string, _data: RequestCreateVoucher, _toast?: typeof toast,_success?:()=>void): Promise<void> {
        return Promise.resolve();
    },
    loadList(_toast?: typeof toast): Promise<void> {
        return Promise.resolve();
    },
})
const VoucherProvider: FC<{ children: React.ReactNode, username: string, userRole: UserRole }> = ({
                                                                                                      username,
                                                                                                      children,
                                                                                                      userRole
                                                                                                  }) => {
    return <VoucherContext.Provider value={_useVoucher(username, userRole)}>
        {children}
    </VoucherContext.Provider>
}
export default VoucherProvider;