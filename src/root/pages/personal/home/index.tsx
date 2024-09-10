import React, {useEffect, useRef, useState} from 'react'
import useLocation from "../../../../hooks/useLocation.hook.tsx";
import LoopList from "../../../../components/loop.component.tsx";
import {Link, useSearchParams} from "react-router-dom";
import {findAllFoodByCategoryIdAndLocationCode, FoodEntity} from "../../../../apis/food.api.ts";
import useList from "../../../../hooks/useList.hook.tsx";
import {cn} from "../../../../lib/utils.ts";
import useCategory from "../../../../hooks/useCategory.hook.tsx";
import {BackgroundMain} from "../../../../assets/imgs";
import {APP_APK_ID} from "../../../../utils/constant.util.ts";

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
        const category = categoryId !== undefined ? `&category-id=${categoryId}` : ""
        return `/home?page=${data["page"] ? (parseInt(data["page"]) + 1) : "0"}&location-code=${location}${category}`;
    }
    useEffect(() => {
        loadList()
    }, [searchParams]);
    //########################
    const mainRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);
    const scrollHandler = (event: WheelEvent) => {
        if (mainRef && mainRef.current && titleRef && titleRef.current && bgRef && bgRef.current) {
            if (event.deltaY < 0) {
                mainRef.current.classList.remove("-translate-y-80")
                mainRef.current.classList.add("translate-y-0")
                titleRef.current.classList.remove("top-28")
                titleRef.current.classList.add("top-20")
                bgRef.current.classList.remove("blur-sm")
            } else {
                mainRef.current.classList.remove("translate-y-0")
                mainRef.current.classList.add("-translate-y-80")
                titleRef.current.classList.remove("top-20")
                titleRef.current.classList.add("top-28")
                bgRef.current.classList.add("blur-sm")
            }
        }
    }
    useEffect(() => {
        document.addEventListener('wheel', scrollHandler);
        return () => {
            document.removeEventListener('wheel', scrollHandler);
        }
    }, []);
    return (
        <div className={"min-w-screen relative"}>
            <div className={"fixed bottom-0 right-0 mb-5 mr-5 z-50"}>
                <Link to={"/request-role"} className={"py-3 px-5 bg-orange-600 rounded-full text-white shadow"}>
                    !
                </Link>
            </div>
            <div className={"hidden md:block relative"}>
                <img ref={bgRef} src={BackgroundMain} alt="bg" className={"w-full h-screen object-cover"}/>
                <div ref={titleRef} className={"absolute z-30 top-20 left-[50%] -translate-x-[50%] transition-all"}>
                    <div className="max-w-2xl mx-auto text-white py-10 text-2xl">
                        <div className="text-center">
                            <h3 className="md:text-4xl 2xl:text-5xl mb-3 font-font3"> Download our <span
                                className={"text-orange-400"}>Ron<span
                                className={"font-bold"}>FoodDelivery</span> </span> app
                            </h3>
                            <p> Stay fit. All day, every day. </p>
                            <a href={`https://drive.google.com/uc?export=download&id=${APP_APK_ID}`}
                               className="flex justify-center my-10 font-font2 ">
                                <div
                                    className="flex items-center w-auto rounded-lg px-4 py-2 mx-2 hover:backdrop-blur-2xl bg-transparent backdrop-blur-3xl transition-all">
                                    <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                                         className="w-10 md:w-14"
                                         alt={"pls"}/>
                                    <div className="text-left ml-3">
                                        <p className='text-lg text-gray-200'>Download on </p>
                                        <p className="text-xl md:text-base"> Google Play Store </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={mainRef} className={"container p-4 md:p-10 space-y-4 md:bg-white rounded shadow transition-all "}>
                <div>
                    <h1 className={"font-font3"}>Query: Category: {categoryId ?? 0} -
                        Location: {location ?? "Unknown"}</h1>
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
                            <div className={"relative h-40 w-full overflow-hidden rounded-t"}>
                                <img src={item.poster} alt={item.name}
                                     className={"w-full h-40 object-cover rounded-t hover:scale-150 transition-all"}/>
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
                    <a href={makeQuery()} className={"hover:underline hover:text-orange-600"}>
                        ...More...
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HomePersonalPage