'use client';
import Link from 'next/link';
import React from 'react';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-4">404 - Not Found!</h1>
    <img 
      src="/assets/psyduck.png"
      alt="Page not found"
      height={250}
      width={250}
      className="mb-6 select-none drop-shadow-xl"
      style={{ filter: 'grayscale(50%)' }}
    />
    <p>Sorry, the page you're looking for doesn't exist.</p>
     <Link
        href="/"
        className="mt-4 text-blue-700 underline hover:text-blue-900 font-semibold"
        aria-label="Go to homepage"
      >Go Home</Link>
  </div>
);

export default NotFound;
