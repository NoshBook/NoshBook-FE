/* eslint-disable */
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPaginatedCookbookRecipes } from '../services/cookbook/cookbook';
import { getPaginatedRecipes } from '../services/recipe';
import { BrowseRecipe } from '../views/Browse/interfaces/BrowseRecipe';

interface PaginationFeatures {
  nextPage: () => void;
  prevPage: () => void;
  currentPageData: Array<BrowseRecipe>;
  currentPage: number;
}

export default function usePagination(
  itemsPerPage: number,
  isCookbookView?: boolean,
): PaginationFeatures {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<Array<BrowseRecipe>>(
    [],
  );
  const { user } = useAuth();

  useEffect(() => {
    async function fetchRecipes() {
      // if rendering in cookbook view...
      if (isCookbookView) {
        const newPageData = await getPaginatedCookbookRecipes(currentPage, 20);
        setCurrentPageData(newPageData);
        // if rendering elsewhere(browse all)...
      } else {
        const newPageData = await getPaginatedRecipes(
          currentPage,
          20,
          user.showUserContent,
        );
        setCurrentPageData(newPageData);
      }
    }
    fetchRecipes();
  }, [currentPage, user.showUserContent]);

  function nextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  }
  return { nextPage, prevPage, currentPageData, currentPage };
}
