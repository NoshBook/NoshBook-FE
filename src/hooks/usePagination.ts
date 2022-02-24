import React from 'react';
import { useState, useEffect } from 'react';
import paginateData from '../utils/paginateData';

export default function usePagination(
  bulkData: Array<any>,
  itemsPerPage: number
): any {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPageData, setCurrentPageData] = useState<Array<any>>([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const paginatedData = paginateData(bulkData, itemsPerPage);
  const maxIndex = Math.ceil(bulkData.length / itemsPerPage);

  useEffect(() => {
    const lastPageCondition = currentIndex === maxIndex;
    const firstPageCondition = currentIndex < 1;

    const newCurrentPageData = paginatedData[currentIndex];
    setCurrentPageData(newCurrentPageData);

    if (lastPageCondition) setIsLastPage(true);
    if (!lastPageCondition) setIsLastPage(false);

    if (firstPageCondition) setIsFirstPage(true);
    if (!firstPageCondition) setIsFirstPage(false);
  }, [currentIndex, paginatedData, maxIndex]);

  function nextPage() {
    if (currentIndex === maxIndex)
      setCurrentIndex((currentIndex) => currentIndex + 1);
  }

  function prevPage() {
    if (currentIndex > 0) setCurrentIndex((currentIndex) => currentIndex - 1);
  }

  return { nextPage, prevPage, currentPageData, isFirstPage, isLastPage };
}
