/* eslint-disable */
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPaginatedCookbookRecipes } from '../services/cookbook/cookbook';
import { getPaginatedRecipes, searchRecipes } from '../services/recipe';
import { BrowseRecipe } from '../views/Browse/interfaces/BrowseRecipe';

interface PaginationFeatures {
  nextPage: () => void;
  prevPage: () => void;
  fetchCookbookRecipeData: () => void;
  currentPageData: Array<BrowseRecipe>;
  currentPage: number;
  isLoading: boolean;
}

export default function usePagination(
  itemsPerPage: number,
  isCookbookView?: boolean,
  searchQuery?: string
): PaginationFeatures {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<Array<BrowseRecipe>>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchRecipes() {
      // if rendering in cookbook view...
      if (isCookbookView) {
        const newPageData = await getPaginatedCookbookRecipes(
          currentPage,
          itemsPerPage,
        );
        setCurrentPageData(newPageData);
        // if rendering elsewhere(browse all)...
      } else {
        let newPageData;
        if(searchQuery) {
          newPageData = await searchRecipes(
            searchQuery,
            currentPage,
            itemsPerPage
          )
        } else {
          newPageData = await getPaginatedRecipes(
            currentPage,
            itemsPerPage,
            user.showUserContent,
          );
        }
        setCurrentPageData(newPageData);
      }
    }
    setIsLoading(true);
    fetchRecipes();
    setIsLoading(false);
  }, [currentPage, user.showUserContent, searchQuery]);

  /**
   * WARNING: Should only be used in Cookbook View.
   * Makes a network call for updated cookbook recipe data.
   */
  async function fetchCookbookRecipeData() {
    setIsLoading(true);
    const newPageData = await getPaginatedCookbookRecipes(currentPage, 20);
    setCurrentPageData(newPageData);
    setIsLoading(false);
  }

  function nextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  }
  return {
    nextPage,
    prevPage,
    currentPageData,
    currentPage,
    isLoading,
    fetchCookbookRecipeData,
  };
}
