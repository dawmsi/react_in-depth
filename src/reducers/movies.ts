/* eslint-disable @typescript-eslint/no-unused-vars */
import { client } from "../api/tmdb";
import { ActionWithPayload, createReducer } from "../redux/utils";
import { AppThunk } from "../store";

export interface Movie {
  id?: number;
  poster_path?: string;
  title: string;
  popularity: number;
  overview: string;
}

interface MoviesState {
  top: Movie[];
  loading: boolean;
}

const initialState: MoviesState = {
  top: [],
  loading: false,
};

const moviesLoaded = (movies: Movie[]) => ({
  type: "movies/loaded",
  payload: movies,
});

const moviesLoading = () => ({
  type: "movies/loading",
});

export function fetchMovies(): AppThunk<Promise<void>> {
  return async (dispatch) => {
    dispatch(moviesLoading());

    const results = await client.getNowPlaying();
    dispatch(moviesLoaded(results));
  };
}

const moviesReducer = createReducer<MoviesState>(initialState, {
  "movies/loaded": (state, action: ActionWithPayload<Movie[]>) => {
    return {
      ...state,
      top: action.payload,
      loading: false,
    };
  },
  "movies/loading": (state) => {
    return {
      ...state,
      loading: true,
    };
  },
});

export default moviesReducer;

/* 
const moviesReducer: Reducer<MoviesState, ActionWithPayload<Movie[]>> = (
  state,
  action
) => {
  const currentState = state ?? initialState;

  switch (action.type) {
    case "movies/loaded":
      return {
        ...currentState,
        top: action.payload,
      };
    default:
      return currentState;
  }
}; */
