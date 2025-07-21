const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/health-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Models
const HealthData = require('./models/HealthData');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Health Tracker API is running' });
});

// Get all health data
app.get('/api/health-data', async (req, res) => {
  try {
    const data = await HealthData.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add health data
app.post('/api/health-data', async (req, res) => {
  try {
    const healthData = new HealthData(req.body);
    const savedData = await healthData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get health data by date range
app.get('/api/health-data/range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await HealthData.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update health data
app.put('/api/health-data/:id', async (req, res) => {
  try {
    const updatedData = await HealthData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete health data
app.delete('/api/health-data/:id', async (req, res) => {
  try {
    await HealthData.findByIdAndDelete(req.params.id);
    res.json({ message: 'Health data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 