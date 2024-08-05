import { create } from "zustand";
import { getAllLocation, LocationEntity } from "../apis/location.api";
import { useContext } from "react";
import { LocationContext } from "../contexts/location.context";

export interface IUseLocation {
  list: Array<LocationEntity>;
  loadList: () => Promise<void>;
}
export const _useLocation = create<IUseLocation>((set) => ({
  list: [],
  loadList: async () => {
    await getAllLocation(
      (res) => {
        set((state) => ({ ...state, list: res.data }));
      },
      (err) => {
        console.error(err);
      }
    );
  },
}));
const useLocation = () => useContext(LocationContext);
export default useLocation;
