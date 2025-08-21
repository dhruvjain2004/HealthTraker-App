const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  HEALTH_CHECK: `${API_BASE_URL}/api/health`,
  HEALTH_DATA: `${API_BASE_URL}/api/health-data`,
  HEALTH_DATA_RANGE: `${API_BASE_URL}/api/health-data/range`,
};

export const APP_CONFIG = {
  NAME: process.env.REACT_APP_APP_NAME || 'Health Tracker',
  VERSION: process.env.REACT_APP_APP_VERSION || '1.0.0',
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  DEBUG_MODE: process.env.REACT_APP_ENABLE_DEBUG_MODE === 'true',
};

export default API_BASE_URL;
