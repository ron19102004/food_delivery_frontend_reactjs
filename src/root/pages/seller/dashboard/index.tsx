import React, {useEffect} from "react";

import MyShopInformation from "./my-info";
import {getFoodsBySellerUsername} from "../../../../apis/food.api";
import useAuth from "../../../../hooks/useAuth.hook";
import OrderStatus from "../order/order-status.tsx";

const DashboardSellerPage: React.FC = () => {
    const {userCurrent} = useAuth();
    const initialize = async () => {
        await getFoodsBySellerUsername(
            {
                seller_name: userCurrent?.username ?? "",
            },
            (res) => {
                if (res.status) {

                }
            },
            (err) => {
                console.error(err);
            }
        );
    };
    useEffect(() => {
        initialize();
    }, [0]);
    return (
        <div className="md:pb-5">
            <div className={""}>
                <h1 className="px-2 pt-2 md:px-4 md:pt-4 text-xl font-font3 font-bold">My orders</h1>
                <OrderStatus/>
            </div>
            <div className="w-full px-2 pt-2 md:px-4 md:pt-4">
                <MyShopInformation/>
            </div>
        </div>
    );
};

export default DashboardSellerPage;
