// src/ChartContainer.tsx

import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface UserData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

const UserChart: React.FC = () => {
  const [chartData, setChartData] = useState<UserData>({
    labels: [],
    datasets: [{
      label: 'New Users per Day',
      data: [],
    }],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response: AxiosResponse<UserData> = await axios.get('http://localhost:3000/users/chart');
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const getMaxDataValue = () => {
    // Find the maximum data value for scaling the bars
    return Math.max(...chartData.datasets[0].data.flat());
  };

  const renderBars = () => {
    const maxDataValue = getMaxDataValue();
    return chartData.datasets.map((dataset, index) => (
      <rect
        key={index}
        x={(index * 100) + 50} // Adjust spacing and positioning as needed
        y={400 - (dataset.data[0] / maxDataValue) * 400} // Scale based on max value
        width="80"
        height={(dataset.data[0] / maxDataValue) * 400}
        fill={index === 0 ? 'rgba(75, 192, 192, 1)' : 'another color'} // Set bar colors
      />
    ));
  };

  return (
    <div>
      <h2>New Users per Day</h2>
      <svg width="600" height="400">
        <g>{renderBars()}</g>  {/* Group bars for better styling */}
        {/* Add axis lines and labels if needed */}
      </svg>
    </div>
  );
};

export default UserChart;
