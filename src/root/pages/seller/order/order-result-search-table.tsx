import React, {useCallback, useEffect, useState} from 'react';
import LoopList from "../../../../components/loop.component.tsx";
import {cn} from "../../../../lib/utils.ts";
import useOrder from "../../../../hooks/useOrder.hook.tsx";
import {OrderEntity, StatusOrder} from "../../../../apis/order.api.ts";
import {dateFormat} from "../../../../utils/date.util.ts";
import {debounce} from "../../../../utils/debounce.tsx";

const OrderResultSearchTable: React.FC = () => {
    const {list_finished, list_handling, list_canceled} = useOrder()
    const [list, setList] = useState<OrderEntity[]>([])
    const [_case, setCase] = useState<string>(StatusOrder.HANDLING)
    const filter = useCallback(debounce((query: string, _case: string) => {
        if (query.length === 0) {
            setList([])
            return
        }
        switch (_case) {
            case StatusOrder.HANDLING: {
                setList(list_handling.filter(i => i.code_order.toLowerCase().includes(query.toLowerCase())))
                break;
            }
            case StatusOrder.FINISHED: {
                setList(list_finished.filter(i => i.code_order.toLowerCase().includes(query.toLowerCase())))
                break;
            }
            case StatusOrder.CANCELED: {
                setList(list_canceled.filter(i => i.code_order.toLowerCase().includes(query.toLowerCase())))
                break
            }
            default: {
                setList([])
            }
        }
    }, 300), [])
    useEffect(() => {
    }, [list]);
    return (
        <div>
            <div className={"px-2 pt-2 md:px-4 md:pt-4 md:flex items-center w-full "}>
                <select
                    className={"w-full md:w-auto font-font2 border outline-none px-2 py-2 rounded shadow-lg font-semibold h-10"}
                    onChange={(e) => setCase(e.target.value)}>
                    <LoopList list={Object.values(StatusOrder)} render={item => {
                        return <option value={item} className={""}>{item}</option>
                    }}/>
                </select>
                <div>
                    <input placeholder={"Search by order code ..."}
                           className={"w-full h-10 border rounded outline-none px-2 py-2 shadow-lg font-semibold"}
                           type="text" onChange={(e) => filter(e.target.value, _case)}/>
                </div>
            </div>
            <h1 className="px-2 pt-2 md:px-4 md:pt-4 text-xl font-font3 font-bold">My orders result</h1>
            <div className="text-gray-900 font-font3">
                <div
                    className="px-3 md:px-4 py-2 max-h-[calc(100vh-12rem)] w-[23.6rem] sm:w-[40rem] md:w-[calc(100vw-300px)] overflow-auto">
                    <table className="w-full text-md bg-white ">
                        <thead className="sticky -top-5">
                        <tr className="border-b bg-orange-600 text-white text-sm">
                            <th className="text-left p-3 px-5">CODE ORDER</th>
                            <th className="text-left p-3 px-5">FOOD ID - FOOD NAME</th>
                            <th className="text-left p-3 px-5">QUANTITY - PAYMENT</th>
                            <th className="text-left p-3 px-5">COMMENT</th>
                            <th className="text-left p-3 px-5">NOTE</th>
                            <th className="text-left p-3 px-5">DELIVER NAME - PHONE NUMBER</th>
                            <th className="text-left p-3 px-5">USER NAME - PHONE NUMBER</th>
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
                                            "border-b hover:bg-orange-400 bg-white hover:text-white cursor-pointer",
                                        )}
                                        onClick={() => {
                                        }}
                                    >
                                        <td className="p-3 px-5">{item.code_order}</td>
                                        <td className="p-3 px-5">{item.food.id}-{item.food.name}</td>
                                        <td className="p-3 px-5">{item.quantity}-{item.total}$</td>
                                        <td className="p-3 px-5">{item.commentEntity?.content ?? "Unknown"}</td>
                                        <td className="p-3 px-5">{item.note}</td>
                                        <td className="p-3 px-5">{item.deliver?.name ?? "Unknown"}-{item.deliver?.phone_number ?? "Unknown"}</td>
                                        <td className="p-3 px-5">{item.user?.first_name} {item.user?.last_name}-{item.user.phone_number}</td>
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

export default OrderResultSearchTable;