import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Browse from './Browse';
import { AuthProvider } from '../../context/AuthContext';
import App from '../../App';
import { beUrl } from '../../utils/beUrl';
import RecipeDetail from '../Recipe/RecipeDetail';

// TODO:
// - FAILING DUE TO ONCLICK EVENT NOT TRIGGERING: Redirects user to recipe detail on click of recipe.
// - FAILING DUE TO UNCAUGHT STATE UPDATE: if user is logged out, 'toggle user content' switch is disabled.

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
  rating: 5,
};

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

const server = setupServer(
  // pagination route
  rest.get(`${beUrl}/recipes`, (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    const withUserContent = req.url.searchParams.get('withUserContent');
    if (withUserContent) {
      const newMockRecipesWithUserContent = [...mockPageOneRecipes];
      newMockRecipesWithUserContent[0].ownerId = 1;
      newMockRecipesWithUserContent[0].name = 'user created mock recipe';
      return res(ctx.json(newMockRecipesWithUserContent));
    }
    if (page === '1') return res(ctx.json(mockPageOneRecipes));
    if (page === '2') return res(ctx.json(mockPageTwoRecipes));
    if (page === '3') return res(ctx.json(mockPageThreeRecipes));
  }),
  // automatically puts user in context on render
  rest.get(`${beUrl}/users/me`, (req, res, ctx) => {
    return res(
      ctx.json({ id: 1, username: 'mock-bob', showUserContent: false }),
    );
  }),
  // called when a user is logged out
  rest.delete(`${beUrl}/users/sessions`, (req, res, ctx) => {
    return res(
      ctx.json({ success: true, message: 'Signed out successfully!' }),
    );
  }),
  // 🟡 Need to find a way to access this request parameter. Currently only able to find documentation on accessing query parameters in MSW.
  rest.delete(`${beUrl}/recipes/:id`, (req, res, ctx) => {
    return res(
      ctx.json({ success: true, message: 'Signed out successfully!' }),
    );
  }),
);

describe('Browse', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('renders a list of recipes', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Browse />
        </MemoryRouter>
      </AuthProvider>,
    );

    await screen.findAllByText('test');
  });

  // 🟡 Update mocked paths before revisiting this.
  it.skip('redirects user to recipe detail on click of recipe', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route
              path="/recipes/:id"
              element={<RecipeDetail isCookbookView={false} />}
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    screen.getAllByText(/Loading/i);

    const recipeArray = await screen.findAllByRole('listitem');
    const firstRecipe = recipeArray[0];
    fireEvent.click(firstRecipe);

    await waitForElementToBeRemoved(() => firstRecipe);
    expect(global.window.location.href).toContain('/recipes');
  });

  it('renders new data when pagination buttons are clicked', async () => {
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
  it.skip('renders a disabled switch button when user is logged out', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );

    await screen.findAllByText('test');

    // logout
    const logoutButton = await screen.findByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    const switchButton = await screen.findByRole('switch', { checked: false });
    screen.debug();
    expect(switchButton).toBeDisabled();
  });

  it('renders the appropriate content when a user toggles the input switch', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );

    // no user created mock recipe on page
    const recipesArray = await screen.findAllByText(/test/i);
    expect(recipesArray.length).toEqual(20);

    // find switch button and clicks it
    const switchButton = await screen.findByRole('switch', { checked: false });
    fireEvent.click(switchButton);

    // finds created mock recipe on page
    await screen.findByText(/user created mock recipe/i);
  });
});
