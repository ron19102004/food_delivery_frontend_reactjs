import React from 'react';
import {cn} from "../../../../lib/utils.ts";
import {HiArrowLongRight} from "react-icons/hi2";
import {ClassValue} from "clsx";
import useOrder from "../../../../hooks/useOrder.hook.tsx";

const OrderStatus: React.FC<{ className?: ClassValue }> = ({className}) => {
    const {list_finished, list_handling, list_canceled} = useOrder()
    return (
        <div>
            <div
                className={cn(" pb-4 px-2 pt-2 md:px-4 md:pt-4 flex-wrap flex items-center justify-center md:justify-start md:space-x-2", className)}>
                <div
                    className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto bg-white shadow-lg ">
                    <h1 className="font-font2">Handling </h1>
                    <HiArrowLongRight className="text-orange-600"/>
                    <h1>
                        <span className="font-bold font-font3">
                            {list_handling.length}{` `}
                            {list_handling.length > 1 ? "orders" : "order"}
                        </span>
                    </h1>
                </div>
                <div
                    className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto bg-white shadow-lg ">
                    <h1 className="font-font2">Finished </h1>
                    <HiArrowLongRight className="text-orange-600"/>
                    <h1>
                        <span className="font-bold font-font3">
                            {list_finished.length}{` `}
                            {list_finished.length > 1 ? "orders" : "order"}
                        </span>
                    </h1>
                </div>
                <div
                    className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto bg-white shadow-lg ">
                    <h1 className="font-font2">Canceled </h1>
                    <HiArrowLongRight className="text-orange-600"/>
                    <h1>
                        <span className="font-bold font-font3">
                            {list_canceled.length}{` `}
                            {list_canceled.length > 1 ? "orders" : "order"}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;