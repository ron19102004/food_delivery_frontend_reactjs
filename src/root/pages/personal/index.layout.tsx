import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useLocation from "../../../hooks/useLocation.hook";
import LoopList from "../../../components/loop.component";
import { cn } from "../../../lib/utils";
import useAuth from "../../../hooks/useAuth.hook";
import { LocationEntity } from "../../../apis/location.api";
import { useSearchParams } from "react-router-dom";
import { UserRole } from "../../../apis/auth.api";

export interface INavLinkPersonal {
  path: string;
  label: string;
}
const list_menu: INavLinkPersonal[] = [
  {
    path: "/home",
    label: "Home",
  },
  {
    path: "/food/drink",
    label: "Drink",
  },
  {
    path: "/food/break-fast",
    label: "Breakfast",
  },
];
const PersonalLayout: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, logout, userCurrent } = useAuth();
  const { list } = useLocation();
  useEffect(() => {}, [list]);
  return (
    <main>
      <header className="text-xl font-font2 font container bg-gray-100 py-2 xl:mt-2 xl:rounded flex justify-between items-center">
        <div className="flex justify-center items-center space-x-4">
          <h1 className="text-orange-600 text-2xl">
            <span>Ron</span>
            <span className="font-semibold">FoodDelivery</span>
          </h1>
          <select
            className="font-font3 font-semibold text-gray-700 list-location outline-none rounded-3xl py-1 px-2 text-lg border focus:border-orange-500"
            onChange={(e) => {
              setSearchParams({
                location: e.target.value,
              });
            }}
          >
            <LoopList
              list={list}
              render={(item: LocationEntity) => (
                <option value={item.id}>{item.name}</option>
              )}
            />
          </select>
        </div>
        <nav>
          <ul className="flex space-x-8">
            <LoopList
              list={list_menu}
              render={(item: INavLinkPersonal) => {
                return (
                  <li className={cn("text-gray-700 text-lg")}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn("transition-all", {
                          "menu-item-active": isActive,
                          "hover:text-orange-500": !isActive,
                        })
                      }
                    >
                      <h1>{item.label}</h1>
                    </NavLink>
                  </li>
                );
              }}
            />
          </ul>
        </nav>
        <div>
          {isAuthenticated ? (
            <div className="flex justify-center items-center space-x-4">
              <div>
                <h1>
                  Welcome{" "}
                  <span className="font-semibold text-orange-600">
                    {userCurrent?.last_name}
                  </span>
                </h1>
                <div className="flex justify-center items-center space-x-3">
                  <NavLink
                    to={"/me"}
                    className={({ isActive }) =>
                      cn("text-sm", {
                        "menu-item-active ": isActive,
                        "hover:text-orange-600 hover:underline": !isActive,
                      })
                    }
                  >
                    {userCurrent?.username}
                  </NavLink>
                  <ManagerRouterButton role={userCurrent?.role} />
                </div>
              </div>
              <button
                className="border text-orange-600 border-orange-600 px-3 py-1 text-base rounded-3xl hover:bg-orange-600 hover:text-white transition-all"
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
              className="block border text-orange-600 border-orange-600 px-3 py-1 text-base rounded-3xl hover:bg-orange-600 hover:text-white transition-all"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>
      <section>
        <Outlet />
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
