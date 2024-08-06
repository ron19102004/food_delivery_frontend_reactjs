/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from "react-router-dom";

import React, {useEffect} from "react";
import PersonalLayout from "../../pages/personal/index.layout";
import {
    HomePersonalPage,
    ProfilePersonalPage,
    RequestRolePage,
} from "../../pages/personal/index.page";
import AuthenticationLayout from "../../authentication/index.layout";
import {
    LoginFormPage,
    RegisterFormPage,
} from "../../authentication/index.page";
import useAuth from "../../../hooks/useAuth.hook";
import NotFoundPage from "../../pages/errors/404.error";
import {AuthSafe, AuthSafeWithRole} from "../../authentication/auth.safe";
import AdminLayout from "../../pages/administration/index.layout";
import {UserRole} from "../../../apis/auth.api";
import {
    CategoryAdminPage,
    DashboardAdminPage,
    LocationAdminPage,
    UserManagerAdmin,
} from "../../pages/administration/index.page";
import useRequestRole from "../../../hooks/useRequestRole.hook";
import {DashboardSellerPage, ShopSellerPage, VoucherSellerPage,MyOrderSellerPage} from "../../pages/seller/index.page";
import SellerLayout from "../../pages/seller/index.layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet/>,
        children: [
            //Personal page configuration routes
            {
                path: "",
                element: <PersonalLayout/>,
                children: [
                    {
                        path: "",
                        element: <Navigate to={"/home"}/>,
                    },
                    {
                        path: "home",
                        element: <HomePersonalPage/>,
                    },
                    {
                        path: "food",
                        element: <Outlet/>,
                        children: [
                            {
                                path: "drink",
                                element: <div>Drink</div>,
                            },
                            {
                                path: "break-fast",
                                element: <div>break-fast</div>,
                            },
                        ],
                    },
                    //Require the authenticated
                    {
                        path: "",
                        element: <AuthSafe/>,
                        children: [
                            {path: "me", element: <ProfilePersonalPage/>},
                            {path: "request-role", element: <RequestRolePage/>},
                        ],
                    },
                ],
            },
            //Administration routes
            {
                path: "",
                element: <AuthSafeWithRole role={UserRole.ADMIN}/>,
                children: [
                    {
                        path: "admin",
                        element: <AdminLayout/>,
                        children: [
                            {
                                path: "",
                                element: <Navigate to={"/admin/dashboard"}/>,
                            },
                            {
                                path: "dashboard",
                                element: <DashboardAdminPage/>,
                            },
                            {
                                path: "locations",
                                element: <LocationAdminPage/>,
                            },
                            {
                                path: "user",
                                element: <UserManagerAdmin/>,
                            },
                            {
                                path: "category",
                                element: <CategoryAdminPage/>,
                            },
                        ],
                    },
                ],
            },
            //Seller routes
            {
                path: "",
                element: <AuthSafeWithRole role={UserRole.SELLER}/>,
                children: [
                    {
                        path: "seller",
                        element: <SellerLayout/>,
                        children: [
                            {
                                path: "",
                                element: <Navigate to={"/seller/dashboard"}/>,
                            },
                            {
                                path: "dashboard",
                                element: <DashboardSellerPage/>,
                            },
                            {
                                path: "my-shop",
                                element: <ShopSellerPage/>,
                            },
                            {
                                path: "orders",
                                element: <MyOrderSellerPage/>,
                            },
                            {
                                path: "vouchers",
                                element: <VoucherSellerPage/>,
                            },
                        ],
                    },
                ],
            },
            //Authentication page configuration routes
            {
                path: "/auth",
                element: <AuthenticationLayout/>,
                children: [
                    {
                        path: "",
                        element: <Navigate to={"/auth/login"}/>,
                    },
                    {
                        path: "login",
                        element: <LoginFormPage/>,
                    },
                    {
                        path: "register",
                        element: <RegisterFormPage/>,
                    },
                ],
            },
            //404 page configuration route
            {
                path: "*",
                element: <NotFoundPage/>,
            },
        ],
    },
]);
const RouterPagesProvider: React.FC = () => {
    const {isAuthenticated, checkAuth, login} = useAuth();
    const {loadRolesRequest} = useRequestRole();
    const initializer = async () => {
        await checkAuth(
            (user, token) => {
                login(user, token);
            },
            () => {
            }
        );
        await loadRolesRequest();
    };
    useEffect(() => {
        initializer();
    }, [isAuthenticated]);
    return <RouterProvider router={router}/>;
};

export default RouterPagesProvider;
