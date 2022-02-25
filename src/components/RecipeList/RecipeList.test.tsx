import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Browse from '../../views/Browse/Browse';

const mockRecipeList = [
  {
    id: 1,
    name: 'test',
    ingredients: 'test',
    tags: 'test',
    servings: 'test',
    image: 'test',
    totalTime: 'test',
  },
];

const server = setupServer(
  rest.get(
    'https://noshbook-staging.herokuapp.com/api/v1/recipes',
    (req, res, ctx) => {
      return res(ctx.json(mockRecipeList));
    }
  )
);

describe('RecipeList', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should render a list of recipes', async () => {
    render(
      <MemoryRouter>
        <Browse />
      </MemoryRouter>
    );
    await screen.findByText('test');
  });
});
