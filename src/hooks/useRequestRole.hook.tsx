import {
    getAllRequestRole, handleRequestRole,
    RequestRoleEntity,
} from "../apis/request-role.api";
import useList from "./useList.hook.tsx";
import {toast} from "react-toastify";

export interface IUseRequestRole {
    handledList: Array<RequestRoleEntity>;
    pendingList: Array<RequestRoleEntity>;

    reload(): Promise<void>;

    handleRequestRole(data: {
        id_request: number,
        is_accepted: boolean,
        token: string,
    }): Promise<void>;
}

const useRequestRole = (token: string): IUseRequestRole => {
    const {
        list: handledList,
        setList: setHandledList,
        removeItemById: handledRemove,
        findById: handledFind
    } = useList<RequestRoleEntity>([]);
    const {list: waitingList, setList: setWaitingList, addItem: waitingAdd} = useList<RequestRoleEntity>([]);
    const reload = async () => {
        await getAllRequestRole(
            {token: token},
            (res) => {
                if (res.status) {
                    setHandledList(res.data.handled);
                    setWaitingList(res.data.waiting)
                }
            },
            (err) => {
                console.error(err);
            }
        );
    }
    const _handleRequestRole = async (data: {
        id_request: number,
        is_accepted: boolean,
        token: string,
    }) => {
        await handleRequestRole(data,
            async (res) => {
                if (res.status) {
                    toast(res.message, {
                        type: "success",
                    });
                    const request = handledFind(data.id_request);
                    if (request == null) return;
                    request.is_accepted = data.is_accepted;
                    waitingAdd(request);
                    handledRemove(data.id_request);
                    return;
                }
                toast(res.message ?? "Undefined error", {
                    type: "error",
                });
            },
            (err) => {
                console.log(err)
                toast("Undefined error", {
                    type: "error",
                });
            }
        );
    }
    return {
        handledList: handledList,
        pendingList: waitingList,
        reload: reload,
        handleRequestRole: _handleRequestRole
    }
}
export default useRequestRole;
