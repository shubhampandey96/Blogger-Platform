// src/api.js
import axios from 'axios';

// Base URL comes from .env file
// Example: VITE_API_URL=https://your-backend.vercel.app/api
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
