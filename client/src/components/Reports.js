import React, { useState, useMemo } from 'react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = ({ healthData }) => {
  const [dateRange, setDateRange] = useState(7);

  const filteredData = useMemo(() => {
    const endDate = endOfDay(new Date());
    const startDate = startOfDay(subDays(new Date(), dateRange));
    
    return healthData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [healthData, dateRange]);

  const prepareChartData = () => {
    const labels = filteredData.map(item => format(new Date(item.date), 'MMM dd'));
    
    const caloriesData = {
      labels,
      datasets: [
        {
          label: 'Calories Consumed',
          data: filteredData.map(item => item.calories?.consumed || 0),
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4
        },
        {
          label: 'Calories Burned',
          data: filteredData.map(item => item.calories?.burned || 0),
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          tension: 0.4
        }
      ]
    };

    const sleepData = {
      labels,
      datasets: [
        {
          label: 'Sleep Hours',
          data: filteredData.map(item => item.sleep?.hours || 0),
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          tension: 0.4
        }
      ]
    };

    const waterData = {
      labels,
      datasets: [
        {
          label: 'Water Intake (L)',
          data: filteredData.map(item => item.water || 0),
          borderColor: '#17a2b8',
          backgroundColor: 'rgba(23, 162, 184, 0.1)',
          tension: 0.4
        }
      ]
    };

    const stepsData = {
      labels,
      datasets: [
        {
          label: 'Steps',
          data: filteredData.map(item => item.steps || 0),
          borderColor: '#ffc107',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          tension: 0.4
        }
      ]
    };

    return { caloriesData, sleepData, waterData, stepsData };
  };

  const prepareWorkoutData = () => {
    const workoutTypes = {};
    const workoutIntensities = {};

    filteredData.forEach(item => {
      if (item.workouts) {
        item.workouts.forEach(workout => {
          workoutTypes[workout.type] = (workoutTypes[workout.type] || 0) + 1;
          workoutIntensities[workout.intensity] = (workoutIntensities[workout.intensity] || 0) + 1;
        });
      }
    });

    return {
      workoutTypes: {
        labels: Object.keys(workoutTypes),
        datasets: [{
          data: Object.values(workoutTypes),
          backgroundColor: [
            '#667eea',
            '#28a745',
            '#ffc107',
            '#dc3545',
            '#17a2b8',
            '#6f42c1'
          ]
        }]
      },
      workoutIntensities: {
        labels: Object.keys(workoutIntensities),
        datasets: [{
          data: Object.values(workoutIntensities),
          backgroundColor: [
            '#28a745',
            '#ffc107',
            '#dc3545'
          ]
        }]
      }
    };
  };

  const calculateStats = () => {
    if (filteredData.length === 0) return {};

    const totalCaloriesConsumed = filteredData.reduce((sum, item) => 
      sum + (item.calories?.consumed || 0), 0
    );
    const totalCaloriesBurned = filteredData.reduce((sum, item) => 
      sum + (item.calories?.burned || 0), 0
    );
    const totalSleep = filteredData.reduce((sum, item) => 
      sum + (item.sleep?.hours || 0), 0
    );
    const totalWater = filteredData.reduce((sum, item) => 
      sum + (item.water || 0), 0
    );
    const totalSteps = filteredData.reduce((sum, item) => 
      sum + (item.steps || 0), 0
    );
    const totalWorkouts = filteredData.reduce((sum, item) => 
      sum + (item.workouts?.length || 0), 0
    );

    return {
      avgCaloriesConsumed: Math.round(totalCaloriesConsumed / filteredData.length),
      avgCaloriesBurned: Math.round(totalCaloriesBurned / filteredData.length),
      avgSleep: (totalSleep / filteredData.length).toFixed(1),
      avgWater: (totalWater / filteredData.length).toFixed(1),
      avgSteps: Math.round(totalSteps / filteredData.length),
      totalWorkouts,
      netCalories: totalCaloriesConsumed - totalCaloriesBurned
    };
  };

  const chartData = prepareChartData();
  const workoutData = prepareWorkoutData();
  const stats = calculateStats();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {/* Date Range Selector */}
      <div className="card">
        <h2>Health Reports</h2>
        <div className="form-group">
          <label>Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value))}
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="card">
        <h3>Summary Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.avgCaloriesConsumed || 0}</h3>
            <p>Avg Calories Consumed</p>
          </div>
          <div className="stat-card">
            <h3>{stats.avgCaloriesBurned || 0}</h3>
            <p>Avg Calories Burned</p>
          </div>
          <div className="stat-card">
            <h3>{stats.netCalories || 0}</h3>
            <p>Net Calories</p>
          </div>
          <div className="stat-card">
            <h3>{stats.avgSleep || 0}h</h3>
            <p>Avg Sleep Hours</p>
          </div>
          <div className="stat-card">
            <h3>{stats.avgWater || 0}L</h3>
            <p>Avg Water Intake</p>
          </div>
          <div className="stat-card">
            <h3>{stats.avgSteps || 0}</h3>
            <p>Avg Steps</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalWorkouts || 0}</h3>
            <p>Total Workouts</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid">
        <div className="chart-container">
          <h3>Calories Trend</h3>
          <Line data={chartData.caloriesData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h3>Sleep Hours</h3>
          <Line data={chartData.sleepData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h3>Water Intake</h3>
          <Line data={chartData.waterData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h3>Steps</h3>
          <Line data={chartData.stepsData} options={chartOptions} />
        </div>
      </div>

      {/* Workout Analysis */}
      {stats.totalWorkouts > 0 && (
        <div className="grid">
          <div className="chart-container">
            <h3>Workout Types</h3>
            <Doughnut data={workoutData.workoutTypes} options={chartOptions} />
          </div>

          <div className="chart-container">
            <h3>Workout Intensity</h3>
            <Doughnut data={workoutData.workoutIntensities} options={chartOptions} />
          </div>
        </div>
      )}

      {filteredData.length === 0 && (
        <div className="card">
          <p style={{ textAlign: 'center', color: '#666' }}>
            No data available for the selected date range.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports; 