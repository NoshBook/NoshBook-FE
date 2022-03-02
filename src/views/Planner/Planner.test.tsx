import { screen, render, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Planner from './Planner';
import { MemoryRouter } from 'react-router-dom';
import { beUrl } from '../../utils/beUrl';
import ShoppingListView from '../ShoppingListView/ShoppingListView';

let mockResponse = [
  {
    day: 'monday',
    recipes: [
      {
        id: 1,
        recipeId: 1,
        name: 'banana bread',
      },
      {
        id: 2,
        recipeId: 2,
        name: 'corndog',
      },
    ],
  },
];

const server = setupServer(
  rest.get(`${beUrl}/planners`, (req, res, ctx) => {
    return res(ctx.json(mockResponse));
  }),
  rest.delete(`${beUrl}/planners/delete`, (req, res, ctx) => {
    const mockResponse = [
      {
        day: 'monday',
        recipes: [
          {
            id: 1,
            recipeId: 1,
            name: 'banana bread',
          },
          {
            id: 2,
            recipeId: 2,
            name: 'corndog',
          },
        ],
      },
    ];

    return res(ctx.json(mockResponse));
  }),
  rest.get(`${beUrl}/planners/random`, (req, res, ctx) =>
    res(ctx.json(mockResponse)),
  ),
  rest.post(`${beUrl}/planners`, (req, res, ctx) =>
    res(ctx.json(mockResponse)),
  ),
  rest.get(`${beUrl}/shoppinglist`, (req, res, ctx) =>
    res(
      ctx.json([
        { id: '5', ingredient: 'test', isChecked: false },
        { id: '6', ingredient: 'something', isChecked: false },
      ]),
    ),
  ),
);

describe('Planner', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should delete recipes from the planner on Reset click', async () => {
    render(
      <MemoryRouter>
        <Planner />
      </MemoryRouter>,
    );

    await screen.findByText(/banana bread/i);
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);
    const noRecipes = await screen.findByText(/no recipes here yet/i);
    expect(noRecipes).toBeVisible();
  });

  it('should take you to the shopping list', async () => {
    render(
      <MemoryRouter>
        <Planner />
        <ShoppingListView />
      </MemoryRouter>,
    );

    await screen.findByText(/banana bread/i);
    const shoppingButton = await screen.findByText(/shopping list/i);
    fireEvent.click(shoppingButton);

    const something = await screen.findByText(/something/i);
    expect(something).toBeInTheDocument();
  });

  it('should generate a random recipe', async () => {
    render(
      <MemoryRouter>
        <Planner />
      </MemoryRouter>,
    );

    await screen.findByText(/banana bread/i);
    const randomRecipeButton = await screen.findByText(/random recipe/i);
    fireEvent.click(randomRecipeButton);
    const fridayButton = screen.getByText('friday');

    fireEvent.click(
      fridayButton,

      (mockResponse = [
        {
          day: 'monday',
          recipes: [
            {
              id: 1,
              recipeId: 1,
              name: 'banana bread',
            },
            {
              id: 2,
              recipeId: 2,
              name: 'corndog',
            },
          ],
        },
        {
          day: 'friday',
          recipes: [
            {
              id: 3,
              recipeId: 42,
              name: 'gumdrop stew',
            },
          ],
        },
      ]),
    );

    const addedRecipe = await screen.findByText(/gumdrop stew/i);
    expect(addedRecipe).toBeInTheDocument();
  });
});
