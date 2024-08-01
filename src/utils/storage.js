import { getWeekStartDate } from './dateUtils.js';

export const storage = {
  eventIdToDelete: null,
  displayedWeekStart: getWeekStartDate(new Date()),
  events: [],
};

export const setItem = (key, value) => Object.assign(storage, { [key]: value });
export const getItem = key => storage[key];
