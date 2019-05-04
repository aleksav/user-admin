export const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const loggerFlushInterval = parseInt(process.env.LOGGER_FLUSH_INTERVAL, 10) || 60 * 1000;
