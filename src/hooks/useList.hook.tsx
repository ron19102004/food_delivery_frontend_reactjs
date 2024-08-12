import {Entity} from "../apis/api.config";
import {useState} from "react";

interface IUseListHook<T extends Entity> {
    list: Array<T>;
    setList: (list: Array<T>) => void;
    addItem: (item: T) => void;
    removeItem: (item: T) => void;
    removeItemById: (id: number) => void;
    updateItem: (id: number, item: T) => void;
    findById: (id: number) => T | null;
    addItems: (items: T[]) => void;
}

const useList = <T extends Entity>(
    initList: Array<T> = []
): IUseListHook<T> => {
    const [list, setList] = useState<Array<T>>(initList);
    const addItem = (item: T) => {
        setList([...list, item]);
    };
    const removeItem = (item: T) => {
        setList(list.filter((i) => i.id !== item.id));
    };
    const updateItem = (id: number, item: T) => {
        setList(list.map((i) => (i.id === id ? item : i)));
    };
    const removeItemById = (id: number) => {
        setList(list.filter((i) => i.id !== id));
    };
    const findById = (id: number) => {
        const index = list.findIndex(i => i.id.toString() == id.toString())
        if (index > -1) {
            return list[index];
        }
        return null;
    }
    const addItems = (items: T[]) => {
        setList([...list, ...items])
    }
    return {
        list: list,
        setList: setList,
        addItem: addItem,
        removeItem: removeItem,
        updateItem: updateItem,
        removeItemById: removeItemById,
        findById: findById,
        addItems: addItems

    };
};
export default useList;
