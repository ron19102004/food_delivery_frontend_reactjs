import React, {useEffect, useRef, useState} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import useLocation from "../../../hooks/useLocation.hook";
import LoopList from "../../../components/loop.component";
import {cn} from "../../../lib/utils";
import useAuth from "../../../hooks/useAuth.hook";
import {UserRole} from "../../../apis/auth.api";
import {HiBars3, HiOutlineXMark} from "react-icons/hi2";

export interface INavLinkPersonal {
    path: string;
    label: string;
}

const list_menu: INavLinkPersonal[] = [
];
const PersonalLayout: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {isAuthenticated, logout, userCurrent} = useAuth();
    const {list} = useLocation();
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const navRef = useRef<HTMLDivElement>(null);
    const authRef = useRef<HTMLDivElement>(null);
    const onClickBarMobile = () => {
        if (navRef && authRef && navRef.current && authRef.current){
            navRef.current.classList.toggle("hidden")
            authRef.current.classList.toggle("hidden")
            setIsOpenMenu(!isOpenMenu);
        }
    }
    const docListener = (e:MouseEvent) => {
        if (navRef && authRef && navRef.current && authRef.current && e.target instanceof Element){
            if (navRef.current.contains(e.target) || authRef.current.contains(e.target)) {
                onClickBarMobile()
            }
        }
    }
    useEffect(() => {
        document.addEventListener("click", docListener);
        return () => {
            document.removeEventListener("click", docListener);
        }
    }, [list]);
    return (
        <main>
            <header
                className="fixed min-w-full z-50 backdrop-blur-xl bg-transparent text-xl font-font2 font container bg-gray-100 py-2 xl:rounded flex flex-col space-y-4 md:space-y-0 justify-start items-start md:flex-row md:justify-between md:items-center">
                <div className="w-full md:w-auto  md:flex md:justify-center md:items-center md:space-x-4">
                    <div className={"flex items-center justify-between w-full"}>
                        <a href={"/"} className="text-orange-600 text-2xl">
                            <span>Ron</span>
                            <span className="font-semibold">FoodDelivery</span>
                        </a>
                        <button className={" md:hidden text-2xl"} onClick={onClickBarMobile}>
                            {isOpenMenu ? <HiOutlineXMark/> : <HiBars3/>}
                        </button>
                    </div>
                </div>
                <nav ref={navRef} className={"hidden md:block"}>
                    <ul className="md:flex md:space-x-8 space-y-2 md:space-y-0">
                        <LoopList
                            list={list_menu}
                            render={(item: INavLinkPersonal) => {
                                return (
                                    <li className={cn("text-gray-700 md:text-lg w-fit")}>
                                        <NavLink
                                            to={item.path}
                                            className={({isActive}) =>
                                                cn("transition-all w-full", {
                                                    "menu-item-active": isActive,
                                                    "hover:text-orange-500": !isActive,
                                                })
                                            }
                                        >
                                            <h1 className={"w-full"}>{item.label}</h1>
                                        </NavLink>
                                    </li>
                                );
                            }}
                        />
                    </ul>
                </nav>
                <div ref={authRef} className={"hidden md:block w-full md:w-auto"}>
                    {isAuthenticated ? (
                        <div
                            className="w-full flex flex-col md:flex-row md:justify-center md:items-center md:space-x-4 space-y-4 md:space-y-0">
                            <div className={""}>
                                <h1 className={"flex space-x-1"}>
                                    <span className={""}>Welcome</span>
                                    <span className="font-semibold text-orange-600 font-font3">
                                          {userCurrent?.last_name}
                                    </span>
                                </h1>
                                <div className="flex md:justify-center md:items-center space-x-3">
                                    <NavLink
                                        to={"/me"}
                                        className={({isActive}) =>
                                            cn("text-sm ", {
                                                "menu-item-active ": isActive,
                                                "hover:text-orange-600 hover:underline": !isActive,
                                            })
                                        }
                                    >
                                        {userCurrent?.username}
                                    </NavLink>
                                    <ManagerRouterButton role={userCurrent?.role}/>
                                </div>
                            </div>
                            <button
                                className="w-full border  border-orange-600 px-3 py-1 text-base rounded bg-orange-600  md:hover:bg-orange-600  text-white transition-all"
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to={"/auth/login"}
                            className="block border border-orange-600 px-3 py-1 text-base rounded bg-orange-600  text-white md:hover:text-white transition-all"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </header>
            <section className={"pt-12 md:pt-0"}>
                <Outlet/>
            </section>
        </main>
    );
};
const ManagerRouterButton: React.FC<{ role: UserRole | undefined }> = ({
                                                                           role,
                                                                       }) => {
    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
        switch (role) {
            case UserRole.ADMIN: {
                setUrl("/admin");
                break;
            }
            case UserRole.SELLER: {
                setUrl("/seller");
                break;
            }
            case UserRole.DELIVER: {
                setUrl("/deliver");
                break;
            }
        }
    }, [role]);
    return url ? (
        <Link className="hover:text-orange-600 hover:underline text-sm" to={url}>
            Manager
        </Link>
    ) : null;
};
export default PersonalLayout;
