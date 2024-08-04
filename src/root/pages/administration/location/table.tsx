import React, { useEffect } from "react";
import LoopList from "../../../../components/loop.component";
import {
  deletedLocation,
  getAllLocation,
  LocationEntity,
} from "../../../../apis/location.api";
import useAuth from "../../../../hooks/useAuth.hook";
import { toast } from "react-toastify";
import useLocation from "../../../../hooks/useLocation.hook";
interface ILocationTable {
  list: Array<LocationEntity>;
}
const LocationTable: React.FC<ILocationTable> = ({ list }) => {
  const { accessToken } = useAuth();
  const { setList } = useLocation();
  const loadListLocation = async () => {
    await getAllLocation(
      (res) => {
        setList(res.data);
      },
      (err) => {
        console.error(err);
      }
    );
  };
  const _deleteLocation = async (id: number) => {
    await deletedLocation(
      { token: accessToken ?? "", id },
      async (res) => {        
        if (res.status === true) {
          toast(res.message, {
            type: "success",
          });
          await loadListLocation();
        }
      },
      (err) => {
        const res = err.response.data;
        toast(res.message ?? "Undefined error", {
          type: "error",
        });
      }
    );
  };
  useEffect(() => {}, [list]);
  return (
    <div className="text-gray-900 font-font3">
      <div className=" px-3 py-4 h-[calc(100vh-10rem)] w-96 sm:w-[40rem] md:w-full overflow-auto">
        <table className="w-full text-md bg-white rounded">
          <thead className="sticky -top-5">
            <tr className="border-b bg-orange-600">
              <th className="text-left p-3 px-5">ID</th>
              <th className="text-left p-3 px-5">NAME</th>
              <th className="text-left p-3 px-5">CODE</th>
              <th className="text-left p-3 px-5">CREATE AT</th>
              <th className="text-left p-3 px-5">UPDATE AT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <LoopList
              list={list}
              render={(item) => {
                return (
                  <tr className="border-b hover:bg-orange-500 bg-neutral-50 hover:text-white">
                    <td className="p-3 px-5">{item.id}</td>
                    <td className="p-3 px-5">{item.name}</td>
                    <td className="p-3 px-5">{item.code}</td>
                    <td className="p-3 px-5">{item.createdAt}</td>
                    <td className="p-3 px-5">{item.updatedAt}</td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        onClick={() => {
                          const isDelete = confirm(
                            `Delete ${item.name}-${item.code} ?`
                          );
                          if (isDelete) {
                            _deleteLocation(item.id);
                          }
                        }}
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Delete
                      </button>
                    </td>
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

export default LocationTable;
