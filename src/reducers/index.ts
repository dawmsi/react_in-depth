import { combineReducers } from 'redux';
import moviesReducer from './moviesSlice.ts';

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
