import React from 'react';
import { useState, useEffect } from 'react';
import { getPaginatedRecipes } from '../utils/fetchUtils';

interface PaginationFeatures {
  nextPage: () => void;
  prevPage: () => void;
  currentPageData: Array<any>;
  currentPage: number;
}

export default function usePagination(
  itemsPerPage: number
): PaginationFeatures {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<Array<any>>([]);
  useEffect(() => {
    async function fetchRecipes() {
      const newPageData: any = await getPaginatedRecipes(currentPage, 20);
      setCurrentPageData(newPageData);
    }
    fetchRecipes();
  }, [currentPage]);

  function nextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  }
  console.log(currentPage, currentPageData);
  return { nextPage, prevPage, currentPageData, currentPage };
}
