import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Browse from './Browse';

const mockRecipe = {
  id: 1,
  name: 'test',
  ingredients: 'test',
  tags: 'test',
  servings: 'test',
  image: 'test',
  totalTime: 'test',
};

function generateRandomNumber() {
  return Math.ceil(Math.random() * 10000);
}

function appendUniqueIds(arr: Array<any>) {
  return arr.map((item) => {
    return { ...item, id: generateRandomNumber() };
  });
}

const newArray1 = new Array(20).fill(mockRecipe);
const mockPageOneRecipes = appendUniqueIds(newArray1);

const newArray2 = new Array(20).fill({ ...mockRecipe, name: 'test2' });
const mockPageTwoRecipes = appendUniqueIds(newArray2);

const newArray3 = new Array(20).fill({ ...mockRecipe, name: 'test3' });
const mockPageThreeRecipes = appendUniqueIds(newArray3);

const server = setupServer(
  rest.get(
    'https://noshbook-staging.herokuapp.com/api/v1/recipes',
    (req, res, ctx) => {
      const page = req.url.searchParams.get('page');
      if (page === '1') return res(ctx.json(mockPageOneRecipes));
      if (page === '2') return res(ctx.json(mockPageTwoRecipes));
      if (page === '3') return res(ctx.json(mockPageThreeRecipes));
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

    await screen.findAllByText('test');
  });

  it('should render new data when pagination buttons are clicked', async () => {
    render(
      <MemoryRouter>
        <Browse />
      </MemoryRouter>
    );
    await screen.findAllByText('test');
    const nextPageButton = screen.getByRole('button', {
      name: /next page/i,
    });

    fireEvent.click(nextPageButton);
    await screen.findAllByText('test2');

    fireEvent.click(nextPageButton);
    await screen.findAllByText('test3');

    const prevPageButton = screen.getByRole('button', {
      name: /prev page/i,
    });

    fireEvent.click(prevPageButton);
    await screen.findAllByText('test2');

    fireEvent.click(prevPageButton);
    await screen.findAllByText('test');
  });

  // if user is logged out, alerts user to login on click of 'add recipe to cookbook'
  // if user is logged in, if recipe doesn't already exist in cookbook, alerts user of success.
  // if user is logged in, if recipe already exists in cookbook, alerts user of failure.
});
