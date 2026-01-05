import { useState } from 'react';
import { TIMEZONES } from '../utils/timezone';
import { validateEventTitle, validateEventDates, validateProfiles } from '../utils/validation';
import dayjs from 'dayjs';

export const EventForm = ({ profiles, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    profiles: [],
    timezone: 'America/New_York',
    startDate: '',
    startTime: '09:00',
    endDate: '',
    endTime: '17:00',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const titleError = validateEventTitle(formData.title);
    if (titleError) newErrors.title = titleError;

    const profileError = validateProfiles(formData.profiles);
    if (profileError) newErrors.profiles = profileError;

    const dateError = validateEventDates(
      formData.startDate,
      formData.startTime,
      formData.endDate,
      formData.endTime,
      formData.timezone
    );
    if (dateError) newErrors.dates = dateError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleProfileSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, profiles: selected });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">
            {initialData ? 'Update Event' : 'Create New Event'}
          </h3>
          <button onClick={onCancel} className="modal-close">
            ✕
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Event Title *</label>
          <input
            type="text"
            className="form-input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter event title"
          />
          {errors.title && (
            <div className="text-xs" style={{ color: 'var(--danger-color)' }}>
              {errors.title}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter event description"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Assign to Profiles *</label>
          <select
            multiple
            className="form-select"
            value={formData.profiles}
            onChange={handleProfileSelect}
            style={{ height: '100px' }}
          >
            {profiles.map((profile) => (
              <option key={profile._id} value={profile._id}>
                {profile.name} ({profile.timezone})
              </option>
            ))}
          </select>
          <div className="form-hint">Hold Ctrl/Cmd to select multiple profiles</div>
          {errors.profiles && (
            <div className="text-xs" style={{ color: 'var(--danger-color)' }}>
              {errors.profiles}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Event Timezone *</label>
          <select
            className="form-select"
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">Start Date *</label>
            <input
              type="date"
              className="form-input"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Start Time *</label>
            <input
              type="time"
              className="form-input"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="form-label">End Date *</label>
            <input
              type="date"
              className="form-input"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              min={formData.startDate || new Date().toISOString().split('T')[0]}  
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Time *</label>
            <input
              type="time"
              className="form-input"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>
        </div>

        {errors.dates && (
          <div className="text-xs mb-2" style={{ color: 'var(--danger-color)' }}>
            {errors.dates}
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={onCancel} className="btn btn-secondary" style={{ flex: 1 }}>
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary" style={{ flex: 1 }}>
            {initialData ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
};