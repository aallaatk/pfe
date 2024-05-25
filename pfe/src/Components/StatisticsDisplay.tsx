import React from 'react';

interface StatisticsProps {
  userCount: number;
  guiderCount: number;
}

const StatisticsDisplay: React.FC<StatisticsProps> = ({ userCount, guiderCount }) => {
  return (
    <div>
      <h2>Statistics Dashboard</h2>
      <div>
        <p>Total Users: {userCount}</p>
        <p>Total Guiders: {guiderCount}</p>
      </div>
    </div>
  );
};

export default StatisticsDisplay;
