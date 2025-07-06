'use client';
import Link from 'next/link';
import React from 'react';

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <img 
      src="/assets/wobbuffet.png"
      alt="Error occurred"
      height={250}
      width={250}
      className="mb-6 select-none drop-shadow-xl"
      style={{ filter: 'grayscale(50%)' }}
    />
    <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong!</h2>
    <pre className="mb-4 text-sm bg-gray-100 dark:bg-gray-900 rounded p-2">{error.message}</pre>
    <button
      onClick={() => reset()}
      className="px-4 py-2 bg-blue-900 text-white rounded"
    >
      Try again
    </button>
  </div>
);

export default GlobalError;
