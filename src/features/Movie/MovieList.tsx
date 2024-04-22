import {
  Suspense,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

import MovieCard from './MovieCard';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { fetchNextPage, resetMovies } from '../../reducers/moviesSlice';
import { AnonymousUser, AuthContext } from '../../AppContext';

function MoviesList() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filters, setFilters] = useState<any>();

  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== AnonymousUser;
  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      const moviesFilters = filters
        ? {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            keywords: filters?.keywords.map((k: any) => k.id),
            genres: filters?.genres,
          }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, filters, hasMorePages]);

  const handleAddFavorite = useCallback(
    (id: number) => {
      alert(
        `Not implemented ${auth.user.name} is adding movie ${id} to favorite!`
      );
    },
    [auth.user.name]
  );

  //lazy load/dynamic import
  //default export is required
  const MoviesFilter = lazy(() => import('./MoviesFilter'));
  //wrap in Suspense to indicate module is loading
  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs="auto" sx={{ minWidth: '389px' }}>
        <Suspense fallback={<span>Loading Filters</span>}>
          <MoviesFilter
            onApply={(filters) => {
              dispatch(resetMovies());
              setFilters(filters);
            }}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!loading && !movies.length && (
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
                  image={m.image}
                  enableUserActions={loggedIn}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default MoviesList;
