import styles from "./LineChart.module.css";

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
);


  

const LineChart = ({ missedChat_DataPoints, title }) => {
    const labels = missedChat_DataPoints.map(item => "Week " + item.week);
    const data = missedChat_DataPoints.map(item => item.missedChats);

    const chartData = {
        labels,
        datasets: [
            {
                // label: title,
                data,
                borderColor: '#00D907',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                tension: 0.4,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#000000",
                pointBorderWidth: 3,
                radius: 4
                // fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: title,
            },

            legend: {
                display: false, // hides the legend box
            },

            tooltip: {
                backgroundColor: '#000', // black background
                titleColor: '#fff',       // "Chats" text color
                titleFont: {
                    size: 14,
                    weight: 'normal',
                },
                bodyColor: '#fff',        // number text color
                bodyFont: {
                    size: 16,
                    weight: '600',
                },
                padding: 10,
                cornerRadius: 10, // rounded corners
                caretSize: 6,     // little arrow size
                caretPadding: 6,  // space between tooltip box and arrow
                displayColors: false,
                position: 'nearest', 
                yAlign: 'top',       // align tooltip vertically at top
                xAlign: 'center',    // center horizontally
                callbacks: {
                    title: (tooltipItems) => {
                      return `     Chats     `;
                    },
                    label: (tooltipItem) => {
                        return `        ${tooltipItem.raw}     `;
                      // or return 'Missed'; if you want a constant text
                    }
                  },
            }

        },
        scales: {
            x: {
                title: {
                    display: true,
                    // text: 'Week',
                },

                grid: {
                    display: false
                },
                ticks: {
                    color: 'black', // customize font color
                    font: {
                        weight: 400,
                        size: 12,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    // text: 'Missed Chats',
                },

                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: 'black', // customize font color
                    font: {
                        weight: 400,
                        size: 12,
                    },
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;

