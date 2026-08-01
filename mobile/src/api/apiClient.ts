import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// We use your computer's local IP address because the Android/iOS emulator 
// cannot connect to "localhost". 
// Replace "YOUR_LOCAL_IP" with your actual Wi-Fi IP address (e.g. 192.168.1.100)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.39:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// -----------------------------------------------------------
// REQUEST INTERCEPTOR:
// Automatically attach the JWT Token to every request we send!
// -----------------------------------------------------------
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Fetch the token securely from the phone's encrypted storage
      const token = await SecureStore.getItemAsync('jwt_token');

      // 2. If a token exists, attach it to the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token from SecureStore', error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// -----------------------------------------------------------
// RESPONSE INTERCEPTOR:
// Handle global errors (like when a token expires)
// -----------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized! Token is missing or expired.');
      // NOTE: In the future, you can automatically log the user out here 
      // or redirect them to the Login screen if they get a 401.
    }
    return Promise.reject(error);
  }
);

export default apiClient;
