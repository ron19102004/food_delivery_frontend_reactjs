import { create } from "zustand";
import { getMyInfo, UserEntity } from "../apis/auth.api";
import cookie from "cookiejs";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

export interface IUseAuth {
  isAuthenticated: boolean;
  userCurrent: UserEntity | null;
  accessToken: string | null;
  login: (user: UserEntity, accessToken: string) => void;
  logout: () => void;
  checkAuth: (
    checkSuccessHandler: (userCurrent: UserEntity, token: string) => void,
    checkFailHandler: () => void
  ) => Promise<void>;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const _useAuth = create<IUseAuth>((set) => ({
  isAuthenticated: false,
  userCurrent: null,
  accessToken: null,
  login: (user: UserEntity, accessToken: string) => {
    set((state) => ({
      ...state,
      isAuthenticated: true,
      userCurrent: user,
      accessToken: accessToken,
    }));
    cookie.set("accessToken", accessToken, { expires: 5 });
  },
  logout: () => {
    cookie.remove("accessToken");
    set((state) => ({
      ...state,
      isAuthenticated: false,
      userCurrent: null,
      accessToken: null,
    }));
  },
  checkAuth: async (
    checkSuccessHandler: (userCurrent: UserEntity, token: string) => void,
    checkFailHandler: () => void
  ) => {
    const accessToken = cookie.get("accessToken");    
    if (!accessToken) {
      checkFailHandler();
      return;
    }
    await getMyInfo(
      accessToken.toString(),
      (res) => {
        checkSuccessHandler(res.data, accessToken.toString());
      },
      (err) => {
        checkFailHandler();
        cookie.remove("accessToken");
        console.error(err);
      }
    );
  },
}));
export const useAuth = () => useContext(AuthContext)
export default useAuth;
