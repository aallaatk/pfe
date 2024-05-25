import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatisticsDisplay from './StatisticsDisplay';
import ChartDisplay from './ChartDisplay';

interface StatisticsData {
  userCount: number;
  guiderCount: number;
}

const StatisticsDashboard: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticsData>({ userCount: 0, guiderCount: 0 });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get<StatisticsData>('/stats');
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div>
      <StatisticsDisplay userCount={statistics.userCount} guiderCount={statistics.guiderCount} />
      <ChartDisplay userCount={statistics.userCount} guiderCount={statistics.guiderCount} />
    </div>
  );
};

export default StatisticsDashboard;
