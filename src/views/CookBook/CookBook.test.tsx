import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { AuthProvider } from '../../context/AuthContext';
import { beUrl } from '../../utils/beUrl';
import CookBook from './CookBook';

// TODO:
// - FAILING DUE TO ONCLICK EVENT NOT TRIGGERING: Redirects user to recipe detail on click of recipe.
// - FAILING DUE TO UNCAUGHT STATE UPDATE: if user is logged out, 'toggle user content' switch is disabled.
//   🟡 NOTE: Return to these tests once alerts are removed from document. Jest does not have a window.alert equivelant, throwing 'Error: window.alert('text here') no implmented.'
//     - if user is logged in, if recipe doesn't already exist in cookbook, alerts user of success.
//     - if user is logged in, if recipe already exists in cookbook, alerts user of failure.

// mocks
jest.mock('../../context/AuthContext');

const mockRecipe = {
  id: 'test',
  ownerId: 'test',
  cookbookId: 'test',
  userId: '1',
  description: 'test',
  image: 'test',
  name: 'test-recipe-name',
  rating: 5,
};

const server = setupServer(
  // pagination route
  rest.get(`${beUrl}/cookbooks/:id`, (req, res, ctx) => {
    return res(ctx.json([mockRecipe]));
  }),
  // automatically puts user in context on render
  rest.get(`${beUrl}/users/me`, (req, res, ctx) => {
    return res(
      ctx.json({ id: 1, username: 'mock-bob', showUserContent: false }),
    );
  }),
);

describe('CookBook', () => {
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
          <CookBook />
        </MemoryRouter>
      </AuthProvider>,
    );
    await screen.findByText('test-recipe-name');
    screen.debug();
  });
});
