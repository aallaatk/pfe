import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
} from 'chart.js';

// Register the components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    TimeScale
);

interface Stats {
    labels: string[];
    datasets: Dataset[];
}

interface Dataset {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
}

interface DataEntry {
    date: string;
    count: number;
}

const StatsChart: React.FC = () => {
    const [stats, setStats] = useState<Stats>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [toursData, usersData, guidersData, sitesData] = await Promise.all([
                    axios.get<DataEntry[]>('http://localhost:3000/tours/stats/tours-created-per-day'),
                    axios.get<DataEntry[]>('http://localhost:3000/users/stats/new-users-per-day'),
                    axios.get<DataEntry[]>('http://localhost:3000/guiders/stats/new-guiders-per-day'),
                    axios.get<DataEntry[]>('http://localhost:3000/sites/stats/sites-created-per-day')
                ]);

                const labels: string[] = toursData.data.map(entry => entry.date);
                const datasets: Dataset[] = [
                    {
                        label: 'Tours Created',
                        data: toursData.data.map(entry => entry.count),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false
                    },
                    {
                        label: 'New Users',
                        data: usersData.data.map(entry => entry.count),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: false
                    },
                    {
                        label: 'New Guiders',
                        data: guidersData.data.map(entry => entry.count),
                        borderColor: 'rgba(255, 206, 86, 1)',
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        fill: false
                    },
                    {
                        label: 'Sites Created',
                        data: sitesData.data.map(entry => entry.count),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false
                    }
                ];

                setStats({ labels, datasets });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Statistics',
                fontSize: 20,
            },
            legend: {
                display: true,
                position: 'bottom' as const,
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Count',
                },
            },
        },
    };
    

    return (
        <div className='container'>
            <div className="row">
                <div className="col">
                    <h2 className='text-center mt-3'>Statistics</h2>
                    <Line data={stats} options={options} />
                </div>
            </div>
        </div>
    );
};

export default StatsChart;
