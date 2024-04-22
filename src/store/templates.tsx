//!TEMPLATES

//* old style
/* import { isAction } from 'redux';

const ADD_TODO = 'ADD_TODO';

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text, id: nanoid() },
});

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
  }
  // other code
}; */

//* redux toolkit ?. 'mutable'
/* import { createStice } from '@reduxjs/tootkit';
const todosStice = createStice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
  },
});
export const { todoAdded, todoToggIed } = todosStice.actions;
export default todosStice.reducer; */

//* RTK Query
//todo service.ts
/* import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pokemon } from './types';

export const pokemonApi = createApi({
  reducerpath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https :// pokeapi . co/api/v2/' }),
  endpoints: (builder: any) => ({
    getPokemonNyName: builder.query<Pokemon,string>({
      query: (name: string) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi; */
//todo store.ts
/* import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './services/pokemon';
//?.
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
//?.
setupListeners(store.dispatch); */

//todo App.ts
/* import { useGetPokemonByNaneQuery } from './services/pokenon';
export default function App() {
  const { data, error, isLoading } = useGetPokemonByNaneQuery('pikachu');
  // or endpoints
  const { data, error, isLoading } =
    pokemonApi.endpoints.getPokemonByName.useQuery('pikachu');
  return <div>App</div>;
} */
