import { formatInTimezone } from '../utils/timezone';

export const EventList = ({ events, timezone, onEdit, onDelete, onViewLogs }) => {
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div className="empty-state-title">No events found</div>
        <div className="empty-state-description">Create your first event to get started</div>
      </div>
    );
  }

  return (
    <div>
      {events.map((event) => (
        <div key={event._id} className="event-item">
          <div className="event-header">
            <div style={{ flex: 1 }}>
              <h3 className="event-title">{event.title}</h3>
              {event.description && (
                <p className="event-description">{event.description}</p>
              )}
              
              <div className="event-meta">
                <div className="event-meta-item">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    {formatInTimezone(event.startDate, timezone)} - {formatInTimezone(event.endDate, timezone)}
                  </span>
                </div>
                <div className="event-meta-item">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{event.profiles.length} profile(s)</span>
                </div>
              </div>

              <div className="text-xs text-secondary mt-1">
                Event Timezone: {event.timezone} | Viewing in: {timezone}
              </div>
            </div>

            <div className="event-actions">
              <button
                onClick={() => onViewLogs(event)}
                className="btn-icon"
                title="View History"
                style={{ color: 'var(--primary-color)' }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                onClick={() => onEdit(event)}
                className="btn-icon"
                title="Edit Event"
                style={{ color: 'var(--success-color)' }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(event._id)}
                className="btn-icon"
                title="Delete Event"
                style={{ color: 'var(--danger-color)' }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};