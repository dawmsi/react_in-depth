import { useContext, useEffect } from 'react';
import MovieCard from './MovieCard';
import { fetchMovies } from '../../reducers/movies';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { Container, Grid, LinearProgress } from '@mui/material';
import { AnonymousUser, AuthContext } from '../../AppContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

function Movies() {
  const dispatch = useAppDispatch();
  const { top: movies, loading } = useAppSelector((state) => state.movies);

  const { user } = useContext(AuthContext);
  const loggedIn = user !== AnonymousUser;

  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting) {
      dispatch(fetchMovies());
    }
  }, [dispatch, entry?.isIntersecting]);

  return (
    <Container sx={{ px: 8 }} maxWidth="xl">
      {loading ? (
        <div className="w-full flex justify-center items-center p-3">
          <span className="animate-spin text-2xl">{`M`}</span>
        </div>
      ) : (
        <>
          <Grid container spacing={4}>
            {movies.map(
              ({ title, popularity, overview, poster_path, id = 0 }, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={`${index}${id}`}>
                  <MovieCard
                    key={'card' + id}
                    id={id}
                    title={title}
                    popularity={popularity}
                    overview={overview}
                    poster_path={poster_path}
                    enableUserActions={loggedIn}
                  />
                </Grid>
              )
            )}
          </Grid>
          <div ref={targetRef}>
            <LinearProgress color="secondary" sx={{ mt: 3 }} />
          </div>
        </>
      )}
    </Container>
  );
}

export default Movies;
