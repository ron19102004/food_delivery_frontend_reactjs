import React, {useEffect} from "react";
import LoopList from "../../../../components/loop.component";
import {cn} from "../../../../lib/utils";
import {ITableProps} from "../../../../interfaces/props.table";
import {VoucherEntity} from "../../../../apis/voucher.api.ts";
import {dateFormat} from "../../../../utils/date.util.ts";

interface IVoucherTable extends ITableProps<VoucherEntity> {
}

const VoucherTable: React.FC<IVoucherTable> = ({
                                                   list,
                                                   rowSelected,
                                                   setRowSelected,
                                               }) => {
    useEffect(() => {
    }, [list, rowSelected]);
    return (
        <div className="text-gray-900 font-font3">
            <div
                className=" px-3 py-2 max-h-[calc(100vh-12rem)] w-[22rem] sm:w-[40rem] md:w-[calc(100vw-300px)] overflow-auto">
                <table className="w-full text-md bg-white ">
                    <thead className="sticky -top-5">
                    <tr className="border-b bg-orange-600 text-white text-sm">
                        <th className="text-left p-3 px-5">ID</th>
                        <th className="text-left p-3 px-5">CODE</th>
                        <th className="text-left p-3 px-5">NAME</th>
                        <th className="text-left p-3 px-5">PERCENT</th>
                        <th className="text-left p-3 px-5">QUANTITY</th>
                        <th className="text-left p-3 px-5">QUANTITY CURRENT</th>
                        <th className="text-left p-3 px-5">ISSUED AT</th>
                        <th className="text-left p-3 px-5">EXPIRED AT</th>
                        <th className="text-left p-3 px-5">FOR CATEGORY ID - NAME</th>
                    </tr>
                    </thead>
                    <tbody>
                    <LoopList
                        list={list}
                        render={(item) => {
                            return (
                                <tr
                                    className={cn(
                                        "border-b bg-white cursor-pointer",
                                        {
                                            "bg-blue-500 text-white font-semibold":
                                                rowSelected?.id === item.id,
                                            " hover:bg-blue-200 text-black": rowSelected?.id !== item.id,
                                        }
                                    )}
                                    onClick={() => {
                                        setRowSelected(item);
                                    }}
                                >
                                    <td className="p-3 px-5">{item.id}</td>
                                    <td className="p-3 px-5">{item.code}</td>
                                    <td className="p-3 px-5">{item.name}</td>
                                    <td className="p-3 px-5">{item.percent}</td>
                                    <td className="p-3 px-5">{item.quantity}</td>
                                    <td className="p-3 px-5">{item.quantity_current}</td>
                                    <td className="p-3 px-5">{dateFormat(item.issued_at)}</td>
                                    <td className="p-3 px-5">{dateFormat(item.expired_at)}</td>
                                    <td className="p-3 px-5">{item.category.id} - {item.category.name}</td>
                                </tr>
                            );
                        }}
                    />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VoucherTable;
