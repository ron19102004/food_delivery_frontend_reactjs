import React, {useEffect, useState} from "react";
import StatusRequestRole from "../user/status-request-role";
import {getTotalsUser} from "../../../../apis/admin.api";
import useAuth from "../../../../hooks/useAuth.hook";
import {HiArrowLongRight} from "react-icons/hi2";
import useRequestRole from "../../../../hooks/useRequestRole.hook.tsx";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const DashboardAdminPage: React.FC = () => {
    const [totalsUser, setTotalsUser] = useState<{
        totalsUser: number;
        totalsDeliver: number;
        totalsSeller: number;
    }>({
        totalsUser: 0,
        totalsDeliver: 0,
        totalsSeller: 0,
    });
    const {accessToken} = useAuth();
    const {handledList, pendingList,reload} = useRequestRole(accessToken ?? "");

    const initialize = async () => {
        await Promise.all([reload(), getTotalsUser(
            {token: accessToken ?? ""},
            (res) => {
                if (res.status) {
                    setTotalsUser(res.data);
                }
            },
            (err) => {
                console.log(err);
            }
        )])
    };
    useEffect(() => {
        initialize();
    }, []);
    return (
        <div>
            <h1 className="px-2 pt-2 md:px-4 md:pt-4 font-font3 font-semibold text-xl">
                Totals request role
            </h1>
            <StatusRequestRole className="pt-1 md:pt-1" listWaiting={pendingList} listHandled={handledList}/>
            <h1 className="px-2 pt-1 md:px-4 font-font3 font-semibold text-xl">
                Totals user on system
            </h1>
            <Bar data={{
                labels: ['User', 'Seller',"Deliver"],
                datasets: [
                    {
                        label: 'Totals user on system',  // Tên của dữ liệu
                        data: [totalsUser.totalsUser,totalsUser.totalsSeller,totalsUser.totalsDeliver],
                        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)',],
                    },
                ],
            }} options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Orders',
                    },
                },
            }}/>
        </div>
    );
};

export default DashboardAdminPage;
