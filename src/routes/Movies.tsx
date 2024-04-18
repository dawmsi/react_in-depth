import { Typography } from '@mui/material';
import MovieList from '../features/Movie/MovieList';

const Movies = () => {
  return (
    <>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Movies
      </Typography>
      <MovieList />
    </>
  );
};

export default Movies;
