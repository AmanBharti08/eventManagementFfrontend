import { useLogs } from '../hooks/useLogs';
import { formatInTimezone } from '../utils/timezone';

export const LogsModal = ({ event, timezone, onClose }) => {
  const { logs, loading } = useLogs(event._id);

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: '48rem' }}>
        <div className="modal-header">
          <h3 className="modal-title">Event Update History</h3>
          <button onClick={onClose} className="modal-close">
            ✕
          </button>
        </div>

        <div className="card" style={{ marginBottom: '1rem', backgroundColor: 'var(--secondary-color)' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{event.title}</h4>
          <p className="text-sm text-secondary">Viewing logs in timezone: {timezone}</p>
        </div>

        {loading ? (
          <div className="text-center" style={{ padding: '2rem' }}>Loading logs...</div>
        ) : logs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-title">No update history</div>
            <div className="empty-state-description">This event hasn't been modified yet</div>
          </div>
        ) : (
          <div>
            {logs.map((log) => (
              <div key={log._id} className="log-entry">
                <div className="log-header">
                  <span className="text-sm" style={{ fontWeight: 500 }}>Update</span>
                  <span className="text-xs text-secondary">
                    {formatInTimezone(log.timestamp, timezone)}
                  </span>
                </div>

                {log.changes.title && (
                  <div className="log-change">
                    <div>
                      <div className="text-xs text-secondary">Title (old)</div>
                      <div className="text-sm log-old">{log.previousValues.title}</div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary">Title (new)</div>
                      <div className="text-sm log-new">{log.newValues.title}</div>
                    </div>
                  </div>
                )}

                {log.changes.startDate && (
                  <div className="log-change">
                    <div>
                      <div className="text-xs text-secondary">Start (old)</div>
                      <div className="text-sm log-old">
                        {formatInTimezone(log.previousValues.startDate, timezone)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary">Start (new)</div>
                      <div className="text-sm log-new">
                        {formatInTimezone(log.newValues.startDate, timezone)}
                      </div>
                    </div>
                  </div>
                )}

                {log.changes.endDate && (
                  <div className="log-change">
                    <div>
                      <div className="text-xs text-secondary">End (old)</div>
                      <div className="text-sm log-old">
                        {formatInTimezone(log.previousValues.endDate, timezone)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary">End (new)</div>
                      <div className="text-sm log-new">
                        {formatInTimezone(log.newValues.endDate, timezone)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};