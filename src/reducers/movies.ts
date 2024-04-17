/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionWithPayload, createReducer } from "../redux/utils";

export interface Movie {
  id?: number;
  poster_path?: string;
  title: string;
  popularity: number;
  overview: string;
}

interface MoviesState {
  top: Movie[];
}

const initialState: MoviesState = {
  top: [
    { title: "film1", popularity: 98, overview: "Dramma" },
    { title: "film2", popularity: 97, overview: "horror" },
    { title: "film3", popularity: 96, overview: "comedy" },
  ],
};

export const moviesLoaded = (movies: Movie[]) => ({
  type: "movies/loaded",
  payload: movies,
});

const moviesReducer = createReducer<MoviesState>(initialState, {
  "movies/loaded": (state, action: ActionWithPayload<Movie[]>) => {
    return {
      ...state,
      top: action.payload,
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
