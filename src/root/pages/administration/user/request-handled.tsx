import React, { useEffect } from "react";
import LoopList from "../../../../components/loop.component";
import { RequestRoleEntity } from "../../../../apis/request-role.api";
import { cn } from "../../../../lib/utils";
import {dateFormat} from "../../../../utils/date.util.ts";

const RequestHandledTable: React.FC<{list: RequestRoleEntity[]}> = ({list}) => {
  useEffect(() => {
  }, [list]);
  return (
    <div className="text-gray-900 font-font3">
      <div className=" px-3 py-4 max-h-[calc(100vh-30rem)] w-[23.6rem] sm:w-[40rem] md:w-full overflow-auto">
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
                      "border-b hover:bg-orange-400 bg-neutral-50 hover:text-white cursor-pointer"
                    )}
                    onClick={() => {}}
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

export default RequestHandledTable;
