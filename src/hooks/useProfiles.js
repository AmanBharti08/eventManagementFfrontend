import { useEffect } from 'react';
import useStore from '../store/useStore';
import { profileAPI } from '../services/api';

export const useProfiles = () => {
  const { profiles, setProfiles, addProfile, updateProfile, setLoading, setError } = useStore();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await profileAPI.getAll();
      setProfiles(data);
    } catch (error) {
      setError(error.message);
      console.error('Error loading profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData) => {
    try {
      setLoading(true);
      const newProfile = await profileAPI.create(profileData);
      addProfile(newProfile);
      return newProfile;
    } catch (error) {
      setError(error.message);
      console.error('Error creating profile:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changeTimezone = async (profileId, timezone) => {
    try {
      setLoading(true);
      const updated = await profileAPI.updateTimezone(profileId, timezone);
      updateProfile(profileId, updated);
      return updated;
    } catch (error) {
      setError(error.message);
      console.error('Error updating timezone:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    profiles,
    createProfile,
    changeTimezone,
    refreshProfiles: loadProfiles,
  };
};