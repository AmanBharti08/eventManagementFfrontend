import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Asia/Dubai',
  'Australia/Sydney',
  'Pacific/Auckland',
  'UTC'
];

export const formatInTimezone = (date, tz, format = 'MMM DD, YYYY hh:mm A') => {
  return dayjs(date).tz(tz).format(format);
};

export const convertToTimezone = (date, fromTz, toTz) => {
  return dayjs.tz(date, fromTz).tz(toTz);
};

export const validateDateRange = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.isAfter(start) || end.isSame(start);
};

export const getCurrentTime = (tz) => {
  return dayjs().tz(tz).format('MMM DD, YYYY hh:mm A');
};

export const createDateTimeString = (date, time, tz) => {
  return dayjs.tz(`${date} ${time}`, tz).toISOString();
};