import { useState, useEffect } from 'react';
import useStore from './store/useStore';
import { useProfiles } from './hooks/useProfiles';
import { useEvents } from './hooks/useEvents';
import { ProfileForm } from './components/ProfileForm';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import { LogsModal } from './components/LogsModal';
import { TIMEZONES, getCurrentTime } from './utils/timezone';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

function App() {
  const { currentProfile, setCurrentProfile } = useStore();
  const { profiles, createProfile, changeTimezone } = useProfiles();
  const { events, createEvent, modifyEvent, removeEvent } = useEvents(currentProfile?._id);

  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingLogs, setViewingLogs] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  // Set initial profile when profiles load
  useEffect(() => {
    if (profiles.length > 0 && !currentProfile) {
      setCurrentProfile(profiles[0]);
    }
  }, [profiles, currentProfile, setCurrentProfile]);

  // Update current time every minute
  useEffect(() => {
    if (currentProfile) {
      setCurrentTime(getCurrentTime(currentProfile.timezone));
      const interval = setInterval(() => {
        setCurrentTime(getCurrentTime(currentProfile.timezone));
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [currentProfile]);

  const handleCreateProfile = async (profileData) => {
    try {
      const newProfile = await createProfile(profileData);
      setShowProfileForm(false);
      if (!currentProfile) {
        setCurrentProfile(newProfile);
      }
    } catch (error) {
      alert('Failed to create profile: ' + error.message);
    }
  };

  const handleProfileChange = (profileId) => {
    const profile = profiles.find(p => p._id === profileId);
    setCurrentProfile(profile);
  };

  const handleTimezoneChange = async (timezone) => {
    if (currentProfile) {
      try {
        await changeTimezone(currentProfile._id, timezone);
        setCurrentProfile({ ...currentProfile, timezone });
      } catch (error) {
        alert('Failed to update timezone: ' + error.message);
      }
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      const startDateTime = dayjs.tz(
        `${eventData.startDate} ${eventData.startTime}`,
        eventData.timezone
      ).toISOString();
      
      const endDateTime = dayjs.tz(
        `${eventData.endDate} ${eventData.endTime}`,
        eventData.timezone
      ).toISOString();

      const payload = {
        title: eventData.title,
        description: eventData.description,
        profiles: eventData.profiles,
        timezone: eventData.timezone,
        startDate: startDateTime,
        endDate: endDateTime,
      };

      if (editingEvent) {
        await modifyEvent(editingEvent._id, payload);
      } else {
        await createEvent(payload);
      }

      setShowEventForm(false);
      setEditingEvent(null);
    } catch (error) {
      alert('Failed to save event: ' + error.message);
    }
  };

  const handleEditEvent = (event) => {
    const userTz = currentProfile?.timezone || 'America/New_York';
    const startInUserTz = dayjs(event.startDate).tz(userTz);
    const endInUserTz = dayjs(event.endDate).tz(userTz);

    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await removeEvent(eventId);
      } catch (error) {
        alert('Failed to delete event: ' + error.message);
      }
    }
  };

  const handleViewLogs = (event) => {
    setViewingLogs(event);
  };

  const getInitialEventData = () => {
    if (editingEvent) {
      const userTz = currentProfile?.timezone || 'America/New_York';
      const startInUserTz = dayjs(editingEvent.startDate).tz(userTz);
      const endInUserTz = dayjs(editingEvent.endDate).tz(userTz);

      return {
        title: editingEvent.title,
        description: editingEvent.description,
        profiles: editingEvent.profiles.map(p => p._id || p),
        timezone: editingEvent.timezone,
        startDate: startInUserTz.format('YYYY-MM-DD'),
        startTime: startInUserTz.format('HH:mm'),
        endDate: endInUserTz.format('YYYY-MM-DD'),
        endTime: endInUserTz.format('HH:mm'),
      };
    }

    return {
      title: '',
      description: '',
      profiles: currentProfile ? [currentProfile._id] : [],
      timezone: currentProfile?.timezone || 'America/New_York',
      startDate: '',
      startTime: '09:00',
      endDate: '',
      endTime: '17:00',
    };
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div>
            <h1 className="header-title">Event Management</h1>
            <p className="header-subtitle">Create and manage events across multiple timezones</p>
          </div>
          <button onClick={() => setShowProfileForm(true)} className="btn btn-primary">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* Profile Section */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Current Profile</h2>
            <span className="text-sm text-secondary">{profiles.length} profiles</span>
          </div>

          {profiles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-title">No profiles yet</div>
              <div className="empty-state-description">Create your first profile to get started</div>
            </div>
          ) : (
            <div className="grid grid-cols-3">
              <div className="form-group">
                <label className="form-label">Select Profile</label>
                <select
                  className="form-select"
                  value={currentProfile?._id || ''}
                  onChange={(e) => handleProfileChange(e.target.value)}
                >
                  {profiles.map((profile) => (
                    <option key={profile._id} value={profile._id}>
                      {profile.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Timezone</label>
                <select
                  className="form-select"
                  value={currentProfile?.timezone || 'America/New_York'}
                  onChange={(e) => handleTimezoneChange(e.target.value)}
                  disabled={!currentProfile}
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Current Time</label>
                <div className="form-input" style={{ backgroundColor: 'var(--secondary-color)' }}>
                  {currentTime || 'Select a profile'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Events Section */}
        {currentProfile && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">My Events</h2>
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setShowEventForm(true);
                }}
                className="btn btn-primary"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </button>
            </div>

            <EventList
              events={events}
              timezone={currentProfile.timezone}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              onViewLogs={handleViewLogs}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {showProfileForm && (
        <ProfileForm
          onSubmit={handleCreateProfile}
          onCancel={() => setShowProfileForm(false)}
        />
      )}

      {showEventForm && (
        <EventForm
          profiles={profiles}
          initialData={getInitialEventData()}
          onSubmit={handleCreateEvent}
          onCancel={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
        />
      )}

      {viewingLogs && (
        <LogsModal
          event={viewingLogs}
          timezone={currentProfile?.timezone || 'America/New_York'}
          onClose={() => setViewingLogs(null)}
        />
      )}
    </div>
  );
}

export default App;