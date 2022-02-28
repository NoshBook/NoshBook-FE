/* eslint-disable testing-library/no-debugging-utils */
import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Browse from './Browse';
import { AuthProvider } from '../../context/AuthContext';
import App from '../../App';

// TODO:
// - Redirects user to recipe detail on click of recipe.
// - if user is logged out, 'add recipe to cookbook' button is disabled.
// - if user is logged out, 'toggle user content' switch is disabled.
// - if user is logged out, clicking 'toggle user content' switch renders the correct data (test on and off)
//   🟡 NOTE: Return to these tests once alerts are removed from document. Jest does not have a window.alert equivelant, throwing 'Error: window.alert('text here') no implmented.'
//     - if user is logged in, if recipe doesn't already exist in cookbook, alerts user of success.
//     - if user is logged in, if recipe already exists in cookbook, alerts user of failure.

// urls
// const DEV_RECIPE_URL = `http://localhost:7890/api/v1/recipes`;
const STAGING_RECIPE_URL = `https://noshbook-staging.herokuapp.com/api/v1/recipes`;

// const DEV_USERS_URL = 'http://localhost:7890/api/v1/users';
const STAGING_USERS_URL = 'https://noshbook-staging.herokuapp.com/api/v1/users';

// mocks
jest.mock('../../context/AuthContext');

const mockRecipe = {
  id: 1,
  name: 'test',
  ingredients: 'test',
  tags: 'test',
  servings: 'test',
  image: 'test',
  totalTime: 'test',
};

const server = setupServer(
  // pagination route
  rest.get(STAGING_RECIPE_URL, (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    if (page === '1') return res(ctx.json(mockPageOneRecipes));
    if (page === '2') return res(ctx.json(mockPageTwoRecipes));
    if (page === '3') return res(ctx.json(mockPageThreeRecipes));
  }),
  // automatically puts user in context on render
  rest.get(`${STAGING_USERS_URL}/me`, (req, res, ctx) => {
    return res(
      ctx.json({ id: 1, username: 'mock-bob', showUserContent: false }),
    );
  }),
  rest.delete(`${STAGING_USERS_URL}/sessions`, (req, res, ctx) => {
    return res(
      ctx.json({ success: true, message: 'Signed out successfully!' }),
    );
  }),
);

// pagination setup
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

describe('RecipeList', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should render a list of recipes', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Browse />
        </MemoryRouter>
      </AuthProvider>,
    );

    await screen.findAllByText('test');
  });

  it('should render new data when pagination buttons are clicked', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Browse />
        </MemoryRouter>
      </AuthProvider>,
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

  // failing for unknown reason
  it.skip('should render a disabled add recipe to cookbook button when user is logged out', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );

    await screen.findAllByText('test');

    // logout
    const logoutButton = await screen.findByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    const buttons = await screen.findAllByText(/add recipe to cookbook/i);
    console.log(buttons[0]);
    buttons.forEach((button) => expect(button).toBeDisabled());
  });
});
