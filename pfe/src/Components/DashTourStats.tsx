// components/StatsChart.tsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Stats {
    tours: number;
    sites: number;
  
}

const DashTourChart: React.FC = () => {
    const [stats, setStats] = useState<Stats>({ tours: 0, sites: 0});

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
    labels: ['Tours', 'Sites'],
    datasets: [
        {
            label: 'Number of People',
            data: [stats.tours, stats.sites],
            backgroundColor: ['#3acadf', '#8a64d6', 'rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 0.5,
            barPercentage: 0.5,
        },
    ],
};

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 2, // Increment by 5
                },
            },
        },
    };

    return (
        <div>
            <h2 className='text-center'>Tours and Sites Statistics</h2>
            <Bar data={data} options={options}></Bar>
        </div>
    );
};

export default DashTourChart;
