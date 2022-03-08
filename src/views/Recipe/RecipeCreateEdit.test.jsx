import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { beUrl } from '../../utils/beUrl.js';
import RecipeCreateEdit from './RecipeCreateEdit.tsx';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute.jsx';

jest.mock('../../services/users.js');
 
import { AuthProvider } from '../../context/AuthContext';
import RecipeDetail from './RecipeDetail.jsx';

const mockRecipe = {
  name: 'test recipe',
  instructions: ['step 1', 'step 2'],
  description: 'test',
  servings: 'test',
  ingredients: ['item 1', 'item 2'],
  tags: ['tag 1', 'tag 2'],
  image: 'https://placebear.com/200/300',
  total_time: 'test',
  source_url: 'test',
  rating: 1,
  ratings_count: 1,
};

let putRecipeListener;

const server = setupServer(
  rest.get(`${beUrl}/recipes/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if(id == 200) {
      return res(ctx.json({ ...mockRecipe, name: 'put success' }));
    } else {
      console.log('GET recipeID: ' + id);
      return res(ctx.json(mockRecipe));
    }
  }),
  rest.put(`${beUrl}/recipes/1`, (req, res, ctx) => {
    putRecipeListener();
    return res(ctx.json({
      message: 'success',
      recipeId: '200'
    }));
  }),
  rest.get(`${beUrl}/cookbooks/1`, (req, res, ctx) => {
    return res(ctx.json([{ id: 1, userId: '1', recipeId: '1' }]));
  })
);

describe('RecipeCreateEdit', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should show render the RecipeForm with the fetched initial values', async () => {
    render(
      <AuthProvider >
        <MemoryRouter initialEntries={['/recipes/edit/1']}>
          <Routes>
            <Route
              path="/recipes/edit/:id"
              element={
                <PrivateRoute>
                  <RecipeCreateEdit />
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    screen.getByText('Loading...');
    await screen.findByDisplayValue(/test recipe/i);
    await screen.findByDisplayValue(/step 1/i);
    await screen.findByDisplayValue(/step 2/i);
    await screen.findByDisplayValue(/item 1/i);
    await screen.findByDisplayValue(/item 2/i);
    await screen.findByDisplayValue(/tag 1/i);
    await screen.findByDisplayValue(/tag 2/i);
  });

  it('should PUT the recipe when editing', async () => {
    render(
      <AuthProvider >
        <MemoryRouter initialEntries={['/recipes/edit/1']}>
          <Routes>
            <Route
              path="/recipes/edit/:id"
              element={
                <PrivateRoute>
                  <RecipeCreateEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/cookbook/:id"
              element={
                <RecipeDetail isCookbookView={true} />
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    screen.getByText('Loading...');
    const submit = await screen.findByText(/submit/i);

    const putRecipePromise = new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => { reject(false); }, 1000);
      putRecipeListener = () => {
        clearTimeout(timeoutId);
        resolve(true);
      };
    });

    fireEvent.click(submit);
    const wasRecipePut = await putRecipePromise;
    expect(wasRecipePut).toEqual(true);

    // I got this far and then realized the promise stuff wasn't needed,
    // but I'm proud of it so I'm leaving it.

    await screen.findByText(/put success/i);
    await screen.findByText(/step 1/i);
  });
});
