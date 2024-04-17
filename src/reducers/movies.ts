/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action, Reducer } from "redux";

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
    { title: "fil3", popularity: 96, overview: "triller" },
    { title: "dasdhkj", popularity: 95, overview: "comedy" },
  ],
};

export const moviesLoaded = (movies: Movie[]) => ({
  type: "movies/loaded",
  payload: movies,
});

interface ActionWithPayload<T> extends Action {
  payload: T;
}

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
};

export default moviesReducer;
