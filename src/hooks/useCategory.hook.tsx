import { CategoryEntity, getAllCategory } from "../apis/category.api";
import useList from "./useList.hook";
import { useEffect } from "react";
interface IUseCategory {
  list: Array<CategoryEntity>;
  loadList: (handler?: (res: Array<CategoryEntity>) => void) => Promise<void>;
}

const useCategory = (): IUseCategory => {
  const { list, setList } = useList<CategoryEntity>();
  const loadList = async (handler?: (res: Array<CategoryEntity>) => void) => {
    await getAllCategory(
      (res) => {
        setList(res.data);
        if (handler) {
          handler(res.data);
        }
      },
      (err) => {
        console.error(err);
        if (handler) {
          handler([]);
        }
      }
    );
  };
  useEffect(() => {
    loadList();
  }, []);
  return {
    list: list,
    loadList: loadList,
  };
};
export default useCategory;
