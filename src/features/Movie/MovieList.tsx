import { useContext, useEffect } from 'react';
import MovieCard from './MovieCard';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { Movie, fetchMovies } from '../../reducers/movies';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Container, Grid } from '@mui/material';
import { AnonymousUser, AuthContext } from '../../AppContext';

interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
function Movies({ movies, loading }: MoviesProps) {
  const dispatch = useAppDispatch();

  const { user } = useContext(AuthContext);
  const loggedIn = user !== AnonymousUser;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Container sx={{ px: 8 }} maxWidth="xl">
      {loading ? (
        <div className="w-full flex justify-center items-center p-3">
          <span className="animate-spin text-2xl">{`M`}</span>
        </div>
      ) : (
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
      )}
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

const connector = connect(mapStateToProps);

// eslint-disable-next-line react-refresh/only-export-components
export default connector(Movies);
