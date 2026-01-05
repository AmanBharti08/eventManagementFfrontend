import { useEffect } from 'react';
import useStore from '../store/useStore';
import { eventAPI } from '../services/api';

export const useEvents = (profileId = null) => {
  const { events, setEvents, addEvent, updateEvent, deleteEvent, setLoading, setError } = useStore();

  useEffect(() => {
    if (profileId) {
      loadEvents();
    }
  }, [profileId]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = profileId 
        ? await eventAPI.getByProfile(profileId)
        : await eventAPI.getAll();
      setEvents(data);
    } catch (error) {
      setError(error.message);
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      const newEvent = await eventAPI.create(eventData);
      addEvent(newEvent);
      return newEvent;
    } catch (error) {
      setError(error.message);
      console.error('Error creating event:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const modifyEvent = async (eventId, eventData) => {
    try {
      setLoading(true);
      const updated = await eventAPI.update(eventId, eventData);
      updateEvent(eventId, updated);
      return updated;
    } catch (error) {
      setError(error.message);
      console.error('Error updating event:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeEvent = async (eventId) => {
    try {
      setLoading(true);
      await eventAPI.delete(eventId);
      deleteEvent(eventId);
    } catch (error) {
      setError(error.message);
      console.error('Error deleting event:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    createEvent,
    modifyEvent,
    removeEvent,
    refreshEvents: loadEvents,
  };
};