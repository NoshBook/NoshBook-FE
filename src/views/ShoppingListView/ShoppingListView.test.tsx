import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Browse from '../../views/Browse/Browse';

const server = setupServer(
  rest.get('https://noshbook-staging.herokuapp.com/api/v1/shoppinglist', (req, res, ctx) => {
    res(ctx.json([
      {
        id: '1',
        ingredient: 'banana',
        isChecked: false
      },
      {
        id: '2',
        ingredient: 'bread',
        isChecked: false
      },
      {
        id: '3',
        ingredient: 'corn',
        isChecked: false
      },
      {
        id: '4',
        ingredient: 'dog',
        isChecked: false
      }
    ]))
  })
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
});
