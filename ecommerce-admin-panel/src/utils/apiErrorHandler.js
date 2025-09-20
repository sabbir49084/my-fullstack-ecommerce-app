// src/utils/apiErrorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', error.response.data);
    console.error('API Error Status:', error.response.status);
    console.error('API Error Headers:', error.response.headers);
    
    const message = error.response.data?.message || `Server error: ${error.response.status}`;
    return { message, status: error.response.status };
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error Request:', error.request);
    return { message: 'Network error: No response from server', status: 0 };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Error Message:', error.message);
    return { message: error.message, status: 0 };
  }
};

export const getErrorMessage = (error) => {
  const errorInfo = handleApiError(error);
  return errorInfo.message;
};