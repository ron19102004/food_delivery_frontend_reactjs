import React, { useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.hook";
import { cn } from "../../../lib/utils";
import { HiBars3, HiChevronDoubleLeft } from "react-icons/hi2";
import ModelToggle from "../../../components/model.component";
import { INavLinkPersonal } from "../personal/index.layout";
import LoopList from "../../../components/loop.component";
interface INavLinkAdmin extends INavLinkPersonal {}
const list_menu: INavLinkAdmin[] = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
  },
];
const AdminLayout: React.FC = () => {
  const { userCurrent } = useAuth();
  const sideBarRef = useRef<HTMLElement>(null);
  const openIconRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);
  return (
    <main className="flex">
      <ModelToggle
        elementRef={sideBarRef}
        closeIconRef={closeIconRef}
        openIconRef={openIconRef}
      >
        <section
          ref={sideBarRef}
          className={cn(
            "hidden md:block fixed md:static shadow-lg md:shadow-none z-20  w-[250px] 2xl:w-[300px] min-h-screen border-r bg-white"
          )}
        >
          <div className="h-14 flex flex-col justify-center items-center border-b relative">
            <h1 className="font-font1 font-semibold text-2xl text-orange-600">
              Admin Management
            </h1>
            <h1 className="font-font3 font-semibold">
              {userCurrent?.first_name} {userCurrent?.last_name}{" "}
            </h1>
            <div
              ref={closeIconRef}
              className="md:hidden absolute -right-5 top-50% text-xl bg-orange-600 p-2 rounded-full flex flex-col justify-center items-center text-white"
            >
              <HiChevronDoubleLeft />
            </div>
          </div>
          <aside className="bg-slate-50 h-[calc(100%-3.5rem)]">
            <li>
              <LoopList
                list={list_menu}
                render={(item: INavLinkAdmin) => {
                  return (
                    <li>
                      <NavLink to={item.path}>{item.label}</NavLink>
                    </li>
                  );
                }}
              />
            </li>
          </aside>
        </section>
      </ModelToggle>
      <section className="flex-1">
        <div className="h-14 flex justify-start items-center space-x-3 pl-3 border-b">
          <button className="md:hidden text-2xl">
            <div
              ref={openIconRef}
              className="text-xl bg-orange-600 p-2 rounded-full flex flex-col justify-center items-center text-white"
            >
              <HiBars3 />
            </div>
          </button>
          <h1 className="font-font2 text-xl">Admin Dashboard</h1>
        </div>
        <Outlet />
      </section>
    </main>
  );
};

export default AdminLayout;
