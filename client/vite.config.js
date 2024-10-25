import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Determine if we are in production mode
const isProduction = process.env.NODE_ENV === 'production';

// Set the API URL based on the environment
const apiUrl = isProduction 
  ? 'https://server-y9qa.onrender.com' // Update with your production API URL
  : 'http://localhost:5000'; // Development API URL

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_API_URL: apiUrl, // Make the API URL available in the app
    },
  },
  server: {
    // Only use proxy during development
    ...(isProduction ? {} : {
      proxy: {
        "/api/": "http://localhost:5000",
        "/uploads/": "http://localhost:5000",
      },
    }),
  },
});
