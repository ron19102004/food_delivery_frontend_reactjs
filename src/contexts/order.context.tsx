import React, {createContext} from "react";
import {_useOrder, IUseOrder} from "../hooks/useOrder.hook.tsx";
import {toast} from "react-toastify";

export const OrderContext = createContext<IUseOrder>({
    list_canceled: [],
    list_handling: [],
    list_finished: [],
    reload(_toast?: typeof toast): Promise<void> {
        return Promise.resolve()
    },
    cancelOrder(_id: number, _reason_cancel: string, _toast?: typeof toast): Promise<void> {
        return Promise.resolve()
    }
})

interface IOrderProviderProps {
    children: React.ReactNode,
    token: string
}

const OrderProvider: React.FC<IOrderProviderProps> = ({children, token}) => {
    return <OrderContext.Provider value={_useOrder(token)}>
        {children}
    </OrderContext.Provider>
}
export default OrderProvider