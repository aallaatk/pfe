// components/StatsChart.tsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
);

interface Stats {
    users: number;
    guiders: number;
}

const PieUserChart: React.FC = () => {
    const [stats, setStats] = useState<Stats>({ users: 0, guiders: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:3000/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };
        fetchStats();
    }, []);

    const data = {
        labels: ['Users', 'Guiders'],
        datasets: [
            {
                data: [stats.users, stats.guiders],
                backgroundColor: ['#729efd', 'rgb(12, 234, 217)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Users and Guiders Statistics',
                fontSize: 20,
            },
            legend: {
                display: true,
                position: 'right',
            },
        },
        aspectRatio: 1, // Adjust the aspect ratio here
    } as const;
    

    return (
       <>
            <h2 className='text-center mt-3'>Users and Guiders Statistics</h2>
            <Pie data={data} options={options} />
            </>
            
    );
};

export default PieUserChart;
