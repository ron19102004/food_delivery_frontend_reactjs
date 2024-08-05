import React, { useEffect, useState } from "react";
import useRequestRole from "../../../../hooks/useRequestRole.hook";
import LoopList from "../../../../components/loop.component";
import { RequestRoleEntity } from "../../../../apis/request-role.api";
import { cn } from "../../../../lib/utils";
interface IRequestWaitingTable {
  rowSelected: RequestRoleEntity | null;
  setRowSelected(row: RequestRoleEntity): void;
}
const RequestWaitingTable: React.FC<IRequestWaitingTable> = ({
  rowSelected,
  setRowSelected,
}) => {
  const [list, setList] = useState<Array<RequestRoleEntity>>([]);
  const { data_request } = useRequestRole();
  useEffect(() => {
    setList(data_request.pending);
  }, [data_request]);
  return (
    <div className="text-gray-900 font-font3">
      <div className=" px-3 py-2 max-h-[calc(100vh-35rem)] w-[23.6rem] sm:w-[40rem] md:w-full overflow-auto">
        <table className="w-full text-md bg-white rounded">
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
                      "border-b hover:bg-orange-400 bg-neutral-50 hover:text-white cursor-pointer",
                      {
                        "bg-orange-500 text-white font-bold text-lg":
                          rowSelected?.id === item.id,
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
                    <td className="p-3 px-5">{item.requested_at}</td>
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
