import RecipeCard from './RecipeCard';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';

jest.mock('../../context/AuthContext');

const mockRecipe = {
  description: 'mock recipe description.',
  id: '1',
  image: 'https://placekitten.com/100/100',
  ingredients: ['mock-recipe-ingredient'],
  instructions: ['mock-recipe-instruction'],
  name: 'mock-recipe-name',
  rating: 5,
  servings: '5',
  tags: ['mock-recipe-tag'],
  totalTime: 'mock-recipe-time',
  ownerId: '1',
};

describe('recipeCard component snapshots', () => {
  it('renders a browse-all view recipe card', async () => {
    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <RecipeCard recipe={mockRecipe} />
        </MemoryRouter>
      </AuthProvider>,
    );

    await screen.findByText('mock-recipe-name');

    expect(container).toMatchSnapshot();
  });

  it('renders a cookbook view recipe card', async () => {
    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <RecipeCard
            recipe={mockRecipe}
            handleAddToPlannerClick={jest.fn()}
            handleRemoveFromCookbookClick={jest.fn()}
            isCookbookView={true}
          />
        </MemoryRouter>
      </AuthProvider>,
    );

    screen.getByText(/loading/i);
    await screen.findByText('mock-recipe-name');

    expect(container).toMatchSnapshot();
  });
});
