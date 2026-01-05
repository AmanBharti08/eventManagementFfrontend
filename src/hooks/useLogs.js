import { useState, useEffect } from 'react';
import { logAPI } from '../services/api';

export const useLogs = (eventId) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventId) {
      loadLogs();
    }
  }, [eventId]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await logAPI.getByEvent(eventId);
      setLogs(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading logs:', err);
    } finally {
      setLoading(false);
    }
  };

  return { logs, loading, error, refreshLogs: loadLogs };
};