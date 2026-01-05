export const validateProfileName = (name) => {
  if (!name || name.trim() === '') {
    return 'Name is required';
  }
  if (name.length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.length > 50) {
    return 'Name must be less than 50 characters';
  }
  return null;
};

export const validateEventTitle = (title) => {
  if (!title || title.trim() === '') {
    return 'Title is required';
  }
  if (title.length < 3) {
    return 'Title must be at least 3 characters';
  }
  if (title.length > 100) {
    return 'Title must be less than 100 characters';
  }
  return null;
};

export const validateEventDates = (startDate, startTime, endDate, endTime, timezone) => {
  if (!startDate || !endDate) {
    return 'Start and end dates are required';
  }

  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid date format';
  }

  if (end <= start) {
    return 'End date/time must be after start date/time';
  }

  return null;
};

export const validateProfiles = (profiles) => {
  if (!profiles || profiles.length === 0) {
    return 'At least one profile must be selected';
  }
  return null;
};