// hooks/usePagination.ts
import { useState } from 'react';

interface IPaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export const usePagination = () => {
  const [pagination, setPagination] = useState<IPaginationState>({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });

  const setCurrentPage = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const setTotalItems = (total: number) => {
    setPagination(prev => ({ ...prev, totalItems: total }));
  };

  return {
    ...pagination,
    setCurrentPage,
    setTotalItems,
  };
};