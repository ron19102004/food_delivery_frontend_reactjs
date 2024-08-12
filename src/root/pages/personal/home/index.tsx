import React, {useEffect, useState} from 'react'
import useLocation from "../../../../hooks/useLocation.hook.tsx";
import LoopList from "../../../../components/loop.component.tsx";
import {Link, useSearchParams} from "react-router-dom";
import {findAllFoodByCategoryIdAndLocationCode, FoodEntity} from "../../../../apis/food.api.ts";
import useList from "../../../../hooks/useList.hook.tsx";
import {cn} from "../../../../lib/utils.ts";
import useCategory from "../../../../hooks/useCategory.hook.tsx";

const HomePersonalPage: React.FC = () => {
    const {list: locations} = useLocation();
    const {list: categories} = useCategory()
    const [searchParams, setSearchParams] = useSearchParams();
    const {list, setList} = useList<FoodEntity>()
    const [location, setLocation] = useState<string>("VN-DN");
    const [page, setPage] = useState(0);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const loadList = async () => {
        const data = Object.fromEntries(searchParams.entries())
        const _list = await
            findAllFoodByCategoryIdAndLocationCode(
                data["page"] && data["page"].length > 0 ? parseInt(data["page"]) : 0,
                data["category-id"] && data["category-id"].length > 0 ? parseInt(data["category-id"]) : undefined,
                data["location-code"] && data["location-code"].length > 0 ? data["location-code"] : undefined)
        setList(_list)
        setPage(data["page"] && data["page"].length > 0 ? parseInt(data["page"]) : 0)
        setCategoryId(data["category-id"] && data["category-id"].length > 0 ? parseInt(data["category-id"]) : undefined)
    }
    const makeQuery = () => {
        const data = Object.fromEntries(searchParams.entries())
        return `/home?location-code=${location}&category-id=${categoryId}&page=${data["page"] ? (parseInt(data["page"]) + 1) : "0"}`;
    }
    useEffect(() => {
        loadList()
    }, [searchParams]);
    return (
        <div className={"container p-4 md:p-0 md:pt-4 space-y-4"}>
            <div>
                <h1 className={"font-font3"}>Query: Category: {categoryId ?? 0} - Location: {location ?? "Unknown"}</h1>
            </div>
            <div className={"flex md:flex-row flex-col gap-2"}>
                <select className={"outline-none border w-full md:w-96 h-10 rounded font-font3"}
                        onChange={(e) => {
                            setLocation(e.target.value)
                            setSearchParams({
                                "location-code": e.target.value,
                                "page": page.toString(),
                                "category-id": categoryId ? categoryId.toString() : ""
                            })
                        }}>
                    <LoopList list={locations} render={item => <option value={item.code}>{item.name}</option>}/>
                </select>
                <select className={"outline-none border w-full md:w-96 h-10 rounded font-font3"}
                        onChange={(e) => {
                            setCategoryId(parseInt(e.target.value))
                            setSearchParams({
                                "location-code": location,
                                "page": page.toString(),
                                "category-id": parseInt(e.target.value).toString()
                            })
                        }}>
                    <LoopList list={categories} render={item => <option value={item.id}>{item.name}</option>}/>
                </select>
            </div>
            <div>
                <ul className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 font-font3"}>
                    <LoopList list={list} render={item => <Link to={"/"} className={"shadow rounded"}>
                        <div className={"relative"}>
                            <img src={item.poster} alt={item.name} className={"w-full h-40 object-cover rounded-t"}/>
                            {item.sale_off > 0.0 ? <div className={"absolute top-0 right-0"}>
                                <h1 className={"bg-red-500 text-white px-5 py-1 rounded-bl-lg font-bold"}>{item.sale_off}%</h1>
                            </div> : null}
                        </div>
                        <div className={"px-3 pb-2"}>
                            <h1 className={"font-bold text-xl line-clamp-2 text-ellipsis"}>{item.name}</h1>
                            <h1>Sold: {item.sold} | Category: {item.category.name}</h1>
                            <div className={"flex space-x-2"}>
                                <h1 className={cn({
                                    "line-through": item.sale_off > 0.0
                                })}>Price: ${item.price}</h1>
                                <h1 className={cn("font-bold text-orange-500", {
                                    "hidden": item.sale_off <= 0.0
                                })}>Sale price: ${item.sale_price}</h1>
                            </div>
                        </div>
                    </Link>}/>
                </ul>
            </div>
            <div className={cn("flex justify-center items-center py-4",
                {
                    "hidden": list.length === 0
                }
            )}>
                <a href={makeQuery()} className={"text-lg"}>
                    More
                </a>
            </div>
            <hr/>
        </div>
    )
}

export default HomePersonalPage