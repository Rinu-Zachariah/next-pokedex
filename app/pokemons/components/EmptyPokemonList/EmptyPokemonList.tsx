import React from 'react';

interface IProps {
  searchText?: string;
  error?: string
}

const EmptyPokemonList: React.FC<IProps> = ({ searchText, error }) => (
  <div className="flex flex-col items-center justify-center h-96 relative">
    <img 
      src="/assets/snorlax.png"
      alt="No Pokemon found"
      height={250}
      width={250}
      className="mb-6 select-none drop-shadow-xl"
      style={{ filter: 'grayscale(40%)' }}
    />
    <div className="absolute left-[70%] top-[18%] z-10 animate-bounce-slow">
      <span className="text-3xl text-blue-300 ml-1">z</span>
      <span className="text-4xl text-blue-200 ml-1">z</span>
      <span className="text-5xl text-blue-100 ml-1">z</span>
    </div>
    <p className="text-lg font-bold text-gray-500 mb-1">
      {error?.includes("not found") || error?.includes("Not found")
        ? `No Pokemon found matching "${searchText}"`
        : "No Pokemon found!!"}
    </p>
    <p className="text-sm text-gray-400 italic">Try another search or come back later.</p>
  </div>
);

export default EmptyPokemonList;