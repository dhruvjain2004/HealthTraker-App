import React from 'react';
import { format } from 'date-fns';
import { Trash2, Activity, Bed, Utensils, Droplets, TrendingUp } from 'lucide-react';

const Dashboard = ({ healthData, onDelete }) => {
  const calculateStats = () => {
    if (healthData.length === 0) return {};

    const today = new Date().toDateString();
    const todayData = healthData.filter(item => 
      new Date(item.date).toDateString() === today
    );

    const totalCaloriesConsumed = todayData.reduce((sum, item) => 
      sum + (item.calories?.consumed || 0), 0
    );
    const totalCaloriesBurned = todayData.reduce((sum, item) => 
      sum + (item.calories?.burned || 0), 0
    );
    const totalSleep = todayData.reduce((sum, item) => 
      sum + (item.sleep?.hours || 0), 0
    );
    const totalWater = todayData.reduce((sum, item) => 
      sum + (item.water || 0), 0
    );
    const totalSteps = todayData.reduce((sum, item) => 
      sum + (item.steps || 0), 0
    );

    return {
      caloriesConsumed: totalCaloriesConsumed,
      caloriesBurned: totalCaloriesBurned,
      sleep: totalSleep,
      water: totalWater,
      steps: totalSteps,
      netCalories: totalCaloriesConsumed - totalCaloriesBurned
    };
  };

  const stats = calculateStats();

  return (
    <div>
      {/* Today's Stats */}
      <div className="card">
        <h2>Today's Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <Utensils size={24} color="#667eea" />
            <h3>{stats.caloriesConsumed || 0}</h3>
            <p>Calories Consumed</p>
          </div>
          <div className="stat-card">
            <Activity size={24} color="#667eea" />
            <h3>{stats.caloriesBurned || 0}</h3>
            <p>Calories Burned</p>
          </div>
          <div className="stat-card">
            <TrendingUp size={24} color="#667eea" />
            <h3>{stats.netCalories || 0}</h3>
            <p>Net Calories</p>
          </div>
          <div className="stat-card">
            <Bed size={24} color="#667eea" />
            <h3>{stats.sleep || 0}h</h3>
            <p>Sleep Hours</p>
          </div>
          <div className="stat-card">
            <Droplets size={24} color="#667eea" />
            <h3>{stats.water || 0}L</h3>
            <p>Water Intake</p>
          </div>
          <div className="stat-card">
            <Activity size={24} color="#667eea" />
            <h3>{stats.steps || 0}</h3>
            <p>Steps</p>
          </div>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="card">
        <h2>Recent Entries</h2>
        {healthData.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            No health data yet. Add your first entry!
          </p>
        ) : (
          <div>
            {healthData.slice(0, 10).map((entry) => (
              <div key={entry._id} className="workout-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4>{format(new Date(entry.date), 'MMM dd, yyyy')}</h4>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '5px' }}>
                      {entry.calories?.consumed > 0 && (
                        <span>🍽️ {entry.calories.consumed} cal</span>
                      )}
                      {entry.calories?.burned > 0 && (
                        <span>🔥 {entry.calories.burned} cal</span>
                      )}
                      {entry.sleep?.hours > 0 && (
                        <span>😴 {entry.sleep.hours}h</span>
                      )}
                      {entry.water > 0 && (
                        <span>💧 {entry.water}L</span>
                      )}
                      {entry.steps > 0 && (
                        <span>👟 {entry.steps} steps</span>
                      )}
                      {entry.weight && (
                        <span>⚖️ {entry.weight}kg</span>
                      )}
                    </div>
                    {entry.workouts && entry.workouts.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <strong>Workouts:</strong>
                        {entry.workouts.map((workout, index) => (
                          <span key={index} style={{ marginLeft: '10px' }}>
                            {workout.type} ({workout.duration}min)
                          </span>
                        ))}
                      </div>
                    )}
                    {entry.notes && (
                      <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
                        "{entry.notes}"
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(entry._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#dc3545',
                      cursor: 'pointer',
                      padding: '5px'
                    }}
                    title="Delete entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 