import { screen, render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Planner from '../../views/Planner/Planner';

const server = setupServer(
  rest.get(
    'https://noshbook-staging.herokuapp.com/api/v1/planners',
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
    }
  )
);

describe('PlannerList', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should render a list of recipes that have been added to planner', async () => {
    render(<Planner />);

    await screen.findByText(/banana bread/i);
    await screen.findByText(/corndog/i);
  });
});