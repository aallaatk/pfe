import { useState, useEffect } from 'react';
import Stats from '../Components/Stats';
import axios from 'axios';
import SideBar from '../Components/SideBar';

function Dashboard() {
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
        <div className='container'>
            <div className="row">
                <h2 className='text-center' style={{letterSpacing:'0.25em',fontWeight:'bold',color:'#2b2881'}}>Tunisian Heritage-Djerba V1.0</h2>
            </div>
            
            <Stats
                tours={stats.tours}
                users={stats.users}
                sites={stats.sites}
                guiders={stats.guiders}
            />
            <SideBar/>
            <Dashboard/>
        </div>
    );
}

export default Dashboard;
