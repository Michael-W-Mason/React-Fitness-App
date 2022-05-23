import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = (props) => {

    const labels = props.data.map(ele => ele.updatedAt);
    const data = {
        labels,
        datasets: [
            {
                label: 'Log Point',
                data: props.data.map(ele => ele.val),
                backgroundColor: 'rgb(26,86,219)',
                borderColor: 'rgb(26,86,219)',
            },
            {
                label: 'Goal',
                data: props.data.map(i => props.goal),
                borderWidth: 1,
                borderDash: [5],
                backgroundColor: 'rgb(245 158 11)',
                borderColor: 'rgb(245 158 11)',
            }
        ],
    };
    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (item) => `${item.dataset.label}: ${item.formattedValue} ${props.unit}`
                }
            },
        },
        scales: {
            yAxis: {
                ticks: {
                    callback: function (value, index, values) {
                        return value + ` ${props.unit}`;
                    }
                }
            }
        }
    };
    return (
        <Line data={data} options={options} />
    )
}

export default LineChart;