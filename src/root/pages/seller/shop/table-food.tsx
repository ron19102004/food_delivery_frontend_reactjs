import React, { useEffect } from "react";
import LoopList from "../../../../components/loop.component";
import { cn } from "../../../../lib/utils";
import { FoodEntity } from "../../../../apis/food.api";
import { ITableProps } from "../../../../interfaces/props.table";
import {dateFormat} from "../../../../utils/date.util.ts";
interface IFoodTable extends ITableProps<FoodEntity> {}
const FoodTable: React.FC<IFoodTable> = ({
  list,
  rowSelected,
  setRowSelected,
}) => {
  useEffect(() => {}, [list, rowSelected]);
  return (
    <div className="text-gray-900 font-font3">
      <div className=" px-3 py-2 max-h-[calc(100vh-12rem)] w-[23.6rem] sm:w-[40rem] md:w-[calc(100vw-300px)] overflow-auto">
        <table className="w-full text-md bg-white ">
          <thead className="sticky -top-5">
            <tr className="border-b bg-orange-600 text-white text-sm">
              <th className="text-left p-3 px-5">ID</th>
              <th className="text-left p-3 px-5">CATEGORY ID - NAME</th>
              <th className="text-left p-3 px-5">NAME</th>
              <th className="text-left p-3 px-5">PRICE($)</th>
              <th className="text-left p-3 px-5">SALE PRICE($)</th>
              <th className="text-left p-3 px-5">SALE OFF(%)</th>
              <th className="text-left p-3 px-5">SOLD</th>
              <th className="text-left p-3 px-5">POSTER</th>
              <th className="text-left p-3 px-5">DESCRIPTION</th>
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
                      {
                        "bg-orange-500 text-white font-semibold":
                          rowSelected?.id === item.id,
                      }
                    )}
                    onClick={() => {
                      setRowSelected(item);
                    }}
                  >
                    <td className="p-3 px-5">{item.id}</td>
                    <td className="p-3 px-5">
                      {item.category.id} - {item.category.name}
                    </td>
                    <td className="p-3 px-5">{item.name}</td>
                    <td className="p-3 px-5">{item.price}$</td>
                    <td className="p-3 px-5">{item.sale_price}$</td>
                    <td className="p-3 px-5">{item.sale_off}%</td>
                    <td className="p-3 px-5">{item.sold}</td>
                    <td className="p-3 px-5">
                      <a
                        href={item.poster}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={item.poster}
                          alt={`poster-${item.name}`}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                      </a>
                    </td>
                    <td className="p-3 px-5">
                      <textarea
                        disabled
                        className="min-h-40 min-w-80 max-w-80 text-black outline-none px-2 py-1 rounded disabled:bg-white"
                        value={item.description}
                      ></textarea>
                    </td>
                    <td className="p-3 px-5">{dateFormat(item.createdAt)}</td>
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

export default FoodTable;
