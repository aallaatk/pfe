// components/ToursSitesChart.tsx
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
    tours: number;
    sites: number;
}

const PieTourChart: React.FC = () => {
    const [stats, setStats] = useState<Stats>({ tours: 0, sites: 0 });

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
                data: [stats.tours, stats.sites],
                backgroundColor: ['#3acadf', '#8a64d6'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Tours and Sites Statistics',
                fontSize: 20,
            },
            legend: {
                display: true,
                position: 'right',
            },
        },
        aspectRatio: 1,
    } as const;

    return (
        <>
                    <h2 className='text-center mt-3'>Tours and Sites Statistics</h2>
                    <Pie data={data} options={options} />
                    </>
    );
};

export default PieTourChart;
