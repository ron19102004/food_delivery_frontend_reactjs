/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, FC } from "react";
import { _useAuth,IUseAuth } from "../hooks/useAuth.hook";
import { UserEntity } from "../apis/auth.api";

export const AuthContext = createContext<IUseAuth>({
  isAuthenticated: false,
  userCurrent: null,
  login: function (_user: UserEntity): void {
    throw new Error("Function not implemented.");
  },
  logout: function (): void {
    throw new Error("Function not implemented.");
  },
  accessToken: null,
  checkAuth: function (_checkSuccessHandler: (userCurrent: UserEntity,token:string) => void, _checkFailHandler: () => void): Promise<void> {
    throw new Error("Function not implemented.");
  }
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={_useAuth()}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
