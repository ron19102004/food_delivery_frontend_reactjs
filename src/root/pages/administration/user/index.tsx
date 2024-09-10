import React, {useEffect, useState} from "react";
import useRequestRole from "../../../../hooks/useRequestRole.hook";
import StatusRequestRole from "./status-request-role";
import {HiArrowPath, HiMiniBolt} from "react-icons/hi2";
import useAuth from "../../../../hooks/useAuth.hook";
import {toast} from "react-toastify";
import RequestWaitingTable from "./request-wating";
import RequestHandledTable from "./request-handled";
import {
    RequestRoleEntity,
} from "../../../../apis/request-role.api";
import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";

const UserManagerAdmin: React.FC = () => {
    const {accessToken} = useAuth();
    const {handledList, pendingList, handleRequestRole, reload} = useRequestRole(accessToken ?? "");
    const [rowSelected, setRowSelected] = useState<RequestRoleEntity | null>(
        null
    );
    const {isOpen, onOpen, onClose} = useDisclosure();
    const _handleRequest = async (value: boolean) => {
        if (rowSelected) {
            await handleRequestRole({id_request: rowSelected.id, is_accepted: value, token: accessToken ?? ""})
        }
    };
    useEffect(() => {
        reload()
    }, [handledList,pendingList]);
    return (
        <div>
            <div className="px-2 pt-2 md:pl-4 md:pt-2 flex justify-start items-center space-x-2">
                <button
                    className="border py-2 px-4 bg-green-600 hover:bg-green-800 text-white font-font3 flex items-center space-x-3 rounded-3xl"
                    onClick={async () => {
                        await reload();
                        toast("Reloaded", {
                            delay: 500,
                            type: "info",
                        });
                    }}
                >
                    <HiArrowPath/>
                    <span>Reload</span>
                </button>
                <button
                    className="border py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white font-font3 flex items-center space-x-3 rounded-3xl"
                    onClick={onOpen}
                >
                    <HiMiniBolt/>
                    <span>Handle</span>
                </button>
            </div>
            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                <div>
                    <h1 className="font-font3 font-bold px-2 pt-1 md:px-4 md:pt-2 text-xl ">
                        List request pending
                    </h1>
                    <RequestWaitingTable
                        list={pendingList}
                        rowSelected={rowSelected}
                        setRowSelected={(row) => {
                            setRowSelected(row);
                        }}
                    />
                </div>
                <div>
                    <h1 className="font-font3 font-bold px-2 pt-1 md:px-4 md:pt-2 text-xl ">
                        List request handled
                    </h1>
                    <RequestHandledTable list={handledList}/>
                </div>
            </div>
            {rowSelected ? (
                <div>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader className="text-orange-600 font-font2">
                                Handle [{rowSelected.user.username} - {rowSelected.role}]
                            </ModalHeader>
                            <ModalCloseButton/>
                            <div className="px-6 pb-6">
                                <h1 className="font-font3 font-semibold text-xl text-center">
                                    Do you want to accept role -{" "}
                                    <span className="font-bold text-orange-600 underline">
                    {rowSelected.role}{" "}
                  </span>
                                    for{" "}
                                    <span className="font-bold text-orange-600 underline">
                    {rowSelected.user.username}
                  </span>{" "}
                                    ?
                                </h1>
                                <div
                                    className="flex items-center space-x-2 justify-center pt-2 text-white font-font3 font-semibold text-lg">
                                    <button
                                        className="w-full  py-2 px-1 bg-red-500"
                                        onClick={async () => {
                                            await _handleRequest(false);
                                            onClose()
                                        }}
                                    >
                                        Refuse
                                    </button>
                                    <button
                                        className="w-full  py-2 px-1 bg-green-500"
                                        onClick={async () => {
                                            await _handleRequest(true);
                                            onClose()
                                        }}
                                    >
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </ModalContent>
                    </Modal>
                </div>
            ) : null}
        </div>
    );
};

export default UserManagerAdmin;
