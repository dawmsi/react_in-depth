import { MoviesFilters, client } from '../api/tmdb';
import { ActionWithPayload, createReducer } from '../redux/utils';
import { AppThunk } from '../store';
import { genres } from '../features/Movie/genres';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  image?: string;
}

export interface Genre {
  id: number;
  name: string;
}

interface MoviesState {
  loading: boolean;
  top: Movie[];
  page: number;
  hasMorePages: boolean;
  genres: Genre[];
}

const initialState: MoviesState = {
  loading: false,
  top: [],
  page: 0,
  hasMorePages: true,
  genres,
};

function loading() {
  return {
    type: 'movies/loading',
  };
}

function loaded(movies: Movie[], page: number, hasMorePages: boolean) {
  return {
    type: 'movies/loaded',
    payload: { movies, page, hasMorePages },
  };
}

export function resetMovies() {
  return {
    type: 'movies/reset',
  };
}

export function fetchNextPage(
  filters: MoviesFilters = {}
): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState();
    const nextPage = state.movies.page + 1;
    dispatch(fetchPage(nextPage, filters));
  };
}

function fetchPage(
  page: number,
  filters: MoviesFilters
): AppThunk<Promise<void>> {
  return async (dispatch) => {
    dispatch(loading());

    const configuration = await client.getConfiguration(); // todo: single load per app
    const moviesResponse = await client.getMovies(page, filters);
    const imageSize = 'w780';
    const movies: Movie[] = moviesResponse.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      popularity: movie.popularity,
      image: movie.poster_path
        ? `${configuration.images.base_url}${imageSize}${movie.poster_path}`
        : undefined,
    }));

    const hasMorePages = moviesResponse.page < moviesResponse.totalPages;

    dispatch(loaded(movies, page, hasMorePages));
  };
}

const moviesReducer = createReducer<MoviesState>(initialState, {
  'movies/loading': (state) => {
    return { ...state, loading: true };
  },
  'movies/loaded': (
    state,
    action: ActionWithPayload<{
      movies: Movie[];
      page: number;
      hasMorePages: boolean;
    }>
  ) => {
    return {
      ...state,
      top: [...state.top, ...action.payload.movies],
      page: action.payload.page,
      hasMorePages: action.payload.hasMorePages,
      loading: false,
    };
  },
  'movies/reset': () => {
    return { ...initialState };
  },
});

export default moviesReducer;
