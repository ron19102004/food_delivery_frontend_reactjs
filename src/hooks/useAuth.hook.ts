import { create } from "zustand";

export interface IUseAuth{
    isAuthenticated: boolean
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useAuth = create<IUseAuth>((_set)=>({
    isAuthenticated: false
}))
export default useAuth;