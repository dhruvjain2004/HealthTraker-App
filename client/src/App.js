import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Dashboard from './components/Dashboard';
import AddEntry from './components/AddEntry';
import Reports from './components/Reports';
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
      const response = await axios.get('/api/health-data');
      setHealthData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching health data:', error);
      setLoading(false);
    }
  };

  const addHealthData = async (data) => {
    try {
      const response = await axios.post('/api/health-data', data);
      setHealthData([response.data, ...healthData]);
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Error adding health data:', error);
    }
  };

  const deleteHealthData = async (id) => {
    try {
      await axios.delete(`/api/health-data/${id}`);
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
        <h1>Health Tracker</h1>
        <p>Track your calories, sleep, workouts and more</p>
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