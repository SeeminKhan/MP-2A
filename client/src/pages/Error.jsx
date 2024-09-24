import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Error Code */}
      <h1 className="text-6xl md:text-9xl font-bold mb-4">404</h1>

      {/* Error Message */}
      <p className="text-base md:text-xl mb-6 max-w-lg text-center px-4">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>

      {/* Decorative Line */}
      <div className="h-1 w-24 md:w-32 bg-gray-500 mb-6"></div>

      {/* Navigation Buttons */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link
          to="/"
          className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-full text-base md:text-lg font-semibold hover:bg-gray-200 transition"
        >
          Back to Home
        </Link>
        <Link
          to="/shop"
          className="bg-transparent border border-white text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-base md:text-lg font-semibold hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Optional Decorative Background Element */}
      <div className="absolute bottom-0 right-0 left-0 z-0 opacity-10 hidden md:block">
        <h1 className="text-[100px] md:text-[200px] font-bold text-gray-400 text-center">
          404
        </h1>
      </div>
    </div>
  );
};

export default ErrorPage;
