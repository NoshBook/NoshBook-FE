import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Browse from './Browse';
import { AuthProvider } from '../../context/AuthContext';

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
  rest.get(
    'https://noshbook-staging.herokuapp.com/api/v1/recipes',
    (req, res, ctx) => {
      const page = req.url.searchParams.get('page');
      if (page === '1') return res(ctx.json(mockPageOneRecipes));
      if (page === '2') return res(ctx.json(mockPageTwoRecipes));
      if (page === '3') return res(ctx.json(mockPageThreeRecipes));
    }
  ),
  // automatically puts user in context on render
  rest.get(
    'https://noshbook-staging.herokuapp.com/api/v1/users/me',
    (req, res, ctx) => {
      return res(ctx.json({ id: 1, username: 'bob' }));
    }
  )
  // rest.delete(
  //   'https://noshbook-staging.herokuapp.com/api/v1/users/sessions',
  //   (req, res, ctx) => {
  //     return res(ctx.json({ message: 'test-success' }));
  //   }
  // )
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
      </AuthProvider>
    );

    await screen.findAllByText('test');
  });

  it('should render new data when pagination buttons are clicked', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Browse />
        </MemoryRouter>
      </AuthProvider>
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

  // it redirects user to recipe detail on click of recipe.

  // 🟡 NOTE:
  // Return to these tests once alerts are removed from document.
  // Jest does not have a window.alert equivelant, throwing 'Error: window.alert('text here') no implmented.'

  // if user is logged out, alerts user to login on click of 'add recipe to cookbook'
  // it('should alert user to login', async () => {
  //   render(
  //     <AuthProvider>
  //       <App />
  //     </AuthProvider>
  //   );

  //   // logout
  //   const logoutButton = await screen.findByRole('button', {
  //     name: /logout/i,
  //   });
  //   fireEvent.click(logoutButton);

  //   // add recipe
  //   const buttons = await screen.findAllByRole('button', {
  //     name: /add recipe to cookbook/i,
  //   });
  //   const addRecipeToCookbookButton = buttons[0];

  //   fireEvent.click(addRecipeToCookbookButton);

  //   expect(windowAlertSpy).toBeCalledTimes(1);
  // });

  // if user is logged in, if recipe doesn't already exist in cookbook, alerts user of success.

  // if user is logged in, if recipe already exists in cookbook, alerts user of failure.
});
