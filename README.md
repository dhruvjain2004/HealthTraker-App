# Health Tracker App

A comprehensive health tracking application built with React, Node.js, MongoDB, and Chart.js for visualizing health data.

## Features

- **Health Data Tracking**: Track calories, sleep, workouts, water intake, steps, weight, and mood
- **Dashboard**: View daily statistics and recent entries
- **Reports & Analytics**: Interactive charts showing trends over time
- **Workout Management**: Add multiple workouts with type, duration, intensity, and calories burned
- **Modern UI**: Clean, responsive design with beautiful gradients and animations

## Tech Stack

- **Frontend**: React, Chart.js, Lucide React Icons
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Styling**: Custom CSS with modern design principles

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd health-tracker
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `health-tracker`
   - Update the MongoDB connection string in `server.js` if needed

5. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/health-tracker
   PORT=5000
   NODE_ENV=development
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev
   ```

2. **Start the React frontend** (in a new terminal)
   ```bash
   npm run client
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/health-data` - Get all health data
- `POST /api/health-data` - Add new health entry
- `GET /api/health-data/range` - Get data by date range
- `PUT /api/health-data/:id` - Update health entry
- `DELETE /api/health-data/:id` - Delete health entry

## Data Structure

```javascript
{
  date: Date,
  calories: {
    consumed: Number,
    burned: Number
  },
  sleep: {
    hours: Number,
    quality: String // 'Poor', 'Fair', 'Good', 'Excellent'
  },
  workouts: [{
    type: String,
    duration: Number,
    intensity: String, // 'Low', 'Medium', 'High'
    caloriesBurned: Number
  }],
  weight: Number,
  water: Number,
  steps: Number,
  mood: String, // 'Very Bad', 'Bad', 'Neutral', 'Good', 'Excellent'
  notes: String
}
```

## Features Overview

### Dashboard
- Daily statistics overview
- Recent entries with quick actions
- Visual indicators for different health metrics

### Add Entry
- Comprehensive form for all health metrics
- Dynamic workout addition
- Date selection and validation

### Reports
- Interactive charts using Chart.js
- Date range filtering
- Multiple chart types (Line, Doughnut)
- Statistical summaries

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub. 