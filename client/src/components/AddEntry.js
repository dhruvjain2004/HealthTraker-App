import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const AddEntry = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    calories: {
      consumed: '',
      burned: ''
    },
    sleep: {
      hours: '',
      quality: 'Fair'
    },
    workouts: [],
    weight: '',
    water: '',
    steps: '',
    mood: 'Neutral',
    notes: ''
  });

  const [newWorkout, setNewWorkout] = useState({
    type: '',
    duration: '',
    intensity: 'Medium',
    caloriesBurned: ''
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addWorkout = () => {
    if (newWorkout.type && newWorkout.duration) {
      setFormData(prev => ({
        ...prev,
        workouts: [...prev.workouts, { ...newWorkout }]
      }));
      setNewWorkout({
        type: '',
        duration: '',
        intensity: 'Medium',
        caloriesBurned: ''
      });
    }
  };

  const removeWorkout = (index) => {
    setFormData(prev => ({
      ...prev,
      workouts: prev.workouts.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clean up the data
    const cleanData = {
      ...formData,
      calories: {
        consumed: Number(formData.calories.consumed) || 0,
        burned: Number(formData.calories.burned) || 0
      },
      sleep: {
        hours: Number(formData.sleep.hours) || 0,
        quality: formData.sleep.quality
      },
      weight: formData.weight ? Number(formData.weight) : null,
      water: Number(formData.water) || 0,
      steps: Number(formData.steps) || 0,
      workouts: formData.workouts.map(workout => ({
        ...workout,
        duration: Number(workout.duration),
        caloriesBurned: Number(workout.caloriesBurned) || 0
      }))
    };

    onAdd(cleanData);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      calories: { consumed: '', burned: '' },
      sleep: { hours: '', quality: 'Fair' },
      workouts: [],
      weight: '',
      water: '',
      steps: '',
      mood: 'Neutral',
      notes: ''
    });
  };

  return (
    <div className="card">
      <h2>Add Health Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          {/* Date */}
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              required
            />
          </div>

          {/* Calories */}
          <div className="form-group">
            <label>Calories Consumed</label>
            <input
              type="number"
              placeholder="Enter calories consumed"
              value={formData.calories.consumed}
              onChange={(e) => handleInputChange('calories.consumed', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Calories Burned</label>
            <input
              type="number"
              placeholder="Enter calories burned"
              value={formData.calories.burned}
              onChange={(e) => handleInputChange('calories.burned', e.target.value)}
            />
          </div>

          {/* Sleep */}
          <div className="form-group">
            <label>Sleep Hours</label>
            <input
              type="number"
              step="0.5"
              placeholder="Enter sleep hours"
              value={formData.sleep.hours}
              onChange={(e) => handleInputChange('sleep.hours', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Sleep Quality</label>
            <select
              value={formData.sleep.quality}
              onChange={(e) => handleInputChange('sleep.quality', e.target.value)}
            >
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>

          {/* Weight and Water */}
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              placeholder="Enter weight"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Water Intake (L)</label>
            <input
              type="number"
              step="0.1"
              placeholder="Enter water intake"
              value={formData.water}
              onChange={(e) => handleInputChange('water', e.target.value)}
            />
          </div>

          {/* Steps and Mood */}
          <div className="form-group">
            <label>Steps</label>
            <input
              type="number"
              placeholder="Enter steps count"
              value={formData.steps}
              onChange={(e) => handleInputChange('steps', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mood</label>
            <select
              value={formData.mood}
              onChange={(e) => handleInputChange('mood', e.target.value)}
            >
              <option value="Very Bad">Very Bad</option>
              <option value="Bad">Bad</option>
              <option value="Neutral">Neutral</option>
              <option value="Good">Good</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>
        </div>

        {/* Workouts Section */}
        <div className="card" style={{ marginTop: '20px' }}>
          <h3>Workouts</h3>
          
          {/* Add Workout Form */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '10px', alignItems: 'end', marginBottom: '20px' }}>
            <div className="form-group">
              <label>Workout Type</label>
              <input
                type="text"
                placeholder="e.g., Running, Yoga, Gym"
                value={newWorkout.type}
                onChange={(e) => setNewWorkout(prev => ({ ...prev, type: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Duration (min)</label>
              <input
                type="number"
                placeholder="30"
                value={newWorkout.duration}
                onChange={(e) => setNewWorkout(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Intensity</label>
              <select
                value={newWorkout.intensity}
                onChange={(e) => setNewWorkout(prev => ({ ...prev, intensity: e.target.value }))}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Calories Burned</label>
              <input
                type="number"
                placeholder="200"
                value={newWorkout.caloriesBurned}
                onChange={(e) => setNewWorkout(prev => ({ ...prev, caloriesBurned: e.target.value }))}
              />
            </div>
            <button
              type="button"
              onClick={addWorkout}
              className="btn"
              style={{ padding: '12px', minWidth: 'auto' }}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Workouts List */}
          {formData.workouts.length > 0 && (
            <div>
              <h4>Added Workouts:</h4>
              {formData.workouts.map((workout, index) => (
                <div key={index} className="workout-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{workout.type}</strong> - {workout.duration}min ({workout.intensity})
                      {workout.caloriesBurned && ` - ${workout.caloriesBurned} cal`}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeWorkout(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc3545',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="form-group">
          <label>Notes</label>
          <textarea
            placeholder="Add any additional notes about your day..."
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows="3"
          />
        </div>

        <button type="submit" className="btn">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default AddEntry; 