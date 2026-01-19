/**
 * Date utility functions for TaskZen
 */

/**
 * Formats a timestamp to a readable date string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
  });
};

/**
 * Formats a timestamp to a date input value (YYYY-MM-DD)
 */
export const toDateInputValue = (timestamp?: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toISOString().split('T')[0];
};

/**
 * Parses a date input value to timestamp
 */
export const fromDateInputValue = (value: string): number | undefined => {
  if (!value) return undefined;
  const date = new Date(value + 'T00:00:00');
  return date.getTime();
};

/**
 * Checks if a date is overdue (before today)
 */
export const isOverdue = (timestamp?: number): boolean => {
  if (!timestamp) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return timestamp < today.getTime();
};

/**
 * Checks if a date is today
 */
export const isToday = (timestamp?: number): boolean => {
  if (!timestamp) return false;
  const date = new Date(timestamp);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Checks if a date is tomorrow
 */
export const isTomorrow = (timestamp?: number): boolean => {
  if (!timestamp) return false;
  const date = new Date(timestamp);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

/**
 * Gets a human-readable relative date string
 */
export const getRelativeDate = (timestamp?: number): string => {
  if (!timestamp) return '';
  if (isToday(timestamp)) return 'Today';
  if (isTomorrow(timestamp)) return 'Tomorrow';
  if (isOverdue(timestamp)) return `Overdue: ${formatDate(timestamp)}`;
  return formatDate(timestamp);
};

/**
 * Gets the number of days until a date
 */
export const daysUntil = (timestamp?: number): number | null => {
  if (!timestamp) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(timestamp);
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
