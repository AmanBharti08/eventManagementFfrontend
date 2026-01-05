import { useState } from 'react';
import { validateProfileName } from '../utils/validation';
import { TIMEZONES } from '../utils/timezone';

export const ProfileForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('America/New_York');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const validationError = validateProfileName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit({ name: name.trim(), timezone });
    setName('');
    setError('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Create New Profile</h3>
          <button onClick={onCancel} className="modal-close">
            ✕
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Profile Name</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter profile name"
          />
          {error && <div className="text-xs" style={{ color: 'var(--danger-color)' }}>{error}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Default Timezone</label>
          <select
            className="form-select"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button onClick={onCancel} className="btn btn-secondary" style={{ flex: 1 }}>
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary" style={{ flex: 1 }}>
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};