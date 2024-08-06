import React, { useEffect } from "react";
import useRequestRole from "../../../../hooks/useRequestRole.hook";
import { HiArrowLongRight } from "react-icons/hi2";
import { ClassValue } from "clsx";
import { cn } from "../../../../lib/utils";
interface IStatusRequestRole{
className?:ClassValue
}
const StatusRequestRole: React.FC<IStatusRequestRole> = ({className}) => {
  const { data_request } = useRequestRole();
  useEffect(() => {}, [data_request]);
  return (
    <div className={cn("px-2 pt-2 md:px-4 md:pt-4 flex items-center justify-center md:justify-start space-x-2",className)}>
      <div className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto bg-white shadow-lg rounded">
        <h1 className="font-font2">Waiting </h1>
        <HiArrowLongRight className="text-orange-600" />
        <h1>
          <span className="font-bold font-font3">
            {data_request.pending.length}
          </span>{" "}
          {data_request.pending.length > 1 ? "users" : "user"}
        </h1>
      </div>
      <div className="inline-flex items-center justify-center space-x-2 border px-2 md:px-4 py-2 w-full md:w-auto bg-white shadow-lg rounded">
        <h1 className="font-font2">Handled </h1>
        <HiArrowLongRight className="text-orange-600" />
        <h1>
          <span className="font-bold font-font3">
            {data_request.handled.length}
          </span>
          {data_request.pending.length > 1 ? "users" : "user"}
        </h1>
      </div>
    </div>
  );
};

export default StatusRequestRole;
