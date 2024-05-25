import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

interface ChartProps {
  userCount: number;
  guiderCount: number;
}

const ChartDisplay: React.FC<ChartProps> = ({ userCount, guiderCount }) => {
  const chartRef = useRef<Chart<'bar'>>();
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const chartCanvas = chartCanvasRef.current;

    if (!chartCanvas) return;

    // Destroy existing chart instance if it already exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const chartData = {
      labels: ['Users', 'Guiders'],
      datasets: [
        {
          label: 'Count',
          data: [userCount, guiderCount],
          backgroundColor: ['#007BFF', '#28A745'], // Blue for Users, Green for Guiders
        },
      ],
    };

    const chartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    chartRef.current = new Chart(chartCanvas, chartConfig);

    return () => {
      // Cleanup function to destroy chart instance when component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [userCount, guiderCount]);

  return <canvas ref={chartCanvasRef} id="statisticsChart" width="400" height="200"></canvas>;
};

export default ChartDisplay;
