import { create } from "zustand";
import {
  getAllRequestRole,
  getRolesToRequest,
  RequestRoleEntity,
} from "../apis/request-role.api";
import { useContext } from "react";
import { RequestRoleContext } from "../contexts/request-role.context";

export interface IUseRequestRole {
  roles_request: Array<string>;
  loadRolesRequest(): Promise<void>;
  data_request: {
    handled: Array<RequestRoleEntity>;
    pending: Array<RequestRoleEntity>;
  };
  load_data_request(token: string): Promise<void>;
}
export const _useRequestRole = create<IUseRequestRole>((set) => ({
  roles_request: [],
  data_request: {
    handled: [],
    pending: [],
  },
  loadRolesRequest: async () => {
    await getRolesToRequest(
      (res) => {
        set((state) => ({ ...state, roles_request: res }));
      },
      (err) => {
        console.error(err);
      }
    );
  },
  load_data_request: async (token: string) => {
    await getAllRequestRole(
      { token: token },
      (res) => {
        if (res.status) {
          set((state) => ({
            ...state,
            data_request: {
              handled: res.data.handled,
              pending: res.data.waiting,
            },
          }));
        }
      },
      (err) => {
        console.error(err);
      }
    );
  },
}));
const useRequestRole = () => useContext(RequestRoleContext);
export default useRequestRole;
