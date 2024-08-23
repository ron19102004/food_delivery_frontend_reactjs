import React, { useEffect } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { ClassValue } from "clsx";
import { cn } from "../../../../lib/utils";
import {RequestRoleEntity} from "../../../../apis/request-role.api.ts";
interface IStatusRequestRole{
    className?:ClassValue,
  listHandled: RequestRoleEntity[],
  listWaiting: RequestRoleEntity[]
}
const StatusRequestRole: React.FC<IStatusRequestRole> = ({className,listHandled,listWaiting}) => {
  useEffect(() => {}, [listHandled,listWaiting]);
 return (
    <div className={cn("text-sm px-2 pt-2 md:px-4 md:pt-4 flex items-center justify-center md:justify-start space-x-2",className)}>
      <div className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto bg-white shadow-lg ">
        <h1 className="font-font2">Waiting </h1>
        <HiArrowLongRight className="text-orange-600" />
        <h1>
          <span className="font-bold font-font3">
            {listWaiting.length}
          </span>{" "}
          {listWaiting.length > 1 ? "users" : "user"}
        </h1>
      </div>
      <div className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto bg-white shadow-lg ">
        <h1 className="font-font2">Handled </h1>
        <HiArrowLongRight className="text-orange-600" />
        <h1>
          <span className="font-bold font-font3">
            {listHandled.length}
          </span>
          {listHandled.length > 1 ? "users" : "user"}
        </h1>
      </div>
    </div>
  );
};

export default StatusRequestRole;
