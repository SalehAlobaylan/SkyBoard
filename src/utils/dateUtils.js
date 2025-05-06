/**
 * Format a date in a user-friendly way
 * @param {Date|string|number} date Date to format
 * @param {string} format Format string (optional)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  const dateObj = date instanceof Date ? date : new Date(date);

  // Return empty string for invalid dates
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString();
    case 'long':
      return dateObj.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'time':
      return dateObj.toLocaleTimeString();
    case 'datetime':
      return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
    case 'medium':
    default:
      return dateObj.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
  }
};

/**
 * Get relative time (e.g., "2 days ago")
 * @param {Date|string|number} date Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = date => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
};
