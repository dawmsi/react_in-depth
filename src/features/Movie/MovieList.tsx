import { useContext, useEffect, useState } from 'react';

import MovieCard from './MovieCard';

import { Container, Grid, LinearProgress, Typography } from '@mui/material';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { fetchNextPage, resetMovies } from '../../reducers/moviesSlice';
import { AnonymousUser, AuthContext } from '../../AppContext';
import MoviesFilter, { Filters } from './MoviesFilter';

function Movies() {
  const [filters, setFilters] = useState<Filters>();

  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  const auth = useContext(AuthContext);
  const loggedIn = auth.user !== AnonymousUser;
  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      const moviesFilters = filters
        ? { keywords: filters.keywords.map((k) => k.id) }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, filters, hasMorePages]);

  return (
    <Grid container>
      <Grid item xs="auto">
        <MoviesFilter
          onApply={(f) => {
            dispatch(resetMovies());
            setFilters(f);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Now playing
          </Typography>
          <Grid container spacing={4}>
            {movies.map((m) => (
              <Grid item key={m.id} xs={12} sm={6} md={4}>
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  overview={m.overview}
                  popularity={m.popularity}
                  image={m.image}
                  enableUserActions={loggedIn}
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

export default Movies;
