import { useState, useEffect } from 'react';
import { getRecipes } from '../../utils/fetchUtils';

export default function RecipeList() {
  const [recipes, setRecipes] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchInput, setSearchInput] = useState<any>([]);
  const [list, setList] = useState(searchResults ? searchResults : recipes);

  useEffect(() => {
    const getAllRecipes = async () => {
      const res = await getRecipes();
      setRecipes(res);
      setList(res);
    };
    getAllRecipes();
  }, []);

  const searchItems = (query: string) => {
    setSearchInput(query.toLowerCase());
    const results = recipes.filter((recipe: any) => {
      const name = recipe.name.toLowerCase();
      return name.includes(query);
    });
    setSearchResults(results);
    setList(results);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <form>
        <label htmlFor='search-items'></label>
        <input
          id='search-items'
          type='text'
          name='search-items'
          value={searchInput}
          autoComplete='off'
          onChange={({ target }) => searchItems(target.value)}
        />
      </form>
      {list.map((recipe: any) => {
        return (
          <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        );
      })}
    </div>
  );
}
