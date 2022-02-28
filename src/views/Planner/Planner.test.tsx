import { screen, render, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Planner from './Planner';
import { MemoryRouter } from 'react-router-dom';
import { beUrl } from '../../utils/beUrl';

const server = setupServer(
  rest.get(
    `${beUrl}/planners`,
    (req, res, ctx) => {
      const mockResponse = [
        {
          day: 'monday',
          recipes: [
            {
              id: 1,
              name: 'banana bread',
            },
            {
              id: 2,
              name: 'corndog',
            },
          ],
        },
      ];

      return res(ctx.json(mockResponse));
    },
  ),
  rest.delete(
    `${beUrl}/planners/clear`,
    (req, res, ctx) => {
      const mockResponse = [
        {
          day: 'monday',
          recipes: [
            {
              id: 1,
              name: 'banana bread',
            },
            {
              id: 2,
              name: 'corndog',
            },
          ],
        },
      ];

      return res(ctx.json(mockResponse));
    },
  ),
);

describe('PlannerList', () => {
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
    expect(await screen.findByText(/no recipes to display/i)).toBeVisible();
  });
});
