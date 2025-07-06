'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useCallback, useRef } from 'react';

interface IProps {
  searchText: string;
}

const FilterInput: React.FC<IProps> = ({searchText}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const name = inputRef.current?.value.trim() || '';
    const params = new URLSearchParams(searchParams.toString());
    
    if (name) {
      params.set('name', name);
    } else {
      params.delete('name');
    }
    
    params.set('page', '1'); 
    router.replace(`?${params.toString()}`);  
  }, [searchParams, router]);
  
  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        ref={inputRef}
        defaultValue={searchText}
        placeholder="Search by exact name"
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-900 text-white rounded-lg font-semibold"
      >
        Search
      </button>
    </form>
  );
};

export default FilterInput;