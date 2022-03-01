import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import RecipeDetail from './RecipeDetail';
import { beUrl } from '../../utils/beUrl.js';
import { AuthProvider } from '../../context/AuthContext';
import userEvent from '@testing-library/user-event';
import Planner from '../Planner/Planner';
import Header from '../../components/Header/Header';

jest.mock('../../context/AuthContext');

const mockRecipe = {
  name: 'test recipe',
  instructions: ['step 1', 'step 2'],
  description: 'test',
  servings: 'test',
  ingredients: ['item 1', 'item 2'],
  image: 'https://placebear.com/200/300',
  total_time: 'test',
  source_url: 'test',
  rating: 1,
  ratings_count: 1,
};

const server = setupServer(
  rest.get(`${beUrl}/recipes/undefined`, (req, res, ctx) => {
    return res(ctx.json(mockRecipe));
  }),

  rest.get(`${beUrl}/users/me`, (req, res, ctx) => {
    return res(
      ctx.json({ id: 1, username: 'mock-bob', showUserContent: false }),
    );
  }),

  rest.get(`${beUrl}/cookbooks/1`, (req, res, ctx) => {
    return res(ctx.json([{ id: 1, userId: '1', recipeId: '1' }]));
  }),

  rest.get(`${beUrl}/planners`, (req, res, ctx) => {
    return res(
      ctx.json([
        { day: 'tuesday', recipes: [{ id: 1, recipeId: 1, name: 'test' }] },
      ]),
    );
  }),
);

describe('RecipeDetail', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should show recipe details', async () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/recipes/1']}>
          <RecipeDetail />
        </MemoryRouter>
      </AuthProvider>,
    );

    screen.getByText('Loading...');
    await screen.findByText(/test recipe/i);
    await screen.findByText(/step 1/i);
    await screen.findByText(/step 2/i);
  });

  it.skip('should add a recipe to the planner', async () => {
    // const history = createMemoryHistory();
    // history.push('/recipes/1');

    render(
      <AuthProvider>
        <Header />
        <MemoryRouter initialEntries={['/recipes/1']}>
          <RecipeDetail />
        </MemoryRouter>
        <MemoryRouter>
          <Planner />
        </MemoryRouter>
        {/* <Router history={history}>
          <Route path="/recipes/1" element={<RecipeDetail />} />
          <Route path="/planner" element={<Planner />} />
        </Router> */}
      </AuthProvider>,
    );

    await screen.findByText(/step 1/i);

    const addToPlannerButton = screen.getByRole('button', {
      name: 'Add to Planner',
    });
    userEvent.click(addToPlannerButton);

    const tuesday = screen.getByLabelText('tuesday');
    userEvent.click(tuesday);

    const plannerLink = screen.getAllByAltText('Planner');
    userEvent.click(plannerLink);

    await screen.findByText(/test recipe/i);
  });
});
