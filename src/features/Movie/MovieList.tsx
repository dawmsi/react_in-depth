import {  useCallback, useContext, useState } from 'react';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

import MovieCard from './MovieCard';
/* import { useAppDispatch } from '../../hooks/useAppRedux';
import { fetchNextPage, resetMovies } from '../../reducers/moviesSlice'; */
import { AnonymousUser, AuthContext } from '../../AppContext';
import {
  MoviesFilters,
  MoviesQuery,
  useGetConfigurationQuery,
  useGetMoviesQuery,
} from '../../services/rtk-tmdb';
import MoviesFilter from './MoviesFilter';

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};

function MoviesList() {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);

  const movies = data?.results ?? [];

  const hasMorePages = data?.hasMorePages;

  const imageSize = 'w780';

  function formatImageUrl(path?: string) {
    return path && configuration
      ? `${configuration?.images.base_url}${imageSize}${path}`
      : undefined;
  }

  const { user } = useContext(AuthContext);
  const loggedIn = user !== AnonymousUser;

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  const handleAddFavorite = useCallback(
    (id: number) => {
      alert(`Not implemented ${user.name} is adding movie ${id} to favorite!`);
    },
    [user.name]
  );

  //lazy load/dynamic import
  //default export is required

  //wrap in Suspense to indicate module is loading
  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs="auto" sx={{ minWidth: '389px' }}>
          <MoviesFilter
            onApply={(filters) => {
              const moviesFilters: MoviesFilters = {
                keywords: filters.keywords.map((k) => k.id),
                genres: filters.genres,
              };
              setQuery({ page: 1, filters: moviesFilters });
            }}
          />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!isFetching && !movies.length && (
            <Typography variant="h6">
              No movies were found that match your query.
            </Typography>
          )}
          <Grid container spacing={4}>
            {movies.map((m, i) => (
              <Grid item key={`${m.id}-${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  id={m.id}
                  title={m.title}
                  overview={m.overview}
                  popularity={m.popularity}
                  image={formatImageUrl(m.poster_path)}
                  enableUserActions={loggedIn}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default MoviesList;
