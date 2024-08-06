import {Entity} from "../apis/api.config";
import {useState} from "react";

interface IUseListHook<T extends Entity> {
    list: Array<T>;
    setList: (list: Array<T>) => void;
    addItem: (item: T) => void;
    removeItem: (item: T) => void;
    removeItemById: (id: number) => void;
    updateItem: (id: number, item: T) => void;

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
    return {
        list: list,
        setList: setList,
        addItem: addItem,
        removeItem: removeItem,
        updateItem: updateItem,
        removeItemById: removeItemById
    };
};
export default useList;
