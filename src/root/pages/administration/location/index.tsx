/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from "react";
import useLocation from "../../../../hooks/useLocation.hook";
import LoopList from "../../../../components/loop.component";
import LocationTable from "./table";
import {deletedLocation, LocationEntity} from "../../../../apis/location.api";
import {debounce} from "../../../../utils/debounce";
import CreateLocationForm from "./create-location";
import {
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
} from "@chakra-ui/react";
import {
    HiMiniPlus,
    HiArrowPath,
    HiArchiveBoxXMark,
    HiMiniPencilSquare,
} from "react-icons/hi2";
import {toast} from "react-toastify";
import useAuth from "../../../../hooks/useAuth.hook";
import EditLocationForm from "./update-location";
import useList from "../../../../hooks/useList.hook";

const cases_filter: string[] = ["Name", "Code"];
const LocationAdminPage: React.FC = () => {
    const {accessToken} = useAuth();
    const [indexFilterCase, setIndexFilterCase] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const {list: _list, loadList} = useLocation();
    const [listRender, setListRender] = useState<LocationEntity[]>([]);
    const {list, setList, removeItem, updateItem, addItem} =
        useList<LocationEntity>();
    const {
        isOpen: isOpenCreate,
        onOpen: onOpenCreate,
        onClose: onCloseCreate,
    } = useDisclosure();
    const {
        isOpen: isOpenEdit,
        onOpen: onOpenEdit,
        onClose: onCloseEdit,
    } = useDisclosure();
    //for table
    const [rowSelected, setRowSelected] = useState<LocationEntity | null>(null);

    const handleSearch = useCallback(
        debounce((query: string, _case: number) => {
            switch (_case) {
                case 0:
                    setListRender(
                        list.filter((item) =>
                            item.name.toLowerCase().includes(query?.toLowerCase() ?? "")
                        )
                    );
                    break;
                case 1:
                    setListRender(
                        list.filter((item) =>
                            item.code.toLowerCase().includes(query?.toLowerCase() ?? "")
                        )
                    );
                    break;
                default:
                    setListRender(list);
                    break;
            }
        }, 500),
        []
    );
    const _deleteLocation = async () => {
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
        await deletedLocation(
            {token: accessToken ?? "", id: rowSelected.id},
            async (res) => {
                if (res.status) {
                    toast(res.message, {
                        type: "success",
                    });
                    removeItem(rowSelected);
                }
            },
            (err) => {
                const res = err.response.data;
                toast(res.message ?? "Undefined error", {
                    type: "error",
                });
            }
        );
    };
    useEffect(() => {
        setList(_list);
        setListRender(list);
    }, [_list]);
    useEffect(() => {
        setListRender(list);
    }, [list]);
    return (
        <div>
            <div className="px-2 pt-2 md:px-4 md:pt-4 md:flex items-center md:space-x-4 space-y-2 md:space-y-0">
                <div
                    className="border flex md:inline-flex justify-center items-center h-10 border-neutral-300 bg-white shadow-lg rounded-lg">
                    <h1 className="font-font3 text-md lg:text-lg px-3 ">
                        Totals : <span className="font-bold">{list.length}</span>{" "}
                        {list.length > 1 ? "items" : "item"}
                    </h1>
                </div>
                <div className="flex justify-center items-center w-full md:w-auto">
                    <select
                        value={indexFilterCase}
                        className="outline-none px-1 py-2 border-y border-l h-10 font-font2 border-neutral-300"
                        onChange={(e) => {
                            setIndexFilterCase(parseInt(e.target.value));
                        }}
                    >
                        <LoopList
                            list={cases_filter}
                            render={(item: string, index: number) => {
                                return <option value={index}>{item}</option>;
                            }}
                        />
                    </select>
                    <input
                        value={searchValue}
                        required
                        type="text"
                        className="border px-3 py-2 outline-none h-10 w-full border-neutral-300"
                        placeholder="Search..."
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            console.log()
                            handleSearch(e.target.value, indexFilterCase);
                        }}
                    />
                </div>
            </div>
            <div className="px-2 pt-2 md:px-4 font-font3 font-semibold flex justify-start items-center space-x-1 md:space-x-2">
                <div className={"md:flex md:space-x-2 w-full md:w-auto space-y-1 md:space-y-0"}>
                    <button
                        className="w-full border border-neutral-800 h-10 px-3 bg-neutral-800 hover:bg-neutral-900 text-white rounded-3xl flex justify-center items-center space-x-1"
                        onClick={async () => {
                            await loadList();
                            toast("Reloaded", {
                                type: "info",
                            });
                        }}
                    >
                        <HiArrowPath/>
                        <span>Reload</span>
                    </button>
                    <button
                        className="w-full border border-green-500 h-10 px-3 bg-green-500 hover:bg-green-600 text-white rounded-3xl flex justify-center items-center space-x-1"
                        onClick={onOpenCreate}
                    >
                        <HiMiniPlus/>
                        <span>Create</span>
                    </button>
                </div>
                <div className={"md:flex md:space-x-2  w-full md:w-auto space-y-1 md:space-y-0"}>
                    <button
                        onClick={onOpenEdit}
                        className="w-full border border-yellow-500 h-10 px-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-3xl flex justify-center items-center space-x-1"
                    >
                        <HiMiniPencilSquare/>
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={_deleteLocation}
                        className="w-full border border-red-500 h-10 px-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl flex justify-center items-center space-x-1"
                    >
                        <HiArchiveBoxXMark/>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
            <div className="pt-2">
                <LocationTable
                    list={listRender}
                    rowSelected={rowSelected}
                    setRowSelected={(row) => {
                        setRowSelected(row);
                    }}
                />
            </div>
            <div>
                <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader className="text-orange-600 font-font2">
                            New a location
                        </ModalHeader>
                        <ModalCloseButton/>
                        <CreateLocationForm onClose={onCloseCreate} addItem={addItem}/>
                    </ModalContent>
                </Modal>
            </div>
            {rowSelected ? (
                <div>
                    <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader className="text-orange-600 font-font2">
                                Edit {rowSelected.name}-{rowSelected.code}
                            </ModalHeader>
                            <ModalCloseButton/>
                            <EditLocationForm
                                onClose={onCloseEdit}
                                item={rowSelected}
                                updateItem={updateItem}
                            />
                        </ModalContent>
                    </Modal>
                </div>
            ) : null}
        </div>
    );
};

export default LocationAdminPage;
