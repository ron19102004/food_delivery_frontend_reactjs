import React, {useEffect} from "react";
import {ClassValue} from "clsx";
import {RequestRoleEntity} from "../../../../apis/request-role.api.ts";

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import {Bar} from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IStatusRequestRole {
    className?: ClassValue,
    listHandled: RequestRoleEntity[],
    listWaiting: RequestRoleEntity[]
}

const StatusRequestRole: React.FC<IStatusRequestRole> = ({className, listHandled, listWaiting}) => {
    useEffect(() => {
    }, [listHandled, listWaiting]);
    return <Bar data={{
        labels: ['Waiting', 'Handled'],
        datasets: [
            {
                label: 'Totals request role',  // Tên của dữ liệu
                data: [listWaiting.length, listHandled.length,],
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
    }}/>;
};

export default StatusRequestRole;
