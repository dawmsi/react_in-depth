import { UnknownAction, applyMiddleware, createStore } from 'redux';

import rootReducer from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ThunkAction, thunk } from 'redux-thunk';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, composedEnhancer);

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  UnknownAction
>;

export type RootState = ReturnType<typeof store.getState>;

export default store;
