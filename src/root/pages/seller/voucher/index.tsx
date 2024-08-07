import React, {useState} from 'react';
import VoucherStatus from "./voucher-status.tsx";
import {toast} from "react-toastify";
import {
    HiArchiveBoxXMark,
    HiArrowPathRoundedSquare,
    HiMiniPlus
} from "react-icons/hi2";
import useVoucher from "../../../../hooks/useVoucher.hook.tsx";
import {VoucherEntity} from "../../../../apis/voucher.api.ts";
import VoucherTable from "./voucher-table.tsx";
import {Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import CreateVoucherForm from "./create-voucher.tsx";
import useAuth from "../../../../hooks/useAuth.hook.tsx";

const VoucherManagerPage: React.FC = () => {
    const {accessToken} = useAuth()
    const {loadList, list, hide} = useVoucher()
    const [rowSelected, setRowSelected] = useState<VoucherEntity | null>(null);
    const {
        isOpen: isOpenCreateVoucher,
        onOpen: onOpenCreateVoucher,
        onClose: onCloseCreateVoucher,
    } = useDisclosure();
    return (
        <div>
            <div>
                <div className={"px-2 pt-2 md:px-4 md:pt-4 flex items-center space-x-2"}>
                    <h1 className=" text-xl font-font3 font-bold w-full md:w-auto">My vouchers</h1>
                    <button onClick={async () => {
                        await loadList(toast)
                    }}
                            className={"px-4 py-2 shadow bg-neutral-200 hover:bg-orange-500 hover:text-white transition-all rounded-3xl font-font2 flex items-center space-x-1 "}>
                        <HiArrowPathRoundedSquare/>
                        <span>Reload</span>
                    </button>
                </div>
                <VoucherStatus/>
                <div
                    className="px-2 pt-2 md:px-4 font-font3 font-semibold flex justify-start items-center space-x-2">
                    <button
                        className="w-full md:w-auto  border border-green-500 h-10 px-3 bg-green-500 hover:bg-green-600 text-white rounded-3xl flex justify-center items-center"
                        onClick={onOpenCreateVoucher}
                    >
                        <HiMiniPlus/>
                        <span>Create</span>
                    </button>
                    <button
                        onClick={async () => {
                            if (rowSelected) {
                                const isDelete = confirm(
                                    `Delete ${rowSelected.name}-${rowSelected.code} ?`
                                );
                                if (!isDelete) {
                                    return;
                                }
                            } else {
                                toast("Please select a location to delete", {
                                    type: "warning",
                                });
                                return;
                            }
                            await hide(rowSelected.id, accessToken ?? "", toast)
                        }}
                        className="w-full md:w-auto border border-red-500 h-10 px-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl flex justify-center items-center "
                    >
                        <HiArchiveBoxXMark/>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <div>
                <VoucherTable list={list} setRowSelected={setRowSelected} rowSelected={rowSelected}/>
            </div>
            <div>
                <Modal isOpen={isOpenCreateVoucher} onClose={onCloseCreateVoucher}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader className="text-orange-600 font-font2">
                            New a voucher
                        </ModalHeader>
                        <ModalCloseButton/>
                        <CreateVoucherForm onClose={onCloseCreateVoucher}/>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
};

export default VoucherManagerPage;