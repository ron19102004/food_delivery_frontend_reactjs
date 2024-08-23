import React, {useEffect, useRef} from "react";
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth.hook";
import {cn} from "../../../lib/utils";
import {
    HiBars3,
    HiChevronDoubleLeft,
    HiHome,
    HiMiniMapPin,
    HiUser,
    HiUserCircle,
    HiMiniArrowRightOnRectangle,
    HiMiniDocumentDuplicate, HiTicket,
} from "react-icons/hi2";
import ModelToggle from "../../../components/model.component";
import {INavLinkPersonal} from "../personal/index.layout";
import LoopList from "../../../components/loop.component";
import {IconType} from "react-icons/lib";
import {UserRole} from "../../../apis/auth.api";
import VoucherProvider from "../../../contexts/voucher.context.tsx";

interface INavLinkAdmin extends INavLinkPersonal {
    icon: IconType;
}

const list_menu: INavLinkAdmin[] = [
    {
        path: "/admin/dashboard",
        label: "Dashboard",
        icon: HiHome,
    },
    {
        path: "/admin/locations",
        label: "Location",
        icon: HiMiniMapPin,
    },
    {
        path: "/admin/user",
        label: "User",
        icon: HiUserCircle,
    },
    {
        path: "/admin/category",
        label: "Category",
        icon: HiMiniDocumentDuplicate,
    },
    {
        path: "/admin/vouchers",
        label: "My Voucher",
        icon: HiTicket,
    }
];
const AdminLayout: React.FC = () => {
    const {userCurrent, logout, isAuthenticated} = useAuth();
    const sideBarRef = useRef<HTMLElement>(null);
    const openIconRef = useRef<HTMLDivElement>(null);
    const closeIconRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const init = async () => {};
    useEffect(() => {
        init();
    }, [isAuthenticated]);
    return (
        <main className="flex bg-gray-100">
            <ModelToggle
                elementRef={sideBarRef}
                closeIconRef={closeIconRef}
                openIconRef={openIconRef}
            >
                <section
                    ref={sideBarRef}
                    className={cn(
                        "hidden md:block fixed md:static shadow-lg  z-20  w-[250px] 2xl:w-[300px] min-h-screen max-h-screen py-4 bg-gray-100"
                    )}
                >
                    <div className="h-14 flex flex-col justify-center items-center relative">
                        <h1 className="font-font3 font-extrabold text-xl">
                            {userCurrent?.first_name} {userCurrent?.last_name}{" "}
                        </h1>
                        <Link
                            to={"/me"}
                            className="font-font3 font-bold text-sm text-orange-600 underline hover:no-underline"
                        >
                            {userCurrent?.username}
                        </Link>
                        <div
                            ref={closeIconRef}
                            className="md:hidden absolute -right-5 top-50% text-xl bg-orange-600 p-2 rounded-full flex flex-col justify-center items-center text-white"
                        >
                            <HiChevronDoubleLeft/>
                        </div>
                    </div>
                    <aside className=" h-[calc(100%-3.5rem)] flex flex-col justify-between">
                        <ul className="space-y-2 p-2">
                            <LoopList
                                list={list_menu}
                                render={(item: INavLinkAdmin) => {
                                    return (
                                        <li className="font-font2">
                                            <NavLink
                                                to={item.path}
                                                className={({isActive}) =>
                                                    cn(
                                                        "px-2 py-4 flex items-center transition-all shadow ",
                                                        {
                                                            "bg-orange-600 text-white": isActive,
                                                            "bg-white hover:shadow-lg hover:bg-orange-50 hover:text-orange-600": !isActive,
                                                        }
                                                    )
                                                }
                                            >
                                                <div className="w-5">{<item.icon/>}</div>
                                                <h1 className="text-ellipsis line-clamp-1">
                                                    {item.label}
                                                </h1>
                                            </NavLink>
                                        </li>
                                    );
                                }}
                            />
                        </ul>
                        <ul className="space-y-2 px-2">
                            <li className="font-font2">
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate("/");
                                    }}
                                    className={cn(
                                        "hover:text-orange-600 hover:bg-orange-50 w-full px-2 py-4  flex items-center  transition-all bg-white hover:shadow-lg shadow "
                                    )}
                                >
                                    <div className="w-5">
                                        <HiMiniArrowRightOnRectangle/>
                                    </div>
                                    <h1 className="text-ellipsis line-clamp-1">Logout</h1>
                                </button>
                            </li>
                            <li className="font-font2">
                                <NavLink
                                    to={"/"}
                                    className={({isActive}) =>
                                        cn(
                                            "px-2 py-4 flex items-center  transition-all shadow ",
                                            {
                                                "bg-orange-600 text-white": isActive,
                                                "bg-white hover:shadow-lg hover:bg-orange-50 hover:text-orange-600": !isActive,
                                            }
                                        )
                                    }
                                >
                                    <div className="w-5">
                                        <HiUser/>
                                    </div>
                                    <h1 className="text-ellipsis line-clamp-1">Home Personal</h1>
                                </NavLink>
                            </li>
                        </ul>
                    </aside>
                </section>
            </ModelToggle>
            <section className="flex-1">
                <div
                    className="md:hidden h-14 flex justify-start items-center space-x-3 pl-3 ">
                    <button className="md:hidden text-2xl">
                        <div
                            ref={openIconRef}
                            className="text-xl bg-orange-600 p-2 rounded-full flex flex-col justify-center items-center text-white"
                        >
                            <HiBars3/>
                        </div>
                    </button>
                    <h1 className="font-font1 font-semibold text-2xl lg:text-3xl text-orange-600">
                        Admin Management
                    </h1>
                </div>
                <div
                    className="content md:min-h-screen md:max-h-screen max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden bg-white shadow-2xl">
                    <VoucherProvider username={userCurrent?.username ?? ""}
                                     userRole={userCurrent?.role ?? UserRole.USER}>
                        <Outlet/>
                    </VoucherProvider>
                </div>
            </section>
        </main>
    );
};

export default AdminLayout;
