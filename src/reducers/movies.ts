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

const moviesReducer: Reducer<MoviesState, Action> = (state, action) => {
  /*   console.log(state, action); */
  return initialState;
};

export default moviesReducer;
