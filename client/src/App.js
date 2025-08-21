import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Dashboard from './components/Dashboard';
import AddEntry from './components/AddEntry';
import Reports from './components/Reports';
import { API_ENDPOINTS, APP_CONFIG } from './config/api';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      if (APP_CONFIG.DEBUG_MODE) {
        console.log('Fetching health data from:', API_ENDPOINTS.HEALTH_DATA);
      }
      const response = await axios.get(API_ENDPOINTS.HEALTH_DATA);
      setHealthData(response.data);
      setLoading(false);
      if (APP_CONFIG.DEBUG_MODE) {
        console.log('Health data fetched successfully:', response.data.length, 'entries');
      }
    } catch (error) {
      console.error('Error fetching health data:', error);
      setLoading(false);
    }
  };

  const addHealthData = async (data) => {
    try {
      const response = await axios.post(API_ENDPOINTS.HEALTH_DATA, data);
      setHealthData([response.data, ...healthData]);
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Error adding health data:', error);
    }
  };

  const deleteHealthData = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINTS.HEALTH_DATA}/${id}`);
      setHealthData(healthData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting health data:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard healthData={healthData} onDelete={deleteHealthData} />;
      case 'add':
        return <AddEntry onAdd={addHealthData} />;
      case 'reports':
        return <Reports healthData={healthData} />;
      default:
        return <Dashboard healthData={healthData} onDelete={deleteHealthData} />;
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>Health Tracker</h1>
          <p>Loading your health data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{APP_CONFIG.NAME}</h1>
        <p>Track your calories, sleep, workouts and more</p>
        {APP_CONFIG.DEBUG_MODE && (
          <small style={{ color: '#666', fontSize: '12px' }}>
            Version: {APP_CONFIG.VERSION} | API: {API_ENDPOINTS.HEALTH_DATA}
          </small>
        )}
      </div>

      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Entry
        </button>
        <button
          className={`nav-tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>

      {renderContent()}
    </div>
  );
}

export default App; 