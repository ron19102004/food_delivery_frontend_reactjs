import React, { useCallback, useEffect, useState } from "react";
import useLocation from "../../../../hooks/useLocation.hook";
// import { getAllLocation } from "../../../../apis/location.api";
import LoopList from "../../../../components/loop.component";
import LocationTable from "./table";
import { LocationEntity } from "../../../../apis/location.api";
import { debounce } from "../../../../utils/debounce";

const cases_filter: string[] = ["Name", "Code"];
const LocationAdminPage: React.FC = () => {
  const [indexFilterCase, setIndexFilterCase] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const { list } = useLocation();
  const [listRender, setListRender] = useState<LocationEntity[]>([]);
  const handleSearch = useCallback(
    debounce((query: string, _case: number) => {     
      switch (_case) {
        case 0:
          setListRender(
            list.filter((item) =>
              item.name.toLowerCase().includes(query?.toLowerCase() ?? "")
            )
          );
          break;
        case 1:
          setListRender(
            list.filter((item) =>
              item.code.toString().includes(query?.toString() ?? "")
            )
          );
          break;
        default:
          setListRender(list);
          break;
      }
    }, 500),
    []
  );
  useEffect(() => {
    setListRender(list);
  }, [list]);
  return (
    <div>
      <div className="px-2 pt-2 md:px-4 md:pt-4 md:flex items-center md:space-x-4 space-y-2 md:space-y-0">
        <div className="border flex md:inline-flex justify-center items-center h-10 border-orange-600 md:border-neutral-300">
          <h1 className="font-font3 text-md lg:text-lg px-3 ">
            Totals : <span className="font-bold">{list.length}</span>{" "}
            {list.length > 1 ? "items" : "item"}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <select
            value={indexFilterCase}
            className="outline-none px-1 py-2 border-y border-l h-10 font-font2 border-orange-600 md:border-neutral-300"
            onChange={(e) => {
              setIndexFilterCase(parseInt(e.target.value));
            }}
          >
            <LoopList
              list={cases_filter}
              render={(item: string, index: number) => {
                return <option value={index}>{item}</option>;
              }}
            />
          </select>
          <input
            value={searchValue}
            required
            type="text"
            className="border px-3 py-2 outline-none h-10 w-full border-orange-600 md:border-neutral-300"
            placeholder="Search..."
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleSearch(e.target.value, indexFilterCase);
            }}
          />
        </div>
      </div>
      <div className="pt-2 h-96">
        <LocationTable
          list={listRender}
        />
      </div>
    </div>
  );
};

export default LocationAdminPage;
