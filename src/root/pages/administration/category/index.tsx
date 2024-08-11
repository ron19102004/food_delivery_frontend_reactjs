import React, { useEffect, useState } from "react";
import { CategoryEntity, removeCategory } from "../../../../apis/category.api";
import CategoryTable from "./table";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  HiArchiveBoxXMark,
  HiArrowPath,
  HiMiniPencilSquare,
  HiMiniPlus,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import CreateCategoryForm from "./create";
import EditCategoryForm from "./edit";
import useAuth from "../../../../hooks/useAuth.hook";
import useCategory from "../../../../hooks/useCategory.hook";
const CategoryAdminPage: React.FC = () => {
  const { list,loadList,removeItem,updateItem,addItem} = useCategory();
  const [rowSelected, setRowSelected] = useState<CategoryEntity | null>(null);
  const { accessToken } = useAuth();
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

  useEffect(() => {
  }, [list]);
  return (
    <div>
      <div className="px-2 pt-2 md:px-4 font-font3 font-semibold flex justify-start items-center space-x-1">
        <button
          className="w-full md:w-auto  border border-neutral-800 h-10 px-3 bg-neutral-800 hover:bg-neutral-900 text-white rounded-3xl flex justify-center items-center space-x-1"
          onClick={async () => {
            await loadList();
            toast("Reloaded", {
              type: "info",
            });
          }}
        >
          <HiArrowPath />
          <span>Reload</span>
        </button>
        <button
          className="w-full md:w-auto  border border-green-500 h-10 px-3 bg-green-500 hover:bg-green-600 text-white rounded-3xl flex justify-center items-center space-x-1"
          onClick={onOpenCreate}
        >
          <HiMiniPlus />
          <span>Create</span>
        </button>
        <button
          onClick={onOpenEdit}
          className="w-full md:w-auto  border border-yellow-500 h-10 px-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-3xl flex justify-center items-center space-x-1"
        >
          <HiMiniPencilSquare />
          <span>Edit</span>
        </button>
        <button
          onClick={async () => {
            if (rowSelected) {
              await removeCategory(
                {
                  id: rowSelected.id,
                  token: accessToken ?? "",
                },
                async (res) => {
                  if (res.status) {
                    removeItem(rowSelected);
                    toast("Deleted", {
                      type: "success",
                    });
                    return;
                  }
                  toast(res.message ?? "Undefined error", {
                    type: "error",
                  });
                },
                (err) => {
                  toast(err?.response?.data?.message ?? "Undefined error", {
                    type: "error",
                  });
                }
              );
            }
          }}
          className="w-full md:w-auto border border-red-500 h-10 px-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl flex justify-center items-center space-x-1"
        >
          <HiArchiveBoxXMark />
          <span>Delete</span>
        </button>
      </div>
      <div>
        <CategoryTable
          list={list}
          rowSelected={rowSelected}
          setRowSelected={setRowSelected}
        />
      </div>
      <div>
        <Modal isOpen={isOpenCreate} onClose={onCloseCreate}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="text-orange-600 font-font2">
              New a category
            </ModalHeader>
            <ModalCloseButton />
            <CreateCategoryForm onClose={onCloseCreate} addItem={addItem} />
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
              <EditCategoryForm
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

export default CategoryAdminPage;
