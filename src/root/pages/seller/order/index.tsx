import React from 'react'
import OrderStatus from "./order-status.tsx";
import OrderHandlingTable from "./order-handling-table.tsx";
import OrderCanceledTable from "./order-canceled-table.tsx";
import {HiArrowPathRoundedSquare} from "react-icons/hi2";
import useOrder from "../../../../hooks/useOrder.hook.tsx";
import OrderFinishedTable from "./order-finished-table.tsx";
import {toast} from "react-toastify";
import OrderResultSearchTable from "./order-result-search-table.tsx";

const MyOrderSellerPage: React.FC = () => {
    const {reload} = useOrder()
    return (
        <div>
            <div>
                <div className={"px-2 py-2 md:px-4 md:py-4 flex items-center space-x-2"}>
                    <h1 className=" text-xl font-font3 font-bold">My orders</h1>
                    <button onClick={async () => {
                        await reload(toast)
                    }}
                            className={"px-4 py-2 shadow bg-neutral-200 hover:bg-orange-500 hover:text-white transition-all rounded-3xl font-font2 flex items-center space-x-1 "}>
                        <HiArrowPathRoundedSquare/>
                        <span>Reload</span>
                    </button>
                </div>
            </div>
            <div>
                <OrderResultSearchTable/>
            </div>
            <div>
                <h1 className="px-2 pt-2 md:px-4 md:pt-4 text-xl font-font3 font-bold">My orders handling</h1>
                <OrderHandlingTable/>
            </div>
            <div>
                <h1 className="px-2 pt-2 md:px-4 md:pt-4 text-xl font-font3 font-bold">My orders canceled</h1>
                <OrderCanceledTable/>
            </div>
            <div>
                <h1 className="px-2 pt-2 md:px-4 md:pt-4 text-xl font-font3 font-bold">My orders finished</h1>
                <OrderFinishedTable/>
            </div>
        </div>
    )
}

export default MyOrderSellerPage