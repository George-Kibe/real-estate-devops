"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const ErrorPage = () => {
  const router = useRouter()
  const goBack = () => {
    router.back();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-8">Something went wrong.</p>
      {/* <img
        className="w-64 h-auto"
        src="/error-image.png"
        alt="Error"
      /> */}
      <button onClick={goBack} className="mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Go back
      </button>
    </div>
  );
};

export default ErrorPage;