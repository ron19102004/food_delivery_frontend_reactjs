import React, {useState} from 'react';
import LoopList from "../../../../components/loop.component.tsx";
import {cn} from "../../../../lib/utils.ts";
import useOrder from "../../../../hooks/useOrder.hook.tsx";
import {OrderEntity} from "../../../../apis/order.api.ts";
import {HiXMark} from "react-icons/hi2";
import {Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import {toast} from "react-toastify";
import {dateFormat} from "../../../../utils/date.util.ts";

const OrderHandlingTable: React.FC = () => {
    const {list_handling: list, cancelOrder} = useOrder()
    const [rowSelected, setRowSelected] = useState<OrderEntity>()
    const [reason, setReason] = useState<string | null>(null)
    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();
    const cancelClick = async () => {
        if (!reason || reason.length < 10) {
            toast("Reason is not less than 10 characters ", {
                type: "warning"
            });
            return;
        }
        await cancelOrder(rowSelected?.id ?? 0, reason, toast);
    }
    return (
        <div>
            <div className="px-2 pt-2 md:px-4 font-font3 font-semibold flex justify-start items-center space-x-2">
                <button
                    onClick={onOpen}
                    className="w-full md:w-auto border border-red-500 h-10 px-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl flex justify-center items-center "
                >
                    <HiXMark/>
                    <span>Cancel</span>
                </button>
            </div>
            <div className="text-gray-900 font-font3">
                <div
                    className="px-3 md:px-4 py-2 max-h-[calc(100vh-12rem)] w-[22rem] sm:w-[40rem] md:w-[calc(100vw-300px)] overflow-auto">
                    <table className="w-full text-md bg-white ">
                        <thead className="sticky -top-5">
                        <tr className="border-b bg-orange-600 text-white text-sm">
                            <th className="text-left p-3 px-5">CODE ORDER</th>
                            <th className="text-left p-3 px-5">FOOD ID</th>
                            <th className="text-left p-3 px-5">FOOD NAME</th>
                            <th className="text-left p-3 px-5">QUANTITY</th>
                            <th className="text-left p-3 px-5">PAYMENT</th>
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
                                            "border-b hover:bg-blue-200 bg-white cursor-pointer",
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
                                        <td className="p-3 px-5">{item.quantity}</td>
                                        <td className="p-3 px-5">{item.total}$</td>
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
            {rowSelected ? (
                <div>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader className="text-orange-600 font-font2">
                                Cancel
                            </ModalHeader>
                            <ModalCloseButton/>
                            <div className={"px-4 pb-2"}>
                                <h1 className={"font-font3 font-semibold text-lg"}>Reason</h1>
                                <textarea
                                    className={"font-font3  w-full min-h-32 max-h-44 border outline-none p-3 rounded"}
                                    value={reason ?? ""}
                                    onChange={event => setReason(event.target.value)}></textarea>
                                <div className={"flex justify-center items-center"}>
                                    <button onClick={cancelClick}
                                            className={"border px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-font2 rounded-3xl"}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </ModalContent>
                    </Modal>
                </div>
            ) : null}
        </div>
    );
};

export default OrderHandlingTable;