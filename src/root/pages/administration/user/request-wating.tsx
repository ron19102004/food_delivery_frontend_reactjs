import React, {useEffect} from "react";
import LoopList from "../../../../components/loop.component";
import {RequestRoleEntity} from "../../../../apis/request-role.api";
import {cn} from "../../../../lib/utils";
import {dateFormat} from "../../../../utils/date.util.ts";

interface IRequestWaitingTable {
    rowSelected: RequestRoleEntity | null;

    setRowSelected(row: RequestRoleEntity): void;

    list: RequestRoleEntity[]
}

const RequestWaitingTable: React.FC<IRequestWaitingTable> = ({
                                                                 rowSelected,
                                                                 setRowSelected,
                                                                 list
                                                             }) => {
    useEffect(() => {
    }, [list]);
    return (
        <div className="text-gray-900 font-font3">
            <div className=" px-3 py-2 max-h-[calc(100vh-30rem)] w-[22rem] sm:w-[40rem] md:w-full overflow-auto">
                <table className="w-full text-md bg-white border">
                    <thead className="sticky -top-5">
                    <tr className="border-b bg-orange-600 text-white">
                        <th className="text-left p-3 px-5">ID</th>
                        <th className="text-left p-3 px-5">STATUS</th>
                        <th className="text-left p-3 px-5">USERNAME</th>
                        <th className="text-left p-3 px-5">EMAIL</th>
                        <th className="text-left p-3 px-5">IS ACCEPTED</th>
                        <th className="text-left p-3 px-5">REQUEST AT</th>
                        <th className="text-left p-3 px-5">ROLE</th>
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
                                    <td className="p-3 px-5">{item.status}</td>
                                    <td className="p-3 px-5">{item.user.username}</td>
                                    <td className="p-3 px-5">{item.user.email}</td>
                                    <td className="p-3 px-5">
                                        {item.is_accepted ? "TRUE" : "FALSE"}
                                    </td>
                                    <td className="p-3 px-5">{dateFormat(item.requested_at)}</td>
                                    <td className="p-3 px-5">{item.role}</td>
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

export default RequestWaitingTable;
