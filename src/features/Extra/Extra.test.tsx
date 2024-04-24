import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupServer } from 'msw/node';
import { graphql, HttpResponse } from 'msw';

import { renderWithProviders } from '../../../tests/utils';
import Extra from './Extra';
import { Episode } from '../../services/rickandmorty';
import '@testing-library/jest-dom';

describe('Extra', () => {
  const responsePages: Record<string, Episode[]> = {
    '1': [
      {
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: [
          {
            id: '1',
            name: 'Rick Sanchez',
            image: '/avatar/1.jpeg',
          },
          {
            id: '2',
            name: 'Morty Smith',
            image: '/avatar/2.jpeg',
          },
        ],
      },
      {
        name: 'Lawnmower Dog',
        air_date: 'December 9, 2013',
        episode: 'S01E02',
        characters: [
          {
            id: '1',
            name: 'Rick Sanchez',
            image: '/avatar/1.jpeg',
          },
          {
            id: '2',
            name: 'Morty Smith',
            image: '/avatar/2.jpeg',
          },
          {
            id: '38',
            name: 'Beth Smith',
            image: '/avatar/38.jpeg',
          },
        ],
      },
    ],
    '2': [
      {
        name: 'Anatomy Park',
        air_date: 'December 16, 2013',
        episode: 'S01E03',
        characters: [
          {
            id: '1',
            name: 'Rick Sanchez',
            image: '/avatar/1.jpeg',
          },
          {
            id: '2',
            name: 'Morty Smith',
            image: '/avatar/2.jpeg',
          },
          {
            id: '12',
            name: 'Alexander',
            image: '/avatar/12.jpeg',
          },
        ],
      },
    ],
  };

  const handlers = [
    graphql.query('GetEpisodesPage', ({ variables }) => {
      const { page } = variables;
      const index = page as string;

      return HttpResponse.json({
        data: {
          episodes: {
            results: responsePages[index],
          },
        },
      });
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  const nextButton = () => screen.getByRole('button', { name: 'Next' });

  const prevButton = () => screen.getByRole('button', { name: 'Previous' });

  it('shows episodes of the first page initially', async () => {
    renderWithProviders(<Extra />);

    expect(await screen.findByText('Pilot')).toBeInTheDocument();
    expect(await screen.findByText('Lawnmower Dog')).toBeInTheDocument();
  });

  it("has 'Previous' button disabled on the first page", async () => {
    renderWithProviders(<Extra />);
    expect(prevButton()).toBeDisabled();
  });

  it("shows next page episodes when click 'Next'", async () => {
    renderWithProviders(<Extra />);

    expect(await screen.findByText('Pilot')).toBeInTheDocument();

    await userEvent.click(nextButton());

    expect(await screen.findByText('Anatomy Park')).toBeInTheDocument();
    expect(screen.queryByText('Pilot')).not.toBeInTheDocument();
  });

  it("shows previous page episodes when click 'Previous'", async () => {
    renderWithProviders(<Extra />);

    await userEvent.click(nextButton());
    expect(await screen.findByText('Anatomy Park')).toBeInTheDocument();

    await userEvent.click(prevButton());

    expect(await screen.findByText('Lawnmower Dog')).toBeInTheDocument();
    expect(screen.queryByText('Anatomy Park')).not.toBeInTheDocument();
  });
});
