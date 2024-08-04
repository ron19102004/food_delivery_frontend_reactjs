/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, FC } from "react";
import { _useLocation, IUseLocation } from "../hooks/useLocation.hook";
import { LocationEntity } from "../apis/location.api";

export const LocationContext = createContext<IUseLocation>({
  list: [],
  setList: function (_list: Array<LocationEntity>): void {
    throw new Error("Function not implemented.");
  },
});
const LocationProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LocationContext.Provider value={_useLocation()}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
