import React, { useEffect } from "react";
import LoopList from "../../../../components/loop.component";
import { CategoryEntity } from "../../../../apis/category.api";
import { cn } from "../../../../lib/utils";
import { ITableProps } from "../../../../interfaces/props.table";
import {dateFormat} from "../../../../utils/date.util.ts";
interface ICateTable extends ITableProps<CategoryEntity> {}
const CategoryTable: React.FC<ICateTable> = ({
  list,
  rowSelected,
  setRowSelected,
}) => {
  useEffect(() => {}, [list, rowSelected]);
  return (
    <div className="text-gray-900 font-font3">
      <div className=" px-3 py-2 max-h-[calc(100vh-12rem)] w-[23.6rem] sm:w-[40rem] md:w-full overflow-auto">
        <table className="w-full text-md bg-white rounded">
          <thead className="sticky -top-5">
            <tr className="border-b bg-orange-600 text-white">
              <th className="text-left p-3 px-5">ID</th>
              <th className="text-left p-3 px-5">NAME</th>
              <th className="text-left p-3 px-5">IMAGE</th>
              <th className="text-left p-3 px-5">CREATE AT</th>
              <th className="text-left p-3 px-5">UPDATE AT</th>
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
                    <td className="p-3 px-5">{item.name}</td>
                    <td className="p-3 px-5">
                      <a
                        href={item.image}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={item.image}
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </a>
                    </td>
                    <td className="p-3 px-5">{dateFormat(item.createdAt)}</td>
                    <td className="p-3 px-5">{dateFormat(item.updatedAt)}</td>
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

export default CategoryTable;
