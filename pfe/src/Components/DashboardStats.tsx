import { useState, useEffect } from 'react';

import axios from 'axios';

import Stats from './Stats';

import DashUserChart from './DashUserChart';
import DashTourChart from './DashTourStats';
import PieUserChart from './PieUserchart';
import PieTourChart from './PieTourChart';

import LineChart from './LineChart';

function DashboardStats() {
    const [stats, setStats] = useState({
        tours: 0,
        users: 0,
        sites: 0,
        guiders: 0
    });

    useEffect(() => {
        fetchStats(); // Fetch statistics data when component mounts
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('http://localhost:3000/stats'); // Fetch data from backend
            const data = response.data; // Extract data from axios response
            setStats(data); // Update component state with fetched statistics
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };
    
    return (
       
            <><Stats
            tours={stats.tours}
            users={stats.users}
            sites={stats.sites}
            guiders={stats.guiders} />
           <LineChart/>
            <DashUserChart/>
            <DashTourChart/>
            <div className='container'>
            <div className="row">
                <div className="col-sm-6">
            <PieUserChart/>
            </div>
            <div className="col-sm-6">
            
            <PieTourChart/>
            </div>
            </div>
        </div>
        
                </>

    );
}

export default DashboardStats;