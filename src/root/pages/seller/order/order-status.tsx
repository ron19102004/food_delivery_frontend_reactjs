import React from 'react';
import {ClassValue} from "clsx";
import useOrder from "../../../../hooks/useOrder.hook.tsx";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {Bar} from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderStatus: React.FC<{ className?: ClassValue }> = ({className}) => {
    const {list_finished, list_handling, list_canceled} = useOrder()
    return <Bar data={{
        labels: ['Handling', 'Finished', 'Canceled 3'],
        datasets: [
            {
                label: 'My Data',  // Tên của dữ liệu
                data: [list_handling.length, list_finished.length, list_canceled.length],  // 3 số bạn có
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'],
            },
        ],
    }} options={{
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Orders',
            },
        },
    }} />;
};

export default OrderStatus;