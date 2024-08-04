import { create } from "zustand";
import { LocationEntity } from "../apis/location.api";
import { useContext } from "react";
import { LocationContext } from "../contexts/location.context";

export interface IUseLocation {
  list: Array<LocationEntity>;
  setList: (list: Array<LocationEntity>) => void;
}
export const _useLocation = create<IUseLocation>((set) => ({
  list: [],
  setList: (list) => set((state) => ({ ...state, list: list })),
}));
const useLocation = () => useContext(LocationContext);
export default useLocation;
