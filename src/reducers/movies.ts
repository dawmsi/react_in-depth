import { Action, Reducer } from "redux";

export interface Movie {
  id?: number;
  title: string;
  popular: number;
  overview: string;
}

interface MoviesState {
  top: Movie[];
}

const initialState: MoviesState = {
  top: [
    { title: "film1", popular: 98, overview: "Dramma" },
    { title: "film2", popular: 97, overview: "horror" },
    { title: "fil3", popular: 96, overview: "triller" },
    { title: "dasdhkj", popular: 95, overview: "comedy" },
  ],
};

const moviesReducer: Reducer<MoviesState, Action> = (state, action) => {
  console.log(state, action);
  return initialState;
};

export default moviesReducer;
