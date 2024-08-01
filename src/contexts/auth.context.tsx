import { createContext, FC } from "react";
import useAuth, { IUseAuth } from "../hooks/useAuth.hook";

const AuthContext = createContext<IUseAuth>({ isAuthenticated: false });

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
