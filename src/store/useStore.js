import { create } from 'zustand';

const useStore = create((set) => ({
  // State
  profiles: [],
  currentProfile: null,
  events: [],
  logs: [],
  loading: false,
  error: null,

  // Profile Actions
  setProfiles: (profiles) => set({ profiles }),
  
  addProfile: (profile) => set((state) => ({ 
    profiles: [...state.profiles, profile] 
  })),
  
  setCurrentProfile: (profile) => set({ currentProfile: profile }),
  
  updateProfile: (id, updates) => set((state) => ({
    profiles: state.profiles.map(p => p._id === id ? { ...p, ...updates } : p),
    currentProfile: state.currentProfile?._id === id 
      ? { ...state.currentProfile, ...updates } 
      : state.currentProfile
  })),

  // Event Actions
  setEvents: (events) => set({ events }),
  
  addEvent: (event) => set((state) => ({ 
    events: [...state.events, event] 
  })),
  
  updateEvent: (id, updates) => set((state) => ({
    events: state.events.map(e => e._id === id ? { ...e, ...updates } : e)
  })),
  
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter(e => e._id !== id)
  })),

  // Log Actions
  setLogs: (logs) => set({ logs }),

  // UI Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useStore;