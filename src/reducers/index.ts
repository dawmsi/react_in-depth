import { combineReducers } from "redux";
import moviesReducer from "./movies.ts";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
