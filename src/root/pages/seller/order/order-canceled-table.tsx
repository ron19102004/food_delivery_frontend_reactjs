import React, {useState} from 'react';
import LoopList from "../../../../components/loop.component.tsx";
import {cn} from "../../../../lib/utils.ts";
import useOrder from "../../../../hooks/useOrder.hook.tsx";
import {OrderEntity} from "../../../../apis/order.api.ts";
import {dateFormat} from "../../../../utils/date.util.ts";

const OrderCanceledTable: React.FC = () => {
    const {list_canceled: list} = useOrder()
    const [rowSelected, setRowSelected] = useState<OrderEntity>()
    return (
        <div>
            <div className="text-gray-900 font-font3">
                <div
                    className="px-3 md:px-4 py-2 max-h-[calc(100vh-12rem)] w-[22rem] sm:w-[40rem] md:w-[calc(100vw-300px)] overflow-auto">
                    <table className="w-full text-md bg-white ">
                        <thead className="sticky -top-5">
                        <tr className="border-b bg-orange-600 text-white text-sm">
                            <th className="text-left p-3 px-5">CODE ORDER</th>
                            <th className="text-left p-3 px-5">FOOD ID</th>
                            <th className="text-left p-3 px-5">FOOD NAME</th>
                            <th className="text-left p-3 px-5">USER NAME - PHONE NUMBER</th>
                            <th className="text-left p-3 px-5">REASON CANCEL</th>
                            <th className="text-left p-3 px-5">CREATE AT</th>

                        </tr>
                        </thead>
                        <tbody>
                        <LoopList
                            list={list}
                            render={(item) => {
                                return (
                                    <tr
                                        className={cn(
                                            "border-b hover:bg-blue-200 bg-white  cursor-pointer",
                                            {
                                                "bg-orange-500 text-white font-semibold":
                                                    rowSelected?.id === item.id,
                                            }
                                        )}
                                        onClick={() => {
                                            setRowSelected(item);
                                        }}
                                    >
                                        <td className="p-3 px-5">{item.code_order}</td>
                                        <td className="p-3 px-5">{item.food.id}</td>
                                        <td className="p-3 px-5">{item.food.name}</td>
                                        <td className="p-3 px-5">{item.user?.first_name} {item.user?.last_name}-{item.user.phone_number}</td>
                                        <td className="p-3 px-5">{item.reason_cancel}</td>
                                        <td className="p-3 px-5">{dateFormat(item.createdAt)}</td>
                                    </tr>
                                );
                            }}
                        />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderCanceledTable;