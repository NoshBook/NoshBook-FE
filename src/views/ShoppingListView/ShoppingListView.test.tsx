import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import ShoppingListView from './ShoppingListView';
import { beUrl } from '../../utils/beUrl';

let mockShoppingList = [
  {
    id: 1,
    ingredient: 'test1',
    isChecked: false,
  },
  {
    id: 2,
    ingredient: 'test2',
    isChecked: false,
  },
];

function copyShoppingList() {
  return mockShoppingList.map((item) => ({ ...item }));
}

const server = setupServer(
  rest.put(`${beUrl}/shoppinglist/item/1`, (req, res, ctx) => {
    const copy = copyShoppingList();
    copy[0].isChecked = !copy[0].isChecked;
    return res(ctx.json(copy));
  }),
  rest.get(`${beUrl}/shoppinglist/new`, (req, res, ctx) => {
    const copy = copyShoppingList();
    copy[0].ingredient = 'test3';
    copy[1].ingredient = 'test4';
    return res(ctx.json(copy));
  }),
  rest.get(`${beUrl}/shoppinglist`, (req, res, ctx) => {
    return res(ctx.json(mockShoppingList));
  }),
);

describe('ShoppingList', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should render a list of shopping items', async () => {
    render(
      <MemoryRouter>
        <ShoppingListView />
      </MemoryRouter>,
    );
    await screen.findByText(/loading/i);
    const test1 = await screen.findByText(/test1/i);
    const test2 = await screen.findByText(/test2/i);

    expect(test1).toBeInTheDocument();
    expect(test2).toBeInTheDocument();
  });

  it('should update isChecked', async () => {
    render(
      <MemoryRouter>
        <ShoppingListView />
      </MemoryRouter>,
    );
    const loading = await screen.findByText(/loading/i);
    expect(loading).toBeInTheDocument();

    const test1 = await screen.findByLabelText(/test1 isChecked: false/i);
    const test2 = await screen.findByLabelText(/test2 isChecked: false/i);

    expect(test1).toBeInTheDocument();
    expect(test2).toBeInTheDocument();

    const checkButtons = await screen.findAllByTitle('checkbox');
    fireEvent.click(checkButtons[0]);
    const item1Checked = await screen.findByLabelText(/test1 isChecked: true/i);
    expect(item1Checked).toBeInTheDocument();
  });

  it('should fetch a new shopping list', async () => {
    render(
      <MemoryRouter>
        <ShoppingListView />
      </MemoryRouter>,
    );

    const loading = await screen.findByText(/loading/i);
    expect(loading).toBeInTheDocument();

    const test1 = await screen.findByLabelText(/test1 isChecked: false/i);
    const test2 = await screen.findByLabelText(/test2 isChecked: false/i);

    expect(test1).toBeInTheDocument();
    expect(test2).toBeInTheDocument();

    const generateButton = await screen.findByText(/generate/i);
    fireEvent.click(generateButton);
    const item1Checked = await screen.findByLabelText(
      /test3 isChecked: false/i,
    );
    expect(item1Checked).toBeInTheDocument();
  });

  it('should filter the ingredient list based on a search term', async () => {
    render(
      <MemoryRouter>
        <ShoppingListView />
      </MemoryRouter>,
    );

    // const test1 = await screen.findByText(/test1/i);
    const test2 = await screen.findByText(/test2/i);
    // expect(test2).toBeInTheDocument();

    const searchInput = await screen.findByLabelText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'test1' } });

    const test1 = await screen.findByText(/test1/i);
    expect(test1).toBeInTheDocument();
    setTimeout(() => {
      expect(test2).not.toBeInTheDocument();
    }, 1000);

    screen.debug();
  });

  it('should display the total for each set of ingredients', async () => {
    mockShoppingList = [
      {
        id: 1,
        ingredient: '1 tablespoon test',
        isChecked: false,
      },
      {
        id: 2,
        ingredient: '1 tablespoon test',
        isChecked: false,
      },
    ];
    render(
      <MemoryRouter>
        <ShoppingListView />
      </MemoryRouter>,
    );
    const testTotal = await screen.findByText(/2 tablespoons/i);

    expect(testTotal).toBeInTheDocument();
  });
});
