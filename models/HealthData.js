const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  calories: {
    consumed: {
      type: Number,
      default: 0
    },
    burned: {
      type: Number,
      default: 0
    }
  },
  sleep: {
    hours: {
      type: Number,
      default: 0
    },
    quality: {
      type: String,
      enum: ['Poor', 'Fair', 'Good', 'Excellent'],
      default: 'Fair'
    }
  },
  workouts: [{
    type: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    intensity: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    caloriesBurned: {
      type: Number,
      default: 0
    }
  }],
  weight: {
    type: Number,
    default: null
  },
  water: {
    type: Number,
    default: 0
  },
  steps: {
    type: Number,
    default: 0
  },
  mood: {
    type: String,
    enum: ['Very Bad', 'Bad', 'Neutral', 'Good', 'Excellent'],
    default: 'Neutral'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for efficient date-based queries
healthDataSchema.index({ date: -1 });

module.exports = mongoose.model('HealthData', healthDataSchema); 