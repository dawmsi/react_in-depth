import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import configuration from '../configuration';

export interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
}

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
}

export interface MoviesQuery {
  page: number;
  filters: MoviesFilters;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Configuration {
  images: {
    base_url: string;
  };
}

export interface KeywordItem {
  id: number;
  name: string;
}

export interface MoviesState {
  results: MovieDetails[];
  lastPage: number;
  hasMorePages: boolean;
}

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiUrl}/3`,
    prepareHeaders(headers) {
      headers.set('Accept', 'application/json');
      headers.set('Authorization', `Bearer ${configuration.apiToken}`);
    },
  }),
  endpoints: (builder) => ({
    getConfiguration: builder.query<Configuration, void>({
      query: () => '/configuration',
    }),
    getMovies: builder.query<MoviesState, MoviesQuery>({
      query(moviesQuery) {
        const params = new URLSearchParams({
          page: moviesQuery.page.toString(),
        });

        if (moviesQuery.filters.keywords?.length) {
          params.append(
            'with_keywords',
            moviesQuery.filters.keywords.join('|')
          );
        }

        if (moviesQuery.filters.genres?.length) {
          params.append('with_genres', moviesQuery.filters.genres.join(','));
        }

        const query = params.toString();
        const path = `/discover/movie?${query}`;

        return path;
      },
      transformResponse(response: PageResponse<MovieDetails>, _, arg) {
        return {
          results: response.results,
          lastPage: arg.page,
          hasMorePages: arg.page < response.total_pages,
        };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        if (responseData.lastPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }

        currentCacheData.hasMorePages = responseData.hasMorePages;
        currentCacheData.lastPage = responseData.lastPage;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getKeywords: builder.query<KeywordItem[], string>({
      query: (query) => `/search/keyword?query=${query}`,
      transformResponse: (response: PageResponse<KeywordItem>) =>
        response.results,
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => '/genre/movie/list',
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetConfigurationQuery,
  useGetKeywordsQuery,
  useGetGenresQuery,
} = tmdbApi;
