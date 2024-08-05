/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, FC } from "react";
import { _useRequestRole, IUseRequestRole } from "../hooks/useRequestRole.hook";

export const RequestRoleContext = createContext<IUseRequestRole>({
    roles_request: [],
    loadRolesRequest: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    data_request: {
        handled: [],
        pending: []
    },
    load_data_request: function (_token: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
});
const RequestRoleProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RequestRoleContext.Provider value={_useRequestRole()}>
      {children}
    </RequestRoleContext.Provider>
  );
};

export default RequestRoleProvider;
