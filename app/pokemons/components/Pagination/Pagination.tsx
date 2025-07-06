'use client';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsRight, ChevronsLeft } from "lucide-react";

interface IProps {
  total: number;
  page: number;
  pageSize: number;
  filterName: string;
}

const Pagination: React.FC<IProps> = ({
  total, page, pageSize, filterName
}) => {
  const router = useRouter();
  const lastPage = Math.ceil(total / pageSize);

  const goToPage = useCallback((newPage: number) => {
    const params = new URLSearchParams();
    if (filterName) {
      params.set('name', filterName);
    }
    params.set('page', String(newPage));
    router.replace(`?${params.toString()}`);
  }, [router, filterName]);

  if (lastPage <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 mb-6">
      <button
        onClick={() => goToPage(1)}
        disabled={page === 1}
        className={
          `p-2 rounded-lg ${page === 1 ? 
            'bg-gray-300 text-gray-400 cursor-not-allowed' : 
            'bg-blue-900 text-white hover:bg-blue-800'
          }`
        }
      >
        <ChevronsLeft size={20} />
      </button>
      <button
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className={
          `p-2 rounded-lg ${page <= 1 ? 
            'bg-gray-300 text-gray-400 cursor-not-allowed' :
            'bg-blue-900 text-white hover:bg-blue-800'
          }`
        }
      >
        <ChevronLeft size={20} />
      </button>
      <span>
        Page <b>{page}</b> of {lastPage}
      </span>
      <button
        onClick={() => goToPage(page + 1)}
        disabled={page === lastPage}
        className={
          `p-2 rounded-lg ${page === lastPage ?
            'bg-gray-300 text-gray-400 cursor-not-allowed' :
            'bg-blue-900 text-white hover:bg-blue-800'
          }`
        }
      >
        <ChevronRight size={20} />
      </button>
      <button
        onClick={() => goToPage(lastPage)}
        disabled={page === lastPage}
        className={
          `p-2 rounded-lg ${page === lastPage ?
            'bg-gray-300 text-gray-400 cursor-not-allowed' :
            'bg-blue-900 text-white hover:bg-blue-800'
          }`
        }
      >
        <ChevronsRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;