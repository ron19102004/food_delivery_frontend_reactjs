import React, { useEffect, useState } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import CreateFoodForm from "./create-food";
import useList from "../../../../hooks/useList.hook";
import {
  deleteFoodById,
  FoodEntity,
  getFoodsBySellerUsername,
} from "../../../../apis/food.api";
import useAuth from "../../../../hooks/useAuth.hook";
import FoodTable from "./table-food";
import {
  HiArrowPath,
  HiMiniPlus,
  HiArchiveBoxXMark,
  HiMiniPencilSquare,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import EditFoodForm from "./update-food";
import useCategory from "../../../../hooks/useCategory.hook";
import LoopList from "../../../../components/loop.component";
const ShopSellerPage: React.FC = () => {
  const { list: categories } = useCategory();
  const { userCurrent, accessToken } = useAuth();
  const { list, addItem, removeItem, setList, updateItem } =
    useList<FoodEntity>();
  const [listRender, setListRender] = useState<FoodEntity[]>([]);
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
  const [rowSelected, setRowSelected] = useState<FoodEntity | null>(null);
  const initialize = async () => {
    await getFoodsBySellerUsername(
      {
        seller_name: userCurrent?.username ?? "",
      },
      (res) => {
        if (res.status) {
          setList(res.data);
          setListRender(res.data);
        }
      },
      (err) => {
        console.error(err);
      }
    );
  };
  useEffect(() => {
    initialize();
  }, [0]);
  useEffect(() => {
    setListRender(list);
  }, [list]);
  const handleDelete = async () => {
    if (rowSelected) {
      const isDelete = confirm(`Delete ${rowSelected.name} ?`);
      if (!isDelete) {
        return;
      }
    } else {
      toast("Please select a location to delete", {
        type: "warning",
      });
      return;
    }
    await deleteFoodById(
      {
        food_id: rowSelected.id,
        token: accessToken ?? "",
      },
      async (res) => {
        if (res.status === true) {
          toast(res.message, {
            type: "success",
          });
          removeItem(rowSelected);
        } else {
          toast(res.message ?? "Undefined error", {
            type: "error",
          });
        }
      },
      (err) => {
        toast(err.response.data.message ?? "Undefined error", {
          type: "error",
        });
      }
    );
  };
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="px-2 pt-2 md:px-4 font-font3 font-semibold flex justify-start items-center space-x-2">
          <button
            className="w-full md:w-auto border border-neutral-800 h-10 px-3 bg-neutral-800 hover:bg-neutral-900 text-white rounded-3xl flex justify-center items-center"
            onClick={async () => {
              await initialize();
              toast("Reloaded", {
                type: "info",
              });
            }}
          >
            <HiArrowPath />
            <span>Reload</span>
          </button>
          <button
            className="w-full md:w-auto  border border-green-500 h-10 px-3 bg-green-500 hover:bg-green-600 text-white rounded-3xl flex justify-center items-center"
            onClick={onOpenCreate}
          >
            <HiMiniPlus />
            <span>Create</span>
          </button>
          <button
            onClick={onOpenEdit}
            className="w-full md:w-auto  border border-yellow-500 h-10 px-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-3xl flex justify-center items-center"
          >
            <HiMiniPencilSquare />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="w-full md:w-auto border border-red-500 h-10 px-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl flex justify-center items-center "
          >
            <HiArchiveBoxXMark />
            <span>Delete</span>
          </button>
        </div>
        <div className="px-2 pt-2 md:px-4 font-font3 font-semibold flex justify-start items-center space-x-2 w-full md:w-auto">
          <h1 className="font-font3 font-bold">Filter</h1>
          <select
            className="border h-10 outline-none rounded w-full md:w-auto"
            onChange={(e) => {
              const value = e.target.value.toString();
              if (value === "0") {
                setListRender(list);
                return;
              }
              setListRender(
                list.filter((item) => item.category.id.toString() === value)
              );
            }}
          >
            <option value={0}>Default</option>
            <LoopList
              list={categories}
              render={(item) => {
                return <option className="font-font3 p-4" value={item.id}>{item.name}</option>;
              }}
            />
          </select>
        </div>
      </div>
      <div>
        <FoodTable
          list={listRender}
          rowSelected={rowSelected}
          setRowSelected={setRowSelected}
        />
      </div>
      <div>
        <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="text-orange-600 font-font2">
              New a product
            </ModalHeader>
            <ModalCloseButton />
            <CreateFoodForm addToList={addItem} onClose={onCloseCreate} />
          </ModalContent>
        </Modal>
      </div>
      {rowSelected ? (
        <div>
          <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className="text-orange-600 font-font2">
                Edit
              </ModalHeader>
              <ModalCloseButton />
              <EditFoodForm
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

export default ShopSellerPage;
