import React from 'react';
import RecipeList from '../../components/RecipeList/RecipeList';
import usePagination from '../../hooks/usePagination';

export default function Browse() {
  const { nextPage, prevPage, currentPageData, currentPage } =
    usePagination(20);
  return (
    <main>
      <RecipeList
        nextPage={nextPage}
        prevPage={prevPage}
        currentPageData={currentPageData}
        currentPage={currentPage}
      />
    </main>
  );
}
