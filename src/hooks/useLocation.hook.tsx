import { getAllLocation, LocationEntity } from "../apis/location.api";
import { useEffect, useState } from "react";

export interface IUseLocation {
  list: Array<LocationEntity>;
  loadList: () => Promise<void>;
}
export const useLocation = (): IUseLocation => {
  const [list, setList] = useState<Array<LocationEntity>>([]);
  const loadList = async () => {
    await getAllLocation(
      (res) => {
        setList(res.data);
      },
      (err) => {
        console.error(err);
      }
    );
  };
  useEffect(()=>{
    loadList()
  },[])
  return {
    list: list,
    loadList: loadList,
  };
};
export default useLocation;
